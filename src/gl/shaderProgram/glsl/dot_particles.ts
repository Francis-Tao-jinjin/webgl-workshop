export = `
precision highp float;

uniform vec2 iResolution;
uniform float iTime;

varying vec2 uv;

float time = iTime / 50.0;

float rand(vec2 co) {
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

vec4 permute(vec4 x) {
    return mod((34.0 * x + 1.0) * x , 289.0);   
}

vec2 celluar2x2(vec2 P) {
    float pp = 7.0;
    float K = 1.0 / pp;
    float K2 = 0.5 / pp;
    float jitter = 0.8;
    vec2 Pi = mod(floor(P), 289.0);
    vec2 Pf = fract(P);
	vec4 Pfx = Pf.x + vec4(-0.5, -1.5, -0.5, -1.5);
	vec4 Pfy = Pf.y + vec4(-0.5, -0.5, -1.5, -1.5);
	vec4 p = permute (Pi.x + vec4(0.0 , 1.0, 0.0, 1.0));
	p = permute (p + Pi.y + vec4(0.0 , 0.0, 1.0, 1.0));
	vec4 ox = mod(p, pp) * K + K2;
	vec4 oy = mod(floor(p * K) ,pp) * K + K2;
	vec4 dx = Pfx + jitter * ox;
	vec4 dy = Pfy + jitter * oy;
	vec4 d = dx * dx + dy * dy; // distances squared
	// Cheat and pick only F1 for the return value
	d.xy = min(d.xy, d.zw);
	d.x = min(d.x, d.y);
	return d.xx; // F1 duplicated , F2 not computed
}

vec4 DrawAParticleSet(vec4 color, vec2 uv, float size) {
    float aCellLength = size;
    vec3 colorTint;
    float randomSeed01 = rand(floor(uv / aCellLength));
    float randomSeed02 = rand(floor(uv / aCellLength) + 5.0);
    float randomSeed03 = rand(floor(uv / aCellLength) + 10.0);
    
    colorTint= vec3(randomSeed01, randomSeed02, randomSeed03);
    
    float circleLength = abs(sin(time * randomSeed03 + randomSeed02)) * randomSeed01 * aCellLength;
    
    float jitterFreedom = 0.5 - circleLength;
    float jitterAmountX =  jitterFreedom * (randomSeed03 *2.0 -1.0);
    float jitterAmounty =  jitterFreedom * (randomSeed01 *2.0 -1.0);
    vec2 coord = fract(uv / aCellLength);
    
    coord -= 0.5;
    float z = 0.0;
    vec3 toReturn;
    for (int i = 0; i<3; i++) {
        z += 0.015 * celluar2x2(coord + time * 0.1).x;
		coord += z;
		toReturn[i] = 1.0 - smoothstep(
                                circleLength - 30.5 / iResolution.y,
                                circleLength,
                                distance(coord, vec2(jitterAmountX, jitterAmounty)));
    }
    toReturn = mix(color.xyz, colorTint * toReturn, length(toReturn));
    color = vec4(toReturn.xyz, 1.0);
    return color;
}

void main() {

    vec2 _uv = gl_FragCoord.xy / iResolution.y;
    float screenXLength = iResolution.x / iResolution.y;
    _uv.x -= screenXLength / 2.0;
    _uv.y -= 0.5;
    vec4 endColor = vec4(0,0,0,1.0);

    endColor = DrawAParticleSet(endColor, _uv, 0.075);
    endColor = DrawAParticleSet(endColor, _uv - 0.1, 0.1);
    endColor = DrawAParticleSet(endColor, _uv + 0.3, 0.12);
    gl_FragColor = vec4(endColor);
}

`;