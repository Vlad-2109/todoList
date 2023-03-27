// Find out elements on page

const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const tasksList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList');

let tasks = [];

if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.forEach((task) => renderTask(task));
}

checkEmptyList();

// Add the task
form.addEventListener('submit', addTask);

// Delete the task
tasksList.addEventListener('click', deleteTask);

// Done task
tasksList.addEventListener('click', doneTask)

//Functions
function addTask(event) {
    // Cancel sending of form
    event.preventDefault();

    // Get the text of tsak from input
    const taskText = taskInput.value

    // Describe the task in object
    const newTask = {
        id: Date.now(),
        text: taskText,
        done: false
    };

    // Add task in massive with tasks
    tasks.push(newTask)

    //  Save task to Local Storage
    saveToLocalStorage();

    renderTask(newTask);

    // Clear input and return focus on it
    taskInput.value = ''
    taskInput.focus()

    checkEmptyList();
}

function deleteTask(event) {
    // Check out that click wasn't on button 'delete
    if (event.target.dataset.action !== 'delete') return; 

    // Check out that click was on button 'delete'
    const parenNode = event.target.closest('.list-group-item');

    // Define id of task
    const id = Number(parenNode.id);

    // Delete the task from massive with tasks by filter()
    tasks = tasks.filter((task) => task.id !== id)

    // Save task to Local Storage
    saveToLocalStorage();

    // Delete the task from markup
    parenNode.remove()

    checkEmptyList();
}

function doneTask(event) {
    // Check out that click wasn't on button 'done'
    if (event.target.dataset.action !== 'done') return;

    // Check out that click was on button 'done'
    const parentNode = event.target.closest('.list-group-item');

    // Define id of task
    const id = Number(parentNode.id);
    const task = tasks.find((task) => task.id === id)
    task.done = !task.done

    // Save task to Local Storage
    saveToLocalStorage();


    const taskTitle = parentNode.querySelector('.task-title');
    taskTitle.classList.toggle('task-title--done')
}

function checkEmptyList() {
    if (tasks.length === 0) {
        const emptyListHTML = `
                <li id="emptyList" class="list-group-item empty-list">
					<img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
					<div class="empty-list__title">Список справ пустий</div>
				</li>`
        tasksList.insertAdjacentHTML('afterbegin', emptyListHTML);
    }

    if (tasks.length > 0) {
        const emptyListEl = document.querySelector('#emptyList');
        emptyListEl ? emptyListEl.remove() : null;
    }
}

function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function renderTask(task) {
    // Create CSS class
    const cssClass = task.done ? "task-title task-title--done" : "task-title";
    
    // Form a markup for tak
    const taskHTML = `
                <li id='${task.id}' class="list-group-item d-flex justify-content-between task-item">
					<span class="${cssClass}">${task.text}</span>
					<div class="task-item__buttons">
						<button type="button" data-action="done" class="btn-action">
							<img src="./img/tick.svg" alt="Done" width="18" height="18">
						</button>
						<button type="button" data-action="delete" class="btn-action">
							<img src="./img/cross.svg" alt="Done" width="18" height="18">
						</button>
					</div>
				</li>`
    // Add a markup to page
    tasksList.insertAdjacentHTML('beforeend', taskHTML);
}
