document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');
    const emptyState = document.getElementById('empty-state');
    const totalCount = document.getElementById('total-count');
    const completedCount = document.getElementById('completed-count');
    const currentDate = document.getElementById('current-date');

    let todos = JSON.parse(localStorage.getItem('todos')) || [];

    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    currentDate.textContent = new Date().toLocaleDateString('en-US', options);

    const updateStats = () => {
        const total = todos.length;
        const completed = todos.filter(t => t.completed).length;
        
        totalCount.textContent = total;
        completedCount.textContent = completed;
        
        emptyState.style.display = total === 0 ? 'block' : 'none';
    };

    const saveTodos = () => {
        localStorage.setItem('todos', JSON.stringify(todos));
        updateStats();
    };

    const renderTodo = (todo) => {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        li.dataset.id = todo.id;
        
        li.innerHTML = `
            <div class="checkbox-custom"></div>
            <span class="todo-text">${todo.text}</span>
            <button class="delete-btn" aria-label="Delete task">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
            </button>
        `;

        li.querySelector('.checkbox-custom').addEventListener('click', () => toggleTodo(todo.id));
        li.querySelector('.delete-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            deleteTodo(todo.id);
        });

        todoList.appendChild(li);
    };

    const mountTodos = () => {
        todoList.innerHTML = '';
        todos.forEach(renderTodo);
        updateStats();
    };

    const addTodo = (text) => {
        const newTodo = {
            id: Date.now(),
            text,
            completed: false
        };
        todos.push(newTodo);
        saveTodos();
        renderTodo(newTodo);
    };

    const toggleTodo = (id) => {
        todos = todos.map(todo => 
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        saveTodos();
        mountTodos();
    };

    const deleteTodo = (id) => {
        todos = todos.filter(todo => todo.id !== id);
        saveTodos();
        mountTodos();
    };

    todoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = todoInput.value.trim();
        if (text) {
            addTodo(text);
            todoInput.value = '';
            todoInput.focus();
        }
    });

    mountTodos();
});
