import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import { ListItem, ListItemText } from "@material-ui/core/";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import firebase from "../firebase";
import Avatar from "@material-ui/core/Avatar";

const styles = theme => ({
  icon: {
    height: "50px"
  },
  paper: {
    width: 90
  }
});

class Navbar extends React.Component {
  constructor() {
    super();
    this.state = {
      projects: [] || null,
      user: {},
      login: null,
      selected: false
    };
    this.logOut = this.logOut.bind(this);
    this.clickNav = this.clickNav.bind(this);
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
                userProjects.push({ name, key, color });
              }
            }
          }
          self.setState({ projects: userProjects });
        });
      }
    });
  }

  logOut() {
    firebase
      .auth()
      .signOut()
      .then(
        function() {
          console.log("Sign out!");
          console.log(firebase.auth().currentUser);
        },
        function(error) {
          console.error(error);
        }
      );
    this.setState({
      user: {}
    });
    this.props.handleLogout();
  }

  clickNav(key) {
    this.props.setProject(key);
  }

  render() {
    const { user, projects, selected } = this.state;
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Drawer variant="permanent" className={classes.paper}>
          <List>
            <ListItem>
              <img
                className={classes.icon}
                src="reminder.png"
                alt="home"
                centered={"true"}
              />
            </ListItem>
            {user.uid ? (
              <ListItem>
                <Button onClick={this.logOut} variant="raised">
                  logout
                </Button>
              </ListItem>
            ) : (
              <ListItem component={Link} to="/login">
                <ListItemText primary="Login" />
              </ListItem>
            )}
            <Divider />
            <ListItem component={Link} to="/calendar">
              <ListItemText primary="Calendar" />
            </ListItem>
            <Divider />
            <ListItem component={Link} to="/project">
              <ListItemText primary="DemoTabs" />
            </ListItem>
            <Divider />
            {projects
              ? projects.map(project => (
                  <ListItem key={project.key}>
                    <ListItemText
                      primary={project.name}
                      onClick={() => this.clickNav(project.key)}
                    />
                    <Avatar
                      style={{
                        backgroundColor: `#${project.color}`,
                        width: "30px",
                        height: "30px"
                      }}
                    />
                  </ListItem>
                ))
              : null}
          </List>
        </Drawer>
      </div>
    );
  }
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Navbar);
