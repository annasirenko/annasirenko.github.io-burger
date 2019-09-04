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


const menu = document.querySelectorAll(".menu-accordeon__card");

menu.forEach(function(menu_slider) {
  menu_slider.addEventListener("click", function() {
  
    const active = document.querySelector(".menu-accordeon__card--active");
    if (active) {
      active.classList.remove("menu-accordeon__card--active");
    }

    if (menu_slider != active) {
      menu_slider.classList.add("menu-accordeon__card--active");
    }

  });

});