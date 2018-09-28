import React, { Component } from 'react';
import LoginForm from './Components/LoginForm';
import SignUpForm from './Components/SignUpForm';
import NoteForm from './Components/NoteForm';
import AllNotes from './Components/AllNotes';
import Navbar from './Components/Navbar';
import { connect } from 'react-redux';
import getUser from './store';

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div className="App">
        <Navbar />
        <div>
          <h3>Sign Up</h3>
          <SignUpForm />
          <br />
          <h3>Login</h3>
          <LoginForm />
          <br />
          <h3>Post your notes</h3>
          <NoteForm />
          <br />
          <AllNotes />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.currentUser,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUser: () => dispatch(getUser()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
