<?php



require __DIR__ . '/vendor/autoload.php';
use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;
use Ratchet\Server\IoServer;
use Ratchet\WebSocket\WsServer;
include('databaseConnection.php');
include('magnets.php');
/**
 * chat.php
 * Send any incoming messages to all connected clients (except sender)
 */
class MagnetServer implements MessageComponentInterface {
  protected $clients;

  public function __construct() {
    $this->clients = new \SplObjectStorage;
  }

  public function onOpen(ConnectionInterface $conn) {
    $this->clients->attach($conn);
    $data = array('message' => 'updateMagnets', 'data' => Magnet::getAll());
    $conn->send(json_encode($data));
  }

  public function onMessage(ConnectionInterface $from, $msg) {
    $data = json_decode($msg, true);
    //var_dump($data);
    if($data["message"] == "updatemagnet") {
      Magnet::update($data["data"]);
      //echo("id: " . $data["data"]["id"]);
      echo("receiving message from server");
      foreach ($this->clients as $client) {
        echo("listing clients" . "\n");
        if ($from !== $client) {
          echo("not the self" . "\n");
          $data = array('message' => 'updateMagnets', 'data' => Magnet::getAll());
          $client->send(json_encode($data));
          echo("data: " . $data);
                  // The sender is not the receiver, send to each client connected

/*          $get_magnets_query = "select * from magnets";
          $results = mysql_query($get_magnets_query);
          $magnets = array();
          while($row = mysql_fetch_assoc($results)) {
            $magnets[] = $row;
          }
          $client->send(json_encode($magnets));*/

        }
      }      
    }
    

/*   
  $numRecv = count($this->clients) - 1;
   echo sprintf('Connection %d sending message "%s" to %d other connection%s' . "\n"
    , $from->resourceId, $msg, $numRecv, $numRecv == 1 ? '' : 's');
*/

  }

  public function onClose(ConnectionInterface $conn) {
    $this->clients->detach($conn);
  }

  public function onError(ConnectionInterface $conn, \Exception $e) {
    $conn->close();
  }
}

    // Run the server application through the WebSocket protocol on port 8080
$server = IoServer::factory(new WsServer(new MagnetServer), 8080);
$server->run();