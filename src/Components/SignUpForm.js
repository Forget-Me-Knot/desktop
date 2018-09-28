import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import firebase from '../firebase'
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Card from '@material-ui/core/Card';

export default class SignUpForm extends Component {
	constructor(){
		super()
		this.state = {
			email: '',
			password: '',
			name: ''
		}
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
		const displayName = this.state.name
		// sign up the user
		firebase.auth().createUserWithEmailAndPassword(email, pass)
			.catch(function(error){
				console.error(error)
			})
		// then login right away
		firebase.auth().signInWithEmailAndPassword(email, pass)
			.catch(function(error){
				console.error(error)
			})
		firebase.auth().onAuthStateChanged(function(user) {
			if (user) {
				user.updateProfile({displayName})
			} else {
				console.log("not logged in")
		}})
	}

	render(){
		return (
			<div style={{position: "relative"}}>
			<div style={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, 50%)"}}>
				<Card>
					<form onChange={this.handleChange}>
						<FormGroup style={{margin: "1em"}}>
							<FormControl>
								<InputLabel>Name</InputLabel>
								<Input name="name" type="text" required></Input>
							</FormControl>
							<FormControl>
								<InputLabel>E-mail</InputLabel>
								<Input name="email" type="email" required></Input>
							</FormControl>
							<FormControl>
								<InputLabel>Password</InputLabel>
								<Input name="password" type="password" required></Input>
							</FormControl>
							<br />
							<Button onClick={this.handleSubmit} type="submit">SIGNUP</Button>
							<Button><Link to="/login" replace>Back to Login</Link></Button>
						</FormGroup>
					</form>
					</Card>
				</div>
			</div>
		)
	}
}
