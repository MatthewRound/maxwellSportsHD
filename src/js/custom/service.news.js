app.service('NewsService', function()
{
	this.push= function($scope, $http)
	{
		var ep = window.location.origin+ "/relay";
		var data = {};
		data.news = $scope.news;
		$http.post(ep, data)
			.success(function(data, status, headers, config) {
				$scope.ok = true;
			})
			.error(function(data, status, headers, config) {
				$scope.ok = false;
			});
	};
});
