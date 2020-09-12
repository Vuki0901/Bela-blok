import React from 'react';
import axios from 'axios';
import './App.css';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Blok from '../../components/blok/Blok';
import SaveGame from '../../components/SaveGame/SaveGame'
import Header from '../../components/header/Header';
import NewInput from '../NewInput/NewInput';
import GameLoader from '../GameLoader/GameLoader';

export default class App extends React.Component {
  state = {
    us: [],
    thy: [],
    teams: ["Mi", "Vi"],
    inputShow: false,
    end: false,
    loadGame: false,
    prevGame: {},
  }

  newInpButton = () => {
    this.setState({ inputShow: !this.state.inputShow })
  }

  endStateHandler = () => {
    this.setState({ end: !this.state.end })
  }

  loadGameHandler = () => {
    this.setState({ loadGame: !this.state.loadGame })
  }

  //has either team reached 1001 points
  isGameFinished = () => {
    const arr1 = this.state.us
    const arr2 = this.state.thy
    let s = 0;
    for (let i = 0; i < arr1.length; i++){
      s += arr1[i]
    }
    if (s > 1000) {
      return true
    } else {
      s = 0
      for (let i = 0; i < arr2.length; i++){
        s += arr2[i]
      }
      return s > 1000 ? true : false
    }
  }

  //Action to perform if either team reached 1001 points.
  //Reset the state and prepare data for posting the game to backend
  gameFinishedHandler = () => {
    if (this.isGameFinished()){
      this.setState({
        prevGame: {
          title: "Game Over",
          us: [...this.state.us],
          thy: [...this.state.thy],
        },
        us: [],
        thy: [],
        end: true,
      })
    }
  }

  //check if either team has failed and then update the table
  getNewGame = (newGame) => {
    if(newGame.zvaoMi &&
      newGame.us < newGame.igra / 2){
      newGame.us = 0;
      newGame.thy = newGame.igra
    } else if (!newGame.zvaoMi && parseInt(newGame.thy) < newGame.igra / 2){
      newGame.thy = 0;
      newGame.us = newGame.igra;
    }

    /////////////////////////////
    const usCopy = [...this.state.us]
    const thyCopy = [...this.state.thy]
    usCopy.push(newGame.us)
    thyCopy.push(newGame.thy)
    this.setState({
      us: usCopy,
      thy: thyCopy,
      inputShow: !this.state.inputShow 
    }, () => {this.gameFinishedHandler()})}
    
  //sending data to firebase
  postGame = (code, note, game) => {
    game.msg = note
    axios.post("/partije.json",{
        [code]: game
    }).then(
      response => { console.log(response) },
      this.setState({ end: !this.state.end })
    )
  }

  loadGame = (loadedGame) => {
    console.log(loadedGame);
  }

  newGameButtonHandler = () => {
    this.setState({
        us: [],
        thy: []
    })
  }

  saveGameButtonHandler = () => {
    this.setState({
      prevGame: {
        title: "Save Game",
        us: [...this.state.us],
        thy: [...this.state.thy],
      },
      us: [],
      thy: [],
      end: true,
    })
  }
  render() {

    return (
        <Container fluid>
          <Row>
            <Header />
            <br />
          </Row>
          <Row><div style={{height: "20px"}}></div></Row>
          <Row>
            <Col sm={3} />
            <Col sm={3}>
              <Button  onClick={this.newInpButton} size="lg">
                Novi Unos
              </Button>
              <br /><br />
              <Button size="lg" onClick={this.newGameButtonHandler}>
                Resetiraj
              </Button>
              <br /><br />
              <Button size="lg" onClick={this.loadGameHandler}>
                Učitaj Igru
              </Button>
              <br /><br />
              <Button  size="lg"  onClick={this.saveGameButtonHandler}>
                Spremi Partiju
              </Button>
              <br /><br />
              
            </Col>
            <Col>
              <Blok team="Mi" rezultati={this.state.us}/>
              <Blok team="Vi" rezultati={this.state.thy}/>            
            </Col>
          </Row>
          
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
            <SaveGame game={this.state.prevGame} action={this.endStateHandler} show={this.state.end} submit={this.postGame}/>
            :
            null
          }
          {
            this.state.loadGame
            ?
            <GameLoader show={this.state.loadGame} action={this.loadGameHandler} load={this.loadGame}/>
            :
            null
          }
      </Container>
    )
  }
} 
