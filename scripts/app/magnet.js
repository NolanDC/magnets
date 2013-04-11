function Magnet(options) {
  var defaults = {
    x: 0,
    y: 0
  };
  this.options = $.extend(defaults, options);
  this.el = this.html();
  this.locked = false;
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

Magnet.prototype.lock = function() {
  this.el.addClass('locked').draggable('disable');
  var self = this;

  setTimeout(function() {
    self.unlock();
  }, 10000);
}

Magnet.prototype.unlock = function() {
  this.el.removeClass('locked').draggable('enable');
}

Magnet.prototype.update = function(data) {
  this.options = $.extend(this.options, data);

  this.el.css({
    left: this.options.x + 'px', 
    top: this.options.y + 'px'
  });  

  if(data.locked_by != controller.getClientId) {
    this.lock();
  }
}

Magnet.prototype.match = function(text) {
  console.log(this.options.text)
  console.log(text);
  if(this.options.text.search(text) >= 0) {
    return true;
    console.log('true');
  }
  return false;
}