var FileParser = function(lineSeparator) {
  this.lineSeparator = "\n";

  this.priorityRegex = /^\(\w\)/i;
  this.doneRegex = /^x\ /i;
  this.dateRegex = /\d{4}-\d{2}-\d{2}/;
};

FileParser.prototype.load = function(fileContent) {
  this.content = fileContent.split(this.lineSeparator);
  return this;
};

FileParser.prototype.parseLine = function(line) {

  var isDone = !!(line.match(this.doneRegex));
  var content = line.replace(this.doneRegex,'');

  var priority = line.match(this.priorityRegex) === null ? '' : line.match(this.priorityRegex)[0];
  content = content.replace(this.priorityRegex, '');

  var createdAt = line.match(this.dateRegex) === null ? false : line.match(this.dateRegex)[0];
  content = content.replace(this.dateRegex,'');

  var ret = { content : content.trim(), done : isDone };

  if(createdAt) ret['createdAt'] = createdAt;
  if(priority) ret['priority'] = priority[1];
  return ret;
};
