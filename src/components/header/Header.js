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
                <Col sm={3}><img width={128} height={128} src={logo} alt="logo"/></Col>
                <Col sm={2}><h1 className="title1">Bela<br />Blok</h1></Col>
            </Row>
        </Container>
    )
}