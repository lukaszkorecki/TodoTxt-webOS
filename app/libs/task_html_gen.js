var TaskHtmlGenerator;
TaskHtmlGenerator = (function() {
  function TaskHtmlGenerator() {
    this.contextRegex = /\@\w{2,}/gi;
    this.projectRegex = /\+\w{2,}/gi;
    this.contextHtml = function(context) {
      return "<span class=\"contex\">" + context + "</span>";
    };
    this.projectHtml = function(project) {
      return "<span class=\"project\">" + project + "</span>";
    };
  }
  TaskHtmlGenerator.prototype.getHtml = function(content) {
    return content.replace(this.contextRegex, this.contextHtml).replace(this.projectRegex, this.projectHtml);
  };
  return TaskHtmlGenerator;
})();