/**
 * global variable globalStatus
 */ 

let globalStatus = 'todo';

/**
 * Opens the add task form by displaying an overlay.
 */

function openAddTaskForm() {
    document.getElementById('overlay').style.display = 'flex';
}

/**
 * Closes the add task form by hiding an overlay, resetting subtask and contact selections, and rendering the board site.
 */

function closeAddTaskForm() {
    document.getElementById('overlay').style.display = 'none';
    subTasks = [];
    selectedContacts = [];
    renderBoardSite();
}

/**
 * Renders a pop-up add task form based on the given status and updates the board accordingly.
 * @param {string} status - The status of the task ('todo', 'inprogress', 'awaitfeedback', 'done').
 */

async function renderPopUpAddTask(status) {
    if (status === 'todo' | status === 'inprogress' | status === 'awaitfeedback' | status === 'done') {
        openAddTaskForm();
        globalStatus = status;
    }
    let popUp = document.getElementById('overlay');
    popUp.innerHTML = HTMLrenderPopUpAddTask();
    getMinDate();
    await updateBoard();
}

/**
 * Renders a new subtask based on the input value and appends it to the subtask list.
 */

function renderNewSubtask() {
    let newSubTaskValue = document.getElementById('addNewSubtask').value;
    if (newSubTaskValue === '') {
        return;
    } else {
        let subTaskList = document.getElementById('subTaskList');
        subTaskList.innerHTML += HTMLrenderNewSubtask(newSubTaskValue);
        document.getElementById('addNewSubtask').value = '';
    }
}

/**
 * Generates HTML markup for a new subtask based on the provided value.
 * @param {string} newSubTaskValue - The value for the new subtask.
 * @returns {string} - The generated HTML markup for the subtask.
 */

function HTMLrenderNewSubtask(newSubTaskValue) {
    return /*html*/`
        <div class="subTask">
            <input type="checkbox"><span>${newSubTaskValue}</span>
        </div>
    `;
}

/**
 * Submits the values of elements with the 'taskInput' class and handles tasks based on the provided button ID.
 * @param {string} id - The ID of the button ('button-clear' or 'button-create-task').
 */

function submitClassList(id) {
    debugger;
    let addTaskElements = document.getElementsByClassName('taskInput');
    let elementByID = '';
    let valueOfInput = [];
    let taskPriority = '';

    for (let index = 0; index < addTaskElements.length; index++) {
        elementByID = addTaskElements[index]['id'];
        valueOfInput.push(document.getElementById(elementByID).value);
        if (id === 'button-clear') {
            resetPlaceHolder(elementByID);
        }
    }
    if (id === 'button-create-task') {
        const elements = document.querySelectorAll('.priority');

        for (let i = 0; i < elements.length; i++) {
            if (elements[i].getAttribute('data-selected') === 'true') {
                taskPriority = elements[i].id;
                break
            }
        }
        addTaskToArray(valueOfInput, taskPriority);
    }
}

/**
 * Resets the placeholder value and input value of an element and clears selected contacts and subtasks.
 * @param {string} elementByID - The ID of the element to reset.
 */

function resetPlaceHolder(elementByID) {
    let placeholderValue = document.getElementById(`${elementByID}`).placeholder;
    let emptyValue = document.getElementById(`${elementByID}`);
    emptyValue.value = '';
    document.getElementById(`${elementByID}`).placeholder = `${placeholderValue}`;
    document.getElementById('contact-summary').innerHTML = '';
    selectedContacts = [];
    subTasks = [];
}

/**
 * Adds a new task object to the 'todos' array based on the provided values and priorities.
 * @param {string[]} valueOfInput - An array of input values for the task.
 * @param {string} taskPriority - The priority of the task.
 */

function addTaskToArray(valueOfInput, taskPriority) {
    let id = todos.length;
    let myObject = {
        'id': id,
        'taskStatus': globalStatus,
        'taskInputTitle': valueOfInput[0],
        'taskInputDescription': valueOfInput[1],
        'taskInputDate': valueOfInput[2],
        'taskPriority': taskPriority,
        'taskInputCategory': valueOfInput[3],
        'taskSubtasks': subTasks,
        'tasksAssignedTo': selectedContacts

    };
    globalStatus = 'todo';
    selectedContacts = [];
    subTasks = [];
    todos.push(myObject);
    setItem("tasksjoin", todos);
    renderBoardSite();
}

/**
 * Sets the minimum date attribute for an input field to today's date.
 */

function getMinDate() {
    function getTodayDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Monate sind 0-basiert, also +1 und formatiert auf 2 Stellen
        const day = String(today.getDate()).padStart(2, '0'); // Formatiert auf 2 Stellen

        return `${year}-${month}-${day}`;
    }

    const inputDate = document.getElementById('due-date');
    inputDate.setAttribute('min', getTodayDate());
};