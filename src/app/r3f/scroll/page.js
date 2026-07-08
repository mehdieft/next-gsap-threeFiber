"use client"
import { Canvas } from "@react-three/fiber";
import ScrollContent from "../components/scrollComponents/scrollContent";
import { Scroll, ScrollControls } from "@react-three/drei";
import { useControls } from 'leva'
import TextContent from "../components/scrollComponents/textContent";

export default function ScrollPage() {
    return (
        <>
            <div className="w-full h-screen bg-gray-400 sticky">
                <Canvas camera={{}}>
                    <ambientLight />
                    <ScrollControls pages={5}>
                        <ScrollContent />
                        <Scroll html>
                            <TextContent/>
                        </Scroll>
                    </ScrollControls>
                </Canvas>
            </div>
            
           

        </>
    )
}