(function (window, $) {

function submitNote() {
    var noteAuthor = $('textarea[name="formAuthor"]').val();
		var noteLocation = $('textarea[name="formLocation"]').val();
		var noteText = $('textarea[name="formText"]').val();
    
		$.ajax({
			type: "GET",
			url: "http://geonotes.nfshost.com/add_note.php", //need to find DB url
			data: {
				device_id: 1, // PhoneGap API method: device.uuid
				author: noteAuthor,
				location: noteLocation,
				note: noteText
			}
		}).done(function() {
			//clear form
			//refresh list
			refreshList();
		});
    
}

function refreshList() {
  $.ajax({
    type: "GET",
    dataType: 'json',
    url: "http://geonotes.nfshost.com/list.php" //need to find DB url
  }).done(function( notes ) {
    var numNotes = notes.length;
    for (var i=0; i < numNotes; i++)
      {
        if ($('.note-' + note.id).length > 0)
          {
            // Add each note to the page
            var note = notes[i];
            var $location = $('<div class="noteLocationDescription"></div>').text(note.location_description);
            var $latlong = $('<div class="latlong"></div>').text(note.gps);
            var $author = $('<div class="noteAuthor"></div>').text(note.user_name);
            var $text = $('<div class="noteText"></div>').text(note.note_text);
            var $note = $('<div class="userNote"></div>')
              .addClass('note-' + note.id)
              .append($location, $latlong, $author, $text);
            $('.notes').append($note);
          }
      }
  });
}

$(document).ready(function() {

  refreshList();

	$('#note-submit').click(function() {
    submitNote();
		return false; //make sure this turns off the default form behavior!
	});
	
	$('#list-refresh').click(function() {
		refreshList();
	});

});

})(window, jQuery);