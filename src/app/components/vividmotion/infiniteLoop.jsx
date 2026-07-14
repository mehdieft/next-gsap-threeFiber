import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { useRef } from "react";
export default function InfiniteLoop() {
  const imageContainer = useRef();
  useGSAP(
    () => {
      if (!imageContainer.current) return;
      const width = imageContainer.current.offsetWidth;
      
      console.log("width----", width);
   gsap.fromTo(imageContainer.current,{x:0},{x:-width,duration:10,repeat:-1,ease:'none'})
    },
    { scope: imageContainer },
  );

  const Images = [
    "/images/vividmotion/cisco.svg",
    "/images/vividmotion/aws.svg",
    "/images/vividmotion/barcelona.svg",
    "/images/vividmotion/dribble.svg",
    "/images/vividmotion/hp.svg",
    "/images/vividmotion/immuta.svg",
    "/images/vividmotion/lifefitness.svg",
    "/images/vividmotion/mastercard.svg",
    "/images/vividmotion/meta.svg",
    "/images/vividmotion/soundcloud.svg",
    "/images/vividmotion/yahoo.svg",
    "/images/vividmotion/billo.svg",
    "/images/vividmotion/bioc.svg",
    "/images/vividmotion/tripple.svg",
    "/images/vividmotion/vesync.svg",
    "/images/vividmotion/board.svg",
   
  ];
  
  return (
    <>
      <div className="overflow-hidden">
        <div
          ref={imageContainer}
          className=" flex justify-center items-center gap-20  will-change-transform"
        >
          {Images.map((item, index) => {
            return (
              <Image
                src={item}
                className="w-40"
                alt="key"
                key={index}
                width={250}
                height={50}
              />
            );
          })}
             {Images.map((item, index) => {
            return (
              <Image
                src={item}
                className="w-40"
                alt="key"
                key={index*0.01}
                width={250}
                height={50}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
