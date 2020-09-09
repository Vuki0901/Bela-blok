import React from 'react';

import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FormControl } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default class NewInput extends React.Component {
    constructor(props){
        super (props);
        this.state = {
            mi: "",
            vi: "",
            zvanja: {
                mi: "",
                vi: ""
            }
        }
    }

    miUpdate = (event) => {
        let x = event.target.value;
        //validation
        const game = this.props.game
        const zvao = this.props.zvao

        this.setState({ mi: x, vi: 162-x })
    }

    isZvanjaEmpty = () => {
        if (this.state.zvanja.mi !== "" || this.state.zvanja.vi !== "") {
            if (this.state.zvanja.mi === ""){
                this.setState({ zvanja: { mi: 0 } })
            } else if (this.state.zvanja.mi === ""){
                this.setState({ zvanja: { vi: 0 } })
            }
        }
    }

    zvanjaUpdate = (event) => {
        let y = event.target.value;
        console.log(y, typeof(y))
        

        switch (event.target.id) {
            case "zvanjaMi":
                this.setState({ zvanja: { mi: parseInt(y), vi: this.state.zvanja.vi } })
                break;
            case "zvanjaVi":
                this.setState({ zvanja: { vi: parseInt(y), mi: this.state.zvanja.mi } })
                break;
            default:
                console.log("Pogreška");
        }
        
        
    }



    met = () => {
        console.log("there")
    }

    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.action}>
                <Modal.Header closeButton>
                <Modal.Title>Novi Unos</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h2>Ukupno zvanja:</h2>
                    <p>Nepotrebno ispunjavati ako nema zvanja</p>
                    <InputGroup >
                        <FormControl type="number" onChange={this.zvanjaUpdate} id="zvanjaMi" value={this.state.zvanja.mi} placeholder="Mi"/>
                        <FormControl type="number" onChange={this.zvanjaUpdate} id="zvanjaVi" value={this.state.zvanja.vi} placeholder="Vi" />
                    </InputGroup>
                        <hr />
                        <h3>Igra: {162 + this.state.zvanja.mi + this.state.zvanja.vi}</h3>
                        <hr />                        
                        <FormControl onChange={this.miUpdate} value={this.state.mi} placeholder={this.props.teams[0]}/>
                        <FormControl onChange={this.met} value={this.state.vi} placeholder={this.props.teams[1]}/>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={this.props.action}>
                    Zatvori
                </Button>
                <Button variant="primary" onClick={this.props.action}>
                    Spremi Unos
                </Button>
                </Modal.Footer>
            </Modal>  
        )
    }
}