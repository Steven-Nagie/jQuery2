$(document).ready(function(){

  var saveArray =[];
  var localItems;

  if (localStorage.list) {
    saveArray = localStorage.getItem("list");
    console.log(JSON.parse(saveArray));
  }

  saveArray = JSON.parse(saveArray);

  for (var i = 0; i < saveArray.length; i++) {
    $('#newList').append(saveArray[i]);
    console.log(saveArray[i]);
  }


  // Here we create a variable into which we will save the todo-main-container div everytime there is a change. With this, we can pull up someone's todo list even after they close the page.
  var savedList;

  // This series of if statements pushes a tasks id along a line, so that we can move it from new to inProgress to archived to deleted.
  var advanceTask = function(task) {
      var modified = task.innerText.trim();
      for (var i = 0; i < listo.length; i++) {
          if (listo[i].task === modified) {
              if (listo[i].id === 'new') {
                  listo[i].id = 'inProgress';
              } else if (listo[i].id === 'inProgress') {
                  listo[i].id = 'archived';
              } else {
                  listo.splice(i, 1);
              }
              break;
          }
      }
      task.remove();

  };

$('#newTaskForm').hide();

// Array that will be list of to-dos.
  var listo = [];

// Constructor function to create new tasks.
  function Task(task) {
    this.task = task;
    this.id = 'new';
  }

  // Function to 1) create new function 2) add it to the list array
  var addTask = function(task) {
    if(task) {
      task = new Task(task);
      listo.push(task);

      // .val() gets the current value of the first element in a set of matched elements. Because we aren't setting it equal to anything, it seems like we're just running code for no reason.
      $('#newItemInput').val('');

      var taskCode = '<a href="#finish" class="" id="item">' +
      '<li class="list-group-item">' +
      '<h3>' + task.task + '</h3>' +
      '<span class="arrow pull-right">' +
      '<i class="glyphicon glyphicon-arrow-right">' +
      '</span>' +
      '</li>' +
      '</a>';

      // Adds the task to the list
      $('#newList').append(taskCode);

      saveArray.push(taskCode);

      localStorage.setItem("list", JSON.stringify(saveArray));
    }

    // This slides the "new task form" down so that we can give some more space to the to-do list itself
    $('#newTaskForm').slideToggle('fast', 'linear');
  };

 // This calls the addTask function whenever we click the button with id saveNewItem
  $('#saveNewItem').on('click', function(e) {
    e.preventDefault();
    var task = $('#newItemInput').val().trim();
    addTask(task);
  });

  // This makes it possible to open up and close down the new task form whenever we want to create a new item or when we have finished messing with it.
  // This opens it
  $('#add-todo').on('click', function() {
    $('#newTaskForm').fadeToggle('fast', 'linear');
  });
  // This closes it
  $('#cancel').on('click', function(e) {
    e.preventDefault();
    $('#newTaskForm').fadeToggle('fast', 'linear');
  });

  // This code first prevents the default action from taking place upon clicking the item. This helps keep us on track. For instance, if we had a link (a tag), and we didn't actually want to follow the link, which is the default action, we would use .preventDefault.
  // By setting the task variable to this, it allows us to push whatever #item we happened to click on into the advanceTask function.
  // We then set the id of this to "inProgress".
  // Finally, we move the item itself.
  $(document).on('click', '#item', function(e) {
    e.preventDefault();
    var task = this;
    advanceTask(task);
    this.id = 'inProgress';
    $('#currentList').append(this.outerHTML);
  });

  // The following function does the same thing as the one above, but moving from inProgress to archived.
  $(document).on('click', '#inProgress', function (e) {
  e.preventDefault();
  var task = this;
  task.id = "archived";
  var changeIcon = task.outerHTML.replace('glyphicon-arrow-right', 'glyphicon-remove');
  advanceTask(task);
  $('#archivedList').append(changeIcon);
  });

  // This final function deletes the task by pushing a task into the advanceTask function without an id tag. Remember that, because of the way we wrote the if-else chain in that function, tasks without an id get deleted.
  $(document).on('click', '#archived', function (e) {
  e.preventDefault();
  var task = this;
  advanceTask(task);
  });

  $('#saveStatus').click(function() {

  });



});
