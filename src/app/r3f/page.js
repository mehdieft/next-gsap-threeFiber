"use client"
import { Canvas } from "@react-three/fiber"
import Exprience from "./components/Exprience"


import { CameraControls, OrbitControls, Environment, KeyboardControls } from '@react-three/drei'
import { useMemo } from "react"

export const Controls = {
    forward: 'forward',
    back: 'back',
    left: 'left',
    right: 'right'
}
export default function R3f() {
    const map = useMemo(() => [
        {
            name: Controls.forward,
            keys: ['ArrowUp', 'KeyW']
        },
        {
            name: Controls.back,
            keys: ['ArrowDown', 'KeyS']

        },
        {
            name:Controls.right,
            keys:['ArrowRight','KeyD']
        },{
            name:Controls.left,
            keys:['ArrowLeft','KeyA']
        }
    ])
    return (
        <>
            <div className="bg-gray-500 w-full h-screen flex justify-center items-center overflow-hidden ">
                <KeyboardControls map={map}>
                    <Canvas camera={{ position: [-1, 3, 5] }}>
                        <Exprience />
                    </Canvas>
                </KeyboardControls>
            </div>
            <div className="w-full h-screen bg-green-500 z-10"></div>
        </>
    )
}