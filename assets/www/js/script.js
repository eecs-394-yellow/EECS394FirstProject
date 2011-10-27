(function (window, $) {

var noteTemplate;

function submitNote() {
    var noteAuthor = $('#author-field').val(),
      noteLocation = $('#location-field').val(),
      noteText = $('#note-text-field').val();
}

function getCoordinate() {
	var success = function(position) {
	  var coordinate = position.coords;
		$.ajax({
            dataType: 'jsonp',
			url: "http://geonotes.nfshost.com/add_note.php", //need to find DB url
			data: {
				device_id: 1, // PhoneGap API method: device.uuid
				user_name: noteAuthor,
				location_text: noteLocation,
				note: noteText,
				lat: coordinate.latitude,
				lon: coordinate.longitude
			}
		}).done(function() {
      clearForm();
			refreshList();
		});
	};
	
	var failure = function() {
		alert('Error!');
	};
	navigator.geolocation.getCurrentPosition(success, failure, {enableHighAccuracy: true });
}

function submitNote() {
    var noteAuthor = $('#author-field').val(),
      noteLocation = $('#location-field').val(),
      noteText = $('#note-text-field').val();
	
	getCoordinate();
    
    
}

function refreshList() {
  $.ajax({
    dataType: 'jsonp',
    url: "http://geonotes.nfshost.com/list.php"
  }).done(function( notes ) {
    var numNotes = notes.length;
    $('.notes .note').addClass('old');
    for (var i=0; i < numNotes; i++)
      {
        // Add each note to the page
        var note = notes[i],
          $existingNote = $('.note-' + note.note_id);
        if ($existingNote.length === 0)
          {
            addNote(note);
          }
        else
          {
            $existingNote.removeClass('old');
          }
      }
      $('.notes .old').fadeOut(function() {
        $(this).remove();
      });
  });
}

function addNote(note) {
  // Render a note and add it to the page
  var $note = $( $.jqote(noteTemplate, note) ).hide();
  $('.notes').prepend($note);
  $note.animate({
    height: 'show'
  }, 500, 'swing', function() {
    $(this).animate({
      opacity: 1
    }, 500, 'swing');
  });  
}

function clearForm() {
  // Clear any text in the write-note form fields
  $('.write-note textarea').each(function() {
    $(this).val('');
  });
}

function clearNotes() {
  // Delete all notes in the database
  $.ajax({
    url: "http://geonotes.nfshost.com/clear.php"
  });

  // Remove the notes on the page
  $('.notes .note').fadeOut(function() {
    $(this).remove();
  });
}

$(document).ready(function() {

  noteTemplate = $.jqotec('#note-template');

  refreshList();

	$('#note-submit-button').click(function() {
    submitNote();
		return false; //Turn off the default form behavior
	});
	
	$('#list-refresh-button').click(function() {
		refreshList();
	});

  $('#clear-notes-button').click(function() {
    clearNotes();
  });

});


})(window, jQuery);
