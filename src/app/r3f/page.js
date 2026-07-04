"use client"
import { Canvas } from "@react-three/fiber"
export default function R3f(){
    return(
        <>
        <div className="bg-red-400 w-full h-screen flex justify-center items-center overflow-hidden ">
        <Canvas className="fixed ">
            {/* <camera /> */}
            <mesh scale={1.2} rotation-y={Math.PI*0.25} >
                <ambientLight intensity={1.4} />
                <boxGeometry  args={[2,4,2]} />
                <meshNormalMaterial/>
            </mesh>
            <mesh position={[-4,0,0]}  >
                <torusKnotGeometry args={[1,0.4,100,10]}  />
                <meshBasicMaterial  color={'purple'}  wireframe />
            </mesh>

        </Canvas>
        </div>
        <div className="w-full h-screen bg-green-500 z-10"></div>
        </>
    )
}