import React, { Component } from 'react';
import firebase from '../firebase'

export default class SignUpForm extends Component {
	constructor(){
		super()
		this.state = {}
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
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
		const user = firebase.auth().createUserWithEmailAndPassword(email, pass)
			.catch(function(error){
				console.error(error)
			})
		console.log(user.uid)
/* 		firebase.database().ref('users/' + user.uid).set({
			email: user.email
		})
		user.updateProfile({
			displayName: this.state.name
		}).then(function(){
			console.log('Display name is set.')
		}) */
	}

	render(){
		return (
			<form onSubmit={this.handleSubmit} onChange={this.handleChange}>
			Email: <input type="email" name="email" />
			Password: <input type="password" name="password" />
			Name: <input type="text" name="name" />
			<button type="submit">SIGNUP</button>
		</form>
		)
	}
}
