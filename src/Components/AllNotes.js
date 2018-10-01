import React, { Component } from 'react'
import firebase from '../firebase'
import NoteGrids from './NoteGrids'
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

// Only loads current logged in user's notes
export default class AllNotes extends Component {
	constructor(){
		super()
		this.state = {
			myNotes: [],
			open: false
		}
		this.handleClose = this.handleClose.bind(this)
		this.handleOpen = this.handleOpen.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
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

	handleOpen(){
		this.setState({
			open: true
		})
	}

	handleClose(){
		this.setState({
			open: false
		})
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
		this.setState({
			open: false
		})
	}

	render(){
		const notes = this.state.myNotes
		return (
			<div>
				<Button variant="fab" color="primary" aria-label="Add" onClick={this.handleOpen}>
        	<AddIcon />
      	</Button>
				<Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Add a new note</DialogTitle>
          <DialogContent>
						<form onChange={this.handleChange}>
							<TextField autoFocus margin="dense"
								name="note" type="text" fullWidth
							/>
						</form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Post
            </Button>
          </DialogActions>
        </Dialog>

				{notes ? <NoteGrids notes={notes} /> : null}
			</div>
		)
	}
}
