"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * FooterBlob — a mercury / liquid-metal blob that fills the area the
 * cursor sweeps through, then relaxes back down like mercury.
 *
 * 1. SIMULATION pass — an offscreen "height field" texture. Each frame:
 *    - gentle self-advection (organic squirm)
 *    - diffuse/blur (viscosity)
 *    - decay (fade)
 *    - paint a CAPSULE between last frame's pointer position and this
 *      frame's, so fast mouse movement fills a continuous swath
 *      instead of leaving gaps between stamped dots.
 *
 * 2. DISPLAY pass — shades the height field like polished metal:
 *    Fresnel falloff, reflected gradient "environment", tight
 *    specular hotspot, subtle chromatic separation at the edges.
 */

/* ----------------------------- shaders ----------------------------- */

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const simulationFragmentShader = /* glsl */ `
  precision highp float;
  varying vec2 vUv;

  uniform sampler2D uPrevious;
  uniform vec2  uMouse;
  uniform vec2  uPrevMouse;
  uniform float uMouseActive;
  uniform vec2  uResolution;
  uniform float uDelta;
  uniform float uTime;
  uniform float uIdleStrength;

  uniform float uBrushSize;
  uniform float uPaintStrength;
  uniform float uDecay;
  uniform float uDiffuse;   // 0 = no blur, 1 = full blur (viscosity)
  uniform float uAdvect;    // strength of organic self-warp

  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  vec2 flow(vec2 p, float t) {
    float a = noise(p * 2.2 + t) * 6.2831;
    return vec2(cos(a), sin(a));
  }

  // distance from point p to the segment a-b — this is what lets us
  // "fill" the whole path the cursor swept this frame, not just a dot
  float distToSegment(vec2 p, vec2 a, vec2 b) {
    vec2 pa = p - a;
    vec2 ba = b - a;
    float t = clamp(dot(pa, ba) / max(dot(ba, ba), 1e-6), 0.0, 1.0);
    return length(pa - ba * t);
  }

  void main() {
    vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
    vec2 texel = 1.0 / uResolution;

    // --- 1. gentle self-advection so the surface never looks static ---
    vec2 warp = flow(vUv * aspect, uTime * 0.06) * texel * uAdvect;
    vec2 sampleUv = vUv + warp;

    // --- 2. diffuse (blur) for a viscous, mercury-like relax ---
    float center = texture2D(uPrevious, sampleUv).r;
    float l = texture2D(uPrevious, sampleUv - vec2(texel.x, 0.0)).r;
    float r = texture2D(uPrevious, sampleUv + vec2(texel.x, 0.0)).r;
    float u = texture2D(uPrevious, sampleUv + vec2(0.0, texel.y)).r;
    float d = texture2D(uPrevious, sampleUv - vec2(0.0, texel.y)).r;
    float blurred = (center * 4.0 + l + r + u + d) / 8.0;
    float height = mix(center, blurred, uDiffuse);

    // --- 3. decay (fade) ---
    height *= uDecay;

    // --- 4. paint a capsule along the path swept since last frame ---
    // this is the key change: instead of a single point brush, we
    // fill the whole segment from uPrevMouse -> uMouse, so quick
    // movement leaves a continuous filled swath, not dashed dots.
    //
    // paintFactor scales this down to ~0 when the pointer is resting
    // (segment length near zero) so a stationary cursor STOPS
    // refreshing the paint and lets it decay away, instead of
    // re-stamping the same spot every frame forever.
    float moveAmount = length((uMouse - uPrevMouse) * aspect);
    float paintFactor = smoothstep(0.0, 0.012, moveAmount);

    float segDist = distToSegment(vUv * aspect, uPrevMouse * aspect, uMouse * aspect);
    float brush = smoothstep(uBrushSize, 0.0, segDist);
    height += brush * uPaintStrength * uMouseActive * paintFactor;

    // --- 5. idle ambient wander when the pointer is away ---
    vec2 idlePos = vec2(0.5) + vec2(cos(uTime * 0.17), sin(uTime * 0.23)) * 0.16;
    float idleDist = length((vUv - idlePos) * aspect);
    float idleBrush = smoothstep(uBrushSize * 1.4, 0.0, idleDist);
    height += idleBrush * uIdleStrength * 0.02;

    gl_FragColor = vec4(clamp(height, 0.0, 1.4), 0.0, 0.0, 1.0);
  }
`;

