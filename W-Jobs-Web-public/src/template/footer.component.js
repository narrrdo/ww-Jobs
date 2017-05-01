(function () { 
	'use strict';

	angular
		.module("app")
		.component('pageFooter', {
			templateUrl: "template/footer.template.html",
			controller: Controller,		
			controllerAs: "vm",
			bindings: {
				
			}
	});	
			
	Controller.$inject = ['$translate'];
			
	function Controller ($translate) {

		var vm = this;
	

		vm.init = function() {

		}
	
	}
})(); 