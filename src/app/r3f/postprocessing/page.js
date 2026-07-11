"use client"
import Effects from "@/app/components/3D/postprocessing/effect";
import PostModel from "@/app/components/3D/postprocessing/model";
import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";

export default function PostProccessing(){
    return(
        <>
        <div className="w-full h-svh bg-red-500">
            <Leva />
            <Canvas>
                <PostModel/>
                <Effects/>
            </Canvas>
        </div>
        </>
    )
}