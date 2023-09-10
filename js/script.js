document.addEventListener("DOMContentLoaded", function () {
        // Der gesamte Code, der darauf wartet, dass das Dokument geladen ist
});

function changeBackgroundColor() {
        var svgElement = document.querySelector('.user-profile-icon');
        var rectElement = svgElement.querySelector('rect');
        rectElement.setAttribute("fill", "#E1E5EC");
}

function changeBackgroundColorBack() {
        var svgElement = document.querySelector('.user-profile-icon');
        var rectElement = svgElement.querySelector('rect');
        rectElement.setAttribute("fill", "white");
}

function changeBackgroundColorMobile() {
        var svgElement = document.querySelector('.user-profile-icon-mobile');
        rectElement = svgElement.querySelector('circle');
        rectElement.setAttribute("fill", "#E1E5EC");
}

function changeBackgroundColorBackMobile() {
        var svgElement = document.querySelector('.user-profile-icon-mobile');
        rectElement = svgElement.querySelector('circle');
        rectElement.setAttribute("fill", "white");;
}

function renderSummary() {
        let dashboard = document.getElementById('dashboard-content');
        dashboard.innerHTML = /*html*/`
        <div class="summary-headline">
                <h1>Summary</h1>
                <svg xmlns="http://www.w3.org/2000/svg" width="4" height="63" viewBox="0 0 4 63" fill="none">
                <path d="M2 2V61" stroke="#29ABE2" stroke-width="3" stroke-linecap="round"/>
                </svg>
                <h2>Everything in a nutshell!</h2>
        </div>
        <div class="summary-main-container">
        <div class="summary-task-container">
                <div class="summary-task-number-container">
                        <div class= "summary-task-number-box">
                                <span class="summary-task-number"><h1>5</h1></span>
                                <span class="summary-task-info">Tasks in Board</span>
                        </div>
                        <div class= "summary-task-number-box">
                                <span class="summary-task-number"><h1>2</h1></span>
                                <span class="summary-task-info">Tasks in Progress</span>
                        </div>
                        <div class= "summary-task-number-box">
                                <span class="summary-task-number"><h1>2</h1></span>
                                <span class="summary-task-info">Awaiting Feedback</span>
                        </div>
                </div>
                <div class="summary-urgent-container">
                        <img src="./../img/urgent-icon.svg">
                        <div class="summary-urgent-number">
                                <h1>1</h1>Urgent
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="2" height="105" viewBox="0 0 2 105" fill="none">
                        <path d="M1 1.48828V103.511" stroke="#D1D1D1" stroke-width="2" stroke-linecap="round"/>
                        </svg>
                        <div class="summary-deadline-container">
                                <span class="summary-deadline">Oktober 16, 2022</span>
                                <span>Upcoming Deadline</span>
                        </div>
                </div>
                <div class="summary-todo-container">
                                <div class="summary-todo">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="69" height="70" viewBox="0 0 69 70" fill="none">
                                        <circle cx="34.5" cy="35" r="34.5" fill="#2A3647"/>
                                        <mask id="mask0_83706_6001" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="18" y="19" width="33" height="32">
                                        <rect x="18.5" y="19" width="32" height="32" fill="#D9D9D9"/>
                                        </mask>
                                        <g mask="url(#mask0_83706_6001)">
                                        <path d="M25.1667 44.3332H27.0333L38.5333 32.8332L36.6667 30.9665L25.1667 42.4665V44.3332ZM44.2333 30.8998L38.5667 25.2998L40.4333 23.4332C40.9444 22.9221 41.5722 22.6665 42.3167 22.6665C43.0611 22.6665 43.6889 22.9221 44.2 23.4332L46.0667 25.2998C46.5778 25.8109 46.8444 26.4276 46.8667 27.1498C46.8889 27.8721 46.6444 28.4887 46.1333 28.9998L44.2333 30.8998ZM42.3 32.8665L28.1667 46.9998H22.5V41.3332L36.6333 27.1998L42.3 32.8665Z" fill="white"/>
                                        </g>
                                        </svg>
                                        <div class="todo-number">
                                                <h1>1</h1>
                                                <span>To-Do</span>
                                        </div>
                                </div>

                                <div class="summary-todo">
                                <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 70 70" fill="none">
                                <circle cx="35" cy="35" r="34.5" fill="#2A3647"/>
                                <path d="M20.0283 35.0001L31.2571 46.0662L49.9717 23.9341" stroke="white" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                        <div class="todo-number">
                                                <h1>1</h1>
                                                <span>Done</span>
                                        </div>
                                </div> 
                        </div>
                </div>
                <div class="summary-greetings">
                        <h3>Good morning,</h3>
                        <div class="summary-username">Test Test</div>
                </div>        
        </div>
        </div>
        `;
}

function renderAddTask() {
        let dashboard = document.getElementById('dashboard-content');
        dashboard.innerHTML = /*html*/`
        <h1>Add Task</h1>
        <div class="addtask-main-container">
                <div class="addtask-left-side">
                        <div class="addtask-title-container">
                                Title
                                <input placeholder="Enter a title" type="text" id="title">
                        </div>
                        <div class="addtask-description-container">
                                Description
                                <textarea name="description" id="description" cols="30" rows="10"></textarea>
                        </div>
                        <div class="addtask-assigned-to-container">
                                Assigned to
                                <div class="select-contacts-to-assign">
                                        <span>Select Contacts to assign</span><img src="./../img/arrow_drop_down.svg"> 
                                </div>
                        </div>
                </div>
                
        </div>
        `;
}