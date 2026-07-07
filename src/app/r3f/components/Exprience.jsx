import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import MoveableSphere from "./moveableSphere";
import { DroneModel } from "./drone";
export default function Exprience() {
  return (
    <>
      <OrbitControls />
      <MoveableSphere position-y={1} position-x={1} />
      <MoveableSphere position-y={2} position-x={3} />
 
      <MoveableSphere position-y={6} position-x={-9} />
      <ContactShadows
        rotateX={Math.PI / 2}
        position={[0, -1.6, 0]}
        opacity={0.74}
        width={10}
        height={10}
      />
      {/* <DroneModel position={[2,2,2]} /> */}
   
    
      <Environment preset="studio" />
    </>
  );
}
