var dateInput = $('input[name="appDatePicker"]');

$('#appDatePicker').datepicker({
	startDate: new Date(),
	format: "mm/dd/yy",
	todayHighlight: true
});

// $('#appDatePicker').datepicker()
// 	.on(changeDate, function (e) {
// 		document.querySelector('input[name="appointmentTime"]') = e;
// 	});