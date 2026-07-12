import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { ProjectorLight } from "three/webgpu";
export default function Sphere() {
  const torusRef = useRef();
  useGSAP(() => {
    if (!torusRef.current) return;
    const torus = torusRef.current;
    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    // tl.to(torus.scale,{x:2,y:2,z:2,ease:'power1.in',duration:2})
    // tl.to(torus.rotation,{x:Math.PI,duration:1},'=')
  }, {});
  return (
    <>
    
      <OrbitControls far={5} near={1} fov={20} />
      
      
      <directionalLight position={[0,2,4]} intensity={0.2} color="red" />
      <ambientLight intensity={0.2} />
      <mesh rotation-x={-Math.PI*0.5} >
        <planeGeometry args={[200,200]} />
        <meshStandardMaterial side={2} />
      </mesh>
    
    </>
  );
}
