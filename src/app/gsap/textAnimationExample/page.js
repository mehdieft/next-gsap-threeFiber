"use client"
import { ReactLenis } from 'lenis/react'

import AnimatedText from '../components/AnimatedText'

export default function TextAnimationExample() {



    return (
        <>
            <ReactLenis root>
                {/* <section ref={firstTextRef} className="h-svh w-full flex justify-center items-center bg-purple-600">
                    <h1 id="text-wrapper-one" className="w-[65%] text-center text-[clamp(3rem,8vw,10rem)] tracking-wider ">lorem ipsum is great and i love this kind of animation</h1>
                </section>
             
                <section>

                </section>
                <section>

                </section> */}
                <AnimatedText text={'HELLO MY NAME IS COMPONENT'} scrub={true} />
                 <AnimatedText text={'HELLO MY NAME IS COMPONENT'} />
                  <AnimatedText text={'HELLO MY NAME IS COMPONENT'} />

            </ReactLenis>
        </>
    )
}