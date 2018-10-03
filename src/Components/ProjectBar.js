import React from "react";
import { Link } from "react-router-dom";
//import firebase from '../firebase';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";

export default class ProjectBar extends React.Component {
  render() {
    return (
      <div
        style={{
          height: 680,
          width: 200,
          borderRight: "0.1em solid #e0e0e0"
        }}
      >
        <List style={{ paddingLeft: 50, width: 150 }}>
          <ListItem component={Link} to="/writenote">
            <ListItemText primary="Write" />
          </ListItem>
          <Divider />
          <ListItem component={Link} to="/notes">
            <ListItemText primary="All Notes" />
          </ListItem>
          <Divider />
          <ListItem component={Link} to="/todos">
            <ListItemText primary="To-do List" />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText primary="Photos" />
          </ListItem>
        </List>
      </div>
    );
  }
}