const displayFragmentShader = /* glsl */ `
  precision highp float;
  varying vec2 vUv;

  uniform sampler2D uHeightMap;
  uniform vec2  uResolution;
  uniform vec2  uSimResolution;
  uniform vec3  uColorShadow;
  uniform vec3  uColorMid;
  uniform vec3  uColorHighlight;
  uniform float uEdgeSoftness;

  float h(vec2 uv) { return texture2D(uHeightMap, uv).r; }

  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  vec3 shade(vec3 normal, vec3 viewDir, float edgeShift) {
    vec3 reflected = reflect(-viewDir, normal);
    float sky = clamp(reflected.y * 0.5 + 0.5 + edgeShift, 0.0, 1.0);

    vec3 env = mix(uColorShadow, uColorMid, smoothstep(0.0, 0.55, sky));
    env = mix(env, uColorHighlight, smoothstep(0.55, 1.0, sky));

    float fresnel = pow(1.0 - clamp(dot(normal, viewDir), 0.0, 1.0), 3.0);
    env = mix(env, uColorHighlight, fresnel * 0.5);

    vec3 lightDir = normalize(vec3(-0.35, 0.55, 0.9));
    float specular = pow(max(dot(normal, lightDir), 0.0), 60.0);
    env += vec3(1.0) * specular * 0.9;

    return env;
  }

  void main() {
    vec2 texel = 1.0 / uSimResolution;
    vec2 aspect = vec2(uSimResolution.x / uSimResolution.y, 1.0) /
                  vec2(uResolution.x / uResolution.y, 1.0);
    vec2 unit = texel * aspect;

    float center = h(vUv);
    float l = h(vUv - vec2(unit.x, 0.0));
    float r = h(vUv + vec2(unit.x, 0.0));
    float u = h(vUv + vec2(0.0, unit.y));
    float d = h(vUv - vec2(0.0, unit.y));

    vec3 normal = normalize(vec3((l - r) * 4.0, (d - u) * 4.0, 0.55));
    vec3 viewDir = vec3(0.0, 0.0, 1.0);

    float steepness = clamp(length(vec2(l - r, d - u)) * 3.0, 0.0, 1.0);
    vec3 colorR = shade(normal, viewDir, steepness * 0.005);
    vec3 colorG = shade(normal, viewDir, 0.0);
    vec3 colorB = shade(normal, viewDir, -steepness * 0.05);
    vec3 color = vec3(colorR.r, 0, 0);

    float grain = (hash(gl_FragCoord.xy) - 0.5) * 0.02;
    color += grain;

    // opacity tracks height continuously across its whole range (a
    // gentle power curve, not a threshold), so as the trail decays
    // it visibly thins out the entire time instead of staying fully
    // opaque and then popping away once it crosses a cutoff.
    float alpha = pow(clamp(center / uEdgeSoftness, 0.0, 1.0), 0.6);
    gl_FragColor = vec4(clamp(color, 0.0, 1.0), alpha);
  }
`;

/* ----------------------------- component ----------------------------- */

