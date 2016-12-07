var app = angular.module('app', []);

app.controller('overlay', ['$scope', '$http', '$interval', function($scope, $http, $interval) 
{

	//TODO migrate event stuff to eventService
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

	$scope.randomPlayer = function()
	{
		var playerIndex = Math.floor(Math.random() * ($scope.currentEvent.scores.length - 0 )) + 0;
		return $scope.currentEvent.scores[playerIndex];
	};

	$scope.update = function()
	{
		$scope.date = new Date();
		$scope.randomiseEvent();
		$scope.setupVsList();
	};

	$scope.hydrate = function()
	{
		var ep = "/hydrate";
		$http.get(ep, [])
			.success(function(data, status, headers, config) {
				eval(data);
				$scope.events  = events;
			})
			.error(function(data, status, headers, config) {
			});
	};

	$scope.init = function() 
	{
		$scope.events = events;
		$scope.players = $scope.getPlayers();
		$scope.update();
		$interval(function(){$scope.update()}, 2000);
		$interval(function(){$scope.hydrate()}, 7000);
	};

	$scope.setupVsList = function()
	{
		//TODO complete this using random player
		$scope.vsList = [ 
			{
				'champ' : $scope.players.al,
				'contender' : $scope.players.bobby
			}
		];
	};

	$scope.getPlayers = function() 
	{
		var players = {};
		angular.forEach($scope.events, function(eventValue, eventKey){
			angular.forEach(eventValue.scores, function(player, scoresKey){
				players[player.name] = player;
			});
		});
		return players;
	};

}]);


app.controller('admin', ['$scope', '$http', function($scope, $http) 
{

	$scope.ok = false;

	$scope.init = function() 
	{
		$scope.events = events;
		$scope.players = $scope.getPlayers();
	};


	$scope.mergePlayers = function() 
	{
		angular.forEach($scope.events, function(eventValue, eventKey){
			angular.forEach(eventValue.scores, function(player, scoresKey){
				angular.forEach($scope.players, function(splayer, sscoresKey){
					if (player.name == splayer.name) {
						player.image = splayer.image;
					}
				});
			});
		});
	};

	$scope.save = function() 
	{
		var ep = "/admin";
		$scope.mergePlayers();
		$http.post(ep, $scope.events)
			.success(function(data, status, headers, config) {
				$scope.ok = true;
			})
			.error(function(data, status, headers, config) {
				$scope.ok = false;
			});
	};

	$scope.getPlayers = function() 
	{
		var players = {};
		angular.forEach($scope.events, function(eventValue, eventKey){
			angular.forEach(eventValue.scores, function(player, scoresKey){
				players[player.name] = player;
			});
		});
		return players;
	};

}]);
