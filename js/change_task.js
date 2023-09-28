function renderPopUpChangeTask(id) {
    let popUp = document.getElementById('overlay');
    popUp.innerHTML = HTMLrenderChangeTask(id);
    inputSubTasksHTML(id);
    inputAssignedToHTML(id);
    setPrio(id);
    openAddTaskForm();
}

function HTMLrenderChangeTask(id) {
    return /*html*/ `
<div id="renderChangeTask${id}" class="existingTaskOverviewPopUp">
    <div class="taskFormHeader">
        <div class="taskFormFirstHeader">
            <span class="bgc-technicaltask taskHeadline-bg">${todos[id]['taskInputCategory']}</span>
            <img class="cross-close-editForm" onclick="closeAddTaskForm()" src="./../img/cross.png">
        </div>
        <div class="taskFormSecondHeader">
            <p class="taskFormSecondHeader-title">${todos[id]['taskInputTitle']}</p>
            <span class="taskFormSecondHeader-description">${todos[id]['taskInputDescription']}</span>
        </div>
    </div>
    <div class="taskFormBody">
        <div class="priorityAndDateInfo">
            <div class="changeTastPriorityContainer">
            <span>Priority:</span>
            <div id="taskPriority"></div>
            </div>
        </div>
        <div class="priorityAndDateInfo">
            <span>Due date: </span>
            <span>${todos[id]['taskInputDate']}</span>
        </div>
    </div>
    <div class="subTaskList-and-assignedToList-container">
        <p>Asigned to:</p>
        <div id="assignedToList" class="subTaskList-and-assignedToList">

        </div>
    </div>
    <div id="subtasksOverview">
        <p>Subtasks:</p>
        <div id="subTaskList" class="subTaskList-and-assignedToList">

        </div>
    </div>
    <div class="deleteEditContainer">
        <div class="deleteEditFunctions" onclick="deleteTask(${id})">
            <img src="./../img/delete.svg">
            <span>Delete</span>
        </div>
        <div class="deleteEditFunctions" onclick="renderEditTaskPopUp(${id})">
            <img src="./../img/edit.svg">
            <span>Edit</span>
        </div>
    </div>
</div>
    `;
}

function inputSubTasksHTML(id) {
    let subTasks = todos[id]['taskSubtasks'];
    for (let index = 0; index < subTasks.length; index++) {
        document.getElementById('subTaskList').innerHTML += /*html*/ `
            <div class="subTask-and-assignedTo">
                <input type="checkbox" id="subtask[${index}]" onclick="subTaskChecked(this.id)">
                <label>${subTasks[index]['description']}</label>
            </div>
            `;
    }
}

function inputAssignedToHTML(id) {
    let assignedTo = todos[id]['tasksAssignedTo'];
    for (let index = 0; index < assignedTo.length; index++) {
        document.getElementById('assignedToList').innerHTML += /*html*/ `
            <div class="select-contacts-to-assign-dropdown-contact">
                                    <div class="select-contacts-to-assign-dropdown-contact-credentials-container">
                                        <svg width="28" height="28">
                                            <circle cx="14" cy="14" r="14" fill=${getRandomColor()} />
                                        </svg>
                                        <div class="select-contacts-to-assign-dropdown-contact-credentials">${generateCredentials(assignedTo[index])}</div>
                                    </div>
                                    <div class="select-contacts-to-assign-dropdown-contactname">${assignedTo[index]}</div>
                                    </div>
            `;
    }
}

function subTaskChecked(id) {
    
}

function setPrio(id) {
    let adjustedPrioName = todos[id]['taskPriority'].slice(5)
    adjustedPrioName = adjustedPrioName.charAt(0).toUpperCase() + adjustedPrioName.slice(1);
    document.getElementById('taskPriority').innerHTML += /*html*/ `
        <div>${adjustedPrioName}</div>
        <img src="./../img/prio-low.svg">
    `;
}