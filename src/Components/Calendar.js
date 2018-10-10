import React from "react";
import dateFns from "date-fns";
import "./calendar.css";
import firebase from "../firebase";

class Calendar extends React.Component {
  constructor() {
    super();
    this.state = {
      currentMonth: new Date(),
      selectedDate: new Date(),
      formOpen: false
    };
    this.renderHeader = this.renderHeader.bind(this);
    this.renderCells = this.renderCells.bind(this);
    this.renderDays = this.renderDays.bind(this);
    this.nextMonth = this.nextMonth.bind(this);
    this.prevMonth = this.prevMonth.bind(this);
  }

  renderHeader() {
    const dateFormat = "MMMM YYYY";

    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={this.prevMonth}>
            chevron_left
          </div>
        </div>
        <div className="col col-center">
          <span>{dateFns.format(this.state.currentMonth, dateFormat)}</span>
        </div>
        <div className="col col-end" onClick={this.nextMonth}>
          <div className="icon">chevron_right</div>
        </div>
      </div>
    );
  }

  renderDays() {
    const dateFormat = "dddd";
    const days = [];

    let startDate = dateFns.startOfWeek(this.state.currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return <div className="days row">{days}</div>;
  }

  renderCells() {
    if (!this.state.div) {
      const { currentMonth } = this.state;
      const monthStart = dateFns.startOfMonth(currentMonth);
      const monthEnd = dateFns.endOfMonth(monthStart);
      const startDate = dateFns.startOfWeek(monthStart);
      const endDate = dateFns.endOfWeek(monthEnd);

      const dateFormat = "D";
      const rows = [];

      let days = [];
      let day = startDate;
      let formattedDate = "";

      const ref = firebase.database().ref();
			const self = this;
			firebase.auth().onAuthStateChanged(function(user){
				ref.on("value", function(snapshot) {
					const events = snapshot.val().events;
					const projects = snapshot.val().projects
					let eventsObj = {};
					let eventDates = [];
					for (var pkey in projects) {
						if (projects[pkey].members.includes(user.email)) {
							for (var key in events) {
								if (pkey === events[key].projectId) {
									const day = events[key].date.day;
									const month = events[key].date.month - 1;
									const year = events[key].date.year;
									let date = new Date(year, month, day);
									eventsObj[JSON.stringify(date)] = events[key];
									eventDates.push(JSON.stringify(date));
								}
							}
						}
					}

					while (day <= endDate) {
						for (let i = 0; i < 7; i++) {
							formattedDate = dateFns.format(day, dateFormat);
							const stringDay = JSON.stringify(day);
							const color = eventsObj[stringDay]
								? eventsObj[stringDay].color
								: null;
							const eventName = eventsObj[stringDay]
								? eventsObj[stringDay].name
								: "";

							days.push(
								<div
									className={`col cell ${
										!dateFns.isSameMonth(day, monthStart)
											? "disabled"
											: eventDates.includes(stringDay)
												? "selected"
												: ""
									}`}
									style={color ? { borderLeftColor: `#${color}` } : null}
									key={day}
								>
									<span className="eventtext">{eventName}</span>
									<span className="number">{formattedDate}</span>
									<span className="bg">{formattedDate}</span>
								</div>
							);
							day = dateFns.addDays(day, 1);
						}
						rows.push(
							<div className="row" key={day}>
								{days}
							</div>
						);
						days = [];
					}
					self.setState({ div: <div className="body">{rows}</div> });
			})
      });
    } else {
      return this.state.div;
    }
  }

  nextMonth = () => {
    this.setState({
      currentMonth: dateFns.addMonths(this.state.currentMonth, 1),
      div: null
    });
  };

  prevMonth = () => {
    this.setState({
      currentMonth: dateFns.subMonths(this.state.currentMonth, 1),
      div: null
    });
  };

  render() {
    return (
      <div>
        <div className="calendar">
          {this.renderHeader()}
          {this.renderDays()}
          {this.renderCells()}
        </div>
      </div>
    );
  }
}

export default Calendar;
