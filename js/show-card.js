'use strict';

window.card = (function () {
  var dialogClose = document.querySelector('.dialog__close');
  return {
    show: function (mapElement, dialogElement) {
      dialogElement.style.display = 'block';
      dialogClose.focus();
    },
    close: function (dialogElement, activePin) {
      dialogElement.style.display = 'none';
      dialogClose.setAttribute('aria-pressed', 'true');
      activePin.classList.remove('pin--active');
      if (typeof this.callback === 'function') {
        this.callback();
      }
    },
    callback: null
  };
})();


