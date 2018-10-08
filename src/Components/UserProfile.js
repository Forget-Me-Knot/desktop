import React, { Component } from "react";
import Divider from "@material-ui/core/Divider";
import AddIcon from "@material-ui/icons/Add";
import { Avatar, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from "@material-ui/core/IconButton";
import RemoveCircle from "@material-ui/icons/RemoveCircle";

import firebase from "../firebase";

export default class UserProfile extends Component {
  constructor() {
    super();
    this.state = {
      projects: [] || null,
      user: {},
      login: null
    };
    this.deleteProject = this.deleteProject.bind(this);
  }

  componentDidMount() {
    const self = this;
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        self.setState({ user });

        const ref = firebase.database().ref();
        ref.on("value", function(snapshot) {
					let userProjects = [];
					const users = snapshot.val().users;
          const projects = snapshot.val().projects;
          for (let key in projects) {
            if (projects[key].members) {
              const members = projects[key].members;
              const name = projects[key].name;
              const color = projects[key].color;
              if (members.includes(user.email)) {
                userProjects.push({ name, key, color, members });
              }
            }
					}
					for(let id in users) {
						if (id === user.uid) self.setState({name: users[id].displayName})
					}
          self.setState({ projects: userProjects });
        });
      }
    });
  }
  componentDidUpdate(prevProps) {
    const props = this.props;
    if (prevProps.projects !== props.projects) {
      this.setState({
        projects: props.projects
      });
    }
  }
  deleteProject(key) {
    return firebase
      .database()
      .ref("projects")
      .child(key)
      .remove();
  }

  render() {
		const { projects, user, name } = this.state;
    return (
      <div>
				<Paper>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Name</TableCell>
							<TableCell>E-mail</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						<TableRow>
							<TableCell>{name}</TableCell>
							<TableCell>{user.email}</TableCell>
						</TableRow>
					</TableBody>
				</Table>
				<Divider />
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Projects</TableCell>
							<TableCell> </TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
					{projects ? (
              projects.map(item => (
								<TableRow>
                <TableCell key={item.key}>
                  <Avatar
                    style={{
											float: 'left',
                      backgroundColor: `#${item.color}`,
                      width: "30px",
											height: "30px",
											marginRight: 10
                    }}
                  />
									<span style={{float: 'left', marginTop: 5}}>{item.name}</span>
									</TableCell>
									<TableCell>
                  <IconButton
                    aria-label="Delete"
                    style={{ float: "right" }}
                    onClick={() => this.deleteProject(item.key)}
                  >
                    <RemoveCircle />
                  </IconButton>
                </TableCell>
								</TableRow>
              ))
            ) : (
              <TableRow>
								<TableCell>No projects.</TableCell>
								<TableCell> </TableCell>
							</TableRow>
            )}
					</TableBody>
				</Table>
					<Divider />

          <Link to="/addproject" replace>
            <Button
              aria-label="Add"
              style={{
								backgroundColor: "mediumpurple",
								margin: 10
              }}
              onClick={() => console.log("hi there")}
            >
              <AddIcon />
              add new project
            </Button>
          </Link>
				</Paper>
        </div>
    );
  }
}
