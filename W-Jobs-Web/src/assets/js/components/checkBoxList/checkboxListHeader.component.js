(function () { 'use strict';

angular
	.module("app")
	.component("checkboxListHeader", {
		templateUrl: paths.components.CHECKBOX_LIST + "checkboxListHeader.template.html",
		controller: Controller,		
		controllerAs: "vm",
		bindings: {
			tableCheck: "=" 
		}
});

Controller.$inject = [];

function Controller () {

	var vm = this;
	
	vm.tableCheck.header = false;

	vm.checkListItems = function() {

		angular.forEach(vm.tableCheck.item, function(value, key) {

			vm.tableCheck.item[key] = vm.tableCheck.header;
		});	
	}

	vm.tableCheck.getCheckedItems = function() {

		var list = new Array();

		angular.forEach(vm.tableCheck.item, function(value, key) {

			if(vm.tableCheck.item[key]) {

				list.push(key);
			}
		});		

		return list;	
	}

	vm.tableCheck.reset = function() {

		vm.tableCheck.item = {};
	}

}
})(); 