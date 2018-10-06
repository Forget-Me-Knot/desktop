import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import firebase from "../firebase";
import Card from "@material-ui/core/Card";
import FormGroup from "@material-ui/core/FormGroup";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { Typography } from "@material-ui/core";

class AddMember extends React.Component {
  constructor() {
    super();
    this.state = {
      members: [],
      selectedMember: ""
    };
  }

  // componentDidMount() {
  //   const projects = this.props.projects;
  //   const self = this;
  //   firebase.auth().onAuthStateChanged(function(user) {

  //       const ref = firebase.database().ref();
  //       ref.on("value", function(snapshot) {
  //         const users = snapshot.val().users;
  //         let myMembers = [];
  //         for (var id in users) {
  //           projects.map(project => {
  //             if (project.members.includes(users[id].email)) {
  //               myMembers.push(users[id].displayName);
  //             }
  //           });
  //         }
  //         self.setState({ members: myMembers });
  //       });

  //   });
  // }
  render() {
    return (
      <div>
        <Button
          text="add a project"
          aria-label="Add"
          style={{
            backgroundColor: "mediumpurple",
            marginTop: 12
          }}
          onClick={() => this.openForm()}
        >
          <AddIcon />
          add a member
        </Button>
      </div>
    );
  }
}

export default AddMember;
