let selectedContacts = [];
let subTasks = [];
// let greeting = checkCurrentTimeForGreeting();
let greeting = checkCurrentTimeForGreeting();


document.addEventListener("DOMContentLoaded", function () {
    // All the code that waits for the document to be loaded
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


document.addEventListener('click', function (event) {
    var popup = document.getElementById('user-profile-popup');
    var trigger = document.getElementById('user-profile-icon');
    if (trigger.contains(event.target) && (popup.style.display === 'none' || popup.style.display === '')) {
        popup.style.display = 'flex';
        return;
    }

    if (trigger.contains(event.target) && popup.style.display === 'flex') {
        popup.style.display = 'none';
        return;
    }

    if (popup.style.display === 'flex' && !popup.contains(event.target) && !trigger.contains(event.target)) {
        popup.style.display = 'none';
    }
});


// document.addEventListener('click', function(event) {
//     var popup = document.getElementById('user-profile-popup');
//     var trigger = document.getElementById('user-profile-icon-mobile');
//     if (trigger.contains(event.target) && (popup.style.display === 'none' || popup.style.display === '')) {
//         popup.style.display = 'flex';
//         return; 
//     }

//     if (trigger.contains(event.target) && popup.style.display === 'flex') {
//         popup.style.display = 'none';
//         return; 
//     }

//     if (popup.style.display === 'flex' && !popup.contains(event.target) && !trigger.contains(event.target)) {
//         popup.style.display = 'none';
//     }
// });

async function renderSummary() {
    await getTaskByStatusAndPrio();
    let dashboardDesktop = document.getElementById('dashboard-content');
    dashboardDesktop.innerHTML = renderSummaryinnerHtml();
    setAcronym();
}

function renderAddTask() {
    let dashboardDesktop = document.getElementById('dashboard-content');
    dashboardDesktop.innerHTML = renderAddTaskInnerHtml();
}


function renderBoardSite() {
    let dashboardDesktop = document.getElementById('dashboard-content');
    dashboardDesktop.innerHTML = renderBoard();
    updateBoard();
    renderPopUpAddTask();
}


function renderContactsSite() {
    let dashboardDesktop = document.getElementById('dashboard-content');
    dashboardDesktop.innerHTML = returnRenderHTML(), renderContactsAlphabetically();
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
    selectContactsToAssignDropdownRender();
    contactSummary();
}

function childFunction(event) {
    event.stopPropagation();
}

/**
 * Toggles the selection state of a contact in a dropdown for task assignment.
 * This function alters both the visual appearance and the 'data-selected' attribute 
 * of the contact's container element. When a contact is selected, its background 
 * changes to blue, and a filled checkbox is displayed. Conversely, deselection reverts 
 * these visual elements and updates the 'data-selected' attribute accordingly.
 * 
 * @param {number} i - The index or identifier for the contact. Used to target 
 * specific DOM elements related to the contact.
 */

function assignContactToTask(i, contact) {
    let contactContainer = document.getElementById(`select-contacts-to-assign-dropdown-contact-container${i}`);
    let checkbox = document.getElementById(`select-contacts-to-assign-dropdown-checkbox${i}`);

    if (contactContainer.getAttribute('data-selected') === 'true') {
        contactContainer.style.backgroundColor = "#FFFFFF";
        contactContainer.style.color = "black";
        checkbox.src = "./../img/checkbox-blank.svg";
        checkbox.style.filter = "";
        contactContainer.setAttribute('data-selected', 'false');
        // Entfernen des Kontakts aus dem Array, wenn er existiert

        const index = selectedContacts.indexOf(contact);
        if (index > -1) {
            selectedContacts.splice(index, 1);
        }


    } else {
        contactContainer.style.backgroundColor = "#3b4e69";
        contactContainer.style.color = "#FFFFFF";
        checkbox.src = "./../img/checkbox-filled.svg";
        checkbox.style.filter = "invert()";
        contactContainer.setAttribute('data-selected', 'true');
        selectedContacts.push(contact);

    }
}

/**
 * Toggles the selection state of a priority container in a UI list.
 * The function initially resets the background and 'data-selected' attribute of all 
 * predefined priority containers ('urgent', 'medium', 'low') to their unselected states.
 * 
 * After resetting, the function checks the 'data-selected' attribute of the clicked container.
 * If the container is already selected ('true'), it reverts the appearance and sets the attribute to 'false'.
 * Otherwise, it updates the background and text color to indicate that the container is selected, 
 * and sets the 'data-selected' attribute to 'true'.
 * 
 * @param {number} i - The index or identifier used to specify which priority container is targeted.
 */

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

/**
 * Adds a new subtask to a list of subtasks in the UI.
 * 
 * The function checks if the input field for new subtasks has a value.
 * If a value exists, it appends a new list item to a predefined list.
 * The list item includes the subtask description and associated action icons for editing and deleting.
 * 
 * If the input field is empty, the function sets the placeholder text to prompt the user to add a subtask.
 */

function addNewSubtask() {
    let list = document.querySelector('.add-new-subtask-list');
    let input = document.getElementById('add-new-subtask-input');

    // Füge der subTasks-Liste nur ein neues Element hinzu, wenn im Eingabefeld etwas steht.
    if (input.value) {
        subTasks.push(input.value);
        input.value = '';
    }

    // Leere die Liste vor dem Neurendern
    list.innerHTML = '';

    // Neurendern der Liste
    for (let i = 0; i < subTasks.length; i++) {
        const subtask = subTasks[i];
        list.innerHTML += /*html*/`<li><input id="add-new-subtask-listinput${i}" value="${subtask}" disabled>
        <div class="add-new-subtask-icon-container-list" id="add-new-subtask-icon-container-list${i}">
            <img src="./../img/edit-icon.svg" onclick="editNewSubtaskInput(${i})">|
            <img src="./../img/delete-icon.svg" onclick="clearNewSubtaskInput(${i})">
        </div></li>`;
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
    subTasks.splice(i, 1);
    addNewSubtask();
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
    subTasks[i] = input.value;
}

function selectContactsToAssignDropdownRender() {
    let container = document.getElementById('select-contacts-to-assign-dropdown');
    container.innerHTML = '';
    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        const isSelected = selectedContacts.includes(contact.name);
        container.innerHTML += /*html*/`
         <div class="select-contacts-to-assign-dropdown-contact-container ${isSelected ? 'selected' : ''}"
                                id="select-contacts-to-assign-dropdown-contact-container${i}"
                                onclick = "assignContactToTask(${i},'${contact.name}')"
                                data-selected="${isSelected ? 'true' : 'false'}">
                                <div class="select-contacts-to-assign-dropdown-contact">
                                    <div class="select-contacts-to-assign-dropdown-contact-credentials-container">
                                        <svg width="28" height="28">
                                            <circle cx="14" cy="14" r="14" fill=${getRandomColor()} />
                                        </svg>
                                        <div class="select-contacts-to-assign-dropdown-contact-credentials">${generateCredentials(contact.name)}</div>
                                    </div>
                                    <div class="select-contacts-to-assign-dropdown-contactname">${contact.name}</div>
                                </div>
                                <div class="select-contacts-to-assign-dropdown-checkbox"><img
                                        src="./../img/${isSelected ? 'checkbox-filled' : 'checkbox-blank'}.svg"
                                        id="select-contacts-to-assign-dropdown-checkbox${i}">
                                </div>
                            </div>
        `;
    }
    renderCredentials();
}

function renderCredentials() {

    let container = document.getElementById('contact-summary');
    container.innerHTML = '';

    for (let i = 0; i < selectedContacts.length; i++) {
        const contact = selectedContacts[i];
        container.innerHTML += /*html*/ `
        <div class="select-contacts-to-assign-dropdown-contact-credentials-container">
        <svg width="28" height="28">
            <circle cx="14" cy="14" r="14" fill="${getRandomColor()}"/>
        </svg>
        <div class="select-contacts-to-assign-dropdown-contact-credentials">${generateCredentials(contact)}</div>
        </div>
        `;
    }

}

function generateCredentials(fullName) {
    let names = fullName.split(" ");  // Teilt den String in ein Array

    let firstName = names[0];
    let lastName = names[1];

    let firstInitial = firstName.charAt(0).toUpperCase();
    let lastInitial = lastName.charAt(0).toUpperCase();

    return `${firstInitial}${lastInitial}`;
}

function checkCurrentTimeForGreeting() {
    let today = new Date();
    let hour = today.getHours();
    let temp = 'Good morning';
    if (hour >= 12 && hour < 17) {
        temp = 'Good Afternoon'
    }
    else if (hour > 17 && hour < 20) {
        temp = 'Good Evening'
    }
    return temp;
}


function getRandomColor() {
    let colors = ["#00bee8", "#ff7a00", "#bb78ff", "#00bee8", "#ffbb2b", "#9327ff", "#ff4646", "#fc71ff", "#cd5c5c", "#ff00ff", "#add8e6", "#98fb98"];
    let randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}

function renderPrivacyPolicy() {
    let container = document.getElementById('dashboard-content');
    container.innerHTML = renderPrivacyPolicyInnerHtml();
}

function renderLegalNotice() {
    let container = document.getElementById('dashboard-content');
    container.innerHTML = renderLegalNoticeInnerHtml();
}

function renderHelp() {
    let container = document.getElementById('dashboard-content');
    container.innerHTML = renderHelpInnerHtml();
}


function renderSummaryinnerHtml() {
    return /*html*/`
        <div class="summary-headline-container">
            <div class="summary-headline">
                <h1>Join 360</h1>
                <svg xmlns="http://www.w3.org/2000/svg" width="4" height="63" viewBox="0 0 4 63" fill="none" id="summary-headline-seperator">
                    <path d="M2 2V61" stroke="#29ABE2" stroke-width="3" stroke-linecap="round" />
                </svg>
                <h2>Key Metrics at a Glance</h2>
                <svg width="94" height="4" viewBox="0 0 94 4" fill="none" xmlns="http://www.w3.org/2000/svg" id="summary-headline-underline">
                <path d="M92 2L2 2" stroke="#29ABE2" stroke-width="3" stroke-linecap="round"/>
                </svg>
            </div>
        </div>
        <div class="summary-main-container">
            <div class="summary-task-container">
                <div class="summary-task-number-container" onclick="renderBoardSite()">
                    <div class="summary-task-number-box">
                        <span class="summary-task-number">
                            <h1>${todos.length}</h1>
                        </span>
                        <span class="summary-task-info">Tasks in Board</span>
                    </div>
                    <div class="summary-task-number-box">
                        <span class="summary-task-number">
                            <h1>${inprogress.length}</h1>
                        </span>
                        <span class="summary-task-info">Tasks in Progress</span>
                    </div>
                    <div class="summary-task-number-box">
                        <span class="summary-task-number">
                            <h1>${awaitfeedback.length}</h1>
                        </span>
                        <span class="summary-task-info">Awaiting Feedback</span>
                    </div>
                </div>
                <div class="summary-urgent-container" onclick="renderBoardSite()">
                    <img src="./../img/urgent-icon.svg">
                    <div class="summary-urgent-number">
                        <h1>${urgentPriority.length}</h1>Urgent
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="2" height="105" viewBox="0 0 2 105" fill="none">
                        <path d="M1 1.48828V103.511" stroke="#D1D1D1" stroke-width="2" stroke-linecap="round" />
                    </svg>
                    <div class="summary-deadline-container">
                        <span class="summary-deadline">${dateCollection[0]}</span>
                        <span>Upcoming Deadline</span>
                    </div>
                </div>
                <div class="summary-todo-container" onclick="renderBoardSite()">
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
                            <h1>${todo.length}</h1>
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
                            <h1>${done.length}</h1>
                            <span>Done</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="summary-greetings">
                <h3>${greeting},</h3>
                <div class="summary-username">${localStorage.getItem('username')}</div>
            </div>
        </div>
        </div>
        `;
}

function renderAddTaskInnerHtml() {
    return /*html*/`
    
<div class="addtask-main-content">
    <h1 style="padding-left: 5%; margin-bottom: 4%">Add Task</h1>
    <form onsubmit="submitClassList('button-create-task')">
        <div class="addtask-content">
            <div class="addtask-side">
                <div class="addtask-title-container">
                    <span>Title<span class="footnote-star">*</span></span>
                    <input class="taskInput" placeholder="Enter a title" type="text" id="title" required>
                </div>
                <div class="addtask-description-container">
                    Description
                    <textarea class="taskInput" name="description" id="description" cols="30" rows="10"
                        placeholder="Enter a description" required></textarea>
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
            <svg xmlns="http://www.w3.org/2000/svg" width="2" height="426" viewBox="0 0 2 426" fill="none"
                id="addtask-separator">
                <path d="M1.24805 1L1.24854 425" stroke="#D1D1D1" stroke-linecap="round" />
            </svg>
            <div class="addtask-side">
                <div class="addtask-title-container">
                    <span>Due date<span class="footnote-star">*</span></span>
                    <input class="taskInput" type="date" id="due-date" name="due-date" min="1900-01-01" max="2099-12-31"
                        class="addtask-dates-select" required>
                </div>
                <div class="addtask-prio-main-container">
                    <div class="addtask-prio-container priority" id="prio-urgent" onclick="prioContainer('urgent')">
                        Urgent <img src="./../img/prio-urgent.svg">
                    </div>
                    <div class="addtask-prio-container priority pre-selected" id="prio-medium" onclick="prioContainer('medium')" data-selected="true">
                        Medium <img src="./../img/prio-medium.svg">
                    </div>
                    <div class="addtask-prio-container priority" id="prio-low" onclick="prioContainer('low')">
                        Low <img src="./../img/prio-low.svg">
                    </div>
                </div>
                <div class="addtask-category-container">
                    <span>Category<span class="footnote-star">*</span></span>
                    <select name="category" id="select-category" class="taskInput">
                        <option value="" disabled>Select a category</option>
                        <option value="technical-task">Technical Task</option>
                        <option value="user-story">User Story</option>
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
            <div class="add-task-bottom-button-left-side">
                <div class="footnote-info-container">
                    <div class="footnote-info"><span class="footnote-star">*</span>
                    This field is required
                    </div>
                </div>
            </div>
            <div class="add-task-bottom-button-right-side">
                <div class="add-task-bottom-button-container">
                    <button class="button-clear" id="button-clear" onclick=submitClassList(this.id) onmouseover="buttonCreateTaskChangeColor()"
                        onmouseout="buttonCreateTaskChangeColorBack()">Clear<svg width="25" height="24"
                            viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                            id="add-task-icon-cancel">
                            <path
                                d="M12.2495 12.0001L17.4925 17.2431M7.00653 17.2431L12.2495 12.0001L7.00653 17.2431ZM17.4925 6.75708L12.2485 12.0001L17.4925 6.75708ZM12.2485 12.0001L7.00653 6.75708L12.2485 12.0001Z"
                                stroke="#2A3647" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </button>
                    <button class="button-create-task">Create Task<img src="./../img/check.svg"
                            id="button-create-task"></button>
                </div>
            </div>
        </div>
    </form>
</div>
`;
}

function renderPrivacyPolicyInnerHtml() {
    return /*html*/ `
    
<div class="app-information-container">
    <h1>Privacy Policy</h1>

    <p><strong>Last Updated: 25.09.2023</strong></p>

    <h2>1. Introduction</h2>
    <p>Welcome to Join360 (“we” or “our”). We respect your privacy and are committed to protecting your personal
        information. This Privacy Policy will inform you as to how we look after your personal data when you visit our
        website (regardless of where you visit it from) and tell you about your privacy rights and how the law protects
        you.
    </p>

    <h2>2. Cookies</h2>
    <p>Our website does not use cookies. We prioritize your privacy and ensure that we do not use any tracking or data
        collection cookies.</p>

    <h2>3. What Data We Collect</h2>
    <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together
        as
        follows:</p>
    <ul>
        <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier.</li>
        <li><strong>Contact Data</strong> includes email address and telephone numbers.</li>
        <li><strong>Technical Data</strong> includes internet protocol (IP) address, browser type and version, time zone
            setting and location, browser plug-in types and versions, operating system and platform, and other
            technology on
            the devices you use to access this website.</li>
    </ul>

    <h2>4. How We Use Your Data</h2>
    <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in
        the
        following circumstances:</p>
    <ul>
        <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
        <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and
            fundamental rights do not override those interests.</li>
        <li>Where we need to comply with a legal obligation.</li>
    </ul>

    <h2>5. Data Security</h2>
    <p>We have put in place appropriate security measures to prevent your personal data from being accidentally lost,
        used,
        or accessed in an unauthorized way, altered, or disclosed. In addition, we limit access to your personal data to
        those employees, agents, contractors, and other third parties who have a business need to know.</p>

    <h2>6. Your Legal Rights</h2>
    <p>Under certain circumstances, you have rights under data protection laws in relation to your personal data,
        including
        the right to receive a copy of the personal data we hold about you and the right to make a complaint at any time
        to
        the relevant data protection authority.</p>

    <h2>7. Contact Us</h2>
    <p>For any questions or concerns regarding this Privacy Policy, please contact us at [Your Contact Information].</p>
</div>
`;
}

function renderLegalNoticeInnerHtml() {
    return /* html */ `
    

<div class="app-information-container">

<h1>Imprint</h1>

<p>
<ul>
    <li>Andreas Krapalies</li>
    <li>Ivan Gomes</li>
    <li>Marcel Speerschneider</li>
</ul><br>
[Address of the JOIN operator - e.g. one of the students]<br>
[Postcode and city]</p>

<h2>Exploring the Board</h2>
<p>Email: [Email]</p>

<h2>Acceptance of terms</h2>
<p>By accessing and using Join (Product), you acknowledge and agree to the following terms and conditions, and any
    policies, guidelines, or amendments thereto that may be presented to you from time to time. We, the listed
    students, may update or change the terms and conditions from time to time without notice.</p>

<h2>Scope and ownership of the product</h2>
<p>Join has been developed as part of a student group project in a web development bootcamp at the <a
        href="https://developerakademie.com/">Developer Akademie GmbH</a>. It has an educational purpose and is not
    intended for extensive personal & business usage. As such, we cannot guarantee consistent availability,
    reliability, accuracy, or any other aspect of quality regarding this Product.</p>

<p>The design of Join is owned by the <a href="https://developerakademie.com/">Developer Akademie GmbH</a>.
    Unauthorized use, reproduction, modification, distribution, or replication of the design is strictly prohibited.
</p>

<h2>Proprietary rights</h2>
<p>Aside from the design owned by <a href="https://developerakademie.com/">Developer Akademie GmbH</a>, we, the
    listed students, retain all proprietary rights in Join, including any associated copyrighted material,
    trademarks, and other proprietary information.</p>

<h2>Use of the product</h2>
<p>Join is intended to be used for lawful purposes only, in accordance with all applicable laws and regulations. Any
    use of Join for illegal activities, or to harass, harm, threaten, or intimidate another person, is strictly
    prohibited. You are solely responsible for your interactions with other users of Join.</p>

<h2>Disclaimer of warranties and limitation of liability</h2>
<p>Join is provided "as is" without warranty of any kind, whether express or implied, including but not limited to
    the implied warranties of merchantability, fitness for a particular purpose, and non-infringement. In no event
    will we, the listed students, or the <a href="https://developerakademie.com/">Developer Akademie</a>, be liable
    for any direct, indirect, incidental, special, consequential or exemplary damages, including but not limited to,
    damages for loss of profits, goodwill, use, data, or other intangible losses, even if we have been advised of
    the possibility of such damages, arising out of or in connection with the use or performance of Join.</p>

<h2>Indemnity</h2>
<p>You agree to indemnify, defend and hold harmless us, the listed students, the <a
        href="https://developerakademie.com/">Developer Akademie</a>, and our affiliates, partners, officers,
    directors, agents, and employees, from and against any claim, demand, loss, damage, cost, or liability
    (including reasonable legal fees) arising out of or relating to your use of Join and/or your breach of this
    Legal Notice.</p>

<p>For any questions or notices, please contact us at [Contact Email].</p>

<p>Date: July 26, 2023</p>
</div>
    `;
}

function renderHelpInnerHtml() {
    return /* html */ `
    <div class="app-information-container">
    <h1>Help</h1>

    <p>Welcome to the help page for Join, your guide to using our kanban project management tool. Here, we'll provide an
        overview of what Join is, how it can benefit you, and how to use it.</p>

    <h2>What is Join?</h2>
    <p>Join is a kanban-based project management tool designed and built by a group of dedicated students as part of
        their
        web development bootcamp at the <a href="https://developerakademie.com/">Developer Akademie</a>.</p>

    <p>Kanban, a Japanese term meaning "billboard", is a highly effective method to visualize work, limit
        work-in-progress,
        and maximize efficiency (or flow). Join leverages the principles of kanban to help users manage their tasks and
        projects in an intuitive, visual interface.</p>

    <p>It is important to note that Join is designed as an educational exercise and is not intended for extensive
        business
        usage. While we strive to ensure the best possible user experience, we cannot guarantee consistent availability,
        reliability, accuracy, or other aspects of quality regarding Join.</p>

    <h2>How to use it</h2>
    <p>Here is a step-by-step guide on how to use Join:</p>
    <ol>
        <li><strong>Exploring the Board</strong><br>
            When you log in to Join, you'll find a default board. This board represents your project and contains four
            default lists: "To Do", "In Progress", “Await feedback” and "Done".</li>

        <li><strong>Creating Contacts</strong><br>
            In Join, you can add contacts to collaborate on your projects. Go to the "Contacts" section, click on "New
            contact", and fill in the required information. Once added, these contacts can be assigned tasks and they
            can
            interact with the tasks on the board.</li>

        <li><strong>Adding Cards</strong><br>
            Now that you've added your contacts, you can start adding cards. Cards represent individual tasks. Click the
            "+"
            button under the appropriate list to create a new card. Fill in the task details in the card, like task
            name,
            description, due date, assignees, etc.</li>

        <li><strong>Moving Cards</strong><br>
            As the task moves from one stage to another, you can reflect that on the board by dragging and dropping the
            card
            from one list to another.</li>

        <li><strong>Deleting Cards</strong><br>
            Once a task is completed, you can either move it to the "Done" list or delete it. Deleting a card will
            permanently remove it from the board. Please exercise caution when deleting cards, as this action is
            irreversible.</li>
    </ol>

    <p>Remember that using Join effectively requires consistent updates from you and your team to ensure the board
        reflects
        the current state of your project.</p>

    <p>Have more questions about Join? Feel free to contact us at [Your Contact Email]. We're here to help you!</p>

    <p>Enjoy using Join!</p>
</div>
    `;
}