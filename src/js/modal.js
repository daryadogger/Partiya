const modal = () => {
  const $buttons = $('[js-popup-open]');

  if ($buttons.length) {
    const $body = $('body');

    $buttons.each(function() {
      const $button = $(this);
      const options = {
        hideScrollbar: true,
        touch: false,
        btnTpl : {
          smallBtn : ''
        },
        beforeShow: function() {
          //  Add another bg color
          $('.fancybox-bg').addClass($button.data('src').slice(1));

          const bodyStyles = {
            'overflow-y': 'hidden',
            'margin': '0 auto'
          };
          $body.css(bodyStyles);

          setTimeout(() => {
            $($button.data('src')).addClass("show");
          }, 100);
        },
        afterClose: function() {
          //  Add another bg color
          $('.fancybox-bg').removeClass($button.data('src').slice(1));

          const bodyStyles = {
            'overflow-y': 'visible',
            'padding-right': 0,
            'margin': 0
          };
          $body.css(bodyStyles);

          $($button.data('src')).removeClass("show");
        }
      };

      $button.fancybox(options);
    });
  }
};

export default modal;
