function renderEditTaskPopUp(id) {
    let popUp = document.getElementById(`renderChangeTask${id}`);
    popUp.innerHTML = HTMLrenderEditTask(id);
    selectedContacts = todos[id]['tasksAssignedTo'];
    editTaskSelectCategory(id);
    selectContactsToAssign();
    editTaskAddNewSubtask(id);
    editTaskGetPriority(id);
}

function HTMLrenderEditTask(id) {
    return /*html*/ `<div class="addtask-main-content w100">
<img class="cross-close" onclick="closeAddTaskForm()" src="./../img/cross.png">
<form onsubmit="submitClassList('button-create-task')">
    <div class="addtask-content fdc">
        <div class="addtask-side w100">
            <div class="addtask-title-container">
                <span>Title</span>
                <input class="taskInput" placeholder="Enter a title" type="text" id="title" value="${todos[id]['taskInputTitle']}" required>
            </div>
            <div class="addtask-description-container">
                Description
                <textarea class="taskInput" name="description" id="description" cols="30" rows="10"
                    placeholder="Enter a description" required>${todos[id]['taskInputDescription']}</textarea>
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
        <div class="addtask-side w100">
            <div class="addtask-title-container">
                <span>Due date</span></span>
                <input class="taskInput" type="date" id="due-date" name="due-date" min="1900-01-01" max="2099-12-31"
                    class="addtask-dates-select" value="${todos[id]['taskInputDate']}" required>
            </div>
            <div class="addtask-prio-main-container">
                <div class="addtask-prio-container priority" id="prio-urgent" onclick="prioContainer('urgent')">
                    Urgent <img src="./../img/prio-urgent.svg">
                </div>
                <div class="addtask-prio-container priority" id="prio-medium" onclick="prioContainer('medium')">
                    Medium <img src="./../img/prio-medium.svg">
                </div>
                <div class="addtask-prio-container priority" id="prio-low" onclick="prioContainer('low')">
                    Low <img src="./../img/prio-low.svg">
                </div>
            </div>
            <div class="addtask-category-container">
                <span>Category</span>
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
        <div class="add-task-bottom-button-right-side w100">
            <div class="add-task-bottom-button-container">
                <button class="button-create-task">Create Task<img src="./../img/check.svg"
                        id="button-create-task"></button>
            </div>
        </div>
    </div>
</form>
</div>`
        ;
}


// return /*html*/ `
// <div id="${id}" class="existingTaskOverviewPopUp">
// <label>Title</label>
// <input type="text" value="${todos[id]['taskInputTitle']}">
// <label>Description</label>
// <input type="text" value="${todos[id]['taskInputDescription']}">
// <label>Due Date</label>
// <input type="date" value="${todos[id]['taskInputDate']}">
// <label>Prio</label>
// <div class="Auswahl-an-Prios">
//     <div>Prio High</div>
//     <div>Prio Medium</div>
//     <div>Prio Low</div>
// </div>
// <label>Assigned to</label>
// <label>Hier kommt das Pull Down Menü</label>
// <label>Hier kommen alle aktuellen Kontakte</label>
// <label>Hier kommt Add new Subatsk</label>
// <div>Auflistung alle Subtasks</div>
// <button onclick="closeAddTaskForm()">OK</button>
// </div>

function editTaskSelectCategory(id) {
    const select = document.getElementById("select-category");
    const option = select.querySelector(`[value='${todos[id]['taskInputCategory']}']`);
    option.selected = true;

}

function editTaskAddNewSubtask(id) {
    let container = document.querySelector('.add-new-subtask-list');
    for (let i = 0; i < todos[id]['taskSubtasks'].length; i++) {
        const subtask = todos[id]['taskSubtasks'][i];
        container.innerHTML += /*html*/`<li><input id="add-new-subtask-listinput${i}" value="${subtask}" disabled>
        <div class="add-new-subtask-icon-container-list" id="add-new-subtask-icon-container-list${i}">
            <img src="./../img/edit-icon.svg" onclick="editNewSubtaskInput(${i})">|
            <img src="./../img/delete-icon.svg" onclick="clearNewSubtaskInput(${i})">
        </div></li>`;
    }
}

function editTaskGetPriority(id) {
    let container = document.getElementById(`${todos[id]['taskPriority']}`);
    container.setAttribute("data-selected", "true");
    editTaskCheckPriority(id);
}

function editTaskCheckPriority(id) {
    let containerClicked = document.getElementById(`${todos[id]['taskPriority']}`);
    
        // Spezielle Änderungen für den angeklickten Container
        if (containerClicked.getAttribute('data-selected') === 'true') {
            containerClicked.style.backgroundColor = "#3b4e69";
            containerClicked.style.color = "#FFFFFF";
        } else {
            containerClicked.style.backgroundColor = "#FFFFFF";
            containerClicked.style.color = "black";
        }
}