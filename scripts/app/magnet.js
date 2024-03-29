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
  return $('<div class="magnet">' + this.options.text + '</div>').attr('id', this.options.id).data('magnet', this);
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

  if(!this.ownedByUser() && this.stillLocked()) {
    this.lock();
  }
}

Magnet.prototype.ownedByUser = function() {
  return (this.options.locked_by == controller.getClientId);
}

Magnet.prototype.stillLocked = function() {
  var time_since_lock = lib.timeDifference(new Date(), new Date(this.options.locked_at));
  return (time_since_lock < 30);
}

Magnet.prototype.match = function(text) {
  if(this.options.text.search(text) >= 0) {
    return true;
  }
  return false;
}