import { Text3D ,MeshReflectorMaterial} from "@react-three/drei";

export default function ThreeText(){
    return(
        <>
              <color attach="background" args={["#d3bbbf"]} />
      <fog attach="fog" args={["#d3bbbf", 20, 25]} />
        <mesh>
            <sphereGeometry/>
            <meshBasicMaterial color="red" />
        </mesh>
           <mesh position={[0, -1.18, 0]} rotation-x={-Math.PI / 2}>
                <planeGeometry args={[100, 100]} />
                <MeshReflectorMaterial
                  color="gray"
                  roughness={0.2}
                  blur={20.9}
                  resolution={1024}
                />
              </mesh>
              <spotLight/>


      
       

        </>
    )
}