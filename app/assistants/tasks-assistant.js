function TasksAssistant() {
}

TasksAssistant.prototype.processData = function() {
  var data = [
      { content : '(A) +chore Pay water @important', 'time' : 'lol'},
      { content : '(A) 2011-03-06 Pay in £22 for the +card @important', 'time' : 'lol'},
      { content : '(E) @web Check the domain names, and think about paying for plugawy.me', 'time' : 'lol'},
      { content : 'Write mor tests for +Omoide', 'time' : 'lol'},
      { content : 'x (B) crete first app @webos', 'time' : 'lol'},
      { content : '(A) +chore Pay water @important', 'time' : 'lol'},
      { content : '(A) 2011-03-06 Pay in £22 for the +card @important', 'time' : 'lol'},
      { content : '(E) @web Check the domain names, and think about paying for plugawy.me', 'time' : 'lol'},
      { content : 'Write mor tests for +Omoide', 'time' : 'lol'},
      { content : 'x (B) crete first app @webos', 'time' : 'lol'},
      { content : '(A) +chore Pay water @important', 'time' : 'lol'},
      { content : '(A) 2011-03-06 Pay in £22 for the +card @important', 'time' : 'lol'},
      { content : '(E) @web Check the domain names, and think about paying for plugawy.me', 'time' : 'lol'},
      { content : 'Write mor tests for +Omoide', 'time' : 'lol'},
      { content : 'x (B) crete first app @webos', 'time' : 'lol'}
    ];

    return data;
};

TasksAssistant.prototype.setup = function() {
  this.data = { };
  this.data['items'] = this.processData();

		this.model = { disabled: false };

  var attributes = {
    swipeToDelete: false,
    reorderable: false,
    disabledProperty: 'disabled',
    itemTemplate: 'tasks/itemTemplate'
  };
  this.controller.setupWidget('tasksList', attributes, this.data);

};

TasksAssistant.prototype.filterFunction = function(event) {
  // lol
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
