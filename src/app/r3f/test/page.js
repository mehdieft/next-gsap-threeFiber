"use client"
import Sphere from "@/app/components/3D/test/Sphere";
import { Canvas } from "@react-three/fiber";

export default function Test(){
    return(
        <>
        <div className="bg-green-400 w-svw h-svh">
            <Canvas>
                <Sphere/>
            </Canvas>
        </div>
        </>
    )
}