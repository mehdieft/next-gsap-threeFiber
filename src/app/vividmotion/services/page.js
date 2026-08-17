import { ServicesText } from "@/app/components/vividmotion/servicesText";
import ShaderImage from "@/app/components/vividmotion/ShaderImage";
import ServicesGrid from "@/app/components/vividmotion/servicesGrid";
export default function ServicesPage() {
    return (
        <>
            <div className="w-screen h-[70vh] bg-black relative flex flex-col gap-10 py-20 justify-center items-center">
                <ServicesText />
                {/* <div className="relative h-20 w-full">
                </div> */}
            </div>
          <ServicesGrid imageOne="/images/vividmotion/gridShader/shaderOne.avif" imageTwo="/images/vividmotion/gridShader/shaderOne.avif" />
          <ServicesGrid imageOne="/images/vividmotion/gridShader/shaderThree.avif" imageTwo="/images/vividmotion/gridShader/shaderFour.avif" />
          <ServicesGrid imageOne="/images/vividmotion/gridShader/shaderFive.avif" imageTwo="/images/vividmotion/gridShader/shaderSix.avif" />
          <ServicesGrid imageOne="/images/vividmotion/gridShader/shaderSeven.avif" imageTwo="/images/vividmotion/gridShader/shaderEight.avif" />
                
                <div></div>
          
        </>
    );
}