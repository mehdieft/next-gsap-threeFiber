"use client"
import { Canvas } from "@react-three/fiber";
import Car from "@/app/components/3D/staging/car";
import { OrbitControls, View,PerspectiveCamera } from "@react-three/drei";
import { Leva } from 'leva' // Import Leva
import { useRef } from "react";
import ThreeText from "@/app/components/3D/staging/threeText";

export default function Staging() {
    const containerRef=useRef()
    const heroContainer=useRef()
    const nextRef=useRef()
    return (
        <>
            <main ref={containerRef} className="w-full h-full relative">

                <Canvas eventSource={containerRef}
                    className="canvas"
                    camera={{ position: [0, 2, 18.5], fov: 30 }}
                >
                 
                 <View track={heroContainer}>
                    <Car/>
                 </View>
                 <View track={nextRef}>
                     <PerspectiveCamera
            makeDefault
            position={[0, 0, 6]}
            fov={55}
          />
                   <ThreeText/>
                 </View>
                 
                </Canvas>
                
                <header className="flex justify-center items-center gap-10 absolute w-full top-0 z-10 ">
                    <a>home</a>
                    <a>home</a>
                    <a>home</a>
                    <a>home</a>
                </header>
                <div ref={heroContainer} className="w-full h-svh  ">
                    {/* here its 3d canvas */}
                    <div className="absolute top-1/5 gap-8 p-4 flex flex-col left-10 justify-center items-center w-1/3  ">
                        <h1 className="text-8xl select-none text-gray-900 font-bold text-center">mehdi saedi portfolio</h1>
                        <h1 className="text-base select-none">hope enjoy the exprience with this fancy ui design I create  </h1>
                        <div className="flex justify-center gap-10 items-start">
                            <button className="btn btn-secondary text-md bg-orange-300 pointer-events-auto">join now</button>
                            <button className="btn btn-ghost text-black hover:text-white transition-all duration-100 pointer-events-auto">descover more</button>
                        </div>
                    </div>
                </div>
            </main>
             <div className="w-full  bg-gray-600 ">
                <h1 className="text-5xl text-white text-center pb-40" >whats my resume?</h1>
                <div className="flex h-full">
                    <div className="flex-1 h-svh" ref={nextRef}>
                       
                    </div>
                    <div className="flex-1">
                        <h1>kjhsdfjksgdhj fksjdahfskadjlgf ssdfjkghskdfljgsadfnsd fsjkdfghhglsdfjkgsd kjsdflhsdgfjsvbdfs dafkjsdjhfsd sdfkhjsdg</h1>

                    </div>
                </div>
             </div>



        </>
    )
}