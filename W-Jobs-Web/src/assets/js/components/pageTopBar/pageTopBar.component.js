(function () { 'use strict';

	angular
		.module("app")
		.component("pageTopBar", {
			templateUrl: paths.components.PAGE_TOP_BAR + "pageTopBar.template.html",
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