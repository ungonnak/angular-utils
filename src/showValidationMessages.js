angular.module('uau.showValidationMessages', ['ngMessages'])
  .directive('showValidationMessages', function() {
    return {
      require: 'ngMessages',
      restrict: 'A',
      link: link
    };

    function link($scope, node, attrs) {
      var element = angular.element(node);

      $scope.$watchCollection(attrs.of, evaluate);

      function evaluate(target) {
        if (!target) return;

        if (
          (target.$dirty || target.$touched) &&
          Object.keys(target.$error).length > 0
        ) {
          element.show();
        } else {
          element.hide();
        }
      }
    }
  });
