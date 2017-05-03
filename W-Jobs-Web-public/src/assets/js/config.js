(function () { 'use strict';

angular
	.module('app')
	.config(config);

	config.$inject = ['$translateProvider', '$httpProvider','toastrConfig'];

	function config($translateProvider, $httpProvider, toastrConfig) { 

		$translateProvider.useStaticFilesLoader({
				prefix: 'src/assets/js/resources/locale/',
				suffix: '.json'
			});

		$translateProvider.useSanitizeValueStrategy('sanitizeParameters');
		$translateProvider.preferredLanguage('en');

		$httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest'; 
		$httpProvider.defaults.headers.common["Accept-Language"] = "en";
		$httpProvider.defaults.headers["delete"] = {'Content-Type': 'application/json;charset=utf-8'};
		//$httpProvider.interceptors.push('headerInterceptor');

		angular.extend(toastrConfig, {
			closeButton: true,
			autoDismiss: false,
			containerId: 'toast-container',
			maxOpened: 0,    
			newestOnTop: true,
			positionClass: 'toast-top-right',
			preventDuplicates: false,
			preventOpenDuplicates: false,
			target: 'body'
		});
	}
})(); 