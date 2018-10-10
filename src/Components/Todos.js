import React, {Component} from 'react'
import firebase from '../firebase'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Avatar from '@material-ui/core/Avatar'
import ListItemText from '@material-ui/core/ListItemText'
import Checkbox from '@material-ui/core/Checkbox'
import IconButton from '@material-ui/core/IconButton'
import RemoveCircle from '@material-ui/icons/RemoveCircle'
import CreateTodo from './CreateTodo'
import AddIcon from '@material-ui/icons/Add'
import Button from '@material-ui/core/Button'
import {Chip} from '@material-ui/core'
import DoneIcon from '@material-ui/icons/Done'

export default class ToDo extends Component {
  constructor(props) {
    super(props)
    this.state = {formOpen: false}
    this.makeList = this.makeList.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.delete = this.delete.bind(this)
    this.openForm = this.openForm.bind(this)
  }

  componentDidMount() {
    if (this.props.tasks) this.setState({tasks: this.props.tasks})
    if (this.props.projects) this.setState({projects: this.props.projects})
  }

  componentDidUpdate(prevProps) {
    const props = this.props
    if (
      prevProps.tasks !== props.tasks ||
      prevProps.projects !== props.projects
    ) {
      this.setState({
        projects: props.projects,
        tasks: props.tasks
      })
    }
  }
  openForm() {
    if (!this.state.formOpen) {
      this.setState({formOpen: true})
    } else {
      this.setState({formOpen: false})
    }
  }
  delete(key) {
    return firebase
      .database()
      .ref('tasks')
      .child(key)
      .remove()
  }

  handleClick(key) {
    firebase
      .database()
      .ref('tasks/' + key)
      .update({
        completed: !this.state[key]
      })
    this.setState({[key]: !this.state[key]})
  }

  makeList(tasks) {
    return tasks.map(task => (
      <ListItem key={task.key}>
        <Checkbox
          checked={this.state[task.key]}
          onClick={() => this.handleClick(task.key)}
        />
        <ListItemText
          primary={task.content}
          style={this.state[task.key] ? {textDecoration: 'line-through'} : null}
        />
        <IconButton
          aria-label="Delete"
          style={{float: 'right'}}
          onClick={() => this.delete(task.key)}
        >
          <RemoveCircle />
        </IconButton>
        <Avatar style={{backgroundColor: '#' + task.color, fontSize: '0.8rem'}}>
          {task.assigned}
        </Avatar>
      </ListItem>
    ))
  }

  render() {
    const tasks = this.props.tasks
    let project = this.props.projects ? this.props.projects[0] : null
    let color = project ? '#' + project.color : null

    return (
      <div>
        {color ? (
          <div style={{marginBottom: 10}}>
            <Chip
              avatar={
                <Avatar
                  style={{
                    backgroundColor: color
                  }}
                >
                  <DoneIcon />
                </Avatar>
              }
              label={this.props.projects[0].name}
            />
          </div>
        ) : null}
        <List>{tasks ? this.makeList(tasks) : null}</List>
        <Button
          text="add a task"
          style={{
            marginTop: 35
          }}
          variant="outlined"
          onClick={() => this.openForm()}
        >
          <AddIcon />
          Add a Task
        </Button>
        <div>
          {this.state.formOpen ? (
            <CreateTodo projects={this.props.projects} />
          ) : null}
        </div>
      </div>
    )
  }
}
