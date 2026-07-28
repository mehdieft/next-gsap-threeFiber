import { useTexture, shaderMaterial } from "@react-three/drei";
import { useThree, extend, useFrame } from "@react-three/fiber";
import { useSliderR3f } from "@/app/store/useSliderR3f";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { MathUtils, MirroredRepeatWrapping } from "three";
const PUSH_FORCE = 1.4;
const ImageShader = shaderMaterial(
  {
    uTexture: undefined,
    uPrevTexture: undefined,
    uProgress: 1.0,
    uDirection: 1,
    uPushForce: PUSH_FORCE,
    uMousePosition: [0, 0],
  },
  `


varying vec2 vUv;
uniform float uPushForce;
varying float vPushed;
uniform vec2 uMousePosition;
void main(){
vUv=uv;
vec2 centeredUv=(vUv-0.5)*2.0;
float pushed=length(centeredUv-uMousePosition);
pushed=1.0-pushed;
pushed=-uPushForce*pushed;
vPushed=pushed;
vec3 customPosition=position;
customPosition.z=pushed;
vec4 modelPosition = modelMatrix * vec4(customPosition, 1.0);
vec4 viewPosition = viewMatrix * modelPosition;
vec4 projectedPosition = projectionMatrix * viewPosition;
gl_Position = projectedPosition;
}
`,
  `
    float random(vec2 st) {
    return fract(sin(dot(st, vec2(12.9898,78.233))) * 43758.5453123);
}

float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x)
         + (c - a) * u.y * (1.0 - u.x)
         + (d - b) * u.x * u.y;
}
 varying vec2 vUv;
 varying float vPushed;
 uniform sampler2D uTexture;
 uniform sampler2D uPrevTexture;
 uniform int uDirection;
 uniform float uProgress;
 void main(){
 vec2 uv=vUv;
 float fractNoise=noise(gl_FragCoord.xy*0.05);
 vec2 disortedPosition=vec2(uv.x-float(uDirection)*(1.0-uProgress)*fractNoise,uv.y);
 float cureR=texture2D(uTexture,disortedPosition+vec2(vPushed*0.0432)).r;
 float cureG=texture2D(uTexture,disortedPosition+vec2(vPushed*0.0732)).g;
 float cureB=texture2D(uTexture,disortedPosition-vec2(vPushed*-0.132)).b;
 float cureA=texture2D(uTexture,disortedPosition).a;
 vec4 curTexture=vec4(cureR,cureG,cureB,cureA);

 vec2 disortedPreview=vec2(uv.x+float(uDirection)*uProgress*fractNoise,uv.y);
 vec4 prevImage=texture2D(uPrevTexture,disortedPreview);
 vec4 finalColor=mix(prevImage,curTexture,uProgress);
 gl_FragColor=finalColor;
//  #include <tonemapping_fragment>
// #include <colorspace_fragment>
 }  
`,
);
extend({ ImageShader });

export default function ImageSlider({
  width = 3,
  height = 4,
  fillPercent = 0.75,
}) {
  const materialRef = useRef();
   const [transition,setTransition]=useState(false)
  const hovered=useRef(false)
  const { items, curSlide, direction } = useSliderR3f();
  const image = items[curSlide].image;
  const texture = useTexture(image);
  const [lastImage, setLastImage] = useState(image);
  const prevTexture = useTexture(lastImage);
  // eslint-disable-next-line react-hooks/immutability
  texture.wrapS =texture.wrapT =prevTexture.wrapS =prevTexture.wrapT=MirroredRepeatWrapping;
  useEffect(() => {
    const newImage = image;
    materialRef.current.uProgress = 0;
    setTransition(true)
    const timeout=setTimeout(()=>{
      setTransition(false)
    },1400)
    return () => {
      setLastImage(newImage);
      clearTimeout(timeout)

    };
  }, [image]);
  const viewport = useThree((state) => state.viewport);
  let ratio = viewport.height / (height / fillPercent);
  if (viewport.width < viewport.height) {
    ratio = viewport.width / (width / fillPercent);
  }
  useFrame((state) => {
    const { pointer } = state;

    materialRef.current.uProgress = MathUtils.lerp(
      materialRef.current.uProgress,
      1,
      0.05,
    );

    materialRef.current.uMousePosition = [
      MathUtils.lerp(materialRef.current.uMousePosition[0],transition? (direction==='prev'?1.0 :-1.0)* materialRef.current.uProgress  :pointer.x, 0.05),
      MathUtils.lerp(materialRef.current.uMousePosition[1],transition? (direction==='prev'?1.0 :-1.0)* materialRef.current.uProgress : pointer.y, 0.05),
    ];
    materialRef.current.uPushForce=MathUtils.lerp(materialRef.current.uPushForce, transition?
      -PUSH_FORCE*1.72*Math.sin(materialRef.current.uProgress*3.14): hovered.current? PUSH_FORCE:0,0.02)
  });
  // useGSAP(()=>{
  //   gsap.fromTo(materialRef.current,{uProgress:0,duration:2,ease:'bounce.inOut'},{uProgress:1,duration:2,ease:'bounce.inOut'})
  // },{dependencies:[lastImage]})
  return (
    <mesh onPointerEnter={()=>hovered.current=true} onPointerLeave={()=>hovered.current=false} >
      <planeGeometry args={[width * ratio, height * ratio,20,20]}  />
      <imageShader
        ref={materialRef}
        uTexture={texture}
        uPrevTexture={prevTexture}
        uDirection={direction === "next" ? 1 : -1}
        uMousePosition={[0,0]}
        uPushForce={0}
        
        
      />
    </mesh>
  );
}
useSliderR3f.getState().items.forEach((item) => {
  useTexture.preload(item.image);
});
