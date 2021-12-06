#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_resolution;

void main() {
    // vec2 coord = (gl_FragCoord.xy / u_resolution.xy * 2.0) - 1.0;
    // coord.x *= u_resolution.x / u_resolution.y;

    vec2 coord = gl_FragCoord.xy * 1.0 - u_resolution;
    vec3 color = vec3(0.0);

    color += abs(cos(coord.x / 20.0 ) + sin(coord.y / 20.0) - cos(u_time));

    gl_FragColor = vec4(vec3(color), 1.0);
}