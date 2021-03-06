var GeneratorTests;
GeneratorTests = (function() {
  function GeneratorTests() {
    this.FIXTURE = ['Buy milk for +her', 'fancy pants @work'];
    this.EXPECTED = ['Buy milk for <span class="project">+her</span>', 'fancy pants <span class="context">@work</span>'];
  }
  GeneratorTests.prototype.testPresence = function() {
    Mojo.assertDefined(TaskHtmlGenerator, 'TaskHtmlGenerator is defined');
    return Mojo.Test.passed;
  };
  GeneratorTests.prototype.testContext = function() {
    var gen, str;
    gen = new TaskHtmlGenerator();
    str = gen.getHtml(this.FIXTURE[0]);
    Mojo.assertEqual(str, this.EXPECTED[0]);
    return Mojo.Test.passed;
  };
  GeneratorTests.prototype.testProject = function() {
    var gen, str;
    gen = new TaskHtmlGenerator();
    str = gen.getHtml(this.FIXTURE[1]);
    Mojo.assertEqual(str, this.EXPECTED[1]);
    return Mojo.Test.passed;
  };
  GeneratorTests.prototype.testCombined = function() {
    var gen, str;
    gen = new TaskHtmlGenerator();
    str = gen.getHtml(this.FIXTURE.join(' '));
    Mojo.assertEqual(str, this.EXPECTED.join(' '));
    return Mojo.Test.passed;
  };
  GeneratorTests.prototype.testDouble = function() {
    var exp, gen, str;
    gen = new TaskHtmlGenerator();
    str = gen.getHtml(this.FIXTURE.join(' ') + this.FIXTURE.join(' '));
    exp = this.EXPECTED.join(' ') + this.EXPECTED.join(' ');
    Mojo.assertEqual(str, exp);
    return Mojo.Test.passed;
  };
  return GeneratorTests;
})();