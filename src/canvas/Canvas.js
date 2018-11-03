import React, { Component } from 'react';
import './Canvas.scss';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from '@material-ui/core/Paper';
import { initWebGL } from '../OpenGL/InitOpenGL';
import { DrawCube } from './DrawOnCanvas';
import KeyboardCenter from './KeybordCenter/KeyboardCenter';
import MouseCenter from './MouseCenter/MouseCenter';
import { DrawLines } from './Draw/DrawLines';

export default class Canvas extends Component {
    constructor(props) {
        super(props);
        this.keyFunction = this.keyFunction.bind(this);
        this.mouseFunction = this.mouseFunction.bind(this);
    }
    componentDidMount() {
        initWebGL(this.refs.can);


        DrawCube();
        DrawLines();

    }
    keyFunction(event) {
        KeyboardCenter(event);
    }
    mouseFunction(event) {
        MouseCenter(event);
    }
    render(){
        return(
        <div className="ab-canvas-container">
            <MuiThemeProvider>
                <Paper className="ab-canvas-paper">
                    <canvas tabindex={0} ref="can" className="ab-canvas" width="1400px" height="913px" 
                    onKeyDown={this.keyFunction}
                    onKeyUp={this.keyFunction}
                    onMouseDown={this.mouseFunction}
                    onMouseUp={this.mouseFunction}
                    onMouseMove={this.mouseFunction}/>
                </Paper>
            </MuiThemeProvider>
        </div>
    );}
}