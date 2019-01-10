import './Navbar.scss';

import { Button, Grid } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React, { Component } from 'react';

import {
    endAnimation,
    prepareAnimation,
    setAlfa1,
    setAlfa2,
    setBeta1,
    setBeta2,
    setGamma1,
    setGamma2,
    setSpeed,
} from '../canvas/Animation/Animation';
import { updateEffectorAngles } from '../canvas/Geometry/Cylinder';
import { setL1, setL2, setL3 } from '../datas/CollectAndShareDatas';

export default class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            x1: 0, 
            y1: 0,
            z1: 0,
            w1: 1,
            x2: 1,
            y2: 1,
            z2: 0,
            w2: 1,
            alfa1: 0,
            beta1: 0,
            gamma1: 0,
            alfa2: 17,
            beta2: 28,
            gamma2: 40,
            speed: 100,
            slerp: true,
            l1: 1,
            l2: 1,
            l3: 1,
            l4: 1
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
        this._setL4 = this._setL4.bind(this);
    }
    _setL4(e) {
        this.setState({
            l4: e.target.value
        });
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
        updateEffectorAngles();
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
        updateEffectorAngles();
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
        updateEffectorAngles();
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
        prepareAnimation();
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
                            label="Euler Gamma"
                            onChange={this._setBeta2}
                            value={this.state.gamma2}
                            margin="normal"
                            variant="outlined"
                        />
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
                            label="L4"
                            onChange={this._setL4}
                            value={this.state.l4}
                            margin="normal"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Speed"
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