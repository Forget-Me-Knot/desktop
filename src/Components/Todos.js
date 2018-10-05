import React, { Component } from "react";
import firebase from "../firebase";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import CreateTodo from './CreateTodo'

export default class ToDo extends Component {
  constructor(props) {
    super(props);
		this.state = {};
		this.makeList = this.makeList.bind(this)
		this.handleClick = this.handleClick.bind(this)
	}

	componentDidMount(){
		var self = this
		firebase.auth().onAuthStateChanged(function(user){
			if (user) {
				const ref = firebase.database().ref()
				ref.on('value', function(snapshot) {
					const tasks = snapshot.val().tasks
					const projects = snapshot.val().projects

					let myProjects = []
					let colors = {}
					let myTasks = []
					for (var key in projects) {
						if (projects[key].members.includes(user.email)) {
							myProjects.push(key)
							colors[key] = projects[key].color
						}
					}
					for (var id in tasks) {
						if (myProjects.includes(tasks[id].projectId + '')) {
							myTasks.push({...tasks[id], key: id, color: colors[tasks[id].projectId]})
							self.setState({[id]: tasks[id].completed})
						}
					}
					self.setState({tasks: myTasks})
				})
			}
		})
	}

	handleClick(key){
		firebase.database().ref('tasks/' + key).update({
			completed: !this.state[key]
		})
		this.setState({[key]: !this.state[key]})
	}

	makeList(tasks){
		return tasks.map(task => (
			<ListItem key={task.key}>
				<Checkbox
					checked={this.state[task.key]}
					onClick={() => this.handleClick(task.key)}
				/>
				<ListItemText primary={task.content} style={ this.state[task.key] ? {textDecoration: 'line-through'} : null} />
				<Avatar style={{backgroundColor: '#'+task.color, fontSize: '0.8rem'}} >{task.assigned}</Avatar>
			</ListItem>
		))
	}

  render() {
		const tasks = this.state.tasks
    return (
			<div>
				<CreateTodo />
				<List>
					{tasks ? this.makeList(tasks) : null}
				</List>
			</div>
    );
  }
}
