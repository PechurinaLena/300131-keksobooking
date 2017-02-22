'use strict';
(function () {
  var tokyoPins = document.querySelector('.tokyo__pin-map');
  var dialog = document.querySelector('.dialog');
  window.initializePins(tokyoPins, dialog);
  console.log('запущена функция window.initializePins');
  console.log(dialog);

  var inputTitle = document.getElementById('title');
  var inputPrice = document.getElementById('price');
  var inputAddress = document.getElementById('address');
  inputTitle.required = true;
  inputTitle.minLength = 30;
  inputTitle.maxLength = 100;
  inputPrice.required = true;
  inputPrice.setAttribute('type', 'number');
  inputPrice.min = 1000;
  inputPrice.max = 1000000;
  inputAddress.required = true;
  inputPrice.placeholder = 1000;
  var myForm = document.forms.my;
  var checkinTime = myForm.elements.time;
  var checkoutTime = myForm.elements.timeout;
  var housing = myForm.elements.type;
  var roomNumber = myForm.elements.room_number;
  var guestsNumber = myForm.elements.capacity;
  var checkinTimeValues = ['in12', 'in13', 'in14'];
  var checkoutTimeValues = ['out12', 'out13', 'out14'];
  var housingValues = ['apartment', 'hovel', 'palace'];
  var roomNumberValues = ['1', '2', '100'];
  var guestNumberValues = ['noguests', '3guests', '3guests'];
  var inputPriceValues = [1000, 0, 10000];

  window.synchronizeFields(checkinTime, checkinTimeValues, checkoutTimeValues, function (outputValue) {
    checkoutTime.value = outputValue;
  });
  window.synchronizeFields(checkoutTime, checkoutTimeValues, checkinTimeValues, function (outputValue) {
    checkinTime.value = outputValue;
  });

  window.synchronizeFields(housing, housingValues, inputPriceValues, function (outputValue) {
    inputPrice.min = outputValue;
    inputPrice.placeholder = outputValue;
  });

  window.synchronizeFields(roomNumber, roomNumberValues, guestNumberValues, function (outputValue) {
    guestsNumber.value = outputValue;
  });

  window.synchronizeFields(guestsNumber, guestNumberValues, roomNumberValues, function (outputValue) {
    roomNumber.value = outputValue;
  });

})();


