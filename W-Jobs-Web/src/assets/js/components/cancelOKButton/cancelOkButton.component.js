(function () { 'use strict';

angular
	.module("app")
	.component("cancelOkButton", {
		templateUrl: paths.components.CANCE_OK_BUTTON + "cancelOkButton.template.html",
		controller: Controller,		
		controllerAs: "vm",
		bindings: {
			submitted: "=",
			permission: "="
		}
});

Controller.$inject = ['$window','$rootScope'];

function Controller ($window, $rootScope) {

	var vm = this;

	vm.goBack = function() {

		$window.history.back();
	}

}
})(); 