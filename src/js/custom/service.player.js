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
