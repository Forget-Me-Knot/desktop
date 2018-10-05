import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import firebase from "../firebase";
import { withStyles } from "@material-ui/core/styles";

// import Typography from '@material-ui/core/Typography';
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import { lighten } from "@material-ui/core/styles/colorManipulator";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import { Typography } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import { Avatar } from "@material-ui/core";
import RemoveCircle from "@material-ui/icons/RemoveCircle";

const tasks = [
  { key: "12341", text: "take out garbage", project: "life" },
  { key: "1233341", text: "get milk", project: "life" },
  { key: "123461", text: "pay rent", project: "life" },
  { key: "123941", text: "code something fabulous!", project: "capstone" }
];
class ToDo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedA: true,
      checkedB: true,
      checkedF: true
    };
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };
  // deleteTask(key) {
  //   return firebase
  //     .database()
  //     .ref("notes")
  //     .child(key)
  //     .remove();
  // }

  render() {
    return (
      <div style={{ position: "relative" }}>
        <div
          style={{
            position: "absolute",
            top: "20%",
            left: "20%",
            transform: "translate(-50%, 40%)"
          }}
        >
          <Typography>To DO </Typography>
          <Divider />
          <ul>
            {tasks.map(item => (
              <li
                key={item.key}
                style={{ display: "flex", flexdirection: "row-wrap" }}
              >
                <Checkbox
                  label={item.key}
                  checked={this.state.checked}
                  primary
                  value="agree"
                  // onCheck={checked => this.setState({ checked })}
                  onChange={this.handleChange("checkedA")}
                />
                <Typography variant="title">{item.text}</Typography>
                <Typography varient="subheading" alignleft>
                  ||project:
                  {item.project}
                </Typography>

                <Avatar
                  rounded
                  style={{
                    // backgroundColor: `#${project.color}`,
                    backgroundColor: "lavender",
                    width: "15px",
                    height: "15px",
                    float: "right"
                    // marginRight: "auto",
                    // marginLeft: "auto"
                  }}
                />
                <IconButton
                  aria-label="Delete"
                  color="grey"
                  disabled
                  style={{ float: "right" }}
                  onClick={() => this.deleteTask(item.key)}
                >
                  <RemoveCircle />
                </IconButton>
                <Divider />
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
export default ToDo;

// class EnhancedTableHead extends React.Component {
//   createSortHandler = property => event => {
//     this.props.onRequestSort(event, property);
//   };

// render() {
//   const {
//     onSelectAllClick,
//     order,
//     orderBy,
//     numSelected,
//     rowCount,
//   } = this.props;

//   return (
//     <TableHead>
//       <TableRow>
//         <TableCell padding="checkbox">
//           <Checkbox
//             indeterminate={numSelected > 0 && numSelected < rowCount}
//             checked={numSelected === rowCount}
//             onChange={onSelectAllClick}
//           />
//         </TableCell>
//         {rows.map(row => {
//           return (
//             <TableCell
//               key={row.id}
//               numeric={row.numeric}
//               padding={row.disablePadding ? 'none' : 'default'}
//               sortDirection={orderBy === row.id ? order : false}
//             >
//               <Tooltip
//                 title="Sort"
//                 placement={row.numeric ? 'bottom-end' : 'bottom-start'}
//                 enterDelay={300}
//               >
//                 <TableSortLabel
//                   active={orderBy === row.id}
//                   direction={order}
//                   onClick={this.createSortHandler(row.id)}
//                 >
//                   {row.label}
//                 </TableSortLabel>
//               </Tooltip>
//             </TableCell>
//           );
//         }, this)}
//       </TableRow>
//     </TableHead>
//     );
//   }
// }

// EnhancedTableHead.propTypes = {
//   numSelected: PropTypes.number.isRequired,
//   onRequestSort: PropTypes.func.isRequired,
//   onSelectAllClick: PropTypes.func.isRequired,
//   order: PropTypes.string.isRequired,
//   orderBy: PropTypes.string.isRequired,
//   rowCount: PropTypes.number.isRequired,
// };

// const toolbarStyles = theme => ({
//   root: {
//     paddingRight: theme.spacing.unit,
//   },
//   highlight:
//     theme.palette.type === 'light'
//       ? {
//           color: theme.palette.secondary.main,
//           backgroundColor: lighten(theme.palette.secondary.light, 0.85),
//         }
//       : {
//           color: theme.palette.text.primary,
//           backgroundColor: theme.palette.secondary.dark,
//         },
//   spacer: {
//     flex: '1 1 100%',
//   },
//   actions: {
//     color: theme.palette.text.secondary,
//   },
//   title: {
//     flex: '0 0 auto',
//   },
// });

// let EnhancedTableToolbar = props => {
//   const { numSelected, classes } = props;

//   return (
//     <Toolbar
//       className={classNames(classes.root, {
//         [classes.highlight]: numSelected > 0,
//       })}
//     >
//       <div className={classes.title}>
//         {numSelected > 0 ? (
//           <Typography color="inherit" variant="subheading">
//             {numSelected} selected
//           </Typography>
//         ) : (
//           <Typography variant="title" id="tableTitle">
//             To-Do List
//           </Typography>
//         )}
//       </div>
//       <div className={classes.spacer} />
//       <div className={classes.actions}>
//         {numSelected > 0 ? (
//           <Tooltip title="Delete">
//             <IconButton aria-label="Delete">
//               <DeleteIcon />
//             </IconButton>
//           </Tooltip>
//         ) : (
//           <Tooltip title="Filter list">
//             <IconButton aria-label="Filter list">
//               <FilterListIcon />
//             </IconButton>
//           </Tooltip>
//         )}
//       </div>
//     </Toolbar>
//   );
// };

// EnhancedTableToolbar.propTypes = {
//   classes: PropTypes.object.isRequired,
//   numSelected: PropTypes.number.isRequired,
// };

// EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

// const styles = theme => ({
//   root: {
//     width: '100%',
//     marginTop: theme.spacing.unit * 3,
//   },
//   table: {
//     minWidth: 200,
//   },
//   tableWrapper: {
//     overflowX: 'auto',
//   },
// });

// class EnhancedTable extends React.Component {
//   state = {
//     order: 'asc',
//     orderBy: 'calories',
//     selected: [],
//     data: [createData()],
//     page: 0,
//     rowsPerPage: 10,
//     task: '',
//     assigned: '',
//     open: false,
//   };

//   componentDidMount() {
//     let myTasks;
//     var ref = firebase.database().ref('tasks');
//     var self = this;
//     ref.on('value', function(snapshot) {
//       myTasks = [];
//       let tasks = snapshot.val();
//       for (var key in tasks) {
//         myTasks.push(tasks[key]);
//       }
//       myTasks.map(task => {
//         self.setState({ data: [createData(task.content, task.assigned)] });
//       });
//     });
//   }

//   handleRequestSort = (event, property) => {
//     const orderBy = property;
//     let order = 'desc';

//     if (this.state.orderBy === property && this.state.order === 'desc') {
//       order = 'asc';
//     }

//     this.setState({ order, orderBy });
//   };

//   handleSelectAllClick = event => {
//     if (event.target.checked) {
//       this.setState(state => ({ selected: state.data.map(n => n.id) }));
//       return;
//     }
//     this.setState({ selected: [] });
//   };

//   handleClick = (event, id) => {
//     const { selected } = this.state;
//     const selectedIndex = selected.indexOf(id);
//     let newSelected = [];

//     if (selectedIndex === -1) {
//       newSelected = newSelected.concat(selected, id);
//     } else if (selectedIndex === 0) {
//       newSelected = newSelected.concat(selected.slice(1));
//     } else if (selectedIndex === selected.length - 1) {
//       newSelected = newSelected.concat(selected.slice(0, -1));
//     } else if (selectedIndex > 0) {
//       newSelected = newSelected.concat(
//         selected.slice(0, selectedIndex),
//         selected.slice(selectedIndex + 1)
//       );
//     }

//     this.setState({ selected: newSelected });
//   };

//   handleChangePage = (event, page) => {
//     this.setState({ page });
//   };

//   handleChangeRowsPerPage = event => {
//     this.setState({ rowsPerPage: event.target.value });
//   };

//   handleOpen = () => {
//     this.setState({ open: true });
//   };

//   handleClose = () => {
//     this.setState({ open: false });
//   };

//   handleChange = event => {
//     this.setState({
//       [event.target.name]: [event.target.value],
//     });
//   };

//   handleSubmit = event => {
//     event.preventDefault();
//     const assigned = this.state.assigned[0];
//     const content = this.state.task[0];
//     const taskid = new Date().getTime();
//     firebase
//       .database()
//       .ref('tasks/' + taskid)
//       .set({
//         assigned: assigned,
//         content: content,
//       });
//     this.setState({
//       open: false,
//     });
//   };

//   isSelected = id => this.state.selected.indexOf(id) !== -1;

//   render() {
//     const { classes } = this.props;
//     const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
//     const emptyRows =
//       rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

//     return (
//       <div>
//         <Button
//           variant="fab"
//           mini
//           color="primary"
//           aria-label="Add"
//           onClick={this.handleOpen}
//         >
//           <AddIcon />
//         </Button>
//         <Dialog
//           open={this.state.open}
//           onClose={this.handleClose}
//           aria-labelledby="form-dialog-title"
//         >
//           <DialogTitle id="form-dialog-title">Add a new task</DialogTitle>
//           <DialogContent>
//             <form onChange={this.handleChange}>
//               <TextField
//                 autoFocus
//                 margin="dense"
//                 name="task"
//                 type="text"
//                 placeholder="task"
//                 fullWidth
//               />
//               <TextField
//                 autoFocus
//                 margin="dense"
//                 name="assigned"
//                 type="text"
//                 placeholder="assigned"
//                 fullWidth
//               />
//             </form>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={this.handleClose} color="primary">
//               Cancel
//             </Button>
//             <Button onClick={this.handleSubmit} color="primary">
//               Post
//             </Button>
//           </DialogActions>
//         </Dialog>
//         <Paper className={classes.root}>
//           <EnhancedTableToolbar numSelected={selected.length} />
//           <div className={classes.tableWrapper}>
//             <Table className={classes.table} aria-labelledby="tableTitle">
//               <EnhancedTableHead
//                 numSelected={selected.length}
//                 order={order}
//                 orderBy={orderBy}
//                 onSelectAllClick={this.handleSelectAllClick}
//                 onRequestSort={this.handleRequestSort}
//                 rowCount={data.length}
//               />
//               <TableBody>
//                 {stableSort(data, getSorting(order, orderBy))
//                   .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                   .map(n => {
//                     const isSelected = this.isSelected(n.id);
//                     return (
//                       <TableRow
//                         hover
//                         onClick={event => this.handleClick(event, n.id)}
//                         role="checkbox"
//                         aria-checked={isSelected}
//                         tabIndex={-1}
//                         key={n.id}
//                         selected={isSelected}
//                       >
//                         <TableCell padding="checkbox">
//                           <Checkbox checked={isSelected} />
//                         </TableCell>
//                         <TableCell component="th" scope="row" padding="none">
//                           {n.name}
//                         </TableCell>
//                         {/* <TableCell numeric>{n.assigned}</TableCell>
//                         <TableCell numeric>{n.date}</TableCell> */}
//                       </TableRow>
//                     );
//                   })}
//                 {emptyRows > 0 && (
//                   <TableRow style={{ height: 49 * emptyRows }}>
//                     <TableCell colSpan={6} />
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </div>
//           <TablePagination
//             component="div"
//             count={data.length}
//             rowsPerPage={rowsPerPage}
//             page={page}
//             backIconButtonProps={{
//               'aria-label': 'Previous Page',
//             }}
//             nextIconButtonProps={{
//               'aria-label': 'Next Page',
//             }}
//             onChangePage={this.handleChangePage}
//             onChangeRowsPerPage={this.handleChangeRowsPerPage}
//           />
//         </Paper>
//       </div>
//     );
//   }
// }

// EnhancedTable.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

// export default withStyles(styles)(EnhancedTable);
