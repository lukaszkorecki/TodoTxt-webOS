function TasksAssistant() {
  this.taskCache = "";
  this.tasks = new Tasks({
    onSuccess : function() { Mojo.Log.info('we got a db!'); },
    onFailure : function() { Mojo.Log.error('we dont got a db! FIAL'); }
  });

  this.FIXTURE = "(A) 2011-03-05 Do more research about Barcelona +holiday\n";
  this.FIXTURE += "x 2011-03-12 2011-03-11 Clean up the fridge @chore\n";
  this.FIXTURE += "(C) 2011-03-26 Write the test code @home\n";
  this.FIXTURE += "x 2011-03-05 Move view code to Web Workers +mikrob\n";
  this.FIXTURE += "(D) 2011-03-06 2011-03-06 Make spaghetti @home +cooking\n";
  this.FIXTURE += "(B) 2011-03-06 2011-03-06 Make spaghetti @home +cooking\n";
  this.FIXTURE += "(E) 2011-03-06 2011-03-06 Make spaghetti @home +cooking\n";
  this.FIXTURE += "x 2011-03-18 2011-03-06 Check bus ticket expiration date @home +chore\n";
  this.FIXTURE += 'take a look at me now';
}

TasksAssistant.prototype.setup = function() {

  this.addMenu();
  this.setupNewTaskForm();

  this.data = this.tasks.getAll(this.FIXTURE);

  var attributes = {
    swipeToDelete: false,
    reorderable: false,
    itemTemplate: 'tasks/itemTemplate',
    dividerFunction : this.dividerFunction
  };
  this.controller.setupWidget('tasksList', attributes, this.data);
  Mojo.Event.listen(this.controller.get('tasksList'), Mojo.Event.listTap, this.taskDialog.bind(this));
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

TasksAssistant.prototype.setupNewTaskForm = function() {
  // drawer
  this.controller.setupWidget("drawerId",
      this.attributes = {
        modelProperty: 'open',
        unstyled: true
      },
      this.drawerState = { open: false }
    );

  // text field
  this.model  = {
    value: "",
    disabled: false
  };
  this.controller.setupWidget("taskContent", {
      hintText: $L("Tap to edit"),
      multiline: false,
      enterSubmits: false,
      modelProperty : 'value',
      focus: true
    }, this.model);

  // save button
  this.controller.setupWidget("saveNewTask",  { }, { label : "Add todo", disabled: false });
  Mojo.Event.listen(this.controller.get('saveNewTask'), Mojo.Event.tap, this.saveTask.bind(this));
};

TasksAssistant.prototype.taskDialog = function(event) {
  var message = event.item.raw_content,
      task_id = event.index;
  var fn = this.handleTaskActions;

  this.controller.showAlertDialog({
    onChoose: fn,
    title: 'Take action!',
    message: message,
    choices:[
      {label:'Mark as done', value: { task : 'done', id : task_id} , type:'affirmative'},
      {label:'Remove', value:{ task : 'remove', id : task_id}, type:'negative'},
      {label:$L("Nevermind"), value:"cancel", type:'dismiss'}
    ] });
};


TasksAssistant.prototype.dividerFunction =  function(el) {
  var p = el.priority;
  if(el.done === true) p = 'X';
  if(p == 'none') p = '-';
  return p;
};

TasksAssistant.prototype.toggleNewTaskForm = function() {
  this.controller.get('drawerId').mojo.toggleState();
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

TasksAssistant.prototype.handleTaskActions = function(data) {
  console.dir(this.data);
  switch(data.task) {
    case 'remove':
      delete this.data.items[data.id];
      break;
    case 'done':
      this.data.items[data.id].done = true;
      this.data.items[data.id].priorityNum = 100;
      break;
    default:
      break;
  }
  if(data != 'cancel') this.refreshTasks();
};



TasksAssistant.prototype.refreshTasks = function() {
  Mojo.Log.info('refreshing tasks!');
  this.controller.get('tasksList').mojo.invalidateItems(0);
  this.controller.get('tasksList').mojo.noticeUpdatedItems(0, this.tasks.sortItems().items);
};



TasksAssistant.prototype.saveTask = function(event) {
  event.preventDefault();
  this.tasks.add(this.model.value);
  this.refreshTasks();
  this.controller.get('taskContent').value = "";
  this.toggleNewTaskForm();
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
