var FileParser = function(lineSeparator) {
  this.lineSeparator = lineSeparator || "\n";

  this.priorityRegex = /^\(\w\)/i;
  this.doneRegex = /^x\ /i;
  this.dateRegex = /\d{4}-\d{2}-\d{2}/;
};

FileParser.prototype.load = function(fileContent) {
  this.content = fileContent.split(this.lineSeparator);
};

FileParser.prototype.parseLine = function(line) {

  var priority = line.match(this.priorityRegex)[0];
  var isDone = !!(line.match(this.doneRegex));
  var createdAt = line.match(this.dateRegex)[0];

  var content = line.replace(this.priorityRegex, '');
  content = content.replace(this.doneRegex,'');
  content = content.replace(this.dateRegex,'');

  var ret = { content : content.trim(), done : isDone };

  if(createdAt) ret['createdAt'] = createdAt;
  if(priority) ret['priority'] = priority[1];
  console.dir(ret);
  return ret;
};
