import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Components/Home';
import LoginForm from './Components/LoginForm';
import SignUpForm from './Components/SignUpForm';
import NoteForm from './Components/NoteForm';
import AllNotes from './Components/AllNotes';
//import FullCalendar from './Components/Calendar';
import Todos from './Components/Todos';
import ProjectBar from './Components/ProjectBar';
//import firebase from './firebase';

export default class Routes extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     user: {},
  //   };
  // }
  // componentDidMount() {
  //   const newUser = firebase.auth().currentUser;
  //   this.setState({
  //     user: newUser,
  //   });
  // }
  render() {
    return (
      // <Switch>
      //   {this.state.user && (
      <Switch>
        <Route path="/login" component={LoginForm} />
        <Route path="/signup" component={SignUpForm} />
        <Route path="/notes" component={AllNotes} />
        <Route path="/home" component={Home} />
        <Route path="/writenote" component={NoteForm} />
        <Route path="/projectbar" component={ProjectBar} />
        {/* <Route path="/calendar" component={FullCalendar} /> */}
        <Route path="/todos" component={Todos} />
        {/* </Switch>
        )} */}
        {/* <Route path="/login" component={LoginForm} />
        <Route path="/signup" component={SignUpForm} /> */}
      </Switch>
    );
  }
}
