
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { forwardRef } from "react";

export const Model = forwardRef(function Model(props, ref) {
  const { nodes, materials } = useGLTF('/model/silencio/chocolatina_silencio_c.glb')
  return (
    <group ref={ref} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Candy_wrapper_v_8.geometry}
        material={materials.Candy_wrapper_v_8}
        rotation={[-Math.PI / 2, 0, 0]}
      />
    </group>
  )
});

useGLTF.preload('/model/silencio/chocolatina_silencio_c.glb')