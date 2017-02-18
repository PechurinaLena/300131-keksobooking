'use strict';

window.synchronizeFields = (function () {
  return function (inputField, outputField, inputArray, outputArray, property) {
    var inputFieldsSync = function (evt) {
      var inputValue = inputField.value;
      var index = inputArray.indexOf(inputValue);
      var outputValue = outputArray[index];
      outputField[property] = outputValue;
    };
    inputField.addEventListener('change', inputFieldsSync);
  };
})();

