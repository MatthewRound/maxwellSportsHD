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
