class TasksAssistant
  constructor : ->
    @taskCache = ""
    @tasks = new Tasks(
      onSuccess : ->  Mojo.Log.info('we got a db!')
      onFailure : ->Mojo.Log.error('we dont got a db! FIAL')
    )

    @FIXTURE = "(A) 2011-03-05 Do more research about Barcelona +holiday\n"
    @FIXTURE += "x 2011-03-12 2011-03-11 Clean up the fridge @chore\n"
    @FIXTURE += "(C) 2011-03-26 Write the test code @home\n"
    @FIXTURE += "x 2011-03-05 Move view code to Web Workers +mikrob\n"
    @FIXTURE += "(D) 2011-03-06 2011-03-06 Make spaghetti @home +cooking\n"
    @FIXTURE += "(B) 2011-03-06 2011-03-06 Make spaghetti @home +cooking\n"
    @FIXTURE += "(E) 2011-03-06 2011-03-06 Make spaghetti @home +cooking\n"
    @FIXTURE += "x 2011-03-18 2011-03-06 Check bus ticket expiration date @home +chore\n"
    @FIXTURE += 'take a look at me now'

  setup : ->
    @addMenu()
    @setupNewTaskForm()

    @data = @tasks.getAll(@FIXTURE)

    attributes = {
      swipeToDelete: false,
      reorderable: false,
      itemTemplate: 'tasks/itemTemplate',
      dividerFunction : @dividerFunction
    }

    @controller.setupWidget('tasksList', attributes, @data)

    Mojo.Event.listen(
      @controller.get('tasksList'),
      Mojo.Event.listTap, @taskDialog.bind(@)
    )

  addMenu : ->
    # Menu setup
    @attributes =
      spacerHeight: 0
      menuClass: 'no-fade'

    @model =
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
    @controller.setupWidget( Mojo.Menu.viewMenu, @attributes, @model )

  setupNewTaskForm : ->
    @attributes = {
      modelProperty: 'open',
      unstyled: true
    }
    @drawerState = { open: false }
    @controller.setupWidget("drawerId",@attributes, @drawerState)

    @model = {
      value : '',
      disabled : false
    }
    @controller.setupWidget("taskContent", {
        hintText: $L("Tap to edit"),
        multiline: false,
        enterSubmits: false,
        modelProperty : 'value',
        focus: true
      }, @model)

    @controller.setupWidget("saveNewTask",  { }, { label : "Add todo", disabled: false })
    Mojo.Event.listen(this.controller.get('saveNewTask'), Mojo.Event.tap, this.saveTask.bind(@))

  taskDialog : (event) ->
    message = event.item.raw_content
    task_id = event.index;
    fn = @handleTaskActions;

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

  refreshTasks : ->
    Mojo.Log.info('refreshing tasks!')
    @controller.get('tasksList').mojo.invalidateItems(0)
    @controller.get('tasksList').mojo.noticeUpdatedItems(0, @tasks.sortItems().items)

  saveTask : (event) ->
    event.preventDefault()
    @tasks.add(this.model.value)
    @refreshTasks()
    @controller.get('taskContent').value = ""
    @toggleNewTaskForm()
    false
  activate : ->
  deactivate : ->
  cleanup : ->
