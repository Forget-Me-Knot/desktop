import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import firebase from "../firebase";
import Project from "./Projects";

const styles = theme => ({
  icon: {
    height: "30px"
  },
  paper: {
    width: 90
  }
});

class Navbar extends React.Component {
  constructor(props) {
    super(props);
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
    console.log("Navbar user: ", this.state.user);
    return (
      <div className={classes.root}>
        <Drawer variant="permanent" className={classes.paper}>
          <List>
            <ListItem>
              <Link
                to={{
                  pathname: "/login",
                  state: { handleLogin: this.props.handleLogin }
                }}
                style={{ textDecoration: "none" }}
              >
                <img className={classes.icon} src="reminder.png" alt="home" />
              </Link>
            </ListItem>
            {this.state.user ? (
              <Button size="small" onClick={this.logOut}>
                LOGOUT
              </Button>
            ) : null}
            <Divider />
            <Button size="small">
              <Link to="/calendar" style={{ textDecoration: "none" }}>
                CALENDAR
              </Link>
            </Button>
            <Project />
            {/* {this.state.projects
              ? this.state.projects.map(project => {
                  <ListItem>{project.name}</ListItem>;
                })
              : null} */}

            {/* <div>
              {firebase.auth().onAuthStateChanged(user => {
                if (user.uid) {
                  console.log("Project Component: ", user);
                  return <Project />;
                } else {
                  return null;
                }
              })}
            </div> */}
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
