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
      // Нужно, чтобы меню закрывалось и страница скроллилась до секции
      if ($(".menu").hasClass("is-show")) {

        $(".menu").removeClass("is-show");
        $('body').removeClass('is-menu-open').removeAttr('data-scroll');
        checkHash();

      // Обычный скрипт скролла до необходимой секции в data атрибуте без перезагрузки страницы
      } else {

        evt.preventDefault();

        var hash = $(this).attr('data-href');

        if ($(hash).length) {
            $('html, body').animate({
                scrollTop: ($(hash).offset().top - 130),
            }, 900, 'swing');
        }

      }
    });

    $(this).on("focus", function(evt) {
      // Нужно, чтобы меню закрывалось и страница скроллилась до секции
      if ($(".menu").hasClass("is-show")) {

        $(".menu").removeClass("is-show");
        $(".js-open-menu").removeClass("is-show");
        $('body').removeClass('is-menu-open').removeAttr('data-scroll');
        checkHash();

      // Обычный скрипт скролла до необходимой секции в data атрибуте без перезагрузки страницы
      } else {

        evt.preventDefault();

        var hash = $(this).attr('data-href');

        if ($(hash).length) {
            $('html, body').animate({
                scrollTop: ($(hash).offset().top - 130),
            }, 900, 'swing');
        }

      }
    });
  });

};

export default ankors;
