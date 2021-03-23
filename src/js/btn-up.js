const btnUp = () => {

  $(window).scroll(function() {
    if ($(this).scrollTop() > 200) {
        if ($('#upbutton').is(':hidden')) {
            $('#upbutton').css({opacity : 0.9}).fadeIn('fast');
        }
    } else { $('#upbutton').stop(true, false).fadeOut('fast'); }
  });

  $('#upbutton').click(function() {
      $('html, body').stop().animate({scrollTop : 0}, 300);
  });

};

export default btnUp;
