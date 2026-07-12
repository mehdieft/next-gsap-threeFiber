"use client"
import { Experience } from "@/app/components/3D/theatre/Experience";
import { Canvas } from "@react-three/fiber";
import { getProject } from "@theatre/core";
import { PerspectiveCamera, SheetProvider } from '@theatre/r3f'
import studio from '@theatre/studio'
import extension from '@theatre/r3f/dist/extension'
import { editable as e } from "@theatre/r3f";
import { useRef } from "react";
studio.initialize()
studio.extend(extension)

const demoSheet = getProject('Demo Project').sheet('Demo Sheet')

export default function Theatre(){
    const cameraTarget=useRef()
    return(
        <>
        <div className="w-full h-svh bg-green-800">
            <Canvas gl={{preserveDrawingBuffer:true}}>
                <SheetProvider sheet={demoSheet}>
                <PerspectiveCamera position={[0,0,10]} theatreKey="camera"  makeDefault fov={30} far={90} near={1} lookAt={cameraTarget.current?.position} />
                <Experience/>
                <e.mesh theatreKey="camera target" scale={0.2} visible="editor" position={[0,0,-5]} ref={cameraTarget} >
                    <octahedronGeometry args={[1,0]} />
                    <meshPhongMaterial color="pink" />
                </e.mesh>
                </SheetProvider>
            </Canvas>
        </div>
        </>
    )
}