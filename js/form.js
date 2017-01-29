'use strict';
var pins = document.querySelectorAll('.pin');
var dialog = document.querySelector('.dialog');
var dialogClose = document.querySelector('.dialog__close');

function toggle() {
  for (var i = 0; i < pins.length; i++) {
    pins[i].classList.remove('pin--active');
            // dialog.style.display='none';
  }
  this.classList.add('pin--active');
}


dialogClose.addEventListener('click', function () {
  dialog.style.display="none";
//  здесь еще не доделано
});

for (var i = 0; i < pins.length; i++) {
  var element = pins[i];
  element.addEventListener('click', toggle);
}
