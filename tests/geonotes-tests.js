describe('GeoNotes Module', function() {

  var testNote = [
	{
		note_id:"41",
		device_id:"01000000-0000-0000-0000-000000000000",
		user_name:"Test",
		time:"2011-10-28 11:36:00",
		location_description:"Test",
		lat:"80",
		lon:"80",
		note_text:"Oh hai guise"
	}];

  beforeEach(function() {
    loadFixtures('example.html');
  });

  /*
  describe('writeNote', function() {
    it('should properly display a newly-written note', function() {
    });
  });
  */
  
  describe('readNotes', function() {
    it('should load the old notes', function() {	
      expect($('.note')).toExist();
	  expect($('.note')).toBeVisible();
    });
    it('should not break anything when refresh button clicked with no new content', function() {
	  $('#list-refresh-button').click();
      expect($('.note')).toExist();
	  expect($('.note')).toBeVisible();
    });
	it('should clear the page upon clicking clear page button', function() {
	  $('#clear-notes-button').click();
	  $('#list-refresh-button').click();
      expect($('.note')).not.toExist();
    });
  });
});
