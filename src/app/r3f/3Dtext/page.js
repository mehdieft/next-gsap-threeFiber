"use client"
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Exprience from "./components/Expreience";
export default function Text3D(){
    return (
        <>
        <div className="w-full h-screen bg-gray-400">
        <Canvas>
            <Exprience/>
        </Canvas>
        </div>
        </>
    )
}