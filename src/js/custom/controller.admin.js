app.controller('admin', ['$scope', '$http', 'PlayerService', 'EventService', 'NewsService', 'AdminService', function($scope, $http, PlayerService, EventService, NewsService, AdminService) 
{
	$scope.ok = false;
	$scope.news = 'add news here';
	$scope.clientCount = 0;

	$scope.init = function() 
	{
		$scope.events = events;
		$scope.clientCount = AdminService.getInfo($scope, $http);
		EventService.getPlayers($scope);
	};

	$scope.save = function() 
	{
		PlayerService.mergePlayers($scope);
		EventService.save($scope, $http);
		NewsService.push($scope, $http);
	};

}]);
