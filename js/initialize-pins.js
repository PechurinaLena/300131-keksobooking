'use strict';

window.initializePins = function (mapElement, dialogElement) {
  var dialogClose = document.querySelector('.dialog__close');
  var activePin = document.querySelector('.pin--active');
  var ENTER_KEY_CODE = 13;
  var ESCAPE_KEY_CODE = 27;

  var showDialog = function () {
    dialogElement.style.display = 'block';
    dialogClose.focus();
  };

  var pinsClickHandler = function (evt) {
    if (evt.type === 'keydown' && evt.keyCode !== ENTER_KEY_CODE) {
      return;
    }

    var target = evt.target;
    while (target !== evt.currentTarget) {
      if (target) {
        if (target.classList.contains('pin')) {
          if (activePin) {
            activePin.classList.remove('pin--active');
          }
          target.classList.add('pin--active');
          showDialog();
          activePin = target;
          return;
        }
        target = target.parentNode;
      }
    }
  };
  mapElement.addEventListener('click', pinsClickHandler, true);
  mapElement.addEventListener('keydown', pinsClickHandler, true);
  var dialogClickHandler = function (event) {
    if (event.keyCode === ESCAPE_KEY_CODE || event.keyCode === ENTER_KEY_CODE || event.type === 'click') {
      dialogElement.style.display = 'none';
      dialogClose.setAttribute('aria-pressed', 'true');
    }
  };
  dialogElement.addEventListener('click', dialogClickHandler);
  dialogElement.addEventListener('keydown', dialogClickHandler);
};
