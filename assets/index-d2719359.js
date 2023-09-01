(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))c(t);new MutationObserver(t=>{for(const i of t)if(i.type==="childList")for(const T of i.addedNodes)T.tagName==="LINK"&&T.rel==="modulepreload"&&c(T)}).observe(document,{childList:!0,subtree:!0});function l(t){const i={};return t.integrity&&(i.integrity=t.integrity),t.referrerPolicy&&(i.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?i.credentials="include":t.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function c(t){if(t.ep)return;t.ep=!0;const i=l(t);fetch(t.href,i)}})();const U=(e,n)=>`
      <div class="calendar">
        <div class="year-month">
          <i class="fas fa-angle-left" id="previousMonth"></i>
            <span id="currentMonthSpan">${n[e.getMonth()]} ${e.getFullYear()}</span>
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
    `,A=(e,n,l)=>{const c=document.getElementById("tasksDashboard");let t=new Date(n,e,l).toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"});t=t.split(",");const i=`<div class="tasksDashboard-title"><span class="task-day">${t[0]}</span> <span class="task-date">${t[1]} ${t[2]}</span><button id="addTask" title="Add Task">+</button></div>`,T=`
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
        <input type="hidden" value="${l}" id="taskDay"/>
        <input type="hidden" value="${e}" id="taskMonth"/>
        <input type="hidden" value="${n}" id="taskYear"/>
      </div>
      <div class="task-form-control">
        <input id="taskBtn" type="submit" class="input-button" />
      </div>
    </form>
  </div>`,D='<div class="tasksDashboard-list"></div>';c.innerHTML=i,c.innerHTML+=T,c.innerHTML+=D},Y=(e,n,l)=>{const c=document.querySelectorAll(".day"),t=d=>{d.forEach(s=>{s.classList.remove("active")})},i=()=>{document.querySelectorAll(".edit-task").forEach(s=>{s.addEventListener("click",()=>{const o=s.dataset.id,p=s.id,u=`<input id="editId" type="hidden" value="${o}"/>`,v=`<input id="editIdTask" type="hidden" value="${p}"/>`,m=s.parentElement.previousElementSibling.previousElementSibling.innerText;let a=s.parentElement.previousElementSibling.firstElementChild.innerText;a=a.split(" to ");const k=a[0],f=a[1],L=document.getElementById("taskName"),N=document.getElementById("taskStart"),q=document.getElementById("taskEnd"),I=document.querySelector(".taskForm"),y=I.querySelector(".hidden-inputs");y.querySelector("#editId")?y.querySelector("#editId").value=o:y.innerHTML+=u,y.querySelector("#editIdTask")?y.querySelector("#editIdTask").value=p:y.innerHTML+=v,L.value=m,N.value=k,q.value=f;const b=document.getElementById("addTask"),h=document.querySelector(".taskDashboard-form");h.className.includes("show")||H(b,h),I.childNodes[9].childNodes[1].value="edit"})})},T=()=>{document.querySelectorAll(".delete-task").forEach(s=>{s.addEventListener("click",()=>{if(confirm("Are you sure to delete this task?")){const p=s.dataset.id,u=s.id,v=s.parentElement.parentElement,m=[...JSON.parse(localStorage.getItem("tasks"))],a=m.slice().find(f=>f.id===p),k=a.tasks.filter(f=>f.idTask!=u);if(k.length>0)console.log(k),a.tasks=k,localStorage.setItem("tasks",JSON.stringify([...m]));else{const f=m.slice().filter(L=>L.id!==p);localStorage.setItem("tasks",JSON.stringify([...f]))}v.remove()}else return})})},D=()=>{document.querySelectorAll(".taskCheck").forEach(s=>{s.addEventListener("change",()=>{const o=s.dataset.id,p=s.id,u=s.parentElement,v=[...JSON.parse(localStorage.getItem("tasks"))],a=v.slice().find(k=>k.id===o).tasks.find(k=>k.idTask===p);s.checked?(u.classList.add("task-complete"),a.done=!0):(u.classList.remove("task-complete"),a.done=!1),localStorage.setItem("tasks",JSON.stringify([...v]))})})},g=(d,s,o)=>{const p=localStorage.getItem("tasks");if(p){const u=[...JSON.parse(p)].find(a=>a.day==o&&a.month==d&&a.year==s),v=document.querySelector(".tasksDashboard-list");let m='<ul class="task-ul">';if(u)for(let a of u.tasks)m+=`
        <li class="task-li ${a.done?"task-complete":""}" id="task-${a.idTask}">
          <input type="checkbox" data-id="${u.id}" id="${a.idTask}" ${a.done?"checked":""} class="taskCheck"/>
          <span class="task-li-name">${a.taskName}</span>
          <div>
            <span class="task-li-time">${a.taskStart} to ${a.taskEnd}</span>
          </div>
          <div>
            <button data-id="${u.id}" id="${a.idTask}" class="delete-task"><i class="fas fa-trash"></i></button>
            <button data-id="${u.id}" id="${a.idTask}" class="edit-task"><i class="fas fa-pen"></i></button>
          </div>
        </li>`;m+="</ul>",v.innerHTML=m,D(),i(),T()}},r=()=>{const d=document.querySelector(".taskForm");d.addEventListener("submit",s=>{s.preventDefault();const o=d.elements,p=o.taskBtn.value,u=o.taskName.value,v=o.taskStart.value,m=o.taskEnd.value,a=o.taskDay.value,k=o.taskMonth.value,f=o.taskYear.value,L=localStorage.getItem("tasks"),N=Math.random().toString(36).slice(2),q=Math.random().toString(36).slice(2),I={id:N,day:a,month:k,year:f,tasks:[{idTask:q,taskName:u,taskStart:v,taskEnd:m,done:!1}]};if(L){const y=[...JSON.parse(L)];if(p==="edit"){const b=o.editId.value,h=o.editIdTask.value,F=y.slice().find(O=>O.id===b).tasks.find(O=>O.idTask===h);F.taskName=u,F.taskStart=v,F.taskEnd=m,localStorage.setItem("tasks",JSON.stringify([...y]))}else{const b=y.find(h=>h.day==a&&h.month==k&&h.year==f);if(b){b.tasks.push(...I.tasks);const h=y.find($=>$.day!=a||$.month!=k||$.year!=f);h?localStorage.setItem("tasks",JSON.stringify([h,b])):localStorage.setItem("tasks",JSON.stringify([b]))}else localStorage.setItem("tasks",JSON.stringify([...y,I]))}}else localStorage.setItem("tasks",JSON.stringify([I]));g(k,f,a),d.reset(),d.childNodes[9].childNodes[1].value="submit"})},H=(d,s)=>{d.classList.toggle("rotate"),s.classList.toggle("show")},x=()=>{const d=document.getElementById("addTask"),s=document.querySelector(".taskDashboard-form"),o=document.querySelector(".taskForm");d.addEventListener("click",()=>{o.reset(),o.childNodes[9].childNodes[1].value="submit",H(d,s)})};A(n,e,l),g(n,e,l),r(),x(),c.forEach(d=>{d.style.background="#FFF",d.addEventListener("click",s=>{t(c),d.classList.add("active");let o=s.target.dataset.month;A(o,e,s.target.innerText),g(o,e,s.target.innerText),r(),x()})})},K=()=>`<footer class="credits">
      <p>Created by <a href="https://github.com/DaveB4r" target="_blank">DaveB4r</a></p>
    </footer>`,R=()=>`<div class="theme">
      <button class="theme-btn" type="button"><i class="fa-solid fa-moon"></i></button>
    </div>`,J=new Date,W=document.querySelector("#app"),w=["January","February","March","April","May","June","July","August","September","October","November","December"];W.innerHTML=`
  ${R()}
  <div class="container">
    ${U(J,w)}
  </div>
    ${K()}
`;let S=J.getMonth(),E=J.getFullYear();const P=document.getElementById("currentMonthSpan"),_=document.getElementById("days"),B=(e,n,l)=>{const c=localStorage.getItem("tasks");let t;return c&&(t=[...JSON.parse(localStorage.getItem("tasks"))].find(i=>i.day==e&&i.month==n&&i.year==l)),t!==void 0},C=(e,n)=>{let l="";const c=new Date(n,e,1).getUTCDay(),t=new Date(n,e+1,0).getDate(),i=new Date(n,e+1,0).getUTCDay(),T=new Date(n,e,0).getDate(),D=new Date;let g=!1;for(let r=c*-1+1;r<t+(7-i);r++)r<=0?(g=B(T+r,e-1,n),l+=`<div class="day ${g?"has-tasks":""} prevDay" data-month="${e-1}">${T+r}</div>`):r>t?(g=B(r-t,e+1,n),l+=`<div class="day ${g?"has-tasks":""} nextDay" data-month="${e+1}">${r-t}</div>`):(g=B(r,e,n),D.getMonth()===e&&r===D.getDate()&&D.getFullYear()===n?l+=`<div class="day ${g?"has-tasks":""} active" data-month="${e}">${r}</div>`:l+=`<div class="day ${g?"has-tasks":""}" data-month="${e}">${r}</div>`);_.innerHTML=l,Y(n,e,D.getDate())};C(S,E);const j=()=>{--S,S<0&&(S=11,E--),P.innerHTML=w[S]+" "+E,C(S,E)},z=()=>{++S,S==12&&(S=0,E++),P.innerHTML=w[S]+" "+E,C(S,E)},M=document.querySelector(".theme-btn");M.addEventListener("click",()=>{const e=document.querySelectorAll(".day"),n=document.getElementById("tasksDashboard"),l=document.querySelector(".taskForm");n.classList.toggle("dark-day"),e.forEach(c=>c.classList.toggle("dark-day")),M.classList.toggle("light"),l.classList.toggle("dark"),document.body.classList.toggle("dark"),M.childNodes[0].classList.toggle("fa-moon"),M.childNodes[0].classList.toggle("fa-sun")});const G=document.getElementById("previousMonth"),Q=document.getElementById("nextMonth");G.addEventListener("click",j);Q.addEventListener("click",z);
