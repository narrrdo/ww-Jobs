(function () { 
	'use strict';

	angular
		.module("app")
		.component('pageTitle', {
			templateUrl: "template/title.template.html",
			controller: Controller,		
			controllerAs: "vm",
			bindings: {
				title: "="
			}
	});	
			
	Controller.$inject = ['$translate'];
			
	function Controller ($translate) {

		var vm = this;
	

		vm.init = function() {

		}
	
	}
})(); 