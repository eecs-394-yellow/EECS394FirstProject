function Account() {
	
	var balance = 0;
	
	this.addDebt = function(debtAmount) {
	balance = balance + debtAmount;
	};
	
	this.makePayment = function(payAmount) {
	balance = balance - payAmount;
	};
	
	
	this.returnInfo = function() {
	if (balance == 0) {
		return "You don't owe any money";
		}
	else if (balance <= 0) {
		return "You over paid! Your balance is currently " + balance + " dollars!";
	}
	else if (balance >= 10000) {
		return "You owe a lot... We're sending Tony and Vinny after you.";
	}
	else {
		return "You owe: " + balance + " dollars.";
		}
	};
};

