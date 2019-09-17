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