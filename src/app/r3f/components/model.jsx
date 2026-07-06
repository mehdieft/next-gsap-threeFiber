import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { useGLTF } from "@react-three/drei";
export default function Model(){
      const { scene } = useGLTF('/model/room.glb');
      console.log(scene)
    return(
        <>
        <primitive  object={scene} />
        </>
    )
}