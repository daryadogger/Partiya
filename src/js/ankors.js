const ankors = () => {
  const links = $(".js-ankor");
  if (!links) {
    return;
  }

  const partname = window.location.pathname;

  //Проверяем на document.ready наличие #hashtag в url, и если есть, скроллим до нужной секции
  const checkHash = function() {
    if (window.location.hash) {
      const hash = window.location.hash;

      if ($(hash).length) {
          $('html, body').animate({
              scrollTop: ($(hash).offset().top - 60),
          }, 900, 'swing');
      }
    }
  };

  $(document).ready(checkHash);

  // На кнопки вешаем обработчики событий
  links.each(function() {
    $(this).on("click", function(evt) {
      evt.preventDefault();

      const hash = $(this).attr('data-href');

      if ($(hash).length) {
          $('html, body').animate({
              scrollTop: ($(hash).offset().top - 130),
          }, 900, 'swing');
      }
    });

    $(this).on("focus", function(evt) {
      evt.preventDefault();

      const hash = $(this).attr('data-href');

      if ($(hash).length) {
        $('html, body').animate({
            scrollTop: ($(hash).offset().top - 130),
        }, 900, 'swing');
      }
    });
  });

};

export default ankors;
