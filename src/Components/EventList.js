import React from "react";
import { ScrollView, View } from "react-native";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import firebase from "../firebase";
import IconButton from "@material-ui/core/IconButton";
import RemoveCircle from "@material-ui/icons/RemoveCircle";

class EventList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: []
    };
    // this.makeList = this.makeList.bind(this)
    // this.handleClick = this.handleClick.bind(this);
    // this.delete = this.delete.bind(this);
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
    return (
      <ScrollView>
        <View>
          <List containerStyle={{ marginBottom: 20 }}>
            {this.state.events.map(l => (
              <ListItem
                //needs delete button
                leftIcon={{ name: "lens", color: `#${l.color}` }}
                key={l.key}
                title={l.name}
                hideChevron
              >
                <ListItemText> {l.name}</ListItemText>
                <ListItemText> {l.date.dateString}</ListItemText>
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
            ))}
          </List>
        </View>
      </ScrollView>
    );
  }
}
export default EventList;
