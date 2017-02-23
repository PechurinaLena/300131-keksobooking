'use strict';

window.card = (function () {
  var dialogToClone = document.querySelector('#dialog-template').content.querySelector('.dialog');
  var tokyo = document.querySelector('.tokyo');
  return {
    show: function (cardInfo, closeCallback) {
      var oldDialog = document.querySelector('.dialog');
      if (oldDialog) {
        oldDialog.parentNode.removeChild(oldDialog);
      }
      var newDialog = dialogToClone.cloneNode(true);
      var closeDialog = newDialog.querySelector('.dialog__close');
      closeDialog.addEventListener('click', closeCallback);
      closeDialog.addEventListener('keydown', closeCallback);
      window.utils.fillTextFields(newDialog, cardInfo);

      var lodgePhotos = newDialog.querySelector('.lodge__photos');
      window.utils.renderImages(lodgePhotos, cardInfo.offer.photos);

      var lodgeFeatures = newDialog.querySelector('.lodge__features');
      window.utils.renderFeatures(lodgeFeatures, cardInfo.offer.features);

      window.utils.replaceAvatar(newDialog, cardInfo);

      tokyo.appendChild(newDialog);
      closeDialog.focus();
    },
    close: function (activePin) {
      var dialogElement = document.querySelector('.dialog');
      var dialogClose = document.querySelector('.dialog__close');
      dialogClose.setAttribute('aria-pressed', 'true');
      dialogElement.parentNode.removeChild(dialogElement);
      activePin.classList.remove('pin--active');
      if (typeof this.callback === 'function') {
        this.callback();
      }
    },
    callback: null
  };
})();


