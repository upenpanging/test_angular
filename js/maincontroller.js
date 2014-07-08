// JavaScript Document
// main controller
// For ng-app= myApp
var app = angular.module('myApp',[]);
	
	app.controller("FirstCtrl", function($scope, Data){
	  $scope.data = Data;		
	});
	
	app.controller("SecondCtrl", function($scope, Data, Avengers){
	  $scope.data = Data;
	  $scope.avengers = Avengers;
	  //this function can be called in directive
	  $scope.outputavengers = function () {
	   return console.log($scope.avengers.cast);
	  }
	  $scope.outputavengersleave = function () {
	   return console.log("hi");
	  }
	});
	
	app.controller("AppCtrl", function ($scope) {
	   // this function can be called in directive
	  $scope.loadMoreTweets = function () {
		alert("Loading tweets!");
	  }
	  $scope.consoleTweets = function () {
	  console.log("consoling tweets!");
	  }
	  
	});
     
	 // directive
	app.directive("superman", function() {
	  return {
		restrict: "E",
		transclude: true,
		template: "<div ng-transclude> <p>Here I am to save the day</p> </div>"
	  };
	});
	
	app.directive("work", function() {
	  return {
		restrict: "A",
		link: function(){
			   alert("I'm working in attribute");
			 }
		}
	});
	
	app.directive("cDirective", function() {
	  return {
		restrict: "C",
		link: function(){
			   alert("I'm working in class");
			 }
		}
	});
	//directive talking to controllers
	app.directive("avengers", function(){
		 return function(scope, element, attrs) {
			  element.bind("mouseenter", function(){
				//console.log("I'm inside of you!");
				// directive calling the function from  controller secondCtrl
				scope.$apply("outputavengers()");
			  })
			}
	});
	
	app.directive("avenleave", function(){
		 return function(scope, element, attrs) {
			  element.bind("mouseleave", function(){
				//console.log("I'm inside of you!");
				// directive calling the function from  controller secondCtrl
				scope.$apply("outputavengersleave()");
			  })
			}
	});
		
	app.directive("enter", function(){
		 return function(scope, element, attrs) {
			  element.bind("mouseenter", function(){
				//console.log("I'm inside of you!");
				element.addClass(attrs.enter);
				// directive calling the function from  controller AppCtrl
				scope.$apply("loadMoreTweets()");	
				scope.$apply("consoleTweets()");
			  })
			}
	});
	
	app.directive("leave", function(){
	     return function(scope, element, attrs) {
		  element.bind("mouseleave", function(){
			//console.log("I'm leaving on a jet plane!");
			element.removeClass(attrs.enter);			
		  })
		}
	});
	
	// directive to directive communication
	app.directive("superhero", function () {
	  return {
		restrict: "E",
		scope: {},
		controller: function ($scope) {
		  $scope.abilities = [];
	 
		  this.addStrength = function() {
			$scope.abilities.push("strength");
		  };
	 
		  this.addSpeed = function() {
			$scope.abilities.push("speed");
		  };
	 
		  this.addFlight = function() {
			$scope.abilities.push("flight");
		  };
		},
	 
		link: function (scope, element) {
		  element.addClass("button");
		  element.bind("mouseenter", function () {
			console.log(scope.abilities);
		  });
		}
	  };
	});
		
	app.directive("strength", function() {
		return {
		  require: "superhero",
		  link: function (scope, element, attrs, superheroCtrl) {
			superheroCtrl.addStrength();
		  }
		};
	  });	
	app.directive("speed", function() {
	  return {
		require: "superhero",
		link: function (scope, element, attrs, superheroCtrl){
		  superheroCtrl.addSpeed();
		}
	  };
	});
	 
	app.directive("flight", function() {
	  return {
		require: "superhero",
		link: function (scope, element, attrs, superheroCtrl){
		  superheroCtrl.addFlight();
		}
	  };
	});
	
	//component directive	
	app.directive("clock", function(){
	  return {
		restrict: 'E',
		scope: {
		  timezone: "@"
		},
		template: "<div>12:00pm {{timezone}}</div>"
	  };
	});	
	//component container directive
	app.directive("panel", function () {
	  return {
		restrict: "E",
		transclude: true,
		scope: {
		  title: "@"
		},
		template: "<div style='border: 3px solid #000000'>" +
				  "<div class='alert-box'>{{title}}</div>" +
				  "<div ng-transclude></div></div>"
	  };
	});
	
	//Directive communication
	app.directive("country", function () {
	  return {
		restrict: "E",
		controller: function () {
		  this.makeAnnouncement = function (message) { 
			console.log("Country says: " + message);
		  };
		}
	  };
	});
	app.directive("state", function () {
	  return {
		restrict: "E",
		controller: function () {
		  this.makeLaw = function (law) {
			console.log("Law: " + law);
		  };
		}
	};
	});
	
	app.directive("city", function () {
	  return {
		restrict: "E",
		require: ["^country","^state"],
		link: function (scope, element, attrs, ctrls) {
		  ctrls[0].makeAnnouncement("This city rocks");
		  ctrls[1].makeLaw("Jump higher");
		}
	  };
	});
	//understanding scope kid directive
	app.controller("ChoreCtrl", function($scope){
	  $scope.logChore = function(chore){
		alert(chore + " is done!");
	  };
	});
	
	app.directive("kid", function() {
	  return {
		restrict: "E",
		scope: {
			done: "&"
		  },
		template: '<input type="text" ng-model="chore">' +
		  '{{chore}}' +
		  '<div class="btn btn-primary"" ng-click="done({chore: chore})">I\'m done</div>'
	  };
	});
		
	//drink controller
	app.controller("drinkCtrl", function ($scope) {
	  $scope.ctrlFlavor = "blackberry";
	})
	
	app.directive("drink", function () {
	  return {
		scope: {
		  flavor: "="
		},
		template: '<input type="text" ng-model="flavor">',
	  };
	});
	
	app.controller("isolateCtrl", function ($scope) {
	  $scope.callHome = function (message) {
		alert(message);
	  };
	});	
	
	app.directive("phone", function () {
	  return {
		scope: {
		  dial: "&"
		},
		template: '<input type="text" ng-model="value">' +
		  '<div class="btn btn-primary" ng-click="dial({message:value})">' +
		  'Call home!</div>',
	  };
	});
	// dumb password
	app.directive("dumbPassword", function () {
	  var validElement = angular.element('<div>{{ model.input }}</div>');
	 
	  var link = function (scope) {
		scope.$watch("model.input", function (value) {
		  if(value === "password") {
			validElement.toggleClass("alert-box alert");
		  }
		});
	  };
	 
	  return {
		restrict: "E",
		replace: true,
		templateUrl: "dumbpass.html",
		compile: function (tElem) {
		  tElem.append(validElement);
	 
		  return link;
		}
	  }
	});
	
	//ng view
	app.config(function ($routeProvider) {
	  $routeProvider
		.when('/',
		{
		  templateUrl: "app.html",
		  controller: "routerCtrl",
		})
		.when('/pizza',
		{
		  template: "Yum!!"
		})
		.otherwise({
		  template: "This doesn't exist!"
		})
	});
	//defer promises 
	app.controller("routerCtrl", function ($scope, $q) {
	 
	  var defer = $q.defer();
	 
		 defer.promise
			.then(function (weapon) {
			  alert("You can have my " + weapon);
			  return "bow";
			})
			.then(function (weapon) {
			  alert("And my " + weapon);
			  return "axe";
			})
			.then(function () {
			  alert("And my " + weapon);
			});
 
		defer.resolve("sword");
	 
	  $scope.model = {
		message: "This is my app!!!"
	  }
	});
	