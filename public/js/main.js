$(document).ready(function(){
  $('.delete-eve').on('click',function(e){
    target = $(e.target);
    console.log(target.attr('data-id'));
  });
});
