import React from 'react';

import InputGroup from 'react-bootstrap/InputGroup';
import { FormControl } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default class NewInput extends React.Component {
    constructor(props){
        super (props);
        this.state = {
            us: 0,
            thy: 0,
            zvanja: {
                us: 0,
                thy: 0
            },
            igra: 162,
            zvaoMi: true,
            msg: ""
        }
    }

    
    msgHandler = () => {
        let msg;
        const us = this.state.us
        const thy = this.state.thy
        const igra = this.state.igra
        switch(document.getElementById("zvaoMi").checked){
            case true:
                msg = us < igra / 2 ? "Tim Mi je pao" : "Tim Mi je prošao"
                this.setState({ msg: msg, zvaoMi: true })
                break;
            case false:
                msg = thy < igra / 2 ? "Tim Vi je pao" : "Tim Vi je prošao"
                this.setState({ msg: msg, zvaoMi: false })
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
                        us: x, 
                        thy: this.state.igra - x
                    }
                , () => {this.msgHandler()})
                break;
            case "rezVi":
                this.setState({ thy: x, us: this.state.igra - x },
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
                        us: y,
                        thy: this.state.zvanja.thy 
                    },
                    igra: 162 + y + this.state.zvanja.thy 
                })
                break;
            case "zvanjaVi":
                this.setState({
                    zvanja: {
                        thy: y,
                        us: this.state.zvanja.us 
                    },
                    igra: 162 + y + this.state.zvanja.us 
                })
                break;
            default:
                console.log("Error");
        }
    }

    shouldComponentUpdate(nextState){
        if (
            nextState.us !== this.state.us ||
            nextState.thy !== this.state.thy ||
            nextState.zvanja.us !== this.state.zvanja.us ||
            nextState.zvanja.thy !== this.state.zvanja.us ||
            nextState.zvaoMi !== document.getElementById("zvaoMi").checked
        ) {
            return true
        } else {
            return false
        }
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

                    <InputGroup onChange={this.msgHandler}>
                        <FormControl type="number" onChange={this.zvanjaUpdate} id="zvanjaMi" value={
                            this.state.zvanja.us === 0 ? "" : this.state.zvanja.us
                        } placeholder="Mi Zvanja"/>
                        <FormControl type="number" onChange={this.zvanjaUpdate} id="zvanjaVi" value={
                            this.state.zvanja.thy === 0 ? "" : this.state.zvanja.thy
                        } placeholder="Vi Zvanja" />
                    </InputGroup>


                        <hr />
                        <h3>Igra: {this.state.igra}</h3>
                        <hr />
                        <h6>Označite grupu koja je zvala aduta</h6>


                    <InputGroup>
                        <InputGroup.Radio name="zvao" id="zvaoMi" onChange={this.msgHandler}/>                        
                        <FormControl id="rezMi" onChange={this.rezUpdate} value={
                            this.state.us === 0 ? "" : this.state.us
                        } placeholder={this.props.teams[0]}/>
                        <InputGroup.Radio name="zvao" id="zvaoVi" onChange={this.msgHandler}/>
                        <FormControl id="rezVi" onChange={this.rezUpdate} value={
                            this.state.thy === 0 ? "" : this.state.thy
                        } placeholder={this.props.teams[1]}/>                    
                    </InputGroup>
                    <p>{this.state.msg}</p>
                </Modal.Body>


                <Modal.Footer>
                <Button variant="secondary" onClick={this.props.action}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => { this.props.submit(this.state) }}>
                    Save Entry
                </Button>
                </Modal.Footer>

                
            </Modal>  
        )
    }
}