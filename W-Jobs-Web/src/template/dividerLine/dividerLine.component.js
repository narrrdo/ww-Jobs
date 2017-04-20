(function () { 'use strict';

angular
	.module('app')
	.component("dividerLine", {
		templateUrl: paths.components.DIVIDER_LINE + "dividerLine.template.html",
		controller: Controller,		
		controllerAs: "vm",
		bindings: {}
});

//Controller.$inject = [];

function Controller (roleDataService) {

}
})(); 