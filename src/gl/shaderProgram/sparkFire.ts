import { REGL } from "../regl";

export = function(regl:REGL) {
    const sparkFireCommand = regl({
        vert: `
            precision mediump float;
            attribute vec2 position;
            varying vec2 uv;
            void main() {
                uv = position;
                gl_Position = vec4(position, 0.999, 1);
            }
        `,
        frag: require('./glsl/spark_fire'),
        attributes: {
            position: [
                -4, 0,
                4, -4,
                4,  4,
            ],
        },
        primitive: 'triangles',
        count: 3,
    });

    return sparkFireCommand;
}