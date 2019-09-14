// Onepagescroll

$(document).ready(function(){

  container = $('.maincontent'),
  sections = $('.section'),
  index = 0,
  scroll = false;

  $('.section:first-child').addClass('active');

$('body').on('mousewheel', function(event){ 

  activeSection = sections.filter('.active');

  if (!scroll){

    scroll = true;

    if (event.deltaY > 0){
      
      if(activeSection.prev().length){
        index--;
      }
  
    }else{
      
      if(activeSection.next().length){
        index++;
      }
  
    }

  }

  position = (-index * 100) + 'vh';
  sections.eq(index).addClass('active').siblings().removeClass('active');

  container.css('top', position);

  setTimeout(function(){
    scroll = false;

  }, 1300);
  
});

});


