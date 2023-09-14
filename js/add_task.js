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
                    <input type="text" placeholder="Enter a title" required>
                    <label>Description</label>
                    <textarea cols="30" rows="10" placeholder="Enter a Description" required></textarea>
                    <label for="categories" >Category</label>
                    <select name="categories" id="taskCategories">
                        <option value="" disabled selected>Select task category</option>
                    </select>
                    <label for="assignment">Assigned to</label>
                    <select name="assignment" id="taskAssignment" required>
                        <option value="" disabled selected>Select contacts to assign</option>
                    </select>
                </div>
                <div id="addTaskOverlayBodyMiddle"></div>
                <div id="addTaskOverlayBodyRight">
                    <label>Due Date</label>
                    <input type="date" placeholder="dd/mm/yyyy" required>
                    <label>Prio</label>
                    <div class="addtask-prio-main-container">
                        <div class="addtask-prio-container" id="prio-urgent" onclick="prioContainer('urgent')" data-selected="true" style="background-color: rgb(59, 78, 105); color: rgb(255, 255, 255);">
                            Urgent <img src="./../img/prio-urgent.svg">
                        </div>
                        <div class="addtask-prio-container" id="prio-medium" onclick="prioContainer('medium')" data-selected="false" style="background-color: rgb(255, 255, 255); color: black;">
                            Medium <img src="./../img/prio-medium.svg">
                        </div>
                        <div class="addtask-prio-container" id="prio-low" onclick="prioContainer('low')" data-selected="false" style="background-color: rgb(255, 255, 255); color: black;">
                            Low <img src="./../img/prio-low.svg">
                        </div>
                    </div>
                        <label>Subtasks</label>
                        <input>
                        <button>Create</button>
            </div>
        </form>     
    `
        ;
}