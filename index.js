// Запросить список todos с jsonplaceholder - DONE
// Отобразить список с ID, title и кнопкой Completed - DONE
// При клике на Completed todo помечается как выполненная
// (CSS: text-decoration: line-through); - DONE
//Есть строка поиска, которая отфильтровывает 
//список по title(через функцию debounce) - 
//Есть loader при загрузке списка с сервера(можно использовать любой loader CSS) - DONE
let list = document.querySelector('.tasks-list');


let todos = [];

const renderTodo = (todos) => {
    list.innerHTML = '';
    todos.forEach(todo => {
      const element = document.createElement('div');
      element.classList.add('todo');
      element.innerHTML = `
        <span>${todo.id}</span>
        <span>${todo.title}</span>
        <button onclick="toggleCompleted(${todo.id})">Completed</button>
      `;
      if (todo.completed) {
        element.classList.add('completed');
      }
      list.appendChild(element);
    });
};


const fetchTodo = async () => {
    loader.style.display = 'block';
    let response = await fetch('https://jsonplaceholder.typicode.com/todos?var=20');
    todos = await response.json();
    loader.style.display = 'none';
    renderTodo(todos);
};

const toggleCompleted = (id) => {
    const todo = todos.find(todo => todo.id === id);
    todo.completed = !todo.completed;
    renderTodo(todos);
};


const debounce = (func, timeout) => {
    let timer;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(context, args);
        }, timeout);
    };
};


const searchInput = document.getElementById('searchInput');

searchInput.addEventListener('input', debounce(function() {
    const searchValue = searchInput.value.toLowerCase();
    const filteredTodos = todos.filter(todo => todo.title.toLowerCase().includes(searchValue));
    console.log(filteredTodos)
    document.clear()
    renderTodo(filteredTodos);
}, 300));

fetchTodo();