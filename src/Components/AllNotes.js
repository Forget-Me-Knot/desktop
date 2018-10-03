import React, { Component } from "react";
import firebase from "../firebase";
import NoteGrids from "./NoteGrids";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";

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
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    // let myNotes;
    // var ref = firebase.database().ref("notes/");
    // var self = this;
    // ref.on("value", function(snapshot) {
    //   myNotes = [];
    //   let notes = snapshot.val();
    //   for (var key in notes) {
    //     const user = firebase.auth().currentUser;
    //     if (notes[key].author === user.uid) {
    //       myNotes.push(notes[key]);
    //     }
    //   }
    //   self.setState({ myNotes });
    // });
  }

  handleOpen() {
    this.setState({
      open: true
    });
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

  handleDelete(id) {
    console.log("IN DELETE");
    firebase
      .database()
      .ref("notes/" + id)
      .remove();
  }

  render() {
    const notes = this.state.myNotes;
    return (
      <div>
        <Button
          variant="fab"
          mini
          color="primary"
          aria-label="Add"
          onClick={this.handleOpen}
        >
          <AddIcon />
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add a new note</DialogTitle>
          <DialogContent>
            <form onChange={this.handleChange}>
              <TextField
                autoFocus
                margin="dense"
                name="note"
                type="text"
                fullWidth
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Post
            </Button>
          </DialogActions>
        </Dialog>

        {notes ? (
          <NoteGrids notes={notes} handleDelete={this.handleDelete} />
        ) : null}
      </div>
    );
  }
}
