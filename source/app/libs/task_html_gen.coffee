class TaskHtmlGenerator
  constructor : ->
    @contextRegex = /\@\w{2,}/gi
    @projectRegex = /\+\w{2,}/gi

    @contextHtml = (context) -> "<span class=\"contex\">#{context}</span>"

    @projectHtml = (project) -> "<span class=\"project\">#{project}</span>"

  getHtml : (content) ->
    content.replace(@contextRegex, @contextHtml).replace(@projectRegex, @projectHtml)
