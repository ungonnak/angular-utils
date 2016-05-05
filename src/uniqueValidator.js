angular.module('uau.uniqueValidator', [])
  .directive('unique', ['$http', '$timeout', function($http, $timeout) {
    return {
      require: '?ngModel',
      restrict: 'A',
      link: link
    };

    function link($scope, node, attrs, ngModelController) {
      if (!ngModelController) return;

      var timeout;
      var element = angular.element(node);

      ngModelController.$validators.unique = validateUnique;

      attrs.$observe('unique', function() {
        ngModelController.$validate();
      });

      function validateUnique(modelValue, viewValue) {
        if (element.is('input')) {
          element.on('keyup', function() {
            $timeout.cancel(timeout);
            timeout = $timeout(doValidation, 500);
          });
        } else {
          doValidation();
        }

        function doValidation() {
          $http({
            method: 'GET',
            url: '/api/ajaxValidation/unique',
            params: {
              model: attrs.unique,
              field: ngModelController.$name,
              value: modelValue,
              ignore: attrs.ignore || null
            }
          })
            .then(checkSuccessful);

          function checkSuccessful(response) {
            ngModelController.$setValidity('unique', response.data.status);

            if (response.data.message) {
              ngModelController.$error.uniqe = response.data.message;
            }
          }
        }

        return true;
      }
    }
  }]);
