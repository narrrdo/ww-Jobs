(function () { 'use strict';

	angular
		.module("app")
		.component(components.CANDIDATE.NAME, {
			templateUrl: paths.components.CANDIDATE + "candidate.template.html",
			controller: Controller,		
			controllerAs: "vm",
			bindings: {}
	});	
			
	Controller.$inject = ['candidateDataService', '$scope','$translate', 'toastr'];
			
	function Controller (candidateDataService, $scope, $translate, toastr) {

		var vm = this;
		vm.tableCheck = {};
		vm.candidateList = {};
		vm.filterExpanded = false;


			// vm.searchParams = {name : 'test', resume:['rrr','test']};
		vm.availableSearchParams = [
			{ key: "name", name: "Name", placeholder: "Name..." },
			{ key: "email", name: "Email", placeholder: "City..."},
			{ key: "resume", name: "Resume", placeholder: "Resume...", allowMultiple: true, suggestedValues: ['Java', '.Net', 'CSS'] }
		];

		
		vm.filertToggle = function() {

			vm.filterExpanded = !vm.filterExpanded;
		}

		vm.init = function() {

			vm.loadCandidates();
		}

		$scope.$on('advanced-searchbox:modelUpdated', function (event, model) {
			
			if(model.query || model.name || model.email || model.resume) {
				
				vm.search();

			} else {

				vm.loadCandidates();
			}
		});

		vm.search = function() {

			candidateDataService.search({q : vm.searchParams}).$promise.then(function(docs){

				vm.candidateList = docs;
				console.log(docs)
			}).then(function(error){

			});
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

				$translate('candidate_delete_warning_selectCandidate').then(function(msg) {
					toastr.warning(msg);
				});
			}
		}

		vm.delete = function() {

			var list = vm.tableCheck.getCheckedItems();

			angular.forEach(list, function(value, key) {

				candidateDataService.delete({id : value}).$promise.then(function(resp){
						
					$translate('candidate_delete_ok').then(function(msg){
						toastr.success(msg);
					});

					vm.loadCandidates();

				}).catch(function(error) {
						
					$translate('candidate_delete_error').then(function(msg){
						toastr.error(msg);
					});
				});
			});
		}

	}
})(); 