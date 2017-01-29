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
