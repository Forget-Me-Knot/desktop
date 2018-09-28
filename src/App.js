import React, { Component } from 'react';
import NavBar from './Components/Navbar'
import ProjectBar from './Components/ProjectBar'
import Home from './Components/Home'
import Grid from '@material-ui/core/Grid';

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
			<Grid container>
				<Grid item xs={3}>
					<Grid container>
						<Grid item xs={2}>
							<NavBar />
						</Grid>
						<Grid item xs={2}>
							<ProjectBar />
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={9}>
					<Home />
				</Grid>
			</Grid>
    );
  }
}

export default App;
