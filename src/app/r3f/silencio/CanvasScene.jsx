"use client";

import { Canvas,useThree } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import useSelencio from "../../store/useSelencio";
import { Environment, Float } from "@react-three/drei";
import { Basket } from "./basket";
import { Bolsa } from "./bolsa";
import { Zumo } from "./zumo";
import { Chocolatia } from "./chocolatia";
import { Can } from "./can";
import { useControls } from "leva";
function ResponsiveCamera() {
  const { camera, size } = useThree();

  useEffect(() => {
    const aspect = size.width / size.height;
    console.log("this is aspect:", aspect);

    if (aspect < 0.7) {
      // Mobile portrait
      // eslint-disable-next-line react-hooks/immutability
      camera.fov = 52;
      camera.position.set(0, 0, 5);
    } else if (aspect < 1) {
      // Tablet portrait
      camera.fov = 47;
      camera.position.set(0, 0, 6);
    } else if (aspect > 1.7) {
      // Very wide desktop
      
      camera.fov = 20;
      camera.position.set(0, 0, 5);
    } else {
      // Normal desktop/tablet landscape
      camera.fov = 30;
      camera.position.set(0, 0, 5);
    }

    camera.updateProjectionMatrix();
  }, [camera, size]);

  return null;
}

function useModelControls(name, defaults) {

  
  return useControls(name, {
    position: { value: defaults.position, step: 0.1 },
    rotation: { value: defaults.rotation, step: 0.1 },
    scale: { value: defaults.scale, min: 0.001, max: 0.1, step: 0.001 },
  });
}

function useLoadedObject() {
  const [object, setObject] = useState(null);
  return [object, setObject];
}

export default function CanvasScene({ onObjectsChange }) {
  const { redLight } = useSelencio();

  const [basketObject, setBasketObject] = useLoadedObject();
  const [zumoObject, setZumoObject] = useLoadedObject();
  const [chocolatiaObject, setChocolatiaObject] = useLoadedObject();
  const [bolsaObject, setBolsaObject] = useLoadedObject();
  const [canObject, setCanObject] = useLoadedObject();


  useEffect(() => {
    onObjectsChange({
      basketObject,
      zumoObject,
      chocolatiaObject,
      bolsaObject,
      canObject,
    });
  }, [
    basketObject,
    zumoObject,
    chocolatiaObject,
    bolsaObject,
    canObject,
    onObjectsChange,
  ]);

  const basketTransform = useModelControls("Basket", {
    position: [0, -5, 0],
    rotation: [0, Math.PI, 0],
    scale: 0.02,
  });
  const zumoTransform = useModelControls("Zumo", {
    position: [1.3, 0, 0],
    rotation: [0, 0, 0],
    scale: 0.01,
  });
  const chocolatiaTransform = useModelControls("Chocolatia", {
    position: [-1, 0, 1],
    rotation: [0, Math.PI / 2, Math.PI / 2],
    scale: 0.005,
  });
  const bolsaTransform = useModelControls("Bolsa", {
    position: [0, 0.5, -1.2],
    rotation: [0, 0, 0],
    scale: 0.01,
  });
  const canTransform = useModelControls("Can", {
    position: [0, 0.3, 0],
    rotation: [0, 0, 1],
    scale: 0.01,
  });

  return (
    <div className="model fixed z-0 pointer-events-none w-screen h-svh bg-[linear-gradient(0deg,rgb(219,218,217),rgb(255,255,255))]">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 40 }}
      >
        <ResponsiveCamera />
        <Suspense fallback={null}>
          <ambientLight intensity={2.5} />
          <directionalLight position={[5, 5, 5]} intensity={8} />
          <directionalLight position={[-5, 5, 5]} intensity={8} />
          <Environment  environmentIntensity={0.7}  files="/images/selencio/white.jpg" />
       {redLight && (
  <>
    <spotLight
      color="#ff0000"
      position={[0.5, -0.4, 1]}
      intensity={100}
      angle={0.5}
      penumbra={0.3}
      distance={10}
      target-position={[0, 0, 0]}
    />
    
    {/* Additional point light for ambient glow */}
    <pointLight
      color="#ff0000"
      position={[0.5, -0.4, 1]}
      intensity={50}
      distance={5}
    />
  </>
)}
          <Basket ref={setBasketObject} {...basketTransform} />
          <Float speed={2} rotationIntensity={1} floatIntensity={1}>
            <Zumo ref={setZumoObject} {...zumoTransform} />
          </Float>
          <Float speed={2} rotationIntensity={1} floatIntensity={1}>
            <Chocolatia ref={setChocolatiaObject} {...chocolatiaTransform} />
          </Float>
          <Float speed={2} rotationIntensity={1} floatIntensity={2}>
            <Bolsa ref={setBolsaObject} {...bolsaTransform} />
          </Float>
          <Float
            enabled={true}
            speed={2}
            rotationIntensity={1.2}
            floatIntensity={0.5}
          >
            <group>
              <Can ref={setCanObject} {...canTransform} />
            </group>
          </Float>
        </Suspense>
      </Canvas>
    </div>
  );
}
