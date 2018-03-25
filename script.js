//For easy logging to the console during debugging
var l = console.log;
//Methods for parsing and converting a JSON object to a string respectively
var p = JSON.parse;
var s = JSON.stringify;

//For easy querying of DOM elements
var q = function (element) {
  return document.querySelector(element);
}

//The unordered list element.
var toDoItems = q('section#items > ul');

//The array that'd contain our todo items
var toDoDatabase = [];

//If we have never used the todo app before, create a new database in the browser local storage; otherwise load the old database
if (!localStorage.NWTTodoList) {
  localStorage.NWTTodoList = s([]);

} else {
  toDoDatabase = p(localStorage.NWTTodoList);
  recreateDOM(toDoDatabase);
}



//Select the input field where users will type their todo task
var inputField = q('input[type=text]');

//Add an event listener to the input field. When the user types a task and presses the enter key, run this event listener
inputField.addEventListener('keypress', function (e) {
  if (e.key === "Enter" || e.which === 13) {
    // Remove whitespace from what the user enters

    var task = this.value.trim();
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

    //Add an event listener to the done checkbox
    input.onclick = done;

    var label = newElement('label', todo.text, todo.id, null, todo.done);

    var button = newElement('button', 'X', anId, null, 'devare');

    //Add an event listener to the devare button
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
var emptyListButton = q('section#panel > button');

//When the Empty Todo List button is clicked, run this event listener
emptyListButton.addEventListener('click', emptyToDoList);
function emptyToDoList() {
  //Clear the todo unordered list container and devare the todo database
  localStorage.clear();
  localStorage.NWTTodoList = s([]);
  toDoItems.innerHTML = '';
  toDoDatabase = [];
}


//When a todo is marked as done, run this function
function done(e) {
  //The position index of the todo that was marked as done
  var selectedTodoPos = e.target.id;
  //If it is checked, change the ff properties of that particular todo object in the todo database, and recreate the DOM
  if (this.checked) {

    toDoDatabase[selectedTodoPos - 1].done = 'done';
    toDoDatabase[selectedTodoPos - 1].checked = 'checked';
    localStorage.NWTTodoList = s(toDoDatabase);
    recreateDOM(toDoDatabase);
  } else {

    //If it isnt checked, do opposite.
    toDoDatabase[selectedTodoPos - 1].done = '';
    toDoDatabase[selectedTodoPos - 1].checked = '';
    localStorage.NWTTodoList = s(toDoDatabase);
    recreateDOM(toDoDatabase);
  }
}


//When the X button is clicked on a particular todo, run this function
function remove(e) {
  //Position of the todo item in the database
  var pos = e.target.id;
  //Remove the todo item from the database
  toDoDatabase.splice(pos - 1, 1);
  localStorage.NWTTodoList = s(toDoDatabase);
  //Recreate the DOM
  recreateDOM(toDoDatabase);
}