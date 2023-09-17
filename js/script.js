
document.addEventListener("DOMContentLoaded", function () {
    // Der gesamte Code, der darauf wartet, dass das Dokument geladen ist
});

function changeBackgroundColor() {
    var svgElement = document.querySelector('.user-profile-icon');
    var rectElement = svgElement.querySelector('rect');
    rectElement.setAttribute("fill", "#E1E5EC");
}

function changeBackgroundColorBack() {
    var svgElement = document.querySelector('.user-profile-icon');
    var rectElement = svgElement.querySelector('rect');
    rectElement.setAttribute("fill", "white");
}

function changeBackgroundColorMobile() {
    var svgElement = document.querySelector('.user-profile-icon-mobile');
    rectElement = svgElement.querySelector('circle');
    rectElement.setAttribute("fill", "#E1E5EC");
}

function changeBackgroundColorBackMobile() {
    var svgElement = document.querySelector('.user-profile-icon-mobile');
    rectElement = svgElement.querySelector('circle');
    rectElement.setAttribute("fill", "white");
}

function renderSummary() {
    let dashboardDesktop = document.getElementById('dashboard-content');
    let dashboardMobile = document.getElementById('dashboard-content-mobile');
    dashboardDesktop.innerHTML = renderSummaryinnerHtml();
    dashboardMobile.innerHTML = renderSummaryinnerHtml();
}

function renderAddTask() {
    let dashboardDesktop = document.getElementById('dashboard-content');
    let dashboardMobile = document.getElementById('dashboard-content-mobile');
    dashboardDesktop.innerHTML = renderAddTaskInnerHtml();
    dashboardMobile.innerHTML = renderAddTaskInnerHtml();

}

function selectContactsToAssign() {
    let dropdown = document.getElementById('select-contacts-to-assign-dropdown');
    let arrow = document.getElementById('arrow-drop-down');

    arrow.style.transition = 'transform 0.5s ease';

    if (dropdown.style.display === 'none') {
        arrow.style.transform = 'rotate(180deg)';
        setTimeout((() => { dropdown.style.display = 'flex'; }), 125);
        dropdown.setAttribute('data-selected', 'true')
    }
    else {
        arrow.style.transform = 'rotate(0deg)';
        setTimeout((() => { dropdown.style.display = 'none'; }), 125);
        dropdown.setAttribute('data-selected', 'false')
    }
    contactSummary();
}

function childFunction(event) {
    event.stopPropagation();
}

function assignContactToTask(i) {
    let contactContainer = document.getElementById(`select-contacts-to-assign-dropdown-contact-container${i}`);
    let checkbox = document.getElementById(`select-contacts-to-assign-dropdown-checkbox${i}`);

    if (contactContainer.getAttribute('data-selected') === 'true') {
        contactContainer.style.backgroundColor = "#FFFFFF";
        contactContainer.style.color = "black";
        checkbox.src = "./../img/checkbox-blank.svg";
        checkbox.style.filter = "";
        contactContainer.setAttribute('data-selected', 'false');
    } else {
        contactContainer.style.backgroundColor = "#3b4e69";
        contactContainer.style.color = "#FFFFFF";
        checkbox.src = "./../img/checkbox-filled.svg";
        checkbox.style.filter = "invert()";
        contactContainer.setAttribute('data-selected', 'true');
    }
}

function prioContainer(i) {
    let containerClicked = document.getElementById(`prio-${i}`);
    let containers = [
        document.getElementById('prio-urgent'),
        document.getElementById('prio-medium'),
        document.getElementById('prio-low')
    ];

    // Setze alle Container zurück
    containers.forEach((container) => {
        container.style.backgroundColor = "#FFFFFF";
        container.style.color = "black";
        container.setAttribute('data-selected', 'false');
    });

    // Spezielle Änderungen für den angeklickten Container
    if (containerClicked.getAttribute('data-selected') === 'true') {
        containerClicked.style.backgroundColor = "#FFFFFF";
        containerClicked.style.color = "black";
        containerClicked.setAttribute('data-selected', 'false');
    } else {
        containerClicked.style.backgroundColor = "#3b4e69";
        containerClicked.style.color = "#FFFFFF";
        containerClicked.setAttribute('data-selected', 'true');
    }
}


function contactSummary() {
    let dropdown = document.getElementById('select-contacts-to-assign-dropdown');
    let contactSummary = document.getElementById('contact-summary');

    if (dropdown.getAttribute('data-selected') === 'true') {
        setTimeout(() => { contactSummary.style.display = 'none'; }, 125)
    }

    else {
        setTimeout(() => { contactSummary.style.display = 'flex'; }, 125)
    }
}

function buttonCreateTaskChangeColor() {
    let icon = document.querySelector('#add-task-icon-cancel path');
    icon.setAttribute("stroke", "#00bee8");
}

function buttonCreateTaskChangeColorBack() {
    let icon = document.querySelector('#add-task-icon-cancel path');
    icon.setAttribute("stroke", "#2A3647");
}

function selectNewSubtask() {
    let container = document.getElementById('add-new-subtask-icon-container');
    container.innerHTML = /*html*/`
    <img src="./../img/check-black.svg" onclick="addNewSubtask()">|
    <img src="./../img/icon-cancel.svg" onclick="clearNewSubtask()">
    `;
}


function addNewSubtask() {
    let list = document.querySelector('.add-new-subtask-list');
    let input = document.getElementById('add-new-subtask-input');
    if (input.value) {
        list.innerHTML += /*html*/`<li><input id="add-new-subtask-listinput1" value="${input.value}" disabled>
        <div class="add-new-subtask-icon-container-list" id="add-new-subtask-icon-container-list1"><img src="./../img/edit-icon.svg" onclick="editNewSubtaskInput(1)">|<img src="./../img/delete-icon.svg" onclick="clearNewSubtaskInput(1)"></li></div>
        `;
        document.getElementById('add-new-subtask-input').value = '';
    }
    else {
        input.placeholder = 'please add subtask';
    }
}

function clearNewSubtask() {
    document.getElementById('add-new-subtask-input').value = '';
    let container = document.getElementById('add-new-subtask-icon-container');
    container.innerHTML = /*html*/ `
    <img src="./../img/add-subtask.svg" class="add-new-subtask-plus" onclick="selectNewSubtask()">
    `;
}

function clearNewSubtaskInput(i) {
    document.getElementById(`add-new-subtask-listinput${i}`).value = '';
}

function editNewSubtaskInput(i) {
    let input = document.getElementById(`add-new-subtask-listinput${i}`);
    let iconContainer = document.getElementById(`add-new-subtask-icon-container-list${i}`);
    input.disabled = false;
    input.style.backgroundColor = 'white';
    iconContainer.innerHTML = /*html*/ `
    <img src="./../img/check-black.svg" onclick="saveNewSubtask(${i})">|<img src="./../img/delete-icon.svg">
    `;
}

function saveNewSubtask(i) {
    let input = document.getElementById(`add-new-subtask-listinput${i}`);
    let iconContainer = document.getElementById(`add-new-subtask-icon-container-list${i}`);
    input.disabled = true;
    input.style.backgroundColor = 'transparent';
    iconContainer.innerHTML = /*html*/ `
      <div class="add-new-subtask-icon-container-list" id="add-new-subtask-icon-container-list1"><img src="./../img/edit-icon.svg" onclick="editNewSubtaskInput(${i})">|<img src="./../img/delete-icon.svg" onclick="clearNewSubtaskInput(${i})"></li></div>
    `;
}

function renderSummaryinnerHtml() {

    return /*html*/`
        <div class="summary-headline">
            <h1>Summary</h1>
            <svg xmlns="http://www.w3.org/2000/svg" width="4" height="63" viewBox="0 0 4 63" fill="none">
                <path d="M2 2V61" stroke="#29ABE2" stroke-width="3" stroke-linecap="round" />
            </svg>
            <h2>Everything in a nutshell!</h2>
        </div>
        <div class="summary-main-container">
            <div class="summary-task-container">
                <div class="summary-task-number-container">
                    <div class="summary-task-number-box">
                        <span class="summary-task-number">
                            <h1>5</h1>
                        </span>
                        <span class="summary-task-info">Tasks in Board</span>
                    </div>
                    <div class="summary-task-number-box">
                        <span class="summary-task-number">
                            <h1>2</h1>
                        </span>
                        <span class="summary-task-info">Tasks in Progress</span>
                    </div>
                    <div class="summary-task-number-box">
                        <span class="summary-task-number">
                            <h1>2</h1>
                        </span>
                        <span class="summary-task-info">Awaiting Feedback</span>
                    </div>
                </div>
                <div class="summary-urgent-container">
                    <img src="./../img/urgent-icon.svg">
                    <div class="summary-urgent-number">
                        <h1>1</h1>Urgent
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="2" height="105" viewBox="0 0 2 105" fill="none">
                        <path d="M1 1.48828V103.511" stroke="#D1D1D1" stroke-width="2" stroke-linecap="round" />
                    </svg>
                    <div class="summary-deadline-container">
                        <span class="summary-deadline">Oktober 16, 2022</span>
                        <span>Upcoming Deadline</span>
                    </div>
                </div>
                <div class="summary-todo-container">
                    <div class="summary-todo">
                        <svg xmlns="http://www.w3.org/2000/svg" width="69" height="70" viewBox="0 0 69 70" fill="none">
                            <circle cx="34.5" cy="35" r="34.5" fill="#2A3647" />
                            <mask id="mask0_83706_6001" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="18" y="19"
                                width="33" height="32">
                                <rect x="18.5" y="19" width="32" height="32" fill="#D9D9D9" />
                            </mask>
                            <g mask="url(#mask0_83706_6001)">
                                <path
                                    d="M25.1667 44.3332H27.0333L38.5333 32.8332L36.6667 30.9665L25.1667 42.4665V44.3332ZM44.2333 30.8998L38.5667 25.2998L40.4333 23.4332C40.9444 22.9221 41.5722 22.6665 42.3167 22.6665C43.0611 22.6665 43.6889 22.9221 44.2 23.4332L46.0667 25.2998C46.5778 25.8109 46.8444 26.4276 46.8667 27.1498C46.8889 27.8721 46.6444 28.4887 46.1333 28.9998L44.2333 30.8998ZM42.3 32.8665L28.1667 46.9998H22.5V41.3332L36.6333 27.1998L42.3 32.8665Z"
                                    fill="white" />
                            </g>
                        </svg>
                        <div class="todo-number">
                            <h1>1</h1>
                            <span>To-Do</span>
                        </div>
                    </div>
        
                    <div class="summary-todo">
                        <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 70 70" fill="none">
                            <circle cx="35" cy="35" r="34.5" fill="#2A3647" />
                            <path d="M20.0283 35.0001L31.2571 46.0662L49.9717 23.9341" stroke="white" stroke-width="7"
                                stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <div class="todo-number">
                            <h1>1</h1>
                            <span>Done</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="summary-greetings">
                <h3>Good morning,</h3>
                <div class="summary-username">Test Test</div>
            </div>
        </div>
        </div>
        `;
}

function renderAddTaskInnerHtml() {
    return /*html*/`
    <div class="addtask-main-content">
        <h1 style="padding-left: 5%; margin-bottom: 4%">Add Task</h1>
        <div class="addtask-content">
            <div class="addtask-side">
                <div class="addtask-title-container">
                    Title
                    <input placeholder="Enter a title" type="text" id="title">
                </div>
                <div class="addtask-description-container">
                    Description
                    <textarea name="description" id="description" cols="30" rows="10"
                        placeholder="Enter a description"></textarea>
                </div>
                <div class="addtask-assigned-to-container">
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
            <svg xmlns="http://www.w3.org/2000/svg" width="2" height="426" viewBox="0 0 2 426" fill="none">
                <path d="M1.24805 1L1.24854 425" stroke="#D1D1D1" stroke-linecap="round" />
            </svg>
            <div class="addtask-side">
                <div class="addtask-title-container">
                    Due date
                    <input type="date" id="due-date" name="due-date" min="1900-01-01" max="2099-12-31"
                        class="addtask-dates-select">
                </div>
                <div class="addtask-prio-main-container">
                    <div class="addtask-prio-container" id="prio-urgent" onclick="prioContainer('urgent')">
                        Urgent <img src="./../img/prio-urgent.svg">
                    </div>
                    <div class="addtask-prio-container" id="prio-medium" onclick="prioContainer('medium')">
                        Medium <img src="./../img/prio-medium.svg">
                    </div>
                    <div class="addtask-prio-container" id="prio-low" onclick="prioContainer('low')">
                        Low <img src="./../img/prio-low.svg">
                    </div>
                </div>
                <div class="addtask-category-container">
                    Category
                    <select name="category" id="select-category">
                        <option value="" disabled>Select a category</option>
                        <option value="technical-task">Technical Task</option>
                        <option value="user-story">User Story</option>
                    </select>
                </div>
                <div class="addtask-assigned-to-container">
                    Subtasks
                    <div class="add-new-subtask">
                        <input placeholder="Add new subtask" id="add-new-subtask-input" required><div class="add-new-subtask-icon-container" id="add-new-subtask-icon-container"><img src="./../img/add-subtask.svg" class="add-new-subtask-plus" onclick="selectNewSubtask()"></div>
                    </div>
                    <div><ul class="add-new-subtask-list"></ul></div>
                </div>
            </div>
    
        </div>
        <div class="add-task-bottom-button">
            <div class="add-task-bottom-button-left-side"></div>
            <div class="add-task-bottom-button-right-side">
                    <div class="add-task-bottom-button-container">
                            <button class="button-clear" onmouseover="buttonCreateTaskChangeColor()" onmouseout="buttonCreateTaskChangeColorBack()">Clear<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg" id="add-task-icon-cancel">
                            <path d="M12.2495 12.0001L17.4925 17.2431M7.00653 17.2431L12.2495 12.0001L7.00653 17.2431ZM17.4925 6.75708L12.2485 12.0001L17.4925 6.75708ZM12.2485 12.0001L7.00653 6.75708L12.2485 12.0001Z" stroke="#2A3647" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            </button>
                            <button class= "button-create-task">Create Task<img src="./../img/check.svg" id="button-create-task"></button>
                    </div>
            </div>
        </div>
    </div>
    `;
}