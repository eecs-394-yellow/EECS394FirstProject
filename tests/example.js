module("Module A");

test("Sample test", function() {
  var greeter = new myapp.Greeter();
  equal("Hello World?", greeter.greet("World"), "Oh noes!");
});


test("Account test", function() {  

 var account = new Account();
 
 assertEquals("You don't owe any money", account.returnInfo());
 account.addDebt(1000);
 assertEquals("You owe: 1000 dollars.", account.returnInfo());
 account.makePayment(900);
 assertEquals("You owe: 100 dollars.", account.returnInfo());
 account.makePayment(200);
 assertEquals("You over paid! Your balance is currently -100 dollars!", account.returnInfo());
 account.addDebt(200000);
 assertEquals("You owe a lot... We're sending Tony and Vinny after you.", account.returnInfo());

 });