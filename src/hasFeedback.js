angular.module('uau.hasFeedback', [])
  .directive('hasFeedback', function() {
    return {
      restrict: 'A',
      link: link
    };

    function link($scope, node, attrs) {
      var element = angular.element(node);

      if (!element.hasClass('.has-feedback')) {
        element.addClass('has-feedback');
      }

      $scope.$watchCollection(attrs.for, evaluate);

      function evaluate(target) {
        if (!target) return;

        resetClasses();

        if (target.$invalid && (target.$touched || target.$dirty)) {
          element.addClass('has-error');
        } else if (target.$valid) {
          element.addClass('has-success');
        } else {
          if (attrs.initialFeedback) {
            element.addClass(attrs.initialFeedback);
          }
        }

        function resetClasses() {
          element.removeClass('has-error');
          element.removeClass('has-success');
          element.removeClass('has-warning');

          if (attrs.initialFeedback) {
            element.removeClass(attrs.initialFeedback);
          }
        }
      }
    }
  });
