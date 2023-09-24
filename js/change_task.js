function renderPopUpChangeTask(id) {
    let popUp = document.getElementById('overlay');
    popUp.innerHTML = HTMLrenderChangeTask(id);
    openAddTaskForm();
}
function HTMLrenderChangeTask(id){
    return /*html*/ `
    <div id="${id}" class="existingTaskOverviewPopUp">
        <div id="editFormHeader">
            <div>z.B. Technical Task</div>
            <div><img class="cross-close" onclick="closeAddTaskForm()" src="./../img/cross.png"></div>
</div>
<div id="editFormBody">
    <div id="dateInfo">
        <div>Due Date</div><div>Date of Array</div>
    </div>
    <div id="priorityInfo">
        <div>Priority</div><div>urgent mit Zeichen und button style</div>
    </div>

    <div id="infoAssignedTo">
        <div>Asigned to:</div>
        <div>Hier kommen dann die Divs mit Namen</div>
    </div>
</div>
        
    </div>`;
}