"use client"
import Sphere from "@/app/components/3D/test/Sphere";
import { Canvas } from "@react-three/fiber";
  import * as THREE from "three/webgpu";
export default function Test() {
    return (
        <>
            <div className="bg-green-400 w-svw h-svh">
                <Canvas gl={async (props) => {
                    const renderer = new THREE.WebGPURenderer(props);
                    await renderer.init();
                    return renderer;
                }}>
                    <Sphere />
                </Canvas>
            </div>
        </>
    )
}