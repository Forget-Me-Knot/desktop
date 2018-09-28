import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
});

class MiniDrawer extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div>
        <AppBar position="absolute" className={classNames(classes.appBar)}>
          <Toolbar>
            <Typography variant="title" color="inherit" noWrap>
              FORGET ME KNOT
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent">
          <div className={classes.toolbar} />
          <Divider />
          <List className="listItem">ICON1</List>
          <Divider />
          <List>ICON2</List>
        </Drawer>
      </div>
    );
  }
}

MiniDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MiniDrawer);
