import './style.css'
import Calendar from './Components/Calendar'
import Tasks from './Components/Tasks';
import Footer from './Components/Footer';
import Theme from './Components/Theme';
const now = new Date();
const app = document.querySelector('#app')
const months = [
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
  "December"
]
app.innerHTML = `
  ${Theme()}
  <div class="container">
    ${Calendar(now, months)}
  </div>
    ${Footer()}
`
// handle Month
let currentMonth = now.getMonth();
let currentYear = now.getFullYear();
const currentMonthSpan = document.getElementById('currentMonthSpan');
const daysContainer = document.getElementById('days');

// Check if the day has tasks to do
const hasTasks = (day, month, year) => {
  const tasks = localStorage.getItem('tasks');
  let tasksStorage = undefined;
  if(tasks){
    tasksStorage = [...JSON.parse(localStorage.getItem('tasks'))].find(task => (task.day == day && task.month == month && task.year == year));
  } 
  return tasksStorage !== undefined;
}
const getDays = (month, year) => {
  let divDays = '';
  const firstDay = new Date(year, month, 1).getUTCDay();
  const totalDays = new Date(year, month + 1, 0).getDate();
  const lastDay = new Date(year, month + 1, 0).getUTCDay();
  const totalDaysPrevious = new Date(year, month, 0).getDate();
  const now = new Date();
  let hasTask = false;
  for (let i = (firstDay * - 1) + 1; i < totalDays + (7 - lastDay); i++) {
    if (i <= 0) {
      hasTask = hasTasks(totalDaysPrevious + i, month - 1, year);
      divDays += `<div class="day ${hasTask ? 'has-tasks' : ''} prevDay" data-month="${month - 1}">${totalDaysPrevious + i}</div>`;
    }
    else if (i > totalDays) {
      hasTask = hasTasks(i - totalDays, month + 1, year);
      divDays += `<div class="day ${hasTask ? 'has-tasks' : ''} nextDay" data-month="${month + 1}">${i - totalDays}</div>`;
    }
    else {
      hasTask = hasTasks(i, month, year);
      if (now.getMonth() === month && i === now.getDate() && now.getFullYear() === year) {
        divDays += `<div class="day ${hasTask ? 'has-tasks' : ''} active" data-month="${month}">${i}</div>`;
      }
      else divDays += `<div class="day ${hasTask ? 'has-tasks' : ''}" data-month="${month}">${i}</div>`;
    }
  }
  daysContainer.innerHTML = divDays;
  Tasks(year, month, now.getDate());
}
getDays(currentMonth, currentYear);
const lessMonth = () => {
  --currentMonth;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  currentMonthSpan.innerHTML = months[currentMonth] + " " + currentYear;
  getDays(currentMonth, currentYear)
}
const plusMonth = () => {
  ++currentMonth;
  if (currentMonth == 12) {
    currentMonth = 0;
    currentYear++;
  }
  currentMonthSpan.innerHTML = months[currentMonth] + " " + currentYear;
  getDays(currentMonth, currentYear)
}

//Change theme
const themeBtn = document.querySelector('.theme-btn');
themeBtn.addEventListener('click', () => {
  const days = document.querySelectorAll('.day');
  const tasksDashboard = document.getElementById('tasksDashboard');
  const taskForm = document.querySelector('.taskForm');
  tasksDashboard.classList.toggle('dark-day')
  days.forEach(day => day.classList.toggle('dark-day'))
  themeBtn.classList.toggle('light')
  taskForm.classList.toggle('dark');
  document.body.classList.toggle('dark');  
  themeBtn.childNodes[0].classList.toggle('fa-moon');
  themeBtn.childNodes[0].classList.toggle('fa-sun');
})


const previousMonth = document.getElementById('previousMonth');
const nextMonth = document.getElementById('nextMonth');
previousMonth.addEventListener('click', lessMonth);
nextMonth.addEventListener('click', plusMonth);