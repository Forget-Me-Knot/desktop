import React from 'react';
import Divider from '@material-ui/core/Divider';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

//CANT GET NOTES TO WRAP
const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    margin: 20,
    width: 400,
    heigth: 400,
  },
  button: {
    margin: theme.spacing.unit,
  },
  box: {
    display: 'flex',
  },
});

const NoteGrids = props => {
  const { classes } = props;
  const notes = props.notes;

  return (
    // <Table>
    //   <TableHead>
    //     <TableRow>
    //       <TableCell />
    //     </TableRow>
    //   </TableHead>
    //   <TableBody>
    //     <TableRow>
    <div className={classes.box}>
      {notes.map(note => (
        <Paper
          className={classes.root}
          elevation={4}
          square={false}
          key={note.content + Math.random() * 1000}
        >
          <center>
            <Typography component="h3">{note.content}</Typography>
            <IconButton
              className={classes.button}
              aria-label="Delete"
              disabled
              color="primary"
              onClick={props.handleDelete(note.uid)}
            >
              <DeleteIcon />
            </IconButton>
          </center>
        </Paper>
      ))}
    </div>

    //     </TableRow>
    //   </TableBody>
    // </Table>
  );
};

NoteGrids.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NoteGrids);
