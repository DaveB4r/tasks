const Calendar = (now, months) => {
  return (
    `
      <div class="calendar">
        <div class="year-month">
          <i class="fas fa-angle-left" id="previousMonth"></i>
            <span id="currentMonthSpan">${months[now.getMonth()]} ${now.getFullYear()}</span>
          <i class="fas fa-angle-right" id="nextMonth"></i>
        </div>
        <div class="days-weeks">
          <span>Sun</span>
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
        </div>
        <div id="days" class="days"></div>
        <div id="tasksDashboard" class="tasks-dashboard"></div>
      </div>
    `
  );
}

export default Calendar;