"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import { shaderMaterial, useTexture } from "@react-three/drei";
import { MathUtils } from "three";
const PUSH_FORCE=1.4
const VividImageMaterial = shaderMaterial(
  {
    uTexture: null,
    uTime: 0,
    uHover: 0,
    uMOUSE:[0,0],
    
    uPUSHFORCE:PUSH_FORCE
  },
  `
    varying vec2 vUv;
    uniform vec2 uMOUSE;
     uniform float uTime;
    uniform float uPUSHFORCE;
    void main() {
      vUv = uv;
      vec2 centeredUv=(vUv-0.5)*2.0;
      float pushed=length(centeredUv-uMOUSE);
      pushed=1.0-pushed;
      vec3 customPosition=position;
      customPosition.z+=uMOUSE.x*pushed*uPUSHFORCE;
     vec4 modelPosition = modelMatrix * vec4(customPosition, 1.0);
     vec4 viewPosition = viewMatrix * modelPosition;
     vec4 projectedPosition = projectionMatrix * viewPosition;
     gl_Position = projectedPosition;
    }
  `,
  `
    varying vec2 vUv;
    uniform sampler2D uTexture;
    uniform float uTime;
    uniform float uHover;

    void main() {
      vec2 uv = vUv;

      float waveX = sin((uv.y + uTime * 0.8) * 14.0) * 0.008;
      float waveY = cos((uv.x - uTime * 0.6) * 12.0) * 0.006;
      float intensity = 0.45 + uHover * 1.2;

    //   uv.x += waveX * intensity;
    //   uv.y += waveY * intensity;

      vec4 base = texture2D(uTexture, uv);
      float offset = 0.0025 + uHover * 0.0035;

      float r = texture2D(uTexture, uv + vec2(offset, 0.01)).r;
      float g = base.g;
      float b = texture2D(uTexture, uv - vec2(offset, 0.02)).b;

      gl_FragColor = vec4(r, g, b, base.a);
    }
  `,
);

extend({ VividImageMaterial });

function ShaderPlane({ src }) {
  const materialRef = useRef(null);
  const hoveredRef = useRef(false);
  const texture = useTexture(src);
  const viewport = useThree((state) => state.viewport);

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
    if(!hoveredRef.current)return
    const {pointer}=state 
   materialRef.current.uMOUSE=[
    hoveredRef.current?MathUtils.lerp(materialRef.current.uMOUSE[0],pointer.x,0.05):0,
     hoveredRef.current?MathUtils.lerp(materialRef.current.uMOUSE[1],pointer.y,0.05):0]
   

    materialRef.current.uTime += delta;
    materialRef.current.uHover = MathUtils.lerp(
      materialRef.current.uHover,
      hoveredRef.current ? 1 : 0,
      0.08,
    );
  });

  return (
    <mesh
      scale={coverScale}
      onPointerEnter={() => {
        hoveredRef.current = true;
      }}
      onPointerLeave={() => {
        hoveredRef.current = false;
      }}
    >
      <planeGeometry args={[1, 1, 36, 36]} />
      <vividImageMaterial ref={materialRef} uTexture={texture} uMOUSE={[0,0]}  />
    </mesh>
  );
}

export default function ShaderImage({ src, className = "" }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Canvas
        className="absolute inset-0 block w-full h-full"
        style={{ display: "block", width: "100%", height: "100%" }}
        orthographic
        camera={{ position: [0, 0, 5], zoom: 100 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <Suspense fallback={null}>
          <ShaderPlane src={src} />
        </Suspense>
      </Canvas>
    </div>
  );
}