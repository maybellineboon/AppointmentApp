const dateInput = $('input[name="appDatePicker"]');

$('#appDatePicker').datepicker({
	startDate: new Date(),
	format: "mm/dd/yy",
	todayHighlight: true
});

$('#appDatePicker').on('changeDate', function(){
	let date = document.querySelector("#appointmentDate");
	let time = document.querySelector("#appointmentTime");
	time.innerHTML = '';

});

// function populateTime(date, time){
// 	let date = document.querySelector("#date");
// 	let time = document.querySelector("#time");
// 	time.innerHTML = "";
	
// }
// $('#appDatePicker').datepicker()
// 	.on(changeDate, function (e) {
// 		document.querySelector('input[name="appointmentTime"]') = e;
// 	});