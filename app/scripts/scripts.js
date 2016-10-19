$(document).ready(function(){
$('#newTaskForm').hide();

  var listo = [];

  function Task(task) {
    this.task = task;
    this.id = 'new';
  }

  var addTask = function(task) {
    if(task) {
      task = new Task(task);
      listo.push(task);

      $('#newItemInput').val('');
      $('#newList').append(
        '<a href="#finish" class="" id="item">' +
        '<li class="list-group-item">' +
        '<h3>' + task.task + '</h3>' +
        '<span class="arrow pull-right">' +
        '<i class="glyphicon glyphicon-arrow-right">' +
        '</span>' +
        '</li>' +
        '</a>'
      );
    }
  };




});
