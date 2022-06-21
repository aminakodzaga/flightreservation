var FlightService = {

  add: function(design){
    $.ajax({
      url: 'rest/flights',
      type: 'POST',
      data: JSON.stringify(design),
      contentType: "application/json",
      dataType: "json",
      success: function(result) {
        // append to the list
        $("#notes-todos").append(`<div class="list-group-item note-todo-`+result.id+`">
          <button class="btn btn-danger btn-sm float-end" onclick=">FlightService.delete(`+result.id+`)">delete</button>
          <p class="list-group-item-text">`+result.description+`</p>
        </div>`);
        toastr.success("Added !");
      }
    });
  },

  list_by_note_id: function(note_id){
    $("#notes-flights").html('loading ...');
    $.get("rest/notes/"+note_id+"/flights", function(data) {
      var html = "";
      for(let i = 0; i < data.length; i++){
        html += `<div class="list-group-item note-flight-`+data[i].id+`">
        <div>
          <button class="btn btn-danger btn-sm float-end" onclick="FlightService.delete(`+data[i].id+`)">delete</button>
          <p class="list-group-item-text">`+data[i].description+`</p>
        </div>
        </div>`;
      }
      $("#notes-flights").html(html);
    });

    // note id populate and form validation
    $('#add-flight-form input[name="note_id"]').val(note_id);
    $('#add-flight-form input[name="created"]').val(FlightService.current_date());

    $('#add-flight-form').validate({
      submitHandler: function(form) {
        var entity = Object.fromEntries((new FormData(form)).entries());
        FlightService.add(entity);
        $('#add-flight-form input[name="description"]').val("");
        toastr.info("Adding ...");
      }
    });
    $("#flightModal").modal('show');
  },

  delete: function(id){
    var old_html = $("#notes-flights").html();
    $('.note--'+id)flights.remove();
    toastr.info("Deleting in background ...");
    $.ajax({
      url: 'rest/flights/'+id,
      type: 'DELETE',
      success: function(result) {
        toastr.success("Deleted !");
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        toastr.error(XMLHttpRequest.responseJSON.message);
        $("#notes-designs").html(old_html);
        //alert("Status: " + textStatus); alert("Error: " + errorThrown);
      }
    });
  },

  current_date: function(){
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    return yyyy+"-"+mm+"-"+dd;
  }

}
