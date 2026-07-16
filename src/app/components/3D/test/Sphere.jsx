import { CameraControls, Environment, OrbitControls ,MeshDistortMaterial} from "@react-three/drei";
export default function Sphere() {
  return (
    <>
      <CameraControls
        makeDefault
        mouseButtons={{
          left: 1,
          middle: 0,
          right: 2,
          wheel: 0,
        }}
      />
      <Environment
        files="/textureImage.jpg"
        environmentIntensity={200}
        blur
        background
      />
      <ambientLight />
      <spotLight position={[1, 2, 3]} color="red" />
      <mesh position={[4, 2, 6]}>
        <sphereGeometry />
          <meshBasicMaterial />

      </mesh>
    </>
  );
}
