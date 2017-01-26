app.controller('addgame', ['$scope', '$http', 'PlayerService', 'EventService',  'NewsService', function($scope, $http, PlayerService, EventService, NewsService) 
{
	$scope.ok = false;
	$scope.news = 'add news here';
	$scope.clientCount = 0;
	$scope.saved = false;
	$scope.addAnother = false;
	$scope.currentEvent = {};
	$scope.winner = {};

	$scope.init = function() 
	{
		$scope.events = events;
		EventService.getPlayers($scope);
		$scope.reset();
	};

	$scope.save = function() 
	{
 		EventService.add($scope, $http); 
		var news = {};
		var now = new Date();
		news.news = now + ":"+$scope.winner.name + " won at " + $scope.currentEvent.name;
		NewsService.push(news, $http);
		$scope.saved = true;
		$scope.addAnother = true;
	};

	$scope.reset = function()
	{
		$scope.currentEvent = {};
		$scope.winner = {};
		$scope.saved = false;
		$scope.addAnother = false;
		angular.forEach($scope.players, function(player, key){
			$scope.players[key].participating = false;
		});
	}

}]);
