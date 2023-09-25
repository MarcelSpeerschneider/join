async function deleteTask(id) {
    todos.splice(id, 1);
    for (let index = 0; index < todos.length; index++) {
        todos[index]['id'] = index;
    }
    await setItem('tasksjoin', JSON.stringify(todos));
    updateBoard();
    closeAddTaskForm();
}