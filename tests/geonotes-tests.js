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
    it('should create new field element', function() {
      testFields.add('name', 'value');
      var $field = $('.field-name');
      expect($field).toExist();
      expect($field.find('.name')).toHaveText('name');
      expect($field.find('.value')).toHaveText('value');
    });
    it('should not create a field without a name', function() {
      testFields.add('', 'value');
      expect($('.field')).not.toExist();
    });
  });

  describe('update', function() {
    it('should update field text', function() {
      testFields.add('name', 'value');
      testFields.update('name', 'new value');
      expect($('.field-name').find('.value')).toHaveText('new value');
    });
  });

  describe('delete', function() {
    it('should remove field element', function() {
      testFields.add('name', 'value');
      testFields.remove('name');
      expect($('.field-name')).not.toExist();
    });
  });

});
