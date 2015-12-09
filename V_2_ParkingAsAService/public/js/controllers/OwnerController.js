var app = angular.module('OwnerApp', []);
app.controller('OwnerController', function($scope, $http, $location, $window)
		  {
	$scope.result="";
	$scope.addParkingPage = function() {
		console.log("In owner controller");
		$window.location="/addParkingPage";
		};
		
		$scope.viewMyParkingSpaces = function() {
			console.log("In owner controller");
			$window.location="/viewMyParkingSpaces";
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
