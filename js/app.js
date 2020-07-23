$(document).ready(() => {

    const todoInput = $('#todoInput');
    const todoSubmit = $('#todoSubmit');
    const todoList = $('.todo-items ul');
    let todoDone = $('#todoDone');

    let storedObj = localStorage.getItem('todos');

    if (storedObj) {
        const newObj = JSON.parse(storedObj);

        for (let task in newObj['datas']) {
            let todo = `
            <li>
            <span id="todo-item">${newObj['datas'][task]}</span>
            <button onclick="makeDone()" id="todoDone" class="btn btn-info">DONE</button>
            </li>`;
            $(todo).appendTo(todoList);
        }
    }



    todoSubmit.on('click', () => {
        let todoObj = {
            'datas': [],
        };

        if (storedObj) {
            const newObj = JSON.parse(storedObj);
            newObj['datas'].push(todoInput.val());
            localStorage.setItem('todos', JSON.stringify(newObj));

        } else {
            todoObj['datas'].push(todoInput.val());
            localStorage.setItem('todos', JSON.stringify(todoObj));
        }

        let todo = `<li>
        <span>${todoInput.val()}</span>
        <button id="todoDone" class="btn btn-info">DONE</button>
        </li>`;
        $(todo).appendTo(todoList);


    });



});

function makeDone() {

    let localArr = [];
    let storedObj = JSON.parse(localStorage.getItem('todos'));
    const data = $(event.currentTarget).parent().find('span').text();

    for(let task in storedObj['datas']) {
        if(data!==storedObj['datas'][task]) {
            localArr.push(storedObj['datas'][task]);
        }
    }
    storedObj['datas'] = localArr;

    localStorage.setItem('todos', JSON.stringify(storedObj));

    console.log(data);
    const done = `<li>
        <del>${data}</del>
        <button disabled id="todoDone" class="btn btn-info">DONE</button>
        </li>`;
    
    $(event.currentTarget).parent().replaceWith(done);

}