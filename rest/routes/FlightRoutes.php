<?php
// CRUD operations

/**
* List all
*/
Flight::route('GET /flights', function(){
  Flight::json(Flight::flightService()->get_all());
});

/**
* List invidiual
*/
Flight::route('GET /flights/@id', function($id){
  Flight::json(Flight::flightService()->get_by_id($id));
});

/**
* add
*/
Flight::route('POST /flights', function(){
  Flight::json(Flight::flightService()->add(Flight::request()->data->getData()));
});

/**
* update
*/
Flight::route('PUT /flights/@id', function($id){
  $data = Flight::request()->data->getData();
  Flight::json(Flight::flightService()->update($id, $data));
});

/**
* delete
*/
Flight::route('DELETE /flights/@id', function($id){
  Flight::flightService()->delete($id);
  Flight::json(["message" => "deleted"]);
});

?>
