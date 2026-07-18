const fragment=`
varying vec2 Vuv;
uniform float uTime;
uniform vec3 uColor;
void main() {
   
    // float value=mod(Vuv.y *20.0,1.0);
    // value=step(0.95,value);
    float value= smoothstep(0.6, 0.8,mod(Vuv.x *20.0,1.0));
    value+= step(0.8,mod(Vuv.y *10.0,1.0));

    
    gl_FragColor = vec4(vec3(value), 1.0);
}
    `
    export default fragment