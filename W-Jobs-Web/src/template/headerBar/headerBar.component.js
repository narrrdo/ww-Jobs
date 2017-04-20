(function () { 'use strict';
	angular
		.module('app')
		.component("headerBar", {
		templateUrl: paths.components.HEADER_BAR + "headerBar.template.html",
		controller: Controller,	
		controllerAs: "vm",
		bindings: {}
	});

	Controller.$inject = ['localeService', 'tokenService','$state'];

	function Controller (localeService, tokenService, $state) {

		var vm = this;

		vm.change = function(lang) {

			localeService.setLanguage(lang);
		}

		vm.logout = function() {

			tokenService.removeToken();

			$state.go(components.LOGIN.STATE);
		}

	}

})(); 

