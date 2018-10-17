import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classnames from "classnames";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import red from "@material-ui/core/colors/red";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Grid from "@material-ui/core/Grid";

const styles = theme => ({
  card: {
    maxWidth: 500
  },
  media: {
    height: 0,
    paddingTop: "56.25%"
  },
  actions: {
    display: "flex"
  },
  expand: {
    transform: "rotate(0deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    }),
    marginLeft: "auto",
    [theme.breakpoints.up("sm")]: {
      marginRight: -8
    }
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  }
});

class PhotoGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes } = this.props;
    const photos = this.props.photos;
    let project = this.props.projects ? this.props.projects[0] : null;
    let color = project ? "#" + project.color : null;

    return (
      <Grid container spacing={24}>
        <Grid item xs={6}>
          <Card
            className={classes.card}
            style={{ marginTop: 10, marginBottom: 10 }}
            spacing={16}
          >
            <CardHeader
              avatar={
                <Avatar
                  rounded
                  style={{
                    backgroundColor: `${color}`,
                    width: "30px",
                    height: "30px"
                  }}
                />
              }
              action={
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              }
              title="Forget Me Knot"
              subheader="October 5, 2018"
            />
            <CardMedia
              className={classes.media}
              image="https://img.crocdn.co.uk/images/products2/pl/20/00/01/88/pl2000018820.jpg?width=940&height=940"
              title="flowers"
              style={{ display: "flex" }}
            />
            <CardContent>
              <Typography component="p">
                This is where your notes on the photo would go
              </Typography>
            </CardContent>
            <CardActions className={classes.actions} disableActionSpacing>
              <IconButton aria-label="Add to favorites">
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="Share">
                <ShareIcon />
              </IconButton>
              <IconButton
                className={classnames(classes.expand, {
                  [classes.expandOpen]: this.state.expanded
                })}
                onClick={this.handleExpandClick}
                aria-expanded={this.state.expanded}
                aria-label="Show more"
              >
                <ExpandMoreIcon />
              </IconButton>
            </CardActions>
            <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography paragraph variant="body2">
                  Method:
                </Typography>
                <Typography paragraph>Here would be more details</Typography>
                <Typography paragraph>
                  Maybe a link to the item you saw or a question to the group
                </Typography>
                <Typography paragraph>Maybe some notes to yourself</Typography>
              </CardContent>
            </Collapse>
          </Card>
        </Grid>
        {photos
          ? photos.map(photo => (
              <Grid item xs={6}>
                <Card
                  className={classes.card}
                  style={{ marginTop: 10, marginBottom: 10 }}
                  spacing={16}
                >
                  <CardHeader
                    avatar={
                      <Avatar
                        rounded
                        style={{
                          backgroundColor: `${color}`,
                          width: "30px",
                          height: "30px"
                        }}
                      />
                    }
                    action={
                      <IconButton>
                        <MoreVertIcon />
                      </IconButton>
                    }
                    title="Forget Me Knot"
                    subheader="October 5, 2018"
                  />
                  <CardMedia
                    className={classes.media}
                    image={photo.url}
                    title="flowers"
                  />
                  <CardContent>
                    <Typography component="p">{photo.content}</Typography>
                  </CardContent>
                  <CardActions className={classes.actions} disableActionSpacing>
                    <IconButton aria-label="Add to favorites">
                      <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="Share">
                      <ShareIcon />
                    </IconButton>
                    <IconButton
                      className={classnames(classes.expand, {
                        [classes.expandOpen]: this.state.expanded
                      })}
                      onClick={this.handleExpandClick}
                      aria-expanded={this.state.expanded}
                      aria-label="Show more"
                    >
                      <ExpandMoreIcon />
                    </IconButton>
                  </CardActions>
                  <Collapse
                    in={this.state.expanded}
                    timeout="auto"
                    unmountOnExit
                  >
                    <CardContent>
                      <Typography paragraph variant="body2">
                        Method:
                      </Typography>
                      <Typography paragraph>
                        Here would be more details
                      </Typography>
                      <Typography paragraph>
                        Maybe a link to the item you saw or a question to the
                        group
                      </Typography>
                      <Typography paragraph>
                        Maybe some notes to yourself
                      </Typography>
                    </CardContent>
                  </Collapse>
                </Card>
              </Grid>
            ))
          : null}
      </Grid>
    );
  }
}

PhotoGrid.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PhotoGrid);
