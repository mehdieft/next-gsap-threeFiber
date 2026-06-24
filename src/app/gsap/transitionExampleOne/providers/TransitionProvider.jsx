"use client";
import { useRef, useEffect } from "react";
import { TransitionRouter } from "next-transition-router";
import gsap from "gsap";

const ROWS = 4;
const cols = 16;
export default function TransitionProvider({ children }) {
  const transitionGridRef = useRef(null);
  const blockRef = useRef([]);
  const createTransitionGrid = () => {
    if (!transitionGridRef.current) return;
    const container = transitionGridRef.current;
    container.innerHTML = "";
    blockRef.current = [];
    const blockWidth = window.innerWidth / cols;
    const blockHeight = window.innerHeight / ROWS;
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < cols; col++) {
        const block = document.createElement("div");
        block.style.width = `${blockWidth + 1}px`;
        block.style.height = `${blockHeight + 1}px`;
        block.style.position = "absolute";
        block.style.willChange = "transform";
        block.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
        block.style.backdropFilter = "blur(12px)";
        block.style.top = `${row * blockHeight}px`;
        block.style.left = `${col * blockWidth}px`;
        block.style.transformOrigin = `${col < cols / 2 ? "right" : "left"} center`;
        container.appendChild(block);
        blockRef.current.push(block);
      }
    }
    gsap.set(blockRef.current, { scaleX: 0 });
  };
  useEffect(() => {
    createTransitionGrid();
    window.addEventListener("resize", createTransitionGrid);
    return () => {
      window.removeEventListener("resize", createTransitionGrid);
    };
  }, []);

  const getRowBlocks = (row) => {
    return blockRef.current.slice(row * cols, row * cols + cols);
  };
  const animatedIn = (onComplete) => {
    const tl = gsap.timeline({ onComplete });
    [0, 1, 2, 3].forEach((row) => {
      const blocks = getRowBlocks(row);
      tl.to(
        blocks,
        {
          scaleX: 1,
          duration: 0.6,
          ease: "power3.inOut",
          stagger: { each: 0.025, from: row % 2 === 0 ? "start" : "end" },
        },
       
      '<');
    });
    return tl;
  };
  const animatedOut = (onComplete) => {
    const tl = gsap.timeline({ onComplete });
    [3, 2, 1, 0].forEach((row) => {
      const blocks = getRowBlocks(row);
      tl.to(
        blocks,
        {
          scaleX: 0,
          duration: 0.6,
          ease: "power3.inOut",
          stagger: { each: 0.025, from: row % 2 === 0 ? "end" : "start" },
        },
        '<'
      );
    });
    return tl;
  };
  return (
    <TransitionRouter auto
      leave={(next) => {
        const tl = animatedIn(next);
        return () => tl.kill();
      }}
      enter={(next) => {
        const tl = animatedOut(next);
        return () => tl.kill();
      }}
    >
      <div
        ref={transitionGridRef}
        className="fixed top-0 left-0 w-full h-full z-100 pointer-events-none overflow-hidden"
      ></div>
      {children}
    </TransitionRouter>
  );
}
