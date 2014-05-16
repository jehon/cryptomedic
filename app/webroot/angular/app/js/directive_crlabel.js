'use strict';

// https://docs.angularjs.org/guide/directive

cryptoApp.directive('crLabel', [ function() {
    function link(scope, element, attrs) {
        element.text(attrs.crLabel);
    }
	
    return { link: link };
//	return {
////		restrict: 'E',
//		scope: {
//			'label': "=for"
//		},
//		template: "<label for='{{label}}'>{{label}}</label>"
//	};
}]);
