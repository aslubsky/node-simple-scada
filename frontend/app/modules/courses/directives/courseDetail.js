define(['app', 'modernizr'], function(app) {

    // https://gist.github.com/edankwan/4389601
    window.Modernizr.addTest('csstransformspreserve3d', function () {
        var prop = Modernizr.prefixed('transformStyle');
        var val = 'preserve-3d';
        var computedStyle;
        if(!prop) return false;

        prop = prop.replace(/([A-Z])/g, function(str,m1){ return '-' + m1.toLowerCase(); }).replace(/^ms-/,'-ms-');

        window.Modernizr.testStyles('#modernizr{' + prop + ':' + val + ';}', function (el, rule) {
            computedStyle = window.getComputedStyle ? getComputedStyle(el, null).getPropertyValue(prop) : '';
        });

        return (computedStyle === val);
    });

    app.directive('courseDetail', ['$location', 'requestsFactory', function ($location, requestsFactory) {
        return {
            restrict: 'A',
            scope: {
                'course': '=courseDetail'
            },
            require: '?ngModel',
            template: '<figure class="course-details" ng-class="{\'details-open\': showDetails}"><div ng-click="showDetails = !showDetails" style="cursor: pointer">' +
                '<div class="book">' +
                '<div class="cover"><div class="front"><img ng-src="{{course.icon_thumb}}" /></div><div class="inner inner-left"></div></div><div class="inner inner-right"></div>' +
                '<div class="perspective"></div>' +
                '</div>' +
            '<figcaption><h2>{{course.title}} <span></span></h2></figcaption>' +
            '<div class="details">' +
                '<ul>' +
                    '<li ng-bind-html="course.annotation"></li>' +
                    '<li ng-if="course.course_length"><strong>{{\'Продолжительность (в днях)\'|translate}}:</strong> {{course.course_length}}</li>' +
                    '<li ng-if="course.score_employment"><strong>{{\'Занятость\'|translate}}:</strong> {{course.score_employment}}</li>' +
                    '<li>{{course.created_at| date:\'yyyy-MM-dd\'}}</li>' +
                '</ul>' +
            '</div></div>' +
                '<div class="text-center">' +
                '<button ng-show="!course.task_id" class="btn btn-warning" ng-click="goTo(course)">{{\'Начать обучение\'|translate}} <i class="fa fa-arrow-right"></i></button>' +
                '<button ng-show="course.task_id" class="btn btn-success" ng-click="goTo(course)">{{\'Продолжить обучение\'|translate}} <i class="fa fa-arrow-right"></i></button>' +
                '</div>' +
                '</figure>',
            link: function (scope, element, attrs, controller) {

                scope.goTo = function(course) {
                    if(course.task_id) {
                        $location.$$search = {restore: true};
                        $location.path('/courses/execute/'+course.task_id);
                    } else {
                        var req = new requestsFactory({course_id: course.id});
                        req.$save(function(res) {
                            $location.$$search = {restore: true};
                            $location.path('/courses/execute/'+res.id);
                        }, function (res) {
                            scope.loading = false;
                            if (res.status == 400) {
                                scope.errors = res.data;
                            }
                            if (res.status == 500) {
                                scope.notify(res.status, 'danger');
                            }
                        });
                    }
                }
            }
        };
    }]);
});