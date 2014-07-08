	// JavaScript Document
	//factory controller
	// For ng-app= myApp
	app.factory('Data', function () {
	  return { message: "I'm data from a service" };
	});
	
	app.factory('Avengers', function () {
	  var Avengers = {};
	  Avengers.cast = [
		{
		  name: " Upen",
		  character: "Tiger"
		},
		{
		  name: " Raunak",
		  character: "Lion"
		},
		{
		  name: " Avinash",
		  character: "Mouse"
		}	
	  ];
	  return Avengers;
	});
	// ----------------For ng-app= myApp---------------