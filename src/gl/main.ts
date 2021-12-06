import { REGL, REGLLoader } from './regl';
import glDrawDotParticle = require('./shaderProgram/dotParticles');
import glDrawSparkFire = require('./shaderProgram/sparkFire');
import glPaperScroll = require('./shaderProgram/paperScroll');

export = function(regl:REGL, requireREGL:REGLLoader) {

    const drawDotParticle = requireREGL(glDrawDotParticle);
    const drawSparkFire = requireREGL(glDrawSparkFire);
    const drawPaperScroll = requireREGL(glPaperScroll);

    const setup = regl({
        uniforms: {
            iResolution: (ctx) => [ctx.viewportWidth * 0.75, ctx.viewportHeight],
            iTime: ({tick}) => tick,
        },
    });

    return function(props) {
        setup(props, ({tick}) => {
            regl.clear({
                color: [0.361, 0.392, 0.424, 1],
                depth: 1,
            });
            drawDotParticle();
            // drawSparkFire();
            // drawPaperScroll();
        });
    };
}