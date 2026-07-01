"use client"
import { ReactLenis } from 'lenis/react'
import {useGSAP} from '@gsap/react'
import gsap from 'gsap' 
import {useRef} from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import splitText from 'gsap/SplitText';
export default function TextAnimationExample() {
    gsap.registerPlugin(ScrollTrigger,splitText)
    const firstTextRef=useRef(null)
    const splitRef=useRef(null)
    useGSAP(()=>{
       const el=firstTextRef.current
       if(!el) return

        splitRef.current=splitText.create('#text-wrapper-one',{
            type:"lines,words,chars",
            lineClass:"text-animation-line",
            wordClass:"text-animation-word",
            charClass:"text-animation-char",
            autoSplit:true
        })
        console.log('see whats inside me',splitRef.current)
        const { lines, chars } = splitRef.current
        gsap.set(chars, { x:100,opacity:0,skewX:20 })

        
        const charMeta=lines.flatMap((line)=>{
            console.log('line',line)
          
            const lineChars=chars.filter((c)=>line.contains(c))
            return lineChars.map((char,charIndexLine)=>({
                char,
                charIndexLine,
            }))
        })
        console.log("this is charMeta with flatMap",charMeta)
     
        const animate=(tl)=>{
            charMeta.forEach(({char,charIndexLine})=>{
                tl.to(char,{
                    x:0,
                    opacity:1,
                    skewX:0,
                    ease:'power4.out',
                    duration:1.8,
                },
                charIndexLine*0.08
            )
                
            })
            return tl
        }
        const tl=gsap.timeline({});
        animate(tl)
       return()=>splitRef.current?.revert()        
    },{scope:firstTextRef})

    return (
        <>
            <ReactLenis root>
                <section ref={firstTextRef} className="h-svh w-full flex justify-center items-center bg-purple-600">
                    <h1 id="text-wrapper-one" className="w-[65%] text-center text-[clamp(3rem,8vw,10rem)] tracking-wider ">lorem ipsum is great and i love this kind of animation</h1>
                </section>
             
                <section>

                </section>
                <section>

                </section>

            </ReactLenis>
        </>
    )
}