angular.module('uau.matchValidator', [])
  .directive('match', function() {
    return {
      require: 'ng-model',
      link: link
    };

    function link($scope, node, attrs, ngModelController) {
      var element = angular.element(node);
      var target = angular.element('#' + attrs.match);

      element.on('keyup', function() {
        $scope.$apply(function() {
          if (target.val() === '') {
            ngModelController.$setValidity('match', true);
          }

          if (element.val() !== '') {
            ngModelController.$validate();
          }
        });
      });

      ngModelController.$validators.match = matchValidator;

      attrs.$observe('match', function() {
        ngModelController.$validate();
      });

      function matchValidator(modelValue, viewValue) {
        return element.val() === target.val();
      }
    }
  });
