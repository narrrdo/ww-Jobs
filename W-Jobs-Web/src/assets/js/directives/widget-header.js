/**
 * Widget Header Directive
 */

angular
    .module('app')
    .directive('rdWidgetHeader', rdWidgetTitle);

function rdWidgetTitle() {
    var directive = {
        requires: '^rdWidget',
        scope: {
            title: '@',
            icon: '@'
        },
        transclude: true,
        //templateUrl: '<div class="widget-header"><div class="row"><div class="pull-left"><i class="fa" ng-class="icon"></i> {{title}} </div><div class="pull-right col-xs-6 col-sm-4" ng-transclude></div></div></div>',
        templateUrl: 'src/assets/js/directives/widget-header.template.html',
        restrict: 'E'
    };
    return directive;
};