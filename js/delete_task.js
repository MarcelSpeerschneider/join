async function deleteTask(id) {
    todos.splice(id, 1);
    await setItem('tasksjoin', JSON.stringify(todos));
    updateBoard();
    closeAddTaskForm();
}