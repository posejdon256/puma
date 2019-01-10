import './Canvas.scss';

import Paper from '@material-ui/core/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React, { Component } from 'react';
import ThreeLib from 'three-js';

import { setTHREE, _animate } from './Animation/AnimationFrame';
import { generateArm } from './Draw/GenerateArm';
import KeyboardCenter from './KeybordCenter/KeyboardCenter';
import MouseCenter from './MouseCenter/MouseCenter';

export default class Canvas extends Component {
    constructor(props) {
        super(props);
        this.keyFunction = this.keyFunction.bind(this);
        this.mouseFunction = this.mouseFunction.bind(this);
    }
    componentDidMount() {

       // initWebGL(this.refs.can1);
       const THREE = ThreeLib();
       setTHREE(THREE);
        generateArm(this.refs.can1, 0);
        generateArm(this.refs.can2, 1);
        _animate();

       // DrawArms();

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
                    <div ref="can1"
                    tabindex="0"
                    onKeyDown={this.keyFunction}
                    onKeyUp={this.keyFunction}
                    onMouseDown={this.mouseFunction}
                    onMouseUp={this.mouseFunction}
                    onMouseMove={this.mouseFunction}/>
                    <div ref="can2"
                    tabindex="0"
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