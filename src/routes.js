import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Components/Home";
import LoginForm from "./Components/LoginForm";
import SignUpForm from "./Components/SignUpForm";
import NoteForm from "./Components/NoteForm";
import NoteGrids from "./Components/NoteGrids";
import AllNotes from "./Components/AllNotes";
import { log } from "util";
import Calendar from "./Components/Calendar";
import Todos from "./Components/Todos";
import ProjectBar from "./Components/ProjectBar";
import SingleProject from "./Components/SingleProject";
import PhotoGrid from "./Components/PhotoGrid";
import CreateProject from './Components/CreateProject'
import firebase from "./firebase";
import CreateEvent from "./Components/CreateEvent";

export default class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }
  componentDidMount() {
    const newUser = firebase.auth().currentUser;
    this.setState({
      user: newUser
    });
  }
  render() {
    // firebase.auth().onAuthStateChanged(user => {
    //   if (user) {
    //     console.log("User: ", user);
    //     currentUser = user;
    //   }
    // });
    return (
      <Switch>
        <Route path="/notes" component={NoteGrids} />
        <Route path="/home" component={Home} />
        <Route path="/writenote" component={NoteForm} />
        <Route path="/projectbar" component={ProjectBar} />
        <Route path="/calendar" component={Calendar} />
        <Route path="/AddEvent" component={CreateEvent} />
        <Route path="/todos" component={Todos} />
        <Route path="/project" component={SingleProject} />
        <Route path="/photoBook" component={PhotoGrid} />
				<Route path='/addproject' component={CreateProject} />
        <Route
          path="/login"
          render={() => (
            <LoginForm handleLogin={this.props.handleLogin} test="test" />
          )}
        />
        <Route path="/signup" component={SignUpForm} />
      </Switch>
    );
  }
}
