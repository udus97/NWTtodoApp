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