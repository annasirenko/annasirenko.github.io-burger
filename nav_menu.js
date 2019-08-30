var hamburger = document.querySelector('.hamburger');
var fullscreen = document.querySelector('.fullscreen');
hamburger.addEventListener('click', function() {
   fullscreen.style.right = '0'
  });
var fullscreenExit = document.querySelector('.hamburger--squeeze');
fullscreenExit.addEventListener('click', function() { 
  fullscreen.style.right = '-100%'
});


