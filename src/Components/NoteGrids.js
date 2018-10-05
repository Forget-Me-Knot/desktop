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

//CANT GET NOTES TO WRAP
// const styles = theme => ({
//   root: {
//     ...theme.mixins.gutters(),
//     paddingTop: theme.spacing.unit * 2,
//     paddingBottom: theme.spacing.unit * 2,
//     margin: 20,
//     width: 400,
//     heigth: 400
//   },
//   button: {
//     margin: theme.spacing.unit
//   },
//   box: {
//     display: "flex"
//   }
// });

class NoteGrids extends React.Component {
  constructor() {
    super();
    this.state = {
      myNotes: [],
      curNote: "",
      open: false
    };
    this.deleteNote = this.deleteNote.bind(this);
  }

  componentDidMount() {
    let myNotes;
    var ref = firebase.database().ref("notes/");
    var self = this;
    ref.on("value", function(snapshot) {
      myNotes = [];
      let notes = snapshot.val();
      for (var key in notes) {
        const user = firebase.auth().currentUser;
        if (notes[key].author === user.uid) {
          myNotes.push(notes[key]);
        }
      }
      self.setState({ myNotes });
    });
  }
  deleteNote(key) {
    return firebase
      .database()
      .ref("notes")
      .child(key)
      .remove();
  }
  render() {
    const notes = this.state.myNotes;
    console.log("Database: ", firebase.database().ref("users/"));
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
                <Typography variant="subheading" centered>
                  -{note.author}
                </Typography>

                {/* <Typography variant="body2" centered>
                  Project:
                  {note.project}
                </Typography> */}
              </CardContent>
              <Avatar
                rounded
                style={{
                  // backgroundColor: `#${project.color}`,
                  backgroundColor: "lightgreen",
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
