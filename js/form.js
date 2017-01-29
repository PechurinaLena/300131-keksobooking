// Показ карточки объявления

// При нажатии на любой из элементов .pin ему должен добавляться класс pin--active и должен показываться элемент .dialog. 
// Если до этого у другого элемента существовал класс pin--active, то у этого элемента класс нужно убрать

//Показ карточки объявления
var pins = document.querySelectorAll('.pin');
var dialog = document.querySelector('.dialog');
var dialogClose = document.querySelector('.dialog__close');

function toggle() {
  if (this.classList.contains('pin--active')) {
    this.classList.remove('pin--active');
        dialog.style.display='none';
  }    else {
        this.classList.add('pin--active');
        dialog.style.display="block";
  }
}


dialogClose.addEventListener('click', function () {
  dialog.style.display="none";
  if (this.classList.contains('pin--active')) {
    this.classList.remove('pin--active')
  }
});

for (var i = 0; i < pins.length; i++) {
    var element = pins[i];
    element.addEventListener('click', toggle);
}
