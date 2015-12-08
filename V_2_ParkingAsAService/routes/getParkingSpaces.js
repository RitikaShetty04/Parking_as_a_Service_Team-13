var mongo = require("./mongo");
var ejs = require("ejs");
var mongoURL = "mongodb://localhost:27017/instapark";

exports.getParkingSpaces=function(req,res)
{
	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('parkingSpace');
		
		coll.find().toArray(function(err,response)
				{
			if(err)
				{
				console.log("error in getParkingSpace");
				}else
					{
					
					res.send({"result":response});
					}
			
		});
	});
};
