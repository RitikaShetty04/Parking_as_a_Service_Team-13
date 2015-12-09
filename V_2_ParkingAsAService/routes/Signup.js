var ejs = require("ejs");
var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/ParkingAsAService";


function after_sign_up(req,res)
{
	console.log("Value:" +req.param("signUpAs"));
	var firstName=req.param("firstName");
	var lastName=req.param("lastName");
	var address=req.param("address");
	var city=req.param("city");
	var state=req.param("state");
	var zipCode=req.param("zipCode");
	var phoneNo=req.param("phoneNo");
	var email=req.param("email");
	var password = req.param("password");
	var creditCardNumber=req.param("creditCardNumber");
	var nameOnCard=req.param("nameOnCard");
	var securityCode=req.param("securityCode");
	var expiry=req.param("expiry");
	var type=req.param("signUpAs");
	
	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection(type);

		coll.findOne({username: email}, function(err, user){

			if (user) {
				res.send({"signup":"User already exists"});			

			} else {
					coll.insert({
					firstName : firstName,
					lastName : lastName,
					address : address,
					city : city,
					state : state,
					zipCode : zipCode,
					phoneNo : phoneNo,
					username : email,
					password : password,
					creditCardNumber : creditCardNumber,
					nameOnCard : nameOnCard,
					securityCode : securityCode,
					expiry : expiry,
					status:'registered',
				}, function(err, user){
					if (user) {
						if(type=="owner")
							{
							res.send({"signup":"Owner Success"});
							}
						else
							{
							res.send({"signup":"Renter Success"});
							}

					} else {
						res.send({"signup":"Fail"});
				
						}
				});
			}
			
		});
	});	
}

exports.after_sign_up=after_sign_up;
