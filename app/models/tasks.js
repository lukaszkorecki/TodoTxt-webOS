var Tasks = function(name, callbacks) {
  this.file_parser = new FileParser();
  this.html_gen = new TaskHtmlGenerator();
  this.items = [];
  this.key = "itemStore";

  if(callbacks) {
    this.db = new Mojo.Depot({
      name : name,
      version : 1
    }, callbacks.onSuccess, callbacks.onFailure);
  }
};


Tasks.prototype.getAll = function(newContent) {
  var file='',  _data=[];

  // TODO this will be loaded via db and or dropbox
  file = newContent || "(A) +chore Pay water @important\n(A) 2011-03-06 Pay in £22 for the +card @important\n(E) @web Check the domain names, and think about paying for plugawy.me\nWrite mor tests for +Omoide\nx (B) crete first app @webos\n";

  _data = this.file_parser.load(file).content;

  this.items = _data.map(function(element){
    var obj = this.file_parser.parseLine(element);
    obj.content = this.html_gen.getHtml(obj.content);
    return obj;
  }.bind(this));

  return this;
};

// adds an item to list
Tasks.prototype.add = function( item, callbacks) {
  this.items.push(item);
  this.db.add(this.key,this.items, function() { callbacks.onSuccess(this.items); }, callbacks.onFailure);
};

Tasks.prototype.update = function(id, item, callbacks) {
  this.items[id] = item;
  this.db.add(this.key,this.items, function() { callbacks.onSuccess(this.items); }, callbacks.onFailure);
};

// clears the items
Tasks.prototype.remove = function(callbacks) {
  this.db.discard(this.key,  callbacks.onSuccess, callbacks.onFailure);
};

// retreive all items
Tasks.prototype.get = function(callbacks) {
  this.db.get(this.key,  callbacks.onSuccess, callbacks.onFailure);
};
