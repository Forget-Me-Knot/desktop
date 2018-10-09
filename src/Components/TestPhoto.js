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
const styles = theme => ({
  card: {
    maxWidth: 400
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
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

class TestPhoto extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes } = this.props;
    const photos = this.props.photos;
    console.log("photos in test photo", photos);

    return (
      <div>
        <Card
          className={classes.card}
          style={{ marginTop: 10, marginBottom: 10 }}
        >
          <CardHeader
            avatar={
              <Avatar
                rounded
                style={{
                  // backgroundColor: `#${item.color}`,
                  backgroundColor: "aqua",
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
            image="https://firebasestorage.googleapis.com/v0/b/forget-me-knot.appspot.com/o/imageedit_9_2785697590.jpg?alt=media&token=945e2ca1-0e4c-45c6-a676-82d1bf0c3b8f"
            title="flowers"
          />
          <CardContent>
            <Typography>
              This is where your notes on the photo would go
            </Typography>
          </CardContent>
        </Card>
        <Card
          className={classes.card}
          style={{ marginTop: 10, marginBottom: 10 }}
        >
          <CardHeader
            avatar={
              <Avatar
                rounded
                style={{
                  // backgroundColor: `#${item.color}`,
                  backgroundColor: "aqua",
                  width: "30px",
                  height: "30px"
                }}
              />
            }
            title="Forget Me Knot"
            subheader="October 5, 2018"
          />
          <CardMedia className={classes.media} image="tbd" title="flowers" />
          <CardContent>
            <Typography>
              This is where your notes on the photo would go
            </Typography>
          </CardContent>
        </Card>
      </div>
    );
  }
}

TestPhoto.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TestPhoto);
