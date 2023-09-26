function renderEditTaskPopUp(id) {
    let popUp = document.getElementById('overlay');
    popUp.innerHTML = HTMLrenderEditTask(id);
}

function HTMLrenderEditTask(id) {
    return /*html*/ `
    <div id="${id}" class="existingTaskOverviewPopUp">
    <label>Title</label>
    <input type="text" value="${todos[id]['taskInputTitle']}">
    <label>Description</label>
    <input type="text" value="${todos[id]['taskInputDescription']}">
    <label>Due Date</label>
    <input type="date" value="${todos[id]['taskInputDate']}">
    <label>Prio</label>
    <div class="Auswahl-an-Prios">
        <div>Prio High</div>
        <div>Prio Medium</div>
        <div>Prio Low</div>
    </div>
    <label>Assigned to</label>
    <label>Hier kommt das Pull Down Menü</label>
    <label>Hier kommen alle aktuellen Kontakte</label>
    <label>Hier kommt Add new Subatsk</label>
    <div>Auflistung alle Subtasks</div>
    <button onclick="closeAddTaskForm()">OK</button>
</div>
    `;
}