import React, { Component } from 'react';
import firebase from './firebase'

class App extends Component {
	constructor(){
		super()
		this.state = {}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.loginSubmit = this.loginSubmit.bind(this)
	}

	handleChange(event){
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleSubmit(event){
		event.preventDefault()
		const email = this.state.email
		const pass = this.state.password
		firebase.auth().createUserWithEmailAndPassword(email, pass)
			.catch(function(error){
				console.error(error)
			})
	}

	loginSubmit(event){
		event.preventDefault()
		const email = this.state.email
		const pass = this.state.password
		firebase.auth().signInWithEmailAndPassword(email, pass)
			.catch(function(error){
				console.error(error)
			})
		const user = firebase.auth().currentUser
		firebase.database().ref('users/' + user.uid).set({
			email: user.email
		})
	}

  render() {
    return (
      <div className="App">
				<br />
				<br />
        <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
					<input type="email" name="email" />
					<input type="password" name="password" />
					<button type="submit">SIGNUP</button>
				</form>
				<br />
				<form onSubmit={this.loginSubmit} onChange={this.handleChange}>
					<input type="email" name="email" />
					<input type="password" name="password" />
					<button type="submit">LOGIN</button>
				</form>
				<br />
      </div>
    );
  }
}

export default App;
