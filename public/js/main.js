
// this is used for deleting an item
$(document).ready(function(){
  $('.delete-eve').on('click',function(e){
    $target = $(e.target);
    const id = $target.attr('data-id');
    $.ajax({
      type:'Delete',
      url:'/event/'+id,
      success: function(response){
        alert('Deleting Event');
        window.location.href='/';
      },
      error: function(err){
        console.log(err);
      }

    })
  });
});
