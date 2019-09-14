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
