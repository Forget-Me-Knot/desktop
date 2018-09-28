import React, { Component } from 'react';
import firebase from '../firebase'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Card from '@material-ui/core/Card';

export default class LoginForm extends Component {
	constructor(){
		super()
		this.state = {
			email: '',
			password: ''
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
		if (email !== '' && pass !== '') {
			firebase.auth().signInWithEmailAndPassword(email, pass)
			.catch(function(error){
				console.error(error)
			})
		}
	}

	render(){
		return (
			<div style={{position: "relative"}}>
				<div style={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, 50%)"}}>
					<Card>
						<form onChange={this.handleChange}>
							<FormGroup style={{margin: "1em"}}>
								<FormControl>
									<InputLabel>E-mail</InputLabel>
									<Input name="email" type="email" required></Input>
								</FormControl>
								<FormControl>
									<InputLabel>Password</InputLabel>
									<Input name="password" type="password" required></Input>
								</FormControl>
								<br />
								<Button onClick={this.handleSubmit} type="submit">LOGIN</Button>
								<Button><Link style={{ textDecoration: 'none'}} to="/signup" replace>Sign up as a new user</Link></Button>
							</FormGroup>
						</form>
					</Card>
				</div>
			</div>
		)
	}
}
