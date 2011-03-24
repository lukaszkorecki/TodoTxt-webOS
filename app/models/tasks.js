var Tasks = function(name, callbacks) {

  this.db = new Mojo.Depot({
    name : name,
    version : 1
  }, callbacks.onSuccess, callbacks.onFailure);
};

var _proto = Tasks.prototype;

// TODO this needs to store a list of available keys for getAll query
// and generate a key for example using:
// atob(encodeURIComponent(content+done+date+priority)
_proto.add = function(key, value, callbacks) {
  this.db.add(key, value, callbacks.onSuccess, callbacks.onFailure);
};
// TODO this needs to update key list (which is also stored in db)
_proto.remove = function(key,  callbacks) {
  this.db.discard(key,  callbacks.onSuccess, callbacks.onFailure);
};

//
_proto.get = function(key,  callbacks) {
  this.db.get(key,  callbacks.onSuccess, callbacks.onFailure);
};
