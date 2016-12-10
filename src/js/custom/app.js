var app = angular.module('app', []);


app.service('PlayerService', function()
{
	this.calculateWinPercentage = function(player) 
	{
		return (Math.round((player.wins / player.played) * 100) /100)*100;
	};


	this.mergePlayers = function($scope) 
	{
		angular.forEach($scope.events, function(eventValue, eventKey){
			angular.forEach(eventValue.scores, function(player, scoresKey){
				angular.forEach($scope.players, function(splayer, sscoresKey){
					if (player.name == splayer.name) {
						player.image = splayer.image;
						player.country = splayer.country;
					}
				});
			});
		});
	};
});


app.service('EventService', function()
{
	this.save = function($scope, $http)
	{
		var ep = "/admin";
		$http.post(ep, $scope.events)
			.success(function(data, status, headers, config) {
				$scope.ok = true;
			})
			.error(function(data, status, headers, config) {
				$scope.ok = false;
			});
	};

	this.randomise = function($scope) 
	{
		var eventIndex = Math.floor(Math.random() * (events.length - 0 )) + 0;
		$scope.currentEvent = $scope.events[eventIndex];
		var playerIndex = Math.floor(Math.random() * ($scope.currentEvent.scores.length - 0 )) + 0;
		$scope.currentPlayer = $scope.currentEvent.scores[playerIndex];
	};

	this.getPlayers = function($scope) 
	{
		$scope.players = {};
		angular.forEach($scope.events, function(eventValue, eventKey){
			angular.forEach(eventValue.scores, function(player, scoresKey){
				$scope.players[player.name] = player;
			});
		});
	};

	this.randomPlayer = function($scope)
	{
		var playerIndex = Math.floor(Math.random() * ($scope.currentEvent.scores.length - 0 )) + 0;
		return $scope.currentEvent.scores[playerIndex];
	};

	this.setupVsList = function($scope)
	{
		//TODO complete this using random player
		$scope.vsList = [ 
			{
				'champ' : $scope.players.al,
				'contender' : $scope.players.bobby
			}
		];
	};
});


app.controller('overlay', ['$scope', '$http', '$interval', 'EventService', 'PlayerService', function($scope, $http, $interval, EventService, PlayerService) 
{
	$scope.updating = 0;

	$scope.calculateWinPercentage = function(player) 
	{
		return PlayerService.calculateWinPercentage(player);
	};

	$scope.update = function()
	{
		$scope.date = new Date();
		EventService.randomise($scope);
		EventService.setupVsList($scope);
	};

	$scope.hydrate = function()
	{
		var ep = "/hydrate";
		$scope.updating = 1;
		$http.get(ep, [])
			.success(function(data, status, headers, config) {
				eval(data);
				$scope.events  = events;
				$scope.updating = 0;
			})
			.error(function(data, status, headers, config) {
				$scope.updating = 0;
			});
	};

	$scope.init = function() 
	{
		$scope.events = events;
		EventService.getPlayers($scope);
		$scope.update();
		$interval(function(){$scope.update()}, 2000);
		$interval(function(){$scope.hydrate()}, 7000);
	};
}]);


app.controller('admin', ['$scope', '$http', 'PlayerService', 'EventService', function($scope, $http, PlayerService, EventService) 
{
	$scope.ok = false;

	$scope.init = function() 
	{
		$scope.events = events;
		EventService.getPlayers($scope);
	};

	$scope.save = function() 
	{
		PlayerService.mergePlayers($scope);
		EventService.save($scope, $http)

	};
}]);
