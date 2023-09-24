function renderPopUpChangeTask(id) {
    let popUp = document.getElementById('overlay');
    popUp.innerHTML = HTMLrenderChangeTask(id);
    openAddTaskForm();
}
function HTMLrenderChangeTask(id){
    return /*html*/ `
    <div id="${id}" class="existingTaskOverviewPopUp">
    <div class="taskForm">
        <div class="taskFormHeader">
            <span class="bgc-technicaltask taskHeadline-bg">${todos[id]['taskCategory']}</span>
            <img class="cross-close-editForm" onclick="closeAddTaskForm()" src="./../img/cross.png">
        </div>
        <div class="taskFormSecondHeader">
            <p class="taskFormSecondHeader-title">${todos[id]['taskInputTitle']}</p>
            <span class="taskFormSecondHeader-description">${todos[id]['taskInputDescription']}</span>
        </div>
    </div>
    <div class="editForm">
        <div id="dateInfo">
            <div>Due Date</div>
            <div>Date of Array</div>
        </div>
        <div id="priorityInfo">
            <div>Priority</div>
            <div>urgent mit Zeichen und button style</div>
        </div>
        <div id="infoAssignedTo">
            <div>Asigned to:</div>
            <div>Hier kommen dann die Divs mit Namen</div>
        </div>
    </div>
</div>
    `;
}