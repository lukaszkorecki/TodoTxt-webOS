var TasksTest = function() {
  this.FIXTURE = '';
  this.FIXTURE += "(A) 2011-03-05 Do more research about Barcelona +holiday\n";
  this.FIXTURE += "(C) 2011-03-26 Write the test code @home\n";
  this.FIXTURE += "(D) 2011-03-06 2011-03-06 Make spaghetti @home +cooking\n";
  this.FIXTURE += 'a test\n';
  this.FIXTURE += "x 2011-03-05 Move view code to Web Workers +mikrob";
  this.HTML = [];
  this.HTML.push('Do more research about Barcelona <span class="project">+holiday</span>');
};


TasksTest.prototype.testPresence = function() {
  Mojo.requireDefined(Tasks);
  return Mojo.Test.passed;
};

TasksTest.prototype.testGetAll = function() {
  var res = (new Tasks).getAll(this.FIXTURE).items;

  Mojo.requireEqual('A',res[0].priority);
  Mojo.requireEqual(this.HTML[0], res[0].content);
  return Mojo.Test.passed;
};

TasksTest.prototype.testAdd = function() {
  var t = new Tasks();
  t.getAll(this.FIXTURE);

  t.add('(A) TEST',{});

  var rec = t.items[1];

  Mojo.requireEqual('TEST', rec.content);
  return Mojo.Test.passed;
};


TasksTest.prototype.testAddDone = function() {
  var t = new Tasks();
  t.getAll(this.FIXTURE);

  t.add('x (B) TEST',{});

  var rec = t.items[5];

  Mojo.requireEqual('TEST', rec.content);
  return Mojo.Test.passed;
};

TasksTest.prototype.testAddNoPriority = function() {
  var t = new Tasks();
  t.getAll(this.FIXTURE);

  t.add('2001-09-11 TEST',{});

  var rec = t.items[4];

  Mojo.requireEqual('TEST', rec.content);
  return Mojo.Test.passed;
};
