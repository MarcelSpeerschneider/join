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
                <div id="elementInAddTaskOverlayBody">
                    <label>Title</label>
                    <input type="text" placeholder="Enter a title" required>
                </div>
                <div id="elementInAddTaskOverlayBody">
                    <label>Description</label>
                    <textarea cols="30" rows="10" placeholder="Enter a Description" required></textarea>
                </div>
                <div id="elementInAddTaskOverlayBody">
                    <label for="categories">Category</label>
                    <select name="categories" id="taskCategories">
                        <option value="" disabled selected>Select task category</option>
                    </select>
                </div>
                <div id="elementInAddTaskOverlayBody">
                    <label for="assignment">Assigned to</label>
                    <select name="assignment" id="taskAssignment" required>
                        <option value="" disabled selected>Select contacts to assign</option>
                    </select>
                </div>
            </div>
            <div id="addTaskOverlayBodyMiddle"></div>
            <div id="addTaskOverlayBodyRight">
                <div id="elementInAddTaskOverlayBody">
                    <label>Due Date</label>
                    <input type="date" placeholder="dd/mm/yyyy" required>
                </div>
                <div id="elementInAddTaskOverlayBody">
                    <label>Prio</label>
                    <div class="addtask-prio-main-container">
                        <div class="addtask-prio-container" id="prio-urgent" onclick="prioContainer('urgent')"
                            data-selected="true" style="background-color: rgb(59, 78, 105); color: rgb(255, 255, 255);">
                            Urgent <img src="./../img/prio-urgent.svg">
                        </div>
                        <div class="addtask-prio-container" id="prio-medium" onclick="prioContainer('medium')"
                            data-selected="false" style="background-color: rgb(255, 255, 255); color: black;">
                            Medium <img src="./../img/prio-medium.svg">
                        </div>
                        <div class="addtask-prio-container" id="prio-low" onclick="prioContainer('low')"
                            data-selected="false" style="background-color: rgb(255, 255, 255); color: black;">
                            Low <img src="./../img/prio-low.svg">
                        </div>
                    </div>
                </div>
                <div id="elementInAddTaskOverlayBody">
                    <label>Subtasks</label>
                    <div class="subTask">
                        <input class="test" type="text" placeholder="Add new subtask">
                        <div class="subTaskImage">
                            <img src="./../img/add-subtask.svg">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="addTaskOverlayBottom">
            <div class="add-task-bottom-button-container">
                <button class="button-clear" onmouseover="buttonCreateTaskChangeColor()"
                    onmouseout="buttonCreateTaskChangeColorBack()">Clear<svg width="25" height="24" viewBox="0 0 25 24"
                        fill="none" xmlns="http://www.w3.org/2000/svg" id="add-task-icon-cancel">
                        <path
                            d="M12.2495 12.0001L17.4925 17.2431M7.00653 17.2431L12.2495 12.0001L7.00653 17.2431ZM17.4925 6.75708L12.2485 12.0001L17.4925 6.75708ZM12.2485 12.0001L7.00653 6.75708L12.2485 12.0001Z"
                            stroke="#2A3647" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                </button>
                <button class="button-create-task">Create Task<img src="./../img/check.svg"
                        id="button-create-task"></button>
            </div>
    </form>
    `;
}