import React, { Component } from "react";
import { Typography } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import AddIcon from "@material-ui/icons/Add";
import LensOutlined from "@material-ui/icons/LensOutlined";
import Lens from "@material-ui/icons/Lens";
import { Avatar, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

import firebase from "../firebase";

const styles = {
  container: {
    alignItems: "center"
  }
};

export default class UserProfile extends Component {
  //   constructor() {
  //     super();
  //     this.state = {};
  //   }
  constructor() {
    super();
    this.state = {
      projects: [] || null,
      user: {},
      login: null
    };
    this.deleteProject = this.deleteProject.bind(this);

    // this.clickNav = this.clickNav.bind(this);
  }

  componentDidMount() {
    const self = this;
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        self.setState({ user });
        let userProjects = [];
        const ref = firebase.database().ref("projects");
        ref.on("value", function(snapshot) {
          const projects = snapshot.val();
          for (let key in projects) {
            if (projects[key].members) {
              const members = projects[key].members;
              const name = projects[key].name;
              const color = projects[key].color;
              if (members.includes(user.email)) {
                userProjects.push({ name, key, color, members });
              }
            }
          }
          self.setState({ projects: userProjects });
        });
      }
    });
  }
  deleteProject(key) {
    return firebase
      .database()
      .ref("project")
      .child(key)
      .remove();
  }
  //   componentDidMount() {
  //     let message;
  //     const date = new Date();
  //     const hour = date.getHours();
  //     if (hour >= 6 && hour < 12) {
  //       message = "Good morning.";
  //     } else if (hour >= 12 && hour <= 14) {
  //       message = "Lunch time!";
  //     } else if (hour > 14 && hour <= 17) {
  //       message = "Good afternoon.";
  //     } else if (hour >= 18) {
  //       message = "Good night.";
  //     }
  //     this.setState({ message });

  //     const self = this;
  //     const user = firebase.auth().currentUser;
  //     const ref = firebase.database().ref("users/");
  //     ref.on("value", function(snapshot) {
  //       const users = snapshot.val();
  //       for (var key in users) {
  //         if (key === user.uid) self.setState({ user: users[key].displayName });
  //       }
  //     });
  //   }

  render() {
    const projects = this.state.projects;
    const user = this.state.user;
    return (
      <div>
        <Typography variant="headline" align="center">
          {" "}
          User Info{" "}
        </Typography>
        <Divider />
        <Typography variant="subheading"> email: {user.email}</Typography>
        <Typography variant="subheading"> name: {user.displayName} </Typography>
        <div />
        <div>
          <Divider />
          <Typography variant="headline" align="center">
            {" "}
            My Projects
          </Typography>
          <Divider />
          <List>
            {projects ? (
              projects.map(item => (
                <ListItem key={item.key}>
                  <Avatar
                    style={{
                      backgroundColor: `#${item.color}`,
                      width: "30px",
                      height: "30px"
                    }}
                  />
                  <ListItemText primary={item.name} />
                  <Avatar
                    style={{
                      width: 15,
                      height: 15,
                      position: "absolute",
                      right: 20,
                      color: "grey",
                      backgroundColor: "white"
                    }}
                    onClick={() => this.deleteProject(item.key)}
                  >
                    x
                  </Avatar>
                </ListItem>
              ))
            ) : (
              <ListItem>
                <ListItemText primary="Projects ForthComing" />
              </ListItem>
            )}

            <Divider />
          </List>

          <Link to="/addproject" replace>
            <Button
              // variant="fab"
              // text="add a project"
              aria-label="Add"
              style={{
                backgroundColor: "mediumpurple"
              }}
              onClick={() => console.log("hi there")}
            >
              <AddIcon />
              add new project
            </Button>
          </Link>
        </div>
      </div>
    );
  }
}
