const toDoForm = document.getElementById("todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.getElementById("todo-list");

const TODOS_KEY = 'todos';

let toDos = [];

function saveToDos(toDos) {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteTodo(event) {
  const li = event.target.parentElement;
  toDos = toDos.filter(toDo => toDo.id !== parseInt(li.id));
  li.remove();
  saveToDos(toDos);
}

function paintToDo(newTodo) {
  const li = document.createElement('li');
  li.id = newTodo.id;

  const span = document.createElement('span');
  span.innerText = newTodo.text;
  
  const button = document.createElement('button');
  button.innerText = 'X';
  button.addEventListener('click', deleteTodo);
  
  li.appendChild(span);
  li.appendChild(button);
  
  toDoList.appendChild(li);
}

function handleToDoSubmit(event) {
  event.preventDefault();
  const newTodoObj = {
    id: Date.now(),
    text: toDoInput.value
  };
  toDoInput.value = "";

  toDos.push(newTodoObj);
  paintToDo(newTodoObj);
  saveToDos(toDos);
}

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos) {
  const parsedTodos = JSON.parse(savedToDos);
  toDos = parsedTodos;
  parsedTodos.forEach(paintToDo);
}