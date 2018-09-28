import React, { Component } from 'react'
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import NoteForm from './NoteForm';
import AllNotes from './AllNotes';
// import firebase from '../firebase'

export default class Home extends Component {
	render(){
		return(
			<div>
				<h3>Sign Up</h3>
				<SignUpForm />
				<br />
				<h3>Login</h3>
				<LoginForm />
				<br />
				<h3>Post your notes</h3>
				<NoteForm />
				<br />
				<AllNotes />
		</div>
		)
	}
}
