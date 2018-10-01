import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Components/Home';
import LoginForm from './Components/LoginForm';
import SignUpForm from './Components/SignUpForm';
import NoteForm from './Components/NoteForm';
import AllNotes from './Components/AllNotes';

export default class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route path="/login" component={LoginForm} />
        <Route path="/writenote" component={NoteForm} />
        <Route path="/signup" component={SignUpForm} />
        <Route path="/notes" component={AllNotes} />
        <Route path="/home" component={Home} />
      </Switch>
    );
  }
}
