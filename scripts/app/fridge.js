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
    window.mags = this.magnets;
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
  window.maggies = this.magnets;
  this.element.append(magnet.el);

  magnet.el.draggable({
    stop: view.magnets.finishDrop
  });
}

$.widget("custom.fridge", {
  options: {},
  _create: function () {
    this.fridge = new Fridge(this.element);
    var self = this;

    $(document).on('updatemagnets', function (e, json_magnets) {
      self.fridge.updateMagnets(json_magnets);
    });
  }
});