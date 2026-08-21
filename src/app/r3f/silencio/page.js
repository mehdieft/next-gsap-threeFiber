"use client";
import Image from "next/image";
import { Canvas } from "@react-three/fiber";
import { Pepsi } from "./pepsi";
import { useRef } from "react";
import { Float } from "@react-three/drei";

import gsap from "gsap";
import scrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(scrollTrigger);
export default function Selencio() {
    const mainRef = useRef()
    const modelRef = useRef()
    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: mainRef.current,
                start: "top top",
                end: "bottom bottom",

                onUpdate: (self) => {
                    if (!modelRef.current) return;

                    gsap.to(modelRef.current.rotation, {
                        x: self.progress * Math.PI * 2,
                        overwrite: true,
                    });
                },

                onLeave: () => {
                    if (!modelRef.current) return;

                    gsap.to(modelRef.current.rotation, {
                        x: 0,
                        y: 0,
                        z:0,
                        duration: 0.5,
                        overwrite: true,
                    });

                    // gsap.to(modelRef.current.position, {
                    //     x: 0,
                    //     y: 100,
                    //     z: 0,
                    //     ease: "power2.inOut",
                    //     duration: 2.3,
                    //     overwrite: true,
                    // });
                    gsap.to(modelRef.current.scale, {
                        x: 0.004,
                        y: 0.004,
                        z: 0.004,
                        duration: 0.5,
                        overwrite: true,
                    });
                },

                onEnterBack: () => {
                    if (!modelRef.current) return;

                    gsap.to(modelRef.current.position, {
                        y: 0,
                        duration: 0.6,
                        overwrite: true,
                    });
                       gsap.to(modelRef.current.scale, {
                        x:0.006,
                        y:0.006,
                        z:0.006,
                        duration: 0.5,
                        overwrite: true,
                    });
                },
            }
        })
    }, {});
    return (
        <>
            <div className="model fixed z-0 pointer-events-none w-screen h-svh bg-gray-500">
                <Canvas camera={{ position: [0, 0, 5], fov: 40, far: 20, near: 0.1 }}>
                    <ambientLight intensity={2.5} />
                    <directionalLight position={[5, 5, 5]} intensity={8} />
                    <directionalLight position={[-5, 5, 5]} color="yellow" intensity={8} />
                    <Float
                        speed={2}
                        rotationIntensity={1}
                        floatIntensity={1}
                    >
                        <Pepsi ref={modelRef} />
                    </Float>

                </Canvas>
            </div>
            <main ref={mainRef} className="relative z-10">

                <section className="hero w-svw h-svh flex flex-col items-center justify-center text-center">
                    <h1>
                        Digital <br /> Evolution
                    </h1>
                    <h2>Transform your brand identity</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </section>
                <section className="info h-svh w-svw">
                    <p>Lorem ipsum dolor sit amet</p>
                    <p>Lorem ipsum dolor sit amet</p>
                    <p>Lorem ipsum dolor sit amet</p>
                    <p>Lorem ipsum dolor sit amet</p>
                    <h2>loremsdkjhsd klsdhf;sfdfowiihf;dsfho;idhff ;seehfjsijeei</h2>
                </section>
                <section className="scanner h-svh w-svw">
                    <div className="scan-info">
                        <div className="product-id">
                            <h2>#32423423</h2>
                        </div>
                        <div className="product-description">
                            <p>Product description goes here.</p>
                        </div>
                    </div>
                    <div className="scan-container"></div>
                    <div className="barcode">
                        <Image src="/barcode.png" alt="Barcode" width={200} height={50} />
                    </div>
                    <div className="purchased">
                        <p>innovation approved</p>
                    </div>
                </section>
                <section className="outro">
                    <h1>lorem ksfjdlk fsdkljsdiwe fwioeorfdskkjhsdbnf sjj</h1>
                </section>
            </main>
        </>
    );
}
