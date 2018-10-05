import React, {Component} from 'react'
import firebase from '../firebase'
import Card from '@material-ui/core/Card'
import FormGroup from '@material-ui/core/FormGroup'
import Button from '@material-ui/core/Button'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

export default class CreateTodo extends Component {
  constructor() {
    super()
    this.state = {
      loadMembers: false
    }
		this.getMembers = this.getMembers.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    const self = this
    firebase.auth().onAuthStateChanged(function(user) {
      const ref = firebase.database().ref()
      ref.on('value', function(snapshot) {
        const projects = snapshot.val().projects
        let myProjects = []
        for (var key in projects) {
          if (projects[key].members.includes(user.email)) {
            const name = projects[key].name
            const members = projects[key].members
            myProjects.push({name, members, key})
          }
        }
        self.setState({projects: myProjects})
      })
    })
  }

  getMembers(event) {
		this.setState({loadMembers: true})
		this.setState({assignProject: event.target.value})
		const self = this
    let members
		const projects = this.state.projects
    const name = event.target.value
    projects.forEach(project => {
      if (name === project.name) {
				members = project.members
				self.setState({assignProjectId: project.key})
      }
    })
    this.setState({members})
	}

	handleSubmit(){
		const self = this
		const assigned = this.state.assignMember
		const projectId = parseInt(this.state.assignProjectId)
		const content = this.state.todo
		const newKey = firebase.database().ref('tasks/').push().key
		const ref = firebase.database().ref('users')
		ref.on('value', function(snapshot) {
			const users = snapshot.val()
			let task
			for(var key in users){
				if(users[key].email === assigned) {
					task = {
						projectId,
						assigned: users[key].displayName,
						completed: false,
						content
					}
				}
			}
			firebase.database().ref('tasks').child(newKey).set(task)
			self.setState({
				todo: "", assignMember: "", assignProject: ""
			})
		})
	}

  render() {
    const projects = this.state.projects
		const members = this.state.members
		const self = this
    return (
      <Card style={{margin: 10}}>
        <FormGroup style={{padding: 10}}>
          <div style={{marginBottom: 10}}>
            <InputLabel>Task</InputLabel>
            <Input fullWidth onChange={event => this.setState({todo: event.target.value})} />
          </div>
          <div style={{marginBottom: 10}}>
            <InputLabel>Project</InputLabel>
						<Select fullWidth
							onChange={
								function(event){
									self.getMembers(event)
								}
							}
							value={this.state.assignProject}
						>
              {projects ? (
                projects.map(project => (
                  <MenuItem key={project.key} value={project.name}>
                    {project.name}
                  </MenuItem>
                ))
              ) : (
                <MenuItem>No project available.</MenuItem>
              )}
            </Select>
          </div>
          {this.state.loadMembers ? (
            <div style={{marginBottom: 10}}>
              <InputLabel>Assign to</InputLabel>
              <Select
                fullWidth
                onChange={event =>
                  this.setState({assignMember: event.target.value})
								}
								value={this.state.assignMember}
              >
                {members ? (
                  members.map(member => (
                    <MenuItem key={member} value={member}>
                      {member}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem>No members in this project.</MenuItem>
                )}
              </Select>
            </div>
					) : null}
					<Button onClick={() => this.handleSubmit()}>SUBMIT</Button>
        </FormGroup>
      </Card>
    )
  }
}
