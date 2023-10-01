// Globale Variablen
let globalStatus = 'todo';

function openAddTaskForm() {
    document.getElementById('overlay').style.display = 'flex';
}

function closeAddTaskForm() {
    document.getElementById('overlay').style.display = 'none';
    subTasks = [];
    selectedContacts = [];
    renderBoardSite();
}

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