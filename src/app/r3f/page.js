"use client"
import { Canvas } from "@react-three/fiber"
import Scene from "./components/Scene"
import { CameraControls,OrbitControls,Environment } from '@react-three/drei'
import Model from "./components/model"
import Floor from "./components/floor"
export default function R3f(){
    return(
        <>
        <div className="bg-white w-full h-screen flex justify-center items-center overflow-hidden ">
        <Canvas camera={{position:[-10,-10,-10]}}>
           <OrbitControls/>
          <hemisphereLight args={[ 0xffffbb, 0x080820, 1]} />
           <ambientLight intensity={0.1} />

            {/* <CameraControls/> */}
          <Scene/>
        <Floor/>

        </Canvas>
        </div>
        <div className="w-full h-screen bg-green-500 z-10"></div>
        </>
    )
}