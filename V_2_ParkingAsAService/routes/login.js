/**
 * New node file
 */
var mongo = require("./mongo");
var ejs = require("ejs");
var mongoURL = "mongodb://localhost:27017/ParkingAsAService";
var bcrypt=require('bcrypt-nodejs');
function before_renter_login(req,res) {
	console.log("in  renter before signin");
	res.render('renter_login',{"message":""});
	
}
function after_renter_login(req,res) {
	console.log("In after login");
	var username, password;
	username = req.param("email");
	password = req.param("password");
	//new
	console.log(username + password);
	var json_responses;
	
	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('renter');//name of the collection is Renter

		coll.findOne({username:username}, function(err, user){
			console.log("Inside comparison but outside execution");
			if (user) {
				
				if(bcrypt.compareSync(password, user.password)){
					res.code="200";	
					res.user=user;
					console.log("Getting executed");
					// This way subsequent requests will know the user is logged in.
					//session parameters
					req.session.username = user.username;
					
					console.log(req.session.username +" is the session");
					req.session.id=user._id;
					console.log(req.session.id +" is the ID of the user");
					req.session.loggedInUserId = user.renterId;
					req.session.loggedInUserFname = user.firstName;
					req.session.loggedInUserLname = user.lastNmae;
					req.session.loggedInUserName = user.username;
	//address
					req.session.loggedInAddress = user.address;
					req.session.loggedInCity = user.city;
					req.session.loggedInState = user.state;
					req.session.loggedInZipcode = user.zipCode;
	//phone	
					req.session.loggedInPhone = user.phoneNo;
	//Card details
					req.session.loggedInCreditCardNumber = user.creditCardNumber;
					req.session.loggedInCreditCardNumberHidden="************"+user.creditCardNumber.toString().substring(12);
					console.log("loggedincreditcardhidden"+req.session.loggedInCreditCardNumberHidden);
					req.session.loggedInNameOnCard = user.nameOnCard;
					req.session.loggedInExpiry = user.expiry;
					req.session.loggedInSecurityCode  = user.securityCode ;
	//status 			
					req.session.loggedInStatus = user.status;
					
					
					
					res.render('renter_homepage',{'user':req.session});
					console.log("login successfull");
				}
				else{
					
					res.code="100";
					res.render('renter_login',{'message':"Invalid Credentials!!"});
				}
				
	
			} 
			else if(err)
				{
				json_responses = {"statusCode" : 401};
				res.send(json_responses);
				console.log("Error occured:line 41" +err);
				}
		
			else {
				//user doesnt exist
				console.log("returned false");
				res.render('renter_login',{'message':"User Does not exist!"});
				console.log("login fail");
			}
		});
	});
}
function before_owner_login(req,res) {
	console.log("in before owner signin");
	res.render('owner_login',{"message":''});
	
}
function after_owner_login(req,res) {
	console.log("In after login");
	var username, password;
	username = req.param("email");
	password = req.param("password");
	//new
	console.log(username + " "+password);
	var json_responses;
	
	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('owner');//name of the collection is owner

		coll.findOne({username:username}, function(err, user){
			console.log("Inside comparison but outside execution");
			if (user){
				
				if(bcrypt.compareSync(password, user.password)){
				console.log("Getting executed");
				// This way subsequent requests will know the user is logged in.
				//session parameters
				req.session.username = user.username;
				console.log(req.session.username +" is the session");
				req.session.id=user._id;
				console.log(req.session.id +" is the ID of the user");
				req.session.loggedInUserId = user.ownerId;
				req.session.loggedInUserFname = user.firstName;
				req.session.loggedInUserLname = user.lastName;
				req.session.loggedInUserName = user.username;
//address
				req.session.loggedInAddress = user.address;
				req.session.loggedInCity = user.city;
				req.session.loggedInState = user.state;
				req.session.loggedInZipcode = user.zipCode;
//phone	
				req.session.loggedInPhone = user.phoneNo;
//Card details
				req.session.loggedInCreditCardNumber = user.creditCardNumber;
				
				
				req.session.loggedInNameOnCard = user.nameOnCard;
				req.session.loggedInExpiry = user.expiry;
				req.session.loggedInSecurityCode  = user.securityCode ;
//status 			
				req.session.loggedInStatus = user.status;
				
				res.render('owner_homepage',{'user':req.session});
				console.log("login successfull");
				}
				else{
					res.render('owner_login',{'message':"Invalid Credentials!!"});
				}
			} 
			else if(err)
				{
				json_responses = {"statusCode" : 401};
				res.send(json_responses);
				console.log("Error occured:line 41" +err);
				}
		
			else {
				//user doesnt exist
				console.log("returned false");
				res.render('renter_login',{'message':"User does not exist"});
				console.log("login fail");
			}
		});
	});
}

function before_admin_login(req,res) {
	console.log("in before admin signin");
	res.render('admin_login',{"message":''});
	
}

function after_admin_login(req,res) {
	console.log("In admin after login");
	var username, password;
	username = req.param("email");
	password = req.param("password");
	//new
	console.log(username + " "+password);
	var json_responses;
	
	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('admin');//name of the collection is Renter

		coll.findOne({username:username}, function(err, user){
			console.log("Inside comparison but outside execution");
			if (user) {
				console.log("Getting executed");
				
				if(bcrypt.compareSync(password, user.password)){
				// This way subsequent requests will know the user is logged in.
				//session parameters
				req.session.username = user.username;
				req.session.userID = user._id;
				console.log(req.session.userID +" is the session");
				req.session.loggedInUserFname = user.firstName;
				req.session.loggedInUserLname = user.lastName;
				
//address
				req.session.loggedInAddress = user.address;
				req.session.loggedInCity = user.city;
				req.session.loggedInState = user.state;
				req.session.loggedInZipcode = user.zipCode;
//phone	
				req.session.loggedInPhone = user.phoneNo;

				
				
				res.render("admin_homepage",{'user':req.session});
				console.log("login successfull");
				}
				else{
					res.render('admin_login',{'message':"Invalid Credentials!!"});
				}
			} 
			else if(err)
				{
				json_responses = {"statusCode" : 401};
				res.send(json_responses);
				console.log("Error occured:line 41" +err);
				}
		
			else {
				//user doesnt exist
				console.log("returned false");
				res.render('admin_login');
				console.log("login fail",{'message':"User does not exist"});
			}
		});
	});
}

exports.before_renter_login=before_renter_login;
exports.after_renter_login=after_renter_login;
exports.before_owner_login=before_owner_login;
exports.after_owner_login=after_owner_login;
exports.before_admin_login=before_admin_login;
exports.after_admin_login=after_admin_login;