// Global Elements
let todos = [
    {
        'id': 0,
        'taskStatus':'todo',
        'taskCategory':'User Story',
        'taskInputTitle': 'Aufräumen',
        'taskInputDescription': 'Code clean up',
        'taskInputDate':'',
        'taskpriority':'medium'
    },
    {
        'id': 1,
        'taskStatus':'inprogress',
        'taskCategory':'Technical Task',
        'taskInputTitle': 'Aufräumen',
        'taskInputDescription': 'Code clean up',
        'taskduedate':'',
        'taskpriority':'medium',
    },
    {
        'id': 2,
        'taskStatus':'awaitfeedback',
        'taskCategory':'User Story',
        'taskInputTitle': 'Aufräumen',
        'taskInputDescription': 'Code clean up',
        'taskduedate':'',
        'taskpriority':'medium',
    },
    {
        'id': 3,
        'taskStatus':'done',
        'taskCategory':'Technical Task',
        'taskInputTitle': 'Aufräumen',
        'taskInputDescription': 'Code clean up',
        'taskduedate':'',
        'taskpriority':'medium',
    }
];

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
    `
    updateBoard();
    renderPopUpAddTask();
}

function updateBoard() {
    let todo = todos.filter(t => t['taskStatus'] == 'todo');
    document.getElementById('todo').innerHTML = '';

    todo.forEach(element => {
        document.getElementById('todo').innerHTML += generateToDoHTML(element);
    });

    let inprogress = todos.filter(i => i['taskStatus'] == 'inprogress');
    document.getElementById('inprogress').innerHTML = '';

    inprogress.forEach(element => {
        document.getElementById('inprogress').innerHTML += generateToDoHTML(element);
    });

    let awaitfeedback = todos.filter(a => a['taskStatus'] == 'awaitfeedback');
    document.getElementById('awaitfeedback').innerHTML = '';

    awaitfeedback.forEach(element => {
        document.getElementById('awaitfeedback').innerHTML += generateToDoHTML(element);
    });

    let done = todos.filter(d => d['taskStatus'] == 'done');
    document.getElementById('done').innerHTML = '';

    done.forEach(element => {
        document.getElementById('done').innerHTML += generateToDoHTML(element);
    });
}

function generateToDoHTML(element) {
    let temp = element['taskCategory'].replace(/\s/g, '').toLowerCase();
    return /*html*/ `<div onclick="changeTask()" draggable="true" ondragstart="startDragging(${element['id']})" class="tasksInBoardOverview">
    <div onclick="openEditTaskForm()" class="edit-board-icon">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="edit">
    <mask id="mask0_84485_4268" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
    <rect id="Bounding box" width="24" height="24" fill="#D9D9D9"/>
    </mask>
    <g mask="url(#mask0_84485_4268)">
    <path id="edit_2" d="M5 19H6.4L15.025 10.375L13.625 8.975L5 17.6V19ZM19.3 8.925L15.05 4.725L16.45 3.325C16.8333 2.94167 17.3042 2.75 17.8625 2.75C18.4208 2.75 18.8917 2.94167 19.275 3.325L20.675 4.725C21.0583 5.10833 21.2583 5.57083 21.275 6.1125C21.2917 6.65417 21.1083 7.11667 20.725 7.5L19.3 8.925ZM17.85 10.4L7.25 21H3V16.75L13.6 6.15L17.85 10.4Z" fill="#2A3647"/>
    </g>
    </g>
    </svg>
    </div>
        <div class="bgc-${temp} taskHeadline-bg">${element['taskCategory']}</div>
        <div class="input-title">${element['taskInputTitle']}</div>
        <div>${element['taskInputDescription']}</div>
    </div>`;
}


function startDragging(id) {
    currentDraggedElement = id;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function moveTo(taskStatus) {
    todos[currentDraggedElement]['taskStatus'] = taskStatus;
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




