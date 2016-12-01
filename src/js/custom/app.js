var app = angular.module('app', []);

app.controller('overlay', ['$scope', '$http', function($scope, $http) {
/* 	TODO get this dynamically updated */
	$scope.event = {
		name : 'darts',
		scores : [
			{
				'name': 'matt', 
				'wins': 10, 
				'loses': 1,
				'played': 11,
				'win%' :0
			},
			{
				'name': 'bobby', 
				'wins': 11, 
				'loses': 12,
				'played': 23,
				'win%' :0
			}
		]
	};

	$scope.caculateWinPercentate = function(scoreCard) {
		return Math.round((scoreCard.wins / scoreCard.played) *100) /100 + '%';
	}

}]);
