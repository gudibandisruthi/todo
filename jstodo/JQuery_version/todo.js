/**
* @author Sruthi Gudibandi <gudibandisruthi@gmail.com>
* @file: JavaScript implementation for a todo application
* @version 1.0
* design pattern: Module pattern
* Please find initialization of the application on the last line.
* Naming: camel case, names of strings starts with 's', json object starts with 'j', dom elements start with 'e', integers start with i
*/
(function () {
    "use strict";
    /* jslint
        this, es6
    */
    /** 
    * namespace for todo application
    * @namespace todo
    */
    var todo = {};
    /**
    * @property {object} idinfo - id's of html elements
    */
    todo.idInfo = {
        "addButton": "addTask",
        "taskPanel": "taskPanel",
        "hiddenTaskDiv": "hiddenTaskDiv",
        "editTaskInput": "editTaskInput"
    };
    /**
    * @module events - All the events associated with todo module 
    */
    todo.events = (function () {
        var isValidInput;
        var clickOnEdit;
        var enterOnEditInput;
        var clickOnDelete;
        var getTaskRow;
        var addNewRow;
        /**
        * Validates that task input is not empty
        * @param {string} input text
        * @Returns {boolean} true if input string is not empty, false otherwise
        */
        isValidInput = function (sInputText) {
            if (sInputText === "") {
                //handle empty input
                return false;
            } else {
                return true;
            }
        };
        /**
        * Event listener function when the user clicks on edit of a task    
        */
        clickOnEdit = function () {
            var eAction = this.parentElement;
            var eTaskText = eAction.previousElementSibling;
            var sTaskText = eTaskText.textContent;
            var eTaskRow = eAction.parentElement;            
            var eEditInput = document.getElementById(todo.idInfo.editTaskInput);
            // If one of the tasks is already being edited, other tasks should not be editable
            if(eEditInput.parentElement.className !== "taskRow"){
                eTaskText.textContent = ""; // clears the task text currently displayed in the row 
                eEditInput.addEventListener("keyup", enterOnEditInput, false); 
                eEditInput.value = sTaskText;
                eTaskRow.insertBefore(eEditInput, eAction);
                this.removeEventListener("click", clickOnEdit, false);
            }            
        };
        /**
        * Event listener function when the user fills in the text box on edit and presses, enter
        * @param e - event object generated from the keyup event
        */
        enterOnEditInput = function (e) {
            // May be we can check th ekey before and call this function when only enter is pressed
            if (e.keyCode === 13) { // checks if the button presses is 'enter'
                var sTaskText = this.value;
                var eTaskText = this.previousElementSibling;
                var eEdit = this.nextElementSibling.firstChild;
                var eHiddenTaskDiv = document.getElementById(todo.idInfo.hiddenTaskDiv);
                if (isValidInput(sTaskText)) { // Adds only if the input is not empty
                    eTaskText.textContent = sTaskText;
                    eTaskText.classList.remove("hide");
                    this.value = "";
                    eHiddenTaskDiv.appendChild(this);
                    eEdit.addEventListener("click", clickOnEdit, false);
                }
                /*else{
                    // can highlight inputbox with red or display proper message to fill in the input box
                }*/
            }
        };
        /**
        * EVent listener function when the user clicks on delete for a task
        */
        clickOnDelete = function () {
            var eAction = this.parentElement;
            var etaskRow = eAction.parentElement;
            // @todo implement a confirmation for deleting a task
            var eHiddenTaskDiv = document.getElementById(todo.idInfo.hiddenTaskDiv);
            var eEditInput = document.getElementById(todo.idInfo.editTaskInput);
            // If the task being deleted is already being edited, editinput box is moved back to the hidden div element before deleteing the entire row
            if(eAction.previousSibling.id === "editTaskInput"){
                eHiddenTaskDiv.appendChild(eEditInput);                 
            }            
            etaskRow.remove(); 
        };
        /**
        * creates and returns a html structure for a task row
        * @param text of the task to be added to the list
        * @returns {html element} representing the new task being added to the list
        */
        getTaskRow = function (sInputText) {
            var sTaskId = todo.utils.getMaxTaskId();
            var jRow = {
                "tagName": "p",
                "jAttributes": {
                    "className": "taskRow"
                }
            };
            var eTaskRow = todo.utils.newDomElement(jRow);
            var jTaskCheckbox = {
                "tagName": "input",
                "jAttributes": {
                    "type": "checkbox",
                    "id": sTaskId,
                    "value": sInputText,
                    "name": "taskCheckbox"
                }
            };
            var eTaskCheckbox = todo.utils.newDomElement(jTaskCheckbox);
            var jTaskText = {
                "tagName": "label",
                "jAttributes": {
                    "innerText": sInputText
                }
            };
            var eTaskText = todo.utils.newDomElement(jTaskText);
            eTaskText.setAttribute("for", sTaskId);
            var jEdit = {
                "tagName": "span",
                "jAttributes": {
                    "innerText": "edit"
                }
            };
            var eEdit = todo.utils.newDomElement(jEdit);
            eEdit.addEventListener("click", clickOnEdit, false);
            var jDelete = {
                "tagName": "span",
                "jAttributes": {
                    "innerText": "delete"
                }
            };
            var eDelete = todo.utils.newDomElement(jDelete);
            eDelete.addEventListener("click", clickOnDelete, false);
            var jTaskAction = {
                "tagName": "span",
                "jAttributes": {
                    "className": "taskAction"
                }
            };
            var eTaskAction = todo.utils.newDomElement(jTaskAction);
            eTaskAction.append(eEdit, "|", eDelete);
            eTaskRow.append(eTaskCheckbox, eTaskText, eTaskAction);
            return eTaskRow;
        };
        /**
        * Event listener function when user enters an input and presses enter button or clicks 'Add'
        * @param event 
        */
        addNewRow = function (e) {
            if ((e.type === "click" && e.target.id === todo.idInfo.addButton) || (e.keyCode !== undefined && e.keyCode === 13)) {
                var eInput = document.getElementsByName("taskInput")[0];
                var eTaskPanel = document.getElementById(todo.idInfo.taskPanel);
                var sInputText = eInput.value;
                if (isValidInput(sInputText)) {
                    var eTaskRow = getTaskRow(sInputText);
                    eTaskPanel.appendChild(eTaskRow);
                }
                eInput.value = "";
            }
        };
        return {
            init: function () {
                // Adds initial event listeners to the input text box and 'Add' button
                var eTaskAdd = document.getElementById(todo.idInfo.addButton);
                eTaskAdd.addEventListener("click", addNewRow, false);
                var eTaskInput = document.getElementsByName("taskInput")[0];
                eTaskInput.addEventListener("keyup", addNewRow, false);
            }
        };
    }());
    /**
    * @module utils - Common fundtions required for todo application
    */
    todo.utils = (function () {
        return {
            /** Utility function that creates a dom element with the attributes passed as parameters
            * @param jInfo {object} - has details about the dom element
            * @param jInfo.tagName {string} - tagname of the dom element to be created
            * @param jInfo.jAttributes {object} - JSOn object with attributes of dom as members
            * @returns new dom element created
            */
            newDomElement: function (jInfo) {
                var eNewEle = document.createElement(jInfo.tagName);
                Object.keys(jInfo.jAttributes).forEach(function (sAttr) {
                    if (sAttr === "className") {
                        eNewEle.classList.add(jInfo.jAttributes[sAttr]);
                    } else {
                        eNewEle[sAttr] = jInfo.jAttributes[sAttr];
                    }
                });
                return eNewEle;
            },
            /** 
            * integers are used as id's for each task
            * @returns {0|maxid}, 0 if there are no tasks, int(id) + 1 of the last task displayed
            */
            getMaxTaskId: function () {
                var iTaskCounter = document.getElementsByClassName("taskRow").length;
                var iMaxTask = document.getElementsByClassName("taskRow")[iTaskCounter - 1].firstChild.id;
                var iTaskId;
                if (Number.isNaN(iMaxTask) || (iMaxTask === undefined)) {
                    iTaskId = 0;
                } else {
                    iTaskId = parseInt(iMaxTask) + 1;
                }
                return iTaskId.toString();
            }
        };
    }());
    /**
    * Adding global event listener for error handling
    */
    $.oner("error", function (e) {
        var sError = e.error;
        console.log(sError); // Can be saved to server logs instead
    });
    /**
    * Initializing the todo application
    */
    todo.events.init();
}());
