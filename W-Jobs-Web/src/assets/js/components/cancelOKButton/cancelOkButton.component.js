(function () { 'use strict';

angular
	.module("app")
	.component("cancelOkButton", {
		templateUrl: paths.components.CANCE_OK_BUTTON + "cancelOkButton.template.html",
		controller: Controller,		
		controllerAs: "vm",
		bindings: {
			submitted: "="
		}
});

Controller.$inject = ['$window'];

function Controller ($window) {

	var vm = this;
	
	vm.goBack = function() {

		$window.history.back();
	}

}
})(); 