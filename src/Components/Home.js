import React, { Component } from "react";
import firebase from "../firebase";

class Home extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    const self = this;
    const ref = firebase.database().ref("users");
    firebase.auth().onAuthStateChanged(function(user) {
      ref.on("value", function(snapshot) {
        const users = snapshot.val();
        for (var key in users) {
          if (key === user.uid) {
            self.setState({ userName: users[key].displayName });
          }
        }
      });
    });
  }

  render() {
    const name = this.state.userName;
    return (
      <div>
        <h1>HOME</h1>
        <p>{name ? name : null}</p>
      </div>
    );
  }
}

export default Home;
