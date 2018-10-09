import React, { Component } from "react";
import firebase from "../firebase";
import { Avatar, Button } from "@material-ui/core";
import bounce from "./bounce";

class Home extends Component {
  constructor() {
    super();
    this.state = { game: false };
    this._mounted = false;
    this.gameClick = this.gameClick.bind(this);
  }

  componentDidMount() {
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
    const name = this.state.userName;
    return (
      <div>
        <h1>HOME</h1>
        <p>{name ? name : null}</p>
        {/* <Button
          aria-label="Add"
          style={{
            backgroundColor: "mediumpurple",
            margin: 10
          }}
          onClick={() => this.gameClick()}
        >
          try a game add new project
        </Button>
        {this.state.game ?  */}
        <bounce />
      </div>
    );
  }
}

export default Home;
