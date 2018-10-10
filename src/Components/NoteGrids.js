import React from "react";
import firebase from "../firebase";
import Typography from "@material-ui/core/Typography";
import { Avatar, Chip } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import MiniNote from "./MiniNote";
import DoneIcon from "@material-ui/icons/Done";

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
    this.createTextLinks_ = this.createTextLinks_.bind(this);
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

  createTextLinks_(text) {
    //const regex = /(http|https|ftp|ftps)\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*)?/;
    return (text || "").replace(
      /([^\S]|^)(((https?\:\/\/)|(www\.))(\S+))/gi,
      function(match, space, url) {
        var hyperlink = url;
        if (!hyperlink.match("^https?://")) {
          hyperlink = "http://" + hyperlink;
          let textArray = text.split("hyperlink");
          console.log("Hyper Link: ", hyperlink);
        }
        return <a href={`${hyperlink}`}>{url}</a>;
      }
    );
  }

  render() {
    const notes = this.state.notes;
    const users = this.props.users;
    let project = this.props.projects ? this.props.projects[0] : null;
    let color = project ? "#" + project.color : null;
    return (
      <div>
        {color ? (
          <div style={{ marginBottom: 20 }}>
            <Chip
              avatar={
                <Avatar
                  style={{
                    backgroundColor: color
                  }}
                >
                  <DoneIcon />
                </Avatar>
              }
              label={this.props.projects[0].name}
            />
          </div>
        ) : null}
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

            {/*
            TODO: 1. Use Regex to find every URL... in fact, split the
            note.content across them... you need to get the text as array of
            [PURE TEXT, LINK, PURE TEXT, PURE TEXT...]

            Come visit http://stuff.com and also follow us on https://instagram.com!

            then, for the PURE TEXT use Typography as below, and for each link
            use Link tags...
            <Typography>{ some text }</Typography><Link>ACUTUAL HREF</Link>...

            SPLIT_CONTENT.map(content => {
              ?? some if statement that checks if content is text or URL
            })
            */}
            <Typography style={{ marginTop: ".7em" }}>
              {this.createTextLinks_(note.content)}
            </Typography>

            <Avatar
              style={{
                width: 15,
                height: 15,
                position: "absolute",
                right: 20,
                color: "grey",
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
