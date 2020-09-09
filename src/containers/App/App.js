import React from 'react';
import './App.css';


import Button from 'react-bootstrap/Button'

import Blok from '../../components/blok/Blok';
import Header from '../../components/header/Header';
import NewInput from '../NewInput/NewInput';

export default class App extends React.Component {
  state = {
    mi: [100, 43, 54, 323],
    vi: [100, 43, 54, 323],
    teams: ["mi", "vi"],
    inputShow: false,
  }

  newInpButton = () => {
    this.setState({ inputShow: !this.state.inputShow })
  }

  render() {

    return (
        <div className="Parent">
          <Header />
          <br />
          <Button size="lg">
            Nova Partija
          </Button>
      	  <br /><br />
          <Button onClick={this.newInpButton} size="lg">
            Novi Unos
          </Button>
          <br /><br />
          <Button  size="lg">
            Spremi partiju
          </Button>
          <br /><br />
          {
            this.state.inputShow
            ?
            <NewInput teams={this.state.teams} show={this.state.inputShow} action={this.newInpButton}/>          
            :
            null
          }

          <Blok team="mi" rezultati={this.state.mi}/>
          <Blok team="vi" rezultati={this.state.vi}/>

        </div>
    )
  }
} 
