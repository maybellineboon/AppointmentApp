var express        = require("express"),
    mongoose       = require("mongoose"),
	bodyParser     = require("body-parser"),
	methodOverride = require("method-override"),
	passport       = require("passport"),
	LocalStrategy  = require("passport-local"),
    app            = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
mongoose.connect("mongodb://localhost/appointmentApp", { useUnifiedTopology: true, useNewUrlParser: true });
mongoose.set('useFindAndModify', false);

//Appointment Schema
var Appointment = require("./models/appointment");
//User Schema
var User = require("./models/user")

//PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret: "AppointmentApp for your appointment needs",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	next();
});

//INDEX - get the appointment index page
app.get("/", function(req, res){
	res.render("index");
});

app.get("/login", function(req, res){
	res.render("login");
});

app.post("/login", passport.authenticate("local", 
	{
		successRedirect: "/",
		failureRedirect: "/login"
	}), function(req, res){

});

app.get("/logout", function(req, res){
	req.logout();
	res.redirect("/");
});

app.get("/register", function(req, res){
	res.render("register");
});

app.post("/register", function(req, res){
	if(!req.body.role){
		var userRole = "User"
	} else {
		var userRole = req.body.role;
	}
	var newUser = new User(
		{
			username: req.body.username, 
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			phoneNumber: req.body.phoneNumber,
			address: req.body.address,
			role: userRole
		});
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			console.log(err);
		} else {
			passport.authenticate("local")(req, res, function(){
				res.redirect("/");
			});
		}
	});
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