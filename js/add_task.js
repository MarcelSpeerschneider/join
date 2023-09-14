function openAddTaskForm() {
    document.getElementById('overlay').style.display = 'flex';
}

function closeAddTaskForm() {
    document.getElementById('overlay').style.display = 'none';
}

function renderPopUpAddTask() {
    let popUp = document.getElementById('overlayContent');
    popUp.innerHTML = HTMLrenderPopUpAddTask();
}

function HTMLrenderPopUpAddTask() {
    return /*html*/`
        <form id="addTaskOverlay">
            <div id="addTaskOverlayHead">
                <h1>Add Task</h1>
                <img class="cross-close" onclick="closeAddTaskForm()" src="./../img/cross.png">
            </div>
            <div id="addTaskOverlayBody">
                <div id="addTaskOverlayBodyLeft">
                    <label>Title</label>
                    <input>
                    <label>Description</label>
                    <input>
                    <label for="categories" >Category</label>
                    <select name="categories" id="taskCategories">

                    </select>
                    <label for="assignment" >Category</label>
                    <select name="assignment" id="taskAssignment">

                    </select>
                </div>
                <div id="addTaskOverlayBodyMiddle">
                    
                </div>
                <div id="addTaskOverlayBodyRight">
                    
                </div>
            </div>
        </form>     
    `
        ;
}