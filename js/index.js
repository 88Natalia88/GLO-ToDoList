'use strict'

const todoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list');
const todoCompleted = document.querySelector('.todo-completed');
const container = document.querySelector('.todo-container');
let toDoData = [];
let titleElement;


const render = function(){
    todoList.innerHTML =  '';
    todoCompleted.innerHTML = '';

    if (toDoData.length > 0) {
        cleanTitle();
    } else {
        createTitle();
    }

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
            //saveTasksToLocalStorage();
            setData('toDoList', toDoData);
            render();
        })

        //saveTasksToLocalStorage();
        //cleanTitle();
        setData('toDoList', toDoData);
    })
}


const setData = (key, value) => localStorage.setItem(key, JSON.stringify(value));
const getData = (key) => JSON.parse(localStorage.getItem(key));

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

document.addEventListener("DOMContentLoaded", function() {
    if (localStorage.getItem('toDoList')) {
        //toDoData = JSON.parse(localStorage.getItem('toDoList')); 
        toDoData = getData('toDoList');
        render();
    } else {
        createTitle();
    }
});


// function saveTasksToLocalStorage() {
//     localStorage.setItem('toDoList', JSON.stringify(toDoData));
// }

function createTitle(){
    if (!titleElement) {
        titleElement = document.createElement('h2');
        titleElement.style.textAlign = 'center';
        titleElement.style.color = '#444444';
        titleElement.innerHTML = "Давай запишем задачи на сегодня!";
        container.append(titleElement);
    }
}

function cleanTitle() {
    if (titleElement) {
        container.removeChild(titleElement);
        titleElement = null;
    }
}