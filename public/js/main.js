
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
      url:'/comment/'+id,
      success: function(response){
        alert('Deleting Comment');
        window.location.href='/';
      },
      error: function(err){
        console.log(err);
      }

    })
  });
});
