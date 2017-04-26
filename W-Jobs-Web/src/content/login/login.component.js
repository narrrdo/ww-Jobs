(function () { 'use strict';

	angular
		.module("app")
		.component("login", {
			templateUrl: paths.components.LOGIN + "login.template.html",
			controller: Controller,		
			controllerAs: "vm",
			bindings: {}
	});

	Controller.$inject = ['$state','loginDataService','tokenService','localeService','authManager','permissionService'];

	function Controller ($state, loginDataService, tokenService, localeService, authManager, permissionService) {

		var vm = this;
		
		vm.login = {};

		vm.doLogin = function(form, login) {

			if(form.$valid) {

				loginDataService.token(login).$promise.then(function(token){

					tokenService.setFullToken(token);

					var locale = tokenService.getLocale();

					localeService.setLanguage(locale);

					authManager.authenticate();

					permissionService.load();

					$state.go(components.DASHBOARD.STATE);

				}).catch(function(error){
					alert(error);
					console.log(error);
				});
			}
		}
		
	}
})(); 