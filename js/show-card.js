'use strict';

window.card = (function () {
  var dialogToClone = document.querySelector('#dialog-template').content.querySelector('.dialog');
  var tokyo = document.querySelector('.tokyo');
  var dialogCloseHandler;

  var getClone = function () {
    var newDialog = dialogToClone.cloneNode(true);
    return {
      dialog: newDialog,
      closeButton: newDialog.querySelector('.dialog__close'),
      lodgePhotos: newDialog.querySelector('.lodge__photos'),
      lodgeFeatures: newDialog.querySelector('.lodge__features'),
    };
  };

  return {
    show: function (cardInfo, onDialogClose) {
      dialogCloseHandler = onDialogClose;
      var oldDialog = document.querySelector('.dialog');
      if (oldDialog) {
        oldDialog.parentNode.removeChild(oldDialog);
      }
      var clone = getClone();
      clone.closeButton.addEventListener('click', dialogCloseHandler);
      clone.closeButton.addEventListener('keydown', dialogCloseHandler);
      window.fillCard.fillTextFields(clone.dialog, cardInfo);
      window.fillCard.renderImages(clone.lodgePhotos, cardInfo.offer.photos);
      window.fillCard.renderFeatures(clone.lodgeFeatures, cardInfo.offer.features);
      window.fillCard.replaceAvatar(clone.dialog, cardInfo);
      tokyo.appendChild(clone.dialog);
      clone.closeButton.focus();
    },
    close: function (activePin) {
      var dialogElement = document.querySelector('.dialog');
      var closeButton = dialogElement.querySelector('.dialog__close');
      closeButton.setAttribute('aria-pressed', 'true');
      closeButton.removeEventListener('click', dialogCloseHandler);
      closeButton.removeEventListener('keydown', dialogCloseHandler);
      dialogElement.parentNode.removeChild(dialogElement);
      activePin.classList.remove('pin--active');
      if (typeof this.callback === 'function') {
        this.callback();
      }
    },
    callback: null
  };
})();


