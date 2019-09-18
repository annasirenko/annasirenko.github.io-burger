// Слайдер
const Arrows = $('.slider-buttons');
const sliderList = $('.slider__card');
const slides = $('.slider__burger');


$(function (){

  var moveSlide = function (container, slideNum){
    const activeSlide = slides.filter('.active'),
    reqItem = slides.eq(slideNum),
    reqIndex = reqItem.index(),
    duration = 500;

    if (reqItem.length){
      sliderList.stop(true,false).animate({
        'left' : -reqIndex * 100 + '%'
  
      }, duration, function (){
        activeSlide.removeClass('active');
        reqItem.addClass('active');
      });

    }

  }

  Arrows.on('click', function(){

    var $this = $(this),
    container = $this.closest('.slider__wrapper'),
    activeSlide = slides.filter('.active'),
    nextSlide = activeSlide.next(),
    prevSlide = activeSlide.prev();
    
    

    if($this.hasClass('slider-arrow-right')){

      if (nextSlide.length){
        moveSlide(container, nextSlide.index());
      } else{
        moveSlide(container, slides.first().index());
      }
      
    } if($this.hasClass('slider-arrow-left')){
      if (prevSlide.length){
        moveSlide(container, prevSlide.index());
      } else{
        moveSlide(container, slides.last().index());
      }

      moveSlide(container, prevSlide.index());
    }
    
     
  });

});


//начало
// slider();
// function slider(){
//   const leftArrow = document.querySelector(".slider-arrow-left");
//   const rightArrow = document.querySelector(".slider-arrow-right");
//   const slider = document.querySelector('.slider__card');
//   const slides = document.querySelectorAll('.slider__burger');
//   const slide = document.querySelector('.slider__burger');

//   let minRight = 0;
//   let currentRight = 0;

//   slider.style.right = currentRight;

//   function leftMove(){
//     let step = slide.offsetWidth;
//   let maxRight = (slides.length -1 ) * slide.offsetWidth;
//     if(currentRight > minRight){
//       currentRight -= step;
//       slider.style.right = currentRight + "px";
//     }else{
//       currentRight = maxRight;
//       slider.style.right = maxRight + "px";
//     }
//   }

//   function rightMove(){
//     let step = slide.offsetWidth;
//   let maxRight = (slides.length -1 ) * slide.offsetWidth;
    
//     if (currentRight < maxRight){
//       currentRight += step;
//       slider.style.right = currentRight + "px";
      
//     } else {
//       currentRight = minRight;
//       slider.style.right = minRight + "px";
      
      
//     }
//   }

//   leftArrow.addEventListener('click', e =>{
//   e.preventDefault();
//   leftMove();
//   console.log('leftMove');
// });

// rightArrow.addEventListener('click', e =>{
//   e.preventDefault();
//   rightMove();
//   console.log('rightMove');
// });
// }

//конец

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