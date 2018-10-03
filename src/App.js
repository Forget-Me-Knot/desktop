import React, { Component } from "react";
import Routes from "./routes";
import NavBar from "./Components/Navbar";
import ProjectBar from "./Components/ProjectBar";
import Grid from "@material-ui/core/Grid";
//import { gotUser } from './store/user';
import firebase from "./firebase";
//import { connect } from 'react-redux';

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      login: false
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
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

  render() {
    const user = this.state.user;
    return (
      <div>
        <Grid container>
          <Grid item xs={3}>
            <Grid container>
              <Grid item xs={2}>
                <NavBar handleLogout={this.handleLogout} />
              </Grid>
              <Grid item xs={2}>
                {firebase.auth().currentUser ? (
                  <ProjectBar />
                ) : (
                  <h1>Login for the love!</h1>
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={9}>
            <Routes handleLogin={this.handleLogin} />
          </Grid>
        </Grid>
      </div>
    );
  }
}

// const mapStateToProps = state => {
//   return {
//     user: state.user.currentUser,
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     getUser: () => dispatch(gotUser()),
//   };
// };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(App);

export default App;
