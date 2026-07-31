var input = document.getElementById("new-task");
var list = document.getElementById("lists");

// Load tasks from localStorage
var lists = JSON.parse(localStorage.getItem("todos")) || [];

displayTasks();

var editIndex = -1;

function addTask() {
  if (input.value.trim() === "") {
    alert("Please enter a task.");
    return;
  }

  if (editIndex === -1) {
    lists.push(input.value);
  } else {
    lists[editIndex] = input.value;
    editIndex = -1;
  }

  localStorage.setItem("todos", JSON.stringify(lists));
  input.value = "";
  displayTasks();
}

function displayTasks() {
  list.innerHTML = "";

  for (var i = 0; i < lists.length; i++) {
    list.innerHTML += `
      <li class="todo">
        <span class="todo__text">${lists[i]}</span>

        <div class="todo__actions">

          <button
            type="button"
            class="icon-btn"
            onclick="editTask(${i})"
            aria-label="Edit task">

            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/>
            </svg>

          </button>

          <button
            type="button"
            class="icon-btn icon-btn--danger"
            onclick="deleteTask(${i})"
            aria-label="Delete task">

            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14M10 11v6M14 11v6"/>
            </svg>

          </button>

        </div>
      </li>
    `;
  }
}

function deleteTask(index) {
  lists.splice(index, 1);
  localStorage.setItem("todos", JSON.stringify(lists));
  displayTasks();
}

function editTask(index) {
  input.value = lists[index];
  editIndex = index;
}

function clearAll() {
  lists = [];
  localStorage.removeItem("todos");
  displayTasks();
}

function resetInput() {
  input.value = "";
  input.focus();
}
