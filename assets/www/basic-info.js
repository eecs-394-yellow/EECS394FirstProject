$(document).ready(function() {


function AddName(name) {
return "Name: "+ name + " <br>";
}
function AddAge(age) {
return "Age: "+ age + " <br>";
}
function AddSex(sex) {
return "Sex: "+ sex + " <br>";
}
function AddMajor(major) {
return "Major: "+ major + " <br>";
}
function AddYear(year) {
return "Year: "+ year + " <br>";
}
$('#basic div').append('<div>' + AddName("Peter") + AddAge("25") + AddSex("Male")  + AddMajor("Computer Science") +AddYear("Senior") + '</div>');



});


