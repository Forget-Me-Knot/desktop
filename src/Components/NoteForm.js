import React, { Component } from 'react';
import firebase from '../firebase';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Card from '@material-ui/core/Card';

export default class NoteForm extends Component {
  constructor() {
    super();
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    if (!firebase.auth().currentUser) {
      console.log('NOT LOGGED IN');
    } else {
      console.log(firebase.auth().currentUser.displayName);
    }
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const user = firebase.auth().currentUser;
    const noteid = Math.floor(Math.random() * 100000);
    firebase
      .database()
      .ref('notes/' + noteid)
      .set({
        author: user.uid,
        content: this.state.note,
      });
    this.props.history.push('/notes');
  }

  render() {
    return (
      <div style={{ position: 'relative' }}>
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, 50%)',
          }}
        >
          <Card>
            <form onChange={this.handleChange} onSubmit={this.handleSubmit}>
              <FormGroup style={{ margin: '1em' }}>
                <FormControl>
                  <InputLabel>New Note:</InputLabel>
                  <Input name="note" type="text" required />
                </FormControl>
                <br />
                <Button onClick={this.handleSubmit} type="submit">
                  POST NOTE
                </Button>
              </FormGroup>
            </form>
          </Card>
        </div>
      </div>
    );
  }
}
