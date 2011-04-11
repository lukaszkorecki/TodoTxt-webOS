var FileParser = function(lineSeparator) {
  this.lineSeparator = "\n";

  this.priorityRegex = /^\(\w\)/i;
  this.doneRegex = /^x\ /i;
  this.dateRegex = /\d{4}-\d{2}-\d{2}/;
  this.priorityNumMapping = {A : 1, B: 2, C : 3, D : 4, E : 5, 'none' : 9, 'done' : 100, x : 101};
};

FileParser.prototype.load = function(fileContent) {

  this.content = (fileContent || "").split(this.lineSeparator);
  return this;
};

FileParser.prototype.parseLine = function(line) {

  var isDone = !!(line.match(this.doneRegex));
  var content = line.replace(this.doneRegex,'');

  var priority = line.match(this.priorityRegex) === null ? 'none' : line.match(/\w/i)[0];
  content = content.replace(this.priorityRegex, '');

  var createdAt = line.match(this.dateRegex) === null ? false : line.match(this.dateRegex)[0];
  content = content.replace(this.dateRegex,'');

  var priorityNum = this.priorityNumMapping[priority];
  if(isDone) priorityNum = this.priorityNumMapping.done;
  // legacy
  if(priorityNum === 9) priority = '';

  var ret = {
    content : content.trim(),
    done : isDone ,
    priorityNum : priorityNum
  };

  if(priorityNum < 100 ) ret.priority = priority;

  if(createdAt) ret.createdAt = createdAt;
  return ret;
};
