
"use client"
import FirstShaders from "@/app/components/3D/shadersToturial/first";
import { Canvas } from "@react-three/fiber";


export default function ShadersToturial(){
    return(
        <>
        <div className="w-full h-svh bg-white">
            <Canvas  camera={{
                position:[0,0,10],
                fov:10,
                near:0.1,
                far:20
            }}>
                <FirstShaders/>
            </Canvas>
        </div>
        </>
    )
}