'use strict';

window.initializePins = function (element, evt) {
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
  element.addEventListener('click', pinsClickHandler, true);
  element.addEventListener('keydown', pinsClickHandler, true);
  var dialogClickHandler = function (event) {
    if (event.keyCode === ESCAPE_KEY_CODE || event.keyCode === ENTER_KEY_CODE || event.type === 'click') {
      dialog.style.display = 'none';
      dialogClose.setAttribute('aria-pressed', 'true');
    }
  };
  element.addEventListener('click', dialogClickHandler);
  element.addEventListener('keydown', dialogClickHandler);
};
