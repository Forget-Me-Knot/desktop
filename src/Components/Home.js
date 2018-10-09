import React, { Component } from "react";
import firebase from "../firebase";
import ReactRevealText from 'react-reveal-text'
import { Avatar, Button } from "@material-ui/core";
import bounce from "./bounce";

class Home extends Component {
  constructor() {
    super();
    this.state = {
			show: false
		};
		this._mounted = false;
    this.state = { game: false };
    this._mounted = false;
    this.gameClick = this.gameClick.bind(this);
  }

  componentDidMount() {
		let message;
    const date = new Date();
    const hour = date.getHours();
    if (hour >= 6 && hour < 12) {
      message = 'Good morning';
    } else if (hour >= 12 && hour <= 14) {
      message = 'Lunch time!';
    } else if (hour > 14 && hour <= 17) {
      message = 'Good afternoon';
    } else if (hour >= 18) {
      message = 'Good night';
    }
    this.setState({ message });
		setTimeout(() => {
      this.setState({ show: true });
    }, 1000);
    this._mounted = true;
    const self = this;
    const ref = firebase.database().ref("users");
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        ref.on("value", function(snapshot) {
          const users = snapshot.val();
          for (var key in users) {
            if (user && key === user.uid) {
              self.setState({ userName: users[key].displayName });
            }
          }
        });
      } else {
        self.setState({});
      }
    });
  }

  gameClick() {
    this.setState({ game: !this.state.game });
  }
  componentWillMount() {
    this._mounted = false;
	}

  render() {
		const name = this.state.userName  || '';
		const message = this.state.message + '';
    return (
      <div style={{position: 'relative'}}>
				<div style={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-55%, 120%)',
					textAlign: 'center'
				}}>
					<ReactRevealText style={{fontSize: '4em'}} show={this.state.show}>{message}</ReactRevealText>
					<ReactRevealText style={{fontSize: '3em'}} show={this.state.show}>{name}</ReactRevealText>
				</div>
        <bounce />
      </div>
    );
  }
}

export default Home;
