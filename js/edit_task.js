/**
 * Renders the edit task pop-up for the task with the specified ID, pre-filling the form with task details.
 * @param {number} id - The ID of the task to edit.
 */

function renderEditTaskPopUp(id) {
    let popUp = document.getElementById(`renderChangeTask${id}`);
    popUp.innerHTML = HTMLrenderEditTask(id);
    selectedContacts = todos[id]['tasksAssignedTo'];
    editTaskSelectCategory(id);
    selectContactsToAssign();
    editTaskAddNewSubtask(id);
    editTaskGetPriority(id);
}

/**
 * Pre-selects the category option in the edit task form based on the task's category.
 * @param {number} id - The ID of the task to edit.
 */

function editTaskSelectCategory(id) {
    const select = document.getElementById("select-category");
    const option = select.querySelector(`[value='${todos[id]['taskInputCategory']}']`);
    option.selected = true;
}

/**
 * Renders the existing subtasks for editing in the edit task form.
 * @param {number} id - The ID of the task to edit.
 */

function editTaskAddNewSubtask(id) {
    let container = document.querySelector('.add-new-subtask-list');
    subTasks = todos[id]['taskSubtasks'];
    for (let i = 0; i < todos[id]['taskSubtasks'].length; i++) {
        const subtask = todos[id]['taskSubtasks'][i]['description'];
        container.innerHTML += /*html*/`<li><input id="add-new-subtask-listinput${i}" value="${subtask}" disabled>
        <div class="add-new-subtask-icon-container-list" id="add-new-subtask-icon-container-list${i}">
            <img src="./assets/img/edit-icon.svg" onclick="editNewSubtaskInput(${i})">|
            <img src="./assets/img/delete-icon.svg" onclick="clearNewSubtaskInput(${i})">
        </div></li>`;
    }
}

/**
 * Sets the priority selection in the edit task form based on the task's existing priority.
 * @param {number} id - The ID of the task to edit.
 */

function editTaskGetPriority(id) {
    let container = document.getElementById(`${todos[id]['taskPriority']}`);
    container.setAttribute("data-selected", "true");
    editTaskCheckPriority(id);
}

/**
 * Checks and updates the visual representation of the priority selection in the edit task form.
 * @param {number} id - The ID of the task being edited.
 */

function editTaskCheckPriority(id) {
    let containerClicked = document.getElementById(`${todos[id]['taskPriority']}`);

    if (containerClicked.getAttribute('data-selected') === 'true') {
        containerClicked.style.backgroundColor = "#3b4e69";
        containerClicked.style.color = "#FFFFFF";
    } else {
        containerClicked.style.backgroundColor = "#FFFFFF";
        containerClicked.style.color = "black";
    }
}

/**
 * Retrieves input values and selected priority for editing a task and invokes the editTaskSaveTask function.
 * @param {number} id - The ID of the task being edited.
 */

 function editTaskGetInputs(id) {
     let addTaskElements = document.getElementsByClassName('taskInput');
     let taskPriority = '';
     let valueOfInputs = [];

     for (let index = 0; index < addTaskElements.length; index++) {
         elementByID = addTaskElements[index]['id'];
         valueOfInputs.push(document.getElementById(elementByID).value);
     }
     const elements = document.querySelectorAll('.priority');

     for (let i = 0; i < elements.length; i++) {
         if (elements[i].getAttribute('data-selected') === 'true') {
             taskPriority = elements[i].id;
             break
         }
     }
     editTaskSaveTask(id, valueOfInputs, taskPriority);
 }

 /**
 * Saves edited task information and updates the task in the todos array.
 * @param {number} id - The ID of the task being edited.
 * @param {string[]} valueOfInputs - An array containing input values.
 * @param {string} taskPriority - The priority of the edited task.
 */

 function editTaskSaveTask(id, valueOfInputs, taskPriority) {
    let status = todos[id]['taskStatus'];
     todos[id] = {
        'id': id,
        'taskStatus': status,
        'taskInputTitle': valueOfInputs[0],
        'taskInputDescription': valueOfInputs[1],
        'taskInputDate': valueOfInputs[2],
        'taskPriority': taskPriority,
        'taskInputCategory': valueOfInputs[3],
        'taskSubtasks': subTasks,
        'tasksAssignedTo': selectedContacts
     };

     selectedContacts = [];
     subTasks = [];
     setItem("tasksjoin", todos);
     renderBoardSite();
 }

 /**
 * Clears the input field of a new subtask and removes it from the subTasks array.
 * @param {number} i - The index of the subtask to clear and remove.
 */

 function clearNewSubtaskInput(i) {
    document.getElementById(`add-new-subtask-listinput${i}`).value = '';
    subTasks.splice(i, 1);
    addNewSubtask();
}