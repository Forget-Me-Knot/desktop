import React, { Component } from 'react'
import LoginForm from './LoginForm';
import firebase from '../firebase'

export default class Home extends Component {
	constructor(){
		super()
		this.logOut = this.logOut.bind(this)
	}

	logOut(){
		firebase.auth().signOut().then(function() {
			console.log('Sign out!')
			console.log(firebase.auth().currentUser)
		}, function(error){
			console.error(error)
		})
	}

	render(){
		return(
			<div style={{position: "relative"}}>
				<div style={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, 50%)"}}>
					<LoginForm />
				</div>
				<button onClick={this.logOut}>LOGOUT</button>
			</div>
		)
	}
}
