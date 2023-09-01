const Dashboard = (currentMonth, currentYear, day) => {
  const tasksDashboard = document.getElementById('tasksDashboard');
  let nameDay = new Date(currentYear, currentMonth, day).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  nameDay = nameDay.split(',');
  const taskTitle = `<div class="tasksDashboard-title"><span class="task-day">${nameDay[0]}</span> <span class="task-date">${nameDay[1]} ${nameDay[2]}</span><button id="addTask" title="Add Task">+</button></div>`;
  const taskForm = `
  <div class="taskDashboard-form">
    <form class="taskForm">
      <div class="task-form-control">
        <input type="text" id="taskName" placeholder="Task Name" class="input-form" required/>
      </div>
      <div class="task-form-control">
        <label for="taskStart">
          <small>Task Start:</small>
          <input type="time" id="taskStart" class="input-form" required />
        </label>
      </div>
      <div class="task-form-control">
        <label for="taskEnd">
          <small>Task End:</small>
          <input type="time" id="taskEnd" class="input-form" required />
        </label>
      </div>
      
      <div class="hidden-inputs">
        <input type="hidden" value="${day}" id="taskDay"/>
        <input type="hidden" value="${currentMonth}" id="taskMonth"/>
        <input type="hidden" value="${currentYear}" id="taskYear"/>
      </div>
      <div class="task-form-control">
        <input id="taskBtn" type="submit" class="input-button" />
      </div>
    </form>
  </div>`;
  const tasksList = `<div class="tasksDashboard-list"></div>`;
  tasksDashboard.innerHTML = taskTitle;
  tasksDashboard.innerHTML += taskForm;
  tasksDashboard.innerHTML += tasksList;
}

export default Dashboard;