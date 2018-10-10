import React, { Component } from 'react'
import firebase from '../firebase'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';

export default class CreateProject extends Component {
	constructor(){
		super()
		this.state = {
			name: '',
			members: ''
		}
		this.randomColor = this.randomColor.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}

	randomColor() {
    let colors = [
			'6affad',
			'bb1f4b',
			'9cc2e9',
			'16941f',
			'6c1694',
			'ff6c00',
			'd88383',
			'b5ed7e',
			'7e9bed',
			'a294b7',
			'b3feff',
			'e2a9a9',
			'f8e4a0',
			'8f11e0',
			'c04d4d'
    ];
    let n = Math.floor(Math.random() * colors.length);
    return colors[n];
	}

	handleSubmit(event){
		event.preventDefault()
		const self = this
		const name = this.state.name
		const members = this.state.members
		const color = this.randomColor()
		firebase.auth().onAuthStateChanged(function(user){
			const currentUser = user.email
			const newKey = firebase.database().ref('projects/').push().key
			firebase.database().ref('projects/' + newKey)
				.set({
					name,
					color,
					members: members ? [currentUser, ...members.split(',')] : [currentUser]
				})
				.then(function(){
					self.setState({name: '', members: ''})
				})
		})
	}

	handleChange(event){
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	render(){
		return (
			<Card style={{margin: '1em'}}>
				<form
					onSubmit={event => this.handleSubmit(event)}
					onChange={event => this.handleChange(event)}
					style={{margin: '1em'}}
				>
					<TextField
						label="Project Name"
						name="name"
						value={this.state.name}
						fullWidth
					/>
					<TextField
						label="Members (email)"
						name="members"
						value={this.state.members}
						helperText="use ',' to add more than one"
						fullWidth
					/>
					<Button type="submit" fullWidth>Create</Button>
				</form>
			</Card>
		)
	}
}
