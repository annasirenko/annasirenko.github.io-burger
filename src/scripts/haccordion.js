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