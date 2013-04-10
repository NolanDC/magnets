<?php
  include 'databaseConnection.php';

  print_r($_GET);
  $x = $_GET["x"];
  $y = $_GET["y"];
  $id = $_GET["id"];

  $update_query = "UPDATE magnets SET x='%s', y='%s' WHERE id='%s'";
  $sanitized_update_query = sprintf($update_query, $x, $y, $id);
  mysql_query($sanitized_update_query);


?>