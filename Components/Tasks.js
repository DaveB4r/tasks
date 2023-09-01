import Dashboard from "./Dashboard";

const Tasks = (currentYear, month, day) => {

  const days = document.querySelectorAll('.day');

  const deactiveDay = (arrDays) => {
    arrDays.forEach(day => {
      day.classList.remove('active')
    })
  }

  const editTask = () => {
    const btns = document.querySelectorAll('.edit-task');
    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        const idTask = btn.id;
        const idInputHidden = `<input id="editId" type="hidden" value="${id}"/>`
        const idTaskInputHidden = `<input id="editIdTask" type="hidden" value="${idTask}"/>`
        const taskName = btn.parentElement.previousElementSibling.previousElementSibling.innerText;
        let time = btn.parentElement.previousElementSibling.firstElementChild.innerText;
        time = time.split(' to ');
        const from = time[0];
        const to = time[1];
        const taskNameInput = document.getElementById('taskName');
        const taskStart = document.getElementById('taskStart');
        const taskEnd = document.getElementById('taskEnd');
        const form = document.querySelector('.taskForm')
        const inputsHidden = form.querySelector('.hidden-inputs');
        if (inputsHidden.querySelector('#editId')) {
          inputsHidden.querySelector('#editId').value = id;
        } else {
          inputsHidden.innerHTML += idInputHidden
        }
        if (inputsHidden.querySelector('#editIdTask')) {
          inputsHidden.querySelector('#editIdTask').value = idTask;
        } else {
          inputsHidden.innerHTML += idTaskInputHidden
        }
        taskNameInput.value = taskName
        taskStart.value = from;
        taskEnd.value = to;
        const addTaskBtn = document.getElementById('addTask');
        const taskForm = document.querySelector('.taskDashboard-form');
        if (!taskForm.className.includes('show')) showForm(addTaskBtn, taskForm);
        form.childNodes[9].childNodes[1].value = 'edit';
      })
    })
  }

  const deleteTask = () => {
    const btns = document.querySelectorAll('.delete-task');
    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        const remove = confirm('Are you sure to delete this task?');
        if (remove) {
          const id = btn.dataset.id;
          const idTask = btn.id;
          const taskList = btn.parentElement.parentElement;
          const tasksStorage = [...JSON.parse(localStorage.getItem('tasks'))];
          const tasksCopy = tasksStorage.slice().find(task => task.id === id);
          const result = tasksCopy.tasks.filter(task => task.idTask != idTask);
          if (result.length > 0) {
            console.log(result);
            tasksCopy.tasks = result;
            localStorage.setItem('tasks', JSON.stringify([...tasksStorage]))
          } else {
            const notRemainTasks = tasksStorage.slice().filter(task => task.id !== id);
            localStorage.setItem('tasks', JSON.stringify([...notRemainTasks]))
          }
          taskList.remove();
        } else {
          return
        }
      })
    })
  }

  const getChecks = () => {
    const checks = document.querySelectorAll('.taskCheck');

    // mark the task as complete
    checks.forEach(check => {
      check.addEventListener('change', () => {
        const id = check.dataset.id;
        const idTask = check.id;
        const taskList = check.parentElement;
        const tasksStorage = [...JSON.parse(localStorage.getItem('tasks'))];
        const tasksCopy = tasksStorage.slice().find(task => task.id === id);
        const taskTarget = tasksCopy.tasks.find(task => task.idTask === idTask);
        if (check.checked) {
          taskList.classList.add('task-complete');
          taskTarget.done = true;
        } else {
          taskList.classList.remove('task-complete');
          taskTarget.done = false;
        }
        localStorage.setItem('tasks', JSON.stringify([...tasksStorage]));
      })
    });
  }

  const getTasks = (month, year, day) => {
    const tasks = localStorage.getItem('tasks');

    if (tasks) {
      const tasksThisDay = [...JSON.parse(tasks)].find(task => (task.day == day && task.month == month && task.year == year));
      const taskDiv = document.querySelector('.tasksDashboard-list');
      let taskList = `<ul class="task-ul">`;
      if (tasksThisDay) {
        for (let task of tasksThisDay.tasks) {
          taskList += `
        <li class="task-li ${task.done ? 'task-complete' : ''}" id="task-${task.idTask}">
          <input type="checkbox" data-id="${tasksThisDay.id}" id="${task.idTask}" ${task.done ? 'checked' : ''} class="taskCheck"/>
          <span class="task-li-name">${task.taskName}</span>
          <div>
            <span class="task-li-time">${task.taskStart} to ${task.taskEnd}</span>
          </div>
          <div>
            <button data-id="${tasksThisDay.id}" id="${task.idTask}" class="delete-task"><i class="fas fa-trash"></i></button>
            <button data-id="${tasksThisDay.id}" id="${task.idTask}" class="edit-task"><i class="fas fa-pen"></i></button>
          </div>
        </li>`
        }
      }
      taskList += `</ul>`;
      taskDiv.innerHTML = taskList;
      getChecks();
      editTask();
      deleteTask();
    }
  }
  const handleForm = () => {
    const form = document.querySelector('.taskForm');
    form.addEventListener('submit', e => {
      e.preventDefault();
      const inputs = form.elements
      const taskBtn = inputs['taskBtn'].value;
      const taskName = inputs['taskName'].value;
      const taskStart = inputs['taskStart'].value;
      const taskEnd = inputs['taskEnd'].value;
      const taskDay = inputs['taskDay'].value;
      const taskMonth = inputs['taskMonth'].value;
      const taskYear = inputs['taskYear'].value;
      const tasksThisDay = localStorage.getItem('tasks');
      const id = (Math.random().toString(36).slice(2));
      const idTask = (Math.random().toString(36).slice(2));
      const taskMain = {
        id,
        day: taskDay,
        month: taskMonth,
        year: taskYear,
        tasks: [{
          idTask,
          taskName,
          taskStart,
          taskEnd,
          done: false
        }]
      }

      if (tasksThisDay) {
        const tasksStorage = [...JSON.parse(tasksThisDay)];
        if (taskBtn === 'edit') {
          const id = inputs['editId'].value;
          const idTask = inputs['editIdTask'].value;
          const tasksCopy = tasksStorage.slice().find(task => task.id === id);
          const taskTarget = tasksCopy.tasks.find(task => task.idTask === idTask);
          taskTarget.taskName = taskName;
          taskTarget.taskStart = taskStart;
          taskTarget.taskEnd = taskEnd;
          localStorage.setItem('tasks', JSON.stringify([...tasksStorage]));
        } else {
          const taskSavedDay = tasksStorage.find(task => (task.day == taskDay && task.month == taskMonth && task.year == taskYear));
          if (taskSavedDay) {
            taskSavedDay.tasks.push(...taskMain.tasks);
            const taskOtherDays = tasksStorage.find(task => (task.day != taskDay || task.month != taskMonth || task.year != taskYear));
            if (taskOtherDays) {
              localStorage.setItem('tasks', JSON.stringify([taskOtherDays, taskSavedDay]));
            }
            else localStorage.setItem('tasks', JSON.stringify([taskSavedDay]))
          } else {
            localStorage.setItem('tasks', JSON.stringify([...tasksStorage, taskMain]));
          }
        }
      }
      else localStorage.setItem('tasks', JSON.stringify([taskMain]));
      getTasks(taskMonth, taskYear, taskDay);
      form.reset();
      form.childNodes[9].childNodes[1].value = 'submit'
    });
  }

  const showForm = (addTaskBtn, taskForm) => {
    addTaskBtn.classList.toggle('rotate');
    taskForm.classList.toggle('show');
  }

  const showingTaskForm = () => {
    const addTaskBtn = document.getElementById('addTask');
    const taskForm = document.querySelector('.taskDashboard-form');
    const form = document.querySelector('.taskForm')
    addTaskBtn.addEventListener('click', () => {
      form.reset();
      form.childNodes[9].childNodes[1].value = 'submit'
      showForm(addTaskBtn, taskForm);
    });
  }

  Dashboard(month, currentYear, day);
  getTasks(month, currentYear, day);
  handleForm();
  showingTaskForm();
  days.forEach(day => {
    day.style.background = "#FFF";
    day.addEventListener('click', (e) => {
      deactiveDay(days)
      day.classList.add('active');
      let currentMonth = e.target.dataset.month;
      Dashboard(currentMonth, currentYear, e.target.innerText);
      getTasks(currentMonth, currentYear, e.target.innerText);
      handleForm();
      showingTaskForm();
    });

  });



}

export default Tasks