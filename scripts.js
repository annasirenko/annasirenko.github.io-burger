// Навигация
const hamburger = document.querySelector('.hamburger');
const fullscreen = document.querySelector('.fullscreen');
let menuItems = document.querySelectorAll('.vertical-menu-list__link');

function openHamburgerMenu(){
  fullscreen.style.right = '0';
  hamburger.classList.add('is-active');
  body.style.overflow = 'hidden';

}

function closeHamburgerMenu(){
  fullscreen.style.right = '-100%';
  hamburger.classList.remove('is-active');
  body.style.overflow = 'auto';
  

}

hamburger.addEventListener('click', function(e) {
  e.preventDefault();
   if(hamburger.classList.contains('is-active')){
    //  fullscreen.classList.add('fadeOut');
    //  setTimeout(() => {
      closeHamburgerMenu();
      // fullscreen.classList.remove('fadeOut');
    //  }, 400);
      
   } else{
      openHamburgerMenu();
      
   }
   
  });

  fullscreen.addEventListener('click', function(e){
    e.preventDefault();
        
    if(e.target.classList.contains('vertical-menu-list__link')){
      closeHamburgerMenu();
    }

  });



  // for (let i=0; i<menuItems.length; i++){
  //   const menuItem = menuItems[i];
  //   menuItem.addEventListener('click', function(e) {
  //     e.preventDefault();
  //     closeHamburgerMenu();

  //   });
  // }


// let fullscreenExit = document.querySelector('.hamburger.is-active');
// fullscreenExit.addEventListener('click', function() { 
//   fullscreen.style.right = '-100%';
// });

// Вертикальный аккордеон

const teams = document.querySelectorAll(".accordeon__team");

teams.forEach(function(team) {
  team.addEventListener("click", function() {
  
    const active = document.querySelector(".accordeon__team--active");
    if (active) {
      active.classList.remove("accordeon__team--active");
    }

    if (team != active) {
      team.classList.add("accordeon__team--active");
    }

  });

});

// Горизонтальный

const menuAcco = document.querySelector('.menu-accordeon');


horizontalAccordeon(menuAcco);


function horizontalAccordeon(element) {
  element.addEventListener('click', function(e){
    e.preventDefault();

    const menu = document.querySelectorAll(".menu-accordeon__card");
    const menuParent = e.target.closest(".menu-accordeon__card");
    const menuButton = e.target.classList.contains("menu-accordeon__button");
    const menuButtonText = e.target.classList.contains("menu-accordeon__name");
    const menuContent = menuParent.lastElementChild;

    if (menuButton || menuButtonText ){
      if (menuParent.classList.contains ('menu-accordeon__card--active')){
        menuParent.classList.remove('menu-accordeon__card--active');
        menuContent.classList.add('fade-out');
      }else{
        for (let i=0; i<menu.length; i++){
          const menuItems=menu[i];
          menuContent.classList.add('fade-out');
          menuItems.classList.remove('menu-accordeon__card--active');
          
        }
        menuContent.classList.remove('fade-out');
        menuParent.classList.add('menu-accordeon__card--active');
      }
    }

  });
}




// menu.forEach(function(menu_slider) {
//   menu_slider.addEventListener("click", function() {
  
//     const active = document.querySelector(".menu-accordeon__card--active");
//     if (active) {
//       active.classList.remove("menu-accordeon__card--active");
//       menuContent.classList.add('fade-out');
//     }

//     if (menu_slider != active) {
//       menuContent.classList.remove('fade-out');
//       menu_slider.classList.add("menu-accordeon__card--active");
//     }

//   });

// });

// Слайдер

slider();
function slider(){
  const leftArrow = document.querySelector(".slider-arrow-left");
  const rightArrow = document.querySelector(".slider-arrow-right");
  const slider = document.querySelector('.slider__card');
  const slides = document.querySelectorAll('.slider__burger');
  const slide = document.querySelector('.slider__burger');

  let minRight = 0;
  let currentRight = 0;

  slider.style.right = currentRight;

  function leftMove(){
    let step = slide.offsetWidth;
  let maxRight = (slides.length -1 ) * slide.offsetWidth;
    if(currentRight > minRight){
      currentRight -= step;
      slider.style.right = currentRight + "px";
    }else{
      currentRight = maxRight;
      slider.style.right = maxRight + "px";
    }
  }

  function rightMove(){
    let step = slide.offsetWidth;
  let maxRight = (slides.length -1 ) * slide.offsetWidth;
    
    if (currentRight < maxRight){
      currentRight += step;
      slider.style.right = currentRight + "px";
      
    } else {
      currentRight = minRight;
      slider.style.right = minRight + "px";
      
      
    }
  }

  leftArrow.addEventListener('click', e =>{
  e.preventDefault();
  leftMove();
  console.log('leftMove');
});

rightArrow.addEventListener('click', e =>{
  e.preventDefault();
  rightMove();
  console.log('rightMove');
});
}
// const leftArrow = document.querySelector(".slider-arrow-left");
// const rightArrow = document.querySelector(".slider-arrow-right");
// const sliderCard = document.querySelector(".slider__card");


// rightArrow.addEventListener('click', function(e) { 
//   e.preventDefault();
//   sliderCard.appendChild(sliderCard.firstElementChild); 
// });
// leftArrow.addEventListener('click', function(e) { 
//   e.preventDefault(); 
//   sliderCard.insertBefore(sliderCard.lastElementChild, sliderCard.firstElementChild);
// })




// rightArrow.addEventListener("click", function() {
//   loop("slider-arrow-right");
// });

// leftArrow.addEventListener("click", function() {
//   loop("slider-arrow-left");
// });

// function loop(direction) {
//   if (direction === "slider-arrow-right") {
//     sliderCard .appendChild(sliderCard.firstElementChild);
//   } else {
//     sliderCard .insertBefore(sliderCard.lastElementChild, sliderCard.firstElementChild);
//   }
// }

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
  }
});

// Модальное окно для отзывов
let feedbackExit = document.querySelector('.popup__exit--comments');
let popupFeedback = document.querySelector('.comments-popup');
let commentsButtons = document.querySelectorAll('.comments-btn');
let comments = document.querySelectorAll('.comments__desc');
// let body = document.querySelector('body');

feedbackExit.addEventListener('click', function() {
   popupFeedback.style.display = 'none';
   document.body.style.overflow = 'auto';
   });

for (let i = 0; i < commentsButtons.length; i++) {
  commentsButtons[i].addEventListener('click', function() {
    popupFeedback.style.display = 'flex';
    body.style.overflow = 'hidden';
    let feedbackPopupName = document.querySelector('.comments-popup__name');
    let feedbackCardName = document.querySelectorAll('.comments__desc-title');
    let feedbackPopupReview = document.querySelector('.comments-popup__text');
    let cardReview = document.querySelectorAll('.comments__desc-text');
    feedbackPopupName.textContent = feedbackCardName[i].textContent;
    feedbackPopupReview.textContent = cardReview[i].textContent;
    

    });
}


// Закрытие состава

$('.dish-composition').on('mouseenter', function(){
  $(this).find('.popup').addClass('active');
  console.log(2);
});
$('.dish-composition').on('mouseleave', function(){
  $(this).find('.popup').removeClass('active');
  console.log(3);
});
$('.popup__exit').on('click', function(){
  $(this).find('.popup').removeClass('active');
  console.log(4);
});

// let popupExit = document.querySelector('.popup__exit');
// let popupDisplay = document.querySelector('.popup');
// let composition = document.querySelector('.dish-composition');

// function openPopup(){
//   // popupDisplay.style.display = 'flex';
//   popupDisplay.classList.add('active');

// }

// function closePopup(){
//   // popupDisplay.style.display = 'none';
//   popupDisplay.classList.remove('active');

// }

// popupExit.addEventListener('click', function (){
//   closePopup();
//   console.log(1);
// });


// composition.addEventListener('mouseenter', function(){
//   openPopup();
//   console.log(2);
// });

// composition.addEventListener('mouseleave', function(){
//   closePopup();
//   console.log(3);
// });


// composition.addEventListener('click', function(e) {
//   e.preventDefault();
//    if(popupDisplay.classList.contains('active')){
//     // popupDisplay.classList.add('fadeOut');
//     //  setTimeout(() => {
//       closePopup();
//     //   popupDisplay.classList.remove('fadeOut');
//     //  }, 400);
      
//    } else{
//       openPopup();
      
//    }

      
//   });
