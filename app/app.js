// import "../public/style.css";
import moment from "moment";
import React from "react";
import ReactDOM from "react-dom";

// Get days of month array of objects with
// style to apply to each day
function getMonth(date) {
  // monthArr stores days of previous,
  // current, and next month
  let monthArr = [];

  let dateObject = moment(date);

  // Get the day of the week for the 1st of the month
  let dayOne = dateObject.startOf("Month").day();

  // Get the num of days in the current month
  let lastDay = dateObject.daysInMonth();

  // Get the day of the week for the last day of the month
  let dayLast = dateObject.endOf("Month").day();

  // Subtract the num of days from the first to get
  // date of last Sunday from previous month
  let firstSunday = dateObject
    .startOf("Month")
    .subtract(dayOne, "days")
    .format("D");

  // Add the days from the previous month to the monthArr
  let counter = dayOne;
  while (counter > 0) {
    let dayObj = {};
    dayObj.value = firstSunday;
    dayObj.style = "previous";
    monthArr.push(dayObj);
    firstSunday++;
    counter--;
  }

  // Add the days of the current month to monthArr
  let day = 1;
  while (lastDay > 0) {
    let dayObj = {};
    dayObj.value = day;
    dayObj.style = "current";
    monthArr.push(dayObj);
    day++;
    lastDay--;
  }

  // Add the days of the next month to monthArr
  let nextMonthNumDays = 6 - dayLast;
  let nextMonthDay = 1;
  while (nextMonthNumDays > 0) {
    let dayObj = {};
    dayObj.value = nextMonthDay;
    dayObj.style = "next";
    monthArr.push(dayObj);
    nextMonthDay++;
    nextMonthNumDays--;
  }
  return monthArr;
}

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    let today = new Date();
    this.state = {
      year: today.getFullYear(),
      monthIndex: today.getMonth(),
    };
    this.incrementMonth = this.incrementMonth.bind(this);
    this.decrementMonth = this.decrementMonth.bind(this);
  }

  incrementMonth() {
    let newMonthIndex = this.state.monthIndex + 1;
    let newYear = this.state.year;

    // Springing to next year
    if (newMonthIndex > 11) {
      newMonthIndex = 0;
      newYear++;
    }

    this.setState({
      year: newYear,
      monthIndex: newMonthIndex,
    });
  }

  decrementMonth() {
    let newMonthIndex = this.state.monthIndex - 1;
    let newYear = this.state.year;

    // Rolling back a year
    if (newMonthIndex < 0) {
      newMonthIndex = 11;
      newYear--;
    }

    this.setState({
      year: newYear,
      monthIndex: newMonthIndex,
    });
  }

  render() {
    let days = getMonth(new Date(this.state.year, this.state.monthIndex));
    let monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];
    return (
      <div>
        <div className="month-bar">
          <button onClick={this.decrementMonth}> Prev </button>
          <Month
            month={monthNames[this.state.monthIndex]}
            year={this.state.year}
          />
          <button onClick={this.incrementMonth}> Next </button>
        </div>
        <div className="calendar">
          <DaysOfWeek daysOfWeek={daysOfWeek} />
          <DaysOfMonth days={days} />
        </div>
      </div>
    );
  }
}

function DaysOfMonth(props) {
  return props.days.map((day, i) => {
    return (
      <span key={i} className={day.style}>
        {day.value}
      </span>
    );
  });
}

function DaysOfWeek(props) {
  return props.daysOfWeek.map((day, i) => {
    return (
      <span key={i} className="day-week">
        {day}
      </span>
    );
  });
}

function Month(props) {
  return (
    <div className="month-year">
      <div>{props.month}</div>
      <div>{props.year}</div>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <h1>Calendar</h1>
      <Calendar />
    </div>
  );
}

const rootElement = document.getElementById("app");
ReactDOM.render(<App />, rootElement);
