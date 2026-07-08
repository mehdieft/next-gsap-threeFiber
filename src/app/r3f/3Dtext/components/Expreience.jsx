import { OrbitControls, Text, useGLTF,Billboard, Text3D ,useTexture} from "@react-three/drei";
import { useState } from "react";

export default function Exprience() {
    const matOne=useTexture('/model/matcap/matOne.png')
     const matTwo=useTexture('/model/matcap/matTwo.png')
     const matThree=useTexture('/model/matcap/matThree.png')

  const { nodes } = useGLTF("/model/MechQuadruped.glb");
  console.log(nodes);
  const [meshClicked, setMeshClicked] = useState(false);
  let text = meshClicked
    ? "سلام علاق عزیز حالت چطوره"
    : "دست نزن بهش  راست میشه";
  return (
    <>
      <OrbitControls />
      <ambientLight/>
      <mesh 
        onClick={() => {
          setMeshClicked(!meshClicked);
        }}
      >
        <sphereGeometry 
         />
        <meshMatcapMaterial map={matThree}  />
      </mesh>
      <mesh rotation={[Math.PI * -0.5, 0, 0]} position={[0, -1, 0]}>
        <planeGeometry args={[40, 40]} />
        <meshBasicMaterial color="white" />
      </mesh>
      {/* <Billboard  position={[0,4,0]}>
        <Text anchorY="bottom" fontSize={0.4} maxWidth={1} >hello hello goodbye goodby
            <meshStandardMaterial color="black" />
        </Text>
         <Text position-y={0.3} fontSize={0.4} anchorY="center" >hello hello goodbye goodby
            <meshStandardMaterial color="black" />
        </Text>
      </Billboard> */}
      <Text3D position={[-3,0,-2]} font="/fonts/secondFantasy.json" bevelEnabled bevelThickness={0.2}>mehdi saedi
      <meshMatcapMaterial map={matOne}  />
      </Text3D>
    </>
  );
}
