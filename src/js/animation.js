const animation = () => {
  //wow
  const animations = new window.WOW().init();

  //btns
  const btns = $(".js-ripple");

  if (btns) {
    function checkTouchDevice() {
      try {
        document.createEvent('TouchEvent');

        return true;
      } catch (e) {

        return false;
      }
    }

    let isTouchDevice = checkTouchDevice();

    if (!isTouchDevice) {

      btns.each(function() {
        let $button = $(this);
        let $rippleTemplate = $('<span />', {
          class: 'button__ripple',
        });
        $button.append($rippleTemplate);

        let $ripple = $button.find('.button__ripple');

        $button.on('mouseenter', '*', function(e) {
          let parentOffset = $button.offset();
          let relX = e.pageX - parentOffset.left;
          let relY = e.pageY - parentOffset.top;

          $ripple.css({
            top: relY,
            left: relX,
            width: '225%',
            height: $button.width() * 2.25,
          });
        });

        $button.on('mouseout', '*', function(e) {
          let parentOffset = $button.offset();
          let relX = e.pageX - parentOffset.left;
          let relY = e.pageY - parentOffset.top;
          $ripple.css({
            top: relY,
            left: relX,
            width: 0,
            height: 0,
          });
        });
      });
      
    }
  }



};

export default animation;
