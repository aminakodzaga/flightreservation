<?php
require_once __DIR__.'/BaseService.class.php';
require_once __DIR__.'/../dao/FlightDao.class.php';

class FlightService extends BaseService{

  public function __construct(){
    parent::__construct(new FlightDao());
  }

  public function get_flights_by_note_id($note_id){
    return $this->dao->get_flights_by_note_id($note_id);
  }
}
?>
