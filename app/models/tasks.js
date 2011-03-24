var Tasks = function(name, callbacks) {

  this.db = new Mojo.Depot({
    name : name,
    version : 1
  }, callbacks.onSuccess, callbacks.onFailure);
};

var _proto = Tasks.prototype;

_proto.add = function(key, value, callbacks) {
  this.db.add(key, value, callbacks.onSuccess, callbacks.onFailure);
};
_proto.remove = function(key,  callbacks) {
  this.db.discard(key,  callbacks.onSuccess, callbacks.onFailure);
};
_proto.get = function(key,  callbacks) {
  this.db.get(key,  callbacks.onSuccess, callbacks.onFailure);
};
