import React from "react";
import { ScrollView, View } from "react-native";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import firebase from "../firebase";
import IconButton from "@material-ui/core/IconButton";
import RemoveCircle from "@material-ui/icons/RemoveCircle";
import Divider from "@material-ui/core/Divider";
import Checkbox from "@material-ui/core/Checkbox";
import CreateEvent from "./CreateEvent";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";

class EventList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      formOpen: false
    };
    // this.makeList = this.makeList.bind(this)
    // this.handleClick = this.handleClick.bind(this);
    // this.delete = this.delete.bind(this);
    this.openForm = this.openForm.bind(this);
  }
  openForm() {
    if (!this.state.formOpen) {
      this.setState({ formOpen: true });
    } else {
      this.setState({ formOpen: false });
    }
  }

  componentDidMount() {
    var self = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        const ref = firebase.database().ref();
        ref.on("value", function(snapshot) {
          const events = snapshot.val().events;
          const projects = snapshot.val().projects;

          let myProjects = [];
          let colors = {};
          let myEvents = [];
          for (var key in projects) {
            if (projects[key].members.includes(user.email)) {
              myProjects.push(key);
              colors[key] = projects[key].color;
            }
          }
          for (var id in events) {
            if (myProjects.includes(events[id].projectId + "")) {
              myEvents.push({
                ...events[id],
                key: id,
                color: colors[events[id].projectId]
              });
              self.setState({ [id]: events[id].completed });
            }
          }
          self.setState({ events: myEvents });
        });
      }
    });
  }
  render() {
    const months = [
      "nothing",
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    return (
      <div>
        <List containerStyle={{ marginBottom: 20 }}>
          {this.state.events.map(l => (
            <ListItem
              //needs delete button
              leftIcon={{ name: "lens", color: `#${l.color}` }}
              key={l.key}
              title={l.name}
              hideChevron
            >
              <Checkbox
              // checked={this.state[event.key]}
              // onClick={() => this.handleClick(event.key)}
              />
              {/* <ListItemText> {l.name}</ListItemText> */}
              <ListItemText>
                {" "}
                {months[l.date.month]} {l.date.day}, {l.date.year}
              </ListItemText>
              <ListItemText> {l.name}</ListItemText>
              {/* <ListItemText> {l.projectId}</ListItemText> */}
              <IconButton
                aria-label="Delete"
                color="grey"
                style={{ float: "right" }}
                // onClick={() => this.delete(task.key)}
              >
                <RemoveCircle />
              </IconButton>
            </ListItem>
            // <Divider/>
          ))}
        </List>
        <Divider />
        <Button
          // variant="fab"
          text="add a project"
          // color="primary"
          aria-label="Add"
          style={{
            backgroundColor: "mediumpurple",
            marginTop: 12
          }}
          onClick={() => this.openForm()}
        >
          <AddIcon />
          add an event
        </Button>
        {this.state.formOpen ? <CreateEvent /> : null}
      </div>
    );
  }
}
export default EventList;
