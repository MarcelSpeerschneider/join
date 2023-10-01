function renderPopUpChangeTask(id) {
    let popUp = document.getElementById('overlay');
    popUp.innerHTML = HTMLrenderChangeTask(id);
    inputSubTasksHTML(id);
    inputAssignedToHTML(id);
    setPrio(id);
    openAddTaskForm();
}

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

function setPrio(id) {
    let adjustedPrioName = todos[id]['taskPriority'].slice(5)
    adjustedPrioName = adjustedPrioName.charAt(0).toUpperCase() + adjustedPrioName.slice(1);
    document.getElementById('taskPriority').innerHTML += /*html*/ `
        <div>${adjustedPrioName}</div>
        <img src="./assets/img/prio-low.svg">
    `;
}