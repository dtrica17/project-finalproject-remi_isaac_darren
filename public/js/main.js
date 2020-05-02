
// this is used for deleting an event
$(document).ready(function(){
  $('.delete-eve').on('click',function(e){
    $target = $(e.target);
    const id = $target.attr('data-id');
    $.ajax({
      type:'Delete',
      url:'/events/'+id,
      success: function(response){
        alert('Deleting Event');
        window.location.href='/';
      },
      error: function(err){
        console.log(err);
      }

    })
  });
  $('.delete-comment').on('click',function(e){
    $target = $(e.target);
    const id = $target.attr('data-id');
    $.ajax({
      type:'Delete',
      url:'/comments/'+id,
      success: function(response){
        alert('Deleting Comment');
        window.location.href='/';
      },
      error: function(err){
        console.log(err);
      }

    })
  });
  $('.edit-event').on('click',function(e){
    $target = $(e.target);
    const id = $target.attr('data-id');
    $.ajax({
      type:'Get',
      url:'/events/add',
      success: function(response){
        alert('Event already exists');
        window.location.href='/events/add';
      },
      error: function(err){
        console.log(err);
});
