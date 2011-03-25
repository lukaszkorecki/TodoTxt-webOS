function TasksAssistant() {
  this.file_parser = new FileParser();
  this.html_gen = new TaskHtmlGenerator();
}

TasksAssistant.prototype.getData = function() {
  var data = [
       '(A) +chore Pay water @important',
       '(A) 2011-03-06 Pay in £22 for the +card @important',
       '(E) @web Check the domain names, and think about paying for plugawy.me',
       'Write mor tests for +Omoide',
       'x (B) crete first app @webos'
    ];

  return data.map(function(element){
    var obj = this.file_parser.parseLine(element);
    obj.content = this.html_gen.getHtml(obj.content);
    return obj;
  }.bind(this));

};

TasksAssistant.prototype.setup = function() {
  this.data = { };
  this.data['items'] = this.getData();

		this.model = { disabled: false };

  var attributes = {
    swipeToDelete: false,
    reorderable: false,
    disabledProperty: 'disabled',
    itemTemplate: 'tasks/itemTemplate' //,
    // addItemLabel : 'Add...'
  };
  this.controller.setupWidget('tasksList', attributes, this.data);

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
