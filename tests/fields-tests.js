module("Fields Tests");

test("Test add", function() {
  expect(3);
  var testFields = new Fields( $('#academics') );
  testFields.add('name', 'value');
  var $field = $('.field-name');
  strictEqual($field.length, 1, 'Field element does not exist.');
  strictEqual($field.find('.name').text(), 'name', 'Field name is incorrect.');
  strictEqual($field.find('.value').text(), 'value', 'Field value is incorrect.');
});

test("Test add with empty name", function() {
  expect(1);
  var testFields = new Fields( $('#academics') );
  testFields.add('', 'value');
  var $field = $('.field');
  strictEqual($field.length, 0, 'Field element exists when created with empty name.');
});

test("Test update", function() {
  expect(1);
  var testFields = new Fields( $('#academics') );
  testFields.add('name', 'value');
  testFields.update('name', 'new value');
  var $field = $('.field-name');
  strictEqual($field.find('.value').text(), 'new value', 'Field value is incorrect.');
});

test("Test remove", function() {
  expect(1);
  var testFields = new Fields( $('#academics') );
  testFields.add('name', 'value');
  testFields.remove('name');
  var $field = $('.field-name');
  strictEqual($field.length, 0, 'The field element was not removed.');
});