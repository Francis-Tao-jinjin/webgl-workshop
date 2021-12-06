#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_resolution;

const float PI = 3.1415926535;

float circleShape(vec2 pos, float r) {
    return step(r, length(pos));
}

float rectShape(vec2 pos, vec2 scale) {
    vec2 shape = vec2(step(-scale.x, pos.x), step(-scale.y, pos.y));
    shape *= vec2(step(pos.x, scale.x), step(pos.y, scale.y));
    return 1.0 - shape.x * shape.y;
}

float polygonShape(vec2 pos, float r, float sides) {
    float angle = atan(pos.x, pos.y);
    float slice = PI * 2.0 / sides;

    return step(r, cos(floor(0.5 + angle / slice) * slice - angle) * length(pos));
}

mat2 scale(vec2 scale) {
    return mat2 (scale.x, 0.0, 0.0, scale.y);
}

mat2 rotate(float angle) {
    return mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
}

void main() {
    vec2 position = (gl_FragCoord.xy / u_resolution * 2.0) - 1.0;
    position.x *= u_resolution.x / u_resolution.y;
    float xyRaito = u_resolution.x / u_resolution.y;
    
    position = scale(vec2(sin(u_time) + 2.0)) * position;
    position *= rotate(cos(u_time));
    vec3 color;
    vec2 translate = vec2(sin(u_time / 1.0) * xyRaito, cos(u_time / 1.0)) * 0.5;
    // position += translate;

    // color = vec3(circleShape(position, 0.2));
    color = vec3(rectShape(position, vec2(0.15, 0.3)));
    // color = vec3(polygonShape(position, 0.15, (sin(u_time) * 2.0 + 5.0)));
    
    gl_FragColor = vec4(color, 1.0);
}
