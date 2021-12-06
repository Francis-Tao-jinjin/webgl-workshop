import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Main } from './reactComponent/main'
import createREGL = require('regl');
import { createREGLCache } from './gl/regl';
import glMain = require('./gl/main');

async function start() {
    const regl = createREGL({
        extensions: [
            'OES_element_index_uint',
            'OES_texture_float',
        ],
        attributes: {
            alpha: true,
            premultipliedAlpha: true,
            preserveDrawingBuffer: true,
        }
    });

    const requireREGL = createREGLCache(regl);
    const renderFrame = requireREGL(glMain);

    const reactContainer = document.createElement('div');
    reactContainer.id = 'react-container';
    const containerStyle = reactContainer.style;
    containerStyle.width = '100%';
    containerStyle.height = '100%';
    containerStyle.position = 'absolute';
    containerStyle.left = '0';
    containerStyle.top = '0';
    containerStyle.margin = '0';
    containerStyle.padding = '0';
    document.body.appendChild(reactContainer);

    regl.frame(() => {
        renderFrame({

        });
        ReactDOM.render(
            <Main/>,
            reactContainer);
    });
}

start().catch((err) => console.log(err));