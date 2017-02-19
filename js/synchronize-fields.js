'use strict';

window.synchronizeFields = (function () {
  return function (inputField, inputArray, outputArray, callback) {
    var inputFieldsSync = function (evt) {
      var inputValue = inputField.value;
      var index = inputArray.indexOf(inputValue);
      var outputValue = outputArray[index];
      callback(outputValue);
    };
    inputField.addEventListener('change', inputFieldsSync);
  };
})();

