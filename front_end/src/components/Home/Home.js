import React, { Component } from 'react';
import Button from '../Button/Button';
import Rolldice from '../Rolldice';
import PlayButton from '../game/PlayButton';
import './Home.css';
import LadderContainer from '../game/LadderContainer';
import SnakeContainer from '../game/SnakeContainer';
import Game from '../game/Game';
import *  as Helper from '../../Helpers/Helper';
import axios from '../../Axios';

class Home extends Component {

  state = {
    move: 0,
    value: 1,
    tiles: [],
    roll: 0,
    style: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
    },
    isClicked: false,
    snake: true,
    ladder: true,
    test: true,
    users: [],
  }

  componentWillMount() {
    const arr = [];
    var rowCount = 0;
    var subtract = true;
    for (var tileNumber = 100; tileNumber !== 0;) {
      const tile_styles = ['yellow', 'white', 'red', 'blue', 'green', 'white', 'red', 'yellow', 'green', 'blue'];
      let random = Math.floor((Math.random() * 10));
      rowCount++;
      if (rowCount <= 10) {
        //randomly gets the tile color
        let tileData = {
          style: { backgroundColor: tile_styles[random] },
          tileNumber: tileNumber
        }
        arr.push(tileData);
      } else {
        rowCount = 0;
        subtract = !subtract;
        tileNumber = (tileNumber - 10);
      }
      if (subtract)
        tileNumber--;
      else
        tileNumber++;
    }
    this.setState({
      tiles: arr,
      users: [{
        userId: 0,
        name: "Player1",
        start: false,
        winner: false,
        position: 0,
        styles: {}
      }]
    });
  }

  componentDidMount() {
    console.log("1) Props: Route...", this.props);
    var user = (this.props.location && this.props.location.query && this.props.location.query.userData[0]) ?
      this.props.location.query.userData[0] : null;
    console.log("\n2) Props: User...", user);
    if (user) {
      if (user && user.log) {
        console.log("\n) User - Log...", user.log);
        user.log.currentUserId = user.userId;
        user.log.index = 0;
        localStorage.setItem('userLog', JSON.stringify(user.log));
        this.setState(user.log)
      } else {
        console.log("\n) User - No Log...");
        let newState = {
          currentUserId: user.userId,
          index: 0,
          users: [{
            userId: user.userId,
            name: "Player1",
            start: false,
            winner: false,
            position: 0,
            styles: {}
          }]
        };
        console.log('-----component did mount : ', newState)
        this.setState(newState);
        localStorage.setItem('userLog', JSON.stringify(newState));
      }
    } else {
      console.log("\n3) No props user present...");
      let userLog = localStorage.getItem('userLog');
      console.log('\n4)user Log from local storage : ', userLog)
      if (userLog) {
        userLog = JSON.parse(userLog);
        this.setState(userLog);
      } else {
        console.log('\n5)user Log not in local storage : ')
        let newState = {
          index:0,
          // currentUserId: user.userId,
          users: [{
            // userId: user.userId,
            name: "Player1",
            start: false,
            winner: false,
            position: 0,
            styles: {}
          }]
        };
        console.log('-----component did mount : ', newState)
        this.setState(newState);
      }
    }
  }

  displayLadders = () => {
    if (this.state.tiles && this.state.tiles.length > 0 && document.getElementById('tile_100')) {
      return <LadderContainer ladders={Helper.ladders} />
    }
    return null;
  }

  displaySnakes = () => {
    if (this.state.tiles && this.state.tiles.length > 0 && document.getElementById('tile_100')) {
      return <SnakeContainer snakes={Helper.snakes} />
    }
    return null;
  }

  rollDice1 = () => {
    // console.log('Dice Rolled')
    const max = 6;
    const roll = Math.ceil(Math.random() * max);//randomly generate a number
    // console.log('Roll Value: ', roll)
    // console.log('this.state.position', this.state.users[this.state.currentUserId - 1].position)
    // window.scrollBy(0, -50);
    this.setState({
      roll: roll
    })
    // console.log("this.state.roll", this.state.roll)
    if (!this.state.users[this.state.index].start) {
      let position = 0;
      if (roll === 1) position = 1;
      if (position !== 0) {
        this.check_for_ladder_and_snake(roll, position);
      }
    } else {
      let position = this.state.users[this.state.index].position + roll;
      if (position !== 0 && position <= 100) {
        this.check_for_ladder_and_snake(roll, position);

        this.setState({
          move: roll,
          isClicked: true
        })
      }
      else if (this.state.users[this.state.index].position === 100) {
        let users = this.state.users;
        users[this.state.index] = {
          userId: this.state.users[this.state.index].userId,
          position: position,
          start: true,
          winner: true
        };
        this.setState({
          move: roll,
          isClicked: true,
          users: users
        })
      }
      else if (this.state.users[this.state.index].position > 100) {
        let users = this.state.users;
        users[this.state.index] = {
          style: document.getElementById("tile_100").getBoundingClientRect()
        }
        this.setState({
          move: roll,
          users: users
        })
      }
    }
    if (roll !== 6)
      console.log("USERS::::", this.state)
    axios.post('http://localhost:8000/api/log', {//post the login userId and corresponding states.
      userId: this.state.users[0].userId,
      state: this.state
    })
      .then((response) => {
        console.log('After log update  : ', this.state)
        localStorage.setItem('userLog', JSON.stringify(this.state));
        this.switchPlayer();//switch the player to find whose turns is next.

      })
    if (this.state.users[this.state.index].position <= 50)
      window.scrollBy(0, 300);
    else
      window.scrollBy(0, -50);
  }
  // check_for_equalPosition() {
  //   console.log('Check for equal  position ')
  //   let length = this.state.users.length;
  //   this.state.users.map(user => {
  //     return console.log(user.userId, user.position);
  //   })
  //   let i;
  //   let currentUserIdIn = (this.state.currentUserId < this.state.users.length) && (!this.state.users[this.state.currentUserId - 1].winner) ?
  //     (this.state.currentUserId + 1) : 1;
  //   if (this.state.users[currentUserIdIn].position === this.state.users[this.state.currentUserId - 1].position) {
  //     let users = this.state.users;
  //     users[currentUserIdIn] = {
  //       userId: this.state.currentUserId,
  //       position: 1,
  //       start: true,
  //       winner: false,
  //     };
  //     this.setState({
  //       users: users
  //     })
  //   }
    
  // }
  switchPlayer() {
    console.log('switch user : users length : ', this.state.users.length)
    console.log('switch user : current User : ', this.state.currentUserId)
    console.log(this.state.currentUserId < this.state.users.length)
    let currentUserIndex = (this.state.index < this.state.users.length) && ((this.state.index+1) !== this.state.users.length) && (!this.state.users[this.state.index].winner) ?
      (this.state.index + 1) : 0;
    console.log('Current user : currentUserIndex: ', currentUserIndex)
    this.setState({
      currentUserId: this.state.users[currentUserIndex].userId,
      index: currentUserIndex
    });
  }
  check_for_ladder_and_snake(roll, position) {
    console.log('Rolled position : ', position)
    let ladderPosition = Helper.check_for_ladder(position);
    if (ladderPosition) {
      position = ladderPosition;
    }
    let snakePosition = Helper.check_for_snake(position);
    if (snakePosition) {
      position = snakePosition;
    }
    // console.log('ladder position : ', ladderPosition)
    // console.log('snake position : ', snakePosition)
    let playerStyle = Helper.getPlayerStyle(position, this.state);
    let users = this.state.users;
    let new_player_color = (!users[this.state.index].start) ? Helper.get_player_color() : { backgroundColor: users[this.state.index].style.backgroundColor };
    playerStyle = { ...playerStyle, ...new_player_color };
    // console.log('--------New position:', position)
    if (position === 100) {
      users[this.state.index] = {
        userId: this.state.users[this.state.index].userId,
        position: position,
        start: true,
        winner: true,
        style: playerStyle
      };
    }
    else {
      users[this.state.index] = {
        userId: this.state.users[this.state.index].userId,
        position: position,
        start: true,
        style: playerStyle
      };
    }
    this.setState({
      move: roll,
      isClicked: true,
      users: users
    })
  }
  addUser = () => {//To add users.
    // console.log("AddUser ")
    let userCount = this.state.users.length;
    let users = this.state.users;

    users.push({
      userId: this.state.users[userCount - 1].userId + 1,
      name: "Player" + (userCount + 1),
      start: false,
      winner: false,
      position: 0,
      styles: {}
    });
    this.setState({
      users: users
    })
    console.log("this.state.users", this.state.users)
  }
  newGame = () => {
    let user = this.state.users[0];
    let newState = {
      index:0,
      currentUserId: user.userId,
      users: [{
        userId: user.userId,
        name: "Player1",
        start: false,
        winner: false,
        position: 0,
        styles: {}
      }]
    };
    this.setState(newState);
    console.log("this.state", this.state)
  }
  render() {
    console.log("Rendering.................... :", this.state.users)
    return (
      <div>
        <div className="squareContainer">
          <Game tiles={this.state.tiles} />
          {
            this.displayLadders()
          }
          {
            this.displaySnakes()
          }
          {
            this.state.users.map(user => {
              return user.start ? <PlayButton style={user.style} className="roundButton" data={user} /> : null
            })
          }
        </div>
        <div>
          {
            (this.state.users.length > 0 && this.state.users[this.state.index]) ?
            
              <Rolldice
              status={this.state.users[this.state.index].winner}
              isStart={this.state.users[this.state.index].start}
                className="rollDicebtn" move={this.state.move}
                value={this.state.value}
                roll={this.state.roll}
                onClick={this.rollDice1}
                users={this.state.users}
                currentUser={this.state.currentUserId}
              />
               : null
          }
          <Button
            type="button"
            className="addUser"
            value="Add User"
            onClick={this.addUser}
            move={this.state.move}
          />
          <Button
            type="button"
            className="addUser"
            value="New Game"
            onClick={this.newGame}
          />
        </div>
      </div>
    )
  }
}
export default Home;














