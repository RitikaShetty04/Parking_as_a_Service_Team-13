/**
 * New node file
 */
var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/parkingAsAService";
exports.view_contracts = function(req, res) {
	var user_name = "ritikashetty@gmail.com";
	//get username from sessions
	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('Parking_Contract');

		coll.find({renter_username: user_name}).toArray(function(err, user){
			if (user) {
				console.log("User found");
				var all_contracts=[];
				all_contracts=user;
				console.log("All: "+all_contracts.length);
				var result="Contract Found";
				  res.send({'result':"Contract Found",'rows':all_contracts});

			} else {
				console.log("User not found");
				console.log("returned false");
				json_responses = {"statusCode" : 401};
				var result="Contract Not Found";
				  res.send(result);
			}
		});
	});
};