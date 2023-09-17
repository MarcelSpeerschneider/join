function openAddTaskForm() {
    document.getElementById('overlay').style.display = 'flex';
}

function closeAddTaskForm() {
    document.getElementById('overlay').style.display = 'none';
}

function renderPopUpAddTask(myTest) {
    alert(myTest);
    let popUp = document.getElementById('overlayContent');
    popUp.innerHTML = HTMLrenderPopUpAddTask();
}

function HTMLrenderPopUpAddTask() {
    return /*html*/`
    <form id="addTaskOverlay" onsubmit="submitClassList('button-create-task')">
        <div id="addTaskOverlayHead">
            <h1>Add Task</h1>
            <img class="cross-close" onclick="closeAddTaskForm()" src="./../img/cross.png">
        </div>
        <div id="addTaskOverlayBody">
            <div id="addTaskOverlayBodyLeft">
                <div class="elementInAddTaskOverlayBody">
                    <label>Title</label>
                    <input id="taskInputTitle" class="taskInput" type="text" placeholder="Enter a title" required>
                </div>
                <div class="elementInAddTaskOverlayBody">
                    <label>Description</label>
                    <textarea id="taskInputDescription" class="taskInput" cols="30" rows="10" placeholder="Enter a Description" required></textarea>
                </div>
                <div class="elementInAddTaskOverlayBody">
                    <label for="categories">Category</label>
                    <select name="categories" id="taskInputCategories">
                        <option value="" disabled selected>Select task category</option>
                    </select>
                </div>
                <!-- <div class="elementInAddTaskOverlayBody">
                    <label for="assignment">Assigned to</label>
                    <select name="assignment" id="taskAssignment">
                        <option value="" disabled selected>Select contacts to assign</option>
                    </select>
                </div> -->
                <div class="addtask-assigned-to-container" style="width: 100%">
                    Assigned to
                    <div class="select-contacts-to-assign" id="select-contacts-to-assign"
                        onclick="selectContactsToAssign()">
                        <span>Select Contacts to assign</span>
                        <div id="arrow-drop-down">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <mask id="mask0_83802_4068" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0"
                                    width="24" height="24">
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
                            <div class="select-contacts-to-assign-dropdown-contact-container"
                                id="select-contacts-to-assign-dropdown-contact-container1" onclick=assignContactToTask(1)>
                                <div class="select-contacts-to-assign-dropdown-contact">
                                    <div class="select-contacts-to-assign-dropdown-contact-credentials-container">
                                        <svg width="28" height="28">
                                            <circle cx="14" cy="14" r="14" fill="#00bee8" />
                                        </svg>
                                        <div class="select-contacts-to-assign-dropdown-contact-credentials">SM</div>
                                    </div>
                                    <div class="select-contacts-to-assign-dropdown-contactname">Contact 1</div>
                                </div>
                                <div class="select-contacts-to-assign-dropdown-checkbox"><img
                                        src="./../img/checkbox-blank.svg" id="select-contacts-to-assign-dropdown-checkbox1">
                                </div>
                            </div>
                            <div class="select-contacts-to-assign-dropdown-contact-container"
                                id="select-contacts-to-assign-dropdown-contact-container2" onclick=assignContactToTask(2)>
                                <div class="select-contacts-to-assign-dropdown-contact">
                                    <div class="select-contacts-to-assign-dropdown-contact-credentials-container">
                                        <svg width="28" height="28">
                                            <circle cx="14" cy="14" r="14" fill="#ff7a00" />
                                        </svg>
                                        <div class="select-contacts-to-assign-dropdown-contact-credentials">AB</div>
                                    </div>
                                    <div class="select-contacts-to-assign-dropdown-contactname">Contact 2</div>
                                </div>
                                <div class="select-contacts-to-assign-dropdown-checkbox"><img
                                        src="./../img/checkbox-blank.svg" id="select-contacts-to-assign-dropdown-checkbox2">
                                </div>
                            </div>
                            <div class="select-contacts-to-assign-dropdown-contact-container"
                                id="select-contacts-to-assign-dropdown-contact-container3" onclick=assignContactToTask(3)>
                                <div class="select-contacts-to-assign-dropdown-contact">
                                    <div class="select-contacts-to-assign-dropdown-contact-credentials-container">
                                        <svg width="28" height="28">
                                            <circle cx="14" cy="14" r="14" fill="#bb78ff" />
                                        </svg>
                                        <div class="select-contacts-to-assign-dropdown-contact-credentials">PA</div>
                                    </div>
                                    <div class="select-contacts-to-assign-dropdown-contactname">Contact 3</div>
                                </div>
                                <div class="select-contacts-to-assign-dropdown-checkbox"><img
                                        src="./../img/checkbox-blank.svg" id="select-contacts-to-assign-dropdown-checkbox3">
                                </div>
                            </div>
                            <button class="add-new-contact-button">Add new Contact</button>
                        </div>
                    </div>
    
                    <div class="select-contacts-to-assign-dropdown-contact-bottom-container">
                        <div class="select-contacts-to-assign-dropdown-contact" id="contact-summary">
                            <div class="select-contacts-to-assign-dropdown-contact-credentials-container">
                                <svg width="28" height="28">
                                    <circle cx="14" cy="14" r="14" fill="#bb78ff" />
                                </svg>
                                <div class="select-contacts-to-assign-dropdown-contact-credentials">PA</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="addTaskOverlayBodyMiddle"></div>
            <div id="addTaskOverlayBodyRight">
                <div class="elementInAddTaskOverlayBody">
                    <label>Due Date</label>
                    <input id="taskInputDate" class="taskInput" type="date" placeholder="dd/mm/yyyy" required>
                </div>
                <div class="elementInAddTaskOverlayBody">
                    <label>Prio</label>
                    <div class="addtask-prio-main-container">
                        <div class="addtask-prio-container" id="prio-urgent" onclick="prioContainer('urgent')"
                            data-selected="true" style="background-color: rgb(59, 78, 105); color: rgb(255, 255, 255);">
                            Urgent <img src="./../img/prio-urgent.svg">
                        </div>
                        <div class="addtask-prio-container" id="prio-medium" onclick="prioContainer('medium')"
                            data-selected="false" style="background-color: rgb(255, 255, 255); color: black;">
                            Medium <img src="./../img/prio-medium.svg">
                        </div>
                        <div class="addtask-prio-container" id="prio-low" onclick="prioContainer('low')"
                            data-selected="false" style="background-color: rgb(255, 255, 255); color: black;">
                            Low <img src="./../img/prio-low.svg">
                        </div>
                    </div>
                </div>
                <div class="addtask-assigned-to-container">
                    Subtasks
                    <div class="add-new-subtask">
                        <input placeholder="Add new subtask" id="add-new-subtask-input"><div class="add-new-subtask-icon-container" id="add-new-subtask-icon-container"><img src="./../img/add-subtask.svg" class="add-new-subtask-plus" onclick="selectNewSubtask()"></div>
                    </div>
                    <div><ul class="add-new-subtask-list"></ul></div>
                </div>
                <!-- <div class="elementInAddTaskOverlayBody">
                    <label>Subtasks</label>
                    <div class="newSubTaskInputArea">
                        <input id="addNewSubtask" type="text" placeholder="Add new subtask">
                        <div class="subTaskImage" onclick="renderNewSubtask()">
                            <img src="./../img/add-subtask.svg">
                        </div>
                    </div>
                </div>
                <div class="elementInAddTaskOverlayBody" id="subTaskList">

                </div> -->
            </div>
        </div>
        <div class="addTaskOverlayBottom">
            <div class="add-task-bottom-button-container">
                <button type="reset" class="button-clear" id="button-clear" onmouseover="buttonCreateTaskChangeColor()"
                    onmouseout="buttonCreateTaskChangeColorBack()" onclick="submitClassList(this.id)">Clear<svg width="25" height="24" viewBox="0 0 25 24"
                        fill="none" xmlns="http://www.w3.org/2000/svg" id="add-task-icon-cancel">
                        <path
                            d="M12.2495 12.0001L17.4925 17.2431M7.00653 17.2431L12.2495 12.0001L7.00653 17.2431ZM17.4925 6.75708L12.2485 12.0001L17.4925 6.75708ZM12.2485 12.0001L7.00653 6.75708L12.2485 12.0001Z"
                            stroke="#2A3647" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                </button>
                <button class="button-create-task">Create Task<img src="./../img/check.svg"
                        id="button-create-task"></button>
            </div>
    </form>
    `;
}

