import React from 'react';

import InputGroup from 'react-bootstrap/InputGroup';
import { FormControl } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default function SaveGame(props){
    return (
        <Modal show={props.show} onHide={props.action}>
                <Modal.Header closeButton>
                <Modal.Title>Kraj Partije</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Data
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={props.action}>
                    Zatvori
                </Button>
                <Button variant="primary">
                    Spremi Igru
                </Button>
                </Modal.Footer>

                
            </Modal>
    )
}