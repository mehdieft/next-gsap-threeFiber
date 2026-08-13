"use client";

import { memo, Suspense, useMemo, useRef } from "react";
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import { shaderMaterial, useTexture } from "@react-three/drei";
import { MathUtils } from "three";

const PUSH_FORCE = 1.2;
const VividImageMaterial = shaderMaterial(
  {
    uTexture: null,
    uHover: 0,
    uMOUSE: [0, 0],
    uPUSHFORCE: PUSH_FORCE,
    uTime: 0,
  },
  `
    varying vec2 vUv;
    uniform vec2 uMOUSE;
    uniform float uPUSHFORCE;
    uniform float uTime;
    varying float vinfluence;
    varying vec2 vFlow;
    
    // Smooth value noise
    float hash(vec2 p) {
      return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
    }
    
    float smoothNoise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      f = f * f * (3.0 - 2.0 * f);
      
      float a = hash(i);
      float b = hash(i + vec2(1.0, 0.0));
      float c = hash(i + vec2(0.0, 1.0));
      float d = hash(i + vec2(1.0, 1.0));
      
      return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
    }
    
    // Smooth flow field
    float flow(vec2 p, float time) {
      float n1 = smoothNoise(p * 1.5 + time * 0.15);
      float n2 = smoothNoise(p * 2.5 - time * 0.12 + vec2(1.7, 3.2));
      float n3 = smoothNoise(p * 3.5 + time * 0.08 + vec2(5.3, 7.1));
      return (n1 * 0.6 + n2 * 0.3 + n3 * 0.1);
    }

    void main() {
      vUv = uv;
      vec2 centeredUv = (vUv - 0.5) * 2.0;
      
      // Smooth distance with soft falloff
      float dist = length(centeredUv - uMOUSE);
      float influence = 1.0 - smoothstep(0.0, 0.6, dist);
      influence = influence * influence * (3.0 - 2.0 * influence); // Smoothstep again for softness
      vinfluence = influence;
      
      // Time for gentle flow
      float time = uTime * 0.4;
      
      // Smooth liquid displacement - like oil on water
      vec2 flowCoord = position.xy * 1.8 + vec2(time * 0.2, time * 0.15);
      float flow1 = flow(flowCoord, time);
      float flow2 = flow(flowCoord + vec2(3.7, 5.2), time + 1.3);
      
      // Combine for smooth wave
      float displacement = (flow1 - 0.5) * 0.8 + (flow2 - 0.5) * 0.4;
      displacement *= influence * uPUSHFORCE * 0.4;
      
      // Very gentle wave ripple
      float ripple = sin(centeredUv.x * 12.0 + time * 0.5) * cos(centeredUv.y * 12.0 + time * 0.7) * 0.015;
      ripple *= influence * uPUSHFORCE * 0.3;
      
      vec3 customPosition = position;
      customPosition.z += displacement + ripple;
      
      // Store flow for fragment
      vFlow = vec2(flow1, flow2);

      vec4 modelPosition = modelMatrix * vec4(customPosition, 1.0);
      vec4 viewPosition = viewMatrix * modelPosition;
      vec4 projectedPosition = projectionMatrix * viewPosition;
      gl_Position = projectedPosition;
    }
  `,
  `
    varying vec2 vUv;
    uniform sampler2D uTexture;
    uniform float uHover;
    uniform vec2 uMOUSE;
    uniform float uPUSHFORCE;
    uniform float uTime;
    varying float vinfluence;
    varying vec2 vFlow;

    void main() {
      vec2 uv = vUv;
      
      vec2 mouseUv = uMOUSE * 0.5 + 0.5;
      vec2 toMouse = uv - mouseUv;
      float dist = length(toMouse);
      
      // Very smooth, liquid-like mask
      float localMask = 1.0 - smoothstep(0.0, 0.6, dist);
      localMask = localMask * localMask * (3.0 - 2.0 * localMask);
      
      // Liquid flow direction - smooth and organic
      float angle = atan(toMouse.y, toMouse.x);
      float time = uTime * 0.3;
      
      // Gentle swirling flow like water
      float swirlAngle = sin(angle * 1.5 + time * 0.4 + dist * 3.0) * 0.25;
      vec2 dir = vec2(cos(angle + swirlAngle), sin(angle + swirlAngle));
      
      // Smooth liquid strength - very gentle
      float liquidStrength = localMask * (0.015 + uHover * 0.025) * uPUSHFORCE * vinfluence;
      
      // Soft wave distortion
      float waveX = sin(uv.y * 25.0 + time * 0.8 + vFlow.x * 2.0) * 0.004 * uHover;
      float waveY = cos(uv.x * 25.0 + time * 0.6 + vFlow.y * 2.0) * 0.004 * uHover;
      vec2 waveOffset = vec2(waveX, waveY) * localMask;
      
      // Gentle UV warp
      vec2 warpedUv = clamp(uv + dir * liquidStrength + waveOffset * 0.5, 0.001, 0.999);
      
      // SMOOTH RGB CHROMATIC ABERRATION - Very gentle, liquid-like
      float chromaStrength = (0.004 + uHover * 0.012) * localMask * (0.7 + 0.3 * vinfluence);
      
      // Different subtle directions for each channel
      float timeOffset = time * 0.2;
      vec2 redOffset = vec2(
        sin(angle * 0.5 + 0.2 + timeOffset) * chromaStrength,
        cos(angle * 0.5 + 0.2 + timeOffset) * chromaStrength * 0.6
      );
      vec2 blueOffset = vec2(
        sin(angle * 0.5 - 0.2 - timeOffset) * chromaStrength * 0.8,
        cos(angle * 0.5 - 0.2 - timeOffset) * chromaStrength * 0.6
      );
      
      // Apply chromatic shift
      vec2 redUv = clamp(warpedUv + redOffset, 0.001, 0.999);
      vec2 greenUv = warpedUv;
      vec2 blueUv = clamp(warpedUv + blueOffset, 0.001, 0.999);
      
      // Sample each channel
      float r = texture2D(uTexture, redUv).r;
      float g = texture2D(uTexture, greenUv).g;
      float b = texture2D(uTexture, blueUv).b;
      
      // Slight warmth for liquid feel
      vec3 color = vec3(r, g, b);
      color *= 1.0 + vec3(0.05, 0.0, -0.02) * uHover;
      
      // Very subtle vignette
      float vignette = 1.0 - dist * 0.15 * uHover;
      color *= vignette;
      
      gl_FragColor = vec4(color, 1.0);
    }
  `,
);

extend({ VividImageMaterial });

function ShaderPlane({ src }) {
  const materialRef = useRef(null);
  const hoveredRef = useRef(false);
  const targetMouseRef = useRef([0, 0]);
  const texture = useTexture(src);
  const viewport = useThree((state) => state.viewport);
  const invalidate = useThree((state) => state.invalidate);

  const aspect = useMemo(() => {
    const image = texture?.image;
    if (!image?.width || !image?.height) {
      return 1;
    }
    return image.width / image.height;
  }, [texture]);

  const coverScale = useMemo(() => {
    const viewportAspect = viewport.width / viewport.height;

    if (aspect > viewportAspect) {
      return [viewport.height * aspect, viewport.height, 1];
    }

    return [viewport.width, viewport.width / aspect, 1];
  }, [aspect, viewport.height, viewport.width]);

  useFrame((state, delta) => {
    if (!materialRef.current) {
      return;
    }

    materialRef.current.uTime = state.clock.getElapsedTime();

    const targetX = hoveredRef.current ? targetMouseRef.current[0] : 0;
    const targetY = hoveredRef.current ? targetMouseRef.current[1] : 0;

    // Slower, smoother interpolation
    const nextX = MathUtils.lerp(materialRef.current.uMOUSE[0], targetX, 0.06);
    const nextY = MathUtils.lerp(materialRef.current.uMOUSE[1], targetY, 0.06);
    materialRef.current.uMOUSE = [nextX, nextY];

    materialRef.current.uHover = MathUtils.lerp(
      materialRef.current.uHover,
      hoveredRef.current ? 1 : 0,
      0.04, // Very slow fade for smoothness
    );

    materialRef.current.uPUSHFORCE = MathUtils.lerp(
      materialRef.current.uPUSHFORCE,
      hoveredRef.current ? PUSH_FORCE : 0.1,
      0.04,
    );

    const moving =
      Math.abs(targetX - nextX) > 0.0008 ||
      Math.abs(targetY - nextY) > 0.0008 ||
      materialRef.current.uHover > 0.001;

    if (moving) {
      invalidate();
    }
  });

  return (
    <mesh
      scale={coverScale}
      onPointerEnter={() => {
        hoveredRef.current = true;
        invalidate();
      }}
      onPointerMove={(event) => {
        targetMouseRef.current[0] = event.pointer.x;
        targetMouseRef.current[1] = event.pointer.y;
        invalidate();
      }}
      onPointerLeave={() => {
        hoveredRef.current = false;
        invalidate();
      }}
    >
      <planeGeometry args={[1, 1, 32, 32]} />
      <vividImageMaterial ref={materialRef} uTexture={texture} />
    </mesh>
  );
}

function ShaderImage({ src, className = "" }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Canvas
        className="absolute inset-0 block w-full h-full"
        style={{ display: "block", width: "100%", height: "100%" }}
        frameloop="demand"
        camera={{ position: [0, 0, 2.1], fov: 42, near: 0.1, far: 20 }}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 1.25]}
      >
        <Suspense fallback={null}>
          <ShaderPlane src={src} />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default memo(ShaderImage);