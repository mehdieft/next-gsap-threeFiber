import { Vazirmatn } from "next/font/google";

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
});
export default function MainLayout({children}){
    
    return(
        <>
        <div className={vazirmatn.className}>

        {children}
        </div>
        
        </>
    )

}