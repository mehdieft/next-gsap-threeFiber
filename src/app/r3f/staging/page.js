"use client"
import { Canvas } from "@react-three/fiber";
import Car from "@/app/components/3D/staging/car";
import { OrbitControls } from "@react-three/drei";
import { Leva } from 'leva' // Import Leva

export default function Staging() {
    return (
        <>
            <main className="w-full h-full relative">
                <Canvas
                    className="canvas"
                    camera={{ position: [0, 0, 1.5], fov: 30 }}
                >
                    <Car />
                </Canvas>
                <header className="flex justify-center items-center gap-10 absolute w-full top-0 ">
                    <a>home</a>
                    <a>home</a>
                    <a>home</a>
                    <a>home</a>
                </header>
                <div className="w-full h-svh bg-red-500 ">
                    {/* here its 3d canvas */}
                    <div className="absolute top-1/5 gap-8 p-4 flex flex-col left-10 justify-center items-center w-1/3 ">
                        <h1 className="text-8xl text-gray-900 font-bold text-center">mehdi saedi portfolio</h1>
                        <h1 className="text-base">hope enjoy the exprience with this fancy ui design I create  </h1>
                        <div className="flex justify-center gap-10 items-start">
                            <button className="btn btn-secondary text-md">join now</button>
                            <button className="btn btn-ghost text-black hover:text-white transition-all duration-100">descover more</button>
                        </div>
                    </div>
                </div>
            </main>



        </>
    )
}