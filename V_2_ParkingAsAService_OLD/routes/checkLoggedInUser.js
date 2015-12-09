//to check if a user is logged in 
exports.checkLoggedInUser = function(req, res) {

	if (typeof req.session.loggedInUserFname === "undefined") {
		console.log(typeof req.session.loggedInUserName);
		return false;

	} else {
		console.log(typeof req.session.loggedInUserName);
		return true;
	}

};