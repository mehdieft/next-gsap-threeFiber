"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import HoverText from "./hoverText";
export default function ExpandText() {
  const [activeSection, setActiveSection] = useState(null);
  const [displaySection, setDisplaySection] = useState(null);
  const typeContent = [
    "محتوای نوع کار 1",
    "محتوای نوع کار 2",
    "محتوای نوع کار 3",
  ];
  const domainContent = ["محتوای دامنه 1", "محتوای دامنه 2", "محتوای دامنه 3"];
  const conatinerRef = useRef(null);
  const contentRef = useRef(null);
  const initialWidthRef = useRef(0);

  useEffect(() => {
    if (!conatinerRef.current || initialWidthRef.current) return;
    initialWidthRef.current =
      conatinerRef.current.getBoundingClientRect().width;
  }, []);

  useEffect(() => {
    if (
      !contentRef.current ||
      !conatinerRef.current ||
      !initialWidthRef.current
    )
      return;
    const containerWidth = initialWidthRef.current;

    gsap.killTweensOf(contentRef.current);

    if (activeSection) {
      const tl = gsap.timeline();
      tl.fromTo(
        conatinerRef.current,
        { width: containerWidth },
        { width: containerWidth * 2, duration: 0.3, ease: "power2.out" },
      );
      tl.fromTo(
        contentRef.current,
        { scaleY: 0, opacity: 0 },
        {
          scaleY: 1,
          opacity: 1,
          transformOrigin: "",
          duration: 0.45,
          ease: "power2.out",
        },
      );
      return;
    }

    if (displaySection) {
      const tl = gsap.timeline();
      tl.to(contentRef.current, {
        scaleY: 0,
        opacity: 0,
        duration: 0.35,
        ease: "power2.in",
        onComplete: () => setDisplaySection(null),
      });
      tl.to(conatinerRef.current, {
        width: containerWidth,
        duration: 0.3,
        ease: "power2.in",
      });
    }
  }, [activeSection, displaySection]);

  const toggleSection = (section) => {
    setActiveSection((current) => {
      const nextSection = current === section ? null : section;

      if (nextSection) {
        setDisplaySection(nextSection);
      }

      return nextSection;
    });
  };

  return (
    <>
      <div
        ref={conatinerRef}
        dir="rtl"
        className="relative text-white text-xl flex flex-col items-center bg-gray-900 rounded-2xl px-6 py-2"
      >
        <h1 className="flex items-center gap-5">
          <span className="inline-flex items-center gap-1">
            <HoverText text="نوع کار" />

            <button
              type="button"
              onClick={() => toggleSection("type")}
              className="text-sm leading-none"
              style={{
                transform:
                  activeSection === "type" ? "rotate(180deg)" : "rotate(0deg)",
              }}
            >
              ↓
            </button>
          </span>

          <span>و</span>

          <span className="inline-flex items-center gap-1">
            <HoverText text="نوع دامنه" />

            <button
              type="button"
              onClick={() => toggleSection("domain")}
              className="text-sm leading-none"
              style={{
                transform:
                  activeSection === "domain"
                    ? "rotate(180deg)"
                    : "rotate(0deg)",
              }}
            >
              ↓
            </button>
          </span>
        </h1>

        {displaySection && (
          <div
            ref={contentRef}
            className="absolute top-full left-0 w-full overflow-hidden bg-gray-900 rounded-b-2xl"
          >
            <div className="flex justify-center gap-10 pt-3 pb-4">
              {(displaySection === "type" ? typeContent : domainContent).map(
                (item, index) => (
                  <p key={index} className="text-sm">
                    {item}
                  </p>
                ),
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
