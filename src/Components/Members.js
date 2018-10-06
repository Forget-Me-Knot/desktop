import React from "react";
import { ScrollView, View } from "react-native";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import firebase from "../firebase";
import IconButton from "@material-ui/core/IconButton";
import RemoveCircle from "@material-ui/icons/RemoveCircle";
import Divider from "@material-ui/core/Divider";
import Checkbox from "@material-ui/core/Checkbox";
import CreateEvent from "./CreateEvent";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";

class Members extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      members: []
    };
  }

  componentDidMount() {
    var self = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        const ref = firebase.database().ref();
        ref.on("value", function(snapshot) {
          const projects = snapshot.val().projects;
          const users = snapshot.val().users;

          let myMembers = [];
          let myProjects = [];
          for (var key in projects) {
            if (projects[key].members.includes(user.email)) {
              myProjects.push(projects[key]);
              console.log("Projects: ", myProjects);
              //All my project ids
            }
          }
          for (var id in users) {
            myProjects.map(project => {
              if (project.members.includes(users[id].email)) {
                myMembers.push(users[id].displayName);
              }
            });
          }
          self.setState({ members: myMembers });
        });
      }
    });
  }
  delete(key) {
    return firebase
      .database()
      .ref("projects/members/")
      .child(key)
      .remove();
    //filter?
  }

  memberList(members) {
    return members.map(member => (
      <ListItem key={member.key}>
        <ListItemText>{member}</ListItemText>
        <IconButton
          aria-label="Delete"
          color="grey"
          style={{ float: "right" }}
          onClick={() => this.delete(member.key)}
        >
          <RemoveCircle />
        </IconButton>
      </ListItem>
    ));
  }

  render() {
    const members = this.state.members;
    return <List>{members ? this.memberList(members) : null}</List>;
  }
}
export default Members;
