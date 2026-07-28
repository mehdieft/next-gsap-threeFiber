import { useTexture, shaderMaterial } from "@react-three/drei";
import { useThree, extend, useFrame } from "@react-three/fiber";
import { useSliderR3f } from "@/app/store/useSliderR3f";
import { useState, useEffect,useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { MathUtils, MirroredRepeatWrapping } from "three";
const ImageShader = shaderMaterial(
  {
    uTexture: undefined,
    uPrevTexture: undefined,
    uProgress: 1.0,
    uDirection:1,
  },
  `


varying vec2 vUv;
void main(){
vUv=uv;
vec4 modelPosition = modelMatrix * vec4(position, 1.0);
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
 uniform sampler2D uTexture;
 uniform sampler2D uPrevTexture;
 uniform int uDirection;
 uniform float uProgress;
 void main(){
 vec2 uv=vUv;
 float fractNoise=noise(gl_FragCoord.xy*0.05);
 vec2 disortedPosition=vec2(uv.x-float(uDirection)*(1.0-uProgress)*fractNoise,uv.y);
 vec4 curTexture=texture2D(uTexture,disortedPosition);
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

export default function ImageSlider({width = 3,height = 4,fillPercent = 0.75,}) {
  const materialRef=useRef()
  const { items, curSlide,direction } = useSliderR3f();
  const image = items[curSlide].image;
  const texture = useTexture(image);
  const [lastImage, setLastImage] = useState(image);
  const prevTexture = useTexture(lastImage);
  // eslint-disable-next-line react-hooks/immutability
  texture.wrapS=texture.wrapT=prevTexture.wrapS=prevTexture.wrapT=MirroredRepeatWrapping;
  useEffect(() => {
    const newImage = image;
    materialRef.current.uProgress=0;
    return () => {
      setLastImage(newImage);
    };
  }, [image]);
  const viewport = useThree((state) => state.viewport);
  let ratio = viewport.height / (height / fillPercent);
  if (viewport.width < viewport.height) {
    ratio = viewport.width / (width / fillPercent);
  }
  useFrame(()=>{
    materialRef.current.uProgress=MathUtils.lerp(materialRef.current.uProgress,1,0.05)
  })
  // useGSAP(()=>{
  //   gsap.fromTo(materialRef.current,{uProgress:0,duration:2,ease:'bounce.inOut'},{uProgress:1,duration:2,ease:'bounce.inOut'})
  // },{dependencies:[lastImage]})
  return (
    <mesh>
      <planeGeometry args={[width * ratio, height * ratio]} />
      <imageShader
      ref={materialRef}
        uTexture={texture}
        uPrevTexture={prevTexture}
        uDirection={direction==='next'?1:-1}
       
      />
    </mesh>
  );
}
useSliderR3f.getState().items.forEach((item) => {
  useTexture.preload(item.image);
});
