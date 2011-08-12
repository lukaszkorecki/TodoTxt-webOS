var TasksAssistant;
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
TasksAssistant = (function() {
  function TasksAssistant() {
    this.taskCache = "";
    this.tasks = new Tasks();
  }
  TasksAssistant.prototype.setup = function() {
    var attributes;
    this.addMenu();
    this.setupNewTaskForm();
    this.tasks.load(__bind(function(data) {
      this.data = data;
      return this.refreshTasks();
    }, this));
    attributes = {
      swipeToDelete: false,
      reorderable: false,
      itemTemplate: 'tasks/itemTemplate',
      dividerFunction: this.dividerFunction
    };
    this.controller.setupWidget('tasksList', {
      swipeToDelete: false,
      reorderable: false,
      itemTemplate: 'tasks/itemTemplate',
      dividerFunction: this.dividerFunction
    }, this.data);
    return Mojo.Event.listen(this.controller.get('tasksList'), Mojo.Event.listTap, this.taskDialog.bind(this));
  };
  TasksAssistant.prototype.addMenu = function() {
    this.attributes = {
      spacerHeight: 0,
      menuClass: 'no-fade'
    };
    this.model = {
      visible: true,
      items: [
        {
          icon: "new",
          command: "add-task"
        }, {
          label: "todo.txt"
        }, {
          icon: "sync",
          command: 'refresh-tasks'
        }
      ]
    };
    return this.controller.setupWidget(Mojo.Menu.viewMenu, this.attributes, this.model);
  };
  TasksAssistant.prototype.setupNewTaskForm = function() {
    this.attributes = {
      modelProperty: 'open',
      unstyled: true
    };
    this.drawerState = {
      open: false
    };
    this.controller.setupWidget("drawerId", this.attributes, this.drawerState);
    this.model = {
      value: '',
      disabled: false
    };
    this.controller.setupWidget("taskContent", {
      hintText: $L("Tap to edit"),
      multiline: false,
      enterSubmits: false,
      modelProperty: 'value',
      focus: true
    }, this.model);
    this.controller.setupWidget("saveNewTask", {}, {
      label: "Add todo",
      disabled: false
    });
    return Mojo.Event.listen(this.controller.get('saveNewTask'), Mojo.Event.tap, this.saveTask.bind(this));
  };
  TasksAssistant.prototype.taskDialog = function(event) {
    var fn, message, task_id;
    message = event.item.raw_content;
    task_id = event.index;
    fn = this.handleTaskActions;
    return this.controller.showAlertDialog({
      onChoose: fn,
      title: 'Take action!',
      message: message,
      choices: [
        {
          label: 'Mark as done',
          value: {
            task: 'done',
            id: task_id
          },
          type: 'affirmative'
        }, {
          label: 'Remove',
          value: {
            task: 'remove',
            id: task_id
          },
          type: 'negative'
        }, {
          label: $L("Nevermind"),
          value: "cancel",
          type: 'dismiss'
        }
      ]
    });
  };
  TasksAssistant.prototype.dividerFunction = function(el) {
    var p;
    p = el.priority;
    if (el.done === true) {
      p = 'X';
    }
    if (p === 'none') {
      p = '-';
    }
    return p;
  };
  TasksAssistant.prototype.toggleNewTaskForm = function() {
    return this.controller.get('drawerId').mojo.toggleState();
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
    switch (data.task) {
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
    if (data !== 'cancel') {
      return this.refreshTasks();
    }
  };
  TasksAssistant.prototype.refreshTasks = function() {
    Mojo.Log.info('refreshing tasks!');
    this.controller.get('tasksList').mojo.invalidateItems(0);
    return this.controller.get('tasksList').mojo.noticeUpdatedItems(0, this.tasks.sortItems().items);
  };
  TasksAssistant.prototype.saveTask = function(event) {
    event.preventDefault();
    this.tasks.add(this.model.value, __bind(function() {
      this.refreshTasks();
      this.controller.get('taskContent').value = "";
      return this.toggleNewTaskForm();
    }, this));
    return false;
  };
  TasksAssistant.prototype.activate = function() {};
  TasksAssistant.prototype.deactivate = function() {};
  TasksAssistant.prototype.cleanup = function() {};
  return TasksAssistant;
})();