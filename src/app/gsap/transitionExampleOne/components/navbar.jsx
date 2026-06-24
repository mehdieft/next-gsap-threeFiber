import Link from "next/link"
export default function Navbar(){
    return(
        <div className="p-4 fixed flex justify-between items-center w-full bg-white">
            <div>
                <Link href="/gsap/transitionExampleOne/orbit">Orbit</Link>
            </div>
            <div>
                <Link href="/gsap/transitionExampleOne/genesis">genesis</Link>
            </div>
            <div>
                <Link href="/gsap/transitionExampleOne">home</Link>
            </div>


        </div>
    )
}