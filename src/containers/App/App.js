import React from 'react';
import './App.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Blok from '../../components/blok/Blok';
import Header from '../../components/header/Header';

export default class App extends React.Component {
  state = {
    mi: [100, 43, 54, 323],
    vi: [100, 43, 54, 323]
  }

  render() {

    return (
      <Container>
        <Row>
          <Header />
        </Row>
        <Row >
          <Col sm/>
          <Col sm className="BlokParent">
            <Blok team="mi" rezultati={this.state.mi}/>
            <Blok team="vi" rezultati={this.state.vi}/>
          </Col>
          <Col sm/>
        </Row>
      </Container>
    )
  }
} 
