import React, { Component } from "react";
import firebase from "../firebase";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Card from "@material-ui/core/Card";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FilledInput from "@material-ui/core/FilledInput";
import MenuItem from "@material-ui/core/MenuItem";

import Select from "@material-ui/core/Select";
import { TextField } from "@material-ui/core";

export default class NoteForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      selectedProject: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const self = this;
    const user = firebase.auth().currentUser;
    if (user) {
      let userProjects = [];
      var ref = firebase.database().ref("projects");
      ref.on("value", function(snapshot) {
        let projects = snapshot.val();
        for (let key in projects) {
          if (projects[key].members) {
            const members = projects[key].members;
            const name = projects[key].name;
            userProjects.push(name);
          }
        }
      });
      self.setState({ projects: userProjects });
    }
  }

  handleChange(event) {
    if (!firebase.auth().currentUser) {
      console.log("NOT LOGGED IN");
    } else {
      console.log(firebase.auth().currentUser.displayName);
    }
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  //   author:
  // "EVj0tqHZEsVjsf4qh7FrWWJJKTg2"
  // content:
  // "Clean house"
  // projectId:
  // "534"
  handleSubmit(event) {
    event.preventDefault();
    const user = firebase.auth().currentUser;
    const noteid = Math.floor(Math.random() * 100000);
    firebase
      .database()
      .ref("notes/" + noteid)
      .set({
        author: user.uid,
        content: this.state.note
      });
    this.props.history.push("/notes");
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
          <Card
            style={{
              width: 500,
              height: 500
            }}
          >
            <form onChange={this.handleChange} onSubmit={this.handleSubmit}>
              <FormGroup style={{ margin: "1.5em", float: "button" }}>
                <FormControl>
                  <InputLabel>New Note:</InputLabel>
                  <TextField
                    name="note"
                    type="text"
                    style={{ marginTop: "2.5em" }}
                    required
                  />
                </FormControl>
              </FormGroup>
              {/* <br /> */}
              <FormGroup
                style={{
                  margin: "17em 3em 0"
                  // display: "flex",
                  // flexDirection: "column",
                  // justifyContent: "center",
                  // alignContent: "flex-end"
                }}
              >
                <InputLabel htmlFor="age-simple">Project</InputLabel>
                <Select
                  // value={this.state.age}
                  // onChange={this.handleChange}
                  inputProps={{
                    name: "project",
                    id: "age-simple"
                  }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormGroup>
            </form>
          </Card>

          <Button
            onClick={this.handleSubmit}
            raised
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
