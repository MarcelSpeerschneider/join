function renderPopUpChangeTask(id) {
    let popUp = document.getElementById('overlay');
    popUp.innerHTML = HTMLrenderChangeTask(id);
    inputSubTasksHTML(id);
    openAddTaskForm();
}

function HTMLrenderChangeTask(id) {
    return /*html*/ `
<div id="${id}" class="existingTaskOverviewPopUp">
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
            <p>Priority</p>
        </div>
        <div class="priorityAndDateInfo">
            <p>${todos[id]['taskInputDate']}</p>
            <p>${todos[id]['taskPriority']}</p>
        </div>
    </div>
    <div id="infoAssignedTo">
        <p>Asigned to:</p>
        <div>Hier kommen dann die Divs mit Namen</div>
    </div>
    <div id="subtasksOverview">
        <p>Subtasks:</p>
        <div id="subtasks" class="subtasks">

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
        document.getElementById('subtasks').innerHTML += /*html*/ `
            <div class="subtask">
                <input type="checkbox" id="[${id}][${index}]" onclick="subTaskChecked(this.id)">
                <label>${subTasks[index]}</label>
            </div>
            `;
    }
}

function subTaskChecked(id){
    document.getElementById(`${id}`).checked = true;
}