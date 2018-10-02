import React, { Component } from "react";
import Routes from "./routes";
import NavBar from "./Components/Navbar";
import ProjectBar from "./Components/ProjectBar";
import Grid from "@material-ui/core/Grid";
import { gotUser } from "./store/user";
import firebase from "./firebase";
import { connect } from "react-redux";

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: {}
    };
  }
  componentDidMount() {
    this.props.getUser();
  }

  render() {
    //const user = this.props.user;
    //console.log("User: ", user);
    return (
      <div>
        <Grid container>
          <Grid item xs={3}>
            <Grid container>
              <Grid item xs={2}>
                <NavBar />
              </Grid>
              <Grid item xs={2}>
                {firebase.auth().onAuthStateChanged(user => {
                  console.log("App User: ", user);
                  if (user && user) {
                    return <ProjectBar />;
                  } else {
                    return null;
                  }
                })}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={9}>
            <Routes />
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.currentUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUser: () => dispatch(gotUser())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
