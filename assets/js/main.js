/* variable declaration */
const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const addBtn = $('#addBtn');
const formSection = $('#formSection');
const mainSection = $('#mainSection');
const cancelBtn = $('#cancelBtn');
const submitBtn = $('#submitBtn');
const titleInput = $('#titleInput');
const categoriesSelect = $('#categoriesSelect');
const taskList = $('#taskList');
const clearListBtn = $('#clearListBtn');

/* functions */

function renderList() {
    taskList.innerHTML = '';

    if (tasks.length === 0) {
        const emptyLi = document.createElement('li');
        emptyLi.classList.add('empty-list');
        emptyLi.textContent = '¡todas tus tareas están completadas!';
        taskList.appendChild(emptyLi);
        return;
    }

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.classList.add('row');
        li.classList.add('list-item')
        li.innerHTML = `
            <h3 class="title">${getEmoji(task.category)} ${task.title}</h3>
                <input type="checkbox">
        `

        const checkbox = li.querySelector('input[type="checkbox"]');
        const taskTitle = li.querySelector('.title');

        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                taskTitle.classList.add('completed');
            } else {
                taskTitle.classList.remove('completed');
            }
        });

        taskList.appendChild(li);
    });
}

function getEmoji(category) {
    switch (category) {
        case 'work':
            return '💼';
        case 'study':
            return '📚';
        case 'personal':
            return '🏠';
    }
}

function $(selector) {
    return document.querySelector(selector);
}

renderList();

/* events*/
addBtn.addEventListener('click', () => {
    formSection.classList.toggle('hidden');
    mainSection.classList.toggle('hidden');
})

cancelBtn.addEventListener('click', () => {
    formSection.classList.toggle('hidden');
    mainSection.classList.toggle('hidden');
})

submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const title = titleInput.value.trim();
    const category = categoriesSelect.value;

    if (!title || !category) {
        alert('completa todos los campos');
        return;
    }

    tasks.push({ title, category });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderList();

    titleInput.value = '';
    categoriesSelect.value = '';
    formSection.classList.add('hidden');
    mainSection.classList.remove('hidden');
});

clearListBtn.addEventListener('click', () => {
    tasks.length = 0;
    localStorage.removeItem('tasks');
    renderList();
})
