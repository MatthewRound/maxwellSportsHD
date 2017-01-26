app.service('EventService', function()
{
	this.add = function($scope, $http)
	{
		var currentEvent = $scope.currentEvent.name;
		var winner = $scope.winner.name;
		var players = [];
		angular.forEach($scope.players, function(player, key){
			if (player.participating !== undefined) {
				players.push(player.name);
				$scope.players[key].participating = false;
			}
		});
		angular.forEach($scope.events, function(eventValue, eventKey){
			if (eventValue.name == currentEvent) {
				angular.forEach(eventValue.scores, function(player, scoresKey){
					angular.forEach(players, function(p, K){
						if (p == player.name) {
							$scope.events[eventKey]['scores'][scoresKey].played = player.played +1;
							if (player.name == winner) {
								$scope.events[eventKey]['scores'][scoresKey].wins = player.wins +1;
							} else {
								$scope.events[eventKey]['scores'][scoresKey].loses = player.loses +1;
							}
						}
					});
				});
			}
		});
 		this.save($scope, $http); 
	}

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

	this.randomise = function($scope, index) 
	{
		var eventIndex = index;
		if (index === undefined) {
			eventIndex = Math.floor(Math.random() * (events.length - 0 )) + 0;
		}
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
