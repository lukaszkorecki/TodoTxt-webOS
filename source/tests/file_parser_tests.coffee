class ParserTests
  constructor : ->
    @FIXTURE_FILE = '(A) 2011-03-02 Buy milk for +her\n(C) check domains\nx (E) fancy pants @ork'
    @FIXTURE_ARRAY = [
       "(A) 2011-03-02 Buy milk for +her"
       "(C) check domains","x (E) fancy pants @ork"
       'x (B) crete first app @ebos'
    ]
    @FIXTURE_OBJECT = [
      { priority : 'A', content : 'Buy milk for +her', createdAt : '2011-03-02', done : false }
      { priority : 'C', content : 'check domains', done : false }
      { priority : 'E', content : 'fancy pants @ork', done : true }
      { priority : 'B', content : 'crete first app @ebos', done : true }
    ]
  testPresence : ->
    Mojo.assertDefined(FileParser, 'FileParser class is defined')
    Mojo.Test.passed

  testContentloading : ->
    fp = new FileParser()
    fp.load(@FIXTURE_FILE)

    Mojo.assertEqual(fp.content[0], @FIXTURE_ARRAY[0], 'Loads content and splits it into an array')
    Mojo.assertEqual(fp.content[2], @FIXTURE_ARRAY[1], 'Loads content and splits it into an array')
    Mojo.assertEqual(fp.content[2], @FIXTURE_ARRAY[2], 'Loads content and splits it into an array')
    Mojo.Test.passed

  testLineParsingPriority : ->
    fp = new FileParser()
    line = fp.parseLine(@FIXTURE_ARRAY[0])
    Mojo.assertEqual(line.priority, @FIXTURE_OBJECT[0].priority ,'Parses done task and gets the priority')
    Mojo.Test.passed

  testLineParsingContent : ->
    fp = new FileParser()
    line = fp.parseLine(@FIXTURE_ARRAY[0])
    Mojo.assertEqual(line.content, @FIXTURE_OBJECT[0].content ,'Parses done task and gets the content')
    Mojo.Test.passed

  testLineParsingDone : ->
    fp = new FileParser()
    line = fp.parseLine(@FIXTURE_ARRAY[0])
    Mojo.assertEqual(line.done, @FIXTURE_OBJECT[0].done,'Parses done task and gets the done status')
    Mojo.Test.passed

  testLineParsingDoneDone : ->
    fp = new FileParser()
    line = fp.parseLine(@FIXTURE_ARRAY[2])
    Mojo.assertEqual(line.done, @FIXTURE_OBJECT[2].done,'Parses done task and gets the done status')
    Mojo.Test.passed


  testLineParsingTwo  : ->
    fp = new FileParser()
    line = fp.parseLine(@FIXTURE_ARRAY[1])
    Mojo.assertEqual(line.done, false)
    Mojo.Test.passed

  testLineParsingNoDate  : ->
    fp = new FileParser()
    line = fp.parseLine(@FIXTURE_ARRAY[1])
    Mojo.assertEqual(line.createdAt, undefined)
    Mojo.Test.passed

  testDoneContent  : ->
    fp = new FileParser()
    line = fp.parseLine(@FIXTURE_ARRAY[2])
    Mojo.assertEqual(line.content, @FIXTURE_OBJECT[2].content)
    Mojo.Test.passed

  testDonePriority : ->
    fp = new FileParser()
    line = fp.parseLine(@FIXTURE_ARRAY[2])
    Mojo.assertEqual(line.priority, @FIXTURE_OBJECT[2].priority)
    Mojo.Test.passed

  testDoneContentNext : ->
    fp = new FileParser()
    line = fp.parseLine(@FIXTURE_ARRAY[3])
    Mojo.assertEqual(line.content, @FIXTURE_OBJECT[3].content)
    Mojo.Test.passed


  testDonePriorityNext : ->
    fp = new FileParser()
    line = fp.parseLine(@FIXTURE_ARRAY[3])
    Mojo.assertEqual(line.priority, @FIXTURE_OBJECT[3].priority)
    Mojo.Test.passed

  testLineParsingDoneDoneNext : ->
    fp = new FileParser()
    line = fp.parseLine(@FIXTURE_ARRAY[3])
    Mojo.assertEqual(line.done, @FIXTURE_OBJECT[3].done,'Parses done task and gets the done status')
    Mojo.Test.passed

