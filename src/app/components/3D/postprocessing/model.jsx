import { useGLTF,Gltf, OrbitControls } from "@react-three/drei"
export default function PostModel(){
    return(
        <>
        <OrbitControls/>
        <ambientLight/>
        <group>
            <Gltf src="/model/postprocessing/Cozy Tavern - First Floor 2.glb" />
        </group>

        </>
    )
}