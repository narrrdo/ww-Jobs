angular.module('app').controller('JobDetailController', ['publishedJobsDataService','$state', function(publishedJobsDataService, $state) {

		var vm = this;
		vm.id = $state.params.id;

		vm.job = {};

		vm.init = function() {

			vm.loadJob();
		}

		vm.loadJob = function() {

			publishedJobsDataService.get({id : vm.id}).$promise.then(function(job){

				vm.job = job;
			})
		}

		vm.init();

}]);