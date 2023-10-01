function renderEditTaskPopUp(id) {
    let popUp = document.getElementById(`renderChangeTask${id}`);
    popUp.innerHTML = HTMLrenderEditTask(id);
    selectedContacts = todos[id]['tasksAssignedTo'];
    editTaskSelectCategory(id);
    selectContactsToAssign();
    editTaskAddNewSubtask(id);
    editTaskGetPriority(id);
}

function editTaskSelectCategory(id) {
    const select = document.getElementById("select-category");
    const option = select.querySelector(`[value='${todos[id]['taskInputCategory']}']`);
    option.selected = true;
}

function editTaskAddNewSubtask(id) {
    let container = document.querySelector('.add-new-subtask-list');
    subTasks = todos[id]['taskSubtasks'];
    for (let i = 0; i < todos[id]['taskSubtasks'].length; i++) {
        const subtask = todos[id]['taskSubtasks'][i]['description'];
        container.innerHTML += /*html*/`<li><input id="add-new-subtask-listinput${i}" value="${subtask}" disabled>
        <div class="add-new-subtask-icon-container-list" id="add-new-subtask-icon-container-list${i}">
            <img src="./assets/img/edit-icon.svg" onclick="editNewSubtaskInput(${i})">|
            <img src="./assets/img/delete-icon.svg" onclick="clearNewSubtaskInput(${i})">
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

 function editTaskGetInputs(id) {
     let addTaskElements = document.getElementsByClassName('taskInput');
     let taskPriority = '';
     let valueOfInputs = [];

     for (let index = 0; index < addTaskElements.length; index++) {
         elementByID = addTaskElements[index]['id'];
         valueOfInputs.push(document.getElementById(elementByID).value);
     }
     const elements = document.querySelectorAll('.priority');

     for (let i = 0; i < elements.length; i++) {
         if (elements[i].getAttribute('data-selected') === 'true') {
             taskPriority = elements[i].id;
             break
         }
     }
     editTaskSaveTask(id, valueOfInputs, taskPriority);
 }

 function editTaskSaveTask(id, valueOfInputs, taskPriority) {
    let status = todos[id]['taskStatus'];
     todos[id] = {
        'id': id,
        'taskStatus': status,
        'taskInputTitle': valueOfInputs[0],
        'taskInputDescription': valueOfInputs[1],
        'taskInputDate': valueOfInputs[2],
        'taskPriority': taskPriority,
        'taskInputCategory': valueOfInputs[3],
        'taskSubtasks': subTasks,
        'tasksAssignedTo': selectedContacts
     };

     selectedContacts = [];
     subTasks = [];
     setItem("tasksjoin", todos);
     renderBoardSite();
 };

 function clearNewSubtaskInput(i) {
    document.getElementById(`add-new-subtask-listinput${i}`).value = '';
    subTasks.splice(i, 1);
    addNewSubtask();
}