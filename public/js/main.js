//this is used for deleting an event
$(document).ready(function(){
  $('.delete-eve').on('click',function(e){
    $target = $(e.target);
    console.log("main.js " +$target.attr('data-id'))
    const id = $target.attr('data-id');
    let del = confirm("Delete Event?");
    if(del){
      $.ajax({
        type:'Delete',
        url:'/events/'+id,
        success: function(response){
          window.location.href='/';
        },
        error: function(err){
          console.log(err);
        }

      })
    }
    else{
      window.location.href = '/';
    }


  });
  $('.delete-comment').on('click',function(e){
    console.log("deleting event");
    $target = $(e.target);
    const id = $target.attr('data-id');
    const url = $target.attr('data-url');
    let del = confirm("Delete Comment?");
    if(del){
      $.ajax({
        type:'Delete',
        url:'/comments/'+id,
        success: function(response){
          window.location.href='/events/'+url;
        },
        error: function(err){
          console.log(err);
        }
      })
    }
    else{
      window.location.href='/';
    }
  });


  // $('.edit-event').on('click',function(e){
  //   $target = $(e.target);
  //   const id = $target.attr('data-id');
  //   $.ajax({
  //     type:'Get',
  //     url:'/events/add',
  //     success: function(response){
  //       window.location.href='/events/add';
  //     },
  //     error: function(err){
  //       console.log(err);
  //     }
  //   });
  // });
});
