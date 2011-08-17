var Tasks;
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
Tasks = (function() {
  function Tasks() {
    this.file_parser = new FileParser();
    this.html_gen = new TaskHtmlGenerator();
    this.items = [];
    this.db = new Lawnchair(function() {});
  }
  Tasks.prototype.load = function(callback) {
    this.db.nuke();
    ["(A) 2011-03-05 Do more research about Barcelona +holiday", "x 2011-03-12 2011-03-11 Clean up the fridge @chore", "(C) 2011-03-26 Write the test code @home", "x 2011-03-05 Move view code to Web Workers +mikrob", "(D) 2011-03-06 2011-03-06 Make spaghetti @home +cooking", "(B) 2011-03-06 2011-03-06 Make spaghetti @home +cooking", "(E) 2011-03-06 2011-03-06 Make spaghetti @home +cooking", "x 2011-03-18 2011-03-06 Check bus ticket expiration date @home +chore", 'take a look at me now'].forEach(__bind(function(el, index) {
      return this.add(el);
    }, this));
    return this.db.all(__bind(function(data) {
      var _data;
      _data = data.map(__bind(function(item) {
        return item.task.content;
      }, this));
      this.items = _data;
      return callback(_data);
    }, this));
  };
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
  Tasks.prototype.add = function(item, callback) {
    var _item;
    _item = this.file_parser.parseLine(item);
    _item.content = this.html_gen.getHtml(_item.content);
    this.items.push(_item);
    return this.db.save({
      task: _item
    }, __bind(function(e) {
      this.sortItems();
      if (callback) {
        return callback(_item);
      }
    }, this));
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