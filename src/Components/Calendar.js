import React from "react";
import BigCalendar from "react-big-calendar";
import moment from "moment";
import events from "./events";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Avatar } from "@material-ui/core";

const localizer = BigCalendar.momentLocalizer(moment);

const allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k]);

class Calendar extends React.Component {
  constructor() {
    super();
    this.state = {
      view: "month",
      date: new Date(),
      width: 500
    };
  }

  componentDidMount() {
    window.addEventListener("resize", () => {
      this.setState({
        width: window.innerWidth,
        height: window.innerHeight
      });
    });
  }
  render() {
    return (
      <div>
        <button onClick={() => this.setState({ view: "day" })}>Day</button>
        <button onClick={() => this.setState({ view: "month" })}>Month</button>
        <BigCalendar
          localizer={localizer}
          style={{ height: 500, width: this.state.width }}
          toolbar={false}
          events={events}
          step={60}
          views={allViews}
          view={this.state.view}
          onView={() => {}}
          date={this.state.date}
          onNavigate={date => this.setState({ date })}
        />
      </div>
    );
  }
}

export default Calendar;

{
  /* <Avatar
rounded
style={{
  backgroundColor: `${item.color}`,
  width: "30px",
  height: "30px"
}}
/> */
}
