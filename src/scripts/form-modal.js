// Модальное окно для формы

let form = document.querySelector('.form__elem');
let formButton = document.querySelector('.form__button-send');
let fields = document.querySelectorAll('.form__input');
let modal = document.querySelector('.modal');
let modalText = document.querySelector('.modal-window--text');
let modalButton = document.querySelector('.modal-window--button');
let body = document.querySelector('body');

modalButton.addEventListener('click', function() {
  modal.style.display = 'none';
  body.style.overflow = 'auto';
  body.classList.remove('.locked');
});

formButton.addEventListener('click', function(e) {
  e.preventDefault();
  const data = { name: form.elements.name.value, phone: form.elements.phone.value, comment: form.elements.comment.value };
  const formData = new FormData(form);
  formData.append("name", form.elements.name.value);
  formData.append("phone", form.elements.phone.value);
  formData.append("comment", form.elements.comment.value);
  formData.append("to", "my@gmail.com");
  console.log(formData);
  console.log(data);

  var xhr = new XMLHttpRequest();

  function validation() {
      if (form.elements.name.checkValidity() &&
          form.elements.phone.checkValidity() &&
          form.elements.comment.checkValidity()) { 
            return true;
          } else {
          return false;
      }
  };

  console.log(validation());

  if (validation()) {

  xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail');
  xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
  xhr.send(formData);
  xhr.responseType = "json";
  xhr.addEventListener('load', function() {
  if (xhr.response.status) {
  modal.style.display = 'flex';
  modalText.textContent = 'Сообщение отправлено';
  body.style.overflow = 'hidden';
  body.classList.add('.locked');
  form.reset();
  } 
  // else {
  // modal.style.display = 'flex';
  // modalText.textContent = 'Произошла ошибка, попробуйте еще раз';
  // body.style.overflow = 'hidden';
  // }
  });
  } else {
  modal.style.display = 'flex';
  modalText.textContent = 'Поля "Имя","Телефон" и "Комментарий" должны быть заполнены';
  body.style.overflow = 'hidden';
  body.classList.add('.locked');
  }
});
