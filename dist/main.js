"use strict";

function _readOnlyError(name) { throw new Error("\"" + name + "\" is read-only"); }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// Модальное окно для отзывов
var feedbackExit = document.querySelector('.popup__exit--comments');
var popupFeedback = document.querySelector('.comments-popup');
var commentsButtons = document.querySelectorAll('.comments-btn');
var comments = document.querySelectorAll('.comments__desc'); // let body = document.querySelector('body');

feedbackExit.addEventListener('click', function () {
  popupFeedback.style.display = 'none';
  document.body.style.overflow = 'auto';
});

var _loop = function _loop(i) {
  commentsButtons[i].addEventListener('click', function () {
    popupFeedback.style.display = 'flex';
    body.style.overflow = 'hidden';
    var feedbackPopupName = document.querySelector('.comments-popup__name');
    var feedbackCardName = document.querySelectorAll('.comments__desc-title');
    var feedbackPopupReview = document.querySelector('.comments-popup__text');
    var cardReview = document.querySelectorAll('.comments__desc-text');
    feedbackPopupName.textContent = feedbackCardName[i].textContent;
    feedbackPopupReview.textContent = cardReview[i].textContent;
  });
};

for (var i = 0; i < commentsButtons.length; i++) {
  _loop(i);
} // Модальное окно для формы


var form = document.querySelector('.form__elem');
var formButton = document.querySelector('.form__button-send');
var fields = document.querySelectorAll('.form__input');
var modal = document.querySelector('.modal');
var modalText = document.querySelector('.modal-window--text');
var modalButton = document.querySelector('.modal-window--button');
var body = document.querySelector('body');
modalButton.addEventListener('click', function () {
  modal.style.display = 'none';
  body.style.overflow = 'auto';
});
formButton.addEventListener('click', function (e) {
  e.preventDefault();
  var data = {
    name: form.elements.name.value,
    phone: form.elements.phone.value,
    comment: form.elements.comment.value
  };
  var formData = new FormData(form);
  formData.append("name", form.elements.name.value);
  formData.append("phone", form.elements.phone.value);
  formData.append("comment", form.elements.comment.value);
  formData.append("to", "my@gmail.com");
  console.log(formData);
  console.log(data);
  var xhr = new XMLHttpRequest();

  function validation() {
    if (form.elements.name.checkValidity() && form.elements.phone.checkValidity() && form.elements.comment.checkValidity()) {
      return true;
    } else {
      return false;
    }
  }

  ;
  console.log(validation());

  if (validation()) {
    xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail');
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    xhr.send(formData);
    xhr.responseType = "json";
    xhr.addEventListener('load', function () {
      if (xhr.response.status) {
        modal.style.display = 'flex';
        modalText.textContent = 'Сообщение отправлено';
        body.style.overflow = 'hidden';
        form.reset();
      } // else {
      // modal.style.display = 'flex';
      // modalText.textContent = 'Произошла ошибка, попробуйте еще раз';
      // body.style.overflow = 'hidden';
      // }

    });
  } else {
    modal.style.display = 'flex';
    modalText.textContent = 'Поля "Имя","Телефон" и "Комментарий" должны быть заполнены';
    body.style.overflow = 'hidden';

    if ($(window).width() < 768) {
      body.style.overflow = 'hidden';
    }

    ;
  }
}); // Горизонтальный

var menuAcco = document.querySelector('.menu-accordeon');
horizontalAccordeon(menuAcco);

function horizontalAccordeon(element) {
  element.addEventListener('click', function (e) {
    e.preventDefault();
    var menu = document.querySelectorAll(".menu-accordeon__card");
    var menuParent = e.target.closest(".menu-accordeon__card");
    var menuButton = e.target.classList.contains("menu-accordeon__button");
    var menuButtonText = e.target.classList.contains("menu-accordeon__name");
    var menuContent = menuParent.lastElementChild;

    if (menuButton || menuButtonText) {
      if (menuParent.classList.contains('menu-accordeon__card--active')) {
        menuParent.classList.remove('menu-accordeon__card--active');
        menuContent.classList.add('fade-out');
      } else {
        for (var i = 0; i < menu.length; i++) {
          var _menuItems = menu[i];
          menuContent.classList.add('fade-out');

          _menuItems.classList.remove('menu-accordeon__card--active');
        }

        menuContent.classList.remove('fade-out');
        menuParent.classList.add('menu-accordeon__card--active');
      }
    }
  });
} // menu.forEach(function(menu_slider) {
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

/*!
 * jQuery Mousewheel 3.1.13
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 */


(function (factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['jquery'], factory);
  } else if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object') {
    // Node/CommonJS style for Browserify
    module.exports = factory;
  } else {
    // Browser globals
    factory(jQuery);
  }
})(function ($) {
  var toFix = ['wheel', 'mousewheel', 'DOMMouseScroll', 'MozMousePixelScroll'],
      toBind = 'onwheel' in document || document.documentMode >= 9 ? ['wheel'] : ['mousewheel', 'DomMouseScroll', 'MozMousePixelScroll'],
      slice = Array.prototype.slice,
      nullLowestDeltaTimeout,
      lowestDelta;

  if ($.event.fixHooks) {
    for (var i = toFix.length; i;) {
      $.event.fixHooks[toFix[--i]] = $.event.mouseHooks;
    }
  }

  var special = $.event.special.mousewheel = {
    version: '3.1.12',
    setup: function setup() {
      if (this.addEventListener) {
        for (var i = toBind.length; i;) {
          this.addEventListener(toBind[--i], handler, false);
        }
      } else {
        this.onmousewheel = handler;
      } // Store the line height and page height for this particular element


      $.data(this, 'mousewheel-line-height', special.getLineHeight(this));
      $.data(this, 'mousewheel-page-height', special.getPageHeight(this));
    },
    teardown: function teardown() {
      if (this.removeEventListener) {
        for (var i = toBind.length; i;) {
          this.removeEventListener(toBind[--i], handler, false);
        }
      } else {
        this.onmousewheel = null;
      } // Clean up the data we added to the element


      $.removeData(this, 'mousewheel-line-height');
      $.removeData(this, 'mousewheel-page-height');
    },
    getLineHeight: function getLineHeight(elem) {
      var $elem = $(elem),
          $parent = $elem['offsetParent' in $.fn ? 'offsetParent' : 'parent']();

      if (!$parent.length) {
        $parent = $('body');
      }

      return parseInt($parent.css('fontSize'), 10) || parseInt($elem.css('fontSize'), 10) || 16;
    },
    getPageHeight: function getPageHeight(elem) {
      return $(elem).height();
    },
    settings: {
      adjustOldDeltas: true,
      // see shouldAdjustOldDeltas() below
      normalizeOffset: true // calls getBoundingClientRect for each event

    }
  };
  $.fn.extend({
    mousewheel: function mousewheel(fn) {
      return fn ? this.bind('mousewheel', fn) : this.trigger('mousewheel');
    },
    unmousewheel: function unmousewheel(fn) {
      return this.unbind('mousewheel', fn);
    }
  });

  function handler(event) {
    var orgEvent = event || window.event,
        args = slice.call(arguments, 1),
        delta = 0,
        deltaX = 0,
        deltaY = 0,
        absDelta = 0,
        offsetX = 0,
        offsetY = 0;
    event = $.event.fix(orgEvent);
    event.type = 'mousewheel'; // Old school scrollwheel delta

    if ('detail' in orgEvent) {
      deltaY = orgEvent.detail * -1;
    }

    if ('wheelDelta' in orgEvent) {
      deltaY = orgEvent.wheelDelta;
    }

    if ('wheelDeltaY' in orgEvent) {
      deltaY = orgEvent.wheelDeltaY;
    }

    if ('wheelDeltaX' in orgEvent) {
      deltaX = orgEvent.wheelDeltaX * -1;
    } // Firefox < 17 horizontal scrolling related to DOMMouseScroll event


    if ('axis' in orgEvent && orgEvent.axis === orgEvent.HORIZONTAL_AXIS) {
      deltaX = deltaY * -1;
      deltaY = 0;
    } // Set delta to be deltaY or deltaX if deltaY is 0 for backwards compatabilitiy


    delta = deltaY === 0 ? deltaX : deltaY; // New school wheel delta (wheel event)

    if ('deltaY' in orgEvent) {
      deltaY = orgEvent.deltaY * -1;
      delta = deltaY;
    }

    if ('deltaX' in orgEvent) {
      deltaX = orgEvent.deltaX;

      if (deltaY === 0) {
        delta = deltaX * -1;
      }
    } // No change actually happened, no reason to go any further


    if (deltaY === 0 && deltaX === 0) {
      return;
    } // Need to convert lines and pages to pixels if we aren't already in pixels
    // There are three delta modes:
    //   * deltaMode 0 is by pixels, nothing to do
    //   * deltaMode 1 is by lines
    //   * deltaMode 2 is by pages


    if (orgEvent.deltaMode === 1) {
      var lineHeight = $.data(this, 'mousewheel-line-height');
      delta *= lineHeight;
      deltaY *= lineHeight;
      deltaX *= lineHeight;
    } else if (orgEvent.deltaMode === 2) {
      var pageHeight = $.data(this, 'mousewheel-page-height');
      delta *= pageHeight;
      deltaY *= pageHeight;
      deltaX *= pageHeight;
    } // Store lowest absolute delta to normalize the delta values


    absDelta = Math.max(Math.abs(deltaY), Math.abs(deltaX));

    if (!lowestDelta || absDelta < lowestDelta) {
      lowestDelta = absDelta; // Adjust older deltas if necessary

      if (shouldAdjustOldDeltas(orgEvent, absDelta)) {
        lowestDelta /= 40;
      }
    } // Adjust older deltas if necessary


    if (shouldAdjustOldDeltas(orgEvent, absDelta)) {
      // Divide all the things by 40!
      delta /= 40;
      deltaX /= 40;
      deltaY /= 40;
    } // Get a whole, normalized value for the deltas


    delta = Math[delta >= 1 ? 'floor' : 'ceil'](delta / lowestDelta);
    deltaX = Math[deltaX >= 1 ? 'floor' : 'ceil'](deltaX / lowestDelta);
    deltaY = Math[deltaY >= 1 ? 'floor' : 'ceil'](deltaY / lowestDelta); // Normalise offsetX and offsetY properties

    if (special.settings.normalizeOffset && this.getBoundingClientRect) {
      var boundingRect = this.getBoundingClientRect();
      offsetX = event.clientX - boundingRect.left;
      offsetY = event.clientY - boundingRect.top;
    } // Add information to the event object


    event.deltaX = deltaX;
    event.deltaY = deltaY;
    event.deltaFactor = lowestDelta;
    event.offsetX = offsetX;
    event.offsetY = offsetY; // Go ahead and set deltaMode to 0 since we converted to pixels
    // Although this is a little odd since we overwrite the deltaX/Y
    // properties with normalized deltas.

    event.deltaMode = 0; // Add event and delta to the front of the arguments

    args.unshift(event, delta, deltaX, deltaY); // Clearout lowestDelta after sometime to better
    // handle multiple device types that give different
    // a different lowestDelta
    // Ex: trackpad = 3 and mouse wheel = 120

    if (nullLowestDeltaTimeout) {
      clearTimeout(nullLowestDeltaTimeout);
    }

    nullLowestDeltaTimeout = setTimeout(nullLowestDelta, 200);
    return ($.event.dispatch || $.event.handle).apply(this, args);
  }

  function nullLowestDelta() {
    lowestDelta = null;
  }

  function shouldAdjustOldDeltas(orgEvent, absDelta) {
    // If this is an older event and the delta is divisable by 120,
    // then we are assuming that the browser is treating this as an
    // older mouse wheel event and that we should divide the deltas
    // by 40 to try and get a more usable deltaFactor.
    // Side note, this actually impacts the reported scroll distance
    // in older browsers and can cause scrolling to be slower than native.
    // Turn this off by setting $.event.special.mousewheel.settings.adjustOldDeltas to false.
    return special.settings.adjustOldDeltas && orgEvent.type === 'mousewheel' && absDelta % 120 === 0;
  }
}); // Навигация


var hamburger = document.querySelector('.hamburger');
var fullscreen = document.querySelector('.fullscreen');
var menuItems = document.querySelectorAll('.vertical-menu-list__link');

function openHamburgerMenu() {
  fullscreen.style.right = '0';
  hamburger.classList.add('is-active');
  body.style.overflow = 'hidden';
}

function closeHamburgerMenu() {
  fullscreen.style.right = '-100%';
  hamburger.classList.remove('is-active');
  body.style.overflow = 'auto';
}

hamburger.addEventListener('click', function (e) {
  e.preventDefault();

  if (hamburger.classList.contains('is-active')) {
    //  fullscreen.classList.add('fadeOut');
    //  setTimeout(() => {
    closeHamburgerMenu(); // fullscreen.classList.remove('fadeOut');
    //  }, 400);
  } else {
    openHamburgerMenu();
  }
});
fullscreen.addEventListener('click', function (e) {
  e.preventDefault();

  if (e.target.classList.contains('vertical-menu-list__link')) {
    closeHamburgerMenu();
  }
}); // for (let i=0; i<menuItems.length; i++){
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
// Onepagescroll

$(document).ready(function () {
  var container = $('.maincontent'),
      sections = $('.section'),
      index = 0,
      scroll = false;
  $('.section:first-child').addClass('active');
  $('body').on('mousewheel', function (event) {
    var activeSection = sections.filter('.active');

    if (!scroll) {
      scroll = (_readOnlyError("scroll"), true);

      if (event.deltaY > 0) {
        if (activeSection.prev().length) {
          _readOnlyError("index"), index--;
        }
      } else {
        if (activeSection.next().length) {
          _readOnlyError("index"), index++;
        }
      }
    }

    position = -index * 100 + 'vh';
    sections.eq(index).addClass('active').siblings().removeClass('active');
    container.css('top', position);
    setTimeout(function () {
      scroll = (_readOnlyError("scroll"), false);
    }, 1300);
  });
}); // Закрытие состава

$('.dish-composition').on('mouseenter', function () {
  $(this).find('.popup').addClass('active');
  console.log(2);
});
$('.dish-composition').on('mouseleave', function () {
  $(this).find('.popup').removeClass('active');
  console.log(3);
});
$('.popup__exit').on('click', function () {
  $(this).find('.popup').removeClass('active');
  console.log(4);
}); // Слайдер

var Arrows = $('.slider-buttons');
var sliderList = $('.slider__card');
var slides = $('.slider__burger');
$(function () {
  var moveSlide = function moveSlide(container, slideNum) {
    var activeSlide = slides.filter('.active'),
        reqItem = slides.eq(slideNum),
        reqIndex = reqItem.index(),
        duration = 500;

    if (reqItem.length) {
      sliderList.stop(true, false).animate({
        'left': -reqIndex * 100 + '%'
      }, duration, function () {
        activeSlide.removeClass('active');
        reqItem.addClass('active');
      });
    }
  };

  Arrows.on('click', function () {
    var $this = $(this),
        container = $this.closest('.slider__wrapper'),
        activeSlide = slides.filter('.active'),
        nextSlide = activeSlide.next(),
        prevSlide = activeSlide.prev();

    if ($this.hasClass('slider-arrow-right')) {
      if (nextSlide.length) {
        moveSlide(container, nextSlide.index());
      } else {
        moveSlide(container, slides.first().index());
      }
    }

    if ($this.hasClass('slider-arrow-left')) {
      if (prevSlide.length) {
        moveSlide(container, prevSlide.index());
      } else {
        moveSlide(container, slides.last().index());
      }

      moveSlide(container, prevSlide.index());
    }
  });
}); //начало
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
// Вертикальный аккордеон

var teams = document.querySelectorAll(".accordeon__team");
teams.forEach(function (team) {
  team.addEventListener("click", function () {
    var active = document.querySelector(".accordeon__team--active");

    if (active) {
      active.classList.remove("accordeon__team--active");
    }

    if (team != active) {
      team.classList.add("accordeon__team--active");
    }
  });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1lbnRzLW1vZGFsLmpzIiwiZm9ybS1tb2RhbC5qcyIsImhhY2NvcmRpb24uanMiLCJqcXVlcnkubW91c2V3aGVlbC5qcyIsIm5hdmlnYXRpb24uanMiLCJvbmVwYWdlc2Nyb2xsLmpzIiwicG9wdXAtZXhpdC5qcyIsInNsaWRlci5qcyIsInZhY2NvcmRpb24uanMiXSwibmFtZXMiOlsiZmVlZGJhY2tFeGl0IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwicG9wdXBGZWVkYmFjayIsImNvbW1lbnRzQnV0dG9ucyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJjb21tZW50cyIsImFkZEV2ZW50TGlzdGVuZXIiLCJzdHlsZSIsImRpc3BsYXkiLCJib2R5Iiwib3ZlcmZsb3ciLCJpIiwiZmVlZGJhY2tQb3B1cE5hbWUiLCJmZWVkYmFja0NhcmROYW1lIiwiZmVlZGJhY2tQb3B1cFJldmlldyIsImNhcmRSZXZpZXciLCJ0ZXh0Q29udGVudCIsImxlbmd0aCIsImZvcm0iLCJmb3JtQnV0dG9uIiwiZmllbGRzIiwibW9kYWwiLCJtb2RhbFRleHQiLCJtb2RhbEJ1dHRvbiIsImUiLCJwcmV2ZW50RGVmYXVsdCIsImRhdGEiLCJuYW1lIiwiZWxlbWVudHMiLCJ2YWx1ZSIsInBob25lIiwiY29tbWVudCIsImZvcm1EYXRhIiwiRm9ybURhdGEiLCJhcHBlbmQiLCJjb25zb2xlIiwibG9nIiwieGhyIiwiWE1MSHR0cFJlcXVlc3QiLCJ2YWxpZGF0aW9uIiwiY2hlY2tWYWxpZGl0eSIsIm9wZW4iLCJzZXRSZXF1ZXN0SGVhZGVyIiwic2VuZCIsInJlc3BvbnNlVHlwZSIsInJlc3BvbnNlIiwic3RhdHVzIiwicmVzZXQiLCIkIiwid2luZG93Iiwid2lkdGgiLCJtZW51QWNjbyIsImhvcml6b250YWxBY2NvcmRlb24iLCJlbGVtZW50IiwibWVudSIsIm1lbnVQYXJlbnQiLCJ0YXJnZXQiLCJjbG9zZXN0IiwibWVudUJ1dHRvbiIsImNsYXNzTGlzdCIsImNvbnRhaW5zIiwibWVudUJ1dHRvblRleHQiLCJtZW51Q29udGVudCIsImxhc3RFbGVtZW50Q2hpbGQiLCJyZW1vdmUiLCJhZGQiLCJtZW51SXRlbXMiLCJmYWN0b3J5IiwiZGVmaW5lIiwiYW1kIiwiZXhwb3J0cyIsIm1vZHVsZSIsImpRdWVyeSIsInRvRml4IiwidG9CaW5kIiwiZG9jdW1lbnRNb2RlIiwic2xpY2UiLCJBcnJheSIsInByb3RvdHlwZSIsIm51bGxMb3dlc3REZWx0YVRpbWVvdXQiLCJsb3dlc3REZWx0YSIsImV2ZW50IiwiZml4SG9va3MiLCJtb3VzZUhvb2tzIiwic3BlY2lhbCIsIm1vdXNld2hlZWwiLCJ2ZXJzaW9uIiwic2V0dXAiLCJoYW5kbGVyIiwib25tb3VzZXdoZWVsIiwiZ2V0TGluZUhlaWdodCIsImdldFBhZ2VIZWlnaHQiLCJ0ZWFyZG93biIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJyZW1vdmVEYXRhIiwiZWxlbSIsIiRlbGVtIiwiJHBhcmVudCIsImZuIiwicGFyc2VJbnQiLCJjc3MiLCJoZWlnaHQiLCJzZXR0aW5ncyIsImFkanVzdE9sZERlbHRhcyIsIm5vcm1hbGl6ZU9mZnNldCIsImV4dGVuZCIsImJpbmQiLCJ0cmlnZ2VyIiwidW5tb3VzZXdoZWVsIiwidW5iaW5kIiwib3JnRXZlbnQiLCJhcmdzIiwiY2FsbCIsImFyZ3VtZW50cyIsImRlbHRhIiwiZGVsdGFYIiwiZGVsdGFZIiwiYWJzRGVsdGEiLCJvZmZzZXRYIiwib2Zmc2V0WSIsImZpeCIsInR5cGUiLCJkZXRhaWwiLCJ3aGVlbERlbHRhIiwid2hlZWxEZWx0YVkiLCJ3aGVlbERlbHRhWCIsImF4aXMiLCJIT1JJWk9OVEFMX0FYSVMiLCJkZWx0YU1vZGUiLCJsaW5lSGVpZ2h0IiwicGFnZUhlaWdodCIsIk1hdGgiLCJtYXgiLCJhYnMiLCJzaG91bGRBZGp1c3RPbGREZWx0YXMiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJib3VuZGluZ1JlY3QiLCJjbGllbnRYIiwibGVmdCIsImNsaWVudFkiLCJ0b3AiLCJkZWx0YUZhY3RvciIsInVuc2hpZnQiLCJjbGVhclRpbWVvdXQiLCJzZXRUaW1lb3V0IiwibnVsbExvd2VzdERlbHRhIiwiZGlzcGF0Y2giLCJoYW5kbGUiLCJhcHBseSIsImhhbWJ1cmdlciIsImZ1bGxzY3JlZW4iLCJvcGVuSGFtYnVyZ2VyTWVudSIsInJpZ2h0IiwiY2xvc2VIYW1idXJnZXJNZW51IiwicmVhZHkiLCJjb250YWluZXIiLCJzZWN0aW9ucyIsImluZGV4Iiwic2Nyb2xsIiwiYWRkQ2xhc3MiLCJvbiIsImFjdGl2ZVNlY3Rpb24iLCJmaWx0ZXIiLCJwcmV2IiwibmV4dCIsInBvc2l0aW9uIiwiZXEiLCJzaWJsaW5ncyIsInJlbW92ZUNsYXNzIiwiZmluZCIsIkFycm93cyIsInNsaWRlckxpc3QiLCJzbGlkZXMiLCJtb3ZlU2xpZGUiLCJzbGlkZU51bSIsImFjdGl2ZVNsaWRlIiwicmVxSXRlbSIsInJlcUluZGV4IiwiZHVyYXRpb24iLCJzdG9wIiwiYW5pbWF0ZSIsIiR0aGlzIiwibmV4dFNsaWRlIiwicHJldlNsaWRlIiwiaGFzQ2xhc3MiLCJmaXJzdCIsImxhc3QiLCJ0ZWFtcyIsImZvckVhY2giLCJ0ZWFtIiwiYWN0aXZlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTtBQUNBLElBQUFBLFlBQUEsR0FBQUMsUUFBQSxDQUFBQyxhQUFBLENBQUEsd0JBQUEsQ0FBQTtBQUNBLElBQUFDLGFBQUEsR0FBQUYsUUFBQSxDQUFBQyxhQUFBLENBQUEsaUJBQUEsQ0FBQTtBQUNBLElBQUFFLGVBQUEsR0FBQUgsUUFBQSxDQUFBSSxnQkFBQSxDQUFBLGVBQUEsQ0FBQTtBQUNBLElBQUFDLFFBQUEsR0FBQUwsUUFBQSxDQUFBSSxnQkFBQSxDQUFBLGlCQUFBLENBQUEsQyxDQUNBOztBQUVBTCxZQUFBLENBQUFPLGdCQUFBLENBQUEsT0FBQSxFQUFBLFlBQUE7QUFDQUosRUFBQUEsYUFBQSxDQUFBSyxLQUFBLENBQUFDLE9BQUEsR0FBQSxNQUFBO0FBQ0FSLEVBQUFBLFFBQUEsQ0FBQVMsSUFBQSxDQUFBRixLQUFBLENBQUFHLFFBQUEsR0FBQSxNQUFBO0FBQ0EsQ0FIQTs7MkJBS0FDLEM7QUFDQVIsRUFBQUEsZUFBQSxDQUFBUSxDQUFBLENBQUEsQ0FBQUwsZ0JBQUEsQ0FBQSxPQUFBLEVBQUEsWUFBQTtBQUNBSixJQUFBQSxhQUFBLENBQUFLLEtBQUEsQ0FBQUMsT0FBQSxHQUFBLE1BQUE7QUFDQUMsSUFBQUEsSUFBQSxDQUFBRixLQUFBLENBQUFHLFFBQUEsR0FBQSxRQUFBO0FBQ0EsUUFBQUUsaUJBQUEsR0FBQVosUUFBQSxDQUFBQyxhQUFBLENBQUEsdUJBQUEsQ0FBQTtBQUNBLFFBQUFZLGdCQUFBLEdBQUFiLFFBQUEsQ0FBQUksZ0JBQUEsQ0FBQSx1QkFBQSxDQUFBO0FBQ0EsUUFBQVUsbUJBQUEsR0FBQWQsUUFBQSxDQUFBQyxhQUFBLENBQUEsdUJBQUEsQ0FBQTtBQUNBLFFBQUFjLFVBQUEsR0FBQWYsUUFBQSxDQUFBSSxnQkFBQSxDQUFBLHNCQUFBLENBQUE7QUFDQVEsSUFBQUEsaUJBQUEsQ0FBQUksV0FBQSxHQUFBSCxnQkFBQSxDQUFBRixDQUFBLENBQUEsQ0FBQUssV0FBQTtBQUNBRixJQUFBQSxtQkFBQSxDQUFBRSxXQUFBLEdBQUFELFVBQUEsQ0FBQUosQ0FBQSxDQUFBLENBQUFLLFdBQUE7QUFHQSxHQVhBOzs7QUFEQSxLQUFBLElBQUFMLENBQUEsR0FBQSxDQUFBLEVBQUFBLENBQUEsR0FBQVIsZUFBQSxDQUFBYyxNQUFBLEVBQUFOLENBQUEsRUFBQSxFQUFBO0FBQUEsUUFBQUEsQ0FBQTtBQWFBLEMsQ0N6QkE7OztBQUVBLElBQUFPLElBQUEsR0FBQWxCLFFBQUEsQ0FBQUMsYUFBQSxDQUFBLGFBQUEsQ0FBQTtBQUNBLElBQUFrQixVQUFBLEdBQUFuQixRQUFBLENBQUFDLGFBQUEsQ0FBQSxvQkFBQSxDQUFBO0FBQ0EsSUFBQW1CLE1BQUEsR0FBQXBCLFFBQUEsQ0FBQUksZ0JBQUEsQ0FBQSxjQUFBLENBQUE7QUFDQSxJQUFBaUIsS0FBQSxHQUFBckIsUUFBQSxDQUFBQyxhQUFBLENBQUEsUUFBQSxDQUFBO0FBQ0EsSUFBQXFCLFNBQUEsR0FBQXRCLFFBQUEsQ0FBQUMsYUFBQSxDQUFBLHFCQUFBLENBQUE7QUFDQSxJQUFBc0IsV0FBQSxHQUFBdkIsUUFBQSxDQUFBQyxhQUFBLENBQUEsdUJBQUEsQ0FBQTtBQUNBLElBQUFRLElBQUEsR0FBQVQsUUFBQSxDQUFBQyxhQUFBLENBQUEsTUFBQSxDQUFBO0FBRUFzQixXQUFBLENBQUFqQixnQkFBQSxDQUFBLE9BQUEsRUFBQSxZQUFBO0FBQ0FlLEVBQUFBLEtBQUEsQ0FBQWQsS0FBQSxDQUFBQyxPQUFBLEdBQUEsTUFBQTtBQUNBQyxFQUFBQSxJQUFBLENBQUFGLEtBQUEsQ0FBQUcsUUFBQSxHQUFBLE1BQUE7QUFDQSxDQUhBO0FBS0FTLFVBQUEsQ0FBQWIsZ0JBQUEsQ0FBQSxPQUFBLEVBQUEsVUFBQWtCLENBQUEsRUFBQTtBQUNBQSxFQUFBQSxDQUFBLENBQUFDLGNBQUE7QUFDQSxNQUFBQyxJQUFBLEdBQUE7QUFBQUMsSUFBQUEsSUFBQSxFQUFBVCxJQUFBLENBQUFVLFFBQUEsQ0FBQUQsSUFBQSxDQUFBRSxLQUFBO0FBQUFDLElBQUFBLEtBQUEsRUFBQVosSUFBQSxDQUFBVSxRQUFBLENBQUFFLEtBQUEsQ0FBQUQsS0FBQTtBQUFBRSxJQUFBQSxPQUFBLEVBQUFiLElBQUEsQ0FBQVUsUUFBQSxDQUFBRyxPQUFBLENBQUFGO0FBQUEsR0FBQTtBQUNBLE1BQUFHLFFBQUEsR0FBQSxJQUFBQyxRQUFBLENBQUFmLElBQUEsQ0FBQTtBQUNBYyxFQUFBQSxRQUFBLENBQUFFLE1BQUEsQ0FBQSxNQUFBLEVBQUFoQixJQUFBLENBQUFVLFFBQUEsQ0FBQUQsSUFBQSxDQUFBRSxLQUFBO0FBQ0FHLEVBQUFBLFFBQUEsQ0FBQUUsTUFBQSxDQUFBLE9BQUEsRUFBQWhCLElBQUEsQ0FBQVUsUUFBQSxDQUFBRSxLQUFBLENBQUFELEtBQUE7QUFDQUcsRUFBQUEsUUFBQSxDQUFBRSxNQUFBLENBQUEsU0FBQSxFQUFBaEIsSUFBQSxDQUFBVSxRQUFBLENBQUFHLE9BQUEsQ0FBQUYsS0FBQTtBQUNBRyxFQUFBQSxRQUFBLENBQUFFLE1BQUEsQ0FBQSxJQUFBLEVBQUEsY0FBQTtBQUNBQyxFQUFBQSxPQUFBLENBQUFDLEdBQUEsQ0FBQUosUUFBQTtBQUNBRyxFQUFBQSxPQUFBLENBQUFDLEdBQUEsQ0FBQVYsSUFBQTtBQUVBLE1BQUFXLEdBQUEsR0FBQSxJQUFBQyxjQUFBLEVBQUE7O0FBRUEsV0FBQUMsVUFBQSxHQUFBO0FBQ0EsUUFBQXJCLElBQUEsQ0FBQVUsUUFBQSxDQUFBRCxJQUFBLENBQUFhLGFBQUEsTUFDQXRCLElBQUEsQ0FBQVUsUUFBQSxDQUFBRSxLQUFBLENBQUFVLGFBQUEsRUFEQSxJQUVBdEIsSUFBQSxDQUFBVSxRQUFBLENBQUFHLE9BQUEsQ0FBQVMsYUFBQSxFQUZBLEVBRUE7QUFDQSxhQUFBLElBQUE7QUFDQSxLQUpBLE1BSUE7QUFDQSxhQUFBLEtBQUE7QUFDQTtBQUNBOztBQUFBO0FBRUFMLEVBQUFBLE9BQUEsQ0FBQUMsR0FBQSxDQUFBRyxVQUFBLEVBQUE7O0FBRUEsTUFBQUEsVUFBQSxFQUFBLEVBQUE7QUFFQUYsSUFBQUEsR0FBQSxDQUFBSSxJQUFBLENBQUEsTUFBQSxFQUFBLDRDQUFBO0FBQ0FKLElBQUFBLEdBQUEsQ0FBQUssZ0JBQUEsQ0FBQSxrQkFBQSxFQUFBLGdCQUFBO0FBQ0FMLElBQUFBLEdBQUEsQ0FBQU0sSUFBQSxDQUFBWCxRQUFBO0FBQ0FLLElBQUFBLEdBQUEsQ0FBQU8sWUFBQSxHQUFBLE1BQUE7QUFDQVAsSUFBQUEsR0FBQSxDQUFBL0IsZ0JBQUEsQ0FBQSxNQUFBLEVBQUEsWUFBQTtBQUNBLFVBQUErQixHQUFBLENBQUFRLFFBQUEsQ0FBQUMsTUFBQSxFQUFBO0FBQ0F6QixRQUFBQSxLQUFBLENBQUFkLEtBQUEsQ0FBQUMsT0FBQSxHQUFBLE1BQUE7QUFDQWMsUUFBQUEsU0FBQSxDQUFBTixXQUFBLEdBQUEsc0JBQUE7QUFDQVAsUUFBQUEsSUFBQSxDQUFBRixLQUFBLENBQUFHLFFBQUEsR0FBQSxRQUFBO0FBQ0FRLFFBQUFBLElBQUEsQ0FBQTZCLEtBQUE7QUFDQSxPQU5BLENBT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQSxLQVpBO0FBYUEsR0FuQkEsTUFtQkE7QUFDQTFCLElBQUFBLEtBQUEsQ0FBQWQsS0FBQSxDQUFBQyxPQUFBLEdBQUEsTUFBQTtBQUNBYyxJQUFBQSxTQUFBLENBQUFOLFdBQUEsR0FBQSw0REFBQTtBQUNBUCxJQUFBQSxJQUFBLENBQUFGLEtBQUEsQ0FBQUcsUUFBQSxHQUFBLFFBQUE7O0FBQ0EsUUFBQXNDLENBQUEsQ0FBQUMsTUFBQSxDQUFBLENBQUFDLEtBQUEsS0FBQSxHQUFBLEVBQUE7QUFDQXpDLE1BQUFBLElBQUEsQ0FBQUYsS0FBQSxDQUFBRyxRQUFBLEdBQUEsUUFBQTtBQUNBOztBQUFBO0FBQ0E7QUFDQSxDQXBEQSxFLENDZkE7O0FBRUEsSUFBQXlDLFFBQUEsR0FBQW5ELFFBQUEsQ0FBQUMsYUFBQSxDQUFBLGlCQUFBLENBQUE7QUFHQW1ELG1CQUFBLENBQUFELFFBQUEsQ0FBQTs7QUFHQSxTQUFBQyxtQkFBQSxDQUFBQyxPQUFBLEVBQUE7QUFDQUEsRUFBQUEsT0FBQSxDQUFBL0MsZ0JBQUEsQ0FBQSxPQUFBLEVBQUEsVUFBQWtCLENBQUEsRUFBQTtBQUNBQSxJQUFBQSxDQUFBLENBQUFDLGNBQUE7QUFFQSxRQUFBNkIsSUFBQSxHQUFBdEQsUUFBQSxDQUFBSSxnQkFBQSxDQUFBLHVCQUFBLENBQUE7QUFDQSxRQUFBbUQsVUFBQSxHQUFBL0IsQ0FBQSxDQUFBZ0MsTUFBQSxDQUFBQyxPQUFBLENBQUEsdUJBQUEsQ0FBQTtBQUNBLFFBQUFDLFVBQUEsR0FBQWxDLENBQUEsQ0FBQWdDLE1BQUEsQ0FBQUcsU0FBQSxDQUFBQyxRQUFBLENBQUEsd0JBQUEsQ0FBQTtBQUNBLFFBQUFDLGNBQUEsR0FBQXJDLENBQUEsQ0FBQWdDLE1BQUEsQ0FBQUcsU0FBQSxDQUFBQyxRQUFBLENBQUEsc0JBQUEsQ0FBQTtBQUNBLFFBQUFFLFdBQUEsR0FBQVAsVUFBQSxDQUFBUSxnQkFBQTs7QUFFQSxRQUFBTCxVQUFBLElBQUFHLGNBQUEsRUFBQTtBQUNBLFVBQUFOLFVBQUEsQ0FBQUksU0FBQSxDQUFBQyxRQUFBLENBQUEsOEJBQUEsQ0FBQSxFQUFBO0FBQ0FMLFFBQUFBLFVBQUEsQ0FBQUksU0FBQSxDQUFBSyxNQUFBLENBQUEsOEJBQUE7QUFDQUYsUUFBQUEsV0FBQSxDQUFBSCxTQUFBLENBQUFNLEdBQUEsQ0FBQSxVQUFBO0FBQ0EsT0FIQSxNQUdBO0FBQ0EsYUFBQSxJQUFBdEQsQ0FBQSxHQUFBLENBQUEsRUFBQUEsQ0FBQSxHQUFBMkMsSUFBQSxDQUFBckMsTUFBQSxFQUFBTixDQUFBLEVBQUEsRUFBQTtBQUNBLGNBQUF1RCxVQUFBLEdBQUFaLElBQUEsQ0FBQTNDLENBQUEsQ0FBQTtBQUNBbUQsVUFBQUEsV0FBQSxDQUFBSCxTQUFBLENBQUFNLEdBQUEsQ0FBQSxVQUFBOztBQUNBQyxVQUFBQSxVQUFBLENBQUFQLFNBQUEsQ0FBQUssTUFBQSxDQUFBLDhCQUFBO0FBRUE7O0FBQ0FGLFFBQUFBLFdBQUEsQ0FBQUgsU0FBQSxDQUFBSyxNQUFBLENBQUEsVUFBQTtBQUNBVCxRQUFBQSxVQUFBLENBQUFJLFNBQUEsQ0FBQU0sR0FBQSxDQUFBLDhCQUFBO0FBQ0E7QUFDQTtBQUVBLEdBekJBO0FBMEJBLEMsQ0FLQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTs7QUN4REE7Ozs7Ozs7OztBQVFBLFdBQUFFLE9BQUEsRUFBQTtBQUNBLE1BQUEsT0FBQUMsTUFBQSxLQUFBLFVBQUEsSUFBQUEsTUFBQSxDQUFBQyxHQUFBLEVBQUE7QUFDQTtBQUNBRCxJQUFBQSxNQUFBLENBQUEsQ0FBQSxRQUFBLENBQUEsRUFBQUQsT0FBQSxDQUFBO0FBQ0EsR0FIQSxNQUdBLElBQUEsUUFBQUcsT0FBQSx5Q0FBQUEsT0FBQSxPQUFBLFFBQUEsRUFBQTtBQUNBO0FBQ0FDLElBQUFBLE1BQUEsQ0FBQUQsT0FBQSxHQUFBSCxPQUFBO0FBQ0EsR0FIQSxNQUdBO0FBQ0E7QUFDQUEsSUFBQUEsT0FBQSxDQUFBSyxNQUFBLENBQUE7QUFDQTtBQUNBLENBWEEsRUFXQSxVQUFBeEIsQ0FBQSxFQUFBO0FBRUEsTUFBQXlCLEtBQUEsR0FBQSxDQUFBLE9BQUEsRUFBQSxZQUFBLEVBQUEsZ0JBQUEsRUFBQSxxQkFBQSxDQUFBO0FBQUEsTUFDQUMsTUFBQSxHQUFBLGFBQUExRSxRQUFBLElBQUFBLFFBQUEsQ0FBQTJFLFlBQUEsSUFBQSxDQUFBLEdBQ0EsQ0FBQSxPQUFBLENBREEsR0FDQSxDQUFBLFlBQUEsRUFBQSxnQkFBQSxFQUFBLHFCQUFBLENBRkE7QUFBQSxNQUdBQyxLQUFBLEdBQUFDLEtBQUEsQ0FBQUMsU0FBQSxDQUFBRixLQUhBO0FBQUEsTUFJQUcsc0JBSkE7QUFBQSxNQUlBQyxXQUpBOztBQU1BLE1BQUFoQyxDQUFBLENBQUFpQyxLQUFBLENBQUFDLFFBQUEsRUFBQTtBQUNBLFNBQUEsSUFBQXZFLENBQUEsR0FBQThELEtBQUEsQ0FBQXhELE1BQUEsRUFBQU4sQ0FBQSxHQUFBO0FBQ0FxQyxNQUFBQSxDQUFBLENBQUFpQyxLQUFBLENBQUFDLFFBQUEsQ0FBQVQsS0FBQSxDQUFBLEVBQUE5RCxDQUFBLENBQUEsSUFBQXFDLENBQUEsQ0FBQWlDLEtBQUEsQ0FBQUUsVUFBQTtBQUNBO0FBQ0E7O0FBRUEsTUFBQUMsT0FBQSxHQUFBcEMsQ0FBQSxDQUFBaUMsS0FBQSxDQUFBRyxPQUFBLENBQUFDLFVBQUEsR0FBQTtBQUNBQyxJQUFBQSxPQUFBLEVBQUEsUUFEQTtBQUdBQyxJQUFBQSxLQUFBLEVBQUEsaUJBQUE7QUFDQSxVQUFBLEtBQUFqRixnQkFBQSxFQUFBO0FBQ0EsYUFBQSxJQUFBSyxDQUFBLEdBQUErRCxNQUFBLENBQUF6RCxNQUFBLEVBQUFOLENBQUEsR0FBQTtBQUNBLGVBQUFMLGdCQUFBLENBQUFvRSxNQUFBLENBQUEsRUFBQS9ELENBQUEsQ0FBQSxFQUFBNkUsT0FBQSxFQUFBLEtBQUE7QUFDQTtBQUNBLE9BSkEsTUFJQTtBQUNBLGFBQUFDLFlBQUEsR0FBQUQsT0FBQTtBQUNBLE9BUEEsQ0FRQTs7O0FBQ0F4QyxNQUFBQSxDQUFBLENBQUF0QixJQUFBLENBQUEsSUFBQSxFQUFBLHdCQUFBLEVBQUEwRCxPQUFBLENBQUFNLGFBQUEsQ0FBQSxJQUFBLENBQUE7QUFDQTFDLE1BQUFBLENBQUEsQ0FBQXRCLElBQUEsQ0FBQSxJQUFBLEVBQUEsd0JBQUEsRUFBQTBELE9BQUEsQ0FBQU8sYUFBQSxDQUFBLElBQUEsQ0FBQTtBQUNBLEtBZEE7QUFnQkFDLElBQUFBLFFBQUEsRUFBQSxvQkFBQTtBQUNBLFVBQUEsS0FBQUMsbUJBQUEsRUFBQTtBQUNBLGFBQUEsSUFBQWxGLENBQUEsR0FBQStELE1BQUEsQ0FBQXpELE1BQUEsRUFBQU4sQ0FBQSxHQUFBO0FBQ0EsZUFBQWtGLG1CQUFBLENBQUFuQixNQUFBLENBQUEsRUFBQS9ELENBQUEsQ0FBQSxFQUFBNkUsT0FBQSxFQUFBLEtBQUE7QUFDQTtBQUNBLE9BSkEsTUFJQTtBQUNBLGFBQUFDLFlBQUEsR0FBQSxJQUFBO0FBQ0EsT0FQQSxDQVFBOzs7QUFDQXpDLE1BQUFBLENBQUEsQ0FBQThDLFVBQUEsQ0FBQSxJQUFBLEVBQUEsd0JBQUE7QUFDQTlDLE1BQUFBLENBQUEsQ0FBQThDLFVBQUEsQ0FBQSxJQUFBLEVBQUEsd0JBQUE7QUFDQSxLQTNCQTtBQTZCQUosSUFBQUEsYUFBQSxFQUFBLHVCQUFBSyxJQUFBLEVBQUE7QUFDQSxVQUFBQyxLQUFBLEdBQUFoRCxDQUFBLENBQUErQyxJQUFBLENBQUE7QUFBQSxVQUNBRSxPQUFBLEdBQUFELEtBQUEsQ0FBQSxrQkFBQWhELENBQUEsQ0FBQWtELEVBQUEsR0FBQSxjQUFBLEdBQUEsUUFBQSxDQUFBLEVBREE7O0FBRUEsVUFBQSxDQUFBRCxPQUFBLENBQUFoRixNQUFBLEVBQUE7QUFDQWdGLFFBQUFBLE9BQUEsR0FBQWpELENBQUEsQ0FBQSxNQUFBLENBQUE7QUFDQTs7QUFDQSxhQUFBbUQsUUFBQSxDQUFBRixPQUFBLENBQUFHLEdBQUEsQ0FBQSxVQUFBLENBQUEsRUFBQSxFQUFBLENBQUEsSUFBQUQsUUFBQSxDQUFBSCxLQUFBLENBQUFJLEdBQUEsQ0FBQSxVQUFBLENBQUEsRUFBQSxFQUFBLENBQUEsSUFBQSxFQUFBO0FBQ0EsS0FwQ0E7QUFzQ0FULElBQUFBLGFBQUEsRUFBQSx1QkFBQUksSUFBQSxFQUFBO0FBQ0EsYUFBQS9DLENBQUEsQ0FBQStDLElBQUEsQ0FBQSxDQUFBTSxNQUFBLEVBQUE7QUFDQSxLQXhDQTtBQTBDQUMsSUFBQUEsUUFBQSxFQUFBO0FBQ0FDLE1BQUFBLGVBQUEsRUFBQSxJQURBO0FBQ0E7QUFDQUMsTUFBQUEsZUFBQSxFQUFBLElBRkEsQ0FFQTs7QUFGQTtBQTFDQSxHQUFBO0FBZ0RBeEQsRUFBQUEsQ0FBQSxDQUFBa0QsRUFBQSxDQUFBTyxNQUFBLENBQUE7QUFDQXBCLElBQUFBLFVBQUEsRUFBQSxvQkFBQWEsRUFBQSxFQUFBO0FBQ0EsYUFBQUEsRUFBQSxHQUFBLEtBQUFRLElBQUEsQ0FBQSxZQUFBLEVBQUFSLEVBQUEsQ0FBQSxHQUFBLEtBQUFTLE9BQUEsQ0FBQSxZQUFBLENBQUE7QUFDQSxLQUhBO0FBS0FDLElBQUFBLFlBQUEsRUFBQSxzQkFBQVYsRUFBQSxFQUFBO0FBQ0EsYUFBQSxLQUFBVyxNQUFBLENBQUEsWUFBQSxFQUFBWCxFQUFBLENBQUE7QUFDQTtBQVBBLEdBQUE7O0FBV0EsV0FBQVYsT0FBQSxDQUFBUCxLQUFBLEVBQUE7QUFDQSxRQUFBNkIsUUFBQSxHQUFBN0IsS0FBQSxJQUFBaEMsTUFBQSxDQUFBZ0MsS0FBQTtBQUFBLFFBQ0E4QixJQUFBLEdBQUFuQyxLQUFBLENBQUFvQyxJQUFBLENBQUFDLFNBQUEsRUFBQSxDQUFBLENBREE7QUFBQSxRQUVBQyxLQUFBLEdBQUEsQ0FGQTtBQUFBLFFBR0FDLE1BQUEsR0FBQSxDQUhBO0FBQUEsUUFJQUMsTUFBQSxHQUFBLENBSkE7QUFBQSxRQUtBQyxRQUFBLEdBQUEsQ0FMQTtBQUFBLFFBTUFDLE9BQUEsR0FBQSxDQU5BO0FBQUEsUUFPQUMsT0FBQSxHQUFBLENBUEE7QUFRQXRDLElBQUFBLEtBQUEsR0FBQWpDLENBQUEsQ0FBQWlDLEtBQUEsQ0FBQXVDLEdBQUEsQ0FBQVYsUUFBQSxDQUFBO0FBQ0E3QixJQUFBQSxLQUFBLENBQUF3QyxJQUFBLEdBQUEsWUFBQSxDQVZBLENBWUE7O0FBQ0EsUUFBQSxZQUFBWCxRQUFBLEVBQUE7QUFBQU0sTUFBQUEsTUFBQSxHQUFBTixRQUFBLENBQUFZLE1BQUEsR0FBQSxDQUFBLENBQUE7QUFBQTs7QUFDQSxRQUFBLGdCQUFBWixRQUFBLEVBQUE7QUFBQU0sTUFBQUEsTUFBQSxHQUFBTixRQUFBLENBQUFhLFVBQUE7QUFBQTs7QUFDQSxRQUFBLGlCQUFBYixRQUFBLEVBQUE7QUFBQU0sTUFBQUEsTUFBQSxHQUFBTixRQUFBLENBQUFjLFdBQUE7QUFBQTs7QUFDQSxRQUFBLGlCQUFBZCxRQUFBLEVBQUE7QUFBQUssTUFBQUEsTUFBQSxHQUFBTCxRQUFBLENBQUFlLFdBQUEsR0FBQSxDQUFBLENBQUE7QUFBQSxLQWhCQSxDQWtCQTs7O0FBQ0EsUUFBQSxVQUFBZixRQUFBLElBQUFBLFFBQUEsQ0FBQWdCLElBQUEsS0FBQWhCLFFBQUEsQ0FBQWlCLGVBQUEsRUFBQTtBQUNBWixNQUFBQSxNQUFBLEdBQUFDLE1BQUEsR0FBQSxDQUFBLENBQUE7QUFDQUEsTUFBQUEsTUFBQSxHQUFBLENBQUE7QUFDQSxLQXRCQSxDQXdCQTs7O0FBQ0FGLElBQUFBLEtBQUEsR0FBQUUsTUFBQSxLQUFBLENBQUEsR0FBQUQsTUFBQSxHQUFBQyxNQUFBLENBekJBLENBMkJBOztBQUNBLFFBQUEsWUFBQU4sUUFBQSxFQUFBO0FBQ0FNLE1BQUFBLE1BQUEsR0FBQU4sUUFBQSxDQUFBTSxNQUFBLEdBQUEsQ0FBQSxDQUFBO0FBQ0FGLE1BQUFBLEtBQUEsR0FBQUUsTUFBQTtBQUNBOztBQUNBLFFBQUEsWUFBQU4sUUFBQSxFQUFBO0FBQ0FLLE1BQUFBLE1BQUEsR0FBQUwsUUFBQSxDQUFBSyxNQUFBOztBQUNBLFVBQUFDLE1BQUEsS0FBQSxDQUFBLEVBQUE7QUFBQUYsUUFBQUEsS0FBQSxHQUFBQyxNQUFBLEdBQUEsQ0FBQSxDQUFBO0FBQUE7QUFDQSxLQW5DQSxDQXFDQTs7O0FBQ0EsUUFBQUMsTUFBQSxLQUFBLENBQUEsSUFBQUQsTUFBQSxLQUFBLENBQUEsRUFBQTtBQUFBO0FBQUEsS0F0Q0EsQ0F3Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0EsUUFBQUwsUUFBQSxDQUFBa0IsU0FBQSxLQUFBLENBQUEsRUFBQTtBQUNBLFVBQUFDLFVBQUEsR0FBQWpGLENBQUEsQ0FBQXRCLElBQUEsQ0FBQSxJQUFBLEVBQUEsd0JBQUEsQ0FBQTtBQUNBd0YsTUFBQUEsS0FBQSxJQUFBZSxVQUFBO0FBQ0FiLE1BQUFBLE1BQUEsSUFBQWEsVUFBQTtBQUNBZCxNQUFBQSxNQUFBLElBQUFjLFVBQUE7QUFDQSxLQUxBLE1BS0EsSUFBQW5CLFFBQUEsQ0FBQWtCLFNBQUEsS0FBQSxDQUFBLEVBQUE7QUFDQSxVQUFBRSxVQUFBLEdBQUFsRixDQUFBLENBQUF0QixJQUFBLENBQUEsSUFBQSxFQUFBLHdCQUFBLENBQUE7QUFDQXdGLE1BQUFBLEtBQUEsSUFBQWdCLFVBQUE7QUFDQWQsTUFBQUEsTUFBQSxJQUFBYyxVQUFBO0FBQ0FmLE1BQUFBLE1BQUEsSUFBQWUsVUFBQTtBQUNBLEtBdkRBLENBeURBOzs7QUFDQWIsSUFBQUEsUUFBQSxHQUFBYyxJQUFBLENBQUFDLEdBQUEsQ0FBQUQsSUFBQSxDQUFBRSxHQUFBLENBQUFqQixNQUFBLENBQUEsRUFBQWUsSUFBQSxDQUFBRSxHQUFBLENBQUFsQixNQUFBLENBQUEsQ0FBQTs7QUFFQSxRQUFBLENBQUFuQyxXQUFBLElBQUFxQyxRQUFBLEdBQUFyQyxXQUFBLEVBQUE7QUFDQUEsTUFBQUEsV0FBQSxHQUFBcUMsUUFBQSxDQURBLENBR0E7O0FBQ0EsVUFBQWlCLHFCQUFBLENBQUF4QixRQUFBLEVBQUFPLFFBQUEsQ0FBQSxFQUFBO0FBQ0FyQyxRQUFBQSxXQUFBLElBQUEsRUFBQTtBQUNBO0FBQ0EsS0FuRUEsQ0FxRUE7OztBQUNBLFFBQUFzRCxxQkFBQSxDQUFBeEIsUUFBQSxFQUFBTyxRQUFBLENBQUEsRUFBQTtBQUNBO0FBQ0FILE1BQUFBLEtBQUEsSUFBQSxFQUFBO0FBQ0FDLE1BQUFBLE1BQUEsSUFBQSxFQUFBO0FBQ0FDLE1BQUFBLE1BQUEsSUFBQSxFQUFBO0FBQ0EsS0EzRUEsQ0E2RUE7OztBQUNBRixJQUFBQSxLQUFBLEdBQUFpQixJQUFBLENBQUFqQixLQUFBLElBQUEsQ0FBQSxHQUFBLE9BQUEsR0FBQSxNQUFBLENBQUEsQ0FBQUEsS0FBQSxHQUFBbEMsV0FBQSxDQUFBO0FBQ0FtQyxJQUFBQSxNQUFBLEdBQUFnQixJQUFBLENBQUFoQixNQUFBLElBQUEsQ0FBQSxHQUFBLE9BQUEsR0FBQSxNQUFBLENBQUEsQ0FBQUEsTUFBQSxHQUFBbkMsV0FBQSxDQUFBO0FBQ0FvQyxJQUFBQSxNQUFBLEdBQUFlLElBQUEsQ0FBQWYsTUFBQSxJQUFBLENBQUEsR0FBQSxPQUFBLEdBQUEsTUFBQSxDQUFBLENBQUFBLE1BQUEsR0FBQXBDLFdBQUEsQ0FBQSxDQWhGQSxDQWtGQTs7QUFDQSxRQUFBSSxPQUFBLENBQUFrQixRQUFBLENBQUFFLGVBQUEsSUFBQSxLQUFBK0IscUJBQUEsRUFBQTtBQUNBLFVBQUFDLFlBQUEsR0FBQSxLQUFBRCxxQkFBQSxFQUFBO0FBQ0FqQixNQUFBQSxPQUFBLEdBQUFyQyxLQUFBLENBQUF3RCxPQUFBLEdBQUFELFlBQUEsQ0FBQUUsSUFBQTtBQUNBbkIsTUFBQUEsT0FBQSxHQUFBdEMsS0FBQSxDQUFBMEQsT0FBQSxHQUFBSCxZQUFBLENBQUFJLEdBQUE7QUFDQSxLQXZGQSxDQXlGQTs7O0FBQ0EzRCxJQUFBQSxLQUFBLENBQUFrQyxNQUFBLEdBQUFBLE1BQUE7QUFDQWxDLElBQUFBLEtBQUEsQ0FBQW1DLE1BQUEsR0FBQUEsTUFBQTtBQUNBbkMsSUFBQUEsS0FBQSxDQUFBNEQsV0FBQSxHQUFBN0QsV0FBQTtBQUNBQyxJQUFBQSxLQUFBLENBQUFxQyxPQUFBLEdBQUFBLE9BQUE7QUFDQXJDLElBQUFBLEtBQUEsQ0FBQXNDLE9BQUEsR0FBQUEsT0FBQSxDQTlGQSxDQStGQTtBQUNBO0FBQ0E7O0FBQ0F0QyxJQUFBQSxLQUFBLENBQUErQyxTQUFBLEdBQUEsQ0FBQSxDQWxHQSxDQW9HQTs7QUFDQWpCLElBQUFBLElBQUEsQ0FBQStCLE9BQUEsQ0FBQTdELEtBQUEsRUFBQWlDLEtBQUEsRUFBQUMsTUFBQSxFQUFBQyxNQUFBLEVBckdBLENBdUdBO0FBQ0E7QUFDQTtBQUNBOztBQUNBLFFBQUFyQyxzQkFBQSxFQUFBO0FBQUFnRSxNQUFBQSxZQUFBLENBQUFoRSxzQkFBQSxDQUFBO0FBQUE7O0FBQ0FBLElBQUFBLHNCQUFBLEdBQUFpRSxVQUFBLENBQUFDLGVBQUEsRUFBQSxHQUFBLENBQUE7QUFFQSxXQUFBLENBQUFqRyxDQUFBLENBQUFpQyxLQUFBLENBQUFpRSxRQUFBLElBQUFsRyxDQUFBLENBQUFpQyxLQUFBLENBQUFrRSxNQUFBLEVBQUFDLEtBQUEsQ0FBQSxJQUFBLEVBQUFyQyxJQUFBLENBQUE7QUFDQTs7QUFFQSxXQUFBa0MsZUFBQSxHQUFBO0FBQ0FqRSxJQUFBQSxXQUFBLEdBQUEsSUFBQTtBQUNBOztBQUVBLFdBQUFzRCxxQkFBQSxDQUFBeEIsUUFBQSxFQUFBTyxRQUFBLEVBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQUFqQyxPQUFBLENBQUFrQixRQUFBLENBQUFDLGVBQUEsSUFBQU8sUUFBQSxDQUFBVyxJQUFBLEtBQUEsWUFBQSxJQUFBSixRQUFBLEdBQUEsR0FBQSxLQUFBLENBQUE7QUFDQTtBQUVBLENBcE5BLENBQUEsQyxDQ1JBOzs7QUFDQSxJQUFBZ0MsU0FBQSxHQUFBckosUUFBQSxDQUFBQyxhQUFBLENBQUEsWUFBQSxDQUFBO0FBQ0EsSUFBQXFKLFVBQUEsR0FBQXRKLFFBQUEsQ0FBQUMsYUFBQSxDQUFBLGFBQUEsQ0FBQTtBQUNBLElBQUFpRSxTQUFBLEdBQUFsRSxRQUFBLENBQUFJLGdCQUFBLENBQUEsMkJBQUEsQ0FBQTs7QUFFQSxTQUFBbUosaUJBQUEsR0FBQTtBQUNBRCxFQUFBQSxVQUFBLENBQUEvSSxLQUFBLENBQUFpSixLQUFBLEdBQUEsR0FBQTtBQUNBSCxFQUFBQSxTQUFBLENBQUExRixTQUFBLENBQUFNLEdBQUEsQ0FBQSxXQUFBO0FBQ0F4RCxFQUFBQSxJQUFBLENBQUFGLEtBQUEsQ0FBQUcsUUFBQSxHQUFBLFFBQUE7QUFFQTs7QUFFQSxTQUFBK0ksa0JBQUEsR0FBQTtBQUNBSCxFQUFBQSxVQUFBLENBQUEvSSxLQUFBLENBQUFpSixLQUFBLEdBQUEsT0FBQTtBQUNBSCxFQUFBQSxTQUFBLENBQUExRixTQUFBLENBQUFLLE1BQUEsQ0FBQSxXQUFBO0FBQ0F2RCxFQUFBQSxJQUFBLENBQUFGLEtBQUEsQ0FBQUcsUUFBQSxHQUFBLE1BQUE7QUFHQTs7QUFFQTJJLFNBQUEsQ0FBQS9JLGdCQUFBLENBQUEsT0FBQSxFQUFBLFVBQUFrQixDQUFBLEVBQUE7QUFDQUEsRUFBQUEsQ0FBQSxDQUFBQyxjQUFBOztBQUNBLE1BQUE0SCxTQUFBLENBQUExRixTQUFBLENBQUFDLFFBQUEsQ0FBQSxXQUFBLENBQUEsRUFBQTtBQUNBO0FBQ0E7QUFDQTZGLElBQUFBLGtCQUFBLEdBSEEsQ0FJQTtBQUNBO0FBRUEsR0FQQSxNQU9BO0FBQ0FGLElBQUFBLGlCQUFBO0FBRUE7QUFFQSxDQWRBO0FBZ0JBRCxVQUFBLENBQUFoSixnQkFBQSxDQUFBLE9BQUEsRUFBQSxVQUFBa0IsQ0FBQSxFQUFBO0FBQ0FBLEVBQUFBLENBQUEsQ0FBQUMsY0FBQTs7QUFFQSxNQUFBRCxDQUFBLENBQUFnQyxNQUFBLENBQUFHLFNBQUEsQ0FBQUMsUUFBQSxDQUFBLDBCQUFBLENBQUEsRUFBQTtBQUNBNkYsSUFBQUEsa0JBQUE7QUFDQTtBQUVBLENBUEEsRSxDQVdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUM1REE7O0FBRUF6RyxDQUFBLENBQUFoRCxRQUFBLENBQUEsQ0FBQTBKLEtBQUEsQ0FBQSxZQUFBO0FBRUEsTUFBQUMsU0FBQSxHQUFBM0csQ0FBQSxDQUFBLGNBQUEsQ0FBQTtBQUFBLE1BQ0E0RyxRQUFBLEdBQUE1RyxDQUFBLENBQUEsVUFBQSxDQURBO0FBQUEsTUFFQTZHLEtBQUEsR0FBQSxDQUZBO0FBQUEsTUFHQUMsTUFBQSxHQUFBLEtBSEE7QUFLQTlHLEVBQUFBLENBQUEsQ0FBQSxzQkFBQSxDQUFBLENBQUErRyxRQUFBLENBQUEsUUFBQTtBQUVBL0csRUFBQUEsQ0FBQSxDQUFBLE1BQUEsQ0FBQSxDQUFBZ0gsRUFBQSxDQUFBLFlBQUEsRUFBQSxVQUFBL0UsS0FBQSxFQUFBO0FBRUEsUUFBQWdGLGFBQUEsR0FBQUwsUUFBQSxDQUFBTSxNQUFBLENBQUEsU0FBQSxDQUFBOztBQUVBLFFBQUEsQ0FBQUosTUFBQSxFQUFBO0FBRUFBLE1BQUFBLE1BQUEsOEJBQUEsSUFBQSxDQUFBOztBQUVBLFVBQUE3RSxLQUFBLENBQUFtQyxNQUFBLEdBQUEsQ0FBQSxFQUFBO0FBRUEsWUFBQTZDLGFBQUEsQ0FBQUUsSUFBQSxHQUFBbEosTUFBQSxFQUFBO0FBQ0EsbUNBQUE0SSxLQUFBO0FBQ0E7QUFFQSxPQU5BLE1BTUE7QUFFQSxZQUFBSSxhQUFBLENBQUFHLElBQUEsR0FBQW5KLE1BQUEsRUFBQTtBQUNBLG1DQUFBNEksS0FBQTtBQUNBO0FBRUE7QUFFQTs7QUFFQVEsSUFBQUEsUUFBQSxHQUFBLENBQUFSLEtBQUEsR0FBQSxHQUFBLEdBQUEsSUFBQTtBQUNBRCxJQUFBQSxRQUFBLENBQUFVLEVBQUEsQ0FBQVQsS0FBQSxFQUFBRSxRQUFBLENBQUEsUUFBQSxFQUFBUSxRQUFBLEdBQUFDLFdBQUEsQ0FBQSxRQUFBO0FBRUFiLElBQUFBLFNBQUEsQ0FBQXZELEdBQUEsQ0FBQSxLQUFBLEVBQUFpRSxRQUFBO0FBRUFyQixJQUFBQSxVQUFBLENBQUEsWUFBQTtBQUNBYyxNQUFBQSxNQUFBLDhCQUFBLEtBQUEsQ0FBQTtBQUVBLEtBSEEsRUFHQSxJQUhBLENBQUE7QUFLQSxHQWxDQTtBQW9DQSxDQTdDQSxFLENDRkE7O0FBRUE5RyxDQUFBLENBQUEsbUJBQUEsQ0FBQSxDQUFBZ0gsRUFBQSxDQUFBLFlBQUEsRUFBQSxZQUFBO0FBQ0FoSCxFQUFBQSxDQUFBLENBQUEsSUFBQSxDQUFBLENBQUF5SCxJQUFBLENBQUEsUUFBQSxFQUFBVixRQUFBLENBQUEsUUFBQTtBQUNBNUgsRUFBQUEsT0FBQSxDQUFBQyxHQUFBLENBQUEsQ0FBQTtBQUNBLENBSEE7QUFJQVksQ0FBQSxDQUFBLG1CQUFBLENBQUEsQ0FBQWdILEVBQUEsQ0FBQSxZQUFBLEVBQUEsWUFBQTtBQUNBaEgsRUFBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBQSxDQUFBeUgsSUFBQSxDQUFBLFFBQUEsRUFBQUQsV0FBQSxDQUFBLFFBQUE7QUFDQXJJLEVBQUFBLE9BQUEsQ0FBQUMsR0FBQSxDQUFBLENBQUE7QUFDQSxDQUhBO0FBSUFZLENBQUEsQ0FBQSxjQUFBLENBQUEsQ0FBQWdILEVBQUEsQ0FBQSxPQUFBLEVBQUEsWUFBQTtBQUNBaEgsRUFBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBQSxDQUFBeUgsSUFBQSxDQUFBLFFBQUEsRUFBQUQsV0FBQSxDQUFBLFFBQUE7QUFDQXJJLEVBQUFBLE9BQUEsQ0FBQUMsR0FBQSxDQUFBLENBQUE7QUFDQSxDQUhBLEUsQ0NWQTs7QUFDQSxJQUFBc0ksTUFBQSxHQUFBMUgsQ0FBQSxDQUFBLGlCQUFBLENBQUE7QUFDQSxJQUFBMkgsVUFBQSxHQUFBM0gsQ0FBQSxDQUFBLGVBQUEsQ0FBQTtBQUNBLElBQUE0SCxNQUFBLEdBQUE1SCxDQUFBLENBQUEsaUJBQUEsQ0FBQTtBQUdBQSxDQUFBLENBQUEsWUFBQTtBQUVBLE1BQUE2SCxTQUFBLEdBQUEsU0FBQUEsU0FBQSxDQUFBbEIsU0FBQSxFQUFBbUIsUUFBQSxFQUFBO0FBQ0EsUUFBQUMsV0FBQSxHQUFBSCxNQUFBLENBQUFWLE1BQUEsQ0FBQSxTQUFBLENBQUE7QUFBQSxRQUNBYyxPQUFBLEdBQUFKLE1BQUEsQ0FBQU4sRUFBQSxDQUFBUSxRQUFBLENBREE7QUFBQSxRQUVBRyxRQUFBLEdBQUFELE9BQUEsQ0FBQW5CLEtBQUEsRUFGQTtBQUFBLFFBR0FxQixRQUFBLEdBQUEsR0FIQTs7QUFLQSxRQUFBRixPQUFBLENBQUEvSixNQUFBLEVBQUE7QUFDQTBKLE1BQUFBLFVBQUEsQ0FBQVEsSUFBQSxDQUFBLElBQUEsRUFBQSxLQUFBLEVBQUFDLE9BQUEsQ0FBQTtBQUNBLGdCQUFBLENBQUFILFFBQUEsR0FBQSxHQUFBLEdBQUE7QUFEQSxPQUFBLEVBR0FDLFFBSEEsRUFHQSxZQUFBO0FBQ0FILFFBQUFBLFdBQUEsQ0FBQVAsV0FBQSxDQUFBLFFBQUE7QUFDQVEsUUFBQUEsT0FBQSxDQUFBakIsUUFBQSxDQUFBLFFBQUE7QUFDQSxPQU5BO0FBUUE7QUFFQSxHQWpCQTs7QUFtQkFXLEVBQUFBLE1BQUEsQ0FBQVYsRUFBQSxDQUFBLE9BQUEsRUFBQSxZQUFBO0FBRUEsUUFBQXFCLEtBQUEsR0FBQXJJLENBQUEsQ0FBQSxJQUFBLENBQUE7QUFBQSxRQUNBMkcsU0FBQSxHQUFBMEIsS0FBQSxDQUFBNUgsT0FBQSxDQUFBLGtCQUFBLENBREE7QUFBQSxRQUVBc0gsV0FBQSxHQUFBSCxNQUFBLENBQUFWLE1BQUEsQ0FBQSxTQUFBLENBRkE7QUFBQSxRQUdBb0IsU0FBQSxHQUFBUCxXQUFBLENBQUFYLElBQUEsRUFIQTtBQUFBLFFBSUFtQixTQUFBLEdBQUFSLFdBQUEsQ0FBQVosSUFBQSxFQUpBOztBQVFBLFFBQUFrQixLQUFBLENBQUFHLFFBQUEsQ0FBQSxvQkFBQSxDQUFBLEVBQUE7QUFFQSxVQUFBRixTQUFBLENBQUFySyxNQUFBLEVBQUE7QUFDQTRKLFFBQUFBLFNBQUEsQ0FBQWxCLFNBQUEsRUFBQTJCLFNBQUEsQ0FBQXpCLEtBQUEsRUFBQSxDQUFBO0FBQ0EsT0FGQSxNQUVBO0FBQ0FnQixRQUFBQSxTQUFBLENBQUFsQixTQUFBLEVBQUFpQixNQUFBLENBQUFhLEtBQUEsR0FBQTVCLEtBQUEsRUFBQSxDQUFBO0FBQ0E7QUFFQTs7QUFBQSxRQUFBd0IsS0FBQSxDQUFBRyxRQUFBLENBQUEsbUJBQUEsQ0FBQSxFQUFBO0FBQ0EsVUFBQUQsU0FBQSxDQUFBdEssTUFBQSxFQUFBO0FBQ0E0SixRQUFBQSxTQUFBLENBQUFsQixTQUFBLEVBQUE0QixTQUFBLENBQUExQixLQUFBLEVBQUEsQ0FBQTtBQUNBLE9BRkEsTUFFQTtBQUNBZ0IsUUFBQUEsU0FBQSxDQUFBbEIsU0FBQSxFQUFBaUIsTUFBQSxDQUFBYyxJQUFBLEdBQUE3QixLQUFBLEVBQUEsQ0FBQTtBQUNBOztBQUVBZ0IsTUFBQUEsU0FBQSxDQUFBbEIsU0FBQSxFQUFBNEIsU0FBQSxDQUFBMUIsS0FBQSxFQUFBLENBQUE7QUFDQTtBQUdBLEdBN0JBO0FBK0JBLENBcERBLENBQUEsQyxDQXVEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBS0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNySkE7O0FBRUEsSUFBQThCLEtBQUEsR0FBQTNMLFFBQUEsQ0FBQUksZ0JBQUEsQ0FBQSxrQkFBQSxDQUFBO0FBRUF1TCxLQUFBLENBQUFDLE9BQUEsQ0FBQSxVQUFBQyxJQUFBLEVBQUE7QUFDQUEsRUFBQUEsSUFBQSxDQUFBdkwsZ0JBQUEsQ0FBQSxPQUFBLEVBQUEsWUFBQTtBQUVBLFFBQUF3TCxNQUFBLEdBQUE5TCxRQUFBLENBQUFDLGFBQUEsQ0FBQSwwQkFBQSxDQUFBOztBQUNBLFFBQUE2TCxNQUFBLEVBQUE7QUFDQUEsTUFBQUEsTUFBQSxDQUFBbkksU0FBQSxDQUFBSyxNQUFBLENBQUEseUJBQUE7QUFDQTs7QUFFQSxRQUFBNkgsSUFBQSxJQUFBQyxNQUFBLEVBQUE7QUFDQUQsTUFBQUEsSUFBQSxDQUFBbEksU0FBQSxDQUFBTSxHQUFBLENBQUEseUJBQUE7QUFDQTtBQUVBLEdBWEE7QUFhQSxDQWRBIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyDQnNC+0LTQsNC70YzQvdC+0LUg0L7QutC90L4g0LTQu9GPINC+0YLQt9GL0LLQvtCyXHJcbmxldCBmZWVkYmFja0V4aXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXBfX2V4aXQtLWNvbW1lbnRzJyk7XHJcbmxldCBwb3B1cEZlZWRiYWNrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbW1lbnRzLXBvcHVwJyk7XHJcbmxldCBjb21tZW50c0J1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY29tbWVudHMtYnRuJyk7XHJcbmxldCBjb21tZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jb21tZW50c19fZGVzYycpO1xyXG4vLyBsZXQgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcclxuXHJcbmZlZWRiYWNrRXhpdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICBwb3B1cEZlZWRiYWNrLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnYXV0byc7XHJcbiAgIH0pO1xyXG5cclxuZm9yIChsZXQgaSA9IDA7IGkgPCBjb21tZW50c0J1dHRvbnMubGVuZ3RoOyBpKyspIHtcclxuICBjb21tZW50c0J1dHRvbnNbaV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgIHBvcHVwRmVlZGJhY2suc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcclxuICAgIGJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcclxuICAgIGxldCBmZWVkYmFja1BvcHVwTmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb21tZW50cy1wb3B1cF9fbmFtZScpO1xyXG4gICAgbGV0IGZlZWRiYWNrQ2FyZE5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY29tbWVudHNfX2Rlc2MtdGl0bGUnKTtcclxuICAgIGxldCBmZWVkYmFja1BvcHVwUmV2aWV3ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbW1lbnRzLXBvcHVwX190ZXh0Jyk7XHJcbiAgICBsZXQgY2FyZFJldmlldyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jb21tZW50c19fZGVzYy10ZXh0Jyk7XHJcbiAgICBmZWVkYmFja1BvcHVwTmFtZS50ZXh0Q29udGVudCA9IGZlZWRiYWNrQ2FyZE5hbWVbaV0udGV4dENvbnRlbnQ7XHJcbiAgICBmZWVkYmFja1BvcHVwUmV2aWV3LnRleHRDb250ZW50ID0gY2FyZFJldmlld1tpXS50ZXh0Q29udGVudDtcclxuICAgIFxyXG5cclxuICAgIH0pO1xyXG59XHJcbiIsIi8vINCc0L7QtNCw0LvRjNC90L7QtSDQvtC60L3QviDQtNC70Y8g0YTQvtGA0LzRi1xyXG5cclxubGV0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9ybV9fZWxlbScpO1xyXG5sZXQgZm9ybUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb3JtX19idXR0b24tc2VuZCcpO1xyXG5sZXQgZmllbGRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmZvcm1fX2lucHV0Jyk7XHJcbmxldCBtb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbCcpO1xyXG5sZXQgbW9kYWxUZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGFsLXdpbmRvdy0tdGV4dCcpO1xyXG5sZXQgbW9kYWxCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kYWwtd2luZG93LS1idXR0b24nKTtcclxubGV0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XHJcblxyXG5tb2RhbEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gIG1vZGFsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgYm9keS5zdHlsZS5vdmVyZmxvdyA9ICdhdXRvJztcclxufSk7XHJcblxyXG5mb3JtQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gIGUucHJldmVudERlZmF1bHQoKTtcclxuICBjb25zdCBkYXRhID0geyBuYW1lOiBmb3JtLmVsZW1lbnRzLm5hbWUudmFsdWUsIHBob25lOiBmb3JtLmVsZW1lbnRzLnBob25lLnZhbHVlLCBjb21tZW50OiBmb3JtLmVsZW1lbnRzLmNvbW1lbnQudmFsdWUgfTtcclxuICBjb25zdCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YShmb3JtKTtcclxuICBmb3JtRGF0YS5hcHBlbmQoXCJuYW1lXCIsIGZvcm0uZWxlbWVudHMubmFtZS52YWx1ZSk7XHJcbiAgZm9ybURhdGEuYXBwZW5kKFwicGhvbmVcIiwgZm9ybS5lbGVtZW50cy5waG9uZS52YWx1ZSk7XHJcbiAgZm9ybURhdGEuYXBwZW5kKFwiY29tbWVudFwiLCBmb3JtLmVsZW1lbnRzLmNvbW1lbnQudmFsdWUpO1xyXG4gIGZvcm1EYXRhLmFwcGVuZChcInRvXCIsIFwibXlAZ21haWwuY29tXCIpO1xyXG4gIGNvbnNvbGUubG9nKGZvcm1EYXRhKTtcclxuICBjb25zb2xlLmxvZyhkYXRhKTtcclxuXHJcbiAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG5cclxuICBmdW5jdGlvbiB2YWxpZGF0aW9uKCkge1xyXG4gICAgICBpZiAoZm9ybS5lbGVtZW50cy5uYW1lLmNoZWNrVmFsaWRpdHkoKSAmJlxyXG4gICAgICAgICAgZm9ybS5lbGVtZW50cy5waG9uZS5jaGVja1ZhbGlkaXR5KCkgJiZcclxuICAgICAgICAgIGZvcm0uZWxlbWVudHMuY29tbWVudC5jaGVja1ZhbGlkaXR5KCkpIHsgXHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG4gIH07XHJcblxyXG4gIGNvbnNvbGUubG9nKHZhbGlkYXRpb24oKSk7XHJcblxyXG4gIGlmICh2YWxpZGF0aW9uKCkpIHtcclxuXHJcbiAgeGhyLm9wZW4oJ1BPU1QnLCAnaHR0cHM6Ly93ZWJkZXYtYXBpLmxvZnRzY2hvb2wuY29tL3NlbmRtYWlsJyk7XHJcbiAgeGhyLnNldFJlcXVlc3RIZWFkZXIoXCJYLVJlcXVlc3RlZC1XaXRoXCIsIFwiWE1MSHR0cFJlcXVlc3RcIik7XHJcbiAgeGhyLnNlbmQoZm9ybURhdGEpO1xyXG4gIHhoci5yZXNwb25zZVR5cGUgPSBcImpzb25cIjtcclxuICB4aHIuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGZ1bmN0aW9uKCkge1xyXG4gIGlmICh4aHIucmVzcG9uc2Uuc3RhdHVzKSB7XHJcbiAgbW9kYWwuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcclxuICBtb2RhbFRleHQudGV4dENvbnRlbnQgPSAn0KHQvtC+0LHRidC10L3QuNC1INC+0YLQv9GA0LDQstC70LXQvdC+JztcclxuICBib2R5LnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XHJcbiAgZm9ybS5yZXNldCgpO1xyXG4gIH0gXHJcbiAgLy8gZWxzZSB7XHJcbiAgLy8gbW9kYWwuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcclxuICAvLyBtb2RhbFRleHQudGV4dENvbnRlbnQgPSAn0J/RgNC+0LjQt9C+0YjQu9CwINC+0YjQuNCx0LrQsCwg0L/QvtC/0YDQvtCx0YPQudGC0LUg0LXRidC1INGA0LDQtyc7XHJcbiAgLy8gYm9keS5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xyXG4gIC8vIH1cclxuICB9KTtcclxuICB9IGVsc2Uge1xyXG4gIG1vZGFsLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XHJcbiAgbW9kYWxUZXh0LnRleHRDb250ZW50ID0gJ9Cf0L7Qu9GPIFwi0JjQvNGPXCIsXCLQotC10LvQtdGE0L7QvVwiINC4IFwi0JrQvtC80LzQtdC90YLQsNGA0LjQuVwiINC00L7Qu9C20L3RiyDQsdGL0YLRjCDQt9Cw0L/QvtC70L3QtdC90YsnO1xyXG4gIGJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcclxuICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPCA3NjgpIHsgXHJcbiAgICBib2R5LnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7IFxyXG4gIH07XHJcbiAgfVxyXG59KTtcclxuIiwiLy8g0JPQvtGA0LjQt9C+0L3RgtCw0LvRjNC90YvQuVxyXG5cclxuY29uc3QgbWVudUFjY28gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVudS1hY2NvcmRlb24nKTtcclxuXHJcblxyXG5ob3Jpem9udGFsQWNjb3JkZW9uKG1lbnVBY2NvKTtcclxuXHJcblxyXG5mdW5jdGlvbiBob3Jpem9udGFsQWNjb3JkZW9uKGVsZW1lbnQpIHtcclxuICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSl7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgY29uc3QgbWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIubWVudS1hY2NvcmRlb25fX2NhcmRcIik7XHJcbiAgICBjb25zdCBtZW51UGFyZW50ID0gZS50YXJnZXQuY2xvc2VzdChcIi5tZW51LWFjY29yZGVvbl9fY2FyZFwiKTtcclxuICAgIGNvbnN0IG1lbnVCdXR0b24gPSBlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJtZW51LWFjY29yZGVvbl9fYnV0dG9uXCIpO1xyXG4gICAgY29uc3QgbWVudUJ1dHRvblRleHQgPSBlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJtZW51LWFjY29yZGVvbl9fbmFtZVwiKTtcclxuICAgIGNvbnN0IG1lbnVDb250ZW50ID0gbWVudVBhcmVudC5sYXN0RWxlbWVudENoaWxkO1xyXG5cclxuICAgIGlmIChtZW51QnV0dG9uIHx8IG1lbnVCdXR0b25UZXh0ICl7XHJcbiAgICAgIGlmIChtZW51UGFyZW50LmNsYXNzTGlzdC5jb250YWlucyAoJ21lbnUtYWNjb3JkZW9uX19jYXJkLS1hY3RpdmUnKSl7XHJcbiAgICAgICAgbWVudVBhcmVudC5jbGFzc0xpc3QucmVtb3ZlKCdtZW51LWFjY29yZGVvbl9fY2FyZC0tYWN0aXZlJyk7XHJcbiAgICAgICAgbWVudUNvbnRlbnQuY2xhc3NMaXN0LmFkZCgnZmFkZS1vdXQnKTtcclxuICAgICAgfWVsc2V7XHJcbiAgICAgICAgZm9yIChsZXQgaT0wOyBpPG1lbnUubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgY29uc3QgbWVudUl0ZW1zPW1lbnVbaV07XHJcbiAgICAgICAgICBtZW51Q29udGVudC5jbGFzc0xpc3QuYWRkKCdmYWRlLW91dCcpO1xyXG4gICAgICAgICAgbWVudUl0ZW1zLmNsYXNzTGlzdC5yZW1vdmUoJ21lbnUtYWNjb3JkZW9uX19jYXJkLS1hY3RpdmUnKTtcclxuICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBtZW51Q29udGVudC5jbGFzc0xpc3QucmVtb3ZlKCdmYWRlLW91dCcpO1xyXG4gICAgICAgIG1lbnVQYXJlbnQuY2xhc3NMaXN0LmFkZCgnbWVudS1hY2NvcmRlb25fX2NhcmQtLWFjdGl2ZScpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gIH0pO1xyXG59XHJcblxyXG5cclxuXHJcblxyXG4vLyBtZW51LmZvckVhY2goZnVuY3Rpb24obWVudV9zbGlkZXIpIHtcclxuLy8gICBtZW51X3NsaWRlci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKSB7XHJcbiAgXHJcbi8vICAgICBjb25zdCBhY3RpdmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1lbnUtYWNjb3JkZW9uX19jYXJkLS1hY3RpdmVcIik7XHJcbi8vICAgICBpZiAoYWN0aXZlKSB7XHJcbi8vICAgICAgIGFjdGl2ZS5jbGFzc0xpc3QucmVtb3ZlKFwibWVudS1hY2NvcmRlb25fX2NhcmQtLWFjdGl2ZVwiKTtcclxuLy8gICAgICAgbWVudUNvbnRlbnQuY2xhc3NMaXN0LmFkZCgnZmFkZS1vdXQnKTtcclxuLy8gICAgIH1cclxuXHJcbi8vICAgICBpZiAobWVudV9zbGlkZXIgIT0gYWN0aXZlKSB7XHJcbi8vICAgICAgIG1lbnVDb250ZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2ZhZGUtb3V0Jyk7XHJcbi8vICAgICAgIG1lbnVfc2xpZGVyLmNsYXNzTGlzdC5hZGQoXCJtZW51LWFjY29yZGVvbl9fY2FyZC0tYWN0aXZlXCIpO1xyXG4vLyAgICAgfVxyXG5cclxuLy8gICB9KTtcclxuXHJcbi8vIH0pOyIsIi8qIVxuICogalF1ZXJ5IE1vdXNld2hlZWwgMy4xLjEzXG4gKlxuICogQ29weXJpZ2h0IGpRdWVyeSBGb3VuZGF0aW9uIGFuZCBvdGhlciBjb250cmlidXRvcnNcbiAqIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICogaHR0cDovL2pxdWVyeS5vcmcvbGljZW5zZVxuICovXG5cbihmdW5jdGlvbiAoZmFjdG9yeSkge1xuICAgIGlmICggdHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kICkge1xuICAgICAgICAvLyBBTUQuIFJlZ2lzdGVyIGFzIGFuIGFub255bW91cyBtb2R1bGUuXG4gICAgICAgIGRlZmluZShbJ2pxdWVyeSddLCBmYWN0b3J5KTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jykge1xuICAgICAgICAvLyBOb2RlL0NvbW1vbkpTIHN0eWxlIGZvciBCcm93c2VyaWZ5XG4gICAgICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBCcm93c2VyIGdsb2JhbHNcbiAgICAgICAgZmFjdG9yeShqUXVlcnkpO1xuICAgIH1cbn0oZnVuY3Rpb24gKCQpIHtcblxuICAgIHZhciB0b0ZpeCAgPSBbJ3doZWVsJywgJ21vdXNld2hlZWwnLCAnRE9NTW91c2VTY3JvbGwnLCAnTW96TW91c2VQaXhlbFNjcm9sbCddLFxuICAgICAgICB0b0JpbmQgPSAoICdvbndoZWVsJyBpbiBkb2N1bWVudCB8fCBkb2N1bWVudC5kb2N1bWVudE1vZGUgPj0gOSApID9cbiAgICAgICAgICAgICAgICAgICAgWyd3aGVlbCddIDogWydtb3VzZXdoZWVsJywgJ0RvbU1vdXNlU2Nyb2xsJywgJ01vek1vdXNlUGl4ZWxTY3JvbGwnXSxcbiAgICAgICAgc2xpY2UgID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLFxuICAgICAgICBudWxsTG93ZXN0RGVsdGFUaW1lb3V0LCBsb3dlc3REZWx0YTtcblxuICAgIGlmICggJC5ldmVudC5maXhIb29rcyApIHtcbiAgICAgICAgZm9yICggdmFyIGkgPSB0b0ZpeC5sZW5ndGg7IGk7ICkge1xuICAgICAgICAgICAgJC5ldmVudC5maXhIb29rc1sgdG9GaXhbLS1pXSBdID0gJC5ldmVudC5tb3VzZUhvb2tzO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmFyIHNwZWNpYWwgPSAkLmV2ZW50LnNwZWNpYWwubW91c2V3aGVlbCA9IHtcbiAgICAgICAgdmVyc2lvbjogJzMuMS4xMicsXG5cbiAgICAgICAgc2V0dXA6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKCB0aGlzLmFkZEV2ZW50TGlzdGVuZXIgKSB7XG4gICAgICAgICAgICAgICAgZm9yICggdmFyIGkgPSB0b0JpbmQubGVuZ3RoOyBpOyApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCB0b0JpbmRbLS1pXSwgaGFuZGxlciwgZmFsc2UgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMub25tb3VzZXdoZWVsID0gaGFuZGxlcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFN0b3JlIHRoZSBsaW5lIGhlaWdodCBhbmQgcGFnZSBoZWlnaHQgZm9yIHRoaXMgcGFydGljdWxhciBlbGVtZW50XG4gICAgICAgICAgICAkLmRhdGEodGhpcywgJ21vdXNld2hlZWwtbGluZS1oZWlnaHQnLCBzcGVjaWFsLmdldExpbmVIZWlnaHQodGhpcykpO1xuICAgICAgICAgICAgJC5kYXRhKHRoaXMsICdtb3VzZXdoZWVsLXBhZ2UtaGVpZ2h0Jywgc3BlY2lhbC5nZXRQYWdlSGVpZ2h0KHRoaXMpKTtcbiAgICAgICAgfSxcblxuICAgICAgICB0ZWFyZG93bjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lciApIHtcbiAgICAgICAgICAgICAgICBmb3IgKCB2YXIgaSA9IHRvQmluZC5sZW5ndGg7IGk7ICkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoIHRvQmluZFstLWldLCBoYW5kbGVyLCBmYWxzZSApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbm1vdXNld2hlZWwgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gQ2xlYW4gdXAgdGhlIGRhdGEgd2UgYWRkZWQgdG8gdGhlIGVsZW1lbnRcbiAgICAgICAgICAgICQucmVtb3ZlRGF0YSh0aGlzLCAnbW91c2V3aGVlbC1saW5lLWhlaWdodCcpO1xuICAgICAgICAgICAgJC5yZW1vdmVEYXRhKHRoaXMsICdtb3VzZXdoZWVsLXBhZ2UtaGVpZ2h0Jyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZ2V0TGluZUhlaWdodDogZnVuY3Rpb24oZWxlbSkge1xuICAgICAgICAgICAgdmFyICRlbGVtID0gJChlbGVtKSxcbiAgICAgICAgICAgICAgICAkcGFyZW50ID0gJGVsZW1bJ29mZnNldFBhcmVudCcgaW4gJC5mbiA/ICdvZmZzZXRQYXJlbnQnIDogJ3BhcmVudCddKCk7XG4gICAgICAgICAgICBpZiAoISRwYXJlbnQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgJHBhcmVudCA9ICQoJ2JvZHknKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBwYXJzZUludCgkcGFyZW50LmNzcygnZm9udFNpemUnKSwgMTApIHx8IHBhcnNlSW50KCRlbGVtLmNzcygnZm9udFNpemUnKSwgMTApIHx8IDE2O1xuICAgICAgICB9LFxuXG4gICAgICAgIGdldFBhZ2VIZWlnaHQ6IGZ1bmN0aW9uKGVsZW0pIHtcbiAgICAgICAgICAgIHJldHVybiAkKGVsZW0pLmhlaWdodCgpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICBhZGp1c3RPbGREZWx0YXM6IHRydWUsIC8vIHNlZSBzaG91bGRBZGp1c3RPbGREZWx0YXMoKSBiZWxvd1xuICAgICAgICAgICAgbm9ybWFsaXplT2Zmc2V0OiB0cnVlICAvLyBjYWxscyBnZXRCb3VuZGluZ0NsaWVudFJlY3QgZm9yIGVhY2ggZXZlbnRcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAkLmZuLmV4dGVuZCh7XG4gICAgICAgIG1vdXNld2hlZWw6IGZ1bmN0aW9uKGZuKSB7XG4gICAgICAgICAgICByZXR1cm4gZm4gPyB0aGlzLmJpbmQoJ21vdXNld2hlZWwnLCBmbikgOiB0aGlzLnRyaWdnZXIoJ21vdXNld2hlZWwnKTtcbiAgICAgICAgfSxcblxuICAgICAgICB1bm1vdXNld2hlZWw6IGZ1bmN0aW9uKGZuKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy51bmJpbmQoJ21vdXNld2hlZWwnLCBmbik7XG4gICAgICAgIH1cbiAgICB9KTtcblxuXG4gICAgZnVuY3Rpb24gaGFuZGxlcihldmVudCkge1xuICAgICAgICB2YXIgb3JnRXZlbnQgICA9IGV2ZW50IHx8IHdpbmRvdy5ldmVudCxcbiAgICAgICAgICAgIGFyZ3MgICAgICAgPSBzbGljZS5jYWxsKGFyZ3VtZW50cywgMSksXG4gICAgICAgICAgICBkZWx0YSAgICAgID0gMCxcbiAgICAgICAgICAgIGRlbHRhWCAgICAgPSAwLFxuICAgICAgICAgICAgZGVsdGFZICAgICA9IDAsXG4gICAgICAgICAgICBhYnNEZWx0YSAgID0gMCxcbiAgICAgICAgICAgIG9mZnNldFggICAgPSAwLFxuICAgICAgICAgICAgb2Zmc2V0WSAgICA9IDA7XG4gICAgICAgIGV2ZW50ID0gJC5ldmVudC5maXgob3JnRXZlbnQpO1xuICAgICAgICBldmVudC50eXBlID0gJ21vdXNld2hlZWwnO1xuXG4gICAgICAgIC8vIE9sZCBzY2hvb2wgc2Nyb2xsd2hlZWwgZGVsdGFcbiAgICAgICAgaWYgKCAnZGV0YWlsJyAgICAgIGluIG9yZ0V2ZW50ICkgeyBkZWx0YVkgPSBvcmdFdmVudC5kZXRhaWwgKiAtMTsgICAgICB9XG4gICAgICAgIGlmICggJ3doZWVsRGVsdGEnICBpbiBvcmdFdmVudCApIHsgZGVsdGFZID0gb3JnRXZlbnQud2hlZWxEZWx0YTsgICAgICAgfVxuICAgICAgICBpZiAoICd3aGVlbERlbHRhWScgaW4gb3JnRXZlbnQgKSB7IGRlbHRhWSA9IG9yZ0V2ZW50LndoZWVsRGVsdGFZOyAgICAgIH1cbiAgICAgICAgaWYgKCAnd2hlZWxEZWx0YVgnIGluIG9yZ0V2ZW50ICkgeyBkZWx0YVggPSBvcmdFdmVudC53aGVlbERlbHRhWCAqIC0xOyB9XG5cbiAgICAgICAgLy8gRmlyZWZveCA8IDE3IGhvcml6b250YWwgc2Nyb2xsaW5nIHJlbGF0ZWQgdG8gRE9NTW91c2VTY3JvbGwgZXZlbnRcbiAgICAgICAgaWYgKCAnYXhpcycgaW4gb3JnRXZlbnQgJiYgb3JnRXZlbnQuYXhpcyA9PT0gb3JnRXZlbnQuSE9SSVpPTlRBTF9BWElTICkge1xuICAgICAgICAgICAgZGVsdGFYID0gZGVsdGFZICogLTE7XG4gICAgICAgICAgICBkZWx0YVkgPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gU2V0IGRlbHRhIHRvIGJlIGRlbHRhWSBvciBkZWx0YVggaWYgZGVsdGFZIGlzIDAgZm9yIGJhY2t3YXJkcyBjb21wYXRhYmlsaXRpeVxuICAgICAgICBkZWx0YSA9IGRlbHRhWSA9PT0gMCA/IGRlbHRhWCA6IGRlbHRhWTtcblxuICAgICAgICAvLyBOZXcgc2Nob29sIHdoZWVsIGRlbHRhICh3aGVlbCBldmVudClcbiAgICAgICAgaWYgKCAnZGVsdGFZJyBpbiBvcmdFdmVudCApIHtcbiAgICAgICAgICAgIGRlbHRhWSA9IG9yZ0V2ZW50LmRlbHRhWSAqIC0xO1xuICAgICAgICAgICAgZGVsdGEgID0gZGVsdGFZO1xuICAgICAgICB9XG4gICAgICAgIGlmICggJ2RlbHRhWCcgaW4gb3JnRXZlbnQgKSB7XG4gICAgICAgICAgICBkZWx0YVggPSBvcmdFdmVudC5kZWx0YVg7XG4gICAgICAgICAgICBpZiAoIGRlbHRhWSA9PT0gMCApIHsgZGVsdGEgID0gZGVsdGFYICogLTE7IH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIE5vIGNoYW5nZSBhY3R1YWxseSBoYXBwZW5lZCwgbm8gcmVhc29uIHRvIGdvIGFueSBmdXJ0aGVyXG4gICAgICAgIGlmICggZGVsdGFZID09PSAwICYmIGRlbHRhWCA9PT0gMCApIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgLy8gTmVlZCB0byBjb252ZXJ0IGxpbmVzIGFuZCBwYWdlcyB0byBwaXhlbHMgaWYgd2UgYXJlbid0IGFscmVhZHkgaW4gcGl4ZWxzXG4gICAgICAgIC8vIFRoZXJlIGFyZSB0aHJlZSBkZWx0YSBtb2RlczpcbiAgICAgICAgLy8gICAqIGRlbHRhTW9kZSAwIGlzIGJ5IHBpeGVscywgbm90aGluZyB0byBkb1xuICAgICAgICAvLyAgICogZGVsdGFNb2RlIDEgaXMgYnkgbGluZXNcbiAgICAgICAgLy8gICAqIGRlbHRhTW9kZSAyIGlzIGJ5IHBhZ2VzXG4gICAgICAgIGlmICggb3JnRXZlbnQuZGVsdGFNb2RlID09PSAxICkge1xuICAgICAgICAgICAgdmFyIGxpbmVIZWlnaHQgPSAkLmRhdGEodGhpcywgJ21vdXNld2hlZWwtbGluZS1oZWlnaHQnKTtcbiAgICAgICAgICAgIGRlbHRhICAqPSBsaW5lSGVpZ2h0O1xuICAgICAgICAgICAgZGVsdGFZICo9IGxpbmVIZWlnaHQ7XG4gICAgICAgICAgICBkZWx0YVggKj0gbGluZUhlaWdodDtcbiAgICAgICAgfSBlbHNlIGlmICggb3JnRXZlbnQuZGVsdGFNb2RlID09PSAyICkge1xuICAgICAgICAgICAgdmFyIHBhZ2VIZWlnaHQgPSAkLmRhdGEodGhpcywgJ21vdXNld2hlZWwtcGFnZS1oZWlnaHQnKTtcbiAgICAgICAgICAgIGRlbHRhICAqPSBwYWdlSGVpZ2h0O1xuICAgICAgICAgICAgZGVsdGFZICo9IHBhZ2VIZWlnaHQ7XG4gICAgICAgICAgICBkZWx0YVggKj0gcGFnZUhlaWdodDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFN0b3JlIGxvd2VzdCBhYnNvbHV0ZSBkZWx0YSB0byBub3JtYWxpemUgdGhlIGRlbHRhIHZhbHVlc1xuICAgICAgICBhYnNEZWx0YSA9IE1hdGgubWF4KCBNYXRoLmFicyhkZWx0YVkpLCBNYXRoLmFicyhkZWx0YVgpICk7XG5cbiAgICAgICAgaWYgKCAhbG93ZXN0RGVsdGEgfHwgYWJzRGVsdGEgPCBsb3dlc3REZWx0YSApIHtcbiAgICAgICAgICAgIGxvd2VzdERlbHRhID0gYWJzRGVsdGE7XG5cbiAgICAgICAgICAgIC8vIEFkanVzdCBvbGRlciBkZWx0YXMgaWYgbmVjZXNzYXJ5XG4gICAgICAgICAgICBpZiAoIHNob3VsZEFkanVzdE9sZERlbHRhcyhvcmdFdmVudCwgYWJzRGVsdGEpICkge1xuICAgICAgICAgICAgICAgIGxvd2VzdERlbHRhIC89IDQwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gQWRqdXN0IG9sZGVyIGRlbHRhcyBpZiBuZWNlc3NhcnlcbiAgICAgICAgaWYgKCBzaG91bGRBZGp1c3RPbGREZWx0YXMob3JnRXZlbnQsIGFic0RlbHRhKSApIHtcbiAgICAgICAgICAgIC8vIERpdmlkZSBhbGwgdGhlIHRoaW5ncyBieSA0MCFcbiAgICAgICAgICAgIGRlbHRhICAvPSA0MDtcbiAgICAgICAgICAgIGRlbHRhWCAvPSA0MDtcbiAgICAgICAgICAgIGRlbHRhWSAvPSA0MDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEdldCBhIHdob2xlLCBub3JtYWxpemVkIHZhbHVlIGZvciB0aGUgZGVsdGFzXG4gICAgICAgIGRlbHRhICA9IE1hdGhbIGRlbHRhICA+PSAxID8gJ2Zsb29yJyA6ICdjZWlsJyBdKGRlbHRhICAvIGxvd2VzdERlbHRhKTtcbiAgICAgICAgZGVsdGFYID0gTWF0aFsgZGVsdGFYID49IDEgPyAnZmxvb3InIDogJ2NlaWwnIF0oZGVsdGFYIC8gbG93ZXN0RGVsdGEpO1xuICAgICAgICBkZWx0YVkgPSBNYXRoWyBkZWx0YVkgPj0gMSA/ICdmbG9vcicgOiAnY2VpbCcgXShkZWx0YVkgLyBsb3dlc3REZWx0YSk7XG5cbiAgICAgICAgLy8gTm9ybWFsaXNlIG9mZnNldFggYW5kIG9mZnNldFkgcHJvcGVydGllc1xuICAgICAgICBpZiAoIHNwZWNpYWwuc2V0dGluZ3Mubm9ybWFsaXplT2Zmc2V0ICYmIHRoaXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0ICkge1xuICAgICAgICAgICAgdmFyIGJvdW5kaW5nUmVjdCA9IHRoaXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICBvZmZzZXRYID0gZXZlbnQuY2xpZW50WCAtIGJvdW5kaW5nUmVjdC5sZWZ0O1xuICAgICAgICAgICAgb2Zmc2V0WSA9IGV2ZW50LmNsaWVudFkgLSBib3VuZGluZ1JlY3QudG9wO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQWRkIGluZm9ybWF0aW9uIHRvIHRoZSBldmVudCBvYmplY3RcbiAgICAgICAgZXZlbnQuZGVsdGFYID0gZGVsdGFYO1xuICAgICAgICBldmVudC5kZWx0YVkgPSBkZWx0YVk7XG4gICAgICAgIGV2ZW50LmRlbHRhRmFjdG9yID0gbG93ZXN0RGVsdGE7XG4gICAgICAgIGV2ZW50Lm9mZnNldFggPSBvZmZzZXRYO1xuICAgICAgICBldmVudC5vZmZzZXRZID0gb2Zmc2V0WTtcbiAgICAgICAgLy8gR28gYWhlYWQgYW5kIHNldCBkZWx0YU1vZGUgdG8gMCBzaW5jZSB3ZSBjb252ZXJ0ZWQgdG8gcGl4ZWxzXG4gICAgICAgIC8vIEFsdGhvdWdoIHRoaXMgaXMgYSBsaXR0bGUgb2RkIHNpbmNlIHdlIG92ZXJ3cml0ZSB0aGUgZGVsdGFYL1lcbiAgICAgICAgLy8gcHJvcGVydGllcyB3aXRoIG5vcm1hbGl6ZWQgZGVsdGFzLlxuICAgICAgICBldmVudC5kZWx0YU1vZGUgPSAwO1xuXG4gICAgICAgIC8vIEFkZCBldmVudCBhbmQgZGVsdGEgdG8gdGhlIGZyb250IG9mIHRoZSBhcmd1bWVudHNcbiAgICAgICAgYXJncy51bnNoaWZ0KGV2ZW50LCBkZWx0YSwgZGVsdGFYLCBkZWx0YVkpO1xuXG4gICAgICAgIC8vIENsZWFyb3V0IGxvd2VzdERlbHRhIGFmdGVyIHNvbWV0aW1lIHRvIGJldHRlclxuICAgICAgICAvLyBoYW5kbGUgbXVsdGlwbGUgZGV2aWNlIHR5cGVzIHRoYXQgZ2l2ZSBkaWZmZXJlbnRcbiAgICAgICAgLy8gYSBkaWZmZXJlbnQgbG93ZXN0RGVsdGFcbiAgICAgICAgLy8gRXg6IHRyYWNrcGFkID0gMyBhbmQgbW91c2Ugd2hlZWwgPSAxMjBcbiAgICAgICAgaWYgKG51bGxMb3dlc3REZWx0YVRpbWVvdXQpIHsgY2xlYXJUaW1lb3V0KG51bGxMb3dlc3REZWx0YVRpbWVvdXQpOyB9XG4gICAgICAgIG51bGxMb3dlc3REZWx0YVRpbWVvdXQgPSBzZXRUaW1lb3V0KG51bGxMb3dlc3REZWx0YSwgMjAwKTtcblxuICAgICAgICByZXR1cm4gKCQuZXZlbnQuZGlzcGF0Y2ggfHwgJC5ldmVudC5oYW5kbGUpLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG51bGxMb3dlc3REZWx0YSgpIHtcbiAgICAgICAgbG93ZXN0RGVsdGEgPSBudWxsO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNob3VsZEFkanVzdE9sZERlbHRhcyhvcmdFdmVudCwgYWJzRGVsdGEpIHtcbiAgICAgICAgLy8gSWYgdGhpcyBpcyBhbiBvbGRlciBldmVudCBhbmQgdGhlIGRlbHRhIGlzIGRpdmlzYWJsZSBieSAxMjAsXG4gICAgICAgIC8vIHRoZW4gd2UgYXJlIGFzc3VtaW5nIHRoYXQgdGhlIGJyb3dzZXIgaXMgdHJlYXRpbmcgdGhpcyBhcyBhblxuICAgICAgICAvLyBvbGRlciBtb3VzZSB3aGVlbCBldmVudCBhbmQgdGhhdCB3ZSBzaG91bGQgZGl2aWRlIHRoZSBkZWx0YXNcbiAgICAgICAgLy8gYnkgNDAgdG8gdHJ5IGFuZCBnZXQgYSBtb3JlIHVzYWJsZSBkZWx0YUZhY3Rvci5cbiAgICAgICAgLy8gU2lkZSBub3RlLCB0aGlzIGFjdHVhbGx5IGltcGFjdHMgdGhlIHJlcG9ydGVkIHNjcm9sbCBkaXN0YW5jZVxuICAgICAgICAvLyBpbiBvbGRlciBicm93c2VycyBhbmQgY2FuIGNhdXNlIHNjcm9sbGluZyB0byBiZSBzbG93ZXIgdGhhbiBuYXRpdmUuXG4gICAgICAgIC8vIFR1cm4gdGhpcyBvZmYgYnkgc2V0dGluZyAkLmV2ZW50LnNwZWNpYWwubW91c2V3aGVlbC5zZXR0aW5ncy5hZGp1c3RPbGREZWx0YXMgdG8gZmFsc2UuXG4gICAgICAgIHJldHVybiBzcGVjaWFsLnNldHRpbmdzLmFkanVzdE9sZERlbHRhcyAmJiBvcmdFdmVudC50eXBlID09PSAnbW91c2V3aGVlbCcgJiYgYWJzRGVsdGEgJSAxMjAgPT09IDA7XG4gICAgfVxuXG59KSk7XG4iLCIvLyDQndCw0LLQuNCz0LDRhtC40Y9cclxuY29uc3QgaGFtYnVyZ2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhhbWJ1cmdlcicpO1xyXG5jb25zdCBmdWxsc2NyZWVuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZ1bGxzY3JlZW4nKTtcclxubGV0IG1lbnVJdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy52ZXJ0aWNhbC1tZW51LWxpc3RfX2xpbmsnKTtcclxuXHJcbmZ1bmN0aW9uIG9wZW5IYW1idXJnZXJNZW51KCl7XHJcbiAgZnVsbHNjcmVlbi5zdHlsZS5yaWdodCA9ICcwJztcclxuICBoYW1idXJnZXIuY2xhc3NMaXN0LmFkZCgnaXMtYWN0aXZlJyk7XHJcbiAgYm9keS5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xyXG5cclxufVxyXG5cclxuZnVuY3Rpb24gY2xvc2VIYW1idXJnZXJNZW51KCl7XHJcbiAgZnVsbHNjcmVlbi5zdHlsZS5yaWdodCA9ICctMTAwJSc7XHJcbiAgaGFtYnVyZ2VyLmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWFjdGl2ZScpO1xyXG4gIGJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnYXV0byc7XHJcbiAgXHJcblxyXG59XHJcblxyXG5oYW1idXJnZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICBpZihoYW1idXJnZXIuY2xhc3NMaXN0LmNvbnRhaW5zKCdpcy1hY3RpdmUnKSl7XHJcbiAgICAvLyAgZnVsbHNjcmVlbi5jbGFzc0xpc3QuYWRkKCdmYWRlT3V0Jyk7XHJcbiAgICAvLyAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIGNsb3NlSGFtYnVyZ2VyTWVudSgpO1xyXG4gICAgICAvLyBmdWxsc2NyZWVuLmNsYXNzTGlzdC5yZW1vdmUoJ2ZhZGVPdXQnKTtcclxuICAgIC8vICB9LCA0MDApO1xyXG4gICAgICBcclxuICAgfSBlbHNle1xyXG4gICAgICBvcGVuSGFtYnVyZ2VyTWVudSgpO1xyXG4gICAgICBcclxuICAgfVxyXG4gICBcclxuICB9KTtcclxuXHJcbiAgZnVsbHNjcmVlbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIFxyXG4gICAgaWYoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCd2ZXJ0aWNhbC1tZW51LWxpc3RfX2xpbmsnKSl7XHJcbiAgICAgIGNsb3NlSGFtYnVyZ2VyTWVudSgpO1xyXG4gICAgfVxyXG5cclxuICB9KTtcclxuXHJcblxyXG5cclxuICAvLyBmb3IgKGxldCBpPTA7IGk8bWVudUl0ZW1zLmxlbmd0aDsgaSsrKXtcclxuICAvLyAgIGNvbnN0IG1lbnVJdGVtID0gbWVudUl0ZW1zW2ldO1xyXG4gIC8vICAgbWVudUl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgLy8gICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAvLyAgICAgY2xvc2VIYW1idXJnZXJNZW51KCk7XHJcblxyXG4gIC8vICAgfSk7XHJcbiAgLy8gfVxyXG5cclxuXHJcbi8vIGxldCBmdWxsc2NyZWVuRXhpdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oYW1idXJnZXIuaXMtYWN0aXZlJyk7XHJcbi8vIGZ1bGxzY3JlZW5FeGl0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7IFxyXG4vLyAgIGZ1bGxzY3JlZW4uc3R5bGUucmlnaHQgPSAnLTEwMCUnO1xyXG4vLyB9KTsiLCIvLyBPbmVwYWdlc2Nyb2xsXHJcblxyXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xyXG5cclxuICBjb25zdCBjb250YWluZXIgPSAkKCcubWFpbmNvbnRlbnQnKSxcclxuICBzZWN0aW9ucyA9ICQoJy5zZWN0aW9uJyksXHJcbiAgaW5kZXggPSAwLFxyXG4gIHNjcm9sbCA9IGZhbHNlO1xyXG5cclxuICAkKCcuc2VjdGlvbjpmaXJzdC1jaGlsZCcpLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuXHJcbiQoJ2JvZHknKS5vbignbW91c2V3aGVlbCcsIGZ1bmN0aW9uKGV2ZW50KXsgXHJcblxyXG4gIGNvbnN0IGFjdGl2ZVNlY3Rpb24gPSBzZWN0aW9ucy5maWx0ZXIoJy5hY3RpdmUnKTtcclxuXHJcbiAgaWYgKCFzY3JvbGwpe1xyXG5cclxuICAgIHNjcm9sbCA9IHRydWU7XHJcblxyXG4gICAgaWYgKGV2ZW50LmRlbHRhWSA+IDApe1xyXG4gICAgICBcclxuICAgICAgaWYoYWN0aXZlU2VjdGlvbi5wcmV2KCkubGVuZ3RoKXtcclxuICAgICAgICBpbmRleC0tO1xyXG4gICAgICB9XHJcbiAgXHJcbiAgICB9ZWxzZXtcclxuICAgICAgXHJcbiAgICAgIGlmKGFjdGl2ZVNlY3Rpb24ubmV4dCgpLmxlbmd0aCl7XHJcbiAgICAgICAgaW5kZXgrKztcclxuICAgICAgfVxyXG4gIFxyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG4gIHBvc2l0aW9uID0gKC1pbmRleCAqIDEwMCkgKyAndmgnO1xyXG4gIHNlY3Rpb25zLmVxKGluZGV4KS5hZGRDbGFzcygnYWN0aXZlJykuc2libGluZ3MoKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcblxyXG4gIGNvbnRhaW5lci5jc3MoJ3RvcCcsIHBvc2l0aW9uKTtcclxuXHJcbiAgc2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgc2Nyb2xsID0gZmFsc2U7XHJcblxyXG4gIH0sIDEzMDApO1xyXG4gIFxyXG59KTtcclxuXHJcbn0pO1xyXG5cclxuXHJcbiIsIi8vINCX0LDQutGA0YvRgtC40LUg0YHQvtGB0YLQsNCy0LBcclxuXHJcbiQoJy5kaXNoLWNvbXBvc2l0aW9uJykub24oJ21vdXNlZW50ZXInLCBmdW5jdGlvbigpe1xyXG4gICQodGhpcykuZmluZCgnLnBvcHVwJykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gIGNvbnNvbGUubG9nKDIpO1xyXG59KTtcclxuJCgnLmRpc2gtY29tcG9zaXRpb24nKS5vbignbW91c2VsZWF2ZScsIGZ1bmN0aW9uKCl7XHJcbiAgJCh0aGlzKS5maW5kKCcucG9wdXAnKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgY29uc29sZS5sb2coMyk7XHJcbn0pO1xyXG4kKCcucG9wdXBfX2V4aXQnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gICQodGhpcykuZmluZCgnLnBvcHVwJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gIGNvbnNvbGUubG9nKDQpO1xyXG59KTtcclxuIiwiLy8g0KHQu9Cw0LnQtNC10YBcclxuY29uc3QgQXJyb3dzID0gJCgnLnNsaWRlci1idXR0b25zJyk7XHJcbmNvbnN0IHNsaWRlckxpc3QgPSAkKCcuc2xpZGVyX19jYXJkJyk7XHJcbmNvbnN0IHNsaWRlcyA9ICQoJy5zbGlkZXJfX2J1cmdlcicpO1xyXG5cclxuXHJcbiQoZnVuY3Rpb24gKCl7XHJcblxyXG4gIHZhciBtb3ZlU2xpZGUgPSBmdW5jdGlvbiAoY29udGFpbmVyLCBzbGlkZU51bSl7XHJcbiAgICBjb25zdCBhY3RpdmVTbGlkZSA9IHNsaWRlcy5maWx0ZXIoJy5hY3RpdmUnKSxcclxuICAgIHJlcUl0ZW0gPSBzbGlkZXMuZXEoc2xpZGVOdW0pLFxyXG4gICAgcmVxSW5kZXggPSByZXFJdGVtLmluZGV4KCksXHJcbiAgICBkdXJhdGlvbiA9IDUwMDtcclxuXHJcbiAgICBpZiAocmVxSXRlbS5sZW5ndGgpe1xyXG4gICAgICBzbGlkZXJMaXN0LnN0b3AodHJ1ZSxmYWxzZSkuYW5pbWF0ZSh7XHJcbiAgICAgICAgJ2xlZnQnIDogLXJlcUluZGV4ICogMTAwICsgJyUnXHJcbiAgXHJcbiAgICAgIH0sIGR1cmF0aW9uLCBmdW5jdGlvbiAoKXtcclxuICAgICAgICBhY3RpdmVTbGlkZS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgcmVxSXRlbS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxuICBBcnJvd3Mub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuXHJcbiAgICB2YXIgJHRoaXMgPSAkKHRoaXMpLFxyXG4gICAgY29udGFpbmVyID0gJHRoaXMuY2xvc2VzdCgnLnNsaWRlcl9fd3JhcHBlcicpLFxyXG4gICAgYWN0aXZlU2xpZGUgPSBzbGlkZXMuZmlsdGVyKCcuYWN0aXZlJyksXHJcbiAgICBuZXh0U2xpZGUgPSBhY3RpdmVTbGlkZS5uZXh0KCksXHJcbiAgICBwcmV2U2xpZGUgPSBhY3RpdmVTbGlkZS5wcmV2KCk7XHJcbiAgICBcclxuICAgIFxyXG5cclxuICAgIGlmKCR0aGlzLmhhc0NsYXNzKCdzbGlkZXItYXJyb3ctcmlnaHQnKSl7XHJcblxyXG4gICAgICBpZiAobmV4dFNsaWRlLmxlbmd0aCl7XHJcbiAgICAgICAgbW92ZVNsaWRlKGNvbnRhaW5lciwgbmV4dFNsaWRlLmluZGV4KCkpO1xyXG4gICAgICB9IGVsc2V7XHJcbiAgICAgICAgbW92ZVNsaWRlKGNvbnRhaW5lciwgc2xpZGVzLmZpcnN0KCkuaW5kZXgoKSk7XHJcbiAgICAgIH1cclxuICAgICAgXHJcbiAgICB9IGlmKCR0aGlzLmhhc0NsYXNzKCdzbGlkZXItYXJyb3ctbGVmdCcpKXtcclxuICAgICAgaWYgKHByZXZTbGlkZS5sZW5ndGgpe1xyXG4gICAgICAgIG1vdmVTbGlkZShjb250YWluZXIsIHByZXZTbGlkZS5pbmRleCgpKTtcclxuICAgICAgfSBlbHNle1xyXG4gICAgICAgIG1vdmVTbGlkZShjb250YWluZXIsIHNsaWRlcy5sYXN0KCkuaW5kZXgoKSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIG1vdmVTbGlkZShjb250YWluZXIsIHByZXZTbGlkZS5pbmRleCgpKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgIFxyXG4gIH0pO1xyXG5cclxufSk7XHJcblxyXG5cclxuLy/QvdCw0YfQsNC70L5cclxuLy8gc2xpZGVyKCk7XHJcbi8vIGZ1bmN0aW9uIHNsaWRlcigpe1xyXG4vLyAgIGNvbnN0IGxlZnRBcnJvdyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2xpZGVyLWFycm93LWxlZnRcIik7XHJcbi8vICAgY29uc3QgcmlnaHRBcnJvdyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2xpZGVyLWFycm93LXJpZ2h0XCIpO1xyXG4vLyAgIGNvbnN0IHNsaWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zbGlkZXJfX2NhcmQnKTtcclxuLy8gICBjb25zdCBzbGlkZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2xpZGVyX19idXJnZXInKTtcclxuLy8gICBjb25zdCBzbGlkZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zbGlkZXJfX2J1cmdlcicpO1xyXG5cclxuLy8gICBsZXQgbWluUmlnaHQgPSAwO1xyXG4vLyAgIGxldCBjdXJyZW50UmlnaHQgPSAwO1xyXG5cclxuLy8gICBzbGlkZXIuc3R5bGUucmlnaHQgPSBjdXJyZW50UmlnaHQ7XHJcblxyXG4vLyAgIGZ1bmN0aW9uIGxlZnRNb3ZlKCl7XHJcbi8vICAgICBsZXQgc3RlcCA9IHNsaWRlLm9mZnNldFdpZHRoO1xyXG4vLyAgIGxldCBtYXhSaWdodCA9IChzbGlkZXMubGVuZ3RoIC0xICkgKiBzbGlkZS5vZmZzZXRXaWR0aDtcclxuLy8gICAgIGlmKGN1cnJlbnRSaWdodCA+IG1pblJpZ2h0KXtcclxuLy8gICAgICAgY3VycmVudFJpZ2h0IC09IHN0ZXA7XHJcbi8vICAgICAgIHNsaWRlci5zdHlsZS5yaWdodCA9IGN1cnJlbnRSaWdodCArIFwicHhcIjtcclxuLy8gICAgIH1lbHNle1xyXG4vLyAgICAgICBjdXJyZW50UmlnaHQgPSBtYXhSaWdodDtcclxuLy8gICAgICAgc2xpZGVyLnN0eWxlLnJpZ2h0ID0gbWF4UmlnaHQgKyBcInB4XCI7XHJcbi8vICAgICB9XHJcbi8vICAgfVxyXG5cclxuLy8gICBmdW5jdGlvbiByaWdodE1vdmUoKXtcclxuLy8gICAgIGxldCBzdGVwID0gc2xpZGUub2Zmc2V0V2lkdGg7XHJcbi8vICAgbGV0IG1heFJpZ2h0ID0gKHNsaWRlcy5sZW5ndGggLTEgKSAqIHNsaWRlLm9mZnNldFdpZHRoO1xyXG4gICAgXHJcbi8vICAgICBpZiAoY3VycmVudFJpZ2h0IDwgbWF4UmlnaHQpe1xyXG4vLyAgICAgICBjdXJyZW50UmlnaHQgKz0gc3RlcDtcclxuLy8gICAgICAgc2xpZGVyLnN0eWxlLnJpZ2h0ID0gY3VycmVudFJpZ2h0ICsgXCJweFwiO1xyXG4gICAgICBcclxuLy8gICAgIH0gZWxzZSB7XHJcbi8vICAgICAgIGN1cnJlbnRSaWdodCA9IG1pblJpZ2h0O1xyXG4vLyAgICAgICBzbGlkZXIuc3R5bGUucmlnaHQgPSBtaW5SaWdodCArIFwicHhcIjtcclxuICAgICAgXHJcbiAgICAgIFxyXG4vLyAgICAgfVxyXG4vLyAgIH1cclxuXHJcbi8vICAgbGVmdEFycm93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PntcclxuLy8gICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbi8vICAgbGVmdE1vdmUoKTtcclxuLy8gICBjb25zb2xlLmxvZygnbGVmdE1vdmUnKTtcclxuLy8gfSk7XHJcblxyXG4vLyByaWdodEFycm93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PntcclxuLy8gICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbi8vICAgcmlnaHRNb3ZlKCk7XHJcbi8vICAgY29uc29sZS5sb2coJ3JpZ2h0TW92ZScpO1xyXG4vLyB9KTtcclxuLy8gfVxyXG5cclxuLy/QutC+0L3QtdGGXHJcblxyXG4vLyBjb25zdCBsZWZ0QXJyb3cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNsaWRlci1hcnJvdy1sZWZ0XCIpO1xyXG4vLyBjb25zdCByaWdodEFycm93ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zbGlkZXItYXJyb3ctcmlnaHRcIik7XHJcbi8vIGNvbnN0IHNsaWRlckNhcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNsaWRlcl9fY2FyZFwiKTtcclxuXHJcblxyXG4vLyByaWdodEFycm93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkgeyBcclxuLy8gICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbi8vICAgc2xpZGVyQ2FyZC5hcHBlbmRDaGlsZChzbGlkZXJDYXJkLmZpcnN0RWxlbWVudENoaWxkKTsgXHJcbi8vIH0pO1xyXG4vLyBsZWZ0QXJyb3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7IFxyXG4vLyAgIGUucHJldmVudERlZmF1bHQoKTsgXHJcbi8vICAgc2xpZGVyQ2FyZC5pbnNlcnRCZWZvcmUoc2xpZGVyQ2FyZC5sYXN0RWxlbWVudENoaWxkLCBzbGlkZXJDYXJkLmZpcnN0RWxlbWVudENoaWxkKTtcclxuLy8gfSlcclxuXHJcblxyXG5cclxuXHJcbi8vIHJpZ2h0QXJyb3cuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xyXG4vLyAgIGxvb3AoXCJzbGlkZXItYXJyb3ctcmlnaHRcIik7XHJcbi8vIH0pO1xyXG5cclxuLy8gbGVmdEFycm93LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcclxuLy8gICBsb29wKFwic2xpZGVyLWFycm93LWxlZnRcIik7XHJcbi8vIH0pO1xyXG5cclxuLy8gZnVuY3Rpb24gbG9vcChkaXJlY3Rpb24pIHtcclxuLy8gICBpZiAoZGlyZWN0aW9uID09PSBcInNsaWRlci1hcnJvdy1yaWdodFwiKSB7XHJcbi8vICAgICBzbGlkZXJDYXJkIC5hcHBlbmRDaGlsZChzbGlkZXJDYXJkLmZpcnN0RWxlbWVudENoaWxkKTtcclxuLy8gICB9IGVsc2Uge1xyXG4vLyAgICAgc2xpZGVyQ2FyZCAuaW5zZXJ0QmVmb3JlKHNsaWRlckNhcmQubGFzdEVsZW1lbnRDaGlsZCwgc2xpZGVyQ2FyZC5maXJzdEVsZW1lbnRDaGlsZCk7XHJcbi8vICAgfVxyXG4vLyB9IiwiLy8g0JLQtdGA0YLQuNC60LDQu9GM0L3Ri9C5INCw0LrQutC+0YDQtNC10L7QvVxyXG5cclxuY29uc3QgdGVhbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmFjY29yZGVvbl9fdGVhbVwiKTtcclxuXHJcbnRlYW1zLmZvckVhY2goZnVuY3Rpb24odGVhbSkge1xyXG4gIHRlYW0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xyXG4gIFxyXG4gICAgY29uc3QgYWN0aXZlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hY2NvcmRlb25fX3RlYW0tLWFjdGl2ZVwiKTtcclxuICAgIGlmIChhY3RpdmUpIHtcclxuICAgICAgYWN0aXZlLmNsYXNzTGlzdC5yZW1vdmUoXCJhY2NvcmRlb25fX3RlYW0tLWFjdGl2ZVwiKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGVhbSAhPSBhY3RpdmUpIHtcclxuICAgICAgdGVhbS5jbGFzc0xpc3QuYWRkKFwiYWNjb3JkZW9uX190ZWFtLS1hY3RpdmVcIik7XHJcbiAgICB9XHJcblxyXG4gIH0pO1xyXG5cclxufSk7XHJcbiJdfQ==
