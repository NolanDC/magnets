view = {
  magnets: {

    finishDrop: function() {
      var magnet = $(this).data('magnet');
      magnet.options.x = parseInt($(this).css('left'));
      magnet.options.y = parseInt($(this).css('top'));
      magnet.save();
    },

    html: function(magnet) {
      return $('<div id="' + magnet.id + '" class="magnet" style="left:' + magnet.x + 'px; top:' + magnet.y + 'px;">' + magnet.text + '</div>');
    }
  }
}