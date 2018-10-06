import React, { Component } from "react";
import firebase from "../firebase";
import Button from "@material-ui/core/Button";
import FormGroup from "@material-ui/core/FormGroup";
import Card from "@material-ui/core/Card";
import { TextField } from "@material-ui/core";

export default class MiniNote extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
	}

  handleChange(event) {
    if (!firebase.auth().currentUser) {
      console.log("NOT LOGGED IN");
    } else {
      console.log(firebase.auth().currentUser.displayName);
    }
    console.log("Event: ", event.target.value);
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const self = this;
    const noteid = firebase
      .database()
      .ref("notes")
      .push().key;
    firebase.auth().onAuthStateChanged(function(user) {
      firebase
        .database()
        .ref("notes/").child(noteid)
        .set({
          author: user.uid,
          content: self.state.note,
          projectId: self.props.projectId
				});
				self.setState({note: ''})
    });
  }

  render() {
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
          <Card>
            <form onChange={this.handleChange} onSubmit={this.handleSubmit}>
              <FormGroup>
                <TextField
                  multiline
                  rows="4"
                  name="note"
                  variant="outlined"
                />
              </FormGroup>
            </form>
          </Card>

          <Button
            onClick={this.handleSubmit}
            type="submit"
            style={{
              backgroundColor: "pink",
              marginTop: "20px",
              display: "flex",
              marginBottom: "10%"
            }}
          >
            POST NOTE
          </Button>
        </div>
      </div>
    );
  }
}
