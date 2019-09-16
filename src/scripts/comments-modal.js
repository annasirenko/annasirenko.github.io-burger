// Модальное окно для отзывов
let feedbackExit = document.querySelector('.popup__exit--comments');
let popupFeedback = document.querySelector('.comments-popup');
let commentsButtons = document.querySelectorAll('.comments-btn');
let comments = document.querySelectorAll('.comments__desc');
// let body = document.querySelector('body');

feedbackExit.addEventListener('click', function() {
   popupFeedback.style.display = 'none';
   document.body.style.overflow = 'auto';
   body.classList.remove('locked');
   });

for (let i = 0; i < commentsButtons.length; i++) {
  commentsButtons[i].addEventListener('click', function() {
    popupFeedback.style.display = 'flex';
    body.style.overflow = 'hidden';
    body.classList.add('locked');
    let feedbackPopupName = document.querySelector('.comments-popup__name');
    let feedbackCardName = document.querySelectorAll('.comments__desc-title');
    let feedbackPopupReview = document.querySelector('.comments-popup__text');
    let cardReview = document.querySelectorAll('.comments__desc-text');
    feedbackPopupName.textContent = feedbackCardName[i].textContent;
    feedbackPopupReview.textContent = cardReview[i].textContent;
    

    });
}
