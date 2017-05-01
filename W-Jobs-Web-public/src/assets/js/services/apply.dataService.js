(function () {
  'use strict';

  angular
    .module('app')
    .factory('applyJobDataService', service);

  service.$inject = ['$resource','API_END_POINT'];

  function service($resource, API_END_POINT) {
    return $resource(API_END_POINT + 'public/jobs/apply', { id: '@Id' }, {

    });
  }
})();