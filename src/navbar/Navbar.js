import React, { Component } from 'react';
import './Navbar.scss';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import { _setN, _setSize, _setDisplacement, _setDensity, _seenTrayectory, _seenCube, _seenDagonal, _seenGravitation, _setSpeed } from '../datas/CollectAndShareDatas';

export default class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            seenCube:  true,
            seenDiagonal: false,
            trayectory: false,
            gravitation: false,
            cubeSize: 1,
            density: 1, //gęstość
            displacement: 1, //wychylenie
            speed: 1, //prędność kątowa
            n: 100 //trayectory length
        };
        this.seenCube = this.seenCube.bind(this);
        this.seenDagonal = this.seenDagonal.bind(this);
        this.seenTrayectory = this.seenTrayectory.bind(this);
        this.seenGravitation = this.seenGravitation.bind(this);
        this.setSize = this.setSize.bind(this);
        this.setDensity = this.setDensity.bind(this);
        this.setDisplacement = this.setDisplacement.bind(this);
        this.setSpeed = this.setSpeed.bind(this);
        this.setN = this.setN.bind(this);
    }
    setN(e) {
        this.setState({
            n: e.target.value
        });
        _setN(e.target.value);
    }
    setSpeed(e) {
        this.setState({
            speed: e.target.value
        });
        _setSpeed(e.target.value);
    }
    setDisplacement(e) {
        this.setState({
            displacement: e.target.value
        });
        _setDisplacement(e.target.value);
    }
    setDensity(e) {
        this.setState({
            density: e.target.value
        });
        _setDensity(e.target.value);
    }
    setSize(e) {
        this.setState({
            cubeSize: e.target.value
        });
        _setSize(e.target.value);
    }
    seenGravitation(e) {
        this.setState({
            gravitation: e.target.checked
        });
        _seenGravitation();
    }
    seenTrayectory(e) {
        this.setState({
            trayectory: e.target.checked
        });
        _seenTrayectory();
    }
    seenCube(e) {
        this.setState({
            seenCube: e.target.checked
        });
        _seenCube();
    }
    seenDagonal(e) {
        this.setState({
            seenDiagonal: e.target.checked
        });
        _seenDagonal();
    }
    render(){
        return(
            <div className="ab-navbar">
                <MuiThemeProvider>
                <Paper className="ab-paper">
                    <FormGroup column>
                        <FormControlLabel control={
                                <Switch
                                checked={this.state.seenCube}
                                onChange={this.seenCube}
                                value="seenCube"
                                />} label="Cube" />
                        <FormControlLabel control={
                                <Switch
                                checked={this.state.seenDiagonal}
                                value="seenDiagonal"
                                onChange={this.seenDagonal}
                                />} label="Diagonal" />
                        <FormControlLabel control={
                                <Switch
                                checked={this.state.trayectory}
                                value="trayectory"
                                onChange={this.seenTrayectory}
                                />} label="Trayectory" />
                        <FormControlLabel control={
                                <Switch
                                checked={this.state.gravitation}
                                onChange={this.seenGravitation}
                                value="gravitation"
                                />} label="Gravitation" />
                    </FormGroup>
                    <TextField
                        label="Cube size"
                        value={this.state.cubeSize}
                        margin="normal"
                        onChange={this.setSize}
                        variant="outlined"
                    />
                    <TextField
                        label="Cube densinity"
                        value={this.state.density}
                        onChange={this.setDensity}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        label="Cube displacement"
                        value={this.state.displacement}
                        onChange={this.setDisplacement}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        label="Angular velocity"
                        onChange={this.setSpeed}
                        value={this.state.speed}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        label="Trayectory length"
                        onChange={this.setN}
                        value={this.state.n}
                        margin="normal"
                        variant="outlined"
                    />
                    </Paper>
                </MuiThemeProvider>
            </div>
      
    );}
}