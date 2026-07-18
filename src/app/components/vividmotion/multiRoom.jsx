import { GamingRoom } from "./GamingRoom"
import { CameraControls, Environment ,Text} from "@react-three/drei"
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";

const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export default function MultiRoom(){
     const group = useRef();

  const columns = useMemo(() => {
    return Array.from({ length: 800 }, () => ({
      x: (Math.random() - 0.5) * 20,
      y: Math.random() * 20,
      z: (Math.random() - 0.5) * 20,
      speed: 1 + Math.random() * 8,
      char: chars[Math.floor(Math.random() * chars.length)],
    }));
  }, []);

  useFrame((_, delta) => {
    group.current.children.forEach((child, i) => {
      child.position.y -= columns[i].speed * delta;

      if (child.position.y < -10) {
        child.position.y = 10;
        child.position.x = (Math.random() - 0.5) * 20;
        child.position.z = (Math.random() - 0.5) * 20;

        child.text =
          chars[Math.floor(Math.random() * chars.length)];
      }
    });
  });

    return(
        <>

        <Environment files="/textureImage.jpg" backgroundIntensity={1000} backgroundBlurriness={10}  />
         <ambientLight intensity={5} />
    <CameraControls/>
    <GamingRoom position={[0,0,0]}/>
        <GamingRoom position={[10,0,0]}/>
        <points>
  <bufferGeometry />
  <pointsMaterial
    color="#00ff00"
    size={0.05}
    transparent
    opacity={0.8}
  />
</points>
    <group ref={group}>
      {columns.map((item, i) => (
        <Text
          key={i}
          position={[item.x, item.y, item.z]}
          color="#00ff00"
          fontSize={0.2}
          anchorX="center"
          anchorY="middle"
          
        >
          {item.char}
        </Text>
      ))}
    </group>

        </>
    )

}