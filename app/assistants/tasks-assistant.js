function TasksAssistant() {
  this.tasks = new Tasks({
    onSuccess : function() { Mojo.Log.info('we got a db!'); },
    onFailure : function() { Mojo.Log.error('we dont got a db! FIAL'); }
  });
}

TasksAssistant.prototype.setup = function() {

  this.addMenu();
  this.setupNewTaskForm();

  var data = this.tasks.getAll();

  var attributes = {
    swipeToDelete: false,
    reorderable: false,
    itemTemplate: 'tasks/itemTemplate',
    dividerFunction : this.dividerFunction
  };
  this.controller.setupWidget('tasksList', attributes, data);

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
      default:
        break;
    }
  }
};

TasksAssistant.prototype.toggleNewTaskForm = function() {
  this.controller.get('drawerId').mojo.toggleState();
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
