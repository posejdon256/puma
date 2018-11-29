import { getSettings } from '../OpenGL/InitOpenGL';

export function cleanScrean() {
    const settings = getSettings();
    for(let i = 0; i < settings.length; i ++) {
        _cleanCanvas(settings[i]);
    }
}
function _cleanCanvas(set) {
    const gl = set.gl;
    gl.clearColor(255.0, 255.0, 255.0, 1.0);                      // Set clear color to black, fully opaque
    gl.enable(gl.DEPTH_TEST);                               // Enable depth testing
    gl.depthFunc(gl.LEQUAL);                                // Near things obscure far things
    gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT); 
}