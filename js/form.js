'use strict';
var pins = document.querySelectorAll('.pin');
var dialog = document.querySelector('.dialog');
var dialogClose = document.querySelector('.dialog__close');
var i;

function toggle(evt) {
  for (i = 0; i < pins.length; i++) {
    pins[i].classList.remove('pin--active');
  }
  evt.target.classList.add('pin--active');
  dialog.style.display = 'block';
}


dialogClose.addEventListener('click', function () {
  dialog.style.display = 'none';
});

for (i = 0; i < pins.length; i++) {
  var element = pins[i];
  element.addEventListener('click', toggle);
}

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
var checkinTime = myForm.elements.time; // элемент select со временами въезда
var checkoutTime = myForm.elements.timeout; // элемент select со временами выезда
var housing = myForm.elements.type;
var roomNumber = myForm.elements.room_number;
var guestsNumber = myForm.elements.capacity;

function checkinTimeChanged() {
  checkoutTime.value = checkinTime.value;
}
function checkoutTimeChanged() {
  checkinTime.value = checkoutTime.value;
}

function housingTypeChanged() {
  switch (housing.value) {
    case 'apartment':
      inputPrice.min = 1000;
      inputPrice.placeholder = 1000;
      break;
    case 'hovel':
      inputPrice.min = 0;
      inputPrice.placeholder = 0;
      break;
    case 'palace':
      inputPrice.min = 10000;
      inputPrice.placeholder = 10000;
      break;
  }
}


function roomNumberChanged() {
  switch (roomNumber.value) {
    case '1':
      guestsNumber.value = 'noguests';
      break;
    case '2':
      guestsNumber.value = '3guests';
      break;
    case '100':
      guestsNumber.value = '3guests';
      break;
  }
}

checkinTime.addEventListener('change', checkinTimeChanged);
checkoutTime.addEventListener('change', checkoutTimeChanged);
housing.addEventListener('change', housingTypeChanged);
roomNumber.addEventListener('change', roomNumberChanged);
