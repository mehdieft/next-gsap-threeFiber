"use client"
import { Canvas } from "@react-three/fiber";
import Phone from "@/app/components/3D/cameraControll/phone";
import { UI } from "@/app/components/3D/cameraControll/ui";
import { useState } from "react";
import { Leva } from "leva";
export default function CameraControll() {
    const [section, setSection] = useState(0)
    return (
        <>

            <div className="h-svh w-full">
                <Leva  />

                <Canvas camera={{ position: [0, 0, 2], fov: 30 }}>
                    <color attach="background" args={["#171720"]} />
                    <fog attach="fog" args={['#171720', 5, 10]} />
                    <Phone section={section} />
                </Canvas>
                <UI section={section} onSectionChange={setSection} />
            </div>

        </>
    )
}