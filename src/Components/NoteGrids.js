import React from "react";
import firebase from "../firebase";
import Divider from "@material-ui/core/Divider";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import RemoveCircle from "@material-ui/icons/RemoveCircle";
import { Avatar, Button } from "@material-ui/core";

class NoteGrids extends React.Component {
  constructor() {
    super();
    this.state = {
      notes: [],
      open: false
    };
    this.deleteNote = this.deleteNote.bind(this);
  }
  componentDidMount() {
    var self = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        const ref = firebase.database().ref();
        ref.on("value", function(snapshot) {
          let myNotes = [];
          const notes = snapshot.val().notes;
          const projects = snapshot.val().projects;

          for (var key in notes) {
            if (notes[key].author === user.uid) {
              const projectId = notes[key].projectId;
              for (var id in projects) {
                if (id === projectId) {
                  const color = projects[id].color;
                  myNotes.push({ ...notes[key], key, color });
                }
              }
            }
          }
          self.setState({ notes: myNotes });
        });
      } else {
        console.log("not logged in");
      }
    });
  }
  deleteNote(key) {
    return firebase
      .database()
      .ref("notes")
      .child(key)
      .remove();
  }

  // componentDidMount() {
  //   var self = this;
  //   firebase.auth().onAuthStateChanged(function(user) {
  //     if (user) {
  //       const ref = firebase.database().ref();
  //       ref.on("value", function(snapshot) {
  //         let myNotes = [];
  //         const notes = snapshot.val().notes;
  //         const projects = snapshot.val().projects;
  //         const users = snapshot.val().users;
  //         // const member = projects.members.includes(user.uid);
  //         // for (var id in projects) {
  //         for (var key in notes) {
  //           const NoteProj = projects[notes[key].projectId];
  //           const color = NoteProj.color;
  //           console.log("color", color);
  //           console.log("note project id", NoteProj);
  //           const authorId = notes[key].author;
  //           console.log("authorId", authorId);
  //           const authorName = users[authorId].displayName;
  //           console.log("author name", authorName);
  //           const member = NoteProj.members.includes(user.email);
  //           // const authorId = notes[key].author;
  //           if (member) {
  //             myNotes.push({ ...notes[key], authorName, color });
  //             console.log("author name", authorName);
  //           }
  //         }

  //       });
  //     } else {
  //       console.log("not logged in");
  //     }
  //   });
  // }
  // deleteNote(key) {
  //   return firebase
  //     .database()
  //     .ref("notes")
  //     .child(key)
  //     .remove();
  // }
  render() {
    const notes = this.state.notes;
    console.log("this state notes", this.state.notes);
    return (
      <div style={{ position: "relative" }}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, 20%)"
          }}
        >
          {/* <Typography variant="headline" centered>
            My Notes
          </Typography> */}
          {notes.map(note => (
            <Card
              elevation={4}
              square={false}
              key={note.key}
              style={{ marginTop: 10, marginBottom: 10 }}
            >
              <CardContent style={{ backgroundColor: "rose" }}>
                <Typography variant="headline" centered>
                  "{note.content}"
                </Typography>
                {/* <Typography variant="subheading" centered>
                  -{note.author}
                </Typography> */}
              </CardContent>
              <Avatar
                rounded
                style={{
                  backgroundColor: `#${note.color}`,
                  // backgroundColor: "lightgreen",
                  width: "15px",
                  height: "15px",
                  marginRight: "auto",
                  marginLeft: "auto"
                }}
              />
              <IconButton
                aria-label="Delete"
                color="grey"
                disabled
                style={{ float: "right" }}
                onClick={() => this.deleteNote(note.key)}
              >
                <RemoveCircle />
              </IconButton>
            </Card>
          ))}
        </div>
      </div>
    );
  }
}

NoteGrids.propTypes = {
  classes: PropTypes.object.isRequired
};

export default NoteGrids;
