'use strict';

window.card = (function () {
  var dialogToClone = document.querySelector('#dialog-template').content.querySelector('.dialog');
  var tokyo = document.querySelector('.tokyo');
  var dialogCloseHandler;
  var currentDialog;

  var createDialog = function () {
    var newDialog = dialogToClone.cloneNode(true);
    currentDialog = {
      dialog: newDialog,
      closeButton: newDialog.querySelector('.dialog__close'),
      lodgePhotos: newDialog.querySelector('.lodge__photos'),
      lodgeFeatures: newDialog.querySelector('.lodge__features'),
    };
  };

  var destroyDialog = function () {
    if (currentDialog && currentDialog.dialog) {
      currentDialog.closeButton.removeEventListener('click', dialogCloseHandler);
      currentDialog.closeButton.removeEventListener('keydown', dialogCloseHandler);
      currentDialog.dialog.parentNode.removeChild(currentDialog.dialog);
      currentDialog = null;
    }
  };

  return {
    show: function (cardInfo, onDialogClose) {
      dialogCloseHandler = onDialogClose;
      destroyDialog();
      createDialog();
      currentDialog.closeButton.addEventListener('click', dialogCloseHandler);
      currentDialog.closeButton.addEventListener('keydown', dialogCloseHandler);
      window.fillCard.fillTextFields(currentDialog.dialog, cardInfo);
      window.fillCard.renderImages(currentDialog.lodgePhotos, cardInfo.offer.photos);
      window.fillCard.renderFeatures(currentDialog.lodgeFeatures, cardInfo.offer.features);
      window.fillCard.replaceAvatar(currentDialog.dialog, cardInfo);
      tokyo.appendChild(currentDialog.dialog);
      currentDialog.closeButton.focus();
    },
    close: function (activePin) {
      currentDialog.closeButton.setAttribute('aria-pressed', 'true');
      destroyDialog();
      activePin.classList.remove('pin--active');
      if (typeof this.callback === 'function') {
        this.callback();
      }
    },
    callback: null
  };
})();


