angular.module('uau.currency', [])
  .directive('currency', ['$filter', function($filter) {
    return {
      require: 'ngModel',
      restrict: 'A',
      link: link
    };

    function link($scope, node, attrs, ngModelController) {
      var decimalPlaces = attrs.decimalPlaces ? attrs.decimalPlaces : 2;

      ngModelController.$formatters.push(formatter);
      ngModelController.$parsers.push(parser);

      function formatter(data) {
        return $filter('currency')(data, '');
      }

      function parser(data) {
        var parsed = 0;
        var number = data.toString().replace(/\D+/g, '');
        var significative = number.substring(0, number.length - decimalPlaces);
        var decimals = number.substring(number.length - decimalPlaces);

        if (!significative) {
          significative = 0;
        }

        if (!decimals) {
          decimals = 0;
        }

        significative = (parseInt(significative)).toString();
        decimals = parseInt(decimals).toString();

        if (decimals.length < decimalPlaces) {
          decimals = (new Array(decimalPlaces - decimals.length + 1)).join(0) +
            decimals;
        }

        parsed = Number(significative + '.' + decimals);

        ngModelController.$viewValue = formatter(parsed);
        ngModelController.$render();

        return parsed;
      }
    }
  }]);
