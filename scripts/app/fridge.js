var Fridge = function(element, options) {
  var defaults = {
  };
  this.element = element;
  this.options = $.extend(defaults, options);
  this.magnets = {};
}

Fridge.prototype.updateMagnets = function(json_magnets) {
  for(var i = 0; i < json_magnets.length; i++) {
    var json_magnet = json_magnets[i];
    var magnet = this.magnets[json_magnet.id];

    if(magnet) {
      for(var i = 0; i < json_magnets.length; i++) {
        console.log(i, json_magnets[i]);
        magnet = this.magnets[json_magnets[i].id];
        magnet.el.css({
          left: json_magnets[i].x + 'px', 
          top: json_magnets[i].y + 'px'
        });
      }

      
    } else {
      magnet = new Magnet(json_magnet.id, json_magnet.text, json_magnet.x, json_magnet.y);
      this.magnets[json_magnet.id] = magnet;
      this.element.append(magnet.el);

      magnet.el.draggable({
        stop: view.magnets.finishDrop
      });
    }

  }
}

$.widget("custom.fridge", {
  options: {},
  _create: function () {
    this.fridge = new Fridge(this.element);
    console.log(this.element);
    var self = this;
    // make contents of a new cell into an image cell
    $(document).on('updatemagnets', function (e, json_magnets) {
      self.fridge.updateMagnets(json_magnets);
    });
  }
});