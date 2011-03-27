function TasksAssistant() {
  this.tasks = new Tasks({
    onSuccess : function() { Mojo.Log.info('we got a db!'); },
    onFailure : function() { Mojo.Log.error('we dont got a db! FIAL'); }
  });
}

TasksAssistant.prototype.setup = function() {

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
