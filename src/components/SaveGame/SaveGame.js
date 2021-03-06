import React from 'react';

import InputGroup from 'react-bootstrap/InputGroup';
import { FormControl } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default function SaveGame(props){
    
    const gameCopy = Object.assign(props.game)

    const arr1 = gameCopy.us
    const arr2 = gameCopy.thy

    let sUs = 0;
    let sThy = 0;

    for(let i = 0; i < arr1.length; i++){
        sUs += arr1[i]
        sThy += arr2[i]
    }

    gameCopy.us = sUs
    gameCopy.thy = sThy
    
    const code = Math.random().toString(36).substr(2, 6)

    return (
        <Modal show={props.show} onHide={props.action}>
                <Modal.Header closeButton>
                <Modal.Title>{props.game.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <h6>Mi: {sUs}</h6>
                    <h6>Vi: {sThy}</h6>
                    <br />
                    <h6>Ključ: (za učitavanje partije kasnije)</h6>
                    <InputGroup>
                        <FormControl disabled id="code" type="text" value={code}/>
                    </InputGroup>

                    <InputGroup>
                        <FormControl id="note" type="text" placeholder="Bilješke (igrači, proteklo vrijeme i sl.) - nije obavezno"/>
                    </InputGroup>

                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={props.action}>
                    Zatvori
                </Button>
                <Button variant="primary" onClick={() => {props.submit(
                    code,
                    document.getElementById("note").value,
                    props.game
                )}}>
                    Spremi Partiju
                </Button>
                </Modal.Footer>

                
            </Modal>
    )
}