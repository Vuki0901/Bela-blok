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
                <Col sm={1}><h1 className="title1">Bela<br />Blok</h1></Col>
                <Col sm={1}><img width={128} height={128} src={logo} alt="logo"/></Col>
                <Col sm={1}/>
                <Col>
                    <p className="Instructions">
                        <b>Upute za korištenje aplikacije:</b><br />
Već Vam je učitana prazna tablica u koju možete početi unositi rezultate klikom na gumb <i>Novi Unos</i><br />
Ukoliko želite resetirati tablicu i izbrisati sve zapise bez spremanja, pritisnite <i>Resetiraj</i><br />
Ako imate ključ od prethodno spremljene partije, pritisnite <i>Učitaj Igru</i> kako biste partiju unijeli u tablicu i nastavili unositi rezultate<br />
Da biste rezultat partije spremili i nastavili kasnije unositi rezultate, pritisnite <i>Spremi Partiju</i> gdje ćete dobiti ključ/šifru od partije
                    </p>
                </Col>
            </Row>
        </Container>
    )
}