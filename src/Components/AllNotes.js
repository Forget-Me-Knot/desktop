import React, { Component } from 'react'
import firebase from '../firebase'

// Only loads current logged in user's notes
export default class AllNotes extends Component {
	constructor(){
		super()
		this.state = {}
	}

	componentDidMount(){
		const user = firebase.auth().currentUser
		if (user) {
			var ref = firebase.database().ref('notes');
			let myNotes = []
			ref.on("value", function(snapshot) {
				let notes = snapshot.val()
				for(var key in notes){
					if(notes[key].author === user.uid){
						myNotes.push(notes[key].content)
					}
				}
				this.setState({
					myNotes
				})
			}, function (error) {
			 console.log("Error: " + error.code);
			});
		}
	}

	render(){
		const notes = this.state.myNotes
		return (
			<div>
				{notes ? notes.map(note => <p>{note}</p>) : null}
			</div>
		)
	}
}
