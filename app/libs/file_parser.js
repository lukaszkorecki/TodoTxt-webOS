var FileParser;
FileParser = (function() {
  function FileParser() {
    this.lineSeparator = "\n";
    this.priorityRegex = /^\(\w\)/i;
    this.doneRegex = /^x\ /i;
    this.dateRegex = /\d{4}-\d{2}-\d{2}/;
    this.priorityNumMapping = {
      A: 1,
      B: 2,
      C: 3,
      D: 4,
      E: 5,
      'none': 9,
      'done': 100,
      x: 101
    };
  }
  FileParser.prototype.load = function(fileContent) {
    this.content = (fileContent || "").split(this.lineSeparator);
    return this;
  };
  FileParser.prototype.parseLine = function(line) {
    var content, createdAt, isDone, obj, priority, priorityNum;
    isDone = !!(line.match(this.doneRegex));
    content = line.replace(this.doneRegex, '');
    priority = line.match(this.priorityRegex) === null ? 'none' : line.match(/\w/i)[0];
    content = content.replace(this.priorityRegex, '');
    createdAt = line.match(this.dateRegex) === null ? false : line.match(this.dateRegex)[0];
    content = content.replace(this.dateRegex, '');
    priorityNum = this.priorityNumMapping[priority];
    if (isDone) {
      priorityNum = this.priorityNumMapping.done;
    }
    if (priorityNum === 9) {
      priority = '';
    }
    obj = {
      content: content.trim(),
      done: isDone,
      priorityNum: priorityNum
    };
    if (priorityNum < 100) {
      obj.priority = priority;
    }
    if (createdAt) {
      obj.createdAt = createdAt;
    }
    return obj;
  };
  return FileParser;
})();