let selectedContacts = [];
let subTasks = [];
let greeting = checkCurrentTimeForGreeting();

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


// Desktop-Version-Menu

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

// Mobile-Version-Menu

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


async function renderSummary() {
    await getTaskByStatusAndPrio();
    let dashboardDesktop = document.getElementById('dashboard-content');
    dashboardDesktop.innerHTML = renderSummaryinnerHtml();
    setAcronym();
    highlightMenuButtonDesktop();
    highlightMenuButtonMobile();
}

function renderAddTask() {
    let dashboardDesktop = document.getElementById('dashboard-content');
    dashboardDesktop.innerHTML = renderAddTaskInnerHtml();
    highlightMenuButtonDesktop();
    highlightMenuButtonMobile();
    getMinDate();
}


async function renderBoardSite() {
    let dashboardDesktop = document.getElementById('dashboard-content');
    dashboardDesktop.innerHTML = renderBoard();
    await updateBoard();
    renderPopUpAddTask();
    highlightMenuButtonDesktop();
    highlightMenuButtonMobile();
}


function renderContactsSite() {
    let dashboardDesktop = document.getElementById('dashboard-content');
    dashboardDesktop.innerHTML = returnRenderHTML(), renderContactsAlphabetically();
    highlightMenuButtonDesktop();
    highlightMenuButtonMobile();
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
    <img src="./assets/img/check-black.svg" onclick="addNewSubtask()">|
    <img src="./assets/img/icon-cancel.svg" onclick="clearNewSubtask()">
    `;
}

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

function clearNewSubtask() {
    document.getElementById('add-new-subtask-input').value = '';
    let container = document.getElementById('add-new-subtask-icon-container');
    container.innerHTML = /*html*/ `
    <img src="./assets/img/add-subtask.svg" class="add-new-subtask-plus" onclick="selectNewSubtask()">
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
    <img src="./assets/img/check-black.svg" onclick="saveNewSubtask(${i})">|<img src="./assets/img/delete-icon.svg">
    `;
}

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
                                        src="./assets/img/${isSelected ? 'checkbox-filled' : 'checkbox-blank'}.svg"
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
        temp = 'Good afternoon'
    }
    else if (hour > 17 && hour <= 24) {
        temp = 'Good evening'
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