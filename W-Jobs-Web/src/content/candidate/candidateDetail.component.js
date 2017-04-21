(function () { 'use strict';

	angular
		.module("app")
		.component(components.CANDIDATE_DETAIL.NAME, {
			templateUrl: paths.components.CANDIDATE_DETAIL + "candidateDetail.template.html",
			controller: Controller,		
			controllerAs: "vm",
			bindings: {}
	});	
			
	Controller.$inject = ['candidateDataService', '$state','FileUploader', '$timeout','$scope'];
			
	function Controller (candidateDataService, $state, FileUploader, $timeout,$scope) {

		var vm = this;

		vm.id = $state.params.id;
		vm.document = {};
		vm.candidate = {};
		
		var ep = 'http://localhost:3000/candidates/';

		vm.uploader = new FileUploader({
				url: ep + ((vm.id) ? vm.id : ''),
				formData : [vm.candidate],
				method : vm.id ? 'PUT' : 'POST' 
			});

			vm.uploader.filters.push({
				name: 'file-type',
				fn: function(item /*{File|FileLikeObject}*/, options) {
						
						var resp = (item.type === "application/pdf");

						return resp;
				}
			});

			vm.uploader.filters.push({
				name: 'file-size',
				fn: function(item) {
						
						var resp = (item.size <= 2000000);

						return resp;
				}
			});

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

			}).catch(function(error){
				console.log(error);
				alert(error);
			});
		}

		vm.save = function(form, candidate) {

			if(form.$valid) {

				if(!vm.id) {

					vm.uploader.queue[0].upload();

				} else {

					if(vm.uploader.queue[0]) {

						vm.uploader.queue[0].upload();

					} else {

						candidateDataService.update({id : vm.id}, vm.candidate).$promise.then(function(doc){

							$state.go(components.CANDIDATE.STATE);

						}).catch(function(error){
							alert(error);
						});
					}
				}
			}
		}

		vm.clickUpload = function() {

			// $timeout(function() { 
			// 		$scope.$apply()
					//document.querySelector('#uploadBtn').click();
					document.getElementById('uploadBtn').click()   
					//angular.element('#uploadBtn').trigger('click');
				// },0)
		}

		vm.uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
            
			if(filter.name === "file-type") {
				alert('El resume debe ser en formato PDF');
			}

			if(filter.name === "file-size") {
				alert('El tamaño del resume no puedeexeder 2MB.');
			}

		console.info('onWhenAddingFileFailed', item, filter, options);

		};
			
		vm.uploader.onAfterAddingFile = function(fileItem) {
					
			vm.document = fileItem.file;
						
			console.info('onAfterAddingFile', fileItem);
		};

		vm.uploader.onSuccessItem = function(fileItem, response, status, headers) {
			console.info('onSuccessItem', fileItem, response, status, headers);

			$state.go(components.CANDIDATE.STATE);
		};
		vm.uploader.onErrorItem = function(fileItem, response, status, headers) {
			console.info('onErrorItem', fileItem, response, status, headers);
		};


	}
})(); 