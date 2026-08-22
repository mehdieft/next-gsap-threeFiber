
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { forwardRef } from "react";

export const Chocolatia = forwardRef(function Chocolatia(props, ref) {
  const { nodes, materials } = useGLTF('/model/silencio/chocolatina_silencio_c.glb')
  return (
    <group ref={ref} scale={0.01} rotation={[0,Math.PI/2,Math.PI/2]} position={[-2,0,0]} {...props} dispose={null}>
    
      <mesh
       
        geometry={nodes.Candy_wrapper_v_8.geometry}
        material={materials.Candy_wrapper_v_8}
        rotation={[-Math.PI / 2, 0, 0]}
      />
    </group>
  )
});

useGLTF.preload('/model/silencio/chocolatina_silencio_c.glb')