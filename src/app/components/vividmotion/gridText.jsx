import React from "react";
import HoveredText from "./hoveredText";
export default function GridText() {
  const items = [
    {
      title: "strategy",
      subtitles: [
        "brand strategy",
        "creative strategy",
        "content strategy",
        "user research",
        "ai strategy",
      ],
    },
    {
         title: "Creative & Design",
      subtitles: [
        "brand strategy",
        "creative strategy",
        "content strategy",
        "user research",
        "ai strategy",
      ],

    }
  ];
  return (
    <>
      <div className="grid grid-cols-1 gap-px bg-gray-500">
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <div className="flex px-4 py-6 bg-black text-white items-center">
              <h1 className="w-1/3 text-6xl opacity-80">0{index + 1}</h1>
              <h1 className="text-8xl ">{item.title}</h1>
            </div>
            {item.subtitles.map((subtitle, index) => (
              
               <HoveredText key={index} text={subtitle} indexItem={index} />
              
            ))}
          </React.Fragment>
        ))}
      </div>
    </>
  );
}
