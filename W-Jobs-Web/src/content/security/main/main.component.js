(function () { 'use strict';

	angular
		.module("app")
		.component("securityMain", {
			templateUrl: paths.components.SECURITY_MAIN + "main.template.html",
			controller: Controller,		
			controllerAs: "vm",
			bindings: {}
	});	
			
	Controller.$inject = [];
			
	function Controller () {

		var vm = this;
			
	}
})(); 