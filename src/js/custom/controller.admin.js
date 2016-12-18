app.controller('admin', ['$scope', '$http', 'PlayerService', 'EventService', 'NewsService', function($scope, $http, PlayerService, EventService, NewsService) 
{
	$scope.ok = false;
	$scope.news = 'add news here';

	$scope.init = function() 
	{
		$scope.events = events;
		EventService.getPlayers($scope);
	};

	$scope.save = function() 
	{
		PlayerService.mergePlayers($scope);
		EventService.save($scope, $http);
		NewsService.push($scope, $http);
	};

}]);
