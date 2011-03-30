function TasksAssistant() {
  this.taskCache = "";
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
  // Menu setup
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
  this.data = this.tasks.getAll(this.taskCache+"\n");
  this.controller.get('tasksList').mojo.noticeUpdatedItems(0, this.data.items);
};
TasksAssistant.prototype.setupNewTaskForm = function() {
  // drawer
  this.controller.setupWidget("drawerId",
      this.attributes = {
        modelProperty: 'open',
        unstyled: true
      },
      this.model = { open: false }
    );

  // text field
  this.controller.setupWidget("taskContent", {
      hintText: $L("Tap to edit"),
      multiline: false,
      enterSubmits: false,
      focus: true
    },
    {
      value: "",
      disabled: false
    }
  );
  Mojo.Event.listen(this.controller.get('taskContent'), Mojo.Event.propertyChange, this.handleUpdate);

  // save button
  this.controller.setupWidget("saveNewTask",  { }, { label : "Add todo", disabled: false });
  Mojo.Event.listen(this.controller.get('saveNewTask'), Mojo.Event.tap, this.saveTask);
};

TasksAssistant.prototype.handleUpdate = function(event) {
  this.taskCache = event.value;
  Mojo.Log.info(this.taskCache);
  return false;

};


TasksAssistant.prototype.saveTask = function(event) {
  event.preventDefault();
  Mojo.Log.info(this.taskCache);
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
