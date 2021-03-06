var NoteService = {
    init: function(){
      $('#addNoteForm').validate({
        submitHandler: function(form) {
          var entity = Object.fromEntries((new FormData(form)).entries());
          NoteService.add(entity);
        }
      });
      NoteService.list();
    },

    list: function(){
      $.get("rest/notes", function(data) {
        $("#note-list").html("");
        var html = "";
        for(let i = 0; i < data.length; i++){
          html += `
          <div class="col-lg-3">
            <div class="card" style="background-color:`+data[i].color+`">
              <img class="card-img-top" src="https://cdn.bootstrapstudio.io/placeholders/1400x800.png" alt="Card image cap">
              <div class="card-body">
              <h5 class="card-title">`+ data[i].first_name +`</h5>
              <p class="card-text">`+ data[i].last_name +`</p>
              <p class="card-text">`+ data[i].country +`</p>
                <div class="btn-group" role="group">
                <button type="button" class="btn btn-primary note-button" onclick="NoteService.get(`+data[i].id+`)">Update</button>
                <button type="button" class="btn btn-danger note-button" onclick="NoteService.delete(`+data[i].id+`)">Delete</button>
                </div>
              </div>
            </div>
          </div>
          `;
        }
        $("#note-list").html(html);
      });
    },

    get: function(id){
      $('.note-button').attr('disabled', true);
      $.get('rest/notes/'+id, function(data){
        $("#first_name").val(data.first_name);
        $("#id").val(data.id);
        $("#country").val(data.country);
        $("#exampleModal").modal("show");
        $('.flight-button').attr('disabled', false);
      })
    },

    add: function(note){
      $.ajax({
        url: 'rest/notes',
        type: 'POST',
        data: JSON.stringify(note),
        contentType: "application/json",
        dataType: "json",
        success: function(result) {
            $("#note-list").html('<div class="spinner-border" role="status"> <span class="sr-only"></span>  </div>');
            NoteService.list(); // perf optimization
            $("#addNoteModal").modal("hide");
        }
      });
    },

    update: function(){
      $('.save-note-button').attr('disabled', true);
      var flight = {};

      flight.first_name = $('#first_name').val();
      flight.country = $('#country').val();

      $.ajax({
        url: 'rest/notes/'+$('#id').val(),
        type: 'PUT',
        data: JSON.stringify(todo),
        contentType: "application/json",
        dataType: "json",
        success: function(result) {
            $("#exampleModal").modal("hide");
            $('.save-note-button').attr('disabled', false);
            $("#note-list").html('<div class="spinner-border" role="status"> <span class="sr-only"></span>  </div>');
            DesignService.list(); // perf optimization
        }
      });
    },

    delete: function(id){
      $('.note-button').attr('disabled', true);
      $.ajax({
        url: 'rest/notes/'+id,
        type: 'DELETE',
        success: function(result) {
            $("#note-list").html('<div class="spinner-border" role="status"> <span class="sr-only"></span>  </div>');
            NoteService.list();
        }
      });
    },

    choose_color: function(color){
      $('#addNoteForm input[name="color"]').val(color);
    }
}
