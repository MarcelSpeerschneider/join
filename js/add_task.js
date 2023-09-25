// Globale Variablen
let globalStatus = 'todo';

function openAddTaskForm() {
    document.getElementById('overlay').style.display = 'flex';
}

function closeAddTaskForm() {
    document.getElementById('overlay').style.display = 'none';
}

function renderPopUpAddTask(status) {
    if (status === 'todo' | status === 'inprogress' | status === 'awaitfeedback' | status === 'done') {
        openAddTaskForm();
        globalStatus = status;
    }
    let popUp = document.getElementById('overlay');
    popUp.innerHTML = HTMLrenderPopUpAddTask();
    updateBoard();
}

function HTMLrenderPopUpAddTask() {
    return /*html*/`
    <div class="addtask-popUp">
        <h1 style="padding-left: 5%; margin-bottom: 4%">Add Task</h1>
        <img class="cross-close" onclick="closeAddTaskForm()" src="./../img/cross.png">
    <form onsubmit="submitClassList('button-create-task')">
        <div class="addtask-content">
            <div class="addtask-side">
                <div class="addtask-title-container">
                    Title
                    <input class="taskInput" placeholder="Enter a title" type="text" id="title" required>
                </div>
                <div class="addtask-description-container">
                    Description
                    <textarea class="taskInput" name="description" id="description" cols="30" rows="10"
                        placeholder="Enter a description" required></textarea>
                </div>
                <div class="addtask-assigned-to-container">
                    Assigned to
                    <div class="select-contacts-to-assign" id="select-contacts-to-assign"
                        onclick="selectContactsToAssign()">
                        <span>Select Contacts to assign</span>
                        <div id="arrow-drop-down">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <mask id="mask0_83802_4068" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0"
                                    y="0" width="24" height="24">
                                    <rect width="24" height="24" fill="#D9D9D9" />
                                </mask>
                                <g mask="url(#mask0_83802_4068)">
                                    <path
                                        d="M11.3 14.3L8.69998 11.7C8.38331 11.3833 8.31248 11.0208 8.48748 10.6125C8.66248 10.2042 8.97498 10 9.42498 10H14.575C15.025 10 15.3375 10.2042 15.5125 10.6125C15.6875 11.0208 15.6166 11.3833 15.3 11.7L12.7 14.3C12.6 14.4 12.4916 14.475 12.375 14.525C12.2583 14.575 12.1333 14.6 12 14.6C11.8666 14.6 11.7416 14.575 11.625 14.525C11.5083 14.475 11.4 14.4 11.3 14.3Z"
                                        fill="#2A3647" />
                                </g>
                            </svg>
                        </div>

                        <div class="select-contacts-to-assign-dropdown" id="select-contacts-to-assign-dropdown"
                            onclick="childFunction(event)">
                            <!-- Here the contacts will be rendered in -->
                            <button class="add-new-contact-button">Add new Contact</button>
                        </div>
                    </div>

                    <div class="select-contacts-to-assign-dropdown-contact-bottom-container">
                        <div class="select-contacts-to-assign-dropdown-contact" id="contact-summary">
                            <!-- Hier the credentials will be rendered in -->
                        </div>
                    </div>
                </div>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="2" height="426" viewBox="0 0 2 426" fill="none"
                id="addtask-separator">
                <path d="M1.24805 1L1.24854 425" stroke="#D1D1D1" stroke-linecap="round" />
            </svg>
            <div class="addtask-side">
                <div class="addtask-title-container">
                    Due date
                    <input class="taskInput" type="date" id="due-date" name="due-date" min="1900-01-01" max="2099-12-31"
                        class="addtask-dates-select" required>
                </div>
                <div class="addtask-prio-main-container">
                    <div class="addtask-prio-container priority" id="prio-urgent" onclick="prioContainer('urgent')">
                        Urgent <img src="./../img/prio-urgent.svg">
                    </div>
                    <div class="addtask-prio-container priority pre-selected" id="prio-medium" onclick="prioContainer('medium')" data-selected="true">
                        Medium <img src="./../img/prio-medium.svg">
                    </div>
                    <div class="addtask-prio-container priority" id="prio-low" onclick="prioContainer('low')">
                        Low <img src="./../img/prio-low.svg">
                    </div>
                </div>
                <div class="addtask-category-container">
                    Category
                    <select name="category" id="select-category" class="taskInput">
                        <option value="" disabled>Select a category</option>
                        <option value="Technical Task">Technical Task</option>
                        <option value="User Story">User Story</option>
                    </select>
                </div>
                <div class="addtask-assigned-to-container">
                    Subtasks
                    <div class="add-new-subtask">
                        <input placeholder="Add new subtask" id="add-new-subtask-input">
                        <div class="add-new-subtask-icon-container" id="add-new-subtask-icon-container"><img
                                src="./../img/add-subtask.svg" class="add-new-subtask-plus"
                                onclick="selectNewSubtask()">
                        </div>
                    </div>
                    <div>
                        <ul class="add-new-subtask-list"></ul>
                    </div>
                </div>
            </div>

        </div>
        <div class="add-task-bottom-button">
            <div class="add-task-bottom-button-left-side"></div>
            <div class="add-task-bottom-button-right-side">
                <div class="add-task-bottom-button-container">
                    <button type="reset" class="button-clear" id="button-clear" onclick=submitClassList(this.id) onmouseover="buttonCreateTaskChangeColor()"
                        onmouseout="buttonCreateTaskChangeColorBack()">Clear<svg width="25" height="24"
                            viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                            id="add-task-icon-cancel">
                            <path
                                d="M12.2495 12.0001L17.4925 17.2431M7.00653 17.2431L12.2495 12.0001L7.00653 17.2431ZM17.4925 6.75708L12.2485 12.0001L17.4925 6.75708ZM12.2485 12.0001L7.00653 6.75708L12.2485 12.0001Z"
                                stroke="#2A3647" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </button>
                    <button class="button-create-task">Create Task<img src="./../img/check.svg"
                            id="button-create-task"></button>
                </div>
            </div>
        </div>
    </form>
</div>
`;
}

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

function HTMLrenderNewSubtask(newSubTaskValue) {
    return /*html*/`
        <div class="subTask">
            <input type="checkbox"><span>${newSubTaskValue}</span>
        </div>
    `;
}

function submitClassList(id) {
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

function resetPlaceHolder(elementByID) {
    let placeholderValue = document.getElementById(`${elementByID}`).placeholder;
    let emptyValue = document.getElementById(`${elementByID}`);
    emptyValue.value = '';
    document.getElementById(`${elementByID}`).placeholder = `${placeholderValue}`;
    document.getElementById('contact-summary').innerHTML = '';
    selectedContacts = [];
    subTasks = [];
}

function addTaskToArray(valueOfInput, taskPriority) {
    let id = todos.length;
    let myObject = {
        'id': id,
        'taskCategory': valueOfInput[3],
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