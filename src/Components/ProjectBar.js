import React from "react";
import { Link } from "react-router-dom";
import firebase from "../firebase";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import AddIcon from "@material-ui/icons/Add";
import LensOutlined from "@material-ui/icons/LensOutlined";
import Lens from "@material-ui/icons/Lens";
import SupervisedUserCircle from "@material-ui/icons/SupervisedUserCircle";
import PersonOutlined from "@material-ui/icons/PersonOutlined";
import PeopleOutline from "@material-ui/icons/PeopleOutline";
import { Avatar, Button } from "@material-ui/core";
import NoteForm from "./NoteForm";

export default class ProjectBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      selectedProject: ""
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const self = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        let userProjects = [];
        var ref = firebase.database().ref("projects");
        ref.on("value", function(snapshot) {
          let projects = snapshot.val();
          for (let key in projects) {
            if (projects[key].members) {
              const members = projects[key].members;
              const name = projects[key].name;
              const color = projects[key].color;
              if (members.includes(user.email)) {
                userProjects.push({ name, key, color });
              }
            }
          }
          self.setState({ projects: userProjects });
        });
      }
    });
  }
  handleClick() {
    const user = firebase.auth().currentUser;
    const proj = this.state.selectedProject;
    const newKey = firebase
      .database()
      .ref("projects/" + proj)
      .child("notes")
      .push().key;
    firebase
      .database()
      .ref("notes/" + newKey)
      .set({
        author: user.uid,
        content: this.state.note
      });
    let updates = {};
    updates["/" + newKey] = this.state.note;
    firebase
      .database()
      .ref("projects/" + proj)
      .child("notes")
      .update(updates);
    // Keyboard.dismiss()
  }
  render() {
    const projects = this.state.projects;
    return (
      <div
        style={{
          height: 680,
          width: 200,
          borderRight: "0.1em solid #e0e0e0"
        }}
      >
        <List>
          <ListItem
            component={Link}
            to={{
              pathname: "/writenote",
              state: { projects: this.state.projects }
            }}
          >
            <ListItemText primary="Write" />
          </ListItem>
          <Divider />
          <ListItem component={Link} to="/notes">
            <ListItemText primary="All Notes" />
          </ListItem>
          <Divider />
          <ListItem component={Link} to="/todos">
            <ListItemText primary="To-do List" />
          </ListItem>
          <Divider />
          <ListItem component={Link} to="/photoBook">
            <ListItemText primary="Photos" />
          </ListItem>
          <Divider />
          <ListItem component={Link} to="/project">
            <ListItemText primary="Projects" />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="Add a Project" />
            <Button
              variant="fab"
              text="add a project"
              // color="primary"
              aria-label="Add"
              style={{
                backgroundColor: "mediumpurple",
                width: "30px",
                height: "30px"
              }}
              onClick={() => console.log("hi there")}
            >
              <AddIcon />
            </Button>
            {/* <ListItemText primary="Add a Project" /> */}
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="Group Projects" />
            {/* <SupervisedUserCircle /> */}
            <PeopleOutline />
          </ListItem>
          {projects && projects ? (
            projects.map(item => (
              <ListItem>
                <Avatar
                  rounded
                  style={{
                    backgroundColor: `#${item.color}`,
                    width: "30px",
                    height: "30px"
                  }}
                />
                <ListItemText primary={item.name} />
              </ListItem>
            ))
          ) : (
            <ListItem>
              <ListItemText primary="Projects ForthComing" />
            </ListItem>
          )}
          <ListItem>
            <ListItemText primary="Personal Projects" />
            <PersonOutlined />
          </ListItem>
        </List>
      </div>
    );
  }
}
