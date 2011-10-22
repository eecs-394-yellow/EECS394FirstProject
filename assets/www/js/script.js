$(document).ready(function() {
	$('#note-submit').click(function() {
		var noteAuthor = $('textarea[name="formAuthor"]').val();
		var noteLocation = $('textarea[name="formLocation"]').val();
		var noteText = $('textarea[name="formText"]').val();
		$.ajax({
			type: "POST",
			url: "add_note.php", //need to find DB url
			data: {
				device_id: //phonegap API method
				author: noteAuthor
				location: noteLocation
				note: noteText
			}
		}).done(function() {
			//clear form
			//refresh list
			RefreshList();
		});
		return false; //make sure this turns off the default form behavior!
	});
	
	$('#list-refresh').click(function() {
		// Refresh list
		RefreshList();
	});
})