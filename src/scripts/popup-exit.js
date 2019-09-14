// Закрытие состава

$('.dish-composition').on('mouseenter', function(){
  $(this).find('.popup').addClass('active');
  console.log(2);
});
$('.dish-composition').on('mouseleave', function(){
  $(this).find('.popup').removeClass('active');
  console.log(3);
});
$('.popup__exit').on('click', function(){
  $(this).find('.popup').removeClass('active');
  console.log(4);
});
