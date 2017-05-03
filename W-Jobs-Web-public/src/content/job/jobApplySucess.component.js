(function () { 
	'use strict';

	angular
		.module("app")
		.component('jobApplySucess', {
			templateUrl: "src/content/job/jobApplySucess.template.html",
			controller: Controller,
			controllerAs: "vm",
			bindings: {
				
			}
	});	
			
	Controller.$inject = [];
			
	function Controller () {

		var vm = this;

		vm.init = function() {

		}

	}
})(); 