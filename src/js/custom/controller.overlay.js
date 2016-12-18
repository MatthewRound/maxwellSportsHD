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

	$scope.initSocket = function()
	{
		var wsuri = "ws://" + window.location.hostname + ":" + window.location.port+ "/ws";
		var sock = new WebSocket(wsuri);
		sock.onopen = function() {
			console.log("connected");
			sock.send(JSON.stringify({message: "hello server"}))
		}
		sock.onclose = function(e) {
			console.log("closed");
		}
		sock.onerror = function(e) {
			console.debug("error:"+e);
		}
		sock.onmessage = function(e) {
			data = JSON.parse(e.data);
			if (data.news !== undefined) {
				angular.element(document.getElementById('news')).scope().news = data.news;
			}
		}
	};

	$scope.init = function() 
	{
		$scope.events = events;
		EventService.getPlayers($scope);
		$scope.update();
		$interval(function(){$scope.update()}, 2000);
		$interval(function(){$scope.hydrate()}, 7000);
		$scope.initSocket();
	};
}]);
