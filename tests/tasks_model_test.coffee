class TasksTest
  constructor : ->
    @FIXTURE = ''
    @FIXTURE += "(A) 2011-03-05 Do more research about Barcelona +holiday\n"
    @FIXTURE += "(C) 2011-03-26 Write the test code @home\n"
    @FIXTURE += "(D) 2011-03-06 2011-03-06 Make spaghetti @home +cooking\n"
    @FIXTURE += 'a test\n'
    @FIXTURE += "x 2011-03-05 Move view code to Web Workers +mikrob"
    @HTML = []
    @HTML.push 'Do more research about Barcelona <span class="project">+holiday</span>'

  testPresence : ->
    Mojo.requireDefined(Tasks)
    Mojo.Test.passed

  testGetAll : ->
    res = (new Tasks).getAll(@FIXTURE).items

    Mojo.requireEqual('A',res[0].priority)
    Mojo.requireEqual(@HTML[0], res[0].content)
    Mojo.Test.passed

  testAdd : ->
    t = new Tasks()
    t.getAll(@FIXTURE)
    t.add('(A) TEST',{})

    rec = t.items[1]

    Mojo.requireEqual('TEST', rec.content)
    Mojo.Test.passed
  testAddDone : ->
    t = new Tasks()
    t.getAll(@FIXTURE)

    t.add('x (B) TEST',{})

    rec = t.items[5]

    Mojo.requireEqual('TEST', rec.content)
    Mojo.Test.passed

  testAddNoPriority : ->
    t = new Tasks()
    t.getAll(this.FIXTURE)
    t.add('2001-09-11 TEST',{})

    rec = t.items[4]

    Mojo.requireEqual('TEST', rec.content)
    Mojo.Test.passed
