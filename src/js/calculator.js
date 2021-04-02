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

    const activeStep = $(stepsLinks[index]);
    activeStep.addClass("active");
  }

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
  const seamsSpan = container.find(".js-seams-span");
  const consumptionSpan = container.find(".js-consumption-span");
  let resultFirstSlide = 0;
  let resultSecondSlide = 0;

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
  runningMetersInput.on("change", function() {
    getInputMetersValue();
    getInputMetersConsumption();
    calcGoods(resultFirstSlide);
  });

  // Кнопка далее переводит с первого или второго слайда на последний
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

  wallLenghtOne.on("input", function() {
    checkSecondSlide();
  });
  wallLenghtOne.on("change", function() {
    getInputsMetersValue();
    getInputsMetersConsumption();
    calcGoods(resultSecondSlide);
  });

  wallLenghtTwo.on("input", function() {
    checkSecondSlide();
  });
  wallLenghtTwo.on("input", function() {
    getInputsMetersValue();
    getInputsMetersConsumption();
    calcGoods(resultSecondSlide);
  });

  wallHeightOne.on("input", function() {
    checkSecondSlide();
  });
  wallHeightOne.on("input", function() {
    getInputsMetersValue();
    getInputsMetersConsumption();
    calcGoods(resultSecondSlide);
  });

  barLenght.on("input", function() {
    checkSecondSlide();
  });
  barLenght.on("input", function() {
    getInputsMetersValue();
    getInputsMetersConsumption();
    calcGoods(resultSecondSlide);
  });

  // Считает расход и пагонаж с первого слайда
  function getInputMetersConsumption() {
    const val = runningMetersInput.val();
    const consumption = val * 210;
    resultFirstSlide = (consumption / 1000).toFixed(2);
    consumptionSpan.text(resultFirstSlide);
  }
  getInputMetersConsumption();

  function getInputMetersValue() {
    const val = runningMetersInput.val();
    seamsSpan.text(val);
  }
  getInputMetersValue();

  let metersSecondSlideValue = 0;
  // Считает расход и пагонаж со второго слайда
  function getInputsMetersValue() {
    const lenghtOne = wallLenghtOne.val();
    const lenghtTwo = wallLenghtTwo.val();
    const wallHeight = wallHeightOne.val();
    const barHeight = barLenght.val();
    const firstValue = wallHeight / barHeight * lenghtOne;
    const secondValue = wallHeight / barHeight * lenghtTwo;
    metersSecondSlideValue = firstValue + secondValue;

    seamsSpan.text(metersSecondSlideValue);
  }
  getInputsMetersValue();

  function getInputsMetersConsumption() {
    const val = metersSecondSlideValue;
    const barHeight = barLenght.val() * 10;
    const consumption = val * barHeight;
    resultSecondSlide = (consumption / 1000).toFixed(2);
    consumptionSpan.text(resultSecondSlide);
  };
  getInputsMetersConsumption();

  const bank10AmountSpan = container.find(".js-bank10-amount");
  const bank5AmountSpan = container.find(".js-bank5-amount");
  const bank05AmountSpan = container.find(".js-bank05-amount");
  const bank031AmountSpan = container.find(".js-bank031-amount");

  const bank10WeightSpan = container.find(".js-bank10-weight");
  const bank5WeightSpan = container.find(".js-bank5-weight");
  const bank05WeightSpan = container.find(".js-bank05-weight");
  const bank031WeightSpan = container.find(".js-bank031-weight");


  // Считает сколько нужно товаров на третьем слайде
  function calcGoods(val) {
    const amountBank10 = Math.ceil(val / 10);
    const amountBank5 = Math.ceil(val / 5);
    const amountBank05 = Math.ceil(val / 0.5);
    const amountBank031 = Math.ceil(val / 0.31);

    const weightBank10 = Math.ceil(amountBank10 * 10);
    const weightBank5 = Math.ceil(amountBank5 * 5);
    const weightBank05 = Math.ceil(amountBank05 * 0.5);
    const weightBank031 = Math.ceil(amountBank031 * 0.31);

    bank10AmountSpan.text(amountBank10);
    bank5AmountSpan.text(amountBank5);
    bank05AmountSpan.text(amountBank05);
    bank031AmountSpan.text(amountBank031);

    bank10WeightSpan.text(weightBank10);
    bank5WeightSpan.text(weightBank5);
    bank05WeightSpan.text(weightBank05);
    bank031WeightSpan.text(weightBank031);
  }

};

export default calcSlider;
