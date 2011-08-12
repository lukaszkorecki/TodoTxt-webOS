class GeneratorTests
  constructor : ->
    @FIXTURE = [ 'Buy milk for +her', 'fancy pants @work' ]
    @EXPECTED = [ 'Buy milk for <span class="project">+her</span>','fancy pants <span class="context">@work</span>' ]
  testPresence : ->
    Mojo.assertDefined(TaskHtmlGenerator, 'TaskHtmlGenerator is defined')
    Mojo.Test.passed

  testContext : ->
    gen = new TaskHtmlGenerator()

    str = gen.getHtml(@FIXTURE[0])
    Mojo.assertEqual(str, @EXPECTED[0])
    Mojo.Test.passed

  testProject : ->
    gen = new TaskHtmlGenerator()

    str = gen.getHtml(@FIXTURE[1])
    Mojo.assertEqual(str, @EXPECTED[1])
    Mojo.Test.passed

  testCombined : ->
    gen = new TaskHtmlGenerator()

    str = gen.getHtml(@FIXTURE.join(' '))
    Mojo.assertEqual(str, @EXPECTED.join(' '))
    Mojo.Test.passed

  testDouble : ->
    gen = new TaskHtmlGenerator()
    str = gen.getHtml(@FIXTURE.join(' ')+@FIXTURE.join(' '))
    exp = @EXPECTED.join(' ')+@EXPECTED.join(' ')
    Mojo.assertEqual(str, exp)
    Mojo.Test.passed
