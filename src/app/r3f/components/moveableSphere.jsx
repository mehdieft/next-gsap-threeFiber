import { useCursor } from "@react-three/drei";
import { useRef, useState } from "react";
import { useKeyboardControls } from "@react-three/drei";
import { Controls } from "../page";
import { useFrame } from "@react-three/fiber";


export default function MoveableSphere(props) {
    const ballRef=useRef()
    const speed=0.05;
  const [hovered, setHavered] = useState(false);
  useCursor(hovered, "grab");
  const [selected, setSelected] = useState(false);
  const forwardPressed = useKeyboardControls(
    (state) => state[Controls.forward],
  );
  const backwardPressed=useKeyboardControls((state)=>state[Controls.back])
  const leftPressed=useKeyboardControls((state)=>state[Controls.left])
  const rightPressed=useKeyboardControls((state)=>state[Controls.right]);

  let color = hovered ? "red" : "white";
  if (selected) {
    color = "hotpink";
  }
  useFrame(()=>{
    if(!selected){
        return;
    }
    if(forwardPressed){
        ballRef.current.position.y+=speed;
    }
    if(backwardPressed){
        ballRef.current.position.y -=speed;
    }
    if(leftPressed){
        ballRef.current.position.x-=speed;
    }
    if(rightPressed){
        ballRef.current.position.x+=speed;

    }
    
  })

  return (
    <mesh ref={ballRef}
      {...props}
      onPointerEnter={(e) => {
        e.stopPropagation();
        setHavered(true);
      }}
      onPointerLeave={(e) => {
        e.stopPropagation();
        setHavered(false);
      }}
      onClick={() => setSelected(!selected)}
    >
      <sphereGeometry />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}
