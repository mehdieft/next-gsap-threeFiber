"use client"
import { Experience } from "@/app/components/3D/theatre/Experience";
import { Canvas } from "@react-three/fiber";
import { getProject } from "@theatre/core";
import { SheetProvider } from '@theatre/r3f'
import studio from '@theatre/studio'
import extension from '@theatre/r3f/dist/extension'

studio.initialize()
studio.extend(extension)

const demoSheet = getProject('Demo Project').sheet('Demo Sheet')

export default function Theatre(){
    return(
        <>
        <div className="w-full h-svh bg-green-800">
            <Canvas>
                <SheetProvider sheet={demoSheet}>

                <Experience/>
                </SheetProvider>
            </Canvas>
        </div>
        </>
    )
}