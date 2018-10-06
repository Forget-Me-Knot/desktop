import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import firebase from "../firebase";
import Card from "@material-ui/core/Card";
import FormGroup from "@material-ui/core/FormGroup";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { Typography } from "@material-ui/core";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  }
});

class CreateEvent extends React.Component {
  constructor() {
    super();
    this.state = {
      date: "",
      time: "",
      eventName: "",
      project: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    const self = this;
    firebase.auth().onAuthStateChanged(function(user) {
      const ref = firebase.database().ref();
      ref.on("value", function(snapshot) {
        const projects = snapshot.val().projects;
        let myProjects = [];
        for (var key in projects) {
          if (projects[key].members.includes(user.email)) {
            const name = projects[key].name;
            const members = projects[key].members;
            myProjects.push({ name, members, key });
          }
        }
        self.setState({ projects: myProjects });
      });
    });
  }
  handleSubmit() {
    const self = this;
    const eventName = this.state.eventName;
    const projectId = parseInt(this.state.project);
    const eventDate = this.state.date;
    const eventTime = this.state.time;
    const newKey = firebase;
    //   .database()
    //   .ref("events/")
    //   .push().key;
    // const ref = firebase.database().ref("users");
    // ref.on("value", function(snapshot) {
    //   const users = snapshot.val();
    //   let event;
    //   for (var key in users) {
    //     if (users[key].email === assigned) {
    let event = {
      eventName,
      projectId,
      eventDate,
      eventTime
    };
    // }
    //   }
    firebase
      .database()
      .ref("events")
      .child(newKey)
      .set(event);
    self.setState({
      date: "",
      time: "",
      eventName: "",
      project: []
    });
    // });
  }
  render() {
    const projects = this.state.projects;
    const self = this;
    return (
      <Card style={{ margin: 10 }}>
        <FormGroup style={{ padding: 10 }}>
          <div style={{ marginBottom: 10 }}>
            <Typography variant="headline" align="center">
              Tell us about this new thing!
            </Typography>
            <div>
              {/* <InputLabel>What's this thing called?</InputLabel> */}
              <TextField
                required
                // id="standard-required"
                id="standard-with-placeholder"
                label="Event name"
                placeholder="New Event Title"
                // value="eventName"
                className={styles.textField}
                margin="normal"
              />
            </div>
            <div>
              {/* <InputLabel>When's it going down?</InputLabel> */}
              <TextField
                id="datetime-local"
                label="Event date and time"
                type="datetime-local"
                defaultValue="2018-07-21T09:30"
                className={styles.textField}
                InputLabelProps={{
                  shrink: true
                }}
              />
            </div>
            <div style={{ marginBottom: 10 }}>
              <InputLabel>
                What project is this event associated with?
              </InputLabel>
              <Select
                fullWidth
                // onChange={function(event) {
                //   self.getMembers(event);
                // }}
                value={this.state.project}
              >
                {projects ? (
                  projects.map(project => (
                    <MenuItem key={project.key} value={project.name}>
                      {project.name}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem>No project available.</MenuItem>
                )}
              </Select>
            </div>
          </div>
          <Button variant="outlined" onClick={() => this.handleSubmit()}>
            SUBMIT
          </Button>
        </FormGroup>
      </Card>
    );
  }
}

CreateEvent.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CreateEvent);
