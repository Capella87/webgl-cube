

function run_cube() {
  const canvas = document.querySelector('#glcanvas');

  /** @type {WebGLRenderingContext} */
  const gl = canvas.getContext('webgl');

  if (gl === null) {
    alert('We were unable to initialize WebGL.');
    return;
  }

  gl.clearColor(gl.COLOR_BUFFER_BIT);

}
