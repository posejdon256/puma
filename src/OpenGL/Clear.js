import { getglCtx } from "./InitOpenGL";

export function cleanScrean() {
    const gl = getglCtx();
    gl.clearColor(255.0, 255.0, 255.0, 1.0);                      // Set clear color to black, fully opaque
    gl.enable(gl.DEPTH_TEST);                               // Enable depth testing
    gl.depthFunc(gl.LEQUAL);                                // Near things obscure far things
    gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
}