import React, { Component } from "react";
import Routes from "./routes";
import Navbar from "./Components/Navbar";
import Grid from "@material-ui/core/Grid";
import firebase from "./firebase";
import NewNavbar from "./Components/NewNavbar";

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      login: false,
      key: null
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.setProject = this.setProject.bind(this);
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

  setProject(key) {
    this.setState({ key });
  }

  render() {
    const user = this.state.user;
    return (
      <div>
        <Grid container>
          <Grid item xs={3}>
            <NewNavbar
              handleLogout={this.handleLogout}
              handleLogin={this.handleLogin}
              setProject={this.setProject}
            />
          </Grid>
          <Grid item xs={9}>
            <Routes
              projectKey={this.state.key}
              handleLogin={this.handleLogin}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default App;
