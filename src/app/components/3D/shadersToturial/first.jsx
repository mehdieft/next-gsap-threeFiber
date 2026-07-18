import { OrbitControls, shaderMaterial } from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Color } from "three";
import vertecShader from './shaders/vertex.js'
import fragmentShader from './shaders/fragment.js'



const MyShaderMaterial = shaderMaterial(
  {
    uColor:new Color("pink"),
    uTime:0
  },
  vertecShader,
  fragmentShader

);

extend({ MyShaderMaterial });

export default function FirstShaders() {
    const materialRef=useRef()
    useFrame((state)=>{
        materialRef.current.uTime=Math.sin( Math.PI*state.clock.elapsedTime)

    })
  return (
    <>
    <OrbitControls/>
    <mesh>
      <planeGeometry args={[1,1,30,30]} />
      <myShaderMaterial ref={materialRef} />
    </mesh>
    </>
  );
}