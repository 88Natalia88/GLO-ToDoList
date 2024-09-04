const todoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list');
const todoCompleted = document.querySelector('.todo-completed');
const container = document.querySelector('.todo-container');
let toDoData = [];
let titleElement;


document.addEventListener("DOMContentLoaded", function() {
    if (localStorage.getItem('toDoList')) {
        toDoData = JSON.parse(localStorage.getItem('toDoList')); 
        render();
    } else {
        createTitle();
    }
});


const render = function(){
    todoList.innerHTML =  '';
    todoCompleted.innerHTML = '';
    toDoData.forEach((item, index)=>{
        const li = document.createElement('li');

        li.classList.add('todo-item');

        li.innerHTML = `<span class="text-todo">${item.text}</span>
        <div class="todo-buttons">
            <button class="todo-remove"></button>
            <button class="todo-complete"></button>
        </div>`

        if(item.completed){
            todoCompleted.append(li);
        } else {
            todoList.append(li);
        }

        li.querySelector('.todo-complete').addEventListener('click', ()=>{
            item.completed = !item.completed;
            render();
        })

        li.querySelector('.todo-remove').addEventListener('click', ()=>{
            toDoData.splice(index, 1);
            render();
        })

        saveTasksToLocalStorage();
        cleanTitle();
    })
}


todoControl.addEventListener('submit', (e)=>{
    e.preventDefault();

    const newToDoText = headerInput.value.trim();

    if (newToDoText === '') {
        return;
    }
    
    const newToDo = {
        text: newToDoText,
        completed: false,
    };

    toDoData.push(newToDo);
    headerInput.value = '';

    render();

})

function saveTasksToLocalStorage() {
    localStorage.setItem('toDoList', JSON.stringify(toDoData));
}

function createTitle(){
        const title = document.createElement('h2');
        title.style.textAlign = 'center';
        title.innerHTML = "Давай запишем задачи на сегодня!"
        container.append(title);
}

function createTitle() {
    titleElement = document.createElement('h2');
    titleElement.style.textAlign = 'center';
    titleElement.innerHTML = "Давай запишем задачи на сегодня!";
    container.append(titleElement);
}

function cleanTitle() {
    if (titleElement) {
        container.removeChild(titleElement);
        titleElement = null;
    }
}