import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Components/Home";
import LoginForm from "./Components/LoginForm";
import SignUpForm from "./Components/SignUpForm";
import NoteGrids from "./Components/NoteGrids";
import Calendar from "./Components/Calendar";
import Todos from "./Components/Todos";
import SingleProject from "./Components/SingleProject";
import PhotoGrid from "./Components/PhotoGrid";
import CreateProject from "./Components/CreateProject";
import firebase from "./firebase";
import CreateEvent from "./Components/CreateEvent";

const renderMergedProps = (component, ...rest) => {
  const finalprops = Object.assign({}, ...rest);
  return React.createElement(component, finalprops);
};

const PropsRoute = ({ component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={routeProps => {
        return renderMergedProps(component, routeProps, rest);
      }}
    />
  );
};

export default class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }
  componentDidMount() {
    const newUser = firebase.auth().currentUser;
    this.setState({
      user: newUser
    });
  }
  render() {
    const key = this.props.projectKey;
    return (
      <Switch>
        <PropsRoute path="/notes" component={NoteGrids} projectKey={key} />
        <PropsRoute exact path="/" component={Home} projectKey={key} />
        <PropsRoute path="/calendar" component={Calendar} projectKey={key} />
        <PropsRoute path="/AddEvent" component={CreateEvent} projectKey={key} />
        <PropsRoute path="/todos" component={Todos} projectKey={key} />
        <PropsRoute
          path="/project"
          component={SingleProject}
          projectKey={key}
        />
        <PropsRoute path="/photoBook" component={PhotoGrid} projectKey={key} />
        <PropsRoute
          path="/addproject"
          component={CreateProject}
          projectKey={key}
        />
        <Route
          path="/login"
          render={() => (
            <LoginForm handleLogin={this.props.handleLogin} test="test" />
          )}
        />
        <Route path="/signup" component={SignUpForm} />
      </Switch>
    );
  }
}
