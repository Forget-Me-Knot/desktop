import React from 'react';
import { Link } from 'react-router-dom'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

export default class ProjectBar extends React.Component {
  render() {
    return (
			<div style={{height: 680, width: 170, borderRight: '0.1em solid #e0e0e0'}}>
      <List style={{paddingLeft: 20, width: 150}}>
				<ListItem button>
					<Link style={{ textDecoration: 'none' }} to="/writenote" replace>
						<ListItemText primary="Write" />
					</Link>
				</ListItem>
				<Divider />
				<ListItem button>
					<Link style={{ textDecoration: 'none' }} to="/notes" replace>
						<ListItemText primary="All Notes" />
					</Link>
				</ListItem>
				<Divider />
				<ListItem button>
					<ListItemText primary="To-do List" />
				</ListItem>
				<Divider />
				<ListItem button>
					<ListItemText primary="Photos" />
				</ListItem>
			</List>
			</div>
    );
  }
}
