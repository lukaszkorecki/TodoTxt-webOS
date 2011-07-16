(function() {
  var TasksAssistant;
  window.TasksAssistant = TasksAssistant = function() {
    this.taskCache = "";
    this.tasks = new Tasks({
      onSuccess: function() {
        return Mojo.Log.info("we got a db!");
      },
      onFailure: function() {
        return Mojo.Log.error("we dont got a db! FIAL");
      }
    });
    this.FIXTURE = "(A) 2011-03-05 Do more research about Barcelona +holiday\n";
    this.FIXTURE += "x 2011-03-12 2011-03-11 Clean up the fridge @chore\n";
    this.FIXTURE += "(C) 2011-03-26 Write the test code @home\n";
    this.FIXTURE += "x 2011-03-05 Move view code to Web Workers +mikrob\n";
    this.FIXTURE += "(D) 2011-03-06 2011-03-06 Make spaghetti @home +cooking\n";
    this.FIXTURE += "(B) 2011-03-06 2011-03-06 Make spaghetti @home +cooking\n";
    this.FIXTURE += "(E) 2011-03-06 2011-03-06 Make spaghetti @home +cooking\n";
    this.FIXTURE += "x 2011-03-18 2011-03-06 Check bus ticket expiration date @home +chore\n";
    return this.FIXTURE += "take a look at me now";
  };
  TasksAssistant.prototype.setup = function() {
    var attributes;
    this.addMenu();
    this.setupNewTaskForm();
    this.data = this.tasks.getAll(this.FIXTURE);
    attributes = {
      swipeToDelete: false,
      reorderable: false,
      itemTemplate: "tasks/itemTemplate",
      dividerFunction: this.dividerFunction
    };
    this.controller.setupWidget("tasksList", attributes, this.data);
    return Mojo.Event.listen(this.controller.get("tasksList"), Mojo.Event.listTap, this.taskDialog.bind(this));
  };
  TasksAssistant.prototype.addMenu = function() {
    return this.controller.setupWidget(Mojo.Menu.viewMenu, this.attributes = {
      spacerHeight: 0,
      menuClass: "no-fade"
    }, this.model = {
      visible: true,
      items: [
        {
          icon: "new",
          command: "add-task"
        }, {
          label: "todo.txt"
        }, {
          icon: "sync",
          command: "refresh-tasks"
        }
      ]
    });
  };
  TasksAssistant.prototype.setupNewTaskForm = function() {
    this.controller.setupWidget("drawerId", this.attributes = {
      modelProperty: "open",
      unstyled: true
    }, this.drawerState = {
      open: false
    });
    this.model = {
      value: "",
      disabled: false
    };
    this.controller.setupWidget("taskContent", {
      hintText: $L("Tap to edit"),
      multiline: false,
      enterSubmits: false,
      modelProperty: "value",
      focus: true
    }, this.model);
    this.controller.setupWidget("saveNewTask", {}, {
      label: "Add todo",
      disabled: false
    });
    return Mojo.Event.listen(this.controller.get("saveNewTask"), Mojo.Event.tap, this.saveTask.bind(this));
  };
  TasksAssistant.prototype.taskDialog = function(event) {
    var fn, message, task_id;
    message = event.item.raw_content;
    task_id = event.index;
    fn = this.handleTaskActions;
    return this.controller.showAlertDialog({
      onChoose: fn,
      title: "Take action!",
      message: message,
      choices: [
        {
          label: "Mark as done",
          value: {
            task: "done",
            id: task_id
          },
          type: "affirmative"
        }, {
          label: "Remove",
          value: {
            task: "remove",
            id: task_id
          },
          type: "negative"
        }, {
          label: $L("Nevermind"),
          value: "cancel",
          type: "dismiss"
        }
      ]
    });
  };
  TasksAssistant.prototype.dividerFunction = function(el) {
    var p;
    p = el.priority;
    if (el.done === true) {
      p = "X";
    }
    if (p === "none") {
      p = "-";
    }
    return p;
  };
  TasksAssistant.prototype.toggleNewTaskForm = function() {
    return this.controller.get("drawerId").mojo.toggleState();
  };
  TasksAssistant.prototype.handleCommand = function(event) {
    if (event.type === Mojo.Event.command) {
      switch (event.command) {
        case "add-task":
          return this.toggleNewTaskForm();
        case "refresh-tasks":
          return this.refreshTasks();
      }
    }
  };
  TasksAssistant.prototype.handleTaskActions = function(data) {
    console.dir(this.data);
    switch (data.task) {
      case "remove":
        delete this.data.items[data.id];
        break;
      case "done":
        this.data.items[data.id].done = true;
        this.data.items[data.id].priorityNum = 100;
        break;
    }
    if (data !== "cancel") {
      return this.refreshTasks();
    }
  };
  TasksAssistant.prototype.refreshTasks = function() {
    Mojo.Log.info("refreshing tasks!");
    this.controller.get("tasksList").mojo.invalidateItems(0);
    return this.controller.get("tasksList").mojo.noticeUpdatedItems(0, this.tasks.sortItems().items);
  };
  TasksAssistant.prototype.saveTask = function(event) {
    event.preventDefault();
    this.tasks.add(this.model.value);
    this.refreshTasks();
    this.controller.get("taskContent").value = "";
    this.toggleNewTaskForm();
    return false;
  };
  TasksAssistant.prototype.activate = function(event) {};
  TasksAssistant.prototype.deactivate = function(event) {};
  TasksAssistant.prototype.cleanup = function(event) {};
}).call(this);
