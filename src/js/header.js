const headerScroll = () => {
  const main = document.querySelector("main");

  const $header = $(".header");

  if ($header) {

    // Header меняет цвета при скролле. Он уже fixed изначально
    const scrollHeader = () => {
      const introTop = main.getBoundingClientRect().top;

      if (introTop < -1) {
        $header.addClass("scroll");

      } else if ($header.hasClass("scroll") && introTop > -1) {
        $header.removeClass("scroll");
      }
    };

    $(window).on("scroll", scrollHeader);
    $(document).on("ready", scrollHeader);


    //Добавляет отступ на страницах для фиксированного хедера
    function checkHeaderHeight() {
      const value = $header.outerHeight();
      const main = $("main");

      main.css("padding-top", value);
    }
    // checkHeaderHeight();

    $(window).on("resize", checkHeaderHeight);
  }

};

export default headerScroll;
