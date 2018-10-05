import React from "react";
import firebase from "../firebase";
import Typography from "@material-ui/core/Typography";
import { Avatar } from "@material-ui/core";
import Paper from '@material-ui/core/Paper';

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
    return firebase.database().ref("notes").child(key).remove();
  }

  render() {
    const notes = this.state.notes;
    return (
      <div>
          {notes.map(note => (
            <Paper key={note.key} style={{display: 'flex', margin: 10, padding: 10}}>
							<Avatar style={{ width: 15, height: 15, padding: 10, marginRight: 10, backgroundColor: `#${note.color}`}} />
							<Typography>{note.content}</Typography>
							<Avatar
								style={{ width: 15, height: 15, position: 'absolute', right: 20, color: 'grey', backgroundColor: 'white'}}
								onClick={() => this.deleteNote(note.key)}
							>
								x
							</Avatar>
						</Paper>
          ))}
        </div>
    );
  }
}


export default NoteGrids;
