class Tasks
  constructor : ->

    @file_parser = new FileParser()
    @html_gen = new TaskHtmlGenerator()
    @items = []
    @db = new Lawnchair( ->)

  load : (callback)->
    @items = @db.all (data) ->
      _data = data.map (item) -> @html_gen.getHtml item.task.content
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
      console.dir(e)
      @sortItems()
      callback()

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
