alert(1);
// this is used for deleting an event
// $(document).ready(function(){
//   $('.delete-eve').on('click',function(e){
//     $target = $(e.target);
//     console.log("main.js " +$target.attr('data-id'))
//     const id = $target.attr('data-id');
//       $.ajax({
//         type:'Delete',
//         url:'/events/'+id,
//         success: function(response){
//           window.location.href='/';
//         },
//         error: function(err){
//           console.log(err);
//         }
//
//     })
//
//   });
//   $('.delete-comment').on('click',function(e){
//     console.log("deleting event");
//     $target = $(e.target);
//     const id = $target.attr('data-id');
//       $.ajax({
//         type:'Delete',
//         url:'/comments/'+id,
//         success: function(response){
//           alert('Deleting Comment');
//           window.location.href='/';
//         },
//         error: function(err){
//           console.log(err);
//         }
//
//       })
//
//   });
//   $('.edit-event').on('click',function(e){
//     $target = $(e.target);
//     const id = $target.attr('data-id');
//     $.ajax({
//       type:'Get',
//       url:'/events/add',
//       success: function(response){
//         alert('Event already exists');
//         window.location.href='/events/add';
//       },
//       error: function(err){
//         console.log(err);
// });
