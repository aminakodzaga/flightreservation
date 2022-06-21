<?php
require_once __DIR__.'/BaseDao.class.php';

class FlightDao extends BaseDao{
  /**
  * constructor of dao class
  */
  public function __construct(){
    parent::__construct("flights");
  }

  public function get_flights_by_note_id($note_id){
    return $this->query("SELECT * FROM flights WHERE note_id = :note_id", ['note_id' => $note_id]);
  }
}

?>
