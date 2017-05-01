(function () { 'use strict';

	angular
		.module("app")
		.component("barSection", {
			templateUrl: paths.components.BAR_SECTION + "barSection.template.html",
			controller: Controller,		
			controllerAs: "vm",
			transclude: true,
			bindings: {
				
			}
	});

	Controller.$inject = [];

	function Controller () {

		var vm = this;

	}
})(); 