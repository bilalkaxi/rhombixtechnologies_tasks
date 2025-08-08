const todoForm = document.querySelector('form');
const todoInput = document.getElementById('todo-input');
const todoListUL = document.getElementById('todo-list')

let allTodos = getTodos();
updateTodoList()

todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addTodo();
})

const addTodo = () =>{
    const todoText = todoInput.value.trim();
    if(todoText.length > 0){
        const todoObject = {
            text:todoText,
            completed: false
        }
        allTodos.push(todoObject);
        updateTodoList();
        saveTodos();

        todoInput.value = "";
    } 
}
function updateTodoList(){
    todoListUL.innerHTML = "";
    allTodos.forEach((todo,todoIndex)=>{
        todoItem = createTodoItem(todo,todoIndex);
        todoListUL.append(todoItem)
    })
}

function createTodoItem(todo,todoIndex){
    const todoId = "todo-"+todoIndex;
    const todoLI = document.createElement("li");
    const todoText = todo.text;
    todoLI.className = "todo";
    todoLI.innerHTML = ` 
    <input type="checkbox" id="${todoId}"/>
        <label class="custom-checkbox" for="${todoId}">
            <svg fill="transparent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M268-240 42-466l57-56 170 170 56 56-57 56Zm226 0L268-466l56-57 170 170 368-368 56 57-424 424Zm0-226-57-56 198-198 57 56-198 198Z"/></svg>
        </label>
    <label for="${todoId}" class="todo-text">
        ${todoText}
    </label>
    <button class="delete-btn">
        <svg fill="var(--secondary-clr)" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m760-183-85 84-56-56 84-85-84-85 56-56 85 84 85-84 56 56-84 85 84 85-56 56-85-84ZM240-80q-50 0-85-35t-35-85v-120h120v-560h600v415q-19-7-39-10.5t-41-3.5v-321H320v480h214q-7 19-10.5 39t-3.5 41H200v40q0 17 11.5 28.5T240-160h294q8 23 20 43t28 37H240Zm120-520v-80h360v80H360Zm0 120v-80h360v80H360Zm174 320H200h334Z"/></svg>
    </button>`
    const deleteBtn = todoLI.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", (e)=>{
        deleteTodoItem(todoIndex)
    })
    const checkbox = todoLI.querySelector("input");
    checkbox.addEventListener("change", ()=>{
        allTodos[todoIndex].completed = checkbox.checked;
        saveTodos();
    })
    checkbox.checked = todo.completed;
    return todoLI;
}
function deleteTodoItem(todoIndex){
    allTodos = allTodos.filter((_, i)=> i !==todoIndex);
    saveTodos();
    updateTodoList()
}
/* localStorage */

function saveTodos(){
    const todosJson = JSON.stringify(allTodos)
    localStorage.setItem("todos",todosJson);
}
function getTodos(){
    const todos = localStorage.getItem("todos") || "[]";
    return JSON.parse(todos)
}