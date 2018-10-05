import React, { Component } from "react";
import firebase from "../firebase";
import NoteGrids from "./NoteGrids";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

// Only loads current logged in user's notes
export default class AllNotes extends Component {
  constructor() {
    super();
    this.state = {
      myNotes: [],
      curNote: "",
      open: false
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleOpen() {
    this.props.history.push("/writenote");
  }

  handleClose() {
    this.setState({
      open: false
    });
  }

  handleChange(event) {
    if (!firebase.auth().currentUser) {
      console.log("NOT LOGGED IN");
    } else {
      console.log(firebase.auth().currentUser.displayName);
    }
    this.setState({
      curNote: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const user = firebase.auth().currentUser;
    const noteid = new Date().getTime();
    firebase
      .database()
      .ref("notes/" + noteid)
      .set({
        author: user.uid,
        content: this.state.curNote
      });
    this.setState({
      open: false
    });
  }

  render() {
    const notes = this.state.myNotes;
    return (
      <div>
            {notes ? (
              <NoteGrids />
            ) : null}
      </div>
    );
  }
}
