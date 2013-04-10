<?php
  $link = mysql_connect('127.0.0.1', 'refrigerator', 'fridge09magnets');
  $db_name = "magnets";
  if (!mysql_select_db($db_name, $link)){
    echo ("hi");
    die ("Could not select database");
  }
?>