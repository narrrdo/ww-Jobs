(function () { 'use strict';

	angular
		.module("app")
		.component(components.JOB_MODAL_CANDIDATE.NAME, {
			templateUrl: paths.components.JOB_MODAL_CANDIDATE + "candidate.template.html",
			controller: Controller,		
			controllerAs: "vm",
			bindings: {
				candidates : "="
			}
	});	
			
	Controller.$inject = ['API_END_POINT'];
			
	function Controller (API_END_POINT) {

		var vm = this;


		vm.init = function() {

		}

		vm.viewResume = function(id) {

			window.open(API_END_POINT + 'candidates/'+ id +'/resume/pdf','_blank', 
					"width=1300, height=750, toolbar=no, menubar=no, location=no, directories=no, status=no, titlebar=no");
		}

	}
})(); 