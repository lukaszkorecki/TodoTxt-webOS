class FileParser
  constructor : ->
    @lineSeparator = "\n"

    @priorityRegex = /^\(\w\)/i
    @doneRegex = /^x\ /i
    @dateRegex = /\d{4}-\d{2}-\d{2}/
    @priorityNumMapping = {
      A : 1,
      B: 2,
      C : 3,
      D : 4,
      E : 5,
      'none' : 9,
      'done' : 100,
      x : 101
    }

  load : (fileContent) ->
    @content = (fileContent || "").split(@lineSeparator)
    @

  parseLine : (line) ->
    isDone = !!(line.match(@doneRegex))
    content = line.replace(@doneRegex,'')

    priority = if line.match(@priorityRegex) == null
                'none'
              else
                line.match(/\w/i)[0]

    content = content.replace(@priorityRegex, '')

    createdAt = if line.match(@dateRegex) == null
                  false
                else
                  line.match(@dateRegex)[0]

    content = content.replace(@dateRegex,'')

    priorityNum = @priorityNumMapping[priority]
    priorityNum = @priorityNumMapping.done if isDone
    # legacy
    priority = '' if(priorityNum == 9)

    obj = {
      content : content.trim(),
      done : isDone ,
      priorityNum : priorityNum
    }

    obj.priority = priority if priorityNum < 100

    obj.createdAt = createdAt if createdAt

    obj
