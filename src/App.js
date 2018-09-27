import React, { Component } from 'react';
import firebase from './firebase'

class App extends Component {
	constructor(){
		super()
		this.state = {}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.loginSubmit = this.loginSubmit.bind(this)
		this.callNotes = this.callNotes.bind(this)
	}

	callNotes(){
		const user = firebase.auth().currentUser
		var ref = firebase.database().ref('notes');
		let myNotes = []
		ref.on("value", function(snapshot) {
			let notes = snapshot.val()
			for(var key in notes){
				if(notes[key].author === user.uid){
					myNotes.push(notes[key].content)
				}
			}
			console.log(myNotes)
		}, function (error) {
   	console.log("Error: " + error.code);
		});
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
		console.log('logged in')
		this.callNotes()
	}

	noteSubmit(event){
		event.preventDefault()
		const user = firebase.auth().currentUser
		firebase.database().ref('notes/note2').set({
			author: user.uid,
			content: this.state.note
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
				<h3>Post your notes</h3>
				<form onChange={this.handleChange} onSubmit={this.noteSubmit}>
					<input type="text" name="note" />
					<button type="submit">POST NOTE</button>
				</form>
				<br />
				<h3>Read your notes</h3>
				<p></p>
      </div>
    );
  }
}

export default App;
