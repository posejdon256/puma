import './Navbar.scss';

import { Button, Grid, Select, MenuItem } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React, { Component } from 'react';

import {
    endAnimation,
    setAlfa1,
    setAlfa2,
    setBeta1,
    setBeta2,
    setGamma1,
    setGamma2,
    setSpeed,
} from '../canvas/Animation/Animation';
import {setL1, setL2, setL3, setMode} from '../datas/CollectAndShareDatas';
import { setZ1, setY1, setY2, setX1, setX2, setZ2 } from '../canvas/Draw/GenerateEffector';
import { _startAnimation } from '../canvas/Animation/AnimationFrame';

export default class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alfa1: 0,
            beta1: 0,
            gamma1: 0,
            alfa2: 0,
            beta2: 0,
            gamma2: 0,
            speed: 1,
            slerp: true,
            x1: 60,
            y1: 0,
            z1: 0,
            x2: 60,
            y2: 0,
            z2: 0,
            l1: 60,
            l2: 30,
            l3: 30,
            mode: 0
        };
        this.startAnimation = this.startAnimation.bind(this);
        this.endAnimation = this.endAnimation.bind(this);

        this._setAlfa1 = this._setAlfa1.bind(this);
        this._setAlfa2 = this._setAlfa2.bind(this);
        this._setBeta1 = this._setBeta1.bind(this);
        this._setBeta2 = this._setBeta2.bind(this);
        this._setGamma1 = this._setGamma1.bind(this);
        this._setGamma2 = this._setGamma2.bind(this);

        this._setSpeed = this._setSpeed.bind(this);

        this._setL1 = this._setL1.bind(this);
        this._setL2 = this._setL2.bind(this);
        this._setL3 = this._setL3.bind(this);

        this._setX1 = this._setX1.bind(this);
        this._setY1 = this._setY1.bind(this);
        this._setZ1 = this._setZ1.bind(this);

        this._setX2 = this._setX2.bind(this);
        this._setY2 = this._setY2.bind(this);
        this._setZ2 = this._setZ2.bind(this);
        this._setMode = this._setMode.bind(this);
    }
    _setMode(e) {
        this.setState({
            mode: e.target.value
        });
        setMode(e.target.value);
    }
    _setZ2(e) {
        this.setState({
            z2: e.target.value
        });
        setZ2(e.target.value);
    }
    _setY2(e) {
        this.setState({
            y2: e.target.value
        });
        setY2(e.target.value);
    }
    _setX2(e) {
        this.setState({
            x2: e.target.value
        });
        setX2(e.target.value);
    }
    _setZ1(e) {
        this.setState({
            z1: e.target.value
        });
        setZ1(e.target.value);
        
    }
    _setY1(e) {
        this.setState({
            y1: e.target.value
        });
        setY1(e.target.value);
        
    }
    _setX1(e) {
        this.setState({
            x1: e.target.value
        });
        setX1(e.target.value);
       
    }
    _setL1(e) {
        this.setState({
            l1: e.target.value
        });
        setL1(e.target.value);
    }
    _setL2(e) {
        this.setState({
            l2: e.target.value
        });
        setL2(e.target.value);
    }
    _setL3(e) {
        this.setState({
            l3: e.target.value
        });
        setL3(e.target.value);
    }
    _setAlfa1(e) {
        this.setState({
            alfa1: e.target.value
        });
        setAlfa1(e.target.value);
    }
    _setAlfa2(e) {
        this.setState({
            alfa2: e.target.value
        });
        setAlfa2(e.target.value);
    }
    _setBeta1(e) {
        this.setState({
            beta1: e.target.value
        });
        setBeta1(e.target.value);
      
    }
    _setBeta2(e) {
        this.setState({
            beta2: e.target.value
        });
        setBeta2(e.target.value);
    }
    _setGamma1(e) {
        this.setState({
            gamma1: e.target.value
        });
        setGamma1(e.target.value);
       
    }
    _setGamma2(e) {
        this.setState({
            gamma2: e.target.value
        });
        setGamma2(e.target.value);
    }
    _setSpeed(e) {
        this.setState({
            speed: e.target.value
        });
        setSpeed(e.target.value);
    }
    startAnimation() {
        _startAnimation();
    }
    endAnimation() {
        endAnimation();
    }
    render(){
        return(
            <div className="ab-navbar">
                <MuiThemeProvider>
                <Paper className="ab-paper">
                <Grid container spacing={24}>
                    <Grid item xs = {6}>
                        <TextField
                            label="Euler Alpha 1"
                            onChange={this._setAlfa1}
                            value={this.state.alfa1}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            label="Euler Beta 1"
                            onChange = {this._setBeta1}
                            value={this.state.beta1}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            onChange={this._setGamma1}
                            label="Euler Gamma 1"
                            value={this.state.gamma1}
                            margin="normal"
                            variant="outlined"
                        />
                            <TextField
                            onChange={this._setAlfa2}
                            label="Euler Alpha 2"
                            value={this.state.alfa2}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            label="Euler Beta 2"
                            onChange={this._setBeta2}
                            value={this.state.beta2}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            label="Euler Gamma 2"
                            onChange={this._setGamma2}
                            value={this.state.gamma2}
                            margin="normal"
                            variant="outlined"
                        />
                          <Select
                            value={this.state.mode}
                            onChange={this._setMode}
                            name="age"
                            >
                        <MenuItem value={0}>Camera</MenuItem>
                        <MenuItem value={1}>Start effector</MenuItem>
                        <MenuItem value={2}>End effector</MenuItem>
                    </Select>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="L1"
                            onChange={this._setL1}
                            value={this.state.l1}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            label="L2"
                            onChange={this._setL2}
                            value={this.state.l2}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            label="L3"
                            onChange={this._setL3}
                            value={this.state.l3}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            label="X1"
                            onChange={this._setX1}
                            value={this.state.x1}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            label="Y1"
                            onChange={this._setY1}
                            value={this.state.y1}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            label="Z1"
                            onChange={this._setZ1}
                            value={this.state.z1}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            label="X2"
                            onChange={this._setX2}
                            value={this.state.x2}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            label="Y2"
                            onChange={this._setY2}
                            value={this.state.y2}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            label="Z2"
                            onChange={this._setZ2}
                            value={this.state.z2}
                            margin="normal"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Time in seconds"
                            onChange={this._setSpeed}
                            value={this.state.speed}
                            margin="normal"
                            variant="outlined"
                        />
                        </Grid>
                        <Grid item xs={12}>
                        <Button variant="contained" color="primary" onClick={this.startAnimation}>Start</Button>
                        <Button variant="contained" color="secondary" onClick = {this.endAnimation}>Stop</Button>
                    </Grid>
                  </Grid>
                    </Paper>
                </MuiThemeProvider>
            </div>
      
    );}
}