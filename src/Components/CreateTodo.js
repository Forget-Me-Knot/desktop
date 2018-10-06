import React, { Component } from "react";
import firebase from "../firebase";
import Card from "@material-ui/core/Card";
import FormGroup from "@material-ui/core/FormGroup";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

export default class CreateTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      members: [],
      projectId: "",
      assignMember: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const self = this;
    const projectKey = this.props.projects[0].key;
    const projMembers = this.props.projects[0].members;
    self.setState({ projectId: projectKey, members: projMembers });
  }

  handleSubmit() {
    const self = this;
    const assigned = this.state.assignMember;
    const projectId = parseInt(this.state.projectId);
    const content = this.state.todo;
    const newKey = firebase
      .database()
      .ref("tasks/")
      .push().key;
    const ref = firebase.database().ref("users");
    ref.on("value", function(snapshot) {
      const users = snapshot.val();
      let task;
      for (var key in users) {
        if (users[key].email === assigned) {
          task = {
            projectId,
            assigned: users[key].displayName,
            completed: false,
            content
          };
        }
      }
      firebase
        .database()
        .ref("tasks")
        .child(newKey)
        .set(task);
      self.setState({
        todo: "",
        assignMember: "",
        projectId: ""
      });
    });
  }

  render() {
    const projectId = this.state.projectId;
    const members = this.state.members;
    const self = this;
    return (
      <Card style={{ margin: 10 }}>
        <FormGroup style={{ padding: 10 }}>
          <div style={{ marginBottom: 10 }}>
            <InputLabel>Task</InputLabel>
            <Input
              fullWidth
              onChange={event => this.setState({ todo: event.target.value })}
            />
          </div>

          <div style={{ marginBottom: 10 }}>
            <InputLabel>Assign to</InputLabel>
            <Select
              fullWidth
              onChange={event =>
                this.setState({ assignMember: event.target.value })
              }
              value={this.state.assignMember}
            >
              {members ? (
                members.map(member => (
                  <MenuItem key={member} value={member}>
                    {member}
                  </MenuItem>
                ))
              ) : (
                <MenuItem>No members in this project.</MenuItem>
              )}
            </Select>
          </div>
          <Button onClick={() => this.handleSubmit()}>SUBMIT</Button>
        </FormGroup>
      </Card>
    );
  }
}
