var app = angular.module('OwnerApp', []);
app.controller('OwnerController', function($scope, $http, $location, $window)
		  {
	$scope.result="";
	
$scope.ownerProfile = function() {
		console.log("In Profile controller");
		$window.location="/ownerProfile";
		};
		
	$scope.addParkingPage = function() {
		console.log("In owner controller");
		$window.location="/addParkingPage";
		};
		
		$scope.viewMyParkingSpaces = function() {
			console.log("In owner controller");
			$window.location="/waytoviewparkingspaces";
			};
			
			$scope.viewAllOwnerContracts = function() {
				console.log("In owner controller");
				$window.alert("In controller");
				$window.location="/view_contracts";
				};
				
				$scope.logout = function() {
					$window.location="/logout";
				};	
		  });
