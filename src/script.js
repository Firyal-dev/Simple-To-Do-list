const input = document.getElementById("input");
const button = document.getElementById("btn");
const todo = document.getElementById("todo");

// ambil data dari local storage
let todos = JSON.parse(localStorage.getItem("todos")) || [];

// tampilkan semua tugas saat halaman dibuka
todos.forEach((todo) => addTodoToDOM(todo.text, todo.done));

// tambah tugas baru
button.addEventListener("click", () => {
  const text = input.value.trim();
  if (text === "") return;

  const newTodo = { text, done: false };
  todos.push(newTodo);
  saveTodos();
  addTodoToDOM(text, false);
  input.value = "";
});

// tambah elemeen tugas baru ke DOM
function addTodoToDOM(text, done) {
  const todoItem = document.createElement("div");
  todoItem.className =
    "flex justify-between items-center bg-gray-200 px-4 py-2 rounded-lg";

  const taskText = document.createElement("span");
  taskText.textContent = text;
  taskText.className = "flex-1 cursor-pointer";
  if (done) {
    taskText.classList.add("line-through", "text-gray-500");
  }

  // Tandai selesai
  taskText.addEventListener("click", () => {
    taskText.classList.toggle("line-through");
    taskText.classList.toggle("text-gray-500");

    const index = [...todo.children].indexOf(todoItem);
    todos[index].done = !todos[index].done;
    saveTodos();
  });

  // Tombol hapus
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "🗑️";
  deleteBtn.className = "text-red-500 hover:text-red-700 ml-4";
  deleteBtn.addEventListener("click", () => {
    const index = [...todo.children].indexOf(todoItem);
    todos.splice(index, 1);
    saveTodos();
    todoItem.remove();
  });

  todoItem.appendChild(taskText);
  todoItem.appendChild(deleteBtn);
  todo.appendChild(todoItem);
}

// Simpan ke localStorage
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}
