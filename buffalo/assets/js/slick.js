$(window).on('load', function() {
    $('.slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        asNavFor: '.slider-nav'
      });
      
  
    $('.slider-nav').slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      asNavFor: '.slider',
      arrows: true,
      dots: true,
      centerMode: true,
      focusOnSelect: true
    });
  });
  