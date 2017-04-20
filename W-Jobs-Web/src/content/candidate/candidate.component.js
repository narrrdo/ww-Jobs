(function () { 'use strict';

	angular
		.module("app")
		.component(components.CANDIDATE.NAME, {
			templateUrl: paths.components.CANDIDATE + "candidate.template.html",
			controller: Controller,		
			controllerAs: "vm",
			bindings: {}
	});	
			
	Controller.$inject = ['candidateDataService'];
			
	function Controller (candidateDataService) {

		var vm = this;
		vm.tableCheck = {};
		vm.candidateList = {};

		vm.init = function() {

			vm.loadCandidates();
		}

		vm.loadCandidates = function() {

			candidateDataService.query().$promise.then(function(resp) {

				vm.candidateList = resp;

			}).catch(function(error) {
				console.log(error);
			});
		}

		vm.confirmDelete = function() {

			var list = vm.tableCheck.getCheckedItems();

			if (list.length > 0) {
				
				var resp = confirm('Confirm');

				if(resp) {

					vm.delete();
				}
			
			} else {

				alert('Debe seleccionar un candidato.');

			}
		}

		vm.delete = function() {

			var list = vm.tableCheck.getCheckedItems();

			angular.forEach(list, function(value, key) {

				console.log(value);

				candidateDataService.delete({id : value}).$promise.then(function(resp){
						
					vm.loadCandidates();

				}).catch(function(error) {
						
					alert(error);
				});
			});
		}

	}
})(); 