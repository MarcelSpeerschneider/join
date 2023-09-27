let searchResultArray = [];

function filterTasks() {
    let search = document.getElementById('searchInput').value;
    search = search.toLowerCase();
    // document.getElementById('card-container').innerHTML = /*html*/``;

    for (let index = 0; index < todos.length; index++) {
        if (todos[index]['taskInputTitle'].toLowerCase().includes(search)) {
            searchResultArray.push(todos[index]);
        }
    }
    updateBoard(searchResultArray);
}