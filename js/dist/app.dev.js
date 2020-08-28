"use strict";

// Helper Functions
function makeDone(e) {
  var localArr = [];
  var storedObj = JSON.parse(localStorage.getItem('todos'));
  var data = $(e).parent().find('span').text();

  for (var task in storedObj['datas']) {
    if (data !== storedObj['datas'][task]) {
      localArr.push(storedObj['datas'][task]);
    }
  }

  storedObj['datas'] = localArr;
  localStorage.setItem('todos', JSON.stringify(storedObj));
  $(e).parent().find('span').css('text-decoration', 'line-through');
}

;

function makeEdit(e) {
  $(e).parent().hide();
  var localArr = [];
  var storedObj = JSON.parse(localStorage.getItem('todos'));
  var data = $(e).parent().find('span').text();

  for (var task in storedObj['datas']) {
    if (data !== storedObj['datas'][task]) {
      localArr.push(storedObj['datas'][task]);
    }
  }

  storedObj['datas'] = localArr;
  localStorage.setItem('todos', JSON.stringify(storedObj));
  $('#todoInput').val(data);
}

; // jQuery Functions

$(document).ready(function () {
  var todoInput = $('#todoInput');
  var todoSubmit = $('#todoSubmit');
  var todoList = $('.todo-items ul');
  var storedObj = localStorage.getItem('todos');

  if (storedObj) {
    var newObj = JSON.parse(storedObj);

    for (var task in newObj['datas']) {
      var todo = "\n            <li>\n            <span id=\"todo-item\">".concat(newObj['datas'][task], "</span>\n            <button id=\"todoEdit\" onclick=\"makeEdit(this)\" class=\"btn btn-info\">EDIT</button>\n            <button onclick=\"makeDone(this)\" id=\"todoDone\" class=\"btn btn-info\">X</button>\n            </li>");
      $(todo).appendTo(todoList);
    }
  }

  $.get('https://programming-quotes-api.herokuapp.com/quotes/random', function (data) {
    var quoteBox = $('#quotes');
    var quote = "<p>".concat(data.en, "</p>");
    var author = "<strong>".concat(data.author, "</strong>");
    $(quote).appendTo(quoteBox);
    $(author).appendTo(quoteBox);
  });
  var nasa_url = 'https://api.nasa.gov/planetary/apod?api_key=SGYJWovxqCF7tC62cKoFTsDxyf7oqXVlQfLEppv2';
  $.get(nasa_url, function (data) {
    var quoteBox = $('#learn');
    var explanation = "<p>".concat(data.explanation, "</p>");
    var title = "<h3 class=\"pt-3 pb-3\">".concat(data.title, "</h3>");
    var copyright = "<small>(c) ".concat(data.copyright, "</small>");
    $(title).appendTo(quoteBox);
    $(explanation).appendTo(quoteBox);
    $(copyright).appendTo(quoteBox);
  }); //fetch('https://programming-quotes-api.herokuapp.com/quotes/random')
  //.then(response => response.json())
  //.then(asfasf => console.log(asfasf));

  todoSubmit.on('click', function () {
    var todoObj = {
      'datas': []
    };
    var storedObj = localStorage.getItem('todos');

    if (storedObj) {
      var _newObj = JSON.parse(storedObj);

      _newObj['datas'].push(todoInput.val());

      localStorage.setItem('todos', JSON.stringify(_newObj));
    } else {
      todoObj['datas'].push(todoInput.val());
      localStorage.setItem('todos', JSON.stringify(todoObj));
    }

    var todo = "<li>\n        <span>".concat(todoInput.val(), "</span>\n        <button id=\"todoEdit\" onclick=\"makeEdit(this)\" class=\"btn btn-info\">EDIT</button>\n        <button id=\"todoDone\" onclick=\"makeDone(this)\" class=\"btn btn-danger\">X</button>\n        </li>");
    $(todo).appendTo(todoList);
    todoInput.val("");
  });
});
var x = document.getElementById("demo");

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  x.innerHTML = "Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude;
} // Libraries


var slideshow = new Slideshow({
  tickInterval: 5000,
  transitionTime: 100,
  backgroundElementId: "body"
});
slideshow.setImages(['https://source.unsplash.com/1200x700/?nature', 'https://source.unsplash.com/1200x700/?technology', 'https://source.unsplash.com/1200x700/?human']);
slideshow.run();