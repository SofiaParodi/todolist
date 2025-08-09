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
const params = new URLSearchParams(window.location.search);
const filteredCategory = params.get("category");
let currentFilter = filteredCategory || null; 
const categoryColors = {
  work: '#f3edbd',     // ejemplo: morado para trabajo
  study: '#bbb7e5',    // azul para estudio
  personal: '#dae9fa', // naranja para personal
};

/* functions */

function renderList() {
    taskList.innerHTML = '';

    let filteredTasks = tasks;

    if (currentFilter) {
        filteredTasks = tasks.filter(task => task.category === currentFilter);
    }

    if (filteredTasks.length === 0) {
        const emptyList = document.createElement('li');
        emptyList.classList.add('empty-list');
        emptyList.textContent = '¡todas tus tareas están completadas!';
        taskList.appendChild(emptyList);
        return;
    }

    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        li.classList.add('row', task.category, 'list-item');
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

    currentFilter = null; 
    const url = new URL(window.location);
    url.searchParams.delete('category');
    window.history.replaceState(null, '', url);
    
    updateButtonStates();
    renderList();
})

document.querySelectorAll('.category-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const category = btn.dataset.category;
        
        if (currentFilter === category) {
            currentFilter = null;
            const url = new URL(window.location);
            url.searchParams.delete('category');
            window.history.replaceState(null, '', url);
        } else {
            currentFilter = category;
            const url = new URL(window.location);
            url.searchParams.set('category', category);
            window.history.replaceState(null, '', url);
            
        }

        renderList(); 
        updateButtonStates()
})
});

function updateButtonStates() {
    document.querySelectorAll('.category-btn').forEach(btn => {
        if (btn.dataset.category === currentFilter) {
            btn.style.backgroundColor = categoryColors[currentFilter];
        } else {
            btn.style.backgroundColor = '';
        }
    });
}