import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import firebase from "../firebase";
import IconButton from "@material-ui/core/IconButton";
import RemoveCircle from "@material-ui/icons/RemoveCircle";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { Typography } from "@material-ui/core";

class Members extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      members: [],
      open: false,
      close: true
    };
    this.delete = this.delete.bind(this);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.submitclose = this.submitclose.bind(this);
  }

  delete(member) {
    let members = this.props.members;
    const key = this.props.projectKey;
    members.forEach((m, i) => {
      if (m === member) members.splice(i, 1);
    });
    return firebase
      .database()
      .ref("projects/" + key)
      .update({
        members
      });
  }

  memberList(members) {
    return members.map((member, i) => (
      <ListItem key={i}>
        <ListItemText>{member}</ListItemText>
        <IconButton
          aria-label="Delete"
          style={{ float: "right" }}
          onClick={() => this.delete(member)}
        >
          <RemoveCircle />
        </IconButton>
      </ListItem>
    ));
  }

  open() {
    this.setState({ open: true });
  }

  close() {
    this.setState({ open: false });
  }

  submitclose(key) {
    const self = this;
    firebase
      .database()
      .ref("projects/" + key)
      .update({
        members: [...self.props.members, self.state.newmember]
      })
      .then(function() {
        self.setState({ open: false });
      });
  }

  render() {
    const members = this.props.members;
    const key = this.props.projectKey;
    // console.log("this props in memebers", this.props);
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
        <List>{members ? this.memberList(members) : null}</List>
        <Button
          text="add a project"
          aria-label="Add"
          style={{
            backgroundColor: "mediumpurple",
            marginTop: 12
          }}
          onClick={() => this.open()}
        >
          <AddIcon />
          Add a member
        </Button>
        <Dialog open={this.state.open} onClose={this.close}>
          <DialogContent>
            <DialogContentText>New member's e-mail</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
              onChange={event =>
                this.setState({ newmember: event.target.value })
              }
            />
            <DialogActions>
              <Button onClick={this.close} color="primary">
                Cancel
              </Button>
              <Button onClick={() => this.submitclose(key)} color="primary">
                Add
              </Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}
export default Members;
