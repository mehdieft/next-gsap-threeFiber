
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { forwardRef } from 'react'

export const Bolsa = forwardRef(function Bolsa(props, ref) {
  const { nodes, materials } = useGLTF('/model/silencio/bolsa_silencio_c.glb')
  return (
    <group scale={0.01} position={[0,0.5,-1.2]} ref={ref} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.package_01.geometry}
        material={materials['Mat.004']}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      />
    </group>
  )
});

useGLTF.preload('/model/silencio/bolsa_silencio_c.glb')
