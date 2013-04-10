view = {
  magnets: {
    init: function() {
    },

    addToFridge: function() {
      for(var i = 0; i < model.magnets.collection.length; i++) {
        var magnet = model.magnets.collection[i];
        $('#fridge').append(magnet.el)
      }
      $('.magnet').draggable({
        stop: view.magnets.finishDrop
      });
    },

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