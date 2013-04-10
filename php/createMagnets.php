<?php
  include('magnets.php');

  $words = array(
    "of", "and", "cat", "car", "robot", "die", "fast", "tongue", "speak", "ing", "ing", "ly", "ly", "s", "s", "dark",
    "day", "night", "all", "mom", "dad", "man", "woman", "quick", "sloven", "ugly", "brazen"
  );

  Magnet::deleteAll();

  for($i = 0; $i < count($words); $i++) {
    Magnet::create(
      $words[$i], 
      50 * $i + 20, 
      10
    );
  }

?>