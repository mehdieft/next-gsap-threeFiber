import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { MeshBasicMaterial } from "three";
import { useFrame } from "@react-three/fiber";

export function DroneModel(props) {
  const { nodes, materials } = useGLTF("/model/drone.glb");
  console.log("this is nodes",nodes)
  console.log("this is material",materials)
  const spinRef = useRef([]);
  const droneRef=useRef()
  useFrame((state) => {
       const time = state.clock.elapsedTime
    if (!spinRef.current) {
      return;
    }
    spinRef.current.forEach((element, index) => {
      index % 2 == 0
        ? (element.rotation.y += 0.5)
        : (element.rotation.y -= 0.5);
    });
   droneRef.current.position.y = Math.sin(time * 0.5) * 2.02
   droneRef.current.position.x = Math.cos(time * 0.5) * 2.02
  });
  return (
    <group  {...props} dispose={null}>
      <group ref={droneRef}
        position={[-1.275, 2.753, -1.366]}
        scale={3}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <mesh
          geometry={nodes.base.geometry}
          position={[-0.104, -0.115, -0.031]}
          rotation={[-0.144, 0.163, 0.088]}
        >
          <meshBasicMaterial color="black" />
        </mesh>
        <mesh
          geometry={nodes.hull.geometry}
          material={nodes.hull.material}
          position={[0.019, 0.021, -0.02]}
          rotation={[-0.129, 0.175, 0]}
        >
            <meshBasicMaterial  color="darkgray" />
        </mesh>
        <mesh
          geometry={nodes.pivots.geometry}
          //   material={nodes.pivots.material}
          position={[-0.105, -0.115, -0.034]}
          rotation={[0, 0, -0.785]}
        >
          <meshBasicMaterial color="gray" />
        </mesh>
        <mesh
          ref={(el) => (spinRef.current[0] = el)}
          geometry={nodes.propeller001.geometry}
          material={nodes.propeller001.material}
          position={[0.146, 0.117, -0.037]}
          rotation={[-Math.PI / 2, 0, 0]}
        />
        <mesh
          ref={(el) => (spinRef.current[1] = el)}
          geometry={nodes.propeller002.geometry}
          material={nodes.propeller002.material}
          position={[0.146, -0.113, -0.037]}
          rotation={[-Math.PI / 2, 0, 0]}
        />
        <mesh
          ref={(el) => (spinRef.current[2] = el)}
          geometry={nodes.propeller003.geometry}
          material={nodes.propeller003.material}
          position={[-0.105, -0.115, -0.037]}
          rotation={[-Math.PI / 2, 0, 0]}
        />
        <mesh
          ref={(el) => (spinRef.current[3] = el)}
          geometry={nodes.propeller004.geometry}
          material={nodes.propeller004.material}
          position={[-0.106, 0.118, -0.037]}
          rotation={[-Math.PI / 2, 0, 0]}
        ></mesh>
      </group>
    </group>
  );
}

useGLTF.preload("/model/drone.glb");
