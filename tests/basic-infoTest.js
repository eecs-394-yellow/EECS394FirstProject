module("Basic-Info Tests");

test("Sample test for basic infomation", function() {
  equal(AddName("Peter"), "Name: Peter <br>", "Wrong!");
});