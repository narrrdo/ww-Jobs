(function () { 'use strict';

	angular
		.module("app")
		.component(components.JOB_MODAL_PREVIEW.NAME, {
			templateUrl: paths.components.JOB_MODAL_PREVIEW + "preview.template.html",
			controller: Controller,		
			controllerAs: "vm",
			bindings: {
				job : "="
			}
	});	
			
	Controller.$inject = [];
			
	function Controller () {

		var vm = this;


		vm.init = function() {

		}

	}
})(); 