import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import firebase from '../firebase';

const styles = theme => ({
  icon: {
    height: '30px',
  },
  paper: {
    width: 90,
  },
});

class MiniDrawer extends React.Component {
  constructor() {
    super();
    this.logOut = this.logOut.bind(this);
    this.state = {
      projects: [],
    };
  }
  componentDidMount() {
    const user = firebase.auth().currentUser;
    var self = this;
    if (user) {
      var ref = firebase.database().ref('projects/');
      ref.on(
        'value',
        function(snapshot) {
          let projectsArr = [];
          let projects = snapshot.val();
          for (var key in projects) {
            if (projects[key].name) {
              projectsArr.push(projects[key]);
            }
          }
          self.setState({ projects: projectsArr });
        },
        function(error) {
          console.log('Error: ', error.code);
        }
      );
    }
  }

  logOut() {
    firebase
      .auth()
      .signOut()
      .then(
        function() {
          console.log('Sign out!');
          console.log(firebase.auth().currentUser);
        },
        function(error) {
          console.error(error);
        }
      );
  }
  render() {
    const { classes } = this.props;
    const user = firebase.auth().currentUser;
    console.log('User: ', user);
    return (
      <div className={classes.root}>
        <Drawer variant="permanent" className={classes.paper}>
          <List>
            <ListItem>
              <Link to="/login" style={{ textDecoration: 'none' }}>
                <img className={classes.icon} src="reminder.png" alt="home" />
              </Link>
            </ListItem>
            {user && (
              <Button size="small" onClick={this.logOut}>
                LOGOUT
              </Button>
            )}
            <Divider />
            <Button size="small">
              <Link to="/calendar" style={{ textDecoration: 'none' }}>
                CALENDAR
              </Link>
            </Button>
            {this.state.projects
              ? this.state.projects.map(project => {
                  <ListItem>{project.name}</ListItem>;
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
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MiniDrawer);
