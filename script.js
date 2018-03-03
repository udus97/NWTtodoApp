//For easy logging to the console during debugging
let l = console.log;
//Methods for parsing and converting a JSON object to a string respectively
let p = JSON.parse;
let s = JSON.stringify;

//For easy querying of DOM elements
let q = function (element) {
  return document.querySelector(element);
}

//The unordered list element.
let toDoItems = q('section#items > ul');

//The array that'd contain our todo items
let toDoDatabase = [];

//If we have never used the todo app before, create a new database in the browser local storage; otherwise load the old database
if (!localStorage.NWTTodoList) {
  localStorage.NWTTodoList = s([]);

}else{
  toDoDatabase = p(localStorage.NWTTodoList);
  recreateDOM(toDoDatabase);
}



//Select the input field where users will type their todo task
let inputField = q('input[type=text]');

//Add an event listener to the input field. When the user types a task and presses the enter key, run this event listener
inputField.addEventListener('keypress', function (e) {
  if (e.key === "Enter" || e.which === 13) {
    // Remove whitespace from what the user enters

    let task = this.value.trim();
    //if the input is not empty, create a new todo object literal and add it to the todo database

    if (task) {
      toDoDatabase.push({
        text: task,
        done: '',
        id: toDoDatabase.length + 1,
        checked: ''
      });

      //Empty the input back to its initial state
      this.value = "";

    }
    localStorage.NWTTodoList = s(toDoDatabase);
    //This function recreates the view anytime there is a change in the todo database
    recreateDOM(toDoDatabase);

  }
});


//This function is run anytime changes are made to the todo database
function recreateDOM(toDoDatabase) {
  //Empty the unordered list container
  toDoItems.innerHTML = '';
  //A unique id for button elements
  anId = 1;

  //Loop through the todo database and create HTML elements on the fly from the properties of each todo object
  toDoDatabase.forEach(function (todo) {
    var li = newElement('li');

    var input = newElement('input', null, todo.id, 'checkbox', 'checkbox', todo.checked);

    input.onclick = done;

    var label = newElement('label', todo.text, todo.id, null, todo.done);

    var button = newElement('button', 'X', anId, null, 'delete');

    button.onclick = remove;

    //Add the created HTML elements to the unordered list container
    li.append(input, label, button);
    toDoItems.append(li);
    anId += 1;

  });

}

//An helper function for creating HTML elements
function newElement() {
  var element = document.createElement(arguments['0']);
  var elementText = arguments['1'] || '';
  if (elementText) {
    element.appendChild(document.createTextNode(elementText))
  }
  element.id = arguments['2'] || '';
  element.type = arguments['3'] || '';
  element.className = arguments['4'] || '';
  if (arguments['5']) {
    element.checked = 'checked'
  } else {
    element.checked = '';
  }
  return element;
}


//Select the Empty Todo List button
let emptyListButton = q('section#panel > button');

//When the Empty Todo List button is clicked, run this event listener
emptyListButton.addEventListener('click', emptyToDoList);
function emptyToDoList() {
  //Clear the todo unordered list container and delete the todo database
  localStorage.clear();
  localStorage.NWTTodoList = s([]);
  toDoItems.innerHTML = '';
  toDoDatabase = [];
}