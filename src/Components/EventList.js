import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import RemoveCircle from "@material-ui/icons/RemoveCircle";
import Divider from "@material-ui/core/Divider";
import Checkbox from "@material-ui/core/Checkbox";
import CreateEventMini from "./CreateEventMini";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";

class EventList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      formOpen: false
    };
    this.openForm = this.openForm.bind(this);
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
    const projects = this.props.projects;
    // console.log("projects in props event list", projects);
    return (
      <div>
        <List>
          {this.state.events.map(l => (
            <ListItem key={l.key} title={l.name}>
              <Checkbox />
              <ListItemText>
                {" "}
                {months[l.date.month]} {l.date.day}, {l.date.year}
              </ListItemText>
              <ListItemText> {l.name}</ListItemText>
              <IconButton aria-label="Delete" style={{ float: "right" }}>
                <RemoveCircle />
              </IconButton>
            </ListItem>
          ))}
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
        {this.state.formOpen ? <CreateEventMini projects={projects} /> : null}
      </div>
    );
  }
}
export default EventList;
