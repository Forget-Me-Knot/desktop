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
      members: []
    };
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

          for (var id in users) {
            projects.map(project => {
              if (project.members.includes(users[id].email)) {
                myMembers.push(users[id].displayName);
                console.log("Members: ", myMembers);
              }
            });
          }
          self.setState({ members: myMembers });
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
            for (var id in users) {
              props.projects.map(project => {
                if (project.members.includes(users[id].email)) {
                  myMembers.push(users[id].displayName);
                  console.log("Members: ", myMembers);
                }
              });
            }
            self.setState({
              projects: props.projects,
              members: myMembers
            });
          });
        }
      });
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
    return (
      <div>
        <List>{members ? this.memberList(members) : null}</List>
        <AddMember project={this.props.projects} />
      </div>
    );
  }
}
export default Members;
