/**
 * global variables for board
 */

let todos = [];
let todo = [];
let dateCollection = [];
let collection = [];
let inprogress, awaitfeedback, done, urgentPriority, prioPictureSource;
let currentDraggedElement;

/**
 * Updates the board with tasks based on the provided search result or retrieves tasks by status and priority.
 * @param {string} [searchResult] - The optional search result to filter tasks.
 */

async function updateBoard(searchResult) {
    if (searchResult === undefined) {
        await getTaskByStatusAndPrio();
    }
    else {
        getFilteredTasksByStatusAndPrio(searchResult);
    }
    document.getElementById('todo').innerHTML = '';
    todo.forEach(element => {
        document.getElementById('todo').innerHTML += generateToDoHTML(element);
        renderProgressBar(element['id']);
        renderBoardTaskCredntialsSummary(element['id']);
    });
    document.getElementById('inprogress').innerHTML = '';
    inprogress.forEach(element => {
        document.getElementById('inprogress').innerHTML += generateToDoHTML(element);
        renderProgressBar(element['id']);
        renderBoardTaskCredntialsSummary(element['id']);
    });
    document.getElementById('awaitfeedback').innerHTML = '';

    awaitfeedback.forEach(element => {
        document.getElementById('awaitfeedback').innerHTML += generateToDoHTML(element);
        renderProgressBar(element['id']);
        renderBoardTaskCredntialsSummary(element['id']);
    });
    document.getElementById('done').innerHTML = '';

    done.forEach(element => {
        document.getElementById('done').innerHTML += generateToDoHTML(element);
        renderProgressBar(element['id']);
        renderBoardTaskCredntialsSummary(element['id']);
    });
    checkDragAreaIfEmpty();
}

/**
 * Retrieves and filters tasks by status and priority, populating various task arrays, and checks for the smallest date.
 */

async function getTaskByStatusAndPrio() {
    await loadTasks();
    todo = todos.filter(t => t['taskStatus'] == 'todo');
    inprogress = todos.filter(i => i['taskStatus'] == 'inprogress');
    awaitfeedback = todos.filter(a => a['taskStatus'] == 'awaitfeedback');
    done = todos.filter(d => d['taskStatus'] == 'done');
    urgentPriority = todos.filter(prioH => prioH['taskPriority'] == 'prio-urgent');
    checkSmallestDate();
}

/**
 * Filters and updates task arrays based on a search result and clears the search result array.
 * @param {Array} searchResult - The array of tasks to be filtered.
 */

function getFilteredTasksByStatusAndPrio(searchResult) {
    todo = searchResult.filter(t => t['taskStatus'] == 'todo');
    inprogress = searchResult.filter(i => i['taskStatus'] == 'inprogress');
    awaitfeedback = searchResult.filter(a => a['taskStatus'] == 'awaitfeedback');
    done = searchResult.filter(d => d['taskStatus'] == 'done');
    searchResultArray = [];
}

/**
 * Collects task input dates from the 'todos' array, sorts them, and stores them in 'dateCollection'.
 */

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

/**
 * Deletes a task with the specified ID from the 'todos' array and updates the board.
 * @param {number} taskId - The ID of the task to be deleted.
 */

function deleteTask(taskId) {
    const taskIndex = todos.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
        todos.splice(taskIndex, 1);
        updateBoard();
    }
}

/**
 * Deletes a task with the specified ID from the 'todos' array and updates the board.
 * @param {number} taskId - The ID of the task to be deleted.
 */

function deleteTask(taskId) {
    const taskIndex = todos.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
        todos.splice(taskIndex, 1);
        updateBoard();
    }
}

/**
 * Generates HTML markup for a task card based on the provided task element.
 * @param {Object} element - The task element containing task details.
 * @returns {string} - The generated HTML markup for the task card.
 */

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
            <div class="task-Headline">
                <div class="bgc-${combineAndLowercase(temp)} taskHeadline-bg">${element['taskInputCategory']}</div>
            </div>
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

/**
 * Combines and converts a string to lowercase after removing whitespace.
 * @param {string} temp - The input string to be processed.
 * @returns {string|undefined} - The combined and lowercase string or undefined if the input is undefined.
 */

