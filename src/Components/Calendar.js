import React from "react";
import moment from "moment";
// import BigCalendar from "react-big-calendar";
// import events from "./events";
// import "react-big-calendar/lib/css/react-big-calendar.css";
import { Avatar } from "@material-ui/core";

import InfiniteCalendar, {
  Calendar,
  defaultMultipleDateInterpolation,
  withMultipleDates
} from "react-infinite-calendar";
import "react-infinite-calendar/styles.css";
var firebase = require("firebase");

// const localizer = BigCalendar.momentLocalizer(moment);

// const allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k]);

const eventStyleGetter = function(event) {
  console.log(event);
  var backgroundColor = `#{event.bgColor}`;
  var style = {
    backgroundColor: backgroundColor,
    borderRadius: "0px",
    opacity: 0.8,
    color: "black",
    border: "0px",
    display: "block"
  };
  return {
    style: style
  };
};

class EventCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      selected: {},
      view: "month",
      date: new Date() // nothing happens here, empty date will be rendered
    };
    // this.state = {
    //   view: "month",
    //   date: new Date(),
    //   width: 500
    // };
  }
  componentDidMount() {
    const user = firebase.auth().currentUser;
    var self = this;
    var ref = firebase.database().ref("events");
    ref.on("value", function(snapshot) {
      var myEvents = [];
      let marked = {};
      let events = snapshot.val();

      for (var key in events) {
        // let people = events[key].members.includes(user.email);
        // 'title': 'Just for one day',
        // 'bgColor': 'red',
        // 'allDay': true,
        // 'start': new Date(2018, 9, 2),
        // 'end': new Date(2018, 9, 2)
        // if (people) {
        // myEvents.push(events[key]);
        let marker = {};
        let str = events[key].date.dateString;
        // console.log("my events", myEvents);
        // console.log("this user id", user.email);
        (marker.title = events[key].name),
          // (marker.bgColor = `#${events[key].color}`),
          (marker.color = `#${events[key].color}`),
          (marker.allDay = true),
          (marker.start = new Date(str)),
          (marker.end = new Date(str));
        // (marker.title = events[key].name),
        //   (marker.color = `#${events[key].color}`)
        //   (marker.date = new Date(str)),
        // console.log("marker", marker);
        // console.log("Events", events[key]);
        myEvents.push(marker);
        // }
      }

      console.log("MY EVENTS", myEvents);
      self.setState({ items: myEvents });
      // self.setState({ selected: marked });
    });
  }

  render() {
    const today = Date.now();
    console.log("this state events in render methods of cal", this.state.items);
    return (
      <div>
        {/* <button onClick={() => this.setState({ view: "day" })}>Day</button>
        <button onClick={() => this.setState({ view: "month" })}>Month</button> */}
        <InfiniteCalendar
          Component={withMultipleDates(Calendar)}
          interpolateSelection={defaultMultipleDateInterpolation}
          theme={{
            layout: "portrait",
            flexGrow: 1,
            width: "500px",
            marginLeft: "auto",
            marginRight: "auto",
            shouldHeaderAnimate: false,
            backgrounColor: "#D2D2E4",
            accentColor: "#8E56C6",
            headerColor: "#7F3FBF",
            // selectionColor: "#C656C6",
            todayColor: "#F64A4D",
            floatingNav: {
              background: "#73C8AF",
              chevron: "#FFA726",
              color: "#FFF"
            },
            textColor: {
              active: "#0E0000",
              default: "#0E0000"
            },
            weekdayColor: "#AF73C8",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
          width={"800px"}
          disabledDate={(2018, 9, 24)}
          selected={this.state.items}
          highlightedDates={this.state.items}
          theme={{
            selectionColor: date => {
              return this.getColor.date;
            }
          }}
          minDate={new Date(2018, 0, 1)}
          maxDate={new Date(2020, 0, 1)}
        />
        {/* <Calendar
          items={this.state.items}
          minDate="2018-07-10"
          maxDate="2019-01-30"
          // renderKnob={() => {
          //   return <View />;
          // }}
          rowHasChanged={(r1, r2) => {
            return r1.name !== r2.name;
          }}
          markedDates={this.state.selected}
        /> */}

        {/* <BigCalendar
          localizer={localizer}
          style={{ height: 500, width: this.state.width }}
          // toolbar={false}
          events={this.state.items}
          step={60}
          // views={allViews}
          view={this.state.view}
          onView={() => {}}
          date={this.state.date}
          onNavigate={date => this.setState({ date })}
          eventPropGetter={this.eventStyleGetter}
        /> */}
        <ul>
          {this.state.items.map(item => (
            <li key={item.date}> {item.title}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default EventCalendar;
