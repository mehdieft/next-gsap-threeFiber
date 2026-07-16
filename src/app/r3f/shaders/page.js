
"use client"
import FirstShaders from "@/app/components/3D/shadersToturial/first";
import { Canvas } from "@react-three/fiber";


export default function ShadersToturial(){
    return(
        <>
        <div className="w-full h-svh bg-red-400">
            <Canvas>
                <FirstShaders/>
            </Canvas>
        </div>
        </>
    )
}