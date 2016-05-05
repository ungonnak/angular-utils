angular.module('uau.feedbackIcon', [])
  .directive('feedbackIcon', function() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'uau/templates/feedback-icon.html',
      link: link
    };

    function link($scope, node, attrs) {
      var icon = angular.element(node);

      $scope.$watchCollection(attrs.for, evaluate);

      function evaluate(target) {
        if (!target) return;

        resetClasses();

        if (target.$invalid && (target.$touched || target.$dirty)) {
          icon.addClass('glyphicon-remove');
        } else if (target.$valid) {
          icon.addClass('glyphicon-ok');
        } else {
          if (attrs.initial) {
            icon.addClass(attrs.initial);
          }
        }

        function resetClasses() {
          icon.removeClass('glyphicon-warning');
          icon.removeClass('glyphicon-remove');
          icon.removeClass('glyphicon-ok');

          if (attrs.initial) {
            icon.removeClass(attrs.initial);
          }
        }
      }
    }
  });
