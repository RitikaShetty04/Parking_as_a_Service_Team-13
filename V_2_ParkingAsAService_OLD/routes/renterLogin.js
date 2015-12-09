var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/parkingAsAService";

exports.login = function(req, res) {
	var username, password;
	username = req.param("email");
	password = req.param("password");
	//new
	console.log(username + password);
	var json_responses;
	
	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('Renter');

		coll.findOne({user_name: username, user_pass:password}, function(err, user){
			if (user) {
				// This way subsequent requests will know the user is logged in.
				//session parameters
				req.session.username = user.user_name;
				
				console.log(req.session.username +" is the session");
				req.session.id=user._id;
				console.log(req.session.id +" is the ID of the user");
				req.session.loggedInUserId = user.user_id;
				req.session.loggedInUserFname = user.firstName;
				req.session.loggedInUserLname = user.lastName;
				req.session.loggedInUserName = user.user_name;
//address
				req.session.loggedInAddress = user.address;
				req.session.loggedInCity = user.city;
				req.session.loggedInState = user.state;
				req.session.loggedInZipcode = user.zipCode;
//phone	
				req.session.loggedInPhone = user.user_phone;
//Card details
				req.session.loggedInCreditCardNumber = user.creditCardNumber;
				req.session.loggedInNameOnCard = user.nameOnCard;
				req.session.loggedInExpiry = user.expiry;
				req.session.loggedInSecurityCode  = user.securityCode ;
//status location			
				req.session.loggedInStatus = user.status;
				req.session.loggedInLocation = user.location;
				
				
				res.render("navhome", {
					'title' : "Facebook",
					'user' : req.session,
					'rows' : "",
					'user_events': req.session.loggedInEvents,
					'message' : ""
				});
				console.log("login successfull");
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
				res.render("login", {
					title : 'Facebook',
					error : "Incorrect username or password"
				});
				console.log("login fail");
			}
		});
	});

};