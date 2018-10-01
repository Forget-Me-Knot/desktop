import React, { Component } from 'react';
import firebase from '../firebase'

export default class NoteForm extends Component {
	constructor(){
		super()
		this.state = {}
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleChange(event){
		if(!firebase.auth().currentUser) {
			console.log("NOT LOGGED IN")
		} else {
			console.log(firebase.auth().currentUser.displayName)
		}
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleSubmit(event){
		event.preventDefault()
		const user = firebase.auth().currentUser
		const noteid = Math.floor(Math.random() * 100000)
		firebase.database().ref('notes/' + noteid).set({
			author: user.uid,
			content: this.state.note
		})
	}

	render(){
		return (
			<form onChange={this.handleChange} onSubmit={this.handleSubmit}>
				<input type="text" name="note" />
				<button type="submit">POST NOTE</button>
		</form>
		)
	}
}
