
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { forwardRef } from 'react'
export const Zumo = forwardRef(function Zumo(props, ref) {
  const { nodes, materials } = useGLTF('/model/silencio/zumo_silencio_c.glb')
  return (
    <group ref={ref} scale={0.005} position={[2,0,0]} {...props} dispose={null}>
      <group position={[0, -56.29143, 0]}>
        <mesh
          geometry={nodes.Wrapper.geometry}
          material={nodes.Wrapper.material}
          position={[-0.75996, 61.1331, 18.15809]}
          rotation={[0, 0, 2.87979]}
          scale={[1, -1, 1]}
        />
      </group>
      <group position={[0, -56.29143, 0]}>
        <mesh
          geometry={nodes.Straw.geometry}
          material={materials['Straw.001']}
          position={[32.15166, 159.1441, 19.82891]}
          rotation={[Math.PI / 2, -0.2618, Math.PI]}
          scale={[1, -1, 1]}
        />
      </group>
      <group position={[0, -56.29143, 0]}>
        <group position={[2.80498, 0.85123, -2.27205]} rotation={[-Math.PI / 2, 0, 0]}>
          <mesh geometry={nodes['Packaging-Box'].geometry} material={materials['Box.001']} />
          <mesh geometry={nodes['Packaging-Foil'].geometry} material={materials['Foil.001']} />
        </group>
      </group>
    </group>
  )
})

useGLTF.preload('/model/silencio/zumo_silencio_c.glb')