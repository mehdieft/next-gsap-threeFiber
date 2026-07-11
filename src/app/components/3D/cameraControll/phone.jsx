import {
  Environment,
  Gltf,
  OrbitControls,
  useHelper,
  CameraControls,
} from "@react-three/drei";
import { useEffect, useRef } from "react";
import { DirectionalLightHelper, PointLightHelper } from "three";
import { useControls, button } from "leva";
import { degToRad } from "three/src/math/MathUtils.js";
import { sections } from "./ui";
import { useState } from "react";

export default function Phone({ section }) {
  const [introFinished, setIntroFinished] = useState(false);
  const light = useRef();
  const point = useRef();
  const phoneRef = useRef();
  const box = useRef();
  const sphere = useRef();
  const controlls = useRef();
  useHelper(light, DirectionalLightHelper, 1, "red");
  useHelper(point, DirectionalLightHelper, 1, "green");
  const cameraPositions = {
    intro: [0, 0, 3, 0, 0, 0],
    titanium: [
      0.8052868435192638, -0.493696151658833, -0.3402173503996593,
      -0.13403415303084987, 0.10307665789868743, 0.10191607838297936,
    ],
    camera: [
      0.5840978299904183, 0.11868653484621264, -0.3838525588995542,
      0.07903976016188131, 0.13122561405441527, -0.036017379739607926,
    ],
    "action-button": [
      -0.8992148463590441, -0.059391092151306585, -0.05034296182120617,
      -0.07922672998920137, 0.1668372161359749, -0.04227209617737786,
    ],
  };

  useControls("dolly", {
    // eslint-disable-next-line react-hooks/refs
    in: button(() => controlls.current?.dolly(1, true)),
    // eslint-disable-next-line react-hooks/refs
    out: button(() => controlls.current?.dolly(-1, true)),
  });
  useControls("truck", {
    // eslint-disable-next-line react-hooks/refs
    up: button(() => {
      controlls.current?.truck(0, -0.5, true);
    }),
    // eslint-disable-next-line react-hooks/refs
    down: button(() => {
      controlls.current.truck(0, 0.5, true);
    }),
    // eslint-disable-next-line react-hooks/refs
    left: button(() => {
      controlls.current?.truck(-0.5, 0, true);
    }),
    // eslint-disable-next-line react-hooks/refs
    right: button(() => {
      controlls.current?.truck(0.5, 1, true);
    }),
  });
  useControls("rotate", {
    // eslint-disable-next-line react-hooks/refs
    up: button(() => {
      controlls.current?.rotate(0, -0.5, true);
    }),
    // eslint-disable-next-line react-hooks/refs
    down: button(() => {
      controlls.current.rotate(0, 0.5, true);
    }),
    // eslint-disable-next-line react-hooks/refs
    left: button(() => {
      controlls.current?.rotate(-0.5, 0, true);
    }),
    // eslint-disable-next-line react-hooks/refs
    right: button(() => {
      controlls.current?.rotate(0.5, 1, true);
    }),
  });
  useControls("settings", {
    smoothTime: {
      value: 0.35,
      min: 0.1,
      max: 2,
      step: 0.1,
      onChange: (value) => (controlls.current.smoothTime = value),
    },
  });
  useControls("fit", {
    // eslint-disable-next-line react-hooks/refs
    fitToBox: button(() => {
      controlls.current.fitToBox(box.current, true);
    }),
    // eslint-disable-next-line react-hooks/refs
    fitToSphere: button(() => {
      controlls.current.fitToSphere(sphere.current, true);
    }),
  });
  useControls("helper", {
    // eslint-disable-next-line react-hooks/refs
    getLookAt: button(() => {
      const position = controlls.current.getPosition();
      const target = controlls.current.getTarget();
      console.log([...position, ...target]);
    }),
  });

  const Intro = async () => {
    controlls.current.setLookAt(0, 0, 5, 0, 0, 0, false);
    await controlls.current.dolly(3, true);
    await controlls.current.rotate(degToRad(25), degToRad(-20), true);
    setIntroFinished(true);
  };

  const playTransition = () => {
    if (!introFinished) return;
    controlls.current.setLookAt(...cameraPositions[sections[section]], true);
    // controlls.current.fitToBox(phoneRef.current, true);
  };
  useEffect(() => {
    Intro();
  }, []);
  useEffect(() => {
    playTransition();
  }, [section]);

  return (
    <>
      <CameraControls ref={controlls} />
      <spotLight position={[0, 2, 0]} intensity={20} />
      <directionalLight
        ref={light}
        position={[5, 1, 5]}
        color="blue"
        intensity={2}
      />
      <directionalLight
        ref={point}
        intensity={50}
        position={[-5, 1, -3]}
        color="red"
      />
      <mesh visible={false} ref={box}>
        <boxGeometry args={[0.5, 1, 0.2]} />
        <meshBasicMaterial color="mediumpurple" wireframe />
      </mesh>
      <mesh visible={false} position={[3, 5, 8]} ref={sphere}>
        <sphereGeometry args={[0.3, 64]} />
        <meshBasicMaterial color="hotpink" wireframe />
      </mesh>
      <Gltf
        ref={phoneRef}
        rotation={[0, -Math.PI, 0]}
        position={[0, 0, 0]}
        src="/model/apple_iphone_15_pro_max_black.glb"
        // "Apple iPhone 15 Pro Max Black" (https://skfb.ly/oLpPT) by polyman is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).
      />
      <group rotation-y={Math.PI}>
        <Environment
          files="/textureImage.jpg"
          environmentIntensity={20}
          background
          blur
        />
      </group>
    </>
  );
}
