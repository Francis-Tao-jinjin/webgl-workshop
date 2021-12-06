#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_resolution;

const float PI = 3.1415926535;

void main() {
    vec2 position = (gl_FragCoord.xy / u_resolution * 2.0) - 1.0;
    position.x *= u_resolution.x / u_resolution.y;

    vec3 color = vec3(0.0);
    // color += sin(position.y * cos(1.0 / 10.0) * 60.0);// + sin(position.x * cos(1.0 / 10.0) * 60.0);
    color += sin(position.y * 60.0) * 5.0 - sin(u_time * 2.0);
    color += sin(position.x * 60.0) * 5.0 - sin(u_time * 2.0);
    gl_FragColor = vec4(color, 1.0);
}