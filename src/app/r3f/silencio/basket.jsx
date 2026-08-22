import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { forwardRef } from "react";


export const Basket = forwardRef(function Basket(props, ref) {
  const { nodes, materials } = useGLTF('/model/silencio/basket_c.glb')
  return (
    <group ref={ref} scale={0.02} position={[0,-5,0]} rotation={[0,Math.PI,0]} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Asa1.geometry}
        material={nodes.Asa1.material}
        position={[-9.365, 19.576, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Asa2.geometry}
        material={nodes.Asa2.material}
        position={[9.32, 19.62, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cesta.geometry}
        material={nodes.Cesta.material}
      />
    </group>
  )
});

useGLTF.preload('/model/silencio/basket_c.glb')
