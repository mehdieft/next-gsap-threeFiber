"use client";

import { memo, Suspense, useMemo, useRef } from "react";
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import { shaderMaterial, useTexture } from "@react-three/drei";
import { MathUtils } from "three";

const PUSH_FORCE = 1.4;
const VividImageMaterial = shaderMaterial(
  {
    uTexture: null,
    uHover: 0,
    uMOUSE: [0, 0],
    uPUSHFORCE: PUSH_FORCE,
  },
  `
    varying vec2 vUv;
    uniform vec2 uMOUSE;
    uniform float uPUSHFORCE;
    varying float vinfluence;
    float random(vec2 st) {
    return fract(sin(dot(st, vec2(12.9898,78.233))) * 43758.5453123);
}

float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x)
         + (c - a) * u.y * (1.0 - u.x)
         + (d - b) * u.x * u.y;
}

    void main() {
      vUv = uv;
      vec2 mouseUv = uMOUSE * 0.5 + 0.5;


      vec2 centeredUv = (vUv - 0.5) * 2.0;
      float dist = distance(centeredUv, uMOUSE);
      float influence = 1.0 - smoothstep(0.0, 0.35, dist);
      vinfluence=influence;
      vec3 customPosition = position;
      customPosition.z += influence *noise(position.xy*5.0)* uPUSHFORCE ;

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
    varying float vinfluence;

    void main() {
      vec2 uv = vUv;

      vec2 mouseUv = uMOUSE * 0.5 + 0.5;
      vec2 toMouse = uv - mouseUv;
      float dist = length(toMouse);
      float localMask =
    pow(
        1.0 - smoothstep(0.0, 0.45, dist),
        2.0
    );

      vec2 dir = normalize(toMouse);
      float strength = localMask * (0.012 + uHover * 0.015) * uPUSHFORCE *vinfluence;
      vec2 warpedUv = clamp(uv + dir * strength, 0.001, 0.999);

      vec4 base = texture2D(uTexture, warpedUv);
      float offset = (0.001 + uHover * 0.0025) * localMask;

      float r = texture2D(uTexture, warpedUv + vec2(offset, -0.02*uHover)).r;
      float g = base.g;
      float b = texture2D(uTexture, warpedUv - vec2(offset, +0.02*uHover)).b;
      
     

      gl_FragColor = vec4(r,g,b,1.0);
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

    const targetX = hoveredRef.current ? targetMouseRef.current[0] : 0;
    const targetY = hoveredRef.current ? targetMouseRef.current[1] : 0;

    const nextX = MathUtils.lerp(materialRef.current.uMOUSE[0], targetX, 0.12);
    const nextY = MathUtils.lerp(materialRef.current.uMOUSE[1], targetY, 0.12);
    materialRef.current.uMOUSE = [nextX, nextY];

    materialRef.current.uHover = MathUtils.lerp(
      materialRef.current.uHover,
      hoveredRef.current ? 1 : 0,
      0.1,
    );

    materialRef.current.uPUSHFORCE = MathUtils.lerp(
      materialRef.current.uPUSHFORCE,
      hoveredRef.current ? PUSH_FORCE : 0,
      0.08,
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
      <planeGeometry args={[1, 1, 24, 24]} />
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