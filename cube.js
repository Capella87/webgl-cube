export const canvas = document.getElementById('cube');
  /** @type {WebGLRenderingContext} */
export const gl = canvas.getContext("webgl");

import { drawScene } from "./draw-scene.js";
import { initBuffers } from "./init-buffers.js";

// Polygon configurations import
import { cubeVertices, cubeFaceColors, cubeIndices } from "./objects.js";


export let cubeRotation = 0.0;
export let deltaTime = 0;

window.onload = function init() {

  if (gl === null) {
    alert('We were unable to initialize WebGL.');
    return;
  }

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clear(gl.COLOR_BUFFER_BIT);

  const mdnExampleVsSource = `
      attribute vec4 aVertexPosition;
      attribute vec4 aVertexColor;

      uniform mat4 uModelViewMatrix;
      uniform mat4 uProjectionMatrix;

      varying lowp vec4 vColor;

      void main(void) {
        gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
        vColor = aVertexColor;
      }
    `;

  const mdnExampleFsSource = `
      varying lowp vec4 vColor;

      void main() {
        gl_FragColor = vColor;
      }
    `;

  const shaderProgram = initShaderProgram(gl, mdnExampleVsSource, mdnExampleFsSource);
  const programInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram, "aVertexPosition"),
      vertexColor: gl.getAttribLocation(shaderProgram, "aVertexColor"),
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(shaderProgram, "uProjectionMatrix"),
      modelViewMatrix: gl.getUniformLocation(shaderProgram, "uModelViewMatrix"),
    },
  };

  const buffers = initBuffers(gl, cubeVertices, cubeFaceColors, cubeIndices);
  
  let then = 0;

  function render(now) {
    now *= .001;
    deltaTime = now - then;
    then = now;
  
    drawScene(gl, programInfo, buffers, cubeRotation);
    cubeRotation += deltaTime;
  
    requestAnimationFrame(render);
  }
  
  requestAnimationFrame(render)
}

function initShaderProgram(gl, vsSource, fsSource) {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

  // Create the shader program

  const shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  // If creating the shader program failed, alert

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    alert(
      `Unable to initialize the shader program: ${gl.getProgramInfoLog(
        shaderProgram
      )}`
    );
    return null;
  }

  return shaderProgram;
}

function loadShader(gl, type, source) {
  const shader = gl.createShader(type);

  // Send the source to the shader object

  gl.shaderSource(shader, source);

  // Compile the shader program

  gl.compileShader(shader);

  // See if it compiled successfully

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert(
      `An error occurred compiling the shaders: ${gl.getShaderInfoLog(shader)}`
    );
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}
