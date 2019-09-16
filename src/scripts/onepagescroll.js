$(document).ready(function () {
  
  
  const sections = $(".section");
  const display = $(".maincontent");
  let inscroll = false;
  
  const mobileDetect = new MobileDetect(window.navigator.userAgent);
  const isMobile = mobileDetect.mobile();
  
  const countPositionPercent = sectionEq => {
    return `${sectionEq * -100}%`;
  };
  
  const switchActiveClass = (elems, elemEq) => {
    elems
    .eq(elemEq)
    .addClass("active")
    .siblings()
    .removeClass("active");
  };
  
  const unBlockScroll = () => {
    setTimeout(() => {
      inscroll = false;
    }, 1300); // подождать пока завершится инерция на тачпадах
  };
  
  const performTransition = sectionEq => {
    if (inscroll) return;
    inscroll = true;
    
    const position = countPositionPercent(sectionEq);
    const switchFixedMenuClass = () =>
    switchActiveClass($(".sidemenu__button"), sectionEq);
    
    switchFixedMenuClass();
    switchActiveClass(sections, sectionEq);
    
    
    display.css({
      transform: `translateY(${position})`
    });
    
    unBlockScroll();
  };
  
  const scrollViewport = direction => {
    const activeSection = sections.filter(".active");
    const nextSection = activeSection.next();
    const prevSection = activeSection.prev();
    
    if (direction === "next" && nextSection.length) {
      performTransition(nextSection.index());
    }
    
    if (direction === "prev" && prevSection.length) {
      performTransition(prevSection.index());
    }
  };
  
  if (!$("body").hasClass('locked')) {
    $(document).on({
      wheel: e => {
        const deltaY = e.originalEvent.deltaY;
        const direction = deltaY > 0 ? "next" : "prev";
        scrollViewport(direction);
      },
      keydown: e => {
        const tagName = e.target.tagName.toLowerCase();
        const userTypingInInputs = tagName === "input" || tagName === "textarea";
        
        if (userTypingInInputs) return;
        
        switch (e.keyCode) {
          case 40:
          scrollViewport("next");
          break;
          
          case 38:
          scrollViewport("prev");
          break;
        }
      }
    });
  }
  
  $("[data-scroll-to]").on("click", e => {
    e.preventDefault();
    performTransition(parseInt($(e.currentTarget).attr("data-scroll-to")));
  });
  
  // разрешаем свайп на смартфонах
  if (isMobile) {
    window.addEventListener(
      "touchmove",
      e => {
        e.preventDefault();
      },
      { passive: false }
      );
      
      $("body").swipe({
        swipe: (event, direction) => {
          let scrollDirection;
          if (direction === "up") scrollDirection = "next";
          if (direction === "down") scrollDirection = "prev";
          scrollViewport(scrollDirection);
          
          
        }
      });
    }
  });


// const sections = $('.section');
// const display = $('.maincontent');
// const side = $('.sidemenu__link');
// let inscroll = false;

// const mobileDetect = new MobileDetect(window.navigator.userAgent);
// const isMobile = mobileDetect.mobile();

// const performTransition = sectionEq =>{
//   if (inscroll===false){
//     inscroll = true;
//     const position = `${sectionEq * -100}%`;

//   sections
//   .eq(sectionEq)
//   .addClass('active')
//   .siblings()
//   .removeClass('active');

//   side
//   .eq(sectionEq)
//   .addClass('sidemenu__link--active')
//   .siblings()
//   .removeClass('sidemenu__link--active');

//   display.css({
//     transform: `translateY(${position})`
//   });

//   setTimeout(() => {
//     inscroll = false;
//   }, 1300); // подождать пока завершится инерция на тачпадах
// }
// };
  
// const scrollViewport = direction => {
//   const activeSection = sections.filter(".active");
//   const nextSection = activeSection.next();
//   const prevSection = activeSection.prev();

//   if (direction === "next" && nextSection.length) {
//     performTransition(nextSection.index());
//   }

//   if (direction === "prev" && prevSection.length) {
//     performTransition(prevSection.index());
//   }
// };


// $(document).on('wheel', e => {
//   const deltaY = e.originalEvent.deltaY;
  
//   if (deltaY < 0){
//     scrollViewport("prev");
    
//   }

//   if (deltaY > 0){
//     scrollViewport("next");
    
//   }  
    
// });

// $(document).on('keydown', e =>{
//   const tagName = e.target.tagName.toLowerCase();
//   const userTypingInInputs = tagName === "input" || tagName === "textarea";

//   if (userTypingInInputs == false){

//     switch (e.keyCode) {
//       case 38:
//         scrollViewport('prev');
//         break;
//       case 40:
//         scrollViewport('next');
//         break;
//     }
//   }

// });

// $('.wrapper').on('touchmove', e => {
//   e.preventDefault();
// });

// $("[data-scroll-to]").on("click", e => {
//   e.preventDefault();
//   performTransition(parseInt($(e.currentTarget).attr("data-scroll-to")));
// });


// if (isMobile) {
//   window.addEventListener(
//     "touchmove",
//     e => {
//       e.preventDefault();
//     },
//     { passive: false }
//   );
  
//   $(window).swipe({
//     swipe: (event, direction) => {
//       let scrollDirection;
//       if (direction === "up") scrollDirection = "next";
//       if (direction === "down") scrollDirection = "prev";
//       scrollViewport(scrollDirection);
//     }
//   });
// }
