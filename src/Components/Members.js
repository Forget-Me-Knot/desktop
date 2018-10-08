import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import firebase from "../firebase";
import IconButton from "@material-ui/core/IconButton";
import RemoveCircle from "@material-ui/icons/RemoveCircle";
import AddMember from "./AddMember";

class Members extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      members: [],
      users: [],
      projects: [],
      formOpen: false
    };
    this.openForm = this.openForm.bind(this);
    this.delete = this.delete.bind(this);
  }

  componentDidMount() {
    var self = this;
    const projects = this.props.projects;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        const ref = firebase.database().ref();
        ref.on("value", function(snapshot) {
          const users = snapshot.val().users;

          let myMembers = [];
          let newMembers = [];

          for (var id in users) {
            projects.map(project => {
              if (project.members.includes(users[id].email)) {
                myMembers.push({
                  displayName: users[id].displayName,
                  email: users[id].email
                });
                console.log("Members: ", myMembers);
              } else {
                newMembers.push({
                  displayName: users[id].displayName,
                  email: users[id].email
                });
                console.log("New members: ", newMembers);
              }
            });
          }
          self.setState({ members: myMembers, users: newMembers });
        });
      }
    });
  }

  componentDidUpdate(prevProps) {
    var self = this;
    const props = this.props;
    if (prevProps.projects !== props.projects) {
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          const ref = firebase.database().ref();
          ref.on("value", function(snapshot) {
            const users = snapshot.val().users;
            let myMembers = [];
            let newMembers = [];
            for (var id in users) {
              props.projects.map(project => {
                if (project.members.includes(users[id].email)) {
                  myMembers.push({
                    displayName: users[id].displayName,
                    email: users[id].email
                  });
                  console.log("Members: ", myMembers);
                } else {
                  newMembers.push({
                    displayName: users[id].displayName,
                    email: users[id].email
                  });
                  console.log("New members: ", newMembers);
                }
              });
            }
            self.setState({
              projects: props.projects,
              users: newMembers,
              members: myMembers
            });
          });
        }
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

  delete(key) {
    return firebase
      .database()
      .ref("projects/members/")
      .child(key)
      .remove();
  }

  memberList(members) {
    if (members) {
      return members.map(member => (
        <ListItem key={member.key}>
          <ListItemText>{member.displayName}</ListItemText>
          <ListItemText>{member.email}</ListItemText>
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
  }

  render() {
    const members = this.state.members;
    console.log("Members Array: ", members);
    return (
      <div>
        <List>
          {this.state.members && this.state.members.displayName
            ? this.memberList(this.state.members)
            : null}
        </List>
        <AddMember
          project={this.props.projects}
          newMembers={this.state.users}
        />
      </div>
    );
  }
}
export default Members;
