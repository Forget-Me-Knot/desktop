import React, { Component } from 'react';
import LoginForm from './Components/LoginForm'
import SignUpForm from './Components/SignUpForm'
import NoteForm from './Components/NoteForm'
import AllNotes from './Components/AllNotes'

class App extends Component {
	constructor(){
		super()
		this.state = {}
	}
  render() {
    return (
      <div className="App">
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
    );
  }
}

export default App;
