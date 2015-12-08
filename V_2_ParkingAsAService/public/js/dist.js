function distance(obj) {
	console.log("in distance"+obj.lat1);
    var R = 6371; // km
    var dLat = (obj.lat2 - obj.lat1) * Math.PI / 180;
    var dLon = (obj.lon2 - obj.lon1) * Math.PI / 180;
    var lat1 = obj.lat1 * Math.PI / 180;
    var lat2 = obj.lat2 * Math.PI / 180;

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c;
    var m = d * 0.621371;
    return {
        km: d,
        m: m
    }
}
