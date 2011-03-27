var Tasks = function(name, callbacks) {
  this.file_parser = new FileParser();
  this.html_gen = new TaskHtmlGenerator();
  this.data = [];

  if(callbacks) {
    this.db = new Mojo.Depot({
      name : name,
      version : 1
    }, callbacks.onSuccess, callbacks.onFailure);
  }
};


Tasks.prototype.getAll = function() {
  var file='',  _data=[];

  // TODO this will be loaded via db and or dropbox
  file = "(A) +chore Pay water @important\n(A) 2011-03-06 Pay in £22 for the +card @important\n(E) @web Check the domain names, and think about paying for plugawy.me\nWrite mor tests for +Omoide\nx (B) crete first app @webos\n";

  _data = this.file_parser.load(file).content;

  this.data = _data.map(function(element){
    var obj = this.file_parser.parseLine(element);
    obj.content = this.html_gen.getHtml(obj.content);
    return obj;
  }.bind(this));

  return { 'items' : this.data };
};

// TODO this needs to store a list of available keys for getAll query
// and generate a key for example using:
// atob(encodeURIComponent(content+done+date+priority)
Tasks.prototype.add = function(key, value, callbacks) {
  this.db.add(key, value, callbacks.onSuccess, callbacks.onFailure);
};
// TODO this needs to update key list (which is also stored in db)
Tasks.prototype.remove = function(key,  callbacks) {
  this.db.discard(key,  callbacks.onSuccess, callbacks.onFailure);
};

// XXX key is transparent for the user!
Tasks.prototype.get = function(key,  callbacks) {
  this.db.get(key,  callbacks.onSuccess, callbacks.onFailure);
};

// TODO add getAll method

