const fragment=`
varying vec2 Vuv;
uniform float uTime;
uniform vec3 uColor;

vec3 red    = vec3(0.81, 0.15, 0.15);
vec3 blue   = vec3(0.215, 0.152, 0.615);
vec3 yellow = vec3(0.89, 0.62, 0.26);
vec3 yellowFluo = vec3(0.949,0.90,0.0627);
vec3 white  = vec3(0.89, 0.89, 0.89);
vec3 black  = vec3(0.22, 0.22, 0.22);

float sdHexagram( in vec2 p, in float r )
  {
    const vec4 k = vec4(-0.5,0.8660254038,0.5773502692,1.7320508076);
    p = abs(p);
    p -= 2.0*min(dot(k.xy,p),0.0)*k.xy;
    p -= 2.0*min(dot(k.yx,p),0.0)*k.yx;
    p -= vec2(clamp(p.x,r*k.z,r*k.w),r);
    return length(p)*sign(p.y);
  }



void main() {
vec3 finalColor=white;

// finalColor=mix(finalColor,black,step(0.5,Vuv.x));
//  finalColor = mix(finalColor, red, step(0.55, Vuv.x));
//  finalColor = mix(finalColor, black, step(0.5, Vuv.x) * step(0.45, Vuv.y));
//  finalColor=mix(finalColor,blue,step(0.55,Vuv.x)*step(0.5,Vuv.y));
//  finalColor=mix(finalColor,black,step(Vuv.x,0.5)*step(Vuv.y,0.24));
//  finalColor=mix(finalColor,yellow,step(Vuv.x,0.5)*step(Vuv.y,0.24));
//  finalColor=mix(finalColor,black,step(Vuv.x,0.5)*step(0.24,Vuv.y));
//  finalColor=mix(finalColor,white,step(Vuv.x,0.5)*step(0.28,Vuv.y)*step(Vuv.y,0.65));
//  finalColor=mix(finalColor,white,step(Vuv.x,0.2)*step(0.68,Vuv.y));
//  finalColor=mix(finalColor,white,step(Vuv.x,0.5)*step(0.24,Vuv.x)*step(0.9,Vuv.y));
//  finalColor=mix(finalColor,yellow,step(Vuv.x,0.5)*step(0.24,Vuv.x)*step(Vuv.y,0.88)*step(0.68,Vuv.y));


  vec2 translatedUvs = (Vuv - 0.5) * 2.0;
    float hexagramDistance = sdHexagram(translatedUvs, 0.3);
    hexagramDistance = sin(hexagramDistance * 12.0 +uTime * 3.0)* 0.5 + 0.5;
   float pct = 0.12/hexagramDistance;
     finalColor = uColor *pct;
    gl_FragColor = vec4(finalColor, 1.0);
   



    
}
    `
    export default fragment