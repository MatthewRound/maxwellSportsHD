app.controller('overlay', ['$scope', '$http', '$interval', 'EventService', 'PlayerService', function($scope, $http, $interval, EventService, PlayerService) 
{
	$scope.connected = 0;

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

	$scope.initSocket = function()
	{
		var wsuri = "ws://" + window.location.hostname + ":" + window.location.port+ "/ws";
		var sock = new WebSocket(wsuri);
		sock.onopen = function() {
			$scope.connected = 1;
			sock.send(JSON.stringify({message: "hello server"}))
		}
		sock.onclose = function(e) {
			$scope.connected = 0;
		}
		sock.onerror = function(e) {
			console.debug("error:"+e);
		}
		sock.onmessage = function(e) {
			data = JSON.parse(e.data);
			if (data.news !== undefined) {
				angular.element(document.getElementById('news')).scope().news = data.news;
			}
			if (data.events !== undefined) {
				angular.element(document.getElementById('overlay')).scope().events = data.events;
			}
		}
	};

	$scope.init = function() 
	{
		$scope.events = events;
		$scope.initSocket();
		EventService.getPlayers($scope);
		$scope.update();
		$interval(function(){$scope.update()}, 2000);
	};
}]);
