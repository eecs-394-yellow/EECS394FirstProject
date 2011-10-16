describe('Fields Module', function() {

  var testFields;

  beforeEach(function() {
    loadFixtures('example.html');
    testFields = new Fields( $('#academics') );
  });

  describe('add', function() {
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
