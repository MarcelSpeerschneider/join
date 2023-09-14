function openAddTaskForm() {
    document.getElementById('overlay').style.display = 'flex';
}

function closeAddTaskForm() {
    document.getElementById('overlay').style.display = 'none';
}

function renderPopUpAddTask(){
    let popUp = document.getElementById('overlayContent');
    popUp.innerHTML = HTMLrenderPopUpAddTask();
}

function HTMLrenderPopUpAddTask(){
    return /*html*/`
    <form id="addTaskOverlay">
        <div id="addTaskOverlayHeadline">
            <h1>Add Task</h1>
            <img class="cross-close" onclick="closeAddTaskForm()" src="./../img/cross.png">
        </div>
    </form>    
    `
    ;
}