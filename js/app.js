// Helper Functions
function makeDone(e) {

    let localArr = [];
    let storedObj = JSON.parse(localStorage.getItem('todos'));
    const data = $(e).parent().find('span').text();

    for (let task in storedObj['datas']) {
        if (data !== storedObj['datas'][task]) {
            localArr.push(storedObj['datas'][task]);
        }
    }
    storedObj['datas'] = localArr;

    localStorage.setItem('todos', JSON.stringify(storedObj));

    $(e).parent().find('span').css('text-decoration', 'line-through');

}

// jQuery Functions
$(document).ready(() => {

    const todoInput = $('#todoInput');
    const todoSubmit = $('#todoSubmit');
    const todoList = $('.todo-items ul');

    let storedObj = localStorage.getItem('todos');

    if (storedObj) {
        const newObj = JSON.parse(storedObj);

        for (let task in newObj['datas']) {
            let todo = `
            <li>
            <span id="todo-item">${newObj['datas'][task]}</span>
            <button onclick="makeDone(this)" id="todoDone" class="btn btn-info">X</button>
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
        <button id="todoDone" onclick="makeDone(this)" class="btn btn-info">X</button>
        </li>`;
        $(todo).appendTo(todoList);
        todoInput.val("");
    });
});


// Libraries

const slideshow = new Slideshow({
    tickInterval: 5000,
    transitionTime: 100,
    backgroundElementId: "body"
});

slideshow.setImages(
    ['https://source.unsplash.com/1200x700/?people,health',
    'https://source.unsplash.com/900x900/?people,health',
    'https://source.unsplash.com/1600x1200/?people,health']
);
slideshow.run();