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
import Project from "./Projects";
import ProjectBar from "./ProjectBar";
import AddIcon from "@material-ui/icons/Add";

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
    this.logOut = this.logOut.bind(this);
    this.state = {
      projects: [] || null,
      user: {},
      login: null
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          user
        });
      } else {
        return null;
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

  render() {
    const { classes } = this.props;
    const { handleUser } = this.props;
    // console.log("Navbar user: ", this.state.user);
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

            {firebase.auth().currentUser ? (
              <ListItem>
                {/* <Link
                  to={{ pathname: "/login", state: { handleUser: handleUser } }}
                  style={{ textDecoration: "none" }}
                /> */}
                <Button onClick={this.logOut} variant="raised">
                  logout
                </Button>
              </ListItem>
            ) : (
              <ListItem component={Link} to="/login">
                {/* <ListItemIcon>
                <BookIcon />
              </ListItemIcon> */}
                <ListItemText primary="Login" />
              </ListItem>
            )}

            <Divider />
            <ListItem component={Link} to="/calendar">
              <ListItemText primary="Calendar" />
            </ListItem>

            <Divider />
            <ListItem component={Link} to="/project">
              <ListItemText primary="Add an event" />
              <Button
                variant="fab"
                text="add an event"
                // color="primary"
                aria-label="Add"
                style={{
                  backgroundColor: `mediumaquamarine`,
                  width: "30px",
                  height: "30px"
                }}
                onClick={() => console.log("hi there")}
              >
                <AddIcon />
              </Button>
            </ListItem>
            <Divider />
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
            {firebase.auth().currentUser ? <ProjectBar /> : <h3>hi</h3>}
            {/* {this.state.projects
              ? this.state.projects.map(project => {
                  <ListItem>{project.name}</ListItem>;
                })
              : null} */}
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
