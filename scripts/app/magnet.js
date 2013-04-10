function Magnet(id, text, x, y) {
  this.id = id;
  this.text = text;
  this.x = x;
  this.y = y;
  this.el = this.html();
} 

/*  
  this.save = function(cb) {
    controller.magnets.update(this, cb);
  }

  this.toQueryString = function() {
    return Queryables.compose({
      x: this.x,
      y: this.y,
      text: this.text,
      id: this.id
    })
  }
*/

Magnet.prototype.save = function() {
  controller.saveMagnet(this);
}

Magnet.prototype.html = function() {
  return $('<div class="magnet">' + this.text + '</div>').css({
    left: this.x + 'px',
    top: this.y + 'px'
  }).attr('id', this.id).data('magnet', this);
}

Magnet.prototype.json = function() {
  return {
    id: this.id,
    x: this.x,
    y: this.y,
    text: this.text
  }
}