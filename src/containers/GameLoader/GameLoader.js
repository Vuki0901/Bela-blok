import React from 'react';
import axios from 'axios';

import InputGroup from 'react-bootstrap/InputGroup';
import { FormControl } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default class GameLoader extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            us: "",
            thy: "",
            msg: "",
            errorMsg: null,
        }
    }

    loadData = (event) => {
        axios.get(
            '/partije.json'
        ).then(
            response => {
                const savedGames = response.data
                const key = document.getElementById("key").value;

                for(let save of Object.keys(savedGames)){
                    if (savedGames[save].hasOwnProperty(key)){
                        this.setState({
                            us: savedGames[save][key].us,
                            thy: savedGames[save][key].thy,
                            msg: savedGames[save][key].msg,
                        }, () => {
                            if (
                                this.state.us > 1000 ||
                                this.state.thy > 1000
                              ) {
                                  this.setState({ errorMsg: "Igra je završena" })
                              } else {
                                  this.setState({ errorMsg: null })
                              }
                        })
                    }
                }
            }
        ).catch(
            err => console.log(err)
        )

    }

    render(){
        return (
            <Modal show={this.props.show} onHide={this.props.action}>
                <Modal.Header closeButton>
                <Modal.Title>Load Game</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h6>To load a game, you must enter a key you received when you saved the game</h6>
                    <br />
                    <InputGroup>
                        <FormControl id="key" type="text" placeholder="Key"/>
                        <Button variant="primary" onClick={this.loadData}>Load</Button>
                    </InputGroup>
                    <br />
                    <p>Us: {this.state.us}</p>
                    <p>Thy: {this.state.thy}</p>
                    <p>Msg: {this.state.msg}</p>
                    <h6>{this.state.errorMsg}</h6>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={this.props.action}>
                    Close
                </Button>
                <Button disabled={this.state.errorMsg ? true : false} variant="primary" onClick={() => {this.props.load(this.state)}}>
                    {this.state.errorMsg ? "Nemoguće Učitati Završenu Partiju" : "Nastavi Učitanu Partiju"}
                </Button>
                </Modal.Footer>

                
            </Modal>
        )
    }
}