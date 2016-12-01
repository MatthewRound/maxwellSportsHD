var app = angular.module('app', []);

app.controller('overlay', ['$scope', '$http', function($scope, $http) {
/* 	TODO get this dynamically updated */
	$scope.events = [
		{
			name : 'darts',
			scores : [
				{
					'name': 'matt', 
					'wins': 10, 
					'loses': 1,
					'played': 11,
				},
				{
					'name': 'bobby', 
					'wins': 11, 
					'loses': 12,
					'played': 23,
				},
				{
					'name': 'chris', 
					'wins': 12, 
					'loses': 12,
					'played': 23,
				},
				{
					'name': 'tom', 
					'wins': 1, 
					'loses': 12,
					'played': 23,
				},
				{
					'name': 'al', 
					'wins': 1, 
					'loses': 12,
					'played': 23,
				},
				{
					'name': 'other', 
					'wins': 2, 
					'loses': 12,
					'played': 23,
				}
			]
		},
		{
			name : 'pool',
			scores : [
				{
					'name': 'matt', 
					'wins': 10, 
					'loses': 1,
					'played': 11,
				},
				{
					'name': 'bobby', 
					'wins': 11, 
					'loses': 12,
					'played': 23,
				},
				{
					'name': 'chris', 
					'wins': 12, 
					'loses': 12,
					'played': 23,
				},
				{
					'name': 'tom', 
					'wins': 1, 
					'loses': 12,
					'played': 23,
				},
				{
					'name': 'al', 
					'wins': 1, 
					'loses': 12,
					'played': 23,
				},
				{
					'name': 'other', 
					'wins': 2, 
					'loses': 12,
					'played': 23,
				}
			]
		},
		{
			name : 't-ten',
			scores : [
				{
					'name': 'matt', 
					'wins': 10, 
					'loses': 1,
					'played': 11,
				},
				{
					'name': 'bobby', 
					'wins': 11, 
					'loses': 12,
					'played': 23,
				},
				{
					'name': 'chris', 
					'wins': 12, 
					'loses': 12,
					'played': 23,
				},
				{
					'name': 'tom', 
					'wins': 1, 
					'loses': 12,
					'played': 23,
				},
				{
					'name': 'al', 
					'wins': 1, 
					'loses': 12,
					'played': 23,
				},
				{
					'name': 'other', 
					'wins': 2, 
					'loses': 12,
					'played': 23,
				}
			]
		},
	];


	$scope.caculateWinPercentate = function(scoreCard) {
		return (Math.round((scoreCard.wins / scoreCard.played) * 100) /100)*100;
	}

	$scope.date = new Date();

}]);
