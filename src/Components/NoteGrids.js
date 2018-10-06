import React from "react";
import firebase from "../firebase";
import Typography from "@material-ui/core/Typography";
import { Avatar } from "@material-ui/core";
import Paper from '@material-ui/core/Paper';

class NoteGrids extends React.Component {
  constructor() {
    super();
    this.state = {
      notes: [],
      open: false
    };
    this.deleteNote = this.deleteNote.bind(this);
	}

	componentDidMount(){
		if (this.props.notes) {
			this.setState({
				notes: this.props.notes
			})
		}
	}

	componentDidUpdate(prevProps){
		const props = this.props
		if (prevProps.notes !== props.notes) {
			this.setState({
				notes: props.notes
			})
		}
	}

  deleteNote(key) {
    return firebase.database().ref("notes").child(key).remove();
  }

  render() {
    const notes = this.state.notes;
    return (
      <div>
          {notes.map(note => (
            <Paper key={note.key} style={{display: 'flex', margin: 10, padding: 10}}>
							<Avatar style={{ width: 15, height: 15, padding: 10, marginRight: 10, backgroundColor: `#${note.color}`}} />
							<Typography>{note.content}</Typography>
							<Avatar
								style={{ width: 15, height: 15, position: 'absolute', right: 20, color: 'grey', backgroundColor: 'white'}}
								onClick={() => this.deleteNote(note.key)}
							>
								x
							</Avatar>
						</Paper>
          ))}
        </div>
    );
  }
}


export default NoteGrids;
