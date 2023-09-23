// Global Elements
let todos = [];
let todo = [];
let dateCollection = [];
let inprogress, awaitfeedback, done, urgentPriority, prioPictureSource;

let currentDraggedElement;

function renderBoard() {
    return /*html*/`
        <div class="board-header">
        <div class="board-header-left">Board</div>
            <!-- <p>Board</p> -->
        <div class="board-header-right">
            <div class="boardSearchContainer">
                <input oninput="searchTask()" id="searchInput" class="boardSearchInputField" type="text" placeholder="Find task">
                <div class="boardSearchBtn">
                    <img src="./../img/search.png" alt="">
                </div>
            </div>
            <!-- <button class="addTaskButton" onclick="openAddTaskForm()">Add task<img src="./../img/add.png"></button> -->
            <button class="addTaskButton" onclick="renderPopUpAddTask('todo')">Add task<img src="./../img/add.png"></button>
        </div>
    </div>
    <div class="board-content-container">
        <div class="board-card">
            <div class="board-card-header">
                <p>To do</p>
                <img src="./../img/Capa.png" onclick="renderPopUpAddTask('todo')">
            </div>
            <div class="drag-area" id="todo" ondrop="moveTo('todo')" ondragleave="removeHighlight('todo')" ondragover="allowDrop(event); highlight('todo')">

            </div>
        </div>
        <div class="board-card">
            <div class="board-card-header">
                <p>In progress</p>
                <img src="./../img/Capa.png" onclick="renderPopUpAddTask('inprogress')">
            </div>
            <div  class="drag-area" id="inprogress" ondrop="moveTo('inprogress')" ondragleave="removeHighlight('inprogress')" ondragover="allowDrop(event); highlight('inprogress')">

            </div>
        </div>
        <div class="board-card">
            <div class="board-card-header">
                <p>Await feedback</p>
                <img src="./../img/Capa.png" id="" onclick="renderPopUpAddTask('awaitfeedback')">
            </div>
            <div class="drag-area" id="awaitfeedback" ondrop="moveTo('awaitfeedback')" ondragleave="removeHighlight('awaitfeedback')" ondragover="allowDrop(event); highlight('awaitfeedback')">

            </div>
        </div>
        <div class="board-card">
            <div class="board-card-header">
                <p>Done</p>
                <img src="./../img/Capa.png" onclick="renderPopUpAddTask('done')">
            </div>
            <div class="drag-area" id="done" ondrop="moveTo('done')" ondragleave="removeHighlight('done')" ondragover="allowDrop(event); highlight('done')">

            </div>
        </div>
    </div>
    <div id="overlay" class="overlayStyle">
        <div id="overlayContent" class="overlay-content">
        </div>
    </div>

    <div id="openEditTaskPopUpContainer">
        <div class="edit-popup-content">

        </div>
    </div>
    `
}

async function updateBoard() {
    await getTaskByStatusAndPrio();

    // todo = todos.filter(t => t['taskStatus'] == 'todo');
    document.getElementById('todo').innerHTML = '';

    todo.forEach(element => {
        document.getElementById('todo').innerHTML += generateToDoHTML(element);
    });

    // inprogress = todos.filter(i => i['taskStatus'] == 'inprogress');
    document.getElementById('inprogress').innerHTML = '';

    inprogress.forEach(element => {
        document.getElementById('inprogress').innerHTML += generateToDoHTML(element);
    });

    // awaitfeedback = todos.filter(a => a['taskStatus'] == 'awaitfeedback');
    document.getElementById('awaitfeedback').innerHTML = '';

    awaitfeedback.forEach(element => {
        document.getElementById('awaitfeedback').innerHTML += generateToDoHTML(element);
    });

    // done = todos.filter(d => d['taskStatus'] == 'done');
    document.getElementById('done').innerHTML = '';

    done.forEach(element => {
        document.getElementById('done').innerHTML += generateToDoHTML(element);
    });
}

async function getTaskByStatusAndPrio() {
    await loadTasks();
    todo = todos.filter(t => t['taskStatus'] == 'todo');
    inprogress = todos.filter(i => i['taskStatus'] == 'inprogress');
    awaitfeedback = todos.filter(a => a['taskStatus'] == 'awaitfeedback');
    done = todos.filter(d => d['taskStatus'] == 'done');
    urgentPriority = todos.filter(prioH => prioH['taskPriority'] == 'prio-urgent');
    checkSmallestDate();
}

function checkSmallestDate() {
    dateCollection = [];
    for (let index = 0; index < todos.length; index++) {
        dateCollection.push(todos[index]['taskInputDate']);
    }
    dateCollection.sort(function (a, b) {
        let dateA = new Date(a);
        let dateB = new Date(b);
        return dateA - dateB;
    });
}

function deleteTask(taskId) {
    const taskIndex = todos.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
        todos.splice(taskIndex, 1);
        updateBoard();
    }
}

