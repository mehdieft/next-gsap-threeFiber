const vertex=`
varying vec2 Vuv;
uniform float uTime;
void main() {
    Vuv = uv;
    vec3 custompos;
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;
}
    `
    export default vertex