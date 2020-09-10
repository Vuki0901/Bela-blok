import React from 'react';
import './App.css';

import Blok from '../../components/blok/Blok';
import SaveGame from '../../components/SaveGame/SaveGame'

import Button from 'react-bootstrap/Button'
import Header from '../../components/header/Header';
import NewInput from '../NewInput/NewInput';

export default class App extends React.Component {
  state = {
    mi: [],
    vi: [900,],
    teams: ["Mi", "Vi"],
    inputShow: false,
    end: false,
  }

  newInpButton = () => {
    this.setState({ inputShow: !this.state.inputShow })
  }

  endStateHandler = () => {
    this.setState({ end: !this.state.end })
  }

  isGameFinished = () => {
    const arr1 = this.state.mi
    const arr2 = this.state.vi
    let s = 0;
    for (let i = 0; i < arr1.length; i++){
      s += arr1[i]
    }
    console.log("1. provjera: " + s);
    if (s > 1000) {
      return true
    } else {
      s = 0
      for (let i = 0; i < arr2.length; i++){
        s += arr2[i]
      }
      console.log("2. provjera: " + s);
      return s > 1000 ? true : false
    }
  }

  gameFinishedHandler = () => {
    if (this.isGameFinished()){
      this.setState({
        mi: [],
        vi: [],
        end: true,
      })
    }
  }

  getNewGame = (newGame) => {
    if(newGame.zvaoMi && newGame.mi < newGame.igra / 2){
      newGame.mi = 0;
      newGame.vi = newGame.igra
    } else if (!newGame.zvaoMi && newGame.vi < newGame.igra / 2){
      newGame.vi = 0;
      newGame.mi = newGame.igra;
    }

    /////////////////////////////
    const miCopy = [...this.state.mi]
    const viCopy = [...this.state.vi]
    miCopy.push(newGame.mi)
    viCopy.push(newGame.vi)
    console.log(miCopy, viCopy);
    this.setState({
      mi: miCopy,
      vi: viCopy,
      inputShow: !this.state.inputShow 
    }, () => {this.gameFinishedHandler()})}

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
            <NewInput teams={this.state.teams} show={this.state.inputShow} action={this.newInpButton} submit={this.getNewGame}/>          
            :
            null
          }
          {
            this.state.end
            ?
            <SaveGame action={this.endStateHandler} show={this.state.end} />
            :
            null
          }

          <Blok team="Mi" rezultati={this.state.mi}/>
          <Blok team="Vi" rezultati={this.state.vi}/>

        </div>
    )
  }
} 
