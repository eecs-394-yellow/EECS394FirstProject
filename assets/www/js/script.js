(function (window, $) {

function submitNote() {
    var noteAuthor = $('textarea[name="formAuthor"]').val();
		var noteLocation = $('textarea[name="formLocation"]').val();
		var noteText = $('textarea[name="formText"]').val();
    
		$.ajax({
      dataType: 'jsonp',
			url: "http://geonotes.nfshost.com/add_note.php", //need to find DB url
			data: {
				device_id: 1, // PhoneGap API method: device.uuid
				user_name: noteAuthor,
				location_text: noteLocation,
				note: noteText,
        lat: 80,
        lon: 80
			}
		}).done(function() {
			//clear form
			//refresh list
			refreshList();
		});
    
}

function refreshList() {
  $.ajax({
    dataType: 'jsonp',
    url: "http://geonotes.nfshost.com/list.php" //need to find DB url
  }).done(function( notes ) {
    var numNotes = notes.length;
    for (var i=0; i < numNotes; i++)
      {
        // Add each note to the page
        var note = notes[i];
        if ($('.note-' + note.note_id).length === 0)
          {
            var $location = $('<div class="noteLocationDescription"></div>').text('Location: ' + note.location_description);
            var $latlong = $('<div class="latlong"></div>').text('GPS Coordinates: ' + note.lat + ', ' + note.lon);
            var $author = $('<div class="noteAuthor"></div>').text('User: ' + note.user_name);
            var $text = $('<div class="noteText"></div>').text('Note: ' + note.note_text);
            var $note = $('<div class="userNote"></div>')
              .addClass('note-' + note.note_id)
              .hide()
              .append($location, $latlong, $author, $text);
            $('.notes').append($note);
            $note.slideDown();
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
