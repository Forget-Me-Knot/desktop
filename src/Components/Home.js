import React, { Component } from "react";
import firebase from "../firebase";
// import { connect } from 'react-redux';
// import getUser from '../store';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      user: "",
      message: ""
    };
  }

  // componentDidMount() {
  //   let message;
  //   const date = new Date();
  //   const hour = date.getHours();
  //   if (hour >= 6 && hour < 12) {
  //     message = "Good morning.";
  //   } else if (hour >= 12 && hour <= 14) {
  //     message = "Lunch time!";
  //   } else if (hour > 14 && hour <= 17) {
  //     message = "Good afternoon.";
  //   } else if (hour >= 18) {
  //     message = "Good night.";
  //   }
  //   this.setState({ message });

  //   const self = this;
  //   const user = firebase.auth().currentUser;
  //   const ref = firebase.database().ref("users/");
  //   ref.on("value", function(snapshot) {
  //     const users = snapshot.val();
  //     console.log("User: ", users);
  //     for (var key in users) {
  //       if (key === user.uid) {
  //         self.setState({ user: users[key].displayName });
  //       }
  //     }
  //   });
  // }
  render() {
    return (
      <div>
        <h1>
          Welcome!
          {this.state.user}
        </h1>
        <h2>{this.state.message}</h2>
      </div>
    );
  }
}

export default Home;
