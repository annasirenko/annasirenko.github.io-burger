// Onepagescroll

// $(document).ready(function(){

//   const container = $('.maincontent'),
//   sections = $('.section'),
//   index = 0,
//   scroll = false;

//   $('.section:first-child').addClass('active');

// $('body').on('mousewheel', function(event){ 

//   const activeSection = sections.filter('.active');

//   if (!scroll){

//     let scroll = true;

//     if (event.deltaY > 0){
      
//       if(activeSection.prev().length){
//         index--;
//       }
  
//     }else{
      
//       if(activeSection.next().length){
//         index++;
//       }
  
//     }

//   }

//   position = (-index * 100) + 'vh';
//   sections.eq(index).addClass('active').siblings().removeClass('active');

//   container.css('top', position);

//   setTimeout(function(){
//     let scroll = false;

//   }, 1300);
  
// });

// });


