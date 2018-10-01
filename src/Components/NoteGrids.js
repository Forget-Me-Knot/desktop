import React from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const NoteGrids = (props) => {
	const notes = props.notes
	console.log(notes)
	return(
		<Table>
			<TableHead>
				<TableRow>
					<TableCell></TableCell>
				</TableRow>
			</TableHead>
			<TableBody>
				<TableRow>
					{notes.map(note => (
						<TableCell key={note.content}>
							{note.content}
						</TableCell>
					))}
				</TableRow>
			</TableBody>
		</Table>
	)
}

export default NoteGrids
