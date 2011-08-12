var Tasks;
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
Tasks = (function() {
  function Tasks(name, callbacks) {
    this.file_parser = new FileParser();
    this.html_gen = new TaskHtmlGenerator();
    this.items = [];
    this.key = "itemStore";
    if (callbacks) {
      this.db = new Mojo.Depot({
        name: name,
        version: 1
      }, callbacks.onSuccess, callbacks.onFailure);
    }
  }
  Tasks.prototype.getAll = function(newContent) {
    var _data;
    _data = this.file_parser.load(newContent).content;
    this.items = _data.map(__bind(function(element) {
      var obj;
      obj = this.file_parser.parseLine(element);
      obj.raw_content = obj.content;
      obj.content = this.html_gen.getHtml(obj.content);
      return obj;
    }, this));
    this.sortItems();
    return this;
  };
  Tasks.prototype.add = function(item, callbacks) {
    var _item;
    _item = this.file_parser.parseLine(item);
    _item.content = this.html_gen.getHtml(_item.content);
    this.items.push(_item);
    return this.sortItems();
  };
  Tasks.prototype.update = function(id, item, callbacks) {
    this.items[id] = item;
    return this.db.add(this.key, this.items, (function() {
      return callbacks.onSuccess(this.items);
    }), callbacks.onFailure);
  };
  Tasks.prototype.remove = function(callbacks) {
    return this.db.discard(this.key, callbacks.onSuccess, callbacks.onFailure);
  };
  Tasks.prototype.get = function(callbacks) {
    return this.db.get(this.key, callbacks.onSuccess, callbacks.onFailure);
  };
  Tasks.prototype.sortItems = function() {
    this.items = this.items.filter(function(val) {
      return val !== void 0;
    });
    this.items = this.items.sort(function(a, b) {
      return a.priorityNum - b.priorityNum;
    });
    return this;
  };
  return Tasks;
})();