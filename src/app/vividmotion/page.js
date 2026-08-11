"use client";
import StarSvg from "../components/vividmotion/starSvg";
import InfiniteLoop from "../components/vividmotion/infiniteLoop";
import VideoSection from "../components/vividmotion/videoSection";
import PinSection from "../components/vividmotion/pinSection";
import { Canvas } from "@react-three/fiber";
import { useRef } from "react";
import { CameraControls, View } from "@react-three/drei";
import GridText from "../components/vividmotion/gridText";

import Sphere from "../components/3D/test/Sphere";
import MultiRoom from "../components/vividmotion/multiRoom";
import Link from "next/link";
import WhatIdo from "../components/vividmotion/whatIdo";

export default function VividMotion() {
    const containerRef=useRef()
    const firstScene=useRef()
    return (
        <>
            <div ref={containerRef} className="bg-black overflow-hidden ">
                <Canvas className="canvas" eventSource={containerRef}  camera={{ position: [0, 2, 18.5], fov: 30 }}>
                  
                    <View.Port/>
                    <View track={firstScene}>
                          <color attach="background" args={["#000000"]} />
                    <fog attach="fog" args={["#000000", 20, 50]} />
                    <Sphere/>
                    </View>
                </Canvas>
                
                <div className="w-screen h-[95vh] bg-black relative ">
                    <div ref={firstScene} id="3dscene" className="absolute inset-0 "></div>
                    <h1 className="absolute left-10 z-2 select-none top-1/3 text-7xl max-w-4/9 text-white">
                        hello to my world feel my control{" "}
                    </h1>
                    <div className="absolute z-2 bottom-0 w-full  p-10 mb-20">
                        <InfiniteLoop />
                    </div>
                </div>
                {/* <VideoSection /> */}
               <div className="p-20"></div>
            </div>
            <PinSection />
            <WhatIdo/>
            <GridText/>
            <div className="h-svh bg-red-950"></div>
        </>
    );
}
