<?php

include 'databaseConnection.php';

class Magnet {
  
  public static function create($text, $x, $y) {
    $insert_query = "INSERT into magnets(text, x, y) values('%s', %s, %s);";
    $query_string = sprintf($insert_query, $text, $x, $y);
    return mysql_query($query_string);
  }

  public static function deleteAll() {
    return mysql_query("DELETE FROM magnets WHERE 1;");
  }

  public static function getAll() {
    $get_magnets_query = "select * from magnets";
    $results = mysql_query($get_magnets_query);

    $magnets = array();
    while($row = mysql_fetch_assoc($results)) {
        $magnets[] = $row;
    }
    return $magnets;
  }

  public static function update($data, $user_id) {
    $x = mysql_real_escape_string($data["x"]);
    $y = mysql_real_escape_string($data["y"]);
    $id = mysql_real_escape_string($data["id"]);
    $locked_by = $user_id;
    $update_query = "UPDATE magnets SET x='%s', y='%s', locked_by='%d', locked_at=NOW() WHERE id='%s';";
    $sanitized_query = sprintf($update_query, $x, $y, $locked_by, $id);
    return mysql_query($sanitized_query);
  }

  public static function get($id) {
    $id = mysql_real_escape_string($id);
    $select_query = "SELECT * FROM magnets WHERE id=%s;";
    $sanitized_query = sprintf($select_query, $id);
    echo('query: ' . $sanitized_query);

    $results = mysql_query($sanitized_query);
    $magnets = array();
    while($row = mysql_fetch_assoc($results)) {
        $magnets[] = $row;
    }
    return $magnets;
  }

}

?>