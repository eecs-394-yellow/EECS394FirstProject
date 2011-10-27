(function (window, $) {

var noteTemplate;

function submitNote() {
    var noteAuthor = $('#author-field').val(),
      noteLocation = $('#location-field').val(),
      noteText = $('#note-text-field').val();
    
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
      clearForm();
			refreshList();
		});
    
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
            var $note = $( $.jqote(noteTemplate, note) );
            $('.notes').prepend($note);
            $note.animate({
              height: 'show'
            }, 500, 'swing', function() {
              $(this).animate({
                opacity: 1
              }, 500, 'swing');
            });
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

function clearForm() {
  $('.write-note textarea').each(function() {
    $(this).val('');
  });
}

function clearNotes() {
  $.ajax({
    url: "http://geonotes.nfshost.com/clear.php"
  });
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
