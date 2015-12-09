var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/facebook";

var checkLoggedInUser = require("./checkLoggedInUser.js");

exports.addParkingSpace = function(req, res) {
	//if (checkLoggedInUser.checkLoggedInUser(req, res) === true) {
	console.log("In ParkingSpace");
	
	var lattitude = req.param("lattitude"); 
	var longitude = req.param("longitude");
	
	console.log("Values: "+lattitude+" "+longitude);
	
// insert into DB parking space values
	
	/*owner_username
	lattitude
	longitude
	address
	parkingImage
	status
	availableFrom
	availableTo
*/
	
	/*var groupname = req.param("groupname");
	var description = req.param("description");
	var username = req.session.loggedInUserName;

	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('users');
	coll.update(
			  { user_name: username },
			  { $push: { "groups": { "group_description":description,"group_name":groupname} } }
			  ,function(err, user){
				  if(user)
					  {
					  var groups;
					  coll.findOne({user_name: username}, function(err, user){
						  groups=user.groups;
						  res.render('groups', {
								'rows' : groups,
								'user' : req.session,
							});
					  });
													 
						  }		 
					  }
			);
	});*/
	//}
};