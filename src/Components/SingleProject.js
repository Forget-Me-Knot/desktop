import React from "react";
import PropTypes from "prop-types";
import firebase from "../firebase";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import NoteGrids from "./NoteGrids";
import Typography from "@material-ui/core/Typography";
import Todos from "./Todos";
import PhotoGrid from "./PhotoGrid";
import EventList from "./EventList";

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper
  }
});

class SingleProject extends React.Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

	componentWillMount(){
		const self = this
		const projectKey = this.props.projectKey
		firebase.auth().onAuthStateChanged(function(user) {
			if (user) {
				const ref = firebase.database().ref()
				ref.on('value', function(snapshot) {
					const projdatas = snapshot.val().projects
					const taskdatas = snapshot.val().tasks
					const notedatas = snapshot.val().notes
					const eventdatas = snapshot.val().events

					let projects = []
					let tasks = []
					let notes = []
					let events = []
					for (var key in projdatas) {
						if (projectKey === key) projects.push({key, ...projdatas[key]})
					}
					for (var tkey in taskdatas) {
						if (taskdatas[tkey].projectId + '' === projectKey + '') tasks.push({key: tkey, ...taskdatas[tkey]})
					}
					for (var nkey in notedatas) {
						if (notedatas[nkey].projectId + '' === projectKey + '') notes.push({key: nkey, ...notedatas[nkey]})
					}
					for (var ekey in eventdatas) {
						if (eventdatas[ekey].projectId) events.push({key: ekey, ...eventdatas[ekey]})
					}
					self.setState({projects, tasks, notes, events})
				})
			}
		})
	}

	componentDidUpdate(prevProps){
		const self = this
		const projectKey = this.props.projectKey
		if (projectKey !== prevProps.projectKey) {
			firebase.auth().onAuthStateChanged(function(user) {
				if (user) {
					const ref = firebase.database().ref()
					ref.on('value', function(snapshot) {
						const projdatas = snapshot.val().projects
						const taskdatas = snapshot.val().tasks
						const notedatas = snapshot.val().notes
						const eventdatas = snapshot.val().events

            let projects = [];
            let tasks = [];
            let notes = [];
            let events = [];
            for (var key in projdatas) {
              if (projectKey === key) projects.push({ key, ...projdatas[key] });
            }
            for (var tkey in taskdatas) {
              if (taskdatas[tkey].projectId + "" === projectKey + "")
                tasks.push({ key: tkey, ...taskdatas[tkey] });
            }
            for (var nkey in notedatas) {
              if (notedatas[nkey].projectId + "" === projectKey + "")
                notes.push({ key: nkey, ...notedatas[nkey] });
            }
            for (var ekey in eventdatas) {
              if (eventdatas[ekey].projectId)
                events.push({ key: ekey, ...eventdatas[ekey] });
            }
            self.setState({ projects, tasks, notes, events });
          });
        }
      });
    }
  }

  render() {
    const { classes, projectKey } = this.props;
    const { value, projects, tasks, notes, events } = this.state;
    return (
      <Paper className={classes.root}>
        <Tabs
          value={value}
          onChange={this.handleChange}
          scrollable
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="Notes" />
          <Tab label="Members" />
          <Tab label="Todos" />
          <Tab label="Events" />
          <Tab label="Photos" />
        </Tabs>
        {value === 0 && (
          <TabContainer>
            {" "}
            <NoteGrids notes={notes} />
          </TabContainer>
        )}
        {value === 1 && <TabContainer>Item Two</TabContainer>}
        {value === 2 && (
          <TabContainer>
            <Todos projects={projects} tasks={tasks} />
          </TabContainer>
        )}
        {value === 3 && (
          <TabContainer>
            <EventList
              events={events}
              projects={projects}
              projectId={projectKey}
            />
          </TabContainer>
        )}
        {value === 4 && (
          <TabContainer>
            <PhotoGrid />
          </TabContainer>
        )}
        {value === 5 && <TabContainer>Item Six</TabContainer>}
      </Paper>
    );
  }
}

SingleProject.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SingleProject);
