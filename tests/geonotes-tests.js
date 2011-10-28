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

  describe('readNotes', function() {
    it('should load the old notes', function() {
      expect($('#note%20note-40')).toExist();
	  expect($('#note%20note-39')).toExist();
    });
    it('should not break anything when refresh button clicked with no new content', function() {
      var button = $('#list-refresh-button');
	  button.click();
      expect($('#note%20note-40')).toExist();
	  expect($('#note%20note-39')).toExist();
    });
	it('should clear the page upon clicking clear page button ', function() {
      var button = $('#clear-notes-button');
	  button.click();
      expect($('#note%20note-40')).not.toExist();
	  expect($('#note%20note-39')).not.toExist();
    });
  });
/*
  describe('writeNote', function() {
    it('should update field text', function() {
      testFields.add('name', 'value');
      testFields.update('name', 'new value');
      expect($('.field-name').find('.value')).toHaveText('new value');
    });
  });
*/
});
