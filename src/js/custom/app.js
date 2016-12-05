var app = angular.module('app', []);

app.controller('overlay', ['$scope', '$http', '$interval', function($scope, $http, $interval) 
{

	$scope.caculateWinPercentage = function(player) 
	{
		return (Math.round((player.wins / player.played) * 100) /100)*100;
	};

	$scope.randomiseEvent = function()
	{
		var eventIndex = Math.floor(Math.random() * (events.length - 0 )) + 0;
		$scope.currentEvent = $scope.events[eventIndex];
		var playerIndex = Math.floor(Math.random() * ($scope.currentEvent.scores.length - 0 )) + 0;
		$scope.currentPlayer = $scope.currentEvent.scores[playerIndex];
	};

	$scope.update = function()
	{
		$scope.date = new Date();
		$scope.randomiseEvent();
	};

	$scope.init = function() {
		$scope.events = events;
		$scope.update();
		$interval(function(){$scope.update()}, 2000);
	}

}]);


app.controller('admin', ['$scope', '$http', function($scope, $http) 
{
	$scope.init = function() {
		$scope.events = events;
	}

	$scope.ok = false;

	$scope.save = function() {
		var ep = "/admin";
		$http.post(ep, $scope.events)
			.success(function(data, status, headers, config) {
				$scope.ok = true;
			})
			.error(function(data, status, headers, config) {
				$scope.ok = false;
			});
	}

}]);
