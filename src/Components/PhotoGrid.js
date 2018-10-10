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
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import firebase from "../firebase";
const styles = theme => ({
  card: {
    maxWidth: 400,
    minWidth: 300
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

class PhotoGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes } = this.props;
    const photos = this.props.photos;
    console.log("photos in test photo", photos);

    return (
      // <Paper style={{ marginLeft: 200 }}>
      // <Paper
      //   style={{
      //     display: "flex",
      //     alignItems: "center",
      //     direction: "row"
      //   }}
      // >
      <Grid container spacing={24}>
        <Grid item item xs={6}>
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
              image="https://img.crocdn.co.uk/images/products2/pl/20/00/01/88/pl2000018820.jpg?width=940&height=940"
              title="flowers"
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
      /* </Paper> */
    );
  }
}

PhotoGrid.propTypes = {
  classes: PropTypes.object.isRequired
};

//export default TestPhoto;
export default withStyles(styles)(PhotoGrid);

// const photoArr = [
//   {
//     author: "PeRSWzFbHyYb3iPBOCD2CqnN12H3",
//     content: "i just think this is a generally fun gift",
//     projectId: "LO6RPDLzaAXpX5wUWr9",
//     url:
//       "https://cdn.shopify.com/s/files/1/0548/5721/products/oct-standard-images-2_grande.jpg?v=1533057667"
//   },
//   {
//     author: "PeRSWzFbHyYb3iPBOCD2CqnN12H3",
//     content: "Woman and Roma would love this!",
//     projectId: "LO6RPDLzaAXpX5wUWr9",
//     url:
//       "https://cdn.shopify.com/s/files/1/1114/2308/products/7580_029_Tif_NEW_b602c28d-2971-4d65-a497-83e962af7376_600x600.png?v=1532360658"
//   },
//   {
//     author: "PeRSWzFbHyYb3iPBOCD2CqnN12H3",
//     content:
//       "these are really cute for the girls! and they could get a matching set!",
//     projectId: "LO6RPDLzaAXpX5wUWr9",
//     url:
//       "https://cdn.shopify.com/s/files/1/0030/8376/3824/products/charlotte-600x600-x2_1_300x300.jpg?v=1535655994"
//   },
//   {
//     author: "PeRSWzFbHyYb3iPBOCD2CqnN12H3",
//     content: "JD and Nick really liked these last time",
//     projectId: "LO6RPDLzaAXpX5wUWr9",
//     url:
//       "https://www.thebeersoapcompany.com/media/catalog/product/cache/1/image/512x512/9df78eab33525d08d6e5fb8d27136e95/a/b/abita_purple_haze_1.jpg"
//   }
// ];

// // const seedImg = () => {
// //   return
// // let newKey;
// // photoArr.map(
// //   item =>
// function seed(photo) {
//   let newKey = firebase
//     .database()
//     .ref("photos")
//     .push().key;
//   firebase
//     .database()
//     .ref("photos")
//     .child(newKey)
//     .set(photo);
// }
// seed({
//   author: "PeRSWzFbHyYb3iPBOCD2CqnN12H3",
//   content: "JD and Nick really liked these last time",
//   projectId: "LO6RPDLzaAXpX5wUWr9",
//   url:
//     "https://www.thebeersoapcompany.com/media/catalog/product/cache/1/image/512x512/9df78eab33525d08d6e5fb8d27136e95/a/b/abita_purple_haze_1.jpg"
// });
