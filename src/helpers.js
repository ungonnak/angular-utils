angular.module('uau.helpers', [])
  .factory('uauHelpers', ['$rootScope', function($rootScope) {
    return {
      applyServerValidationMessages: applyServerValidationMessages,
      filterValidationResponse: filterValidationResponse
    };

    function applyServerValidationMessages(messages, form, messagePool) {
      var validation = filterValidationResponse(messages);

      for (var container in validation) {
        if (validation[container] instanceof Object) {
          traverseFieldset(validation[container]);
        } else {
          processFormField(form[container], validation[container]);
        }
      }

      function traverseFieldset(fieldset) {
        for (var field in fieldset) {
          processFormField(form[field], fieldset[field]);
        }
      }

      function processFormField(field, message) {
        if (field &&
          field.hasOwnProperty('$invalid') &&
          field.hasOwnProperty('$error')
        ) {
          field.$invalid = true;
          field.$error.server = message;
        }

        if (messagePool) {
          messagePool.push(message);
        }
      }
    }

    function filterValidationResponse(response) {
      var filteredMessages = {};

      for (var item in response) {
        var message = response[item];
        var elements;

        if (message instanceof Array) {
          if (message.length == 1) {
            message = message[0];
          }
        }

        if (item.indexOf('.') >= 0) {
          elements = item.split('.');

          if (!filteredMessages[elements[0]]) {
            filteredMessages[elements[0]] = {};
          }

          filteredMessages[elements[0]][elements[1]] = message;
        } else {
          filteredMessages[item] = message;
        }
      }

      return filteredMessages;
    }
  }]);
