import React, { Component } from 'react'
import { Route, Switch, Router } from 'react-router-dom'
import LoginForm from './Components/LoginForm';
import SignUpForm from './Components/SignUpForm'
import NoteForm from './Components/NoteForm';

export default class Routes extends Component {
	render(){
		return (
			<Router>
			<Switch>
				<Route path="/home" component={LoginForm} />
				<Route path="/signup" component={SignUpForm} />
				<Route path="/writenote" component={NoteForm} />
			</Switch>
			</Router>
		)
	}
}
