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

const styles = theme => ({
  icon: {
    height: "30px"
  },
  paper: {
    width: 90
  }
});

const getProjects = () => {
  let projectsVal;
  let projectsArr;
  const ref = firebase.database().ref("projects/");
  ref.on("value", snap => {
    projectsArr = [];
    projectsVal = snap.val();
    console.log("ProjectVal: ", projectsVal);
    for (var key in projectsVal) {
      projectsArr.push(projectsVal[key].name);
    }
    console.log("Projects Array: ", projectsArr);
  });

  return projectsArr;
};

class MiniDrawer extends React.Component {
  constructor() {
    super();
    this.logOut = this.logOut.bind(this);
    this.state = {
      projects: []
    };
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
  }
  render() {
    const { classes } = this.props;
    console.log("Projects: ", getProjects());
    if (!this.state.projects.length) {
      const projectArray = getProjects();
      console.log("Project Array in Render: ", projectArray);
      // this.setState({
      //   project: projectArray
      // });
    }
    return (
      <div className={classes.root}>
        <Drawer variant="permanent" className={classes.paper}>
          <List>
            <ListItem>
              <Link to="/login" style={{ textDecoration: "none" }}>
                <img className={classes.icon} src="reminder.png" alt="home" />
              </Link>
            </ListItem>
            {this.state.projects && (
              <Button size="small" onClick={this.logOut}>
                LOGOUT
              </Button>
            )}
            <Divider />
            <Button size="small">CALENDAR</Button>

            {this.state.projects
              ? this.state.projects.map(project => {
                  <ListItem>{project}</ListItem>;
                })
              : null}
          </List>
        </Drawer>
      </div>
    );
  }
}

MiniDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(MiniDrawer);
