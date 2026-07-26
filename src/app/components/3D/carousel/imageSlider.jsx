import { useTexture, shaderMaterial } from "@react-three/drei";
import { useThree,extend } from "@react-three/fiber";

const ImageShader = shaderMaterial(
  {
    uTexture: '',
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
 varying vec2 vUv;
 uniform sampler2D uTexture;
 void main(){
 vec2 uv=vUv;
 vec4 curTexture=texture2D(uTexture,vUv);
 gl_FragColor=curTexture;
 #include <tonemapping_fragment>
#include <colorspace_fragment>
 }  
`,
);
extend({ImageShader})

export default function ImageSlider({
  width = 3,
  height = 4,
  fillPercent = 0.75,
}) {
  const image =
    "/images/r3f/carousel/Default_authentic_futuristic_cottage_with_garden_outside_0.jpg";
  const texture = useTexture(image);
  const viewport = useThree((state) => state.viewport);
  let ratio = viewport.height / (height / fillPercent);
  if (viewport.width < viewport.height) {
    ratio = viewport.width / (width / fillPercent);
  }
  return (
    <mesh>
      <planeGeometry args={[width * ratio, height * ratio]} />
      <imageShader uTexture={texture} />
    </mesh>
  );
}
