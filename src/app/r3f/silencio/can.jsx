import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { forwardRef } from "react";

export const Can = forwardRef(function Can(props, ref) {
  const { nodes, materials } = useGLTF("/model/silencio/can_silencio_c.glb");
  return (
    <group ref={ref} scale={0.01} {...props} dispose={null}>
      <mesh
        geometry={nodes.Aluminum_Standard_Can_330ml_v_22.geometry}
        material={materials["Mat.002"]}
        position={[0, 4.189, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      <mesh
        geometry={nodes.Aluminum_Standard_Can_330ml_v_21.geometry}
        material={materials["Mat.002"]}
        position={[0, 4.189, 0]}
        rotation={[-Math.PI / 2, 0, 1.57]}
      />
      <mesh
        geometry={nodes.Aluminum_Standard_Can_330ml_v_2.geometry}
        material={materials["Mat.003"]}
        position={[0, 4.189, 0]}
        rotation={[-Math.PI / 2, 0, -0.12]}
      />
    </group>
  );
});

useGLTF.preload("/model/silencio/can_silencio_c.glb");
