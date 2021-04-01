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

  const Indexes = {
    FIRST_SLIDE: `0`,
    SECOND_SLIDE: `1`,
    THIRD_SLIDE: `2`
  }

  // Переключает шаги, если нажимают кнопки навигации
  function changeActiveStep(index) {
    stepsLinks.each(function() {
      const link = $(this);
      link.removeClass("active");
    });

    const slide = container.find(".swiper-slide-active");
    // const index = slide.attr("index");
    const activeStep = $(stepsLinks[index]);
    activeStep.addClass("active");
  }

  // Переключает активный слайд, если нажимают по самим ссылкам шагов
  stepsLinks.each(function() {
    const link = $(this);

    link.on("click", function (evt) {
      evt.preventDefault();
    });
  });

  // Проверяет value инпута погонных метров и делает кнопку disabled
  const runningMetersInput = container.find(".js-running-meters");
  const btnNext = container.find(".js-btn-next");
  const btnPrev = container.find(".js-btn-prev");
  const dontKnowLink = container.find(".js-dont-know");
  const btnGoToBasket = container.find(".js-go-to-basket");
  const wallLenghtOne = container.find(".js-length-wall-1");
  const wallLenghtTwo = container.find(".js-length-wall-2");
  const wallHeightOne = container.find(".js-height-wall-1");
  const barLenght = container.find(".js-height-bar");

  function checkInputVal(input) {
    if (input.val() !== ``) {
      btnNext.removeAttr("disabled");
    } else {
      btnNext.attr("disabled", true);
    }
  }

  checkInputVal(runningMetersInput);
  runningMetersInput.on("input", function() {
    checkInputVal(runningMetersInput);
  });

  // Кнопка далее переводит с первого слайда на последний
  function goToLastSlide() {
    const slide = container.find(".swiper-slide-active");

    if (slide.attr("index") === Indexes.FIRST_SLIDE || slide.attr("index") === Indexes.SECOND_SLIDE) {
      mySwiper.slideTo(Indexes.THIRD_SLIDE, 400, false);
    }
    changeActiveStep(Indexes.THIRD_SLIDE);
    btnNext.addClass('hide');
    btnGoToBasket.addClass('show');
  }
  btnNext.on("click", goToLastSlide);

  // Кнопка назад всегда переводит на 1 слайд
  function goToFirstSlide() {
    $(".js-calc input").each(function() {
      $(this).val(``);
    });
    checkSecondSlide();
    checkInputVal(runningMetersInput);

    mySwiper.slideTo(Indexes.FIRST_SLIDE, 400, false);
    changeActiveStep(Indexes.FIRST_SLIDE);

    if (btnNext.hasClass('hide')) {
      btnNext.removeClass('hide');
      btnGoToBasket.removeClass('show');
    }
  }
  btnPrev.on("click", goToFirstSlide);

  // Ссылка "я не знаю метраж" переводит на 2 слайд
  function goToSecondSlide() {
    runningMetersInput.val(``);
    checkInputVal(runningMetersInput);
    mySwiper.slideTo(Indexes.SECOND_SLIDE, 400, false);
    changeActiveStep(Indexes.SECOND_SLIDE);
  }
  dontKnowLink.on("click", function(evt) {
    evt.preventDefault();
    goToSecondSlide();
  });

  // Проверяем заполненность полей на 2 слайде
  function checkSecondSlide() {
    if (wallLenghtOne.val() !== `` && wallLenghtTwo.val() !== `` && wallHeightOne.val() !== `` && barLenght.val() !== ``) {
      btnNext.removeAttr("disabled");
    } else {
      btnNext.attr("disabled", true);
    }
  }
  checkSecondSlide();

  wallLenghtOne.on("input", checkSecondSlide);
  wallLenghtTwo.on("input", checkSecondSlide);
  wallHeightOne.on("input", checkSecondSlide);
  barLenght.on("input", checkSecondSlide);

};

export default calcSlider;
