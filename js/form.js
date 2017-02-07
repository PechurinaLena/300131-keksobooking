'use strict';

var tokyoPins = document.querySelector('.tokyo__pin-map');
var dialog = document.querySelector('.dialog');
window.initializePins(tokyoPins, dialog);

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

window.synchronizeFields(checkinTime, checkoutTime, checkinTimeValues, checkoutTimeValues, 'value');
window.synchronizeFields(checkoutTime, checkinTime, checkoutTimeValues, checkinTimeValues, 'value');
window.synchronizeFields(housing, inputPrice, housingValues, inputPriceValues, 'min');
window.synchronizeFields(housing, inputPrice, housingValues, inputPriceValues, 'placeholder');
window.synchronizeFields(roomNumber, guestsNumber, roomNumberValues, guestNumberValues, 'value');
window.synchronizeFields(guestsNumber, roomNumber, guestNumberValues, roomNumberValues, 'value');
