function ParserTests(){
  this.FIXTURE_FILE = "(A) 2011-03-02 Buy milk for +her\n(C) check domains\nx (E) fancy pants @work";
  this.FIXTURE_ARRAY = ["(A) 2011-03-02 Buy milk for +her","(C) check domains","x (E) fancy pants @work", 'x (B) crete first app @webos'];

  this.FIXTURE_OBJECT = [
      { priority : 'A', content : 'Buy milk for +her', createdAt : '2011-03-02', done : false },
      { priority : 'C', content : 'check domains', done : false },
      { priority : 'E', content : 'fancy pants @work', done : true },
      { priority : 'B', content : 'crete first app @webos', done : true}
    ];
}

ParserTests.prototype.testPresence = function() {
  Mojo.assertDefined(FileParser, 'FileParser class is defined');
  return Mojo.Test.passed;
};

ParserTests.prototype.testContentloading = function() {
  var fp = new FileParser();
  fp.load(this.FIXTURE_FILE);

  Mojo.assertEqual(fp.content[0], this.FIXTURE_ARRAY[0], 'Loads content and splits it into an array');
  Mojo.assertEqual(fp.content[2], this.FIXTURE_ARRAY[1], 'Loads content and splits it into an array');
  Mojo.assertEqual(fp.content[2], this.FIXTURE_ARRAY[2], 'Loads content and splits it into an array');
  return Mojo.Test.passed;
};

ParserTests.prototype.testLineParsingPriority = function() {
  var fp = new FileParser();
  var line = fp.parseLine(this.FIXTURE_ARRAY[0]);
  Mojo.assertEqual(line.priority, this.FIXTURE_OBJECT[0].priority ,'Parses done task and gets the priority');
  return Mojo.Test.passed;
};
ParserTests.prototype.testLineParsingContent = function() {
  var fp = new FileParser();
  var line = fp.parseLine(this.FIXTURE_ARRAY[0]);
  Mojo.assertEqual(line.content, this.FIXTURE_OBJECT[0].content ,'Parses done task and gets the content');
  return Mojo.Test.passed;
};

ParserTests.prototype.testLineParsingDone = function() {
  var fp = new FileParser();
  var line = fp.parseLine(this.FIXTURE_ARRAY[0]);
  Mojo.assertEqual(line.done, this.FIXTURE_OBJECT[0].done,'Parses done task and gets the done status');
  return Mojo.Test.passed;
};

ParserTests.prototype.testLineParsingDoneDone = function() {
  var fp = new FileParser();
  var line = fp.parseLine(this.FIXTURE_ARRAY[2]);
  Mojo.assertEqual(line.done, this.FIXTURE_OBJECT[2].done,'Parses done task and gets the done status');
  return Mojo.Test.passed;
};

ParserTests.prototype.testLineParsingTwo = function() {
  var fp = new FileParser();
  var line = fp.parseLine(this.FIXTURE_ARRAY[1]);
  Mojo.assertEqual(line.done, false);
  return Mojo.Test.passed;
};

ParserTests.prototype.testLineParsingNoDate = function() {
  var fp = new FileParser();
  var line = fp.parseLine(this.FIXTURE_ARRAY[1]);
  Mojo.assertEqual(line.createdAt, undefined);
  return Mojo.Test.passed;
};

ParserTests.prototype.testDoneContent = function() {
  var fp = new FileParser();
  var line = fp.parseLine(this.FIXTURE_ARRAY[2]);
  Mojo.assertEqual(line.content, this.FIXTURE_OBJECT[2].content);
  return Mojo.Test.passed;
};

ParserTests.prototype.testDonePriority = function() {
  var fp = new FileParser();
  var line = fp.parseLine(this.FIXTURE_ARRAY[2]);
  Mojo.assertEqual(line.priority, this.FIXTURE_OBJECT[2].priority);
  return Mojo.Test.passed;
};

ParserTests.prototype.testDoneContentNext = function() {
  var fp = new FileParser();
  var line = fp.parseLine(this.FIXTURE_ARRAY[3]);
  Mojo.assertEqual(line.content, this.FIXTURE_OBJECT[3].content);
  return Mojo.Test.passed;
};

ParserTests.prototype.testDonePriorityNext = function() {
  var fp = new FileParser();
  var line = fp.parseLine(this.FIXTURE_ARRAY[3]);
  Mojo.assertEqual(line.priority, this.FIXTURE_OBJECT[3].priority);
  return Mojo.Test.passed;
};

ParserTests.prototype.testLineParsingDoneDoneNext = function() {
  var fp = new FileParser();
  var line = fp.parseLine(this.FIXTURE_ARRAY[3]);
  Mojo.assertEqual(line.done, this.FIXTURE_OBJECT[3].done,'Parses done task and gets the done status');
  return Mojo.Test.passed;
};
