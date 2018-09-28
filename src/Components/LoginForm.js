import React, { Component } from 'react';
import firebase from '../firebase';

export default class LoginForm extends Component {
  constructor() {
    super();
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const email = this.state.email;
    const pass = this.state.password;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, pass)
      .catch(function(error) {
        console.error(error);
      });
    console.log('logged in');
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
        Email: <input type="email" name="email" />
        Password: <input type="password" name="password" />
        <button type="submit">LOGIN</button>
      </form>
    );
  }
}