function renderNewSubtask() {
    let newSubTaskValue = document.getElementById('addNewSubtask').value;
    if(newSubTaskValue === ''){
        return;
    }else{
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

function submitClassList(id){
    let addTaskElements = document.getElementsByClassName('taskInput');
    let elementByID = '';
    let valueOfInput = [];

    for (let index = 0; index < addTaskElements.length; index++) {
        elementByID = addTaskElements[index]['id'];
        valueOfInput.push(document.getElementById(elementByID).value);
        if(id==='button-clear'){
            resetPlaceHolder(elementByID);
        }
    }
    if(id==='button-create-task'){
        addTaskToArray(valueOfInput);
    }
    document.getElementById('subTaskList').innerHTML = '';
}

function resetPlaceHolder(elementByID){
    let placeholderValue = document.getElementById(`${elementByID}`).placeholder;
    let emptyValue = document.getElementById(`${elementByID}`);
    emptyValue.value = '';
    document.getElementById(`${elementByID}`).placeholder = `${placeholderValue}`;
}

function addTaskToArray(valueOfInput){
    let id = todos.length;
    let myObject ={
        'id': id,
        'taskCategory':'User Story',
        'taskStatus':'todo',
        'taskInputTitle':valueOfInput[0],
        'taskInputDescription':valueOfInput[1],
        'taskInputDate':valueOfInput[2]
    };
    todos.push(myObject);
    renderBoard();
}