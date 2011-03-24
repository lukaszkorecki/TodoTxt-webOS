function ParserTests(){}

ParserTests.prototype.testPresence = function() {
  Mojo.requireEqual((typeof FileParser), 'function', 'FileParser class is defined');
  return Mojo.Test.passed;
};
