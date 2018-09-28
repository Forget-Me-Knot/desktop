import React, { Component } from 'react';
import firebase from '../firebase'

export default class NoteForm extends Component {
	constructor(){
		super()
		this.state = {}
	}

	handleChange(event){
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleSubmit(event){
		event.preventDefault()
		const user = firebase.auth().currentUser
		firebase.database().ref('notes/note2').set({
			author: user.uid,
			content: this.state.note
		})
	}

	render(){
		return (
			<form onChange={this.handleChange} onSubmit={this.noteSubmit}>
				<input type="text" name="note" />
				<button type="submit">POST NOTE</button>
		</form>
		)
	}
}
