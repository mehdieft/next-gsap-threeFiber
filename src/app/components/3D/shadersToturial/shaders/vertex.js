const vertex=`
varying vec2 Vuv;
uniform float uTime;
void main() {
    Vuv = uv;
    vec3 custompos;
    custompos=position;
    //     Vuv.x += sin(uv.y * 20.0 + uTime) * 0.02;
    // Vuv.y += cos(uv.x * 20.0 + uTime) * 0.02;
    // custompos.z += sin(custompos.y * uTime) * 0.02;
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;
}
    `
    export default vertex