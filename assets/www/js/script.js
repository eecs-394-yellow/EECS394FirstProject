(function (window, $) {

var noteTemplate,
	currentPosition = null,
	currentLatLon = null;

function submitNote() {
    var noteAuthor = $('#author-field').val(),
		  noteLocation = $('#location-field').val(),
		  noteText = $('#note-text-field').val();
    
    if (currentPosition === null) {
    	console.log("Error: Current GPS position could not be obtained before submitting form");
    	return;
    }

    $.ajax({
      dataType: 'jsonp',
      url: "http://geonotes.nfshost.com/add_note.php", //need to find DB url
      data: {
        device_id: 1, // PhoneGap API method: device.uuid
        user_name: noteAuthor,
        location_text: noteLocation,
        note: noteText,
        lat: currentPosition.latitude,
        lon: currentPosition.longitude
      }
    }).done(function() {
      clearForm();
      refreshList();
    });
}

function logGPSError() {
	console.log('Error polling GPS coordinates');
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
            addNoteToList(note);
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

function addNoteToList(note) {
  // Render a note and add it to the page
	noteLatLon = new LatLon(note.lat, note.lon);
	if (currentLatLon !== null) {
		note.distance = currentLatLon.distanceTo(noteLatLon);
	}
	else {
		note.distance = '';
	}
  var $note = $( $.jqote(noteTemplate, note) ).hide();
  $('.notes').prepend($note);
  $note.animate({
    height: 'show'
  }, 500, 'swing', function() {
    $(this).animate({
      opacity: 1
    }, 500, 'swing');
  });  
  $note.data('latLon', noteLatLon);
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

function updateCurrentPosition(position) {
	// Update the latitude and longitude in the write-note form
	currentPosition = position.coords;
	var lat = currentPosition.latitude,
		lon = currentPosition.longitude;
	$('.current-gps-coordinates span').text(lat + ', ' + lon);
	
	// Update the distance to each note in the note list
	currentLatLon = new LatLon(lat, lon);
	var $notes = $('.note'),
		numNotes = $notes.length;
	for (var i=0; i < numNotes; i++) {
		var $note = $notes.eq(i);
			noteLatLon = $.data($note[0], 'latLon');
		$note.find('.distance .value').text( currentLatLon.distanceTo(noteLatLon) + ' km' );
	}
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
  
  // Update the current position when the page first loads
  // and whenever the device's GPS location changes in the future
  navigator.geolocation.getCurrentPosition(function(position) {
	  	updateCurrentPosition(position);
		  navigator.geolocation.watchPosition(updateCurrentPosition, logGPSError, { enableHighAccuracy: true, maximumAge: 2000 });
	  }, logGPSError, { enableHighAccuracy: true });

});


})(window, jQuery);