function combineAndLowercase(temp) {
    if (temp !== undefined) {
        let cleanedInput = temp.trim().toLowerCase();
        let combinedWords = cleanedInput.replace(/\s+/g, '');
        return combinedWords;
    }
}

/**
 * Initiates the dragging of a task card element and adds a CSS class for rotation during movement.
 * @param {string} id - The ID of the task card element to be dragged.
 */

function startDragging(id) {
    currentDraggedElement = id;
    document.getElementById(id).classList.add('rotateTaskCardDuringMove');
}

/**
 * Prevents the default behavior of a drag-and-drop event to allow the element to be dropped.
 * @param {Event} ev - The drag-and-drop event object.
 */

function allowDrop(ev) {
    ev.preventDefault();
}

/**
 * Moves a task to the specified task status, updates the task list, and triggers a board update.
 * @param {string} taskStatus - The task status to which the task should be moved.
 */

async function moveTo(taskStatus) {
    todos[currentDraggedElement]['taskStatus'] = taskStatus;
    await setItem('tasksjoin', JSON.stringify(todos));
    updateBoard();
}

/**
 * Adds a CSS class to highlight a specified element.
 * @param {string} id - The ID of the element to be highlighted.
 */

function highlight(id) {
    document.getElementById(id).classList.add('drag-area-highlight');
}

/**
 * Removes a CSS class to remove the highlight from a specified element.
 * @param {string} id - The ID of the element to remove the highlight from.
 */

function removeHighlight(id) {
    document.getElementById(id).classList.remove('drag-area-highlight');
}

/**
 * Adds a CSS class to display a task overlay.
 */

function showTask() {
    document.getElementById('overlay').classList.add('overlayStyle');
}

/**
 * Displays an edit task form by setting the CSS style and content of a specified container.
 */

function openEditTaskForm() {
    let content = document.getElementById('openEditTaskPopUpContainer');
    content.style.display = "flex";
    content.innerHTML = returnEditPopUpHTML();
}

/**
 * Closes the edit task form by setting the CSS style of a specified container to "none."
 */

function closeEditTaskForm() {
    let edittask = document.getElementById('openEditTaskPopUpContainer');
    edittask.style.display = "none";
}

/**
 * Checks if the drag area is empty and adds a hint if it has no children elements.
 */

function checkDragAreaIfEmpty() {
    collection = document.getElementsByClassName('drag-area');
    for (let index = 0; index < collection.length; index++) {
        if (collection[index].children.length === 0) {
            const emptyArea = collection[index]['id'];
            document.getElementById(emptyArea).innerHTML += determineAHint(emptyArea);
        }
    }
}

/**
 * Determines a hint message based on the empty area and returns it as HTML.
 * @param {string} emptyArea - The ID of the empty drag area.
 * @returns {string} - The HTML hint message.
 */

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

/**
 * Generates HTML code to display a hint message in a drag area.
 * @param {string} hint - The hint message to display.
 * @returns {string} - The HTML code for the hint message.
 */

function HTMLrenderAreaWithEmptyHint(hint) {
    return /*html*/`
    <div class="hint">
        <span>${hint}</span>
    </div>
    `;
}

/**
 * Renders a progress bar for a task by calculating the percentage of completed subtasks.
 * @param {number} id - The ID of the task to render the progress bar for.
 */

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

/**
 * Renders the credentials summary of contacts assigned to a task.
 * @param {number} id - The ID of the task for which to render the credentials summary.
 */

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

/**
 * Deletes a task with the given ID from the `todos` array, updates the IDs of remaining tasks, and refreshes the board.
 * @param {number} id - The ID of the task to delete.
 */

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

/**
 * Filters tasks based on a search query and updates the board with the matching results.
 */

function filterTasks() {
    let search = document.getElementById('searchInput').value;
    search = search.toLowerCase();

    for (let index = 0; index < todos.length; index++) {
        if (todos[index]['taskInputTitle'].toLowerCase().includes(search)) {
            searchResultArray.push(todos[index]);
        }
    }
    updateBoard(searchResultArray);
}