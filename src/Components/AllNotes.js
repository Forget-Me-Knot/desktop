import React, { Component } from 'react'
import firebase from '../firebase'
import NoteGrids from './NoteGrids'

// Only loads current logged in user's notes
export default class AllNotes extends Component {
	constructor(){
		super()
		this.state = {}
	}

	componentDidMount(){
		const user = firebase.auth().currentUser
		let myNotes = []
		if (user) {
			var ref = firebase.database().ref('notes');
			ref.on("value", function(snapshot) {
				let notes = snapshot.val()
				for(var key in notes){
					if(notes[key].author === user.uid){
						myNotes.push(notes[key])
					}
				}
			}, function (error) {
			 console.log("Error: " + error.code);
			});
		}
		this.setState({myNotes})
	}

	render(){
		const notes = this.state.myNotes
		return (
			<div>
				{notes ? <NoteGrids notes={notes} /> : null}
			</div>
		)
	}
}
