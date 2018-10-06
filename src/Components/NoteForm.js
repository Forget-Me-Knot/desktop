import React, { Component } from "react";
import firebase from "../firebase";
import { Link } from 'react-router-dom'
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
    this.handleMenuChange = this.handleMenuChange.bind(this);
  }

  componentDidMount() {
		const self = this;
		firebase.auth().onAuthStateChanged(function(user){
			let userProjects = [];
      var ref = firebase.database().ref("projects");
      ref.on("value", function(snapshot) {
				let projects = snapshot.val();
        for (let key in projects) {
          const members = projects[key].members;
          const name = projects[key].name;
          if(members.includes(user.email)) userProjects.push({ name, key });
				}
				self.setState({ projects: userProjects });
      });
		})
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

  handleMenuChange(event) {
    this.setState({
      selectedProject: event.target.value
    });
  }

  handleSubmit(event) {
		event.preventDefault();
		const self = this
		const noteid = firebase.database().ref('notes/').push().key
		firebase.auth().onAuthStateChanged(function(user){
			firebase
      .database()
      .ref("notes/" + noteid)
      .set({
        author: user.uid,
        content: self.state.note,
        projectId: self.state.selectedProject
      });
		})
  }

  render() {
		const projects = this.state.projects
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
              <FormGroup
                style={{
                  margin: "17em 3em 0"
                }}
              >
                <InputLabel>Project</InputLabel>
                <Select
                  value={this.state.selectedProject}
                  onChange={this.handleMenuChange}
                >
									{projects ?
									projects.map(project => (
										<MenuItem key={project.key} name="selectedProject" value={project.key}>
										{project.name}
									 </MenuItem>
									)) : null
                  }
                </Select>
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
					<Link to='/notes' replace>
            POST NOTE
						</Link>
          </Button>
        </div>
      </div>
    );
  }
}
