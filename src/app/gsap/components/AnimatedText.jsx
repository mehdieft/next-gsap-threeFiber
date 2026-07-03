import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import splitText from "gsap/SplitText";
gsap.registerPlugin(splitText, ScrollTrigger);
export default function AnimatedText({
  text="hello there friend hope you enjoy ",
  delay = 0,
  duration = 2,
  scrub = false,
}) {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const splitRef = useRef(null);
  useGSAP(
    () => {
      const el = containerRef.current;
      if (!el) return;
      splitRef.current = splitText.create(textRef.current, {
        type: "lines,words,chars",
        autoSplit: true,
        charsClass: "text-animation-char",
        linesClass: "text-animation-line",
        wordsClass: "text-animation-word",
      });
      const { lines, chars } = splitRef.current;
      gsap.set(chars, { x: 100, opacity: 0, skewX: 20 });

      const charMeta = lines.flatMap((line) => {
        console.log("line", line);

        const lineChars = chars.filter((c) => line.contains(c));
        return lineChars.map((char, charIndexLine) => ({
          char,
          charIndexLine,
        }));
      });
      console.log("this is charMeta with flatMap", charMeta);

      const animate = (tl) => {
        charMeta.forEach(({ char, charIndexLine }) => {
          tl.to(
            char,
            {
              x: 0,
              opacity: 1,
              skewX: 0,
              ease: "power4.out",
              duration: 1.8,
            },
            charIndexLine * 0.08,
          );
        });
        return tl;
      };
      const tl = gsap.timeline({ paused: true, duration: duration });
      animate(tl);
      if (!scrub) {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          markers:true,
          animation: tl,
          toggleActions: "play reverse  play reverse",
       
          
        });
      } else {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start:'top top',
          end:'+=300px',
          scrub: 3,

          animation: tl,
          toggleActions: "play reverse  play reverse",
        });
      }
      return () => splitRef.current?.revert();
    },
    { scope: containerRef },
  );
  return (
    <>
      <section
        ref={containerRef}
        className="w-full h-svh flex justify-center items-center bg-pink-800"
      >
        <h1 ref={textRef} className="text-7xl w-1/2 text-purple-500 ">
          {text}
        </h1>
      </section>
    </>
  );
}
