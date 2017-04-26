(function () { 'use strict';

angular
	.module('app')
	.run(run);

	run.$inject = ['$rootScope','authManager','$transitions','tokenService','$state', 'permissionService'];

	function run($rootScope, authManager, $transitions, tokenService, $state, permissionService) { 

		var vm = this;
		
		$rootScope.lang = 'en';

		permissionService.load();

		authManager.checkAuthOnRefresh();
		authManager.redirectWhenUnauthenticated();
		$transitions.onStart({},hasStatePermission);
		//hasPermission.$inject = ['$transition'];

		function hasStatePermission($transition$) {

			var state = $transition$.$to();

			if(state.data) {
				
				var routePermissions = state.data.permissions;
				
				if(!hasPermission(routePermissions)) {

					tokenService.removeToken();
					$state.go(components.LOGIN.STATE);
				}
			}
		}

		$rootScope.hasPermission = hasPermission;

		function hasPermission(permList) {

			var userPermissions = tokenService.getPermissions();
			var hasPermission = false;
			var permissoionsList;

			permissoionsList = (_.isArray(permList)) ? permList  : [permList];

			permissoionsList.forEach(function(item){

			if(userPermissions.indexOf(permissions[item]) != -1) {

					hasPermission = true;
				}
			});

			return hasPermission;
		}

	}
})(); 