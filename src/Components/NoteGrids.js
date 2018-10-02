import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const NoteGrids = props => {
  const notes = props.notes;
  console.log('Notes', notes);
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell />
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          {notes.map(note => {
            console.log('NOTE', note);
            return (
              <TableCell>
                {note.content}
                <IconButton
                  // key={id}
                  aria-label="Delete"
                  disabled
                  color="primary"
                >
                  <DeleteIcon onClick={props.handleDelete()} />
                </IconButton>
              </TableCell>
            );
          })}
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default NoteGrids;
