# todo
a javascript todo web application

### Requirements:
1. The app must be written using HTML, CSS and JavaScript
2. The app will be client-side only and will not connect to any mid-tier or server
3. The app does not need to be cross browser compatible
4. The app does not need to be responsive
5. When the user enters a task in the "To-do" textbox and clicks the ADD button, it will get added to the list
6. If they type a task and hit the enter key, it will also get added to the list
7. If the user checks the checkbox next to a task, the system will cross-out the task to mark it as completed
8. If the user un-checks the checkbox next to a task, the system will remove the cross-out to mark the task as incomplete
9. If the user clicks the delete link next to a task, that task will be removed from the list
10. If the user clicks the edit link next to a task, the task will become editable
11. The user will be able to save their edit by hitting the enter key
12. If the user refreshes the page, the task list will be cleared


#### Screenshots:

![Empty todo list](https://github.com/gudibandisruthi/todo/blob/master/jstodo/screenshots/todo_1.png)

![Todo with tasks](https://github.com/gudibandisruthi/todo/blob/master/jstodo/screenshots/todo_2.png)

### Known behaviour
1. Clicking on delete when the task is in edit mode is possible
2. Confirmation is not implemented when delete is clicked
3. Other tasks cannot be edited when one task is being edited
4. other tasks can be deleted when one task is being edited
5. A task that is being edited can be deleted
6. A task that is striked can be deleted/ edited
7. A task that is not checked can be noth edited/ deleted
8. If the task text is very long, it is displayed in multiple lines, "edit | delete" buttons are moved to the next line

### Test scenarios:

| S.No. | Summary | Test steps | Expected behaviour | status |
| --- | --- | --- | --- | --- |
| 1. | New row for a task should not be added if the task input is empty | <ol><li>press enter with out entering text in the task input box</li><li>or click on add without entering input in the input task box</li></ol> | Nothing should happen as the input is empty | Passed |
| 2. | Nothing should happen if the user clicks on edit when the task is already in edit mode | <ol><li>click on edit, edit input box apperas</li><li>click on edit again</li></ol> | Nothing should happen | Passed |
| 3. | Height of the task display area varies accordingly when a new task is added/ deleted | <ol><li>Add lot of new tasks, task display area increases with each task when the number of tasks exceed 3</li><li>Delete works similarly</li></ol> | Height of the display area increases with adding more tasks, and decreases till minimum height when the tasks are deleted | Passed |
| 4. | New row should be added when users enters the input and clicks "add" or presses "enter"| <ol><li>Enter text in input box</li><li>press "enter" or click "add"</li></ol> | New row should be added at the end of the list  | Passed |
| 5. | Every task is editable | <ol><li>Click edit adjacent to the task, which is to be edited</li><li>Input box appears with curent text of the task</li><li>Edit the text and press "enter"<li></ol> | Task is updated with edited text | Passed |
| 6. | Every task should be deletable | <ol><li>Click on delete buttons of any of the tasks</li><li>Task will be deleted</li></ol> | Task is deleted | Passed |
| 7. | A task should be striked off when the check box is checked | <ol><li>Cteh checkbox of any of the tasks</li><li>Task will be striked off</li></ol> | Task is striked off | Passed |


### Possible Enhancements:
1. Common message can be displayed on the UI for any erros 
2. input can be lighlighted with red or an error message can be displayed when the text input is empty, nothing happens in current implementation
3. Can be connected to server and user registration/ saving user's data can be implemented by extending the paplication

### Code quality:
1. Used jslint with the below options
![Jalint options](https://github.com/gudibandisruthi/todo/blob/master/jstodo/screenshots/jslint_options.png)
