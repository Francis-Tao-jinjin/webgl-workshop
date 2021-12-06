#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_resolution;

void main() {
    // vec2 position = (gl_FragCoord.xy / u_resolution * 2.0) - 1.0;
    vec2 position = (gl_FragCoord.xy - u_resolution)/min(u_resolution.y, u_resolution.x);
    position.x *= u_resolution.x / u_resolution.y;
    position *= 3.0;

    for (int n = 1; n < 5; n++) {
        float i = float(n);
        position += vec2(0.7 / i * sin(i * position.y + u_time + 0.3 * i) + 0.8, 0.4 / i * sin(position.x + u_time + 0.3 * i) + 1.6);
    }
    for (int n = 5; n < 9; n++) {
        float i = float(n);
        position *= vec2(0.7 / i * sin(i * position.y + u_time + 0.3 * i) + 0.8, 0.4 / i * sin(position.x + u_time + 0.3 * i) + 1.6);
    }

    vec3 color = vec3(0.5 * sin(position.x) + 0.5, 0.5 * sin(position.y) + 0.5, sin(position.x + position.y));
    gl_FragColor = vec4(color, 1.0);
}