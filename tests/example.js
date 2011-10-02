module("Module A");

test("Sample test", function() {
  var greeter = new myapp.Greeter();
  equal("Hello World!", greeter.greet("World"), "Oh noes!");
});
