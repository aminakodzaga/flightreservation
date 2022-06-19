<?php
// CRUD operations

/**
* List all
*/
Flight::route('GET /tableone', function(){
  Flight::json(Flight::flightService()->get_all());
});

/**
* List invidiual
*/
Flight::route('GET /tableone/@id', function($id){
  Flight::json(Flight::flightService()->get_by_id($id));
});

/**
* add
*/
Flight::route('POST /tableone', function(){
  Flight::json(Flight::flightService()->add(Flight::request()->data->getData()));
});

/**
* update
*/
Flight::route('PUT /tableone/@id', function($id){
  $data = Flight::request()->data->getData();
  Flight::json(Flight::flightService()->update($id, $data));
});

/**
* delete
*/
Flight::route('DELETE /tableone/@id', function($id){
  Flight::flightService()->delete($id);
  Flight::json(["message" => "deleted"]);
});

?>
