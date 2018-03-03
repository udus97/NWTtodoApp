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
    //recreateDOM(toDoDatabase);

  }
});