"use client";
import Image from "next/image";
import { Canvas } from "@react-three/fiber";
import { Pepsi } from "./pepsi";
import { useRef } from "react";
import { Float } from "@react-three/drei";
import { Basket } from "./basket";
import { Bolsa } from "./bolsa";
import { Zumo } from "./zumo";
import { Chocolatia } from "./chocolatia";
import { Can } from './can';
import { OrbitControls, Environment } from "@react-three/drei";

import gsap from "gsap";
import scrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Leva, useControls } from "leva";
gsap.registerPlugin(scrollTrigger);

function useModelControls(name, defaults) {
    return useControls(name, {
        position: { value: defaults.position, step: 0.1 },
        rotation: { value: defaults.rotation, step: 0.1 },
        scale: { value: defaults.scale, min: 0.001, max: 0.1, step: 0.001 },
    });
}

export default function Selencio() {
    const mainRef = useRef()
    const basketRef = useRef()
    const zumoRef = useRef()
    const bolsaRef = useRef()
    const chocolatiaRef = useRef()
    const modelRef = useRef()
    const canRef = useRef()
    const isMobile =
  typeof window !== "undefined" &&
  window.matchMedia("(max-width: 768px)").matches;
    const basketTransform = useModelControls("Basket", {
        position: [0, -5, 0],
        rotation: [0, Math.PI, 0],
        scale: 0.02,
    });
    const zumoTransform = useModelControls("Zumo", {
        position: [1.3, 0, 0],
        rotation: [0, 0, 0],
        scale: 0.01,
    });
    const chocolatiaTransform = useModelControls("Chocolatia", {
        position: [-1, 0, 1],
        rotation: [0, Math.PI / 2, Math.PI / 2],
        scale: 0.005,
    });
    const bolsaTransform = useModelControls("Bolsa", {
        position: [0, 0.5, -1.2],
        rotation: [0, 0, 0],
        scale: 0.01,
    });
    const canTransform = useModelControls("Can", {
        position: [0, 0, 0],
        rotation: [0, 0, 0],
        scale: 0.01,
    });
    useGSAP(() => {
        const can = canRef.current;
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: mainRef.current,
                start: "top top",
                end: "bottom bottom",

                onUpdate: (self) => {
                    if (!can) return;

                    can.rotation.x = self.progress * Math.PI * 2;
                },

                onLeave: () => {
                    if (!can) return;

                    gsap.to(can.rotation, {
                        x: 0,
                        y: 0,
                        z: 0,
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
                    gsap.to(can.scale, {
                        x: 0.004,
                        y: 0.004,
                        z: 0.004,
                        duration: 0.5,
                        overwrite: true,
                    });
                },

                onEnterBack: () => {
                    if (!can) return;

                    gsap.to(can.position, {
                        y: 0,
                        duration: 0.6,
                        overwrite: true,
                    });
                    gsap.to(can.scale, {
                        x: 0.006,
                        y: 0.006,
                        z: 0.006,
                        duration: 0.5,
                        overwrite: true,
                    });
                },
            }
        })
        const tl2 = gsap.timeline({
            scrollTrigger: {
                trigger: ".scanner",
                start: "top top",
                end: "+=2000px",
                markers: true,
                scrub: true,
                pin: true,
                pinSpacing: true,
            },
        });
    }, { scope: mainRef });
    return (
        <>
            <Leva collapsed={false} />
            <div className="model fixed z-0 pointer-events-none w-screen h-svh bg-gray-500">
                <Canvas camera={{ position: [0, 0, 5], fov: 40, far: 20, near: 0.1,zoom: isMobile ? 0.5 : 1.4,}} >
                    {/* <Environment preset="sunset" /> */}
                    {/* <OrbitControls /> */}
                    <ambientLight intensity={20.5} />
                    <directionalLight position={[5, 5, 5]} intensity={8} />
                    <directionalLight position={[-5, 5, 5]} intensity={8} />
                    {/* <Environment preset="city" /> */}

                  
                        <Basket ref={basketRef} {...basketTransform} />
                   

                    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
                        <Zumo ref={zumoRef} {...zumoTransform} />
                    </Float>
                    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
                        <Chocolatia ref={chocolatiaRef} {...chocolatiaTransform} />
                    </Float>
                    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
                        <Bolsa ref={bolsaRef} {...bolsaTransform} />
                    </Float>
                    <Float speed={2} rotationIntensity={0} floatIntensity={1}>
                        <Can ref={canRef} {...canTransform} />
                    </Float>
                </Canvas>
            </div>
            <main ref={mainRef} className="relative z-10">
                <section className="hero w-svw h-svh py-10 flex flex-col items-center justify-between text-center">
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
