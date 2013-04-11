var Fridge = function(element, options) {
  var defaults = {
  };
  this.options = $.extend(defaults, options);
  this.element = element;
  this.magnets = {};
}

Fridge.prototype.updateMagnets = function(json_magnets) {
  for(var i = 0; i < json_magnets.length; i++) {
    var json_magnet = json_magnets[i];
    var magnet = this.magnets[json_magnet.id];
    if(magnet) {
      magnet.update(json_magnet);
    } else {
      this.createMagnet(json_magnet);
    }

  }
}

Fridge.prototype.createMagnet = function(data) {
  magnet = new Magnet(data);
  this.magnets[data.id] = magnet;
  this.element.append(magnet.el);

  magnet.el.draggable({
    stop: view.magnets.finishDrop
  });
}

Fridge.prototype.search = function(text) {
  if(text == "") {
    $('.magnet').removeClass('matched');
    console.log('ok...');
  } else {
    for (var id in this.magnets){
      if (this.magnets.hasOwnProperty(id)) {
        var magnet = this.magnets[id];
        if(magnet.match(text)) {
          magnet.el.addClass('matched');
        } else {
          magnet.el.removeClass('matched');
        }
      }
    }    
  }


}

$.widget("custom.fridge", {
  options: {},
  _create: function () {
    this.fridge = new Fridge(this.element);
    var self = this;

    $(document).on('updatemagnets', function (e, json_magnets) {
      self.fridge.updateMagnets(json_magnets);
    });

    $(document).on('searchmagnets', function(e, text) {
      self.fridge.search(text);
    });
  }
});