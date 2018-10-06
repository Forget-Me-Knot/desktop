import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import firebase from "../firebase";
import Card from "@material-ui/core/Card";
import FormGroup from "@material-ui/core/FormGroup";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  }
});

class CreateEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this)
	}

	handleChange(event){
		this.setState({
			[event.target.name]: event.target.value
		})
	}

  handleSubmit() {
    const self = this;
    const name = this.state.eventName;
    const projectId = this.props.projectId;

		const getDate = this.state.date
		const dateString = getDate.substring(0, 10)
		const year = parseInt(dateString.split('-')[0])
		const month = parseInt(dateString.split('-')[1])
		const day = parseInt(dateString.split('-')[2])

    const newKey = firebase.database().ref('events').push().key;

		const ref = firebase.database().ref('projects')
		ref.on('value', function(snapshot){
			let color
			const projects = snapshot.val()
			for (var key in projects) {
				if (key + '' === projectId + '') color = projects[key].color
			}
			let event = {
				date: {
					dateString, year, month, day
				},
				projectId, name, color
			};
			firebase.database().ref("events")
      	.child(newKey).set(event);
    	self.setState({ date: "", eventName: "" });
		})
  }
  render() {
    return (
      <Card style={{ margin: 10 }}>
				<form onChange={this.handleChange}>
        <FormGroup style={{ padding: 10 }}>
          <div style={{ marginBottom: 10 }}>
            <Typography variant="headline" align="center">
              Tell us about this new thing!
            </Typography>
            <div>
              <TextField
                required
								id="standard-with-placeholder"
                label="Event name"
                placeholder="New Event Title"
                className={styles.textField}
								margin="normal"
								name="eventName"
              />
            </div>
            <div>
              <TextField
                id="datetime-local"
                label="Event date and time"
                type="datetime-local"
                defaultValue="2018-07-21T09:30"
                className={styles.textField}
                InputLabelProps={{
                  shrink: true
								}}
								name="date"
              />
            </div>
          </div>
          <Button variant="outlined" onClick={() => this.handleSubmit()}>
            SUBMIT
          </Button>
        </FormGroup>
				</form>
      </Card>
    );
  }
}

CreateEvent.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CreateEvent);
