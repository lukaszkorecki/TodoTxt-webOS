class Tasks
  constructor : ->
    @file_parser = new FileParser()
    @html_gen = new TaskHtmlGenerator()
    @items = []
    @db = new Lawnchair( ->)

  load : (callback)->
    @db.nuke()
    [
      "(A) 2011-03-05 Do more research about Barcelona +holiday"
      "x 2011-03-12 2011-03-11 Clean up the fridge @chore"
      "(C) 2011-03-26 Write the test code @home"
      "x 2011-03-05 Move view code to Web Workers +mikrob"
      "(D) 2011-03-06 2011-03-06 Make spaghetti @home +cooking"
      "(B) 2011-03-06 2011-03-06 Make spaghetti @home +cooking"
      "(E) 2011-03-06 2011-03-06 Make spaghetti @home +cooking"
      "x 2011-03-18 2011-03-06 Check bus ticket expiration date @home +chore"
      'take a look at me now'
    ].forEach (el, index) => @add el

    @db.all (data) =>
      _data = data.map (item) => item.task.content
      @items = _data
      callback _data

  getAll : (newContent) ->
    _data = @file_parser.load(newContent).content

    @items = _data.map (element) =>
      obj = @file_parser.parseLine(element)
      obj.raw_content = obj.content
      obj.content = @html_gen.getHtml(obj.content)

      obj

    @sortItems()
    @

  # adds an item to list
  add : ( item, callback) ->
    _item = @file_parser.parseLine(item)
    _item.content = @html_gen.getHtml(_item.content)
    @items.push(_item)
    @db.save { task : _item }, (e) =>
      @sortItems()
      callback(_item) if callback

  update : (id, item, callbacks) ->
    @items[id] = item
    @db.add(@key,@items, (-> callbacks.onSuccess(@items) ), callbacks.onFailure)

  # clears the items
  remove : (callbacks) ->
    @db.discard(@key,  callbacks.onSuccess, callbacks.onFailure)

  # retreive all items
  get : (callbacks) ->
    @db.get(@key,  callbacks.onSuccess, callbacks.onFailure)

  sortItems : ->
    @items = @items.filter (val) -> val != undefined
    @items = @items.sort (a,b) -> a.priorityNum - b.priorityNum
    @
