app.service('AdminService', function()
{

	this.getInfo = function($scope, $http) {
		var ep = "/admin/info";
		$http.get(ep)
			.success(function(data, status, headers, config) {
				$scope.clientCount = data.clientCount;
			});
	};
});
