import {
  useGLTF,
  Stage,
  MeshReflectorMaterial,
  Environment,
  OrbitControls,
} from "@react-three/drei";
import { useControls } from "leva";
import { roughness } from "three/tsl";
import LightForm from "./lightForm";

export default function Car() {
  const { roughness, resolution, position } = useControls({
    roughness: { value: 0, step: 0.1, min: 0, max: 10 },
    resolution: { value: 512, step: 128, min: 128, max: 2048 },
    position: { x: 0, y: 0, step: 0.1 },
  });
  const { scene } = useGLTF("/model/tesla_model_3.glb");
  return (
    <>
      <color attach="background" args={["#d3bbbf"]} />
      <fog attach="fog" args={["#d3bbbf", 20, 25]} />

      <OrbitControls
        enableZoom={false}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 2}
        minAzimuthAngle={-Math.PI / 4}
        maxAzimuthAngle={Math.PI / 4}
      />

      <group
        scale={0.025}
        position-z={-5}
        position={[position.x, position.y, 0]}
        position-y={0.3}
      >
        <primitive object={scene} />
      </group>
      <mesh position={[0, -1.18, 0]} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[100, 100]} />
        <MeshReflectorMaterial
          color="gray"
          roughness={roughness}
          blur={20.9}
          resolution={1024}
        />
      </mesh>
      <Environment files="/textureImage.jpg">
        {/* <LightForm/>   */}
      </Environment>
      <ambientLight intensity={1.5} />
    </>
  );
}
useGLTF.preload("/model/tesla_model_3.glb");
