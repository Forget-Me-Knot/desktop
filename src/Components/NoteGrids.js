import React from "react";
import firebase from "../firebase";
import Typography from "@material-ui/core/Typography";
import { Avatar, Chip } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import MiniNote from "./MiniNote";
import DoneIcon from '@material-ui/icons/Done';

class NoteGrids extends React.Component {
  constructor() {
    super();
    this.state = {
      notes: [],
      open: false,
      author: [],
      formOpen: false
    };
    this.deleteNote = this.deleteNote.bind(this);
    this.openForm = this.openForm.bind(this);
  }

  componentDidMount() {
    const self = this;
    if (this.props.notes) {
      let notes = this.props.notes;
      const ref = firebase.database().ref("users");
      ref.on("value", function(snapshot) {
        const users = snapshot.val();
        for (var key in users) {
          notes.forEach(note => {
            if (note.author === key) {
              self.setState({ [key]: users[key].displayName });
            }
          });
        }
        self.setState({
          notes,
          projectId: self.props.projectKey
        });
      });
    }
  }

  componentDidUpdate(prevProps) {
    const self = this;
    const props = this.props;
    if (prevProps.notes !== props.notes) {
      let notes = this.props.notes;
      const ref = firebase.database().ref("users");
      ref.on("value", function(snapshot) {
        const users = snapshot.val();
        for (var key in users) {
          notes.forEach(note => {
            if (note.author === key) {
              self.setState({ [key]: users[key].displayName });
            }
          });
        }
        self.setState({
          notes,
          projectId: self.props.projectKey
        });
      });
    }
  }

  openForm() {
    if (!this.state.formOpen) {
      this.setState({ formOpen: true });
    } else {
      this.setState({ formOpen: false });
    }
  }

  deleteNote(key) {
    return firebase
      .database()
      .ref("notes")
      .child(key)
      .remove();
  }

  render() {
    const notes = this.state.notes;
    let project = this.props.projects ? this.props.projects[0] : null;
    let color = project ? "#" + project.color : null;
    return (
      <div>
				{ color ?
				<div style={{marginBottom: 20}}>
					<Chip
						avatar={
							<Avatar
							style={{
								backgroundColor: color,
							}}>
								<DoneIcon />
							</Avatar>}
						label={this.props.projects[0].name}
					/>
				</div>
        : null}
        {notes.map(note => (
          <Paper
            key={note.key}
            style={{ display: "flex", margin: 10, padding: 10 }}
          >
            <Avatar
              style={{
                width: 40,
                height: 40,
                padding: 10,
                marginRight: 10,
                backgroundColor: `#${note.color}`,
                fontSize: "0.8rem"
              }}
            >
              {this.state[note.author]}
            </Avatar>

            <Typography style={{ marginTop: ".7em" }}>
              {note.content}
            </Typography>

            <Avatar
              style={{
                width: 15,
                height: 15,
                position: "absolute",
                right: 55,
								color: "grey",
								marginTop: '.5em',
                backgroundColor: "white"
              }}
              onClick={() => this.deleteNote(note.key)}
            >
              x
            </Avatar>
          </Paper>
        ))}
        <div>
          <Button
            text="add a task"
            style={{
              marginTop: 35
						}}
						variant="outlined"
            onClick={() => this.openForm()}
          >
            <AddIcon />
            New Note
          </Button>
          {this.state.formOpen ? (
            <MiniNote projectId={this.props.projectKey} />
          ) : null}
        </div>
      </div>
    );
  }
}

export default NoteGrids;
