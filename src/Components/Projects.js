import React from "react";
import firebase from "../firebase";
import Button from "@material-ui/core/Button";

export default class Project extends React.Component {
  constructor() {
    super();
    this.state = {
      projects: []
    };
  }
  componentDidMount() {
    console.log("Projects in ComponentDidMount: ", this.state.projects);
    let self = this;
    let projectsVal;
    let projectsArr;
    const ref = firebase.database().ref("projects/");
    ref.on("value", snap => {
      projectsArr = [];
      projectsVal = snap.val();
      console.log("ProjectVal: ", projectsVal);
      for (var key in projectsVal) {
        projectsArr.push(projectsVal[key].name);
      }
      console.log("Projects Array: ", projectsArr);
      self.setState({
        projects: projectsArr
      });
    });
    return projectsArr;
  }
  render() {
    console.log("Projects: ", this.state.projects);
    return (
      <div>
        {this.state.projects
          ? this.state.projects.map(project => {
              <Button>{project}</Button>;
            })
          : null}
      </div>
    );
  }
}
