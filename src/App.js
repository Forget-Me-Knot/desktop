import React, { Component } from "react";
import Routes from "./routes";
import Navbar from "./Components/Navbar";
import Grid from "@material-ui/core/Grid";
import firebase from "./firebase";
import NewNavbar from './Components/NewNavbar'

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      login: false
    };
    this.handleLogin = this.handleLogin.bind(this);
		this.handleLogout = this.handleLogout.bind(this);
		this.setProject = this.setProject.bind(this)
  }

  handleLogin(user) {
    this.setState({
      user: user,
      login: true
    });
  }

  handleLogout() {
    this.setState({
      user: {},
      login: false
    });
	}

	setProject(key){
		this.setState({key})
	}

  render() {
		const user = this.state.user;
    return (
      <div>
        <div
					style={{position: 'absolute', left: 0, width: 78, height: '100%'}}
				>
                <NewNavbar
                  handleLogout={this.handleLogout}
									handleLogin={this.handleLogin}
									setProject={this.setProject}
                />
          </div>
          <div
						style={{position: 'absolute', left: 80, width: 922, height: '100%', padding: 10}}
					>
            <Routes
							projectKey={this.state.key}
							handleLogin={this.handleLogin}
						/>
          </div>
      </div>
    );
  }
}

export default App;
