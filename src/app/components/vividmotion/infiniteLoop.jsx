import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { useRef } from "react";
export default function InfiniteLoop() {
  const imageContainer = useRef();
  useGSAP(
    () => {
      if (!imageContainer.current) return;
      const width = imageContainer.current.scrollWidth;
      const marqueWidth =
        imageContainer.current.querySelector(".marque").scrollWidth;

      console.log("width----", width,marqueWidth);
      gsap.to('.marque', {
        x: -width / 2,
        duration: 10,
        repeat: -1,
        ease: "back.inOut",
      });
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
    <div className="w-full overflow-hidden">
  <div ref={imageContainer} className="flex">
    <div className="flex gap-20 marque ">
      {Images.map((item, index) => (
        <Image
          key={index}
          src={item}
          width={100}
          height={50}
          className="w-20 shrink-0"
          alt=""
        />
      ))}
    </div>

    <div className="flex gap-20 marque">
      {Images.map((item, index) => (
        <Image
          key={`copy-${index}`}
          src={item}
          width={100}
          height={50}
          className="w-20 shrink-0"
          alt=""
        />
      ))}
    </div>
  </div>
</div>
    </>
  );
}
