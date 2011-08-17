class TasksAssistant
  constructor : ->
    @taskCache = ""
    @tasks = new Tasks()

  setup : ->
    @setupNewTaskForm()
    @addMenu()
    @tasks.load (data)=>
      @data = data
      @addTaskList(data)



  addTaskList : (data) ->
    @data = data.map (el) -> el.content
    @taskListAttributes =
      swipeToDelete: false
      reorderable: false
      itemTemplate: 'tasks/itemTemplate'
      dividerFunction : TasksAssistant::dividerFunction

    @controller.setupWidget('tasksList', @taskListAttributes, @data)

    Mojo.Event.listen( @controller.get('tasksList'), Mojo.Event.listTap, @taskDialog.bind(@))

  addMenu : ->
    # Menu setup
    @menuAttributes =
      spacerHeight: 0
      menuClass: 'no-fade'

    @menuModel =
      visible: true
      items : [
        {
          icon: "new",
          command: "add-task"
        },
        {
          label : "todo.txt"
        },
        {
          icon : "sync",
          command : 'refresh-tasks'
        }
      ]
    @controller.setupWidget( Mojo.Menu.viewMenu, @menuAttributes, @menuModel )

  setupNewTaskForm : ->
    @formAttributes = {
      modelProperty: 'open',
      unstyled: true
    }
    @drawerState = { open: false }
    @controller.setupWidget("drawerId",@attributes, @drawerState)

    @formModel = {
      value : '',
      disabled : false
    }
    @controller.setupWidget("taskContent", {
        hintText: $L("Tap to edit"),
        multiline: false,
        enterSubmits: false,
        modelProperty : 'value',
        focus: true
      }, @formModel)

    @controller.setupWidget("saveNewTask",  { }, { label : "Add todo", disabled: false })
    Mojo.Event.listen(@controller.get('saveNewTask'), Mojo.Event.tap, @saveTask.bind(@))

  taskDialog : (event) ->
    message = event.item.raw_content
    task_id = event.index
    fn = @handleTaskActions

    @controller.showAlertDialog(
      onChoose: fn
      title: 'Take action!'
      message: message
      choices:[
        {
          label:'Mark as done'
          value: {
            task : 'done'
            id : task_id
          }
          type:'affirmative'
        },
        {
          label:'Remove'
          value: {
            task : 'remove'
            id : task_id
          }
          type:'negative'
        },
        {
          label:$L("Nevermind")
          value:"cancel"
          type:'dismiss'
        }
      ]
    )
  dividerFunction : (el) ->
    p = el.priority

    p = 'X' if el.done == true
    p = '-' if p == 'none'
    p
  toggleNewTaskForm : ->
    @controller.get('drawerId').mojo.toggleState()

  handleCommand : (event) ->
    if (event.type == Mojo.Event.command)
      switch event.command
        when 'add-task'
          @toggleNewTaskForm()
          break
        when 'refresh-tasks'
          @refreshTasks()
          break
        else
          break

  handleTaskActions : (data) ->
    switch data.task
      when 'remove'
        delete @data.items[data.id]
        break
      when 'done'
        @data.items[data.id].done = true
        @data.items[data.id].priorityNum = 100
        break
      else
        break

    @refreshTasks() if data != 'cancel'

  refreshTasks : (cb)->
    @tasks.load (data) =>
      cb(data) if cb
      Mojo.Log.info('refreshing tasks!')
      @controller.get('tasksList').mojo.invalidateItems(0)
      @controller.get('tasksList').mojo.noticeUpdatedItems(0, @tasks.sortItems().items)


  saveTask : (event) ->
    event.preventDefault()
    @tasks.add @model.value, =>
      @refreshTasks()
      @controller.get('taskContent').value = ""
      @toggleNewTaskForm()
    false
  activate : ->
  deactivate : ->
  cleanup : ->