function LiquidSimulation({
  colorShadow,
  colorMid,
  colorHighlight,
  simulationSize,
  brushSize,
}) {
  const { gl, size } = useThree();

  const prefersReducedMotion = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches,
    []
  );

  /* pointer state */
  const mouseTarget = useRef(new THREE.Vector2(0.5, 0.5));
  const mouseCurrent = useRef(new THREE.Vector2(0.5, 0.5));
  const mouseBeforeThisFrame = useRef(new THREE.Vector2(0.5, 0.5));
  const mouseActive = useRef(0);
  const idleStrength = useRef(1);

  /* ping-pong render targets for the simulation */
  const targets = useMemo(() => {
    const options = {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
      type: THREE.HalfFloatType,
      depthBuffer: false,
      stencilBuffer: false,
    };
    return {
      read: new THREE.WebGLRenderTarget(simulationSize, simulationSize, options),
      write: new THREE.WebGLRenderTarget(simulationSize, simulationSize, options),
    };
  }, [simulationSize]);

  const simulationScene = useMemo(() => new THREE.Scene(), []);
  const displayScene = useMemo(() => new THREE.Scene(), []);

  const orthoCamera = useMemo(() => {
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    camera.position.z = 1;
    return camera;
  }, []);

  const simulationUniforms = useMemo(
    () => ({
      uPrevious: { value: targets.read.texture },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uPrevMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uMouseActive: { value: 0 },
      uResolution: { value: new THREE.Vector2(simulationSize, simulationSize) },
      uDelta: { value: 0.016 },
      uTime: { value: 0 },
      uIdleStrength: { value: 1 },
      uBrushSize: { value: brushSize },
      // bigger fill, slower fade => reads as a fuller wave instead of a thin trail
      uPaintStrength: { value: 0.85 },
      uDecay: { value: 0.982 },
      uDiffuse: { value: 0.55 },
      uAdvect: { value: 0.8 },
    }),
    [targets, simulationSize, brushSize]
  );

  const displayUniforms = useMemo(
    () => ({
      uHeightMap: { value: targets.read.texture },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
      uSimResolution: { value: new THREE.Vector2(simulationSize, simulationSize) },
      uColorShadow: { value: new THREE.Color(colorShadow) },
      uColorMid: { value: new THREE.Color(colorMid) },
      uColorHighlight: { value: new THREE.Color(colorHighlight) },
      uEdgeSoftness: { value: 1.2 },
    }),
    [targets, size.width, size.height, simulationSize, colorShadow, colorMid, colorHighlight]
  );

  const simulationMesh = useMemo(() => {
    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(2, 2),
      new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader: simulationFragmentShader,
        uniforms: simulationUniforms,
      })
    );
    simulationScene.add(mesh);
    return mesh;
  }, [simulationScene, simulationUniforms]);

  const displayMesh = useMemo(() => {
    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(2, 2),
      new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader: displayFragmentShader,
        uniforms: displayUniforms,
        transparent: true,
      })
    );
    displayScene.add(mesh);
    return mesh;
  }, [displayScene, displayUniforms]);

  useEffect(() => {
    return () => {
      simulationMesh.geometry.dispose();
      simulationMesh.material.dispose();
      displayMesh.geometry.dispose();
      displayMesh.material.dispose();
      targets.read.dispose();
      targets.write.dispose();
    };
  }, [simulationMesh, displayMesh, targets]);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.033);

    // remember where the pointer was BEFORE this frame's smoothing,
    // so the shader can fill the whole segment it swept through
    mouseBeforeThisFrame.current.copy(mouseCurrent.current);
    mouseCurrent.current.lerp(mouseTarget.current, 0.22);

    idleStrength.current = THREE.MathUtils.lerp(
      idleStrength.current,
      mouseActive.current > 0.5 ? 0 : 1,
      0.02
    );

    simulationUniforms.uPrevious.value = targets.read.texture;
    simulationUniforms.uMouse.value.copy(mouseCurrent.current);
    simulationUniforms.uPrevMouse.value.copy(mouseBeforeThisFrame.current);
    simulationUniforms.uMouseActive.value = mouseActive.current;
    simulationUniforms.uDelta.value = dt;
    simulationUniforms.uTime.value = state.clock.getElapsedTime();
    simulationUniforms.uIdleStrength.value = prefersReducedMotion ? 0 : idleStrength.current;

    gl.setRenderTarget(targets.write);
    gl.clear();
    gl.render(simulationScene, orthoCamera);

    const temp = targets.read;
    targets.read = targets.write;
    targets.write = temp;

    displayUniforms.uHeightMap.value = targets.read.texture;
    displayUniforms.uResolution.value.set(size.width, size.height);

    gl.setRenderTarget(null);
    gl.clear();
    gl.render(displayScene, orthoCamera);
  }, 1);

  /* pointer + touch handling */
  useEffect(() => {
    const canvas = gl.domElement;

    const toUv = (clientX, clientY) => {
      const rect = canvas.getBoundingClientRect();
      return {
        x: THREE.MathUtils.clamp((clientX - rect.left) / rect.width, 0, 1),
        y: THREE.MathUtils.clamp(1 - (clientY - rect.top) / rect.height, 0, 1),
      };
    };

    const handleMove = (event) => {
      const { x, y } = toUv(event.clientX, event.clientY);
      mouseTarget.current.set(x, y);
      mouseActive.current = 1;
    };

    const handleLeave = () => {
      mouseActive.current = 0;
    };

    canvas.addEventListener("pointermove", handleMove, { passive: true });
    canvas.addEventListener("pointerdown", handleMove, { passive: true });
    canvas.addEventListener("pointerenter", handleMove, { passive: true });
    canvas.addEventListener("pointerleave", handleLeave, { passive: true });
    canvas.addEventListener("pointercancel", handleLeave, { passive: true });

    return () => {
      canvas.removeEventListener("pointermove", handleMove);
      canvas.removeEventListener("pointerdown", handleMove);
      canvas.removeEventListener("pointerenter", handleMove);
      canvas.removeEventListener("pointerleave", handleLeave);
      canvas.removeEventListener("pointercancel", handleLeave);
    };
  }, [gl]);

  return null;
}

export default function FooterBlob({
  colorShadow = "#15181d",
  colorMid = "#8b93a1",
  colorHighlight = "#ffffff",
  simulationSize,
  brushSize = 0.32,
  className = "",
}) {
  const resolvedSimSize = useMemo(() => {
    if (simulationSize) return simulationSize;
    if (typeof window === "undefined") return 512;
    return window.innerWidth < 768 ? 320 : 512;
  }, [simulationSize]);

  return (
    <div
      className={`relative h-svh w-full bg-black overflow-hidden ${className}`}
      style={{ touchAction: "pan-y" }}
    >
      <Canvas
        orthographic
        camera={{ position: [0, 0, 1], zoom: 1 }}
        dpr={[1, 1.75]}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        style={{ width: "100%", height: "100%" }}
        onCreated={({ gl }) => gl.setClearColor(0xffffff, 0)}
      >
        <LiquidSimulation
          colorShadow={colorShadow}
          colorMid={colorMid}
          colorHighlight={colorHighlight}
          simulationSize={resolvedSimSize}
          brushSize={brushSize}
        />
      </Canvas>
    </div>
  );
}