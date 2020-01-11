var express     = require("express"),
    mongoose    = require("mongoose"),
	bodyParser  = require("body-parser"),
	methodOverride = require("method-override"),
    app         = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
mongoose.connect("mongodb://localhost/appointmentApp", { useUnifiedTopology: true, useNewUrlParser: true });
mongoose.set('useFindAndModify', false);

//Appointment Schema
var Appointment = require("./models/appointment");

//INDEX - get the appointment index page
app.get("/", function(req, res){
	res.render("index");
});

//NEW - create new appointment
app.get("/appointment/new", function(req, res){
	res.render("new");
});

//CREATE - create new appointment and write to database
app.post("/appointment", function(req, res){
	//get data and add to appointment array
	var phoneNumber = req.body.phoneNumber;
	var appointmentTime = req.body.appointmentTime;
	var appointmentDate = req.body.appointmentDate;
	var newAppointment = { phoneNumber: phoneNumber, appointmentTime: appointmentTime, appointmentDate: appointmentDate };
	//create new appointment and save to db
	Appointment.create(newAppointment, function(err, newlyCreated){
		if(err){
			console.log(err);
		} else {
			//show appointment page confirmation
			res.redirect("/appointment/confirmation/" + newlyCreated._id);
		}
	});
});

//SHOW - show newly created appointment
app.get("/appointment/confirmation/:id", function(req, res){
	Appointment.findById(req.params.id, function(err, newAppointment){
		if(err){
			console.log(err);
		} else {
			res.render("confirmation", { appointment: newAppointment });
		}
	});
});

//SHOW - show all appointments for a user
app.get("/appointment/edit", function(req, res){
	Appointment.find({}, function(err, allAppointments){
		if(err){
			console.log(err);
		} else {
			res.render("show", { allAppointments: allAppointments });
		}
	});
});

//DESTROY - delete appointment for a user
app.delete("/appointment/:id", function(req, res){
	Appointment.findByIdAndRemove(req.params.id, function(err){
		if(err){
			console.log(err);
		} else {
			res.redirect("/appointment/edit");
		}
	});
});

//application listener
app.listen(3000, function(){
	console.log("Appointment App is up!");
});