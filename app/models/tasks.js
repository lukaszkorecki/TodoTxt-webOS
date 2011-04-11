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
  var _data = this.file_parser.load(newContent).content;

  this.items = _data.map(function(element){
    var obj = this.file_parser.parseLine(element);
    obj.raw_content = obj.content;
    obj.content = this.html_gen.getHtml(obj.content);
    return obj;
  }.bind(this));

  this.sortItems();
  return this;
};

// adds an item to list
Tasks.prototype.add = function( item, callbacks) {
  var _item = this.file_parser.parseLine(item);
  _item.content = this.html_gen.getHtml(_item.content);
  this.items.push(_item);
  this.sortItems();
  // this.db.add(this.key,this.items, function() { callbacks.onSuccess(this.items); }, callbacks.onFailure);
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

Tasks.prototype.sortItems = function() {
  this.iems = this.items.filter(function(val) { return val != undefined; } );
  this.items = this.items.sort(function(a,b){ return a.priorityNum - b.priorityNum; });
  return this;
};
