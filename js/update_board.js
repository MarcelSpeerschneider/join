// Global Elements
let todos = [
    {
        'id':0,
        'title':'ToDo Test Titel',
        'category':'todo'
    },
    {
        'id':1,
        'title':'In Progress Test Titel',
        'category':'inprogress'
    },
    {
        'id':2,
        'title':'Await Feedback Test Titel',
        'category':'awaitfeedback'
    },
    {
        'id':3,
        'title':'Done Test Titel',
        'category':'done'
    }
];

let currentDraggedElement;

function renderBoard(){
    let board = document.getElementById('dashboard-content');
    board.innerHTML = /*html*/`
        <div class="board-header">
        <div class="board-header-left">
            <p>Board</p>
        </div>
        <div class="board-header-right">
            <form class="find-task">
                <div class="search-field">
                    <input id="searchBarInput" type="text" placeholder="Find Task">
                    <img src="./../img/verticalLine.png">
                    <img class="magnifier" src="./../img/search.png">
                </div>

                <button class="addTaskButton">
                    <p>Add task</p>
                    <img src="./../img/add.png">
                </button>
            </form>
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

function updateBoard(){
    let todo = todos.filter(t => t['category'] == 'todo');
    document.getElementById('boardCardToDo').innerHTML = '';

    todo.forEach(element => {
        document.getElementById('boardCardToDo').innerHTML += generateToDoHTML(element);
    });
    
    let inprogress = todos.filter(i => i['category'] == 'inprogress');
    document.getElementById('boardCardInProgress').innerHTML = '';

    inprogress.forEach(element => {
        document.getElementById('boardCardInProgress').innerHTML += generateToDoHTML(element);
    });

    let awaitfeedback = todos.filter(a => a['category'] == 'awaitfeedback');
    document.getElementById('boardCardAwaitFeedback').innerHTML = '';

    awaitfeedback.forEach(element => {
        document.getElementById('boardCardAwaitFeedback').innerHTML += generateToDoHTML(element);
    });

    let done = todos.filter(d => d['category'] == 'done');
    document.getElementById('boardCardDone').innerHTML = '';

    done.forEach(element =>{
        document.getElementById('boardCardDone').innerHTML += generateToDoHTML(element);
    });
}

function generateToDoHTML(element){
    return `<div draggable="true" ondragstart="startDragging(${element['id']})" class="card">${element['title']}</div>`;
}

function startDragging(id) {
    currentDraggedElement = id;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function moveTo(category) {
    todos[currentDraggedElement]['category'] = category;
    updateBoard();
}

function highlight(id) {
    document.getElementById(id).classList.add('drag-area-highlight');
}

function removeHighlight(id) {
    document.getElementById(id).classList.remove('drag-area-highlight');
}