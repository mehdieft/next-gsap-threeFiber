"use client"
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import clsx from "clsx";
import { useRef, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FaTimesCircle } from "react-icons/fa";

const TOAST_TYPE={
    sucess:'success',
    error:'error',
    info:'info'
}
export default function Toast({ message, type = TOAST_TYPE.sucess }) {
    const container=useRef()
    const [visible,setVisibe]=useState(true)
    useGSAP(()=>{
        if(!container.current)return
        gsap.set('.text',{opacity:0})
        const tl=gsap.timeline({onComplete:()=>{
            setVisibe(false)
        }})
        tl.fromTo(container.current,{xPercent:120},{xPercent:0,duration:0.5,ease:'back.out'})
        tl.to('.text',{opacity:1,stagger:0.4})
        tl.to('.text',{opacity:0,duration:4,stagger:0.04,delay:2})
        tl.to(container.current,{xPercent:120,ease:'back.inOut',duration:0.5})
       

    },{scope:container})
    if(!visible)return null
  return (
 
      <div ref={container} className={clsx('px-8 py-3 p-3 z-100 max-w-[30vw] will-change-transform flex flex-col fixed top-4 right-4 rounded-2xl shadow-2xl',type==='success'?'bg-green-200 text-green-900':'',
        type==='error'?'bg-red-200 text-red-900':'' )}>
        <h1 className=" text will-change-opacity font-bold flex justify-end items-center text-center gap-3 font-bold text-sm">
            {type==='success'&&  <FaCheckCircle/>}
            {type==='error'&&<FaTimesCircle/>}
           
            {type}
            </h1>
        <h1 className=" will-change-opacity text ">{message}</h1>
      </div>
    
  );
}
