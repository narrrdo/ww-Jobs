(function () { 
	'use strict';

	angular
		.module("app")
		.component('pageHeader', {
			templateUrl: "src/template/header.template.html",
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

		vm.changeLanguage = function(lang) {

			$translate.use(lang);
		}

	
	}
})(); 