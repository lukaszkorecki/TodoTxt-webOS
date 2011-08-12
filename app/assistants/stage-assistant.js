var StageAssistant;
StageAssistant = (function() {
  function StageAssistant() {}
  StageAssistant.prototype.setup = function() {
    return this.controller.pushScene('tasks');
  };
  return StageAssistant;
})();