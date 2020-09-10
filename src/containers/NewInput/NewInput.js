import React from 'react';

import InputGroup from 'react-bootstrap/InputGroup';
import { FormControl } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default class NewInput extends React.Component {
    constructor(props){
        super (props);
        this.state = {
            mi: 0,
            vi: 0,
            zvanja: {
                mi: 0,
                vi: 0
            },
            igra: 162,
            zvaoMi: true,
            msg: ""
        }
    }

    
    msgHandler = () => {
        let msg;
        const mi = this.state.mi
        const vi = this.state.vi
        const igra = this.state.igra
        switch(document.getElementById("zvaoMi").checked){
            case true:
                msg = mi < igra / 2 ? "Tim Mi je pao" : "Tim Mi je prošao"
                this.setState({ msg: msg })
                break;
            case false:
                msg = vi < igra / 2 ? "Tim Vi je pao" : "Tim Vi je prošao"
                this.setState({ msg: msg })
                break;
            default:
                return null;
        }
    }

    //na svaki unos u polje rezultata
    rezUpdate = (event) => {
        let x = parseInt(event.target.value);

        if(isNaN(x)){
            x = 0;
        }
        
        switch(event.target.id){
            case "rezMi":
                this.setState(
                    {
                        mi: x, 
                        vi: this.state.igra - x
                    }
                , () => {this.msgHandler()})
                break;
            case "rezVi":
                this.setState({ vi: x, mi: this.state.igra - x },
                    () => {this.msgHandler()})
                break;
            default:
                console.log("pogrrešak");
        }
    }

    //na svaki unos u polje zvanja
    zvanjaUpdate = (event) => {
        let y = parseInt(event.target.value);
        
        y = isNaN(y) ? 0 : y

        switch (event.target.id) {
            case "zvanjaMi":
                this.setState({
                    zvanja: {
                        mi: y,
                        vi: this.state.zvanja.vi 
                    },
                    igra: 162 + y + this.state.zvanja.vi 
                })
                break;
            case "zvanjaVi":
                this.setState({
                    zvanja: {
                        vi: y,
                        mi: this.state.zvanja.mi 
                    },
                    igra: 162 + y + this.state.zvanja.mi 
                })
                break;
            default:
                console.log("Error");
        }
    }

    //optimizacija
    /*
    shouldComponentUpdate(nextProps, nextState){
        if (nextState.mi !== this.state.mi ||
            nextState.vi !== this.state.vi ||
            nextState.zvanja.mi !== this.state.zvanja.mi ||
            nextState.zvanja.vi !== this.state.zvanja.vi){
                return true
            } else {
                return false
            }
    }
    */

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
                        <FormControl type="number" onChange={this.zvanjaUpdate} id="zvanjaMi" value={
                            this.state.zvanja.mi === 0 ? "" : this.state.zvanja.mi
                        } placeholder="Mi Zvanja"/>
                        <FormControl type="number" onChange={this.zvanjaUpdate} id="zvanjaVi" value={
                            this.state.zvanja.vi === 0 ? "" : this.state.zvanja.vi
                        } placeholder="Vi Zvanja" />
                    </InputGroup>


                        <hr />
                        <h3>Igra: {this.state.igra}</h3>
                        <hr />
                        <h6>Označite grupu koja je zvala aduta</h6>


                    <InputGroup>
                        <InputGroup.Radio name="zvao" id="zvaoMi"/>                        
                        <FormControl id="rezMi" onChange={this.rezUpdate} value={
                            this.state.mi === 0 ? "" : this.state.mi
                        } placeholder={this.props.teams[0]}/>
                        <InputGroup.Radio name="zvao" id="zvaoVi"/>
                        <FormControl id="rezVi" onChange={this.rezUpdate} value={
                            this.state.vi === 0 ? "" : this.state.vi
                        } placeholder={this.props.teams[1]}/>                    
                    </InputGroup>
                    <p>{this.state.msg}</p>
                </Modal.Body>


                <Modal.Footer>
                <Button variant="secondary" onClick={this.props.action}>
                    Zatvori
                </Button>
                <Button variant="primary" onClick={() => { this.props.submit(this.state) }}>
                    Spremi Unos
                </Button>
                </Modal.Footer>

                
            </Modal>  
        )
    }
}