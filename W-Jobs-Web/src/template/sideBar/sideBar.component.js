// angular
// 	.module('app')
angular
	.module('app')
	.component("sideBar", {
	templateUrl: paths.components.SIDE_BAR + "sideBar.template.html",
	bindings: {
		toggle: "="
	},
	controllerAs: 'vm',
	controller: function SideController ($scope, $cookieStore, $state) {

		var vm = this;
    var mobileView = 992;

		vm.components = components;
		

    vm.getWidth = function() {
        return window.innerWidth;
    };

    $scope.$watch(vm.getWidth, function(newValue, oldValue) {
        
			if (newValue >= mobileView) {
				if (angular.isDefined($cookieStore.get('toggle'))) {
					vm.toggle = ! $cookieStore.get('toggle') ? false : true;
				} else {
					vm.toggle = true;
				}
			} else {
					vm.toggle = false;
			}

    });

    vm.toggleSidebar = function() {
        
			vm.toggle = !vm.toggle;
			$cookieStore.put('toggle', vm.toggle);
    };

    window.onresize = function() {
			$scope.$apply();
    };

		vm.go = function(){

			$state.go('app.security');
		}
	}
});