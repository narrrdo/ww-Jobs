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
		$transitions.onStart({},hasPermission);
		//hasPermission.$inject = ['$transition'];

		function hasPermission($transition$) {

			var state = $transition$.$to();

			if(state.data) {
				
				var routePermissions = state.data.permissions;
				var userPermissions = tokenService.getPermissions();
				var hasPermission = false;

				routePermissions.forEach(function(item){

					if(userPermissions.indexOf(permissions[item]) != -1) {

						hasPermission = true;
					}
				});

				if(!hasPermission) {

					tokenService.removeToken();
					$state.go(components.LOGIN.STATE);
				}
			}
		}

	}
})(); 