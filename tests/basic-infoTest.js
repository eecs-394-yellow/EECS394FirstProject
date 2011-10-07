module("Module A");

test("Sample test for basic infomation", function() {
  equal("Name: Peter", AddName("Peter"), "Wrong!");
});