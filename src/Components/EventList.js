import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import RemoveCircle from "@material-ui/icons/RemoveCircle";
import Divider from "@material-ui/core/Divider";
import Checkbox from "@material-ui/core/Checkbox";
import CreateEvent from "./CreateEvent";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import firebase from "../firebase";
import Typography from "@material-ui/core/Typography";

class EventList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      formOpen: false
    };
    this.openForm = this.openForm.bind(this);
    this.delete = this.delete.bind(this);
  }

  componentDidMount() {
    if (this.props.events) this.setState({ events: this.props.events });
    if (this.props.projects) this.setState({ projects: this.props.projects });
  }

  componentDidUpdate(prevProps) {
    const props = this.props;
    if (
      prevProps.events !== props.events ||
      prevProps.projects !== props.projects
    ) {
      let projectIds = [];
      props.projects.forEach(project => {
        projectIds.push(project.key);
      });
      let myEvents = [];
      props.events.forEach(event => {
        if (projectIds.includes(event.projectId + "")) {
          myEvents.push(event);
        }
      });
      this.setState({
        events: myEvents,
        projects: props.projects
      });
    }
  }

  openForm() {
    if (!this.state.formOpen) {
      this.setState({ formOpen: true });
    } else {
      this.setState({ formOpen: false });
    }
  }

  delete(key) {
    return firebase
      .database()
      .ref("events")
      .child(key)
      .remove();
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
    const projectId = this.props.projectId;
    const events = this.props.events;
    const projects = this.props.projects;
    const shade = "#" + this.props.projects[0].color;
    return (
      <div>
        <span>
          <Typography
            variant="title"
            align="center"
            style={{
              backgroundColor: shade,
              fontSize: "1.5em",
              color: "white"
            }}
          >
            {this.props.projects[0].name}
          </Typography>
        </span>
        <List>
          {events.map(
            l =>
              l.date ? (
                <ListItem key={l.key} title={l.name}>
                  <Checkbox />
                  <ListItemText>
                    {" "}
                    {months[l.date.month]} {l.date.day}, {l.date.year}
                  </ListItemText>
                  <ListItemText> {l.name}</ListItemText>
                  <IconButton
                    aria-label="Delete"
                    style={{ float: "right" }}
                    onClick={() => this.delete(l.key)}
                  >
                    <RemoveCircle />
                  </IconButton>
                </ListItem>
              ) : null
          )}
        </List>
        <Divider />
        <Button
          text="add a project"
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
        {this.state.formOpen ? (
          <CreateEvent projects={projects} projectId={projectId} />
        ) : null}
      </div>
    );
  }
}
export default EventList;
