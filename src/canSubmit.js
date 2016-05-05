angular.module('uau.canSubmit', [])
  .directive('canSubmit', ['$timeout', function() {
    return {
      restrict: 'A',
      link: link,
      scope: {
        canSubmit: '='
      }
    };

    function link($scope, node, attrs) {
      var element = angular.element(node);

      if (attrs.triggerValidation !== undefined) {
        element.on('click', function() {
          triggerValidation($scope.canSubmit);
        });
      } else {
        $scope.$watchCollection(
          function() { return $scope.canSubmit; },
          evaluate
        );
      }

      function evaluate(form) {
        if (form.$invalid) {
          element.prop('disabled', true);
        } else {
          element.prop('disabled', false);
        }
      }

      function triggerValidation(form) {
        for (var item in form) {
          if (!form.hasOwnProperty(item)) {
            continue;
          }

          if (form[item] && form[item].$setTouched) {
            form[item].$setTouched();
            delete(form[item].$error.server);
          }
        }
      }
    }
  }]);
