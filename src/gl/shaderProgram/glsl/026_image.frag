#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

uniform sampler2D u_tex0;

float noise1d(float value) {
    return cos(value + cos(value * 90.0) * 100.0) * 0.5 + 0.5; 
}

void main() {
    // vec2 coord = (gl_FragCoord.xy / u_resolution.xy * 2.0) - 1.0;
    // coord.x *= u_resolution.x / u_resolution.y;
    vec2 coord = gl_FragCoord.xy / u_resolution.xy;

    vec3 color = vec3(0.0);
    
    // gl_FragColor = vec4(vec3(color), 1.0);
    gl_FragColor = texture2D(u_tex0, coord);
}