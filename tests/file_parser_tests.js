function ParserTests(){
  this.FIXTURE_FILE = "(A) 2011-03-02 Buy milk for +her\n(C) check domains\nx (E) fancy pants @work";
  this.FIXTURE_ARRAY = ["(A) 2011-03-02 Buy milk for +her","(C) check domains","x (E) fancy pants @work"];
  this.FIXTURE_OBJECT = [
      {
        priority : 'A',
        content : 'Buy milk for +her',
        createdAt : '2011-03-02',
        done : false
      },
      {
        priority : 'C',
        content : 'check domains',
        done : false
      },
      {
        priority : 'E',
        content : 'fancy pants @work',
        done : true
      }
    ];
}

ParserTests.prototype.testPresence = function() {
  Mojo.requireEqual((typeof FileParser), 'function', 'FileParser class is defined');
  return Mojo.Test.passed;
};

ParserTests.prototype.testContentloading = function() {
  var fp = new FileParser();
  fp.load(this.FIXTURE_FILE);

  Mojo.requireEqual(fp.content[0], this.FIXTURE_ARRAY[0], 'Loads content and splits it into an array');
  return Mojo.Test.passed;
};

ParserTests.prototype.testLineParsingPriority = function() {
  var fp = new FileParser();
  var line = fp.parseLine(this.FIXTURE_ARRAY[0]);
  Mojo.requireEqual(line.priority, this.FIXTURE_OBJECT[0].priority ,'Parses done task and gets the priority');
  return Mojo.Test.passed;
};
ParserTests.prototype.testLineParsingContent = function() {
  var fp = new FileParser();
  var line = fp.parseLine(this.FIXTURE_ARRAY[0]);
  Mojo.requireEqual(line.content, this.FIXTURE_OBJECT[0].content ,'Parses done task and gets the content');
  return Mojo.Test.passed;
};

ParserTests.prototype.testLineParsingDone = function() {
  var fp = new FileParser();
  var line = fp.parseLine(this.FIXTURE_ARRAY[0]);
  Mojo.requireEqual(line.done, this.FIXTURE_OBJECT[0].done,'Parses done task and gets the done status');
  return Mojo.Test.passed;
};
