controller = {
  init: function() {
    controller.conn = new WebSocket('ws://localhost:8080');

    controller.conn.onopen = function(e) {
      console.log("Connection established!");
    };

    controller.conn.onmessage = function(e) {
      var json = JSON.parse(e.data);
      console.log('receiving message', json.message, 'from server');
      controller[json.message](json.data);
    };
  },

  updateMagnets: function(magnets) {
    $(document).trigger('updatemagnets', new Array(magnets));
  },

  saveMagnet: function(magnet) {
    controller.conn.send('hi beotch');
    controller.conn.send(JSON.stringify({
      message: 'updatemagnet',
      data: magnet.json()
    }))
  }
}

controller.init();