let selectedContacts = [];
let subTasks = [];
let greeting = checkCurrentTimeForGreeting();

/**
 * Changes the background color of the user profile SVG element on mobile devices back to its original color.
 */

function changeBackgroundColor() {
    let svgElement = document.querySelector('.user-profile-icon');
    let rectElement = svgElement.querySelector('rect');
    rectElement.setAttribute("fill", "#E1E5EC");
}

function changeBackgroundColorBack() {
    let svgElement = document.querySelector('.user-profile-icon');
    let rectElement = svgElement.querySelector('rect');
    rectElement.setAttribute("fill", "white");
}

function changeBackgroundColorMobile() {
    let svgElement = document.querySelector('.user-profile-icon-mobile');
    rectElement = svgElement.querySelector('circle');
    rectElement.setAttribute("fill", "#E1E5EC");
}

function changeBackgroundColorBackMobile() {
    let svgElement = document.querySelector('.user-profile-icon-mobile');
    rectElement = svgElement.querySelector('circle');
    rectElement.setAttribute("fill", "white");
}

/**
 * Listens for clicks and toggles the display of a user profile popup based on click events. Desktop Menu.
 */

document.addEventListener('click', function (event) {
    let popup = document.getElementById('user-profile-popup');
    let trigger = document.getElementById('user-profile-icon');

    if (trigger) {

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
    }
});

/**
 * Listens for clicks and toggles the display of a user profile popup based on click events. Mobile Menu.
 */

document.addEventListener('click', function (event) {
    let popup = document.getElementById('user-profile-popup-mobile');
    let trigger = document.getElementById('user-profile-icon-mobile');
    if (trigger) {
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
    }
});

/**
 * Renders the summary site, including tasks by status and priority.
 * @returns {Promise<void>}
 */

async function renderSummary() {
    await getTaskByStatusAndPrio();
    let dashboardDesktop = document.getElementById('dashboard-content');
    dashboardDesktop.innerHTML = renderSummaryinnerHtml();
    setAcronym();
    highlightMenuButtonDesktop();
    highlightMenuButtonMobile();
}

/**
 * Renders the add task site.
 */

function renderAddTask() {
    let dashboardDesktop = document.getElementById('dashboard-content');
    dashboardDesktop.innerHTML = renderAddTaskInnerHtml();
    highlightMenuButtonDesktop();
    highlightMenuButtonMobile();
    getMinDate();
}

/**
 * Renders the board site and updates its content.
 */

async function renderBoardSite() {
    let dashboardDesktop = document.getElementById('dashboard-content');
    dashboardDesktop.innerHTML = renderBoard();
    await updateBoard();
    renderPopUpAddTask();
    highlightMenuButtonDesktop();
    highlightMenuButtonMobile();
}

/**
 * Renders the contacts site.
 */

function renderContactsSite() {
    let dashboardDesktop = document.getElementById('dashboard-content');
    dashboardDesktop.innerHTML = returnRenderHTML(), renderContactsAlphabetically();
    highlightMenuButtonDesktop();
    highlightMenuButtonMobile();
}

/**
 * Toggles the visibility of the "select contacts to assign" dropdown and updates its arrow icon.
 */

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

/**
 * Stops the propagation of the given event.
 * @param {Event} event - The event object to stop propagation for.
 */

function childFunction(event) {
    event.stopPropagation();
}

/**
 * Toggles the selection of a contact for a task and updates its appearance.
 * @param {number} i - The index of the contact.
 * @param {string} contact - The name of the contact.
 */

function assignContactToTask(i, contact) {
    let contactContainer = document.getElementById(`select-contacts-to-assign-dropdown-contact-container${i}`);
    let checkbox = document.getElementById(`select-contacts-to-assign-dropdown-checkbox${i}`);

    if (contactContainer.getAttribute('data-selected') === 'true') {
        contactContainer.style.backgroundColor = "#FFFFFF";
        contactContainer.style.color = "black";
        checkbox.src = "./assets/img/checkbox-blank.svg";
        checkbox.style.filter = "";
        contactContainer.setAttribute('data-selected', 'false');

        const index = selectedContacts.indexOf(contact);
        if (index > -1) {
            selectedContacts.splice(index, 1);
        }


    } else {
        contactContainer.style.backgroundColor = "#3b4e69";
        contactContainer.style.color = "#FFFFFF";
        checkbox.src = "./assets/img/checkbox-filled.svg";
        checkbox.style.filter = "invert()";
        contactContainer.setAttribute('data-selected', 'true');
        selectedContacts.push(contact);

    }
}

/**
 * Toggles the selection of a priority container and updates its appearance.
 * @param {number} i - The index of the priority container.
 */

function prioContainer(i) {
    let containerClicked = document.getElementById(`prio-${i}`);
    let containers = [
        document.getElementById('prio-urgent'),
        document.getElementById('prio-medium'),
        document.getElementById('prio-low')
    ];

    containers.forEach((container) => {
        container.style.backgroundColor = "#FFFFFF";
        container.style.color = "black";
        container.setAttribute('data-selected', 'false');
    });

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

/**
 * Toggles the display of the contact summary based on the state of the "select contacts to assign" dropdown.
 */

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

/**
 * Changes the color of the "Create Task" button icon to indicate an action.
 */

function buttonCreateTaskChangeColor() {
    let icon = document.querySelector('#add-task-icon-cancel path');
    icon.setAttribute("stroke", "#00bee8");
}

/**
 * Reverts the color of the "Create Task" button icon back to its original color.
 */

function buttonCreateTaskChangeColorBack() {
    let icon = document.querySelector('#add-task-icon-cancel path');
    icon.setAttribute("stroke", "#2A3647");
}

/**
 * Changes the content of a container to display options for adding a new subtask.
 */

function selectNewSubtask() {
    let container = document.getElementById('add-new-subtask-icon-container');
    container.innerHTML = /*html*/`
    <img src="./assets/img/check-black.svg" onclick="addNewSubtask()">|
    <img src="./assets/img/icon-cancel.svg" onclick="clearNewSubtask()">
    `;
}

/**
 * Adds a new subtask to the list and updates the display.
 */

function addNewSubtask() {
    let list = document.querySelector('.add-new-subtask-list');
    let input = document.getElementById('add-new-subtask-input');
    let getPlusBack = document.getElementById('add-new-subtask-icon-container');

    if (input.value) {
        let subtask =
        {
            'description': input.value,
            'status': 'todo'
        };
        subTasks.push(subtask);
        input.value = '';
    }

    list.innerHTML = '';

    for (let i = 0; i < subTasks.length; i++) {
        const subtaskDescription = subTasks[i]['description'];
        list.innerHTML += /*html*/`<li><input id="add-new-subtask-listinput${i}" value="${subtaskDescription}" disabled>
        <div class="add-new-subtask-icon-container-list" id="add-new-subtask-icon-container-list${i}">
            <img src="./assets/img/edit-icon.svg" onclick="editNewSubtaskInput(${i})">|
            <img src="./assets/img/delete-icon.svg" onclick="clearNewSubtaskInput(${i})">
        </div></li>`;
    }

    getPlusBack.innerHTML = /*html*/`
        <img src="./assets/img/add-subtask.svg" class="add-new-subtask-plus" onclick="selectNewSubtask()">
    `;

}

/**
 * Clears the input field for adding a new subtask and updates the display.
 */

function clearNewSubtask() {
    document.getElementById('add-new-subtask-input').value = '';
    let container = document.getElementById('add-new-subtask-icon-container');
    container.innerHTML = /*html*/ `
    <img src="./assets/img/add-subtask.svg" class="add-new-subtask-plus" onclick="selectNewSubtask()">
    `;
}

/**
 * Clears the input field and removes a new subtask from the list by its index.
 * @param {number} i - The index of the subtask to clear and remove.
 */

function clearNewSubtaskInput(i) {
    document.getElementById(`add-new-subtask-listinput${i}`).value = '';
    subTasks.splice(i, 1);
    addNewSubtask();
}

/**
 * Enables editing of a new subtask input field and updates the display.
 * @param {number} i - The index of the subtask input field to edit.
 */

function editNewSubtaskInput(i) {
    let input = document.getElementById(`add-new-subtask-listinput${i}`);
    let iconContainer = document.getElementById(`add-new-subtask-icon-container-list${i}`);
    input.disabled = false;
    input.style.backgroundColor = 'white';
    iconContainer.innerHTML = /*html*/ `
    <img src="./assets/img/check-black.svg" onclick="saveNewSubtask(${i})">|<img src="./assets/img/delete-icon.svg">
    `;
}

/**
 * Saves the edited new subtask and updates its appearance.
 * @param {number} i - The index of the subtask to save.
 */

function saveNewSubtask(i) {
    let input = document.getElementById(`add-new-subtask-listinput${i}`);
    let iconContainer = document.getElementById(`add-new-subtask-icon-container-list${i}`);
    input.disabled = true;
    input.style.backgroundColor = 'transparent';
    iconContainer.innerHTML = /*html*/ `
      <div class="add-new-subtask-icon-container-list" id="add-new-subtask-icon-container-list1"><img src="./assets/img/edit-icon.svg" onclick="editNewSubtaskInput(${i})">|<img src="./assets/img/delete-icon.svg" onclick="clearNewSubtaskInput(${i})"></li></div>
    `;
    subTasks[i] = input.value;
}

/**
 * Generates user credentials based on the given full name.
 * @param {string} fullName - The full name of the user.
 * @returns {string} - The generated user credentials.
 */

function generateCredentials(fullName) {
    let names = fullName.split(" ");  // Teilt den String in ein Array

    let firstName = names[0];
    let lastName = names[1];

    let firstInitial = firstName.charAt(0).toUpperCase();
    let lastInitial = lastName.charAt(0).toUpperCase();

    return `${firstInitial}${lastInitial}`;
}

/**
 * Checks the current time and returns a greeting message based on the time of day.
 * @returns {string} - The greeting message (e.g., "Good morning").
 */

function checkCurrentTimeForGreeting() {
    let today = new Date();
    let hour = today.getHours();
    let temp = 'Good morning';
    if (hour >= 12 && hour < 17) {
        temp = 'Good afternoon'
    }
    else if (hour > 17 && hour <= 24) {
        temp = 'Good evening'
    }
    return temp;
}

/**
 * Generates a random color from a predefined list of colors.
 * @returns {string} - The randomly selected color in hexadecimal format.
 */

function getRandomColor() {
    let colors = ["#00bee8", "#ff7a00", "#bb78ff", "#00bee8", "#ffbb2b", "#9327ff", "#ff4646", "#fc71ff", "#cd5c5c", "#ff00ff", "#add8e6", "#98fb98"];
    let randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}

/**
 * Renders the privacy policy content in the specified container.
 */

function renderPrivacyPolicy() {
    let container = document.getElementById('dashboard-content');
    container.innerHTML = renderPrivacyPolicyInnerHtml();
}

/**
 * Renders the legal notice content in the specified container.
 */

function renderLegalNotice() {
    let container = document.getElementById('dashboard-content');
    container.innerHTML = renderLegalNoticeInnerHtml();
}

/**
 * Renders the help content in the specified container.
 */

function renderHelp() {
    let container = document.getElementById('dashboard-content');
    container.innerHTML = renderHelpInnerHtml();
}

/**
 * Highlights the selected menu button on a desktop-sized screen. Desktop-Version.
 */

function highlightMenuButtonDesktop() {
    const mapping = {
        'summaryButtonDesktop': '.summary-main-container',
        'addTaskButtonDesktop': '.addtask-content',
        'boardButtonDesktop': '.board-content-container',
        'contactsButtonDesktop': '.contact-content'
    };
    for (let buttonId in mapping) {
        let button = document.getElementById(buttonId);
        let container = document.querySelector(mapping[buttonId]);
        if (container) {
            button.classList.add('link-selected');
            for (let otherButtonId in mapping) {
                if (otherButtonId !== buttonId) {
                    document.getElementById(otherButtonId).classList.remove('link-selected');
                }
            }
        }
    }
}

/**
 * Highlights the selected menu button on a desktop-sized screen. Mobile-Version.
 */

function highlightMenuButtonMobile() {
    const mapping = {
        'summaryButtonMobile': '.summary-main-container',
        'addTaskButtonMobile': '.addtask-content',
        'boardButtonMobile': '.board-content-container',
        'contactsButtonMobile': '.contact-content'
    };

    for (let buttonId in mapping) {
        let button = document.getElementById(buttonId);
        let container = document.querySelector(mapping[buttonId]);

        if (container) {
            button.classList.add('mobile-link-selected');
            for (let otherButtonId in mapping) {
                if (otherButtonId !== buttonId) {
                    document.getElementById(otherButtonId).classList.remove('mobile-link-selected');
                }
            }
        }
    }
}