import {useGSAP} from '@gsap/react'
import gsap from 'gsap' 
import {useRef} from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import splitText from 'gsap/SplitText';
gsap.registerPlugin(splitText,ScrollTrigger)
export default function AnimatedText({text,delay,duration,scrub}){
    const containerRef=useRef(null)
    const textRef=useRef(null)
    const splitRef=useRef(null)
    useGSAP(()=>
        {
            const el=containerRef.current
            if(!el)return
             splitRef.current=splitText.create(textRef.current,{
                type:"lines,words,chars",
                autoSplit:true,
                charsClass:'text-animation-char',
                linesClass:'text-animation-line',
                wordsClass:'text-animation-word'
             })
             const {line,chars}=splitRef.current
             
        },
    {scope:containerRef})
    return(
        <>
        <section ref={containerRef}>
            <h1 ref={textRef} ></h1>
        </section>
        </>
    )
}