(function () { 'use strict';

	angular
		.module("app")
		.component(components.CANDIDATE_DETAIL.NAME, {
			templateUrl: paths.components.CANDIDATE_DETAIL + "candidateDetail.template.html",
			controller: Controller,		
			controllerAs: "vm",
			bindings: {}
	});	
			
	Controller.$inject = ['candidateDataService', '$state','FileUploader', '$timeout','$scope','API_END_POINT','tokenService', 'toastr','$translate'];
			
	function Controller (candidateDataService, $state, FileUploader, $timeout,$scope, API_END_POINT, tokenService, toastr, $translate) {

		var vm = this;

		vm.id = $state.params.id;
		vm.document = {};
		vm.candidate = {};
		vm.candidate.resume = {};
		vm.candidate.resume.toUpdate = false;
		
		vm.uploader = new FileUploader();

		vm.init = function() {
			
			if(vm.id) {

				vm.loadCandidate();
			}
		}

		vm.loadCandidate = function() {

			candidateDataService.get({id : vm.id}).$promise.then(function(candidate){

				vm.candidate.name = candidate.name;
				vm.candidate.lastName = candidate.lastName;
				vm.candidate.tel = candidate.tel;
				vm.candidate.email = candidate.email;
				vm.candidate.hasResume = candidate.hasResume;

			}).catch(function(error){
				
			});
		}

		vm.save = function(form, candidate) {

			if(form.$valid) {

				if(vm.uploader.queue[0]) {

					vm.uploader.queue[0].upload();

				} else {

					if(!vm.id) {

						candidateDataService.save(vm.candidate).$promise.then(function(doc){

							$translate('candidateDetail_save_ok').then(function(msg){
								toastr.success(msg);
							});

							$state.go(components.CANDIDATE.STATE);

						}).catch(function(error){
							
							$translate('candidateDetail_save_error').then(function(msg) {
								toastr.success(msg);
							});
						});

					} else {

						candidateDataService.update({id : vm.id}, vm.candidate).$promise.then(function(doc){

							$translate('candidateDetail_update_ok').then(function(msg){
								toastr.success(msg);
							});

							$state.go(components.CANDIDATE.STATE);

						}).catch(function(error){
							
							$translate('candidateDetail_update_error').then(function(msg) {
								toastr.error(msg);
							});
						});
					}
				}
			}
		}

		vm.viewResume = function() {

			window.open(API_END_POINT + 'candidates/'+ vm.id +'/resume/pdf','_blank', 
					"width=1300, height=750, toolbar=no, menubar=no, location=no, directories=no, status=no, titlebar=no");
		}

		vm.removeResume = function() {

			vm.candidate.hasResume = false;
			vm.candidate.toUpdateResume = true;
		}

	}
})(); 