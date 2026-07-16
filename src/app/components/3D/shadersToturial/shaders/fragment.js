const fragment=`
varying vec2 Vuv;
uniform float uTime;
uniform vec3 uColor;
void main() {
    vec3 custom = uColor;
    float bands = floor(Vuv.x * 10.0) / 10.0;

    gl_FragColor = vec4(vec3(bands), 1.0);
}
    `
    export default fragment