$(function() {

  window.size = {
    width: window.innerWidth || document.body.clientWidth,
    height: window.innerHeight || document.body.clientHeight
  }

  $('#fridge').css('height', size.height);

  //view.magnets.init();
  $('#fridge').fridge();
})