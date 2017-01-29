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
