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
    todo.classInfo = {
        "taskRow": "taskRow",
        "taskAction": "taskAction"
    }
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
            var $TaskRow = $(this).parents("." + todo.classInfo.taskRow); 
            var $Action = $TaskRow.children("." + todo.classInfo.taskAction);
            var $TaskText = $TaskRow.children("label");
            var sTaskText = $TaskText.text();            
            var $EditInput = $("#" + todo.idInfo.editTaskInput);            
            // If one of the tasks is already being edited, other tasks should not be editable
            if($EditInput.parent().attr("class") !== "taskRow"){
                $TaskText.text(""); // clears the task text currently displayed in the row 
                $EditInput.on("keyup", enterOnEditInput); 
                $EditInput.val(sTaskText);
                $EditInput.insertBefore($Action);
                $(this).unbind("click");
            }            
        };
        /**
        * Event listener function when the user fills in the text box on edit and presses, enter
        * @param e - event object generated from the keyup event
        */
        enterOnEditInput = function (e) {
            // May be we can check th ekey before and call this function when only enter is pressed
            if (e.keyCode === 13) { // checks if the button pressed is 'enter'                
                var $TaskRow = $(this).parents("." + todo.classInfo.taskRow);
                var $TaskText = $TaskRow.children("label");
                var sTaskText = $(this).val();
                var $Edit = $TaskRow.children("." + todo.classInfo.taskAction).children().first();
                var $HiddenTaskDiv = $("#" + todo.idInfo.hiddenTaskDiv);
                if (isValidInput(sTaskText)) { // Adds only if the input is not empty
                    $TaskText.text(sTaskText);                    
                    $(this).value = "";
                    $HiddenTaskDiv.append($(this));
                    $Edit.on("click", clickOnEdit);
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
            var $TaskRow = $(this).parents("." + todo.classInfo.taskRow);
            var $Action = $TaskRow.children("." + todo.classInfo.taskAction);            
            // @todo implement a confirmation for deleting a task
            var $HiddenTaskDiv = $("#" + todo.idInfo.hiddenTaskDiv);
            var $EditInput = $("#" + todo.idInfo.editTaskInput);
            // If the task being deleted is already being edited, editinput box is moved back to the hidden div element before deleteing the entire row
            if($Action.siblings(todo.idInfo.editTaskInput).length > 0){
                $HiddenTaskDiv.append($EditInput);                 
            }            
            $TaskRow.remove(); 
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
                    "class": "taskRow"
                }
            };
            var $TaskRow = todo.utils.newDomElement(jRow);
            var jTaskCheckbox = {
                "tagName": "input",
                "jAttributes": {
                    "type": "checkbox",
                    "id": sTaskId,
                    "value": sInputText,
                    "name": "taskCheckbox"
                }
            };
            var $TaskCheckbox = todo.utils.newDomElement(jTaskCheckbox);
            var jTaskText = {
                "tagName": "label",
                "jAttributes": {
                    "text": sInputText
                }
            };
            var $TaskText = todo.utils.newDomElement(jTaskText);
            $TaskText.attr("for", sTaskId);
            var jEdit = {
                "tagName": "span",
                "jAttributes": {
                    "text": "edit"
                }
            };
            var $Edit = todo.utils.newDomElement(jEdit);
            $Edit.on("click", clickOnEdit);
            var jDelete = {
                "tagName": "span",
                "jAttributes": {
                    "text": "delete"
                }
            };
            var $Delete = todo.utils.newDomElement(jDelete);
            $Delete.on("click", clickOnDelete);
            var jTaskAction = {
                "tagName": "span",
                "jAttributes": {
                    "class": "taskAction"
                }
            };
            var $TaskAction = todo.utils.newDomElement(jTaskAction);
            $TaskAction.append($Edit, "|", $Delete);
            $TaskRow.append($TaskCheckbox, $TaskText, $TaskAction);
            return $TaskRow;
        };
        /**
        * Event listener function when user enters an input and presses enter button or clicks 'Add'
        * @param event 
        */
        addNewRow = function (e) {
            if ((e.type === "click" && e.target.id === todo.idInfo.addButton) || (e.keyCode !== undefined && e.keyCode === 13)) {
                var $Input = $("input[name='taskInput']");
                var $TaskPanel = $("#" + todo.idInfo.taskPanel);
                var sInputText = $Input.val();
                if (isValidInput(sInputText)) {
                    var $TaskRow = getTaskRow(sInputText);
                    $TaskPanel.append($TaskRow);
                }
                $Input.val("");
            }
        };
        return {
            init: function () {
                // Adds initial event listeners to the input text box and 'Add' button
                var $TaskAdd = $("#" + todo.idInfo.addButton);
                $TaskAdd.on("click", addNewRow);
                var $TaskInput = $("input[name='taskInput']");
                $TaskInput.on("keyup", addNewRow);                
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
                var $NewEle = $("<" + jInfo.tagName + ">", jInfo.jAttributes);                
                return $NewEle;
            },
            /** 
            * integers are used as id's for each task
            * @returns {0|maxid}, 0 if there are no tasks, int(id) + 1 of the last task displayed
            */
            getMaxTaskId: function () {                
                var iMaxTask = $("." + todo.classInfo.taskRow + ":last").children("input[type='checkbox']").attr("id");
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
    $(window).on("error", function (e) {
        var sError = e.originalEvent.error;
        console.log(sError); // Can be saved to server logs instead        
    });   
    /**
    * Initializing the todo application
    */
    todo.events.init();
}());
