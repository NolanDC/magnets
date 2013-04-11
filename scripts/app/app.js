$(function() {

  window.size = {
    width: window.innerWidth || document.body.clientWidth,
    height: window.innerHeight || document.body.clientHeight
  }

  $('#fridge').css('height', size.height);

  //view.magnets.init();
  $('#fridge').fridge();

  $('#search input').on('keyup', function() {
    $(document).trigger('searchmagnets', $(this).val());
  })

  Mousetrap.bind('s', function(e) { $('#search input').focus().select(); e.preventDefault(); });

})