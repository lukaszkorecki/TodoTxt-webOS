function TasksAssistant() {
  this.tasks = new Tasks({
    onSuccess : function() { Mojo.Log.info('we got a db!'); },
    onFailure : function() { Mojo.Log.error('we dont got a db! FIAL'); }
  });
}

TasksAssistant.prototype.setup = function() {

  this.addMenu();
  this.setupNewTaskForm();

  this.data = this.tasks.getAll();

  var attributes = {
    swipeToDelete: false,
    reorderable: false,
    itemTemplate: 'tasks/itemTemplate',
    dividerFunction : this.dividerFunction
  };
  this.controller.setupWidget('tasksList', attributes, this.data);

};

TasksAssistant.prototype.dividerFunction =  function(el) {
  var p = el.priority;
  if(el.done === true) p = 'X';
  if(p == undefined) p = '';
  return p;
};

TasksAssistant.prototype.addMenu = function() {


  this.controller.setupWidget(Mojo.Menu.viewMenu,
      this.attributes = {
        spacerHeight: 0,
        menuClass: 'no-fade'
      },
      this.model = {
        visible: true,
        items: [
          { icon: "new", command: "add-task"},
          { label : "todo.txt"},
          {icon : "sync", command : 'refresh-tasks'}
        ]
      }
      );
};

TasksAssistant.prototype.handleCommand = function(event) {
  if (event.type === Mojo.Event.command) {
    switch (event.command) {
      case 'add-task':
        this.toggleNewTaskForm();
        break;
      case 'refresh-tasks':
        this.refreshTasks();
        break;
      default:
        break;
    }
  }
};

TasksAssistant.prototype.toggleNewTaskForm = function() {
  this.controller.get('drawerId').mojo.toggleState();
};

TasksAssistant.prototype.refreshTasks = function() {

  Mojo.Log.info('refreshing tasks!');
var file ="(A) +chore Pay +bills @important\n(A) 2011-03-06 Pay +creditcards @important\n(A) 2011-03-26 check whether i have to Pay in $$$ @bank\n(B) 2011-03-26 Do taxes @home\n(C) 2011-03-26 Write the test code @home\n(D) 2011-03-27 Finish +cooking the salad @home\nWrite mor tests for +Omoide";

  this.data = this.tasks.getAll(file);
  this.controller.get('tasksList').mojo.noticeUpdatedItems(0, this.data.items);
};
TasksAssistant.prototype.setupNewTaskForm = function() {
  // drawer
  this.controller.setupWidget("drawerId",
        this.attributes = {
            modelProperty: 'open',
            unstyled: false
        },
        this.model = {
            open: false
        }
    );
  // text field
  this.controller.setupWidget("taskContent",
    this.attributes = {
      hintText: $L("(B) Pick up flowers @shop +birthday"),
      multiline: false,
      enterSubmits: false,
      focus: true
    },
    this.model = {
      value: "",
      disabled: false
    });

  // save button
  this.controller.setupWidget("saveNewTask",
    this.attributes = { },
    this.model = {
      label : "Add",
      disabled: false
  });

  Mojo.Event.listen(this.controller.get('saveNewTask'), Mojo.Event.tap, this.saveTask);
};

TasksAssistant.prototype.saveTask = function(event) {
  var val = this.controller.get('taskContent').mojo.getValue();
  event.preventDefault();
  Mojo.Log.info(val);
  return false;

};

TasksAssistant.prototype.activate = function(event) {
	/* put in event handlers here that should only be in effect when this scene is active. For
	   example, key handlers that are observing the document */
};

TasksAssistant.prototype.deactivate = function(event) {
	/* remove any event handlers you added in activate and do any other cleanup that should happen before
	   this scene is popped or another scene is pushed on top */
};

TasksAssistant.prototype.cleanup = function(event) {
	/* this function should do any cleanup needed before the scene is destroyed as
	   a result of being popped off the scene stack */
};
