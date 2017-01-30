'use strict';
var pins = document.querySelectorAll('.pin');
var dialog = document.querySelector('.dialog');
var dialogClose = document.querySelector('.dialog__close');

function toggle() {
  for (var i = 0; i < pins.length; i++) {
    pins[i].classList.remove('pin--active');
  }
  this.classList.add('pin--active');
  dialog.style.display = 'block';
}


dialogClose.addEventListener('click', function () {
  dialog.style.display = 'none';
});

for (var i = 0; i < pins.length; i++) {
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
var checkinTime = myForm.elements.time; //массив options с временем заезда
var checkoutTime = myForm.elements.timeout; //массив options с временем выезда
var housing = myForm.elements.type;
console.log(housing);

function checkinTimeChanged() {
  checkoutTime.value = checkinTime.value;
}
function checkoutTimeChanged() {
  checkinTime.value = checkoutTime.value;
}

function housingTypeChanged() {
  for (var i = 0; i < housing.options.length; i++) {
    var option = housing.options[i];
    if (option.selected) {
      switch (option.value) {
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
  }

}

checkinTime.addEventListener('change', checkinTimeChanged);
checkoutTime.addEventListener('change', checkoutTimeChanged);
housing.addEventListener('change', housingTypeChanged);
