// Global Elements
let todos = [
    {
        'id': 0,
        'taskcategory':'todo',
        'taskDepartment':'Development',
        'taskInputTitle': 'Aufräumen',
        'taskInputDescription': 'Code clean up',
        'taskInputDate':'',
        'taskpriority':'medium'
    },
    {
        'id': 1,
        'taskcategory':'inprogress',
        'taskDepartment':'Marketing',
        'taskInputTitle': 'Aufräumen',
        'taskInputDescription': 'Code clean up',
        'taskduedate':'',
        'taskpriority':'medium',
    },
    {
        'id': 2,
        'taskcategory':'awaitfeedback',
        'taskDepartment':'Einkauf',
        'taskInputTitle': 'Aufräumen',
        'taskInputDescription': 'Code clean up',
        'taskduedate':'',
        'taskpriority':'medium',
    },
    {
        'id': 3,
        'taskcategory':'done',
        'taskDepartment':'Support',
        'taskInputTitle': 'Aufräumen',
        'taskInputDescription': 'Code clean up',
        'taskduedate':'',
        'taskpriority':'medium',
    }
];

let currentDraggedElement;

function renderBoard() {
    let board = document.getElementById('dashboard-content');
    board.innerHTML = /*html*/`
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
            <button class="addTaskButton" onclick="openAddTaskForm()">Add task<img src="./../img/add.png"></button>
        </div>
    </div>
    <div class="board-content-container">
        <div class="board-card">
            <div class="board-card-header">
                <p>To do</p>
                <img src="./../img/Capa.png" onclick="openAddTaskForm()">
            </div>
            <div class="drag-area" id="todo" ondrop="moveTo('todo')" ondragleave="removeHighlight('todo')" ondragover="allowDrop(event); highlight('todo')">

            </div>
        </div>
        <div class="board-card">
            <div class="board-card-header">
                <p>In progress</p>
                <img src="./../img/Capa.png" onclick="openAddTaskForm()">
            </div>
            <div  class="drag-area" id="inprogress" ondrop="moveTo('inprogress')" ondragleave="removeHighlight('inprogress')" ondragover="allowDrop(event); highlight('inprogress')">

            </div>
        </div>
        <div class="board-card">
            <div class="board-card-header">
                <p>Await feedback</p>
                <img src="./../img/Capa.png" onclick="openAddTaskForm()">
            </div>
            <div class="drag-area" id="awaitfeedback" ondrop="moveTo('awaitfeedback')" ondragleave="removeHighlight('awaitfeedback')" ondragover="allowDrop(event); highlight('awaitfeedback')">

            </div>
        </div>
        <div class="board-card">
            <div class="board-card-header">
                <p>Done</p>
                <img src="./../img/Capa.png" onclick="openAddTaskForm()">
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
    let todo = todos.filter(t => t['taskcategory'] == 'todo');
    document.getElementById('todo').innerHTML = '';

    todo.forEach(element => {
        document.getElementById('todo').innerHTML += generateToDoHTML(element);
    });

    let inprogress = todos.filter(i => i['taskcategory'] == 'inprogress');
    document.getElementById('inprogress').innerHTML = '';

    inprogress.forEach(element => {
        document.getElementById('inprogress').innerHTML += generateToDoHTML(element);
    });

    let awaitfeedback = todos.filter(a => a['taskcategory'] == 'awaitfeedback');
    document.getElementById('awaitfeedback').innerHTML = '';

    awaitfeedback.forEach(element => {
        document.getElementById('awaitfeedback').innerHTML += generateToDoHTML(element);
    });

    let done = todos.filter(d => d['taskcategory'] == 'done');
    document.getElementById('done').innerHTML = '';

    done.forEach(element => {
        document.getElementById('done').innerHTML += generateToDoHTML(element);
    });
}

function generateToDoHTML(element) {
    return `<div onclick="changeTask()" draggable="true" ondragstart="startDragging(${element['id']})" class="tasksInBoardOverview">
        <div class="bgc-${element['taskDepartment']} taskHeadline-bg">${element['taskDepartment']}</div>
        <div>${element['taskInputTitle']}</div>
        <div>${element['taskInputDescription']}</div>
    </div>`;;
}

function startDragging(id) {
    currentDraggedElement = id;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function moveTo(taskcategory) {
    todos[currentDraggedElement]['taskcategory'] = taskcategory;
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