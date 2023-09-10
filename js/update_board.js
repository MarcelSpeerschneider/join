function renderBoard(){
    let board = document.getElementById('dashboard-content');
    board.innerHTML = /*html*/`
        <div class="board-header">
        <div class="board-header-left">
            <p>Board</p>
        </div>
        <div class="board-header-right">
            <form class="find-task">
                <div class="search-field">
                    <input id="searchBarInput" type="text" placeholder="Find Task">
                    <img src="png/verticalLine.png">
                    <img class="magnifier" src="png/search.png">
                </div>

                <button class="addTaskButton">
                    <p>Add task</p>
                    <img src="png/add.png">
                </button>
            </form>
        </div>
    </div>
    <div class="board-content-container">
        <div class="board-card">
            <div class="board-card-header">
                <p>To do</p>
                <img src="png/Capa.png">
            </div>
            <div class="drag-area" id="boardCardToDo" ondrop="moveTo('todo')" ondragleave="removeHighlight('open')" ondragover="allowDrop(event); highlight('open')">

            </div>
        </div>
        <div class="board-card">
            <div class="board-card-header">
                <p>In progress</p>
                <img src="png/Capa.png">
            </div>
            <div  class="drag-area" id="boardCardInProgress" ondrop="moveTo('inprogress')" ondragleave="removeHighlight('open')" ondragover="allowDrop(event); highlight('open')">

            </div>
        </div>
        <div class="board-card">
            <div class="board-card-header">
                <p>Await feedback</p>
                <img src="png/Capa.png">
            </div>
            <div class="drag-area" id="boardCardAwaitFeedback" ondrop="moveTo('awaitfeedback')" ondragleave="removeHighlight('open')" ondragover="allowDrop(event); highlight('open')">

            </div>
        </div>
        <div class="board-card">
            <div class="board-card-header">
                <p>Done</p>
                <img src="png/Capa.png">
            </div>
            <div class="drag-area" id="boardCardDone" ondrop="moveTo('done')" ondragleave="removeHighlight('open')" ondragover="allowDrop(event); highlight('open')">

            </div>
        </div>
    </div>
    `
}