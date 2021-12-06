#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

void main() {
    vec2 coord = (gl_FragCoord.xy / u_resolution.xy * 2.0) - 1.0;
    coord.x *= u_resolution.x / u_resolution.y;

    vec3 color = vec3(0.0);

    color.r += abs(0.1 + length(coord) - 0.6 * abs(sin(u_time * 0.9 / 12.0 )));
    color.g += abs(0.1 + length(coord) - 0.6 * abs(sin(u_time * 0.6 / 4.0 )));
    color.b += abs(0.1 + length(coord) - 0.6 * abs(sin(u_time * 0.3 / 9.0 )));

    gl_FragColor = vec4(vec3(0.1 / color), 1.0);
}