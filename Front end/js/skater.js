$(function(){
  
  $('#register').click(function() {
    $('#skatercontact').fadeIn(1800);
  })
  $(document).mouseup(function (e) {
    var newcontainer = $("#skatercontact");
    
    // if the target of the click isn't the container...
    // ... nor a descendant of the container
    if (!newcontainer.is(e.target) && newcontainer.has(e.target).length === 0)  // ... nor a descendant of the container
    {
        newcontainer.fadeOut(1000);
    }
  });
   
  $('#close').click(function() {
    
   var newcontainer = $("#skatercontact");
    {
        newcontainer.fadeOut(1000);
    }
  })
});