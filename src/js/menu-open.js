const menuOpen = () => {
  // Открытие моб меню
  const $buttonsMenu = $(".js-open-menu");

  if ($buttonsMenu.length) {
    const $menu = $(".menu");
    const $buttonClose = $(".js-btn-close");
    const $header = $(".header");

    $buttonsMenu.each(function () {
      const $btn = $(this);

      const scrollHeader = () => {
        if ($menu.hasClass("is-show")) {

          if($menu.scrollTop() > 1) {
            $header.addClass("scroll");

          } else {
            $header.removeClass("scroll");
          }
        }
      };

      $btn.click(function() {
        // если открыто меню
        if ($menu.hasClass("is-show")) {

          const pos = parseInt($("body").attr("data-scroll"), 10);
          $menu.removeClass("is-show");
          $btn.removeClass("is-show");
          $header.removeClass("scroll");

          $("body").removeClass("is-menu-open").removeAttr("data-scroll");
          window.scrollTo(0, pos);

          // если закрыто меню
        } else {

          $menu.addClass("is-show");

          if($menu.scrollTop() > 1) {
            $header.addClass("scroll");
          }

          setTimeout(function () {
            $btn.addClass("is-show");

          }, 100);

          setTimeout(function () {
            const pagePos = $(window).scrollTop();
            $("body").addClass("is-menu-open").attr("data-scroll", pagePos);
          }, 450);
        }
      });

      $(".menu").on("scroll", scrollHeader);
    });

    $buttonClose.click(function () {
      const pos = parseInt($("body").attr("data-scroll"), 10);
      $menu.removeClass("is-show");
      $buttonsMenu.each(function () {
        const $btn = $(this);
        $btn.removeClass("is-show");
      });

      $("body").removeClass("is-menu-open").removeAttr("data-scroll");
      window.scrollTo(0, pos);
    });

  }

};

export default menuOpen;
