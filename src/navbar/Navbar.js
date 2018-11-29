import React, { Component } from 'react';
import './Navbar.scss';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import { _setN, _setSize, _setDisplacement, _setDensity, _seenTrayectory, _seenCube, _seenDagonal, _seenGravitation, _setSpeed } from '../datas/CollectAndShareDatas';
import { Button, Grid } from '@material-ui/core';
import { endAnimation, prepareAnimation, setX1, setX2, setY1, setY2, setZ1, setZ2, setW1, setW2, setAlfa1, setAlfa2, setBeta1, setBeta2, setGamma1, setGamma2, setSpeed, setLerpSlerp } from '../canvas/Animation/Animation';

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
        this._setSlerp = this._setSlerp.bind(this);

        this._setX1 = this._setX1.bind(this);
        this._setX2 = this._setX2.bind(this);
        this._setY1 = this._setY1.bind(this);
        this._setY2 = this._setY2.bind(this);
        this._setZ1 = this._setZ1.bind(this);
        this._setW1 = this._setW1.bind(this);
        this._setW2 = this._setW2.bind(this);
    }
    _setX1(e) {
        this.setState({
            x1: e.target.value
        });
        setX1(e.target.value);
    }
    _setX2(e) {
        this.setState({
            x2: e.target.value
        });
        setX2(e.target.value);
    }
    _setY1(e) {
        this.setState({
            y1: e.target.value
        });
        setY1(e.target.value);
    }
    _setY2(e) {
        this.setState({
            y2: e.target.value
        });
        setY2(e.target.value);
    }
    _setZ1(e) {
        this.setState({
            z1: e.target.value
        });
        setZ1(e.target.value);
    }
    _setZ2(e) {
        this.setState({
            z2: e.target.value
        });
        setZ2(e.target.value);
    }
    _setW1(e) {
        this.setState({
            w1: e.target.value
        });
        setW1(e.target.value);
    }
    _setW2(e) {
        this.setState({
            w2: e.target.value
        });
        setW2(e.target.value);
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
    _setSlerp() {
        this.setState({
            slerp: !this.slerp
        });
        setLerpSlerp();
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
                        <FormGroup column>
                            <FormControlLabel control={
                                    <Switch
                                    checked={this.state.slerp}
                                    onChange={this._setSlerp}
                                    value="seenCube"
                                    />} label="Slerp" />
                        </FormGroup>
                        <TextField
                            label="Quaternion X1"
                            value={this.state.x1}
                            onChange={this._setX1}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            label="Quaternion Y1"
                            value={this.state.y1}
                            onChange={this._setY1}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            label="Quaternion Z1"
                            value={this.state.z1}
                            onChange={this._setZ1}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            label="Quaternion W1"
                            onChange={this._setW1}
                            value={this.state.displacement}
                            margin="normal"
                            variant="outlined"
                        />
                         <TextField
                            label="Quaternion X2"
                            onChange={this._setX2}
                            value={this.state.x2}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            label="Quaternion Y2"
                            onChange={this._setY2}
                            value={this.state.y2}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            label="Quaternion Z2"
                            onChange={this._setZ2}
                            value={this.state.z2}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            label="Quaternion W2"
                            onChange={this._setW1}
                            value={this.state.w2}
                            margin="normal"
                            variant="outlined"
                        />
                        </Grid>
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
                                onChange={this._setAlfa1}
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