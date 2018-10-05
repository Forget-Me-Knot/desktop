import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import NoteGrids from "./NoteGrids";
// import TabContainer from "@material-ui/core/TabContainer";
import Typography from "@material-ui/core/Typography";
import Todos from "./Todos";
import PhotoGrid from "./PhotoGrid";
import EventList from "./EventList";

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper
  }
});

class SingleProject extends React.Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;
    return (
      <Paper className={classes.root}>
        <Tabs
          // value={this.state.value}
          // onChange={this.handleChange}
          // indicatorColor="primary"
          // textColor="primary"
          // centered
          value={value}
          onChange={this.handleChange}
          scrollable
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="Notes" />
          {/* <TabContainer>
            <NoteGrids />
          </TabContainer> */}
          <Tab label="Members" />
          <Tab label="Todos" />
          <Tab label="Events" />
          <Tab label="Photos" />
        </Tabs>
        {value === 0 && (
          <TabContainer>
            {" "}
            <NoteGrids />
          </TabContainer>
        )}
        {value === 1 && <TabContainer>Item Two</TabContainer>}
        {value === 2 && (
          <TabContainer>
            <Todos />
          </TabContainer>
        )}
        {value === 3 && (
          <TabContainer>
            <EventList />
          </TabContainer>
        )}
        {value === 4 && (
          <TabContainer>
            <PhotoGrid />
          </TabContainer>
        )}
        {value === 5 && <TabContainer>Item Six</TabContainer>}
      </Paper>
    );
  }
}

SingleProject.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SingleProject);
