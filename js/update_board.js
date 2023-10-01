// Global Elements
let todos = [];
let todo = [];
let dateCollection = [];
let collection = [];
let inprogress, awaitfeedback, done, urgentPriority, prioPictureSource;

let currentDraggedElement;

async function updateBoard(searchResult) {
    if (searchResult === undefined) {
        await getTaskByStatusAndPrio();
    }
    else {
        getFilteredTasksByStatusAndPrio(searchResult);
    }

    // todo = todos.filter(t => t['taskStatus'] == 'todo');
    document.getElementById('todo').innerHTML = '';

    todo.forEach(element => {
        document.getElementById('todo').innerHTML += generateToDoHTML(element);
        renderProgressBar(element['id']);
        renderBoardTaskCredntialsSummary(element['id']);
    });

    // inprogress = todos.filter(i => i['taskStatus'] == 'inprogress');
    document.getElementById('inprogress').innerHTML = '';

    inprogress.forEach(element => {
        document.getElementById('inprogress').innerHTML += generateToDoHTML(element);
        renderProgressBar(element['id']);
        renderBoardTaskCredntialsSummary(element['id']);
    });

    // awaitfeedback = todos.filter(a => a['taskStatus'] == 'awaitfeedback');
    document.getElementById('awaitfeedback').innerHTML = '';

    awaitfeedback.forEach(element => {
        document.getElementById('awaitfeedback').innerHTML += generateToDoHTML(element);
        renderProgressBar(element['id']);
        renderBoardTaskCredntialsSummary(element['id']);
    });

    // done = todos.filter(d => d['taskStatus'] == 'done');
    document.getElementById('done').innerHTML = '';

    done.forEach(element => {
        document.getElementById('done').innerHTML += generateToDoHTML(element);
        renderProgressBar(element['id']);
        renderBoardTaskCredntialsSummary(element['id']);
    });
    checkDragAreaIfEmpty();
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

function getFilteredTasksByStatusAndPrio(searchResult) {
    todo = searchResult.filter(t => t['taskStatus'] == 'todo');
    inprogress = searchResult.filter(i => i['taskStatus'] == 'inprogress');
    awaitfeedback = searchResult.filter(a => a['taskStatus'] == 'awaitfeedback');
    done = searchResult.filter(d => d['taskStatus'] == 'done');
    searchResultArray = [];
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
    if (element['taskPriority'] === 'prio-urgent') {
        prioPictureSource = "./assets/img/prio-urgent.svg";
    }
    else if (element['taskPriority'] === 'prio-medium') {
        prioPictureSource = "./assets/img/prio-medium.svg";
    }
    else if (element['taskPriority'] === 'prio-low') {
        prioPictureSource = "./assets/img/prio-low.svg";
    }

    let temp = element['taskInputCategory'];
    return /*html*/ `
    <div id="${element['id']}" onclick="renderPopUpChangeTask(this.id)" draggable="true" ondragstart="startDragging(${element['id']})" class="tasksInBoardOverview">
        <div class="taskCardInBoard">
            <div class="bgc-${combineAndLowercase(temp)} taskHeadline-bg">${element['taskInputCategory']}</div>
            <div class="input-title">${element['taskInputTitle']}</div>
            <div>${element['taskInputDescription']}</div>
            <div class="progressbarMain">
                <div class="progressbarContainer">
                    <div class="progressbar" id="progressbar${element['id']}"></div>
                </div>
                <div class="progressbar-info" id="progressinfo${element['id']}"></div>
            </div>

            <div class="TaskInBoardFooter">
                <div class="boardTaskCredentialsSummary" id="boardTaskCredentialsSummary${element['id']}"></div>
                <div><img src=${prioPictureSource}></div>
            </div>
        </div>
    </div>
    `;
}

function combineAndLowercase(temp) {
    if (temp !== undefined) {
        let cleanedInput = temp.trim().toLowerCase();
        let combinedWords = cleanedInput.replace(/\s+/g, '');
        return combinedWords;
    }
}


function startDragging(id) {
    currentDraggedElement = id;
    document.getElementById(id).classList.add('rotateTaskCardDuringMove');
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

function closeEditTaskForm() {
    let edittask = document.getElementById('openEditTaskPopUpContainer');
    edittask.style.display = "none";
}

function checkDragAreaIfEmpty() {
    collection = document.getElementsByClassName('drag-area');
    for (let index = 0; index < collection.length; index++) {
        if (collection[index].children.length === 0) {
            const emptyArea = collection[index]['id'];
            document.getElementById(emptyArea).innerHTML += determineAHint(emptyArea);
        }
    }
}

function determineAHint(emptyArea) {
    let hint = '';
    if (emptyArea === 'todo') {
        hint = 'No tasks To do';
    }
    else if (emptyArea === 'inprogress') {
        hint = 'Nothing in progress';
    }
    else if (emptyArea === 'awaitfeedback') {
        hint = 'No tasks await feedback';
    }
    else if (emptyArea === 'done') {
        hint = 'Nothing is done';
    }
    return HTMLrenderAreaWithEmptyHint(hint)
}

function HTMLrenderAreaWithEmptyHint(hint) {
    return /*html*/`
    <div class="hint">
        <span>${hint}</span>
    </div>
    `;
}

function renderProgressBar(id) {
    let totalTasks = todos[id]['taskSubtasks'].length;
    let progressbar = document.getElementById(`progressbar${id}`);
    let progressinfo = document.getElementById(`progressinfo${id}`);

    if(totalTasks >0){
        let doneTasks = todos[id]['taskSubtasks'].filter(task => task['status'] === 'done').length;
        let percentageDone = (doneTasks / totalTasks) * 100;
        progressbar.style.width = percentageDone + `%`;
        progressinfo.innerHTML = /*html*/`<span>${doneTasks}/${totalTasks} Subtasks</span>`;
    }
    else{
        progressbar.style.display = 'none';
        progressinfo.style.display = 'none';
    }
}

function renderBoardTaskCredntialsSummary(id) {
    let container = document.getElementById(`boardTaskCredentialsSummary${id}`);
    for (let i = 0; i < todos[id]['tasksAssignedTo'].length; i++) {
        const contact = todos[id]['tasksAssignedTo'][i];
        container.innerHTML += /*html*/ `
        <div class="select-contacts-to-assign-dropdown-contact-credentials-container ml-5px">
        <svg width="28" height="28">
            <circle cx="14" cy="14" r="14" fill="${getRandomColor()}"/>
        </svg>
        <div class="select-contacts-to-assign-dropdown-contact-credentials">${generateCredentials(contact)}</div>
        </div>
        `;

    }
}

async function deleteTask(id) {
    todos.splice(id, 1);
    for (let index = 0; index < todos.length; index++) {
        todos[index]['id'] = index;
    }
    await setItem('tasksjoin', JSON.stringify(todos));
    updateBoard();
    closeAddTaskForm();
}

let searchResultArray = [];

function filterTasks() {
    let search = document.getElementById('searchInput').value;
    search = search.toLowerCase();
    // document.getElementById('card-container').innerHTML = /*html*/``;

    for (let index = 0; index < todos.length; index++) {
        if (todos[index]['taskInputTitle'].toLowerCase().includes(search)) {
            searchResultArray.push(todos[index]);
        }
    }
    updateBoard(searchResultArray);
}