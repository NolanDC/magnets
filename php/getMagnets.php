<?php
  include('databaseConnection.php');

  $get_magnets_query = "select * from magnets";
  $results = mysql_query($get_magnets_query);

  $magnets = array();
  while($row = mysql_fetch_assoc($results)) {
      $magnets[] = $row;
  }

  echo(json_encode($magnets));

?>