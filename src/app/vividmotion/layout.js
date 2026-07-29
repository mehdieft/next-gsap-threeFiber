import localFont from "next/font/local";

const samim = localFont({
  src: [
    {
      path: "../../fonts/vividmotion/samim.woff",
      weight: "300",
      style: "normal",
    },
 
    {
      path: "../../fonts/vividmotion/Samim-Bold.woff",
      weight: "700",
      style: "normal",
    },
  ],
});



export default function Layout({ children }) {
  return (
    <div className={samim.className}>
      {children}
    </div>
  );
}

