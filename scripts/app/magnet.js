function Magnet(options) {
  var defaults = {
    x: 0,
    y: 0
  };
  this.options = $.extend(defaults, options);
  this.el = this.html();
} 

Magnet.prototype.save = function() {
  controller.saveMagnet(this);
}

Magnet.prototype.html = function() {
  return $('<div class="magnet">' + this.options.text + '</div>').css({
    left: this.options.x + 'px',
    top: this.options.y + 'px'
  }).attr('id', this.options.id).data('magnet', this);
}

Magnet.prototype.json = function() {
  return this.options;
}

Magnet.prototype.update = function(data) {
  this.options = $.extend(this.options, data);
  console.log('data:', data);
  console.log('options data:', this.options);
  this.el.css({
    left: this.options.x + 'px', 
    top: this.options.y + 'px'
  });  
}