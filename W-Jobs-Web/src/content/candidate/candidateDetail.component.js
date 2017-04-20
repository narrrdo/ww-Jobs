(function () { 'use strict';

	angular
		.module("app")
		.component(components.CANDIDATE_DETAIL.NAME, {
			templateUrl: paths.components.CANDIDATE_DETAIL + "candidateDetail.template.html",
			controller: Controller,		
			controllerAs: "vm",
			bindings: {}
	});	
			
	Controller.$inject = ['candidateDataService', '$state'];
			
	function Controller (candidateDataService, $state) {

		var vm = this;

		vm.id = $state.params.id;

		vm.candidate = {};

		vm.init = function() {

			if(vm.id) {
				vm.loadCandidate();
			}
		}

		vm.loadCandidate = function() {

			candidateDataService.get({id : vm.id}).$promise.then(function(candidate){

				vm.candidate = candidate;

			}).catch(function(error){
				console.log(error);
				alert(error);
			});
		}

		vm.save = function(form, candidate) {

			if(form.$valid) {

				if(!vm.id) {

					candidateDataService.save(candidate).$promise.then(function(resp){

						$state.go(components.CANDIDATE.STATE);

					}).catch(function(error){
						console.log(error);
						alert(error);
					})

				} else {

				}
			}
		}

	}
})(); 