/**
 * Renders a pop-up for changing task details and displays it on the screen.
 *
 * @param {string} id - The ID of the task to be edited.
 */

function renderPopUpChangeTask(id) {
    let popUp = document.getElementById('overlay');
    popUp.innerHTML = HTMLrenderChangeTask(id);
    renderTaskChangeSelector(id);
    renderSubTasks(id);
    renderAssignedToArea(id);
    setPrio(id);
    openAddTaskForm();
}

/**
 * Check wheter a task was assigned to person(s). If yes, person acronym buttons will be rendered.
 * 
 * @param {string} id - This is the Task ID. Tasks are part of the todos Array.
 */
function renderAssignedToArea(id) {
    let assignedTo = todos[id]['tasksAssignedTo'];

    if(assignedTo.length>0){
        document.getElementById('subTaskListAndAssignedToListContainer').style.display = 'flex';
        for (let index = 0; index < assignedTo.length; index++) {
            let assignedToIndex = assignedTo[index];
            document.getElementById('assignedToList').innerHTML += HTMLrenderAssignedToArea(assignedToIndex);
        }
    }
}

/**
 * Check wheter a task has subtask(s). If yes, they will be rendered.
 * 
 * @param {string} id - This is the Task ID. Tasks are part of the todos Array.
 */
function renderSubTasks(id) {
    let subTasks = todos[id]['taskSubtasks'];
    let subTaskList = document.getElementById('subTaskList');
    let subTasksOverview = document.getElementById('subtasksOverview');
    let checkedValue = '';

    if (subTasks.length > 0) {
        subTasksOverview.style.display = 'flex';
        for (let i = 0; i < subTasks.length; i++) {
            let subTask = subTasks[i];
            if (subTask['status'] == 'todo') {
                subTaskList.innerHTML += HTMLrenderSubTasks(subTask, i, id, checkedValue);
            }
            else {
                let checkedValue = 'checked';
                subTaskList.innerHTML += HTMLrenderSubTasks(subTask, i, id, checkedValue);
                checkedValue = '';
            }
        }
    }
}

/**
 * Takes the id of the current selected task to get the Task status and create the array for the HTML selector Element
 * 
 * @param {string} id - of the selected ToDo from todos[]
 */
function renderTaskChangeSelector(id) {
    let status = ['todo', 'inprogress', 'awaitfeedback', 'done'];
    let currentStatus = todos[id]['taskStatus'];

    const index = status.indexOf(currentStatus);
    if (index > -1) { // only splice array when item is found
        status.splice(index, 1); // 2nd parameter means remove one item only
    }

    let pullDownMenuInput = document.getElementById('pullDownMenuForTaskChange');
    pullDownMenuInput.innerHTML = HTMLrenderTaskChangeSelector(id, status, currentStatus);
}

/**
 * Takes the id of the current selected task and write the new status from the selector menu to the todos array and to the backend.
 * 
 * @param {string} id - of the selected ToDo from todos[]
 */
async function changeStatusOfTask(id) {
    const selectedStatus = document.getElementById('statusOfTheTask');
    let currentStatus = todos[id]['taskStatus'];
    let newStatus = selectedStatus.value;
    let isDifferent = currentStatus.localeCompare(newStatus);

    if (isDifferent !== 0) {
        todos[id]['taskStatus'] = selectedStatus.value;
        await setItem('tasksjoin', JSON.stringify(todos));
    }
}

/**
 * Updates the status of a subtask when its checkbox is checked or unchecked.
 *
 * @param {number} id - The ID of the subtask being checked or unchecked.
 * @param {number} ToDoId - The ID of the parent task to which the subtask belongs.
 */

function subTaskChecked(id, ToDoId) {
    let subtask = document.getElementById(`subtask[${id}]`);
    if (subtask.checked) {
        todos[ToDoId]['taskSubtasks'][id]['status'] = 'done';  // Annahme, dass es ein 'status'-Feld gibt
        setItem("tasksjoin", todos);
    } else {
        todos[ToDoId]['taskSubtasks'][id]['status'] = 'todo';
        setItem("tasksjoin", todos);
    }
}

/**
 * Sets the priority of a task and displays it in the task's popup.
 *
 * @param {number} id - The ID of the task for which the priority is being set.
 */

function setPrio(id) {
    let adjustedPrioName = todos[id]['taskPriority'].slice(5)
    adjustedPrioName = adjustedPrioName.charAt(0).toUpperCase() + adjustedPrioName.slice(1);
    document.getElementById('taskPriority').innerHTML += /*html*/ `
        <div>${adjustedPrioName}</div>
        <img src="./assets/img/prio-low.svg">
    `;
}