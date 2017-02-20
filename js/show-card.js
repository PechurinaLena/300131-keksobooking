'use strict';

window.card = (function () {
  var dialogClose = document.querySelector('.dialog__close');
  var tokyo = document.querySelector('.tokyo');
  // находим темплейт
  return {
    // show: function (mapElement, dialogElement) {
    //   dialogElement.style.display = 'block';
    //   dialogClose.focus();
    // },
    show: function (cardInfo) {
      // берем template
      var dialogTemplate = document.querySelector('#dialog-template');
      console.log(dialogTemplate);
      // клонируем его
      var dialogToClone = dialogTemplate.content.querySelector('.dialog');
      var newDialog = dialogToClone.cloneNode(true);
      var dialogTitle = newDialog.querySelector('.dialog__title');
      console.log(dialogTitle);
      dialogTitle.innerText = cardInfo.offer.title;
      // ищем в клоне нужные элементы, заполняем
      // данными из cardInfo
      // вставляем клон на страницу
      tokyo.appendChild(newDialog);
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


