#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_resolution;

void main() {
    vec2 coord = (gl_FragCoord.xy / u_resolution.xy * 2.0) - 1.0;
    coord.x *= u_resolution.x / u_resolution.y;
    vec3 color = vec3(0.0);
    // vec2 translate =  vec2(-0.5, -0.5);
    // coord += translate;

    // loop 20m times for 20 dots
    for (int i = 0; i < 20; i++) {
        float radius = 0.5;
        // in order to get 20 dots, radian need to be divided by 20
        float rad = radians(360.0 / 20.0 ) * float(i);
        color += 0.006/length(coord + vec2(radius * cos(rad + u_time), radius * sin(rad + u_time)));
    }

    gl_FragColor = vec4(vec3(color), 1.0);
}