let feedbackExit = document.querySelector('.popup__exit--comments');
let popupFeedback = document.querySelector('.comments-popup');
let commentsButtons = document.querySelectorAll('.comments-btn');
let comments = document.querySelectorAll('.comments__desc');
// let body = document.querySelector('body');

feedbackExit.addEventListener('click', function() {
   popupFeedback.style.display = 'none';
  //  body.style.overflow = 'auto';
   });

for (let i = 0; i < commentsButtons.length; i++) {
  commentsButtons[i].addEventListener('click', function() {
    popupFeedback.style.display = 'flex';
    let feedbackPopupName = document.querySelector('.comments-popup__name');
    let feedbackCardName = document.querySelectorAll('.comments__desc-title');
    let feedbackPopupReview = document.querySelector('.comments-popup__text');
    let cardReview = document.querySelectorAll('.comments__desc-text');
    feedbackPopupName.textContent = feedbackCardName[i].textContent;
    feedbackPopupReview.textContent = cardReview[i].textContent;
    // body.style.overflow = 'hidden';

    });
}


