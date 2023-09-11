// Global Elements
let todos = [
    {
        'id': 0,
        'taskcategory':'todo',
        'taskdepartment':'Development',
        'taskheadline': 'Aufräumen',
        'taskdescription': 'Code clean up',
        'taskduedate':'',
        'taskpriority':'medium',
        'taskassignedto':[
            {
                'assigne1':'Andreas',
                'assigne2':'Marcel',
                'assigne3':'Ivan'
            }
        ]
    },
    {
        'id': 1,
        'taskcategory':'inprogress',
        'taskdepartment':'Marketing',
        'taskheadline': 'Product News',
        'taskdescription': 'Neues Produkt anpreisen',
        'taskduedate':'',
        'taskpriority':'medium',
        'taskassignedto':[
            {
                'assigne1':'Andreas',
                'assigne2':'Marcel',
                'assigne3':'Ivan'
            }
        ]
    },
    {
        'id': 2,
        'taskcategory':'awaitfeedback',
        'taskdepartment':'Einkauf',
        'taskheadline': 'Einkaufen',
        'taskdescription': 'Neue Büromöbel',
        'taskduedate':'',
        'taskpriority':'medium',
        'taskassignedto':[
            {
                'assigne1':'Andreas',
                'assigne2':'Marcel',
                'assigne3':'Ivan'
            }
        ]
    },
    {
        'id': 3,
        'taskcategory':'done',
        'taskdepartment':'Geschäftsführung',
        'taskheadline': 'Einstellungen',
        'taskdescription': 'Personalgespräche führen',
        'taskduedate':'',
        'taskpriority':'medium',
        'taskassignedto':[
            {
                'assigne1':'Andreas',
                'assigne2':'Marcel',
                'assigne3':'Ivan'
            }
        ]
    }
];

let currentDraggedElement;

function renderBoard() {
    let board = document.getElementById('dashboard-content');
    board.innerHTML = /*html*/`
        <div class="board-header">
        <div class="board-header-left">
            <p>Board</p>
        </div>
        <div class="board-header-right">
            <div class="search-field">
                <input id="searchBarInput" type="text" placeholder="Find Task">
                <img src="./../img/verticalLine.png">
                <img class="magnifier" src="./../img/search.png">
            </div>

            <button class="addTaskButton">
                <p>Add task</p>
                <img src="./../img/add.png">
            </button>
        </div>
    </div>
    <div class="board-content-container">
        <div class="board-card">
            <div class="board-card-header">
                <p>To do</p>
                <img src="./../img/Capa.png">
            </div>
            <div class="drag-area" id="boardCardToDo" ondrop="moveTo('todo')" ondragleave="removeHighlight('open')" ondragover="allowDrop(event); highlight('open')">

            </div>
        </div>
        <div class="board-card">
            <div class="board-card-header">
                <p>In progress</p>
                <img src="./../img/Capa.png">
            </div>
            <div  class="drag-area" id="boardCardInProgress" ondrop="moveTo('inprogress')" ondragleave="removeHighlight('open')" ondragover="allowDrop(event); highlight('open')">

            </div>
        </div>
        <div class="board-card">
            <div class="board-card-header">
                <p>Await feedback</p>
                <img src="./../img/Capa.png">
            </div>
            <div class="drag-area" id="boardCardAwaitFeedback" ondrop="moveTo('awaitfeedback')" ondragleave="removeHighlight('open')" ondragover="allowDrop(event); highlight('open')">

            </div>
        </div>
        <div class="board-card">
            <div class="board-card-header">
                <p>Done</p>
                <img src="./../img/Capa.png">
            </div>
            <div class="drag-area" id="boardCardDone" ondrop="moveTo('done')" ondragleave="removeHighlight('open')" ondragover="allowDrop(event); highlight('open')">

            </div>
        </div>
    </div>
    `
    updateBoard();
}

function updateBoard() {
    let todo = todos.filter(t => t['taskcategory'] == 'todo');
    document.getElementById('boardCardToDo').innerHTML = '';

    todo.forEach(element => {
        document.getElementById('boardCardToDo').innerHTML += generateToDoHTML(element);
    });

    let inprogress = todos.filter(i => i['taskcategory'] == 'inprogress');
    document.getElementById('boardCardInProgress').innerHTML = '';

    inprogress.forEach(element => {
        document.getElementById('boardCardInProgress').innerHTML += generateToDoHTML(element);
    });

    let awaitfeedback = todos.filter(a => a['taskcategory'] == 'awaitfeedback');
    document.getElementById('boardCardAwaitFeedback').innerHTML = '';

    awaitfeedback.forEach(element => {
        document.getElementById('boardCardAwaitFeedback').innerHTML += generateToDoHTML(element);
    });

    let done = todos.filter(d => d['taskcategory'] == 'done');
    document.getElementById('boardCardDone').innerHTML = '';

    done.forEach(element => {
        document.getElementById('boardCardDone').innerHTML += generateToDoHTML(element);
    });
}

function generateToDoHTML(element) {
    return `<div draggable="true" ondragstart="startDragging(${element['id']})" class="card">${element['taskheadline']}</div>`;
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