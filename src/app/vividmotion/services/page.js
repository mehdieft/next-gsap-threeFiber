import { ServicesText } from "@/app/components/vividmotion/servicesText";
export default function ServicesPage() {
    return (
        <>
            <div className="w-screen h-[70vh] bg-black relative flex flex-col gap-10 py-20 justify-center items-center">
                <ServicesText />
                {/* <div className="relative h-20 w-full">
                </div> */}
            </div>
        </>
    );
}