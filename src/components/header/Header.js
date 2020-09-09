import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './Header.css';

import logo from '../../assets/logo.png';

export default function Header(){
    return (
        <Container fluid>
            <Row className="Background">
                <Col sm={1}><img width={64} height={64} src={logo} alt="logo"/></Col>
                <Col sm={3}><h1 className="title1">Bela Blok</h1></Col>
            </Row>
        </Container>
    )
}