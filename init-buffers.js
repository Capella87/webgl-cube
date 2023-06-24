import { cubeVertices, cubeFaceColors,
         cubeIndices } from "./objects.js";

// ??
export function initBuffers(gl, 
  polygonVertices, 
  polygonFaceColors, 
  polygonIndices) {
  const positionBuffer = initPositionBuffer(gl, polygonVertices);
  const colorBuffer = initColorBuffer(gl, polygonFaceColors);
  const indexBuffer = initIndexBuffer(gl, polygonIndices);

  return {
    position: positionBuffer,
    color: colorBuffer,
    indices: indexBuffer,
  };
}

export function initPositionBuffer(gl, polygonVertices) {
  const positionBuffer = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  const positions = polygonVertices;

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

  return positionBuffer;
}

export function initColorBuffer(gl, polygonFaceColors) {
  var colors = [];

  for (var j = 0; j < polygonFaceColors.length; j++) {
    const c = polygonFaceColors[j];
    colors = colors.concat(c, c, c, c);
  }

  const colorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

  return colorBuffer;
}

function initIndexBuffer(gl, polygonIndices) {
  const indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

  const indices = polygonIndices;

  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, 
    new Uint16Array(indices), 
    gl.STATIC_DRAW);

    return indexBuffer;
}
