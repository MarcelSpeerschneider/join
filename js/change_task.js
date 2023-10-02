/**
 * Renders a pop-up for changing task details and displays it on the screen.
 *
 * @param {string} id - The ID of the task to be edited.
 */

function renderPopUpChangeTask(id) {
    let popUp = document.getElementById('overlay');
    popUp.innerHTML = HTMLrenderChangeTask(id);
    renderTaskChangeSelector(id);
    inputSubTasksHTML(id);
    inputAssignedToHTML(id);
    setPrio(id);
    openAddTaskForm();
}

function renderTaskChangeSelector(id){
    let status = ['todo','inprogress','awaitfeedback','done'];
    let currentStatus = todos[id]['taskStatus'];

    const index = status.indexOf(currentStatus);
    if (index > -1) { // only splice array when item is found
        status.splice(index, 1); // 2nd parameter means remove one item only
    }

    let pullDownMenuInput = document.getElementById('pullDownMenuForTaskChange');
    pullDownMenuInput.innerHTML = HTMLrenderTaskChangeSelector(id, status,currentStatus);
}

function HTMLrenderTaskChangeSelector(id, status,currentStatus){
    let taskID = id;
    return /*html*/ `
    <select name="statusOfTheTask" id="statusOfTheTask" onchange="changeStatusOfTask(${taskID})">
        <option selected value=${currentStatus}>${currentStatus}</option>
        <option value=${status[0]}>${status[0]}</option>
        <option value=${status[1]}>${status[1]}</option>
        <option value=${status[2]}>${status[2]}</option>
    </select>`;
}

async function changeStatusOfTask(id){
    const selectedStatus = document.getElementById('statusOfTheTask');
    todos[id]['taskStatus'] = selectedStatus.value;
    await setItem('tasksjoin', JSON.stringify(todos));
    updateBoard();
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