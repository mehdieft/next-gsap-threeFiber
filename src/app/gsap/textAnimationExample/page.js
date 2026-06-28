"use client"
import { ReactLenis } from 'lenis/react'
export default function TextAnimationExample() {
    return (
        <>
            <ReactLenis root>
                <section className="h-svh w-full flex justify-center items-center bg-purple-600">
                    <h1 className="w-[65%] text-center text-[clamp(3rem,8vw,10rem)] tracking-wider ">lorem ipsum is greate</h1>

                </section>
                <section>

                </section>
                <section>

                </section>

            </ReactLenis>
        </>
    )
}