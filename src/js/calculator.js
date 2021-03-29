const calcSlider = function calcSlider() {
  const Swiper = window.Swiper;
  const container = $(".js-calc");

  if (!container) {
    return;
  }

  const mySwiper = new Swiper(".js-calc .swiper-container", {
    direction: "horizontal",
    slidesPerView: 1,
    spaceBetween: 0,
    allowTouchMove: false,
    speed: 355,
    navigation: {
      nextEl: '.calc__btn--next',
      prevEl: '.calc__btn--prev'
    },
    fadeEffect: {
      crossFade: true,
    },
    effect: "fade",
  });

  const btns = container.find(".calc__btn");
  const stepsLinks = container.find(".calc__side a");

  // Переключает шаги, если нажимают кнопки навигации
  btns.each(function() {
    const btn = $(this);

    btn.on("click", function() {
      stepsLinks.each(function() {
        const link = $(this);
        link.removeClass("active");
      });

      const slide = container.find(".swiper-slide-active");
      const index = slide.attr("index");
      const activeStep = $(stepsLinks[index]);
      activeStep.addClass("active");
    });
  });

  // Переключает активный слайд, если нажимают по самим ссылкам шагов
  stepsLinks.each(function() {
    const link = $(this);

    link.on("click", function (evt) {
      evt.preventDefault();

      stepsLinks.each(function () {
        $(this).removeClass("active");
      });

      link.addClass("active");
      const index = link.attr("index");
      mySwiper.slideTo(index, 400, false);
    });
  });
};

export default calcSlider;
