import React, { useRef } from "react";
import { useGLTF, useAnimations, CameraControls } from "@react-three/drei";

export function GamingRoom(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF(
    "model/vividmotion/gaming_room_desktop_setup.glb",
  );
  return (
    <>
   
  return (
    <group {...props} dispose={null}>
      <group scale={0.01}>
        <group position={[-26.002, 0, 35.358]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.LAMP_lambert1_0.geometry}
            material={materials.lambert1}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.LAMP_lambert5_0.geometry}
            material={materials.lambert5}
          />
        </group>
        <group position={[-25.3, 0, 35.358]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.MEJA_LED_0.geometry}
            material={materials.material_5}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.MEJA_PUTIH_0.geometry}
            material={materials.PUTIH}
          />
        </group>
        <group position={[46.911, 97.108, -83.116]} rotation={[-Math.PI / 2, 0, 0]} scale={6.251}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.MOUSE_LED_KEYBOARD_0.geometry}
            material={materials.LED_KEYBOARD}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.MOUSE_PC_kasa_0.geometry}
            material={materials.PC_kasa}
          />
        </group>
        <group position={[-88.425, 25.778, -103.72]} rotation={[Math.PI, 0, 0]} scale={6.832}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.PC_CASE_CableColor_0.geometry}
            material={materials.CableColor}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.PC_CASE_CableColor_0001.geometry}
            material={materials.CableColor}
          />
        </group>
        <group position={[-25.3, 0, 35.358]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
          {/* <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane_LED_KEYBOARD_0.geometry}
            material={materials.LED_KEYBOARD}
          /> */}
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane_PUTIH_0.geometry}
            material={materials.PUTIH}
          />
        </group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.BEAN_BAG001_Goi_0.geometry}
          material={materials.material}
          position={[-16.184, 0, 19.572]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.GAMING_CHAIR_GAMING_CHAIR_0.geometry}
          material={materials.GAMING_CHAIR}
          position={[61.302, 81.729, -15.395]}
          rotation={[0, -0.615, 0]}
          scale={4.674}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.KABEL_CableColor_0.geometry}
          material={materials.CableColor}
          position={[-38.053, 91.356, -142.327]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={6.832}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.KEYBOARD_Keyboard_Keys_0.geometry}
          material={materials.Keyboard_Keys}
          position={[-4.25, 97.39, -82.616]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={6.251}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.MONITOR_Monitor_Frame_0.geometry}
          material={materials.Monitor_Frame}
          position={[-2.12, 130.676, -124.299]}
          rotation={[-1.585, 0.001, 0.004]}
          scale={8.785}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.SPEAKER_DefaultMaterial_0.geometry}
          material={materials.DefaultMaterial}
          position={[-75.007, 94.928, -109.642]}
          rotation={[0, 0, Math.PI / 2]}
          scale={20.407}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.SPEAKER001_DefaultMaterial_0.geometry}
          material={materials.DefaultMaterial}
          position={[72.515, 94.928, -109.642]}
          rotation={[0, 0, Math.PI / 2]}
          scale={20.407}
        />
      </group>
    </group>
    </>
  );
}

useGLTF.preload("model/vividmotion/gaming_room_desktop_setup.glb");
