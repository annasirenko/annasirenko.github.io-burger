const leftArrow = document.querySelector(".slider-arrow-left");
const rightArrow = document.querySelector(".slider-arrow-right");
const sliderCard = document.querySelector(".slider__card");


rightArrow.addEventListener('click', function(e) { 
  e.preventDefault();
  sliderCard.appendChild(sliderCard.firstElementChild); 
});
leftArrow.addEventListener('click', function(e) { 
  e.preventDefault(); 
  sliderCard.insertBefore(sliderCard.lastElementChild, sliderCard.firstElementChild);
})


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