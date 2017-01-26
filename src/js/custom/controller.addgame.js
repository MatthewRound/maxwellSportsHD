app.controller('addgame', ['$scope', '$http', 'PlayerService', 'EventService',  function($scope, $http, PlayerService, EventService ) 
{
	$scope.ok = false;
	$scope.news = 'add news here';
	$scope.clientCount = 0;

	$scope.currentEvent = {};
	$scope.winner = {};

	$scope.init = function() 
	{
		$scope.events = events;
		EventService.getPlayers($scope);
	};

	$scope.save = function() 
	{
		EventService.add($scope, $http);
	};

}]);