function deleteTask(taskId) {
    const taskIndex = todos.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
        todos.splice(taskIndex, 1);
        updateBoard();
    }
}

function generateToDoHTML(element) {
    // let temp = element['taskCategory'].replace(/\s/g, '').toLowerCase();
    // return /*html*/ `
    // <div onclick="changeTask()" draggable="true" ondragstart="startDragging(${element['id']})" class="tasksInBoardOverview">
    // <div onclick="openEditTaskForm()" class="edit-board-icon">
    //  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    // <g id="edit">
    // <mask id="mask0_84485_4268" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
    // <rect id="Bounding box" width="24" height="24" fill="#D9D9D9"/>
    // </mask>
    // <g mask="url(#mask0_84485_4268)">
    // <path id="edit_2" d="M5 19H6.4L15.025 10.375L13.625 8.975L5 17.6V19ZM19.3 8.925L15.05 4.725L16.45 3.325C16.8333 2.94167 17.3042 2.75 17.8625 2.75C18.4208 2.75 18.8917 2.94167 19.275 3.325L20.675 4.725C21.0583 5.10833 21.2583 5.57083 21.275 6.1125C21.2917 6.65417 21.1083 7.11667 20.725 7.5L19.3 8.925ZM17.85 10.4L7.25 21H3V16.75L13.6 6.15L17.85 10.4Z" fill="#2A3647"/>
    // </g>
    // </g>
    // </svg>
    // </div>
    //     <div class="bgc-${temp} taskHeadline-bg">${element['taskCategory']}</div>
    //     <div class="input-title">${element['taskInputTitle']}</div>
    //     <div>${element['taskInputDescription']}</div>
    // </div>`;

    if(element['taskPriority'] === 'prio-urgent'){
        prioPictureSource = "./../img/prio-urgent.svg";
    }
    else if(element['taskPriority'] === 'prio-medium'){
        prioPictureSource = "./../img/prio-medium.svg";
    }
    else if(element['taskPriority'] === 'prio-low'){
        prioPictureSource = "./../img/prio-low.svg";
    }
    debugger;
    let temp = element['taskCategory'].replace(/\s/g, '').toLowerCase();
    return /*html*/ `
    <div onclick="changeTask()" draggable="true" ondragstart="startDragging(${element['id']})" class="tasksInBoardOverview">
        <div class="taskCardInBoard">
            <div class="bgc-${temp} taskHeadline-bg">${element['taskCategory']}</div>
            <div class="input-title">${element['taskInputTitle']}</div>
            <div>${element['taskInputDescription']}</div>
            <div class="TaskInBoardFooter">
                <div></div>
                <div><img src=${prioPictureSource}></div>
            </div>
        </div>
    </div>
    `;


}


function startDragging(id) {
    currentDraggedElement = id;
}

function allowDrop(ev) {
    ev.preventDefault();
}

async function moveTo(taskStatus) {
    todos[currentDraggedElement]['taskStatus'] = taskStatus;
    await setItem('tasksjoin', JSON.stringify(todos));
    updateBoard();
}

function highlight(id) {
    document.getElementById(id).classList.add('drag-area-highlight');
}

function removeHighlight(id) {
    document.getElementById(id).classList.remove('drag-area-highlight');
}

function showTask() {
    document.getElementById('overlay').classList.add('overlayStyle');
}

function openEditTaskForm() {
    let content = document.getElementById('openEditTaskPopUpContainer');
    content.style.display = "flex";
    content.innerHTML = returnEditPopUpHTML();
}

function returnEditPopUpHTML() {

    return /*html*/ `<div class="edittask-main-content">
    <img class="close-edit-popup" onclick="closeEditTaskForm()" src="./../img/cross.png">
    <h1 style="padding-left: 5%; margin-bottom: 4%">Add Task</h1>
    <form onsubmit="editTask()">
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
                        <option value="technical-task">Technical Task</option>
                        <option value="user-story">User Story</option>
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
                        onmouseout="buttonCreateTaskChangeColorBack()">Delete Task<svg width="25" height="24"
                            viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                            id="add-task-icon-cancel">
                            <path
                                d="M12.2495 12.0001L17.4925 17.2431M7.00653 17.2431L12.2495 12.0001L7.00653 17.2431ZM17.4925 6.75708L12.2485 12.0001L17.4925 6.75708ZM12.2485 12.0001L7.00653 6.75708L12.2485 12.0001Z"
                                stroke="#2A3647" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </button>
                    <button class="button-create-task">Save Edit<img src="./../img/check.svg"
                            id="button-create-task"></button>
                </div>
            </div>
        </div>
    </form>
</div>`;
}

function closeEditTaskForm() {
    let edittask = document.getElementById('openEditTaskPopUpContainer');
    edittask.style.display = "none";
}