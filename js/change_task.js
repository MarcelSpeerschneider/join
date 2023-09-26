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
            <span class="bgc-technicaltask taskHeadline-bg">${todos[id]['taskCategory']}</span>
            <img class="cross-close-editForm" onclick="closeAddTaskForm()" src="./../img/cross.png">
        </div>
        <div class="taskFormSecondHeader">
            <p class="taskFormSecondHeader-title">${todos[id]['taskInputTitle']}</p>
            <span class="taskFormSecondHeader-description">${todos[id]['taskInputDescription']}</span>
        </div>
    </div>
    <div class="taskFormBody">
        <div class="priorityAndDateInfo">
            <p>Due date: </p>
            <p>Priority:</p>
        </div>
        <div class="priorityAndDateInfo">
            <p>${todos[id]['taskInputDate']}</p>
            <div id="taskPriority">

            </div>
        </div>
    </div>
    <div>
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
                <input type="checkbox" id="[${id}][${index}]" onclick="subTaskChecked(this.id)">
                <label>${subTasks[index]}</label>
            </div>
            `;
    }
}

function inputAssignedToHTML(id) {
    let assignedTo = todos[id]['tasksAssignedTo'];
    for (let index = 0; index < assignedTo.length; index++) {
        document.getElementById('assignedToList').innerHTML += /*html*/ `
            <div class="subTask-and-assignedTo">
                <label>Acronym</label>
                <label>${assignedTo[index]}</label>
            </div>
            `;
    }
}

function subTaskChecked(id){
    document.getElementById(`${id}`).checked = true;
}

function setPrio(id){
    let adjustedPrioName = todos[id]['taskPriority'].slice(5)
    adjustedPrioName = adjustedPrioName.charAt(0).toUpperCase() + adjustedPrioName.slice(1);
    document.getElementById('taskPriority').innerHTML += /*html*/ `
        <div>${adjustedPrioName}</div>
        <img src="./assets/img/pri-low.svg">
    `;
}