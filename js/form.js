'use strict';

var tokyoPins = document.querySelector('.tokyo__pin-map');
var dialog = document.querySelector('.dialog');
var dialogClose = document.querySelector('.dialog__close');
var activePin;
var ENTER_KEY_CODE = 13;
var ESCAPE_KEY_CODE = 27;

var pinsClickHandler = function (evt) {
  if (evt.type === 'keydown' && evt.keyCode !== ENTER_KEY_CODE) {
    return;
  }
  var target = evt.target;
  while (target !== evt.currentTarget) {
    target = target.parentNode;
    if (target.classList.contains('pin')) {
      if (activePin) {
        activePin.classList.remove('pin--active');
      }
      target.classList.add('pin--active');
      dialog.style.display = 'block';
      dialogClose.focus();
      activePin = target;
      return;
    }
  }

};

tokyoPins.addEventListener('click', pinsClickHandler, true);
tokyoPins.addEventListener('keydown', pinsClickHandler, true);

dialogClose.addEventListener('click', function () {
  dialog.style.display = 'none';
});

dialogClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESCAPE_KEY_CODE || evt.keyCode === ENTER_KEY_CODE) {
    dialog.style.display = 'none';
    dialogClose.setAttribute('aria-pressed', 'true');
  }
});

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
