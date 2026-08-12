import { ServicesText } from "@/app/components/vividmotion/servicesText";
import ExpandText from "@/app/components/vividmotion/expandText";
export default function ServicesPage() {
    return (
        <>
            <div className="w-screen h-[50vh] bg-black relative flex flex-col gap-10 py-20 justify-center items-center">
                <ServicesText />
                <div className="relative h-20 w-full">

                    <div className="absolute bottom-0 right-1/2 translate-x-1/2">

                        <ExpandText />
                    </div>
                </div>
            </div>
        </>
    );
}