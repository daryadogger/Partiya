(function () {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  var nodeListForEach = function nodeListForEach() {
    if ('NodeList' in window && !NodeList.prototype.forEach) {
      NodeList.prototype.forEach = function (callback, thisArg) {
        thisArg = thisArg || window;

        for (var i = 0; i < this.length; i++) {
          callback.call(thisArg, this[i], i, this);
        }
      };
    }
  };

  var tel = function tel() {
    // Mask for tel
    var formBlocks = document.querySelectorAll(".fieldset");

    if (formBlocks.length) {
      formBlocks.forEach(function (formBlock) {
        var input = formBlock.querySelector("input[name=tel]");

        if (input) {
          var phoneMask = IMask(input, {
            mask: "+{7} 000 000-00-00"
          });
        }
      });
    }
  };

  var animation = function animation() {
    //wow
    var animations = new window.WOW().init(); //btns

    var btns = $(".js-ripple");

    if (btns) {
      function checkTouchDevice() {
        try {
          document.createEvent('TouchEvent');
          return true;
        } catch (e) {
          return false;
        }
      }

      var isTouchDevice = checkTouchDevice();

      if (!isTouchDevice) {
        btns.each(function () {
          var $button = $(this);
          var $rippleTemplate = $('<span />', {
            class: 'button__ripple'
          });
          $button.append($rippleTemplate);
          var $ripple = $button.find('.button__ripple');
          $button.on('mouseenter', '*', function (e) {
            var parentOffset = $button.offset();
            var relX = e.pageX - parentOffset.left;
            var relY = e.pageY - parentOffset.top;
            $ripple.css({
              top: relY,
              left: relX,
              width: '225%',
              height: $button.width() * 2.25
            });
          });
          $button.on('mouseout', '*', function (e) {
            var parentOffset = $button.offset();
            var relX = e.pageX - parentOffset.left;
            var relY = e.pageY - parentOffset.top;
            $ripple.css({
              top: relY,
              left: relX,
              width: 0,
              height: 0
            });
          });
        });
      }
    }

    var promo = $(".promo");

    if (promo) {
      var promoImgLg = promo.find(".promo__good--lg");
      var promoImgSm = promo.find(".promo__good--sm");
      $(document).ready(function () {
        setTimeout(function () {
          promoImgLg.addClass("show");
          promoImgSm.addClass("show");
        }, 300);
      });
    }
  };

  var menuOpen = function menuOpen() {
    // Открытие моб меню
    var $buttonsMenu = $(".js-open-menu");

    if ($buttonsMenu.length) {
      var $menu = $(".menu");
      var $buttonClose = $(".js-btn-close");
      var $header = $(".header");
      $buttonsMenu.each(function () {
        var $btn = $(this);

        var scrollHeader = function scrollHeader() {
          if ($menu.hasClass("is-show")) {
            if ($menu.scrollTop() > 1) {
              $header.addClass("scroll");
            } else {
              $header.removeClass("scroll");
            }
          }
        };

        $btn.click(function () {
          // если открыто меню
          if ($menu.hasClass("is-show")) {
            var pos = parseInt($("body").attr("data-scroll"), 10);
            $menu.removeClass("is-show");
            $btn.removeClass("is-show");
            $header.removeClass("scroll");
            $("body").removeClass("is-menu-open").removeAttr("data-scroll");
            window.scrollTo(0, pos); // если закрыто меню
          } else {
            $menu.addClass("is-show");

            if ($menu.scrollTop() > 1) {
              $header.addClass("scroll");
            }

            setTimeout(function () {
              $btn.addClass("is-show");
            }, 100);
            setTimeout(function () {
              var pagePos = $(window).scrollTop();
              $("body").addClass("is-menu-open").attr("data-scroll", pagePos);
            }, 450);
          }
        });
        $(".menu").on("scroll", scrollHeader);
      });
      $buttonClose.click(function () {
        var pos = parseInt($("body").attr("data-scroll"), 10);
        $menu.removeClass("is-show");
        $buttonsMenu.each(function () {
          var $btn = $(this);
          $btn.removeClass("is-show");
        });
        $("body").removeClass("is-menu-open").removeAttr("data-scroll");
        window.scrollTo(0, pos);
      });
    }
  };

  var modal = function modal() {
    var $buttons = $('[js-popup-open]');

    if ($buttons.length) {
      var $body = $('body');
      $buttons.each(function () {
        var $button = $(this);
        var options = {
          hideScrollbar: true,
          touch: false,
          btnTpl: {
            smallBtn: ''
          },
          beforeShow: function beforeShow() {
            //  Add another bg color
            $('.fancybox-bg').addClass($button.data('src').slice(1));
            var bodyStyles = {
              'overflow-y': 'hidden',
              'margin': '0 auto'
            };
            $body.css(bodyStyles);
            setTimeout(function () {
              $($button.data('src')).addClass("show");
            }, 100);
          },
          afterClose: function afterClose() {
            //  Add another bg color
            $('.fancybox-bg').removeClass($button.data('src').slice(1));
            var bodyStyles = {
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

  var headerScroll = function headerScroll() {
    var main = document.querySelector("main");
    var $header = $(".header");

    if ($header) {
      // Header меняет цвета при скролле. Он уже fixed изначально
      var scrollHeader = function scrollHeader() {
        var introTop = main.getBoundingClientRect().top;

        if (introTop < -1) {
          $header.addClass("scroll");
        } else if ($header.hasClass("scroll") && introTop > -1) {
          $header.removeClass("scroll");
        }
      };

      $(window).on("scroll", scrollHeader);
      $(document).on("ready", scrollHeader); //Добавляет отступ на страницах для фиксированного хедера

      function checkHeaderHeight() {
        var value = $header.outerHeight();
        var main = $("main");
        main.css("padding-top", value);
      } // checkHeaderHeight();


      $(window).on("resize", checkHeaderHeight);
    }
  };

  var sliders = function sliders() {
    var Swiper = window.Swiper; // Adv slider

    var advantages = document.querySelector(".js-advantages-slider");

    if (advantages) {
      var mySwiper = new Swiper(".js-advantages-slider.swiper-container", {
        direction: "horizontal",
        slidesPerView: 1,
        spaceBetween: 20,
        speed: 400,
        navigation: {
          nextEl: ".js-advantages-slider .swiper-button-next",
          prevEl: ".js-advantages-slider .swiper-button-prev"
        }
      });
    } // Photos slider


    var photos = document.querySelector(".js-photos-slider");

    if (photos) {
      var _mySwiper = new Swiper(".js-photos-slider.swiper-container", {
        direction: "horizontal",
        slidesPerView: 1,
        spaceBetween: 20,
        speed: 400,
        loop: true,
        centeredSlides: false,
        breakpoints: {
          767: {
            slidesPerView: 2,
            spaceBetween: 20,
            centeredSlides: true
          }
        },
        navigation: {
          nextEl: ".js-photos-slider .swiper-button-next",
          prevEl: ".js-photos-slider .swiper-button-prev"
        },
        pagination: {
          el: '.js-photos-slider .swiper-pagination',
          clickable: true
        }
      });
    } // Reviews slider


    var reviews = document.querySelector(".js-reviews-slider");

    if (reviews) {
      var _mySwiper2 = new Swiper(".js-reviews-slider.swiper-container", {
        direction: "horizontal",
        slidesPerView: 1,
        spaceBetween: 20,
        speed: 400,
        loop: true,
        centeredSlides: true,
        breakpoints: {
          680: {
            slidesPerView: 2,
            spaceBetween: 15,
            centeredSlides: false
          },
          767: {
            slidesPerView: 3,
            spaceBetween: 15,
            centeredSlides: true
          },
          991: {
            slidesPerView: 3,
            spaceBetween: 120,
            centeredSlides: true
          }
        },
        navigation: {
          nextEl: ".js-reviews-slider .swiper-button-next",
          prevEl: ".js-reviews-slider .swiper-button-prev"
        }
      });
    } // Sertificates slider


    var sertificates = document.querySelector(".js-sertificates-slider");

    if (sertificates) {
      var _mySwiper3 = new Swiper(".js-sertificates-slider.swiper-container", {
        direction: "horizontal",
        slidesPerView: 1,
        spaceBetween: 20,
        speed: 400,
        loop: true,
        centeredSlides: true,
        breakpoints: {
          500: {
            slidesPerView: 2,
            spaceBetween: 15,
            centeredSlides: false
          },
          680: {
            slidesPerView: 3,
            spaceBetween: 15
          },
          991: {
            slidesPerView: 3,
            spaceBetween: 120,
            centeredSlides: true
          }
        },
        navigation: {
          nextEl: ".js-sertificates-slider .swiper-button-next",
          prevEl: ".js-sertificates-slider .swiper-button-prev"
        }
      });
    }
  };

  var number = function number() {
    //Разрешает ввод только цифр в input
    var $numbers = $(".js-number");

    if (!$numbers) {
      return;
    }

    $numbers.each(function () {
      var $thiss = $(this);
      $thiss.mask('0#');
    });
  };

  var btnUp = function btnUp() {
    $(window).scroll(function () {
      if ($(this).scrollTop() > 200) {
        if ($('#upbutton').is(':hidden')) {
          $('#upbutton').css({
            opacity: 0.9
          }).fadeIn('fast');
        }
      } else {
        $('#upbutton').stop(true, false).fadeOut('fast');
      }
    });
    $('#upbutton').click(function () {
      $('html, body').stop().animate({
        scrollTop: 0
      }, 300);
    });
  };

  var accordion = function accordion() {
    var $accordions = $(".accordion__item");

    if (!$accordions) {
      return;
    }

    $accordions.each(function () {
      var $thiss = $(this);
      var $side = $thiss.find(".accordion__label");
      var $main = $thiss.find(".accordion__content");
      $side.on("click", function (evt) {
        evt.preventDefault();

        if ($side.hasClass("is-open")) {
          $main.slideUp("slow");
          $side.removeClass("is-open");
          $side.blur();
        } else {
          $side.addClass("is-open");
          $main.slideDown("slow");
        }
      });
    });
  };

  var goodQuantity = function goodQuantity() {
    // Увеличение и уменьшение товаров
    var containers = document.querySelectorAll(".js-quantity");

    if (containers.length < 0) {
      return;
    }

    containers.forEach(function (container) {
      var input = container.querySelector("input");
      var btnIncrease = container.querySelector(".js-increase");
      var btnDecrease = container.querySelector(".js-decrease");
      var value;

      var btnIncreaseHandler = function btnIncreaseHandler() {
        value = input.value;
        var newValue = ++value;

        if (newValue > 1) {
          btnDecrease.removeAttribute("disabled");
        }

        input.value = newValue;
      };

      var btnDecreaseHandler = function btnDecreaseHandler() {
        value = input.value;
        var newValue = --value;

        if (newValue <= 1) {
          newValue = 1;
          input.value = 1;
          btnDecrease.setAttribute("disabled", "disabled");
        }

        input.value = newValue;
      };

      btnIncrease.addEventListener("click", btnIncreaseHandler);
      btnDecrease.addEventListener("click", btnDecreaseHandler);
      input.addEventListener("change", function () {
        btnIncreaseHandler();
        btnDecreaseHandler();
      });
    });
  };

  var colorsSelect = function colorsSelect() {
    var colorsBlock = $(".colors-block");

    if (!colorsBlock) {
      return;
    }

    var links = colorsBlock.find(".colors-block__item");
    var pictureBlock = colorsBlock.find(".colors-block__info img");
    var textBlock = colorsBlock.find(".colors-block__info p");
    links.each(function () {
      var link = $(this);
      link.on("click", function (evt) {
        evt.preventDefault();
        links.each(function () {
          $(this).removeClass("active");
        });
        var picture = link.attr("data-img");
        var name = link.find("p").text();
        pictureBlock.attr("src", picture);
        textBlock.text(name);
        link.addClass("active");
      });
    });
  };

  var footerForm = function footerForm() {
    var $footerForm = $(".footer form");

    if (!$footerForm) {
      return;
    }

    var inputs = $footerForm.find("input");
    inputs.each(function () {
      var input = $(this);
      input.on("change", function () {
        if (input.val() !== "") {
          input.addClass("has-value");
        } else {
          input.removeClass("has-value");
        }
      });
    });
  };

  var calcSlider = function calcSlider() {
    var Swiper = window.Swiper;
    var container = $(".js-calc");

    if (!container) {
      return;
    }

    var mySwiper = new Swiper(".js-calc .swiper-container", {
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
        crossFade: true
      },
      effect: "fade"
    });
    var btns = container.find(".calc__btn");
    var stepsLinks = container.find(".calc__side a");
    var Indexes = {
      FIRST_SLIDE: "0",
      SECOND_SLIDE: "1",
      THIRD_SLIDE: "2"
    }; // Переключает шаги, если нажимают кнопки навигации

    function changeActiveStep(index) {
      stepsLinks.each(function () {
        var link = $(this);
        link.removeClass("active");
      });
      var activeStep = $(stepsLinks[index]);
      activeStep.addClass("active");
    } // Проверяет value инпута погонных метров и делает кнопку disabled


    var runningMetersInput = container.find(".js-running-meters");
    var btnNext = container.find(".js-btn-next");
    var btnPrev = container.find(".js-btn-prev");
    var dontKnowLink = container.find(".js-dont-know");
    var btnGoToBasket = container.find(".js-go-to-basket");
    var wallLenghtOne = container.find(".js-length-wall-1");
    var wallLenghtTwo = container.find(".js-length-wall-2");
    var wallHeightOne = container.find(".js-height-wall-1");
    var barLenght = container.find(".js-height-bar");
    var seamsSpan = container.find(".js-seams-span");
    var consumptionSpan = container.find(".js-consumption-span");
    var resultFirstSlide = 0;
    var resultSecondSlide = 0;

    function checkInputVal(input) {
      if (input.val() !== "") {
        btnNext.removeAttr("disabled");
      } else {
        btnNext.attr("disabled", true);
      }
    }

    checkInputVal(runningMetersInput);
    runningMetersInput.on("input", function () {
      checkInputVal(runningMetersInput);
    });
    runningMetersInput.on("change", function () {
      getInputMetersValue();
      getInputMetersConsumption();
      calcGoods(resultFirstSlide);
    }); // Кнопка далее переводит с первого или второго слайда на последний

    function goToLastSlide() {
      var slide = container.find(".swiper-slide-active");

      if (slide.attr("index") === Indexes.FIRST_SLIDE || slide.attr("index") === Indexes.SECOND_SLIDE) {
        mySwiper.slideTo(Indexes.THIRD_SLIDE, 400, false);
      }

      changeActiveStep(Indexes.THIRD_SLIDE);
      btnNext.addClass('hide');
      btnGoToBasket.addClass('show');
    }

    btnNext.on("click", goToLastSlide); // Кнопка назад всегда переводит на 1 слайд

    function goToFirstSlide() {
      $(".js-calc input").each(function () {
        $(this).val("");
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

    btnPrev.on("click", goToFirstSlide); // Ссылка "я не знаю метраж" переводит на 2 слайд

    function goToSecondSlide() {
      runningMetersInput.val("");
      checkInputVal(runningMetersInput);
      mySwiper.slideTo(Indexes.SECOND_SLIDE, 400, false);
      changeActiveStep(Indexes.SECOND_SLIDE);
    }

    dontKnowLink.on("click", function (evt) {
      evt.preventDefault();
      goToSecondSlide();
    }); // Проверяем заполненность полей на 2 слайде

    function checkSecondSlide() {
      if (wallLenghtOne.val() !== "" && wallLenghtTwo.val() !== "" && wallHeightOne.val() !== "" && barLenght.val() !== "") {
        btnNext.removeAttr("disabled");
      } else {
        btnNext.attr("disabled", true);
      }
    }

    checkSecondSlide();
    wallLenghtOne.on("input", function () {
      checkSecondSlide();
    });
    wallLenghtOne.on("change", function () {
      getInputsMetersValue();
      getInputsMetersConsumption();
      calcGoods(resultSecondSlide);
    });
    wallLenghtTwo.on("input", function () {
      checkSecondSlide();
    });
    wallLenghtTwo.on("input", function () {
      getInputsMetersValue();
      getInputsMetersConsumption();
      calcGoods(resultSecondSlide);
    });
    wallHeightOne.on("input", function () {
      checkSecondSlide();
    });
    wallHeightOne.on("input", function () {
      getInputsMetersValue();
      getInputsMetersConsumption();
      calcGoods(resultSecondSlide);
    });
    barLenght.on("input", function () {
      checkSecondSlide();
    });
    barLenght.on("input", function () {
      getInputsMetersValue();
      getInputsMetersConsumption();
      calcGoods(resultSecondSlide);
    }); // Считает расход и пагонаж с первого слайда

    function getInputMetersConsumption() {
      var val = runningMetersInput.val();
      var consumption = val * 210;
      resultFirstSlide = (consumption / 1000).toFixed(2);
      consumptionSpan.text(resultFirstSlide);
    }

    getInputMetersConsumption();

    function getInputMetersValue() {
      var val = runningMetersInput.val();
      seamsSpan.text(val);
    }

    getInputMetersValue();
    var metersSecondSlideValue = 0; // Считает расход и пагонаж со второго слайда

    function getInputsMetersValue() {
      var lenghtOne = wallLenghtOne.val();
      var lenghtTwo = wallLenghtTwo.val();
      var wallHeight = wallHeightOne.val();
      var barHeight = barLenght.val();
      var firstValue = wallHeight / barHeight * lenghtOne;
      var secondValue = wallHeight / barHeight * lenghtTwo;
      metersSecondSlideValue = firstValue + secondValue;
      seamsSpan.text(metersSecondSlideValue);
    }

    getInputsMetersValue();

    function getInputsMetersConsumption() {
      var val = metersSecondSlideValue;
      var barHeight = barLenght.val() * 10;
      var consumption = val * barHeight;
      resultSecondSlide = (consumption / 1000).toFixed(2);
      consumptionSpan.text(resultSecondSlide);
    }
    getInputsMetersConsumption();
    var bank10AmountSpan = container.find(".js-bank10-amount");
    var bank5AmountSpan = container.find(".js-bank5-amount");
    var bank05AmountSpan = container.find(".js-bank05-amount");
    var bank031AmountSpan = container.find(".js-bank031-amount");
    var bank10WeightSpan = container.find(".js-bank10-weight");
    var bank5WeightSpan = container.find(".js-bank5-weight");
    var bank05WeightSpan = container.find(".js-bank05-weight");
    var bank031WeightSpan = container.find(".js-bank031-weight"); // Считает сколько нужно товаров на третьем слайде

    function calcGoods(val) {
      var amountBank10 = Math.ceil(val / 10);
      var amountBank5 = Math.ceil(val / 5);
      var amountBank05 = Math.ceil(val / 0.5);
      var amountBank031 = Math.ceil(val / 0.31);
      var weightBank10 = Math.ceil(amountBank10 * 10);
      var weightBank5 = Math.ceil(amountBank5 * 5);
      var weightBank05 = Math.ceil(amountBank05 * 0.5);
      var weightBank031 = Math.ceil(amountBank031 * 0.31);
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

  var ankors = function ankors() {
    var links = $(".js-ankor");

    if (!links) {
      return;
    }

    var partname = window.location.pathname; //Проверяем на document.ready наличие #hashtag в url, и если есть, скроллим до нужной секции

    var checkHash = function checkHash() {
      if (window.location.hash) {
        var hash = window.location.hash;

        if ($(hash).length) {
          $('html, body').animate({
            scrollTop: $(hash).offset().top - 60
          }, 900, 'swing');
        }
      }
    };

    $(document).ready(checkHash); // На кнопки вешаем обработчики событий

    links.each(function () {
      $(this).on("click", function (evt) {
        // Нужно, чтобы меню закрывалось и страница скроллилась до секции
        if ($(".menu").hasClass("is-show")) {
          $(".menu").removeClass("is-show");
          $('body').removeClass('is-menu-open').removeAttr('data-scroll');
          checkHash(); // Обычный скрипт скролла до необходимой секции в data атрибуте без перезагрузки страницы
        } else {
          evt.preventDefault();
          var hash = $(this).attr('data-href');

          if ($(hash).length) {
            $('html, body').animate({
              scrollTop: $(hash).offset().top - 130
            }, 900, 'swing');
          }
        }
      });
      $(this).on("focus", function (evt) {
        // Нужно, чтобы меню закрывалось и страница скроллилась до секции
        if ($(".menu").hasClass("is-show")) {
          $(".menu").removeClass("is-show");
          $(".js-open-menu").removeClass("is-show");
          $('body').removeClass('is-menu-open').removeAttr('data-scroll');
          checkHash(); // Обычный скрипт скролла до необходимой секции в data атрибуте без перезагрузки страницы
        } else {
          evt.preventDefault();
          var hash = $(this).attr('data-href');

          if ($(hash).length) {
            $('html, body').animate({
              scrollTop: $(hash).offset().top - 130
            }, 900, 'swing');
          }
        }
      });
    });
  };

  var App = /*#__PURE__*/function () {
    function App() {
      _classCallCheck(this, App);
    }

    _createClass(App, null, [{
      key: "init",
      value: function init() {
        nodeListForEach();
        tel();
        animation();
        menuOpen();
        headerScroll();
        modal();
        sliders();
        number();
        btnUp();
        accordion();
        goodQuantity();
        colorsSelect();
        footerForm();
        calcSlider();
        ankors();
      }
    }]);

    return App;
  }();

  App.init();
  window.App = App;

}());

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsic3JjL2pzL25vZGUtbGlzdC1mb3ItZWFjaC5qcyIsInNyYy9qcy90ZWwuanMiLCJzcmMvanMvYW5pbWF0aW9uLmpzIiwic3JjL2pzL21lbnUtb3Blbi5qcyIsInNyYy9qcy9tb2RhbC5qcyIsInNyYy9qcy9oZWFkZXIuanMiLCJzcmMvanMvc2xpZGVycy5qcyIsInNyYy9qcy9udW1iZXIuanMiLCJzcmMvanMvYnRuLXVwLmpzIiwic3JjL2pzL2FjY29yZGlvbi5qcyIsInNyYy9qcy9nb29kLXF1YW50aXR5LmpzIiwic3JjL2pzL2NvbG9ycy1zZWxlY3QuanMiLCJzcmMvanMvZm9vdGVyLWZvcm0uanMiLCJzcmMvanMvY2FsY3VsYXRvci5qcyIsInNyYy9qcy9hbmtvcnMuanMiLCJzcmMvanMvbWFpbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBub2RlTGlzdEZvckVhY2ggPSAoKSA9PiB7XG4gIGlmICgnTm9kZUxpc3QnIGluIHdpbmRvdyAmJiAhTm9kZUxpc3QucHJvdG90eXBlLmZvckVhY2gpIHtcbiAgICBOb2RlTGlzdC5wcm90b3R5cGUuZm9yRWFjaCA9IGZ1bmN0aW9uIChjYWxsYmFjaywgdGhpc0FyZykge1xuICAgIHRoaXNBcmcgPSB0aGlzQXJnIHx8IHdpbmRvdztcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcbiAgICBjYWxsYmFjay5jYWxsKHRoaXNBcmcsIHRoaXNbaV0sIGksIHRoaXMpO1xuICAgIH1cbiAgICB9O1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBub2RlTGlzdEZvckVhY2g7XG4iLCJjb25zdCB0ZWwgPSAoKSA9PiB7XG4gIC8vIE1hc2sgZm9yIHRlbFxuICBjb25zdCBmb3JtQmxvY2tzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5maWVsZHNldFwiKTtcblxuICBpZiAoZm9ybUJsb2Nrcy5sZW5ndGgpIHtcblxuICAgIGZvcm1CbG9ja3MuZm9yRWFjaChmdW5jdGlvbihmb3JtQmxvY2spIHtcbiAgICAgIGNvbnN0IGlucHV0ID0gZm9ybUJsb2NrLnF1ZXJ5U2VsZWN0b3IoXCJpbnB1dFtuYW1lPXRlbF1cIik7XG5cbiAgICAgIGlmKGlucHV0KSB7XG4gICAgICAgIGNvbnN0IHBob25lTWFzayA9IElNYXNrKCBpbnB1dCwge1xuICAgICAgICAgIG1hc2s6IFwiK3s3fSAwMDAgMDAwLTAwLTAwXCJcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICB9KTtcblxuICB9XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IHRlbDtcbiIsImNvbnN0IGFuaW1hdGlvbiA9ICgpID0+IHtcbiAgLy93b3dcbiAgY29uc3QgYW5pbWF0aW9ucyA9IG5ldyB3aW5kb3cuV09XKCkuaW5pdCgpO1xuXG4gIC8vYnRuc1xuICBjb25zdCBidG5zID0gJChcIi5qcy1yaXBwbGVcIik7XG5cbiAgaWYgKGJ0bnMpIHtcbiAgICBmdW5jdGlvbiBjaGVja1RvdWNoRGV2aWNlKCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ1RvdWNoRXZlbnQnKTtcblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IGlzVG91Y2hEZXZpY2UgPSBjaGVja1RvdWNoRGV2aWNlKCk7XG5cbiAgICBpZiAoIWlzVG91Y2hEZXZpY2UpIHtcblxuICAgICAgYnRucy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICBsZXQgJGJ1dHRvbiA9ICQodGhpcyk7XG4gICAgICAgIGxldCAkcmlwcGxlVGVtcGxhdGUgPSAkKCc8c3BhbiAvPicsIHtcbiAgICAgICAgICBjbGFzczogJ2J1dHRvbl9fcmlwcGxlJyxcbiAgICAgICAgfSk7XG4gICAgICAgICRidXR0b24uYXBwZW5kKCRyaXBwbGVUZW1wbGF0ZSk7XG5cbiAgICAgICAgbGV0ICRyaXBwbGUgPSAkYnV0dG9uLmZpbmQoJy5idXR0b25fX3JpcHBsZScpO1xuXG4gICAgICAgICRidXR0b24ub24oJ21vdXNlZW50ZXInLCAnKicsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICBsZXQgcGFyZW50T2Zmc2V0ID0gJGJ1dHRvbi5vZmZzZXQoKTtcbiAgICAgICAgICBsZXQgcmVsWCA9IGUucGFnZVggLSBwYXJlbnRPZmZzZXQubGVmdDtcbiAgICAgICAgICBsZXQgcmVsWSA9IGUucGFnZVkgLSBwYXJlbnRPZmZzZXQudG9wO1xuXG4gICAgICAgICAgJHJpcHBsZS5jc3Moe1xuICAgICAgICAgICAgdG9wOiByZWxZLFxuICAgICAgICAgICAgbGVmdDogcmVsWCxcbiAgICAgICAgICAgIHdpZHRoOiAnMjI1JScsXG4gICAgICAgICAgICBoZWlnaHQ6ICRidXR0b24ud2lkdGgoKSAqIDIuMjUsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRidXR0b24ub24oJ21vdXNlb3V0JywgJyonLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgbGV0IHBhcmVudE9mZnNldCA9ICRidXR0b24ub2Zmc2V0KCk7XG4gICAgICAgICAgbGV0IHJlbFggPSBlLnBhZ2VYIC0gcGFyZW50T2Zmc2V0LmxlZnQ7XG4gICAgICAgICAgbGV0IHJlbFkgPSBlLnBhZ2VZIC0gcGFyZW50T2Zmc2V0LnRvcDtcbiAgICAgICAgICAkcmlwcGxlLmNzcyh7XG4gICAgICAgICAgICB0b3A6IHJlbFksXG4gICAgICAgICAgICBsZWZ0OiByZWxYLFxuICAgICAgICAgICAgd2lkdGg6IDAsXG4gICAgICAgICAgICBoZWlnaHQ6IDAsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICB9XG4gIH1cblxuICBjb25zdCBwcm9tbyA9ICQoXCIucHJvbW9cIik7XG5cbiAgaWYgKHByb21vKSB7XG4gICAgY29uc3QgcHJvbW9JbWdMZyA9IHByb21vLmZpbmQoXCIucHJvbW9fX2dvb2QtLWxnXCIpO1xuICAgIGNvbnN0IHByb21vSW1nU20gPSBwcm9tby5maW5kKFwiLnByb21vX19nb29kLS1zbVwiKTtcblxuICAgICQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIHByb21vSW1nTGcuYWRkQ2xhc3MoXCJzaG93XCIpO1xuICAgICAgICBwcm9tb0ltZ1NtLmFkZENsYXNzKFwic2hvd1wiKTtcbiAgICAgIH0sIDMwMCk7XG4gICAgfSk7XG4gIH1cblxufTtcblxuZXhwb3J0IGRlZmF1bHQgYW5pbWF0aW9uO1xuIiwiY29uc3QgbWVudU9wZW4gPSAoKSA9PiB7XG4gIC8vINCe0YLQutGA0YvRgtC40LUg0LzQvtCxINC80LXQvdGOXG4gIGNvbnN0ICRidXR0b25zTWVudSA9ICQoXCIuanMtb3Blbi1tZW51XCIpO1xuXG4gIGlmICgkYnV0dG9uc01lbnUubGVuZ3RoKSB7XG4gICAgY29uc3QgJG1lbnUgPSAkKFwiLm1lbnVcIik7XG4gICAgY29uc3QgJGJ1dHRvbkNsb3NlID0gJChcIi5qcy1idG4tY2xvc2VcIik7XG4gICAgY29uc3QgJGhlYWRlciA9ICQoXCIuaGVhZGVyXCIpO1xuXG4gICAgJGJ1dHRvbnNNZW51LmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgY29uc3QgJGJ0biA9ICQodGhpcyk7XG5cbiAgICAgIGNvbnN0IHNjcm9sbEhlYWRlciA9ICgpID0+IHtcbiAgICAgICAgaWYgKCRtZW51Lmhhc0NsYXNzKFwiaXMtc2hvd1wiKSkge1xuXG4gICAgICAgICAgaWYoJG1lbnUuc2Nyb2xsVG9wKCkgPiAxKSB7XG4gICAgICAgICAgICAkaGVhZGVyLmFkZENsYXNzKFwic2Nyb2xsXCIpO1xuXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICRoZWFkZXIucmVtb3ZlQ2xhc3MoXCJzY3JvbGxcIik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICAkYnRuLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAvLyDQtdGB0LvQuCDQvtGC0LrRgNGL0YLQviDQvNC10L3RjlxuICAgICAgICBpZiAoJG1lbnUuaGFzQ2xhc3MoXCJpcy1zaG93XCIpKSB7XG5cbiAgICAgICAgICBjb25zdCBwb3MgPSBwYXJzZUludCgkKFwiYm9keVwiKS5hdHRyKFwiZGF0YS1zY3JvbGxcIiksIDEwKTtcbiAgICAgICAgICAkbWVudS5yZW1vdmVDbGFzcyhcImlzLXNob3dcIik7XG4gICAgICAgICAgJGJ0bi5yZW1vdmVDbGFzcyhcImlzLXNob3dcIik7XG4gICAgICAgICAgJGhlYWRlci5yZW1vdmVDbGFzcyhcInNjcm9sbFwiKTtcblxuICAgICAgICAgICQoXCJib2R5XCIpLnJlbW92ZUNsYXNzKFwiaXMtbWVudS1vcGVuXCIpLnJlbW92ZUF0dHIoXCJkYXRhLXNjcm9sbFwiKTtcbiAgICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgcG9zKTtcblxuICAgICAgICAgIC8vINC10YHQu9C4INC30LDQutGA0YvRgtC+INC80LXQvdGOXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAkbWVudS5hZGRDbGFzcyhcImlzLXNob3dcIik7XG5cbiAgICAgICAgICBpZigkbWVudS5zY3JvbGxUb3AoKSA+IDEpIHtcbiAgICAgICAgICAgICRoZWFkZXIuYWRkQ2xhc3MoXCJzY3JvbGxcIik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkYnRuLmFkZENsYXNzKFwiaXMtc2hvd1wiKTtcblxuICAgICAgICAgIH0sIDEwMCk7XG5cbiAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNvbnN0IHBhZ2VQb3MgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XG4gICAgICAgICAgICAkKFwiYm9keVwiKS5hZGRDbGFzcyhcImlzLW1lbnUtb3BlblwiKS5hdHRyKFwiZGF0YS1zY3JvbGxcIiwgcGFnZVBvcyk7XG4gICAgICAgICAgfSwgNDUwKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgICQoXCIubWVudVwiKS5vbihcInNjcm9sbFwiLCBzY3JvbGxIZWFkZXIpO1xuICAgIH0pO1xuXG4gICAgJGJ1dHRvbkNsb3NlLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnN0IHBvcyA9IHBhcnNlSW50KCQoXCJib2R5XCIpLmF0dHIoXCJkYXRhLXNjcm9sbFwiKSwgMTApO1xuICAgICAgJG1lbnUucmVtb3ZlQ2xhc3MoXCJpcy1zaG93XCIpO1xuICAgICAgJGJ1dHRvbnNNZW51LmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zdCAkYnRuID0gJCh0aGlzKTtcbiAgICAgICAgJGJ0bi5yZW1vdmVDbGFzcyhcImlzLXNob3dcIik7XG4gICAgICB9KTtcblxuICAgICAgJChcImJvZHlcIikucmVtb3ZlQ2xhc3MoXCJpcy1tZW51LW9wZW5cIikucmVtb3ZlQXR0cihcImRhdGEtc2Nyb2xsXCIpO1xuICAgICAgd2luZG93LnNjcm9sbFRvKDAsIHBvcyk7XG4gICAgfSk7XG5cbiAgfVxuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBtZW51T3BlbjtcbiIsImNvbnN0IG1vZGFsID0gKCkgPT4ge1xuICBjb25zdCAkYnV0dG9ucyA9ICQoJ1tqcy1wb3B1cC1vcGVuXScpO1xuXG4gIGlmICgkYnV0dG9ucy5sZW5ndGgpIHtcbiAgICBjb25zdCAkYm9keSA9ICQoJ2JvZHknKTtcblxuICAgICRidXR0b25zLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICBjb25zdCAkYnV0dG9uID0gJCh0aGlzKTtcbiAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgIGhpZGVTY3JvbGxiYXI6IHRydWUsXG4gICAgICAgIHRvdWNoOiBmYWxzZSxcbiAgICAgICAgYnRuVHBsIDoge1xuICAgICAgICAgIHNtYWxsQnRuIDogJydcbiAgICAgICAgfSxcbiAgICAgICAgYmVmb3JlU2hvdzogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgLy8gIEFkZCBhbm90aGVyIGJnIGNvbG9yXG4gICAgICAgICAgJCgnLmZhbmN5Ym94LWJnJykuYWRkQ2xhc3MoJGJ1dHRvbi5kYXRhKCdzcmMnKS5zbGljZSgxKSk7XG5cbiAgICAgICAgICBjb25zdCBib2R5U3R5bGVzID0ge1xuICAgICAgICAgICAgJ292ZXJmbG93LXknOiAnaGlkZGVuJyxcbiAgICAgICAgICAgICdtYXJnaW4nOiAnMCBhdXRvJ1xuICAgICAgICAgIH07XG4gICAgICAgICAgJGJvZHkuY3NzKGJvZHlTdHlsZXMpO1xuXG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAkKCRidXR0b24uZGF0YSgnc3JjJykpLmFkZENsYXNzKFwic2hvd1wiKTtcbiAgICAgICAgICB9LCAxMDApO1xuICAgICAgICB9LFxuICAgICAgICBhZnRlckNsb3NlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAvLyAgQWRkIGFub3RoZXIgYmcgY29sb3JcbiAgICAgICAgICAkKCcuZmFuY3lib3gtYmcnKS5yZW1vdmVDbGFzcygkYnV0dG9uLmRhdGEoJ3NyYycpLnNsaWNlKDEpKTtcblxuICAgICAgICAgIGNvbnN0IGJvZHlTdHlsZXMgPSB7XG4gICAgICAgICAgICAnb3ZlcmZsb3cteSc6ICd2aXNpYmxlJyxcbiAgICAgICAgICAgICdwYWRkaW5nLXJpZ2h0JzogMCxcbiAgICAgICAgICAgICdtYXJnaW4nOiAwXG4gICAgICAgICAgfTtcbiAgICAgICAgICAkYm9keS5jc3MoYm9keVN0eWxlcyk7XG5cbiAgICAgICAgICAkKCRidXR0b24uZGF0YSgnc3JjJykpLnJlbW92ZUNsYXNzKFwic2hvd1wiKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgJGJ1dHRvbi5mYW5jeWJveChvcHRpb25zKTtcbiAgICB9KTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgbW9kYWw7XG4iLCJjb25zdCBoZWFkZXJTY3JvbGwgPSAoKSA9PiB7XG4gIGNvbnN0IG1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwibWFpblwiKTtcblxuICBjb25zdCAkaGVhZGVyID0gJChcIi5oZWFkZXJcIik7XG5cbiAgaWYgKCRoZWFkZXIpIHtcblxuICAgIC8vIEhlYWRlciDQvNC10L3Rj9C10YIg0YbQstC10YLQsCDQv9GA0Lgg0YHQutGA0L7Qu9C70LUuINCe0L0g0YPQttC1IGZpeGVkINC40LfQvdCw0YfQsNC70YzQvdC+XG4gICAgY29uc3Qgc2Nyb2xsSGVhZGVyID0gKCkgPT4ge1xuICAgICAgY29uc3QgaW50cm9Ub3AgPSBtYWluLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcDtcblxuICAgICAgaWYgKGludHJvVG9wIDwgLTEpIHtcbiAgICAgICAgJGhlYWRlci5hZGRDbGFzcyhcInNjcm9sbFwiKTtcblxuICAgICAgfSBlbHNlIGlmICgkaGVhZGVyLmhhc0NsYXNzKFwic2Nyb2xsXCIpICYmIGludHJvVG9wID4gLTEpIHtcbiAgICAgICAgJGhlYWRlci5yZW1vdmVDbGFzcyhcInNjcm9sbFwiKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgJCh3aW5kb3cpLm9uKFwic2Nyb2xsXCIsIHNjcm9sbEhlYWRlcik7XG4gICAgJChkb2N1bWVudCkub24oXCJyZWFkeVwiLCBzY3JvbGxIZWFkZXIpO1xuXG5cbiAgICAvL9CU0L7QsdCw0LLQu9GP0LXRgiDQvtGC0YHRgtGD0L8g0L3QsCDRgdGC0YDQsNC90LjRhtCw0YUg0LTQu9GPINGE0LjQutGB0LjRgNC+0LLQsNC90L3QvtCz0L4g0YXQtdC00LXRgNCwXG4gICAgZnVuY3Rpb24gY2hlY2tIZWFkZXJIZWlnaHQoKSB7XG4gICAgICBjb25zdCB2YWx1ZSA9ICRoZWFkZXIub3V0ZXJIZWlnaHQoKTtcbiAgICAgIGNvbnN0IG1haW4gPSAkKFwibWFpblwiKTtcblxuICAgICAgbWFpbi5jc3MoXCJwYWRkaW5nLXRvcFwiLCB2YWx1ZSk7XG4gICAgfVxuICAgIC8vIGNoZWNrSGVhZGVySGVpZ2h0KCk7XG5cbiAgICAkKHdpbmRvdykub24oXCJyZXNpemVcIiwgY2hlY2tIZWFkZXJIZWlnaHQpO1xuICB9XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGhlYWRlclNjcm9sbDtcbiIsImNvbnN0IHNsaWRlcnMgPSAoKSA9PiB7XG4gIGNvbnN0IFN3aXBlciA9IHdpbmRvdy5Td2lwZXI7XG5cbiAgLy8gQWR2IHNsaWRlclxuICBjb25zdCBhZHZhbnRhZ2VzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5qcy1hZHZhbnRhZ2VzLXNsaWRlclwiKTtcblxuICBpZiAoYWR2YW50YWdlcykge1xuICAgIGNvbnN0IG15U3dpcGVyID0gbmV3IFN3aXBlcihcIi5qcy1hZHZhbnRhZ2VzLXNsaWRlci5zd2lwZXItY29udGFpbmVyXCIsIHtcbiAgICAgIGRpcmVjdGlvbjogXCJob3Jpem9udGFsXCIsXG4gICAgICBzbGlkZXNQZXJWaWV3OiAxLFxuICAgICAgc3BhY2VCZXR3ZWVuOiAyMCxcbiAgICAgIHNwZWVkOiA0MDAsXG4gICAgICBuYXZpZ2F0aW9uOiB7XG4gICAgICAgIG5leHRFbDogXCIuanMtYWR2YW50YWdlcy1zbGlkZXIgLnN3aXBlci1idXR0b24tbmV4dFwiLFxuICAgICAgICBwcmV2RWw6IFwiLmpzLWFkdmFudGFnZXMtc2xpZGVyIC5zd2lwZXItYnV0dG9uLXByZXZcIixcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cblxuICAvLyBQaG90b3Mgc2xpZGVyXG4gIGNvbnN0IHBob3RvcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuanMtcGhvdG9zLXNsaWRlclwiKTtcblxuICBpZiAocGhvdG9zKSB7XG4gICAgY29uc3QgbXlTd2lwZXIgPSBuZXcgU3dpcGVyKFwiLmpzLXBob3Rvcy1zbGlkZXIuc3dpcGVyLWNvbnRhaW5lclwiLCB7XG4gICAgICBkaXJlY3Rpb246IFwiaG9yaXpvbnRhbFwiLFxuICAgICAgc2xpZGVzUGVyVmlldzogMSxcbiAgICAgIHNwYWNlQmV0d2VlbjogMjAsXG4gICAgICBzcGVlZDogNDAwLFxuICAgICAgbG9vcDogdHJ1ZSxcbiAgICAgIGNlbnRlcmVkU2xpZGVzOiBmYWxzZSxcbiAgICAgIGJyZWFrcG9pbnRzOiB7XG4gICAgICAgIDc2Nzoge1xuICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDIsXG4gICAgICAgICAgc3BhY2VCZXR3ZWVuOiAyMCxcbiAgICAgICAgICBjZW50ZXJlZFNsaWRlczogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICBuYXZpZ2F0aW9uOiB7XG4gICAgICAgIG5leHRFbDogXCIuanMtcGhvdG9zLXNsaWRlciAuc3dpcGVyLWJ1dHRvbi1uZXh0XCIsXG4gICAgICAgIHByZXZFbDogXCIuanMtcGhvdG9zLXNsaWRlciAuc3dpcGVyLWJ1dHRvbi1wcmV2XCIsXG4gICAgICB9LFxuICAgICAgcGFnaW5hdGlvbjoge1xuICAgICAgICBlbDogJy5qcy1waG90b3Mtc2xpZGVyIC5zd2lwZXItcGFnaW5hdGlvbicsXG4gICAgICAgIGNsaWNrYWJsZTogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cblxuXG4gIC8vIFJldmlld3Mgc2xpZGVyXG4gIGNvbnN0IHJldmlld3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmpzLXJldmlld3Mtc2xpZGVyXCIpO1xuXG4gIGlmIChyZXZpZXdzKSB7XG4gICAgY29uc3QgbXlTd2lwZXIgPSBuZXcgU3dpcGVyKFwiLmpzLXJldmlld3Mtc2xpZGVyLnN3aXBlci1jb250YWluZXJcIiwge1xuICAgICAgZGlyZWN0aW9uOiBcImhvcml6b250YWxcIixcbiAgICAgIHNsaWRlc1BlclZpZXc6IDEsXG4gICAgICBzcGFjZUJldHdlZW46IDIwLFxuICAgICAgc3BlZWQ6IDQwMCxcbiAgICAgIGxvb3A6IHRydWUsXG4gICAgICBjZW50ZXJlZFNsaWRlczogdHJ1ZSxcbiAgICAgIGJyZWFrcG9pbnRzOiB7XG4gICAgICAgIDY4MDoge1xuICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDIsXG4gICAgICAgICAgc3BhY2VCZXR3ZWVuOiAxNSxcbiAgICAgICAgICBjZW50ZXJlZFNsaWRlczogZmFsc2UsXG4gICAgICAgIH0sXG4gICAgICAgIDc2Nzoge1xuICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDMsXG4gICAgICAgICAgc3BhY2VCZXR3ZWVuOiAxNSxcbiAgICAgICAgICBjZW50ZXJlZFNsaWRlczogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgICAgOTkxOiB7XG4gICAgICAgICAgc2xpZGVzUGVyVmlldzogMyxcbiAgICAgICAgICBzcGFjZUJldHdlZW46IDEyMCxcbiAgICAgICAgICBjZW50ZXJlZFNsaWRlczogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICBuYXZpZ2F0aW9uOiB7XG4gICAgICAgIG5leHRFbDogXCIuanMtcmV2aWV3cy1zbGlkZXIgLnN3aXBlci1idXR0b24tbmV4dFwiLFxuICAgICAgICBwcmV2RWw6IFwiLmpzLXJldmlld3Mtc2xpZGVyIC5zd2lwZXItYnV0dG9uLXByZXZcIixcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cblxuICAvLyBTZXJ0aWZpY2F0ZXMgc2xpZGVyXG4gIGNvbnN0IHNlcnRpZmljYXRlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuanMtc2VydGlmaWNhdGVzLXNsaWRlclwiKTtcblxuICBpZiAoc2VydGlmaWNhdGVzKSB7XG4gICAgY29uc3QgbXlTd2lwZXIgPSBuZXcgU3dpcGVyKFwiLmpzLXNlcnRpZmljYXRlcy1zbGlkZXIuc3dpcGVyLWNvbnRhaW5lclwiLCB7XG4gICAgICBkaXJlY3Rpb246IFwiaG9yaXpvbnRhbFwiLFxuICAgICAgc2xpZGVzUGVyVmlldzogMSxcbiAgICAgIHNwYWNlQmV0d2VlbjogMjAsXG4gICAgICBzcGVlZDogNDAwLFxuICAgICAgbG9vcDogdHJ1ZSxcbiAgICAgIGNlbnRlcmVkU2xpZGVzOiB0cnVlLFxuICAgICAgYnJlYWtwb2ludHM6IHtcbiAgICAgICAgNTAwOiB7XG4gICAgICAgICAgc2xpZGVzUGVyVmlldzogMixcbiAgICAgICAgICBzcGFjZUJldHdlZW46IDE1LFxuICAgICAgICAgIGNlbnRlcmVkU2xpZGVzOiBmYWxzZSxcbiAgICAgICAgfSxcbiAgICAgICAgNjgwOiB7XG4gICAgICAgICAgc2xpZGVzUGVyVmlldzogMyxcbiAgICAgICAgICBzcGFjZUJldHdlZW46IDE1LFxuICAgICAgICB9LFxuICAgICAgICA5OTE6IHtcbiAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAzLFxuICAgICAgICAgIHNwYWNlQmV0d2VlbjogMTIwLFxuICAgICAgICAgIGNlbnRlcmVkU2xpZGVzOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIG5hdmlnYXRpb246IHtcbiAgICAgICAgbmV4dEVsOiBcIi5qcy1zZXJ0aWZpY2F0ZXMtc2xpZGVyIC5zd2lwZXItYnV0dG9uLW5leHRcIixcbiAgICAgICAgcHJldkVsOiBcIi5qcy1zZXJ0aWZpY2F0ZXMtc2xpZGVyIC5zd2lwZXItYnV0dG9uLXByZXZcIixcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IHNsaWRlcnM7XG4iLCJjb25zdCBudW1iZXIgPSAoKSA9PiB7XG4gIC8v0KDQsNC30YDQtdGI0LDQtdGCINCy0LLQvtC0INGC0L7Qu9GM0LrQviDRhtC40YTRgCDQsiBpbnB1dFxuICBjb25zdCAkbnVtYmVycyA9ICQoXCIuanMtbnVtYmVyXCIpO1xuICBpZiAoISRudW1iZXJzKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgJG51bWJlcnMuZWFjaChmdW5jdGlvbigpIHtcbiAgICBjb25zdCAkdGhpc3MgPSAkKHRoaXMpO1xuXG4gICAgJHRoaXNzLm1hc2soJzAjJyk7XG4gIH0pO1xuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBudW1iZXI7XG4iLCJjb25zdCBidG5VcCA9ICgpID0+IHtcblxuICAkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKCkge1xuICAgIGlmICgkKHRoaXMpLnNjcm9sbFRvcCgpID4gMjAwKSB7XG4gICAgICAgIGlmICgkKCcjdXBidXR0b24nKS5pcygnOmhpZGRlbicpKSB7XG4gICAgICAgICAgICAkKCcjdXBidXR0b24nKS5jc3Moe29wYWNpdHkgOiAwLjl9KS5mYWRlSW4oJ2Zhc3QnKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7ICQoJyN1cGJ1dHRvbicpLnN0b3AodHJ1ZSwgZmFsc2UpLmZhZGVPdXQoJ2Zhc3QnKTsgfVxuICB9KTtcblxuICAkKCcjdXBidXR0b24nKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICQoJ2h0bWwsIGJvZHknKS5zdG9wKCkuYW5pbWF0ZSh7c2Nyb2xsVG9wIDogMH0sIDMwMCk7XG4gIH0pO1xuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBidG5VcDtcbiIsImNvbnN0IGFjY29yZGlvbiA9ICgpID0+IHtcbiAgY29uc3QgJGFjY29yZGlvbnMgPSAkKGAuYWNjb3JkaW9uX19pdGVtYCk7XG4gIGlmICghJGFjY29yZGlvbnMpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICAkYWNjb3JkaW9ucy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgIGNvbnN0ICR0aGlzcyA9ICQodGhpcyk7XG4gICAgY29uc3QgJHNpZGUgPSAkdGhpc3MuZmluZChgLmFjY29yZGlvbl9fbGFiZWxgKTtcbiAgICBjb25zdCAkbWFpbiA9ICR0aGlzcy5maW5kKGAuYWNjb3JkaW9uX19jb250ZW50YCk7XG5cbiAgICAkc2lkZS5vbihgY2xpY2tgLCAoZXZ0KSA9PiB7XG4gICAgICBldnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgaWYgKCRzaWRlLmhhc0NsYXNzKGBpcy1vcGVuYCkpIHtcbiAgICAgICAgJG1haW4uc2xpZGVVcChcInNsb3dcIik7XG4gICAgICAgICRzaWRlLnJlbW92ZUNsYXNzKGBpcy1vcGVuYCk7XG4gICAgICAgICRzaWRlLmJsdXIoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICRzaWRlLmFkZENsYXNzKGBpcy1vcGVuYCk7XG4gICAgICAgICRtYWluLnNsaWRlRG93bihcInNsb3dcIik7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBhY2NvcmRpb247XG4iLCJjb25zdCBnb29kUXVhbnRpdHkgPSAoKSA9PiB7XG4gIC8vINCj0LLQtdC70LjRh9C10L3QuNC1INC4INGD0LzQtdC90YzRiNC10L3QuNC1INGC0L7QstCw0YDQvtCyXG4gIGNvbnN0IGNvbnRhaW5lcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmpzLXF1YW50aXR5XCIpO1xuICBpZiAoY29udGFpbmVycy5sZW5ndGggPCAwKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29udGFpbmVycy5mb3JFYWNoKChjb250YWluZXIpID0+IHtcbiAgICBjb25zdCBpbnB1dCA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiaW5wdXRcIik7XG4gICAgY29uc3QgYnRuSW5jcmVhc2UgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcihcIi5qcy1pbmNyZWFzZVwiKTtcbiAgICBjb25zdCBidG5EZWNyZWFzZSA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiLmpzLWRlY3JlYXNlXCIpO1xuXG4gICAgbGV0IHZhbHVlO1xuXG4gICAgY29uc3QgYnRuSW5jcmVhc2VIYW5kbGVyID0gKCkgPT4ge1xuICAgICAgdmFsdWUgPSBpbnB1dC52YWx1ZTtcbiAgICAgIGxldCBuZXdWYWx1ZSA9ICsrdmFsdWU7XG5cbiAgICAgIGlmIChuZXdWYWx1ZSA+IDEpIHtcbiAgICAgICAgYnRuRGVjcmVhc2UucmVtb3ZlQXR0cmlidXRlKFwiZGlzYWJsZWRcIik7XG4gICAgICB9XG5cbiAgICAgIGlucHV0LnZhbHVlID0gbmV3VmFsdWU7XG4gICAgfTtcblxuICAgIGNvbnN0IGJ0bkRlY3JlYXNlSGFuZGxlciA9ICgpID0+IHtcbiAgICAgIHZhbHVlID0gaW5wdXQudmFsdWU7XG4gICAgICBsZXQgbmV3VmFsdWUgPSAtLXZhbHVlO1xuXG4gICAgICBpZiAobmV3VmFsdWUgPD0gMSkge1xuICAgICAgICBuZXdWYWx1ZSA9IDE7XG4gICAgICAgIGlucHV0LnZhbHVlID0gMTtcbiAgICAgICAgYnRuRGVjcmVhc2Uuc2V0QXR0cmlidXRlKFwiZGlzYWJsZWRcIiwgXCJkaXNhYmxlZFwiKTtcbiAgICAgIH1cblxuICAgICAgaW5wdXQudmFsdWUgPSBuZXdWYWx1ZTtcbiAgICB9O1xuXG4gICAgYnRuSW5jcmVhc2UuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGJ0bkluY3JlYXNlSGFuZGxlcik7XG4gICAgYnRuRGVjcmVhc2UuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGJ0bkRlY3JlYXNlSGFuZGxlcik7XG4gICAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBidG5JbmNyZWFzZUhhbmRsZXIoKTtcbiAgICAgIGJ0bkRlY3JlYXNlSGFuZGxlcigpO1xuICAgIH0pXG4gIH0pO1xuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBnb29kUXVhbnRpdHk7XG4iLCJjb25zdCBjb2xvcnNTZWxlY3QgPSAoKSA9PiB7XG4gIGNvbnN0IGNvbG9yc0Jsb2NrID0gJChcIi5jb2xvcnMtYmxvY2tcIik7XG4gIGlmICghY29sb3JzQmxvY2spIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBsaW5rcyA9IGNvbG9yc0Jsb2NrLmZpbmQoXCIuY29sb3JzLWJsb2NrX19pdGVtXCIpO1xuICBjb25zdCBwaWN0dXJlQmxvY2sgPSBjb2xvcnNCbG9jay5maW5kKFwiLmNvbG9ycy1ibG9ja19faW5mbyBpbWdcIik7XG4gIGNvbnN0IHRleHRCbG9jayA9IGNvbG9yc0Jsb2NrLmZpbmQoXCIuY29sb3JzLWJsb2NrX19pbmZvIHBcIik7XG5cbiAgbGlua3MuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgbGluayA9ICQodGhpcyk7XG5cbiAgICBsaW5rLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oZXZ0KSB7XG4gICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGxpbmtzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IHBpY3R1cmUgPSBsaW5rLmF0dHIoXCJkYXRhLWltZ1wiKTtcbiAgICAgIGNvbnN0IG5hbWUgPSBsaW5rLmZpbmQoXCJwXCIpLnRleHQoKTtcbiAgICAgIHBpY3R1cmVCbG9jay5hdHRyKFwic3JjXCIsIHBpY3R1cmUpO1xuICAgICAgdGV4dEJsb2NrLnRleHQobmFtZSk7XG5cbiAgICAgIGxpbmsuYWRkQ2xhc3MoXCJhY3RpdmVcIik7XG4gICAgfSlcbiAgfSk7XG5cblxufTtcblxuZXhwb3J0IGRlZmF1bHQgY29sb3JzU2VsZWN0O1xuIiwiY29uc3QgZm9vdGVyRm9ybSA9ICgpID0+IHtcbiAgY29uc3QgJGZvb3RlckZvcm0gPSAkKFwiLmZvb3RlciBmb3JtXCIpO1xuICBpZiAoISRmb290ZXJGb3JtKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgaW5wdXRzID0gJGZvb3RlckZvcm0uZmluZChcImlucHV0XCIpO1xuXG4gIGlucHV0cy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgIGNvbnN0IGlucHV0ID0gJCh0aGlzKTtcblxuICAgIGlucHV0Lm9uKFwiY2hhbmdlXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKGlucHV0LnZhbCgpICE9PSBgYCkge1xuICAgICAgICBpbnB1dC5hZGRDbGFzcyhcImhhcy12YWx1ZVwiKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlucHV0LnJlbW92ZUNsYXNzKFwiaGFzLXZhbHVlXCIpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcblxufTtcblxuZXhwb3J0IGRlZmF1bHQgZm9vdGVyRm9ybTtcbiIsImNvbnN0IGNhbGNTbGlkZXIgPSBmdW5jdGlvbiBjYWxjU2xpZGVyKCkge1xuICBjb25zdCBTd2lwZXIgPSB3aW5kb3cuU3dpcGVyO1xuICBjb25zdCBjb250YWluZXIgPSAkKFwiLmpzLWNhbGNcIik7XG5cbiAgaWYgKCFjb250YWluZXIpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBteVN3aXBlciA9IG5ldyBTd2lwZXIoXCIuanMtY2FsYyAuc3dpcGVyLWNvbnRhaW5lclwiLCB7XG4gICAgZGlyZWN0aW9uOiBcImhvcml6b250YWxcIixcbiAgICBzbGlkZXNQZXJWaWV3OiAxLFxuICAgIHNwYWNlQmV0d2VlbjogMCxcbiAgICBhbGxvd1RvdWNoTW92ZTogZmFsc2UsXG4gICAgc3BlZWQ6IDM1NSxcbiAgICBuYXZpZ2F0aW9uOiB7XG4gICAgICBuZXh0RWw6ICcuY2FsY19fYnRuLS1uZXh0JyxcbiAgICAgIHByZXZFbDogJy5jYWxjX19idG4tLXByZXYnXG4gICAgfSxcbiAgICBmYWRlRWZmZWN0OiB7XG4gICAgICBjcm9zc0ZhZGU6IHRydWUsXG4gICAgfSxcbiAgICBlZmZlY3Q6IFwiZmFkZVwiLFxuICB9KTtcblxuICBjb25zdCBidG5zID0gY29udGFpbmVyLmZpbmQoXCIuY2FsY19fYnRuXCIpO1xuICBjb25zdCBzdGVwc0xpbmtzID0gY29udGFpbmVyLmZpbmQoXCIuY2FsY19fc2lkZSBhXCIpO1xuXG4gIGNvbnN0IEluZGV4ZXMgPSB7XG4gICAgRklSU1RfU0xJREU6IGAwYCxcbiAgICBTRUNPTkRfU0xJREU6IGAxYCxcbiAgICBUSElSRF9TTElERTogYDJgXG4gIH1cblxuICAvLyDQn9C10YDQtdC60LvRjtGH0LDQtdGCINGI0LDQs9C4LCDQtdGB0LvQuCDQvdCw0LbQuNC80LDRjtGCINC60L3QvtC/0LrQuCDQvdCw0LLQuNCz0LDRhtC40LhcbiAgZnVuY3Rpb24gY2hhbmdlQWN0aXZlU3RlcChpbmRleCkge1xuICAgIHN0ZXBzTGlua3MuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgIGNvbnN0IGxpbmsgPSAkKHRoaXMpO1xuICAgICAgbGluay5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcbiAgICB9KTtcblxuICAgIGNvbnN0IGFjdGl2ZVN0ZXAgPSAkKHN0ZXBzTGlua3NbaW5kZXhdKTtcbiAgICBhY3RpdmVTdGVwLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xuICB9XG5cbiAgLy8g0J/RgNC+0LLQtdGA0Y/QtdGCIHZhbHVlINC40L3Qv9GD0YLQsCDQv9C+0LPQvtC90L3Ri9GFINC80LXRgtGA0L7QsiDQuCDQtNC10LvQsNC10YIg0LrQvdC+0L/QutGDIGRpc2FibGVkXG4gIGNvbnN0IHJ1bm5pbmdNZXRlcnNJbnB1dCA9IGNvbnRhaW5lci5maW5kKFwiLmpzLXJ1bm5pbmctbWV0ZXJzXCIpO1xuICBjb25zdCBidG5OZXh0ID0gY29udGFpbmVyLmZpbmQoXCIuanMtYnRuLW5leHRcIik7XG4gIGNvbnN0IGJ0blByZXYgPSBjb250YWluZXIuZmluZChcIi5qcy1idG4tcHJldlwiKTtcbiAgY29uc3QgZG9udEtub3dMaW5rID0gY29udGFpbmVyLmZpbmQoXCIuanMtZG9udC1rbm93XCIpO1xuICBjb25zdCBidG5Hb1RvQmFza2V0ID0gY29udGFpbmVyLmZpbmQoXCIuanMtZ28tdG8tYmFza2V0XCIpO1xuICBjb25zdCB3YWxsTGVuZ2h0T25lID0gY29udGFpbmVyLmZpbmQoXCIuanMtbGVuZ3RoLXdhbGwtMVwiKTtcbiAgY29uc3Qgd2FsbExlbmdodFR3byA9IGNvbnRhaW5lci5maW5kKFwiLmpzLWxlbmd0aC13YWxsLTJcIik7XG4gIGNvbnN0IHdhbGxIZWlnaHRPbmUgPSBjb250YWluZXIuZmluZChcIi5qcy1oZWlnaHQtd2FsbC0xXCIpO1xuICBjb25zdCBiYXJMZW5naHQgPSBjb250YWluZXIuZmluZChcIi5qcy1oZWlnaHQtYmFyXCIpO1xuICBjb25zdCBzZWFtc1NwYW4gPSBjb250YWluZXIuZmluZChcIi5qcy1zZWFtcy1zcGFuXCIpO1xuICBjb25zdCBjb25zdW1wdGlvblNwYW4gPSBjb250YWluZXIuZmluZChcIi5qcy1jb25zdW1wdGlvbi1zcGFuXCIpO1xuICBsZXQgcmVzdWx0Rmlyc3RTbGlkZSA9IDA7XG4gIGxldCByZXN1bHRTZWNvbmRTbGlkZSA9IDA7XG5cbiAgZnVuY3Rpb24gY2hlY2tJbnB1dFZhbChpbnB1dCkge1xuICAgIGlmIChpbnB1dC52YWwoKSAhPT0gYGApIHtcbiAgICAgIGJ0bk5leHQucmVtb3ZlQXR0cihcImRpc2FibGVkXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBidG5OZXh0LmF0dHIoXCJkaXNhYmxlZFwiLCB0cnVlKTtcbiAgICB9XG4gIH1cblxuICBjaGVja0lucHV0VmFsKHJ1bm5pbmdNZXRlcnNJbnB1dCk7XG4gIHJ1bm5pbmdNZXRlcnNJbnB1dC5vbihcImlucHV0XCIsIGZ1bmN0aW9uKCkge1xuICAgIGNoZWNrSW5wdXRWYWwocnVubmluZ01ldGVyc0lucHV0KTtcbiAgfSk7XG4gIHJ1bm5pbmdNZXRlcnNJbnB1dC5vbihcImNoYW5nZVwiLCBmdW5jdGlvbigpIHtcbiAgICBnZXRJbnB1dE1ldGVyc1ZhbHVlKCk7XG4gICAgZ2V0SW5wdXRNZXRlcnNDb25zdW1wdGlvbigpO1xuICAgIGNhbGNHb29kcyhyZXN1bHRGaXJzdFNsaWRlKTtcbiAgfSk7XG5cbiAgLy8g0JrQvdC+0L/QutCwINC00LDQu9C10LUg0L/QtdGA0LXQstC+0LTQuNGCINGBINC/0LXRgNCy0L7Qs9C+INC40LvQuCDQstGC0L7RgNC+0LPQviDRgdC70LDQudC00LAg0L3QsCDQv9C+0YHQu9C10LTQvdC40LlcbiAgZnVuY3Rpb24gZ29Ub0xhc3RTbGlkZSgpIHtcbiAgICBjb25zdCBzbGlkZSA9IGNvbnRhaW5lci5maW5kKFwiLnN3aXBlci1zbGlkZS1hY3RpdmVcIik7XG5cbiAgICBpZiAoc2xpZGUuYXR0cihcImluZGV4XCIpID09PSBJbmRleGVzLkZJUlNUX1NMSURFIHx8IHNsaWRlLmF0dHIoXCJpbmRleFwiKSA9PT0gSW5kZXhlcy5TRUNPTkRfU0xJREUpIHtcbiAgICAgIG15U3dpcGVyLnNsaWRlVG8oSW5kZXhlcy5USElSRF9TTElERSwgNDAwLCBmYWxzZSk7XG4gICAgfVxuXG4gICAgY2hhbmdlQWN0aXZlU3RlcChJbmRleGVzLlRISVJEX1NMSURFKTtcbiAgICBidG5OZXh0LmFkZENsYXNzKCdoaWRlJyk7XG4gICAgYnRuR29Ub0Jhc2tldC5hZGRDbGFzcygnc2hvdycpO1xuICB9XG4gIGJ0bk5leHQub24oXCJjbGlja1wiLCBnb1RvTGFzdFNsaWRlKTtcblxuICAvLyDQmtC90L7Qv9C60LAg0L3QsNC30LDQtCDQstGB0LXQs9C00LAg0L/QtdGA0LXQstC+0LTQuNGCINC90LAgMSDRgdC70LDQudC0XG4gIGZ1bmN0aW9uIGdvVG9GaXJzdFNsaWRlKCkge1xuICAgICQoXCIuanMtY2FsYyBpbnB1dFwiKS5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgJCh0aGlzKS52YWwoYGApO1xuICAgIH0pO1xuICAgIGNoZWNrU2Vjb25kU2xpZGUoKTtcbiAgICBjaGVja0lucHV0VmFsKHJ1bm5pbmdNZXRlcnNJbnB1dCk7XG5cbiAgICBteVN3aXBlci5zbGlkZVRvKEluZGV4ZXMuRklSU1RfU0xJREUsIDQwMCwgZmFsc2UpO1xuICAgIGNoYW5nZUFjdGl2ZVN0ZXAoSW5kZXhlcy5GSVJTVF9TTElERSk7XG5cbiAgICBpZiAoYnRuTmV4dC5oYXNDbGFzcygnaGlkZScpKSB7XG4gICAgICBidG5OZXh0LnJlbW92ZUNsYXNzKCdoaWRlJyk7XG4gICAgICBidG5Hb1RvQmFza2V0LnJlbW92ZUNsYXNzKCdzaG93Jyk7XG4gICAgfVxuICB9XG4gIGJ0blByZXYub24oXCJjbGlja1wiLCBnb1RvRmlyc3RTbGlkZSk7XG5cbiAgLy8g0KHRgdGL0LvQutCwIFwi0Y8g0L3QtSDQt9C90LDRjiDQvNC10YLRgNCw0LZcIiDQv9C10YDQtdCy0L7QtNC40YIg0L3QsCAyINGB0LvQsNC50LRcbiAgZnVuY3Rpb24gZ29Ub1NlY29uZFNsaWRlKCkge1xuICAgIHJ1bm5pbmdNZXRlcnNJbnB1dC52YWwoYGApO1xuICAgIGNoZWNrSW5wdXRWYWwocnVubmluZ01ldGVyc0lucHV0KTtcbiAgICBteVN3aXBlci5zbGlkZVRvKEluZGV4ZXMuU0VDT05EX1NMSURFLCA0MDAsIGZhbHNlKTtcbiAgICBjaGFuZ2VBY3RpdmVTdGVwKEluZGV4ZXMuU0VDT05EX1NMSURFKTtcbiAgfVxuICBkb250S25vd0xpbmsub24oXCJjbGlja1wiLCBmdW5jdGlvbihldnQpIHtcbiAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICBnb1RvU2Vjb25kU2xpZGUoKTtcbiAgfSk7XG5cbiAgLy8g0J/RgNC+0LLQtdGA0Y/QtdC8INC30LDQv9C+0LvQvdC10L3QvdC+0YHRgtGMINC/0L7Qu9C10Lkg0L3QsCAyINGB0LvQsNC50LTQtVxuICBmdW5jdGlvbiBjaGVja1NlY29uZFNsaWRlKCkge1xuICAgIGlmICh3YWxsTGVuZ2h0T25lLnZhbCgpICE9PSBgYCAmJiB3YWxsTGVuZ2h0VHdvLnZhbCgpICE9PSBgYCAmJiB3YWxsSGVpZ2h0T25lLnZhbCgpICE9PSBgYCAmJiBiYXJMZW5naHQudmFsKCkgIT09IGBgKSB7XG4gICAgICBidG5OZXh0LnJlbW92ZUF0dHIoXCJkaXNhYmxlZFwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYnRuTmV4dC5hdHRyKFwiZGlzYWJsZWRcIiwgdHJ1ZSk7XG4gICAgfVxuICB9XG4gIGNoZWNrU2Vjb25kU2xpZGUoKTtcblxuICB3YWxsTGVuZ2h0T25lLm9uKFwiaW5wdXRcIiwgZnVuY3Rpb24oKSB7XG4gICAgY2hlY2tTZWNvbmRTbGlkZSgpO1xuICB9KTtcbiAgd2FsbExlbmdodE9uZS5vbihcImNoYW5nZVwiLCBmdW5jdGlvbigpIHtcbiAgICBnZXRJbnB1dHNNZXRlcnNWYWx1ZSgpO1xuICAgIGdldElucHV0c01ldGVyc0NvbnN1bXB0aW9uKCk7XG4gICAgY2FsY0dvb2RzKHJlc3VsdFNlY29uZFNsaWRlKTtcbiAgfSk7XG5cbiAgd2FsbExlbmdodFR3by5vbihcImlucHV0XCIsIGZ1bmN0aW9uKCkge1xuICAgIGNoZWNrU2Vjb25kU2xpZGUoKTtcbiAgfSk7XG4gIHdhbGxMZW5naHRUd28ub24oXCJpbnB1dFwiLCBmdW5jdGlvbigpIHtcbiAgICBnZXRJbnB1dHNNZXRlcnNWYWx1ZSgpO1xuICAgIGdldElucHV0c01ldGVyc0NvbnN1bXB0aW9uKCk7XG4gICAgY2FsY0dvb2RzKHJlc3VsdFNlY29uZFNsaWRlKTtcbiAgfSk7XG5cbiAgd2FsbEhlaWdodE9uZS5vbihcImlucHV0XCIsIGZ1bmN0aW9uKCkge1xuICAgIGNoZWNrU2Vjb25kU2xpZGUoKTtcbiAgfSk7XG4gIHdhbGxIZWlnaHRPbmUub24oXCJpbnB1dFwiLCBmdW5jdGlvbigpIHtcbiAgICBnZXRJbnB1dHNNZXRlcnNWYWx1ZSgpO1xuICAgIGdldElucHV0c01ldGVyc0NvbnN1bXB0aW9uKCk7XG4gICAgY2FsY0dvb2RzKHJlc3VsdFNlY29uZFNsaWRlKTtcbiAgfSk7XG5cbiAgYmFyTGVuZ2h0Lm9uKFwiaW5wdXRcIiwgZnVuY3Rpb24oKSB7XG4gICAgY2hlY2tTZWNvbmRTbGlkZSgpO1xuICB9KTtcbiAgYmFyTGVuZ2h0Lm9uKFwiaW5wdXRcIiwgZnVuY3Rpb24oKSB7XG4gICAgZ2V0SW5wdXRzTWV0ZXJzVmFsdWUoKTtcbiAgICBnZXRJbnB1dHNNZXRlcnNDb25zdW1wdGlvbigpO1xuICAgIGNhbGNHb29kcyhyZXN1bHRTZWNvbmRTbGlkZSk7XG4gIH0pO1xuXG4gIC8vINCh0YfQuNGC0LDQtdGCINGA0LDRgdGF0L7QtCDQuCDQv9Cw0LPQvtC90LDQtiDRgSDQv9C10YDQstC+0LPQviDRgdC70LDQudC00LBcbiAgZnVuY3Rpb24gZ2V0SW5wdXRNZXRlcnNDb25zdW1wdGlvbigpIHtcbiAgICBjb25zdCB2YWwgPSBydW5uaW5nTWV0ZXJzSW5wdXQudmFsKCk7XG4gICAgY29uc3QgY29uc3VtcHRpb24gPSB2YWwgKiAyMTA7XG4gICAgcmVzdWx0Rmlyc3RTbGlkZSA9IChjb25zdW1wdGlvbiAvIDEwMDApLnRvRml4ZWQoMik7XG4gICAgY29uc3VtcHRpb25TcGFuLnRleHQocmVzdWx0Rmlyc3RTbGlkZSk7XG4gIH1cbiAgZ2V0SW5wdXRNZXRlcnNDb25zdW1wdGlvbigpO1xuXG4gIGZ1bmN0aW9uIGdldElucHV0TWV0ZXJzVmFsdWUoKSB7XG4gICAgY29uc3QgdmFsID0gcnVubmluZ01ldGVyc0lucHV0LnZhbCgpO1xuICAgIHNlYW1zU3Bhbi50ZXh0KHZhbCk7XG4gIH1cbiAgZ2V0SW5wdXRNZXRlcnNWYWx1ZSgpO1xuXG4gIGxldCBtZXRlcnNTZWNvbmRTbGlkZVZhbHVlID0gMDtcbiAgLy8g0KHRh9C40YLQsNC10YIg0YDQsNGB0YXQvtC0INC4INC/0LDQs9C+0L3QsNC2INGB0L4g0LLRgtC+0YDQvtCz0L4g0YHQu9Cw0LnQtNCwXG4gIGZ1bmN0aW9uIGdldElucHV0c01ldGVyc1ZhbHVlKCkge1xuICAgIGNvbnN0IGxlbmdodE9uZSA9IHdhbGxMZW5naHRPbmUudmFsKCk7XG4gICAgY29uc3QgbGVuZ2h0VHdvID0gd2FsbExlbmdodFR3by52YWwoKTtcbiAgICBjb25zdCB3YWxsSGVpZ2h0ID0gd2FsbEhlaWdodE9uZS52YWwoKTtcbiAgICBjb25zdCBiYXJIZWlnaHQgPSBiYXJMZW5naHQudmFsKCk7XG4gICAgY29uc3QgZmlyc3RWYWx1ZSA9IHdhbGxIZWlnaHQgLyBiYXJIZWlnaHQgKiBsZW5naHRPbmU7XG4gICAgY29uc3Qgc2Vjb25kVmFsdWUgPSB3YWxsSGVpZ2h0IC8gYmFySGVpZ2h0ICogbGVuZ2h0VHdvO1xuICAgIG1ldGVyc1NlY29uZFNsaWRlVmFsdWUgPSBmaXJzdFZhbHVlICsgc2Vjb25kVmFsdWU7XG5cbiAgICBzZWFtc1NwYW4udGV4dChtZXRlcnNTZWNvbmRTbGlkZVZhbHVlKTtcbiAgfVxuICBnZXRJbnB1dHNNZXRlcnNWYWx1ZSgpO1xuXG4gIGZ1bmN0aW9uIGdldElucHV0c01ldGVyc0NvbnN1bXB0aW9uKCkge1xuICAgIGNvbnN0IHZhbCA9IG1ldGVyc1NlY29uZFNsaWRlVmFsdWU7XG4gICAgY29uc3QgYmFySGVpZ2h0ID0gYmFyTGVuZ2h0LnZhbCgpICogMTA7XG4gICAgY29uc3QgY29uc3VtcHRpb24gPSB2YWwgKiBiYXJIZWlnaHQ7XG4gICAgcmVzdWx0U2Vjb25kU2xpZGUgPSAoY29uc3VtcHRpb24gLyAxMDAwKS50b0ZpeGVkKDIpO1xuICAgIGNvbnN1bXB0aW9uU3Bhbi50ZXh0KHJlc3VsdFNlY29uZFNsaWRlKTtcbiAgfTtcbiAgZ2V0SW5wdXRzTWV0ZXJzQ29uc3VtcHRpb24oKTtcblxuICBjb25zdCBiYW5rMTBBbW91bnRTcGFuID0gY29udGFpbmVyLmZpbmQoXCIuanMtYmFuazEwLWFtb3VudFwiKTtcbiAgY29uc3QgYmFuazVBbW91bnRTcGFuID0gY29udGFpbmVyLmZpbmQoXCIuanMtYmFuazUtYW1vdW50XCIpO1xuICBjb25zdCBiYW5rMDVBbW91bnRTcGFuID0gY29udGFpbmVyLmZpbmQoXCIuanMtYmFuazA1LWFtb3VudFwiKTtcbiAgY29uc3QgYmFuazAzMUFtb3VudFNwYW4gPSBjb250YWluZXIuZmluZChcIi5qcy1iYW5rMDMxLWFtb3VudFwiKTtcblxuICBjb25zdCBiYW5rMTBXZWlnaHRTcGFuID0gY29udGFpbmVyLmZpbmQoXCIuanMtYmFuazEwLXdlaWdodFwiKTtcbiAgY29uc3QgYmFuazVXZWlnaHRTcGFuID0gY29udGFpbmVyLmZpbmQoXCIuanMtYmFuazUtd2VpZ2h0XCIpO1xuICBjb25zdCBiYW5rMDVXZWlnaHRTcGFuID0gY29udGFpbmVyLmZpbmQoXCIuanMtYmFuazA1LXdlaWdodFwiKTtcbiAgY29uc3QgYmFuazAzMVdlaWdodFNwYW4gPSBjb250YWluZXIuZmluZChcIi5qcy1iYW5rMDMxLXdlaWdodFwiKTtcblxuXG4gIC8vINCh0YfQuNGC0LDQtdGCINGB0LrQvtC70YzQutC+INC90YPQttC90L4g0YLQvtCy0LDRgNC+0LIg0L3QsCDRgtGA0LXRgtGM0LXQvCDRgdC70LDQudC00LVcbiAgZnVuY3Rpb24gY2FsY0dvb2RzKHZhbCkge1xuICAgIGNvbnN0IGFtb3VudEJhbmsxMCA9IE1hdGguY2VpbCh2YWwgLyAxMCk7XG4gICAgY29uc3QgYW1vdW50QmFuazUgPSBNYXRoLmNlaWwodmFsIC8gNSk7XG4gICAgY29uc3QgYW1vdW50QmFuazA1ID0gTWF0aC5jZWlsKHZhbCAvIDAuNSk7XG4gICAgY29uc3QgYW1vdW50QmFuazAzMSA9IE1hdGguY2VpbCh2YWwgLyAwLjMxKTtcblxuICAgIGNvbnN0IHdlaWdodEJhbmsxMCA9IE1hdGguY2VpbChhbW91bnRCYW5rMTAgKiAxMCk7XG4gICAgY29uc3Qgd2VpZ2h0QmFuazUgPSBNYXRoLmNlaWwoYW1vdW50QmFuazUgKiA1KTtcbiAgICBjb25zdCB3ZWlnaHRCYW5rMDUgPSBNYXRoLmNlaWwoYW1vdW50QmFuazA1ICogMC41KTtcbiAgICBjb25zdCB3ZWlnaHRCYW5rMDMxID0gTWF0aC5jZWlsKGFtb3VudEJhbmswMzEgKiAwLjMxKTtcblxuICAgIGJhbmsxMEFtb3VudFNwYW4udGV4dChhbW91bnRCYW5rMTApO1xuICAgIGJhbms1QW1vdW50U3Bhbi50ZXh0KGFtb3VudEJhbms1KTtcbiAgICBiYW5rMDVBbW91bnRTcGFuLnRleHQoYW1vdW50QmFuazA1KTtcbiAgICBiYW5rMDMxQW1vdW50U3Bhbi50ZXh0KGFtb3VudEJhbmswMzEpO1xuXG4gICAgYmFuazEwV2VpZ2h0U3Bhbi50ZXh0KHdlaWdodEJhbmsxMCk7XG4gICAgYmFuazVXZWlnaHRTcGFuLnRleHQod2VpZ2h0QmFuazUpO1xuICAgIGJhbmswNVdlaWdodFNwYW4udGV4dCh3ZWlnaHRCYW5rMDUpO1xuICAgIGJhbmswMzFXZWlnaHRTcGFuLnRleHQod2VpZ2h0QmFuazAzMSk7XG4gIH1cblxufTtcblxuZXhwb3J0IGRlZmF1bHQgY2FsY1NsaWRlcjtcbiIsImNvbnN0IGFua29ycyA9ICgpID0+IHtcbiAgY29uc3QgbGlua3MgPSAkKFwiLmpzLWFua29yXCIpO1xuICBpZiAoIWxpbmtzKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgcGFydG5hbWUgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWU7XG5cbiAgLy/Qn9GA0L7QstC10YDRj9C10Lwg0L3QsCBkb2N1bWVudC5yZWFkeSDQvdCw0LvQuNGH0LjQtSAjaGFzaHRhZyDQsiB1cmwsINC4INC10YHQu9C4INC10YHRgtGMLCDRgdC60YDQvtC70LvQuNC8INC00L4g0L3Rg9C20L3QvtC5INGB0LXQutGG0LjQuFxuICBjb25zdCBjaGVja0hhc2ggPSBmdW5jdGlvbigpIHtcbiAgICBpZiAod2luZG93LmxvY2F0aW9uLmhhc2gpIHtcbiAgICAgIGNvbnN0IGhhc2ggPSB3aW5kb3cubG9jYXRpb24uaGFzaDtcblxuICAgICAgaWYgKCQoaGFzaCkubGVuZ3RoKSB7XG4gICAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xuICAgICAgICAgICAgICBzY3JvbGxUb3A6ICgkKGhhc2gpLm9mZnNldCgpLnRvcCAtIDYwKSxcbiAgICAgICAgICB9LCA5MDAsICdzd2luZycpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICAkKGRvY3VtZW50KS5yZWFkeShjaGVja0hhc2gpO1xuXG4gIC8vINCd0LAg0LrQvdC+0L/QutC4INCy0LXRiNCw0LXQvCDQvtCx0YDQsNCx0L7RgtGH0LjQutC4INGB0L7QsdGL0YLQuNC5XG4gIGxpbmtzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgJCh0aGlzKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKGV2dCkge1xuICAgICAgLy8g0J3Rg9C20L3Qviwg0YfRgtC+0LHRiyDQvNC10L3RjiDQt9Cw0LrRgNGL0LLQsNC70L7RgdGMINC4INGB0YLRgNCw0L3QuNGG0LAg0YHQutGA0L7Qu9C70LjQu9Cw0YHRjCDQtNC+INGB0LXQutGG0LjQuFxuICAgICAgaWYgKCQoXCIubWVudVwiKS5oYXNDbGFzcyhcImlzLXNob3dcIikpIHtcblxuICAgICAgICAkKFwiLm1lbnVcIikucmVtb3ZlQ2xhc3MoXCJpcy1zaG93XCIpO1xuICAgICAgICAkKCdib2R5JykucmVtb3ZlQ2xhc3MoJ2lzLW1lbnUtb3BlbicpLnJlbW92ZUF0dHIoJ2RhdGEtc2Nyb2xsJyk7XG4gICAgICAgIGNoZWNrSGFzaCgpO1xuXG4gICAgICAvLyDQntCx0YvRh9C90YvQuSDRgdC60YDQuNC/0YIg0YHQutGA0L7Qu9C70LAg0LTQviDQvdC10L7QsdGF0L7QtNC40LzQvtC5INGB0LXQutGG0LjQuCDQsiBkYXRhINCw0YLRgNC40LHRg9GC0LUg0LHQtdC3INC/0LXRgNC10LfQsNCz0YDRg9C30LrQuCDRgdGC0YDQsNC90LjRhtGLXG4gICAgICB9IGVsc2Uge1xuXG4gICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIHZhciBoYXNoID0gJCh0aGlzKS5hdHRyKCdkYXRhLWhyZWYnKTtcblxuICAgICAgICBpZiAoJChoYXNoKS5sZW5ndGgpIHtcbiAgICAgICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcbiAgICAgICAgICAgICAgICBzY3JvbGxUb3A6ICgkKGhhc2gpLm9mZnNldCgpLnRvcCAtIDEzMCksXG4gICAgICAgICAgICB9LCA5MDAsICdzd2luZycpO1xuICAgICAgICB9XG5cbiAgICAgIH1cbiAgICB9KTtcblxuICAgICQodGhpcykub24oXCJmb2N1c1wiLCBmdW5jdGlvbihldnQpIHtcbiAgICAgIC8vINCd0YPQttC90L4sINGH0YLQvtCx0Ysg0LzQtdC90Y4g0LfQsNC60YDRi9Cy0LDQu9C+0YHRjCDQuCDRgdGC0YDQsNC90LjRhtCwINGB0LrRgNC+0LvQu9C40LvQsNGB0Ywg0LTQviDRgdC10LrRhtC40LhcbiAgICAgIGlmICgkKFwiLm1lbnVcIikuaGFzQ2xhc3MoXCJpcy1zaG93XCIpKSB7XG5cbiAgICAgICAgJChcIi5tZW51XCIpLnJlbW92ZUNsYXNzKFwiaXMtc2hvd1wiKTtcbiAgICAgICAgJChcIi5qcy1vcGVuLW1lbnVcIikucmVtb3ZlQ2xhc3MoXCJpcy1zaG93XCIpO1xuICAgICAgICAkKCdib2R5JykucmVtb3ZlQ2xhc3MoJ2lzLW1lbnUtb3BlbicpLnJlbW92ZUF0dHIoJ2RhdGEtc2Nyb2xsJyk7XG4gICAgICAgIGNoZWNrSGFzaCgpO1xuXG4gICAgICAvLyDQntCx0YvRh9C90YvQuSDRgdC60YDQuNC/0YIg0YHQutGA0L7Qu9C70LAg0LTQviDQvdC10L7QsdGF0L7QtNC40LzQvtC5INGB0LXQutGG0LjQuCDQsiBkYXRhINCw0YLRgNC40LHRg9GC0LUg0LHQtdC3INC/0LXRgNC10LfQsNCz0YDRg9C30LrQuCDRgdGC0YDQsNC90LjRhtGLXG4gICAgICB9IGVsc2Uge1xuXG4gICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIHZhciBoYXNoID0gJCh0aGlzKS5hdHRyKCdkYXRhLWhyZWYnKTtcblxuICAgICAgICBpZiAoJChoYXNoKS5sZW5ndGgpIHtcbiAgICAgICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcbiAgICAgICAgICAgICAgICBzY3JvbGxUb3A6ICgkKGhhc2gpLm9mZnNldCgpLnRvcCAtIDEzMCksXG4gICAgICAgICAgICB9LCA5MDAsICdzd2luZycpO1xuICAgICAgICB9XG5cbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGFua29ycztcbiIsImltcG9ydCBub2RlTGlzdEZvckVhY2ggZnJvbSAnLi9ub2RlLWxpc3QtZm9yLWVhY2gnO1xuaW1wb3J0IHRlbCBmcm9tICcuL3RlbCc7XG5pbXBvcnQgYW5pbWF0aW9uIGZyb20gJy4vYW5pbWF0aW9uJztcbmltcG9ydCBtZW51T3BlbiBmcm9tICcuL21lbnUtb3Blbic7XG5pbXBvcnQgbW9kYWwgZnJvbSAnLi9tb2RhbCc7XG5pbXBvcnQgaGVhZGVyU2Nyb2xsIGZyb20gJy4vaGVhZGVyJztcbmltcG9ydCBzbGlkZXJzIGZyb20gJy4vc2xpZGVycyc7XG5pbXBvcnQgbnVtYmVyIGZyb20gJy4vbnVtYmVyJztcbmltcG9ydCBidG5VcCBmcm9tICcuL2J0bi11cCc7XG5pbXBvcnQgYWNjb3JkaW9uIGZyb20gJy4vYWNjb3JkaW9uJztcbmltcG9ydCBnb29kUXVhbnRpdHkgZnJvbSAnLi9nb29kLXF1YW50aXR5JztcbmltcG9ydCBjb2xvcnNTZWxlY3QgZnJvbSAnLi9jb2xvcnMtc2VsZWN0JztcbmltcG9ydCBmb290ZXJGb3JtIGZyb20gJy4vZm9vdGVyLWZvcm0nO1xuaW1wb3J0IGNhbGNTbGlkZXIgZnJvbSAnLi9jYWxjdWxhdG9yJztcbmltcG9ydCBhbmtvcnMgZnJvbSAnLi9hbmtvcnMnO1xuXG5jbGFzcyBBcHAge1xuICBzdGF0aWMgaW5pdCgpIHtcbiAgICBub2RlTGlzdEZvckVhY2goKTtcbiAgICB0ZWwoKTtcbiAgICBhbmltYXRpb24oKTtcbiAgICBtZW51T3BlbigpO1xuICAgIGhlYWRlclNjcm9sbCgpO1xuICAgIG1vZGFsKCk7XG4gICAgc2xpZGVycygpO1xuICAgIG51bWJlcigpO1xuICAgIGJ0blVwKCk7XG4gICAgYWNjb3JkaW9uKCk7XG4gICAgZ29vZFF1YW50aXR5KCk7XG4gICAgY29sb3JzU2VsZWN0KCk7XG4gICAgZm9vdGVyRm9ybSgpO1xuICAgIGNhbGNTbGlkZXIoKTtcbiAgICBhbmtvcnMoKTtcbiAgfVxufVxuXG5cbkFwcC5pbml0KCk7XG53aW5kb3cuQXBwID0gQXBwO1xuIl0sIm5hbWVzIjpbIm5vZGVMaXN0Rm9yRWFjaCIsIndpbmRvdyIsIk5vZGVMaXN0IiwicHJvdG90eXBlIiwiZm9yRWFjaCIsImNhbGxiYWNrIiwidGhpc0FyZyIsImkiLCJsZW5ndGgiLCJjYWxsIiwidGVsIiwiZm9ybUJsb2NrcyIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvckFsbCIsImZvcm1CbG9jayIsImlucHV0IiwicXVlcnlTZWxlY3RvciIsInBob25lTWFzayIsIklNYXNrIiwibWFzayIsImFuaW1hdGlvbiIsImFuaW1hdGlvbnMiLCJXT1ciLCJpbml0IiwiYnRucyIsIiQiLCJjaGVja1RvdWNoRGV2aWNlIiwiY3JlYXRlRXZlbnQiLCJlIiwiaXNUb3VjaERldmljZSIsImVhY2giLCIkYnV0dG9uIiwiJHJpcHBsZVRlbXBsYXRlIiwiY2xhc3MiLCJhcHBlbmQiLCIkcmlwcGxlIiwiZmluZCIsIm9uIiwicGFyZW50T2Zmc2V0Iiwib2Zmc2V0IiwicmVsWCIsInBhZ2VYIiwibGVmdCIsInJlbFkiLCJwYWdlWSIsInRvcCIsImNzcyIsIndpZHRoIiwiaGVpZ2h0IiwicHJvbW8iLCJwcm9tb0ltZ0xnIiwicHJvbW9JbWdTbSIsInJlYWR5Iiwic2V0VGltZW91dCIsImFkZENsYXNzIiwibWVudU9wZW4iLCIkYnV0dG9uc01lbnUiLCIkbWVudSIsIiRidXR0b25DbG9zZSIsIiRoZWFkZXIiLCIkYnRuIiwic2Nyb2xsSGVhZGVyIiwiaGFzQ2xhc3MiLCJzY3JvbGxUb3AiLCJyZW1vdmVDbGFzcyIsImNsaWNrIiwicG9zIiwicGFyc2VJbnQiLCJhdHRyIiwicmVtb3ZlQXR0ciIsInNjcm9sbFRvIiwicGFnZVBvcyIsIm1vZGFsIiwiJGJ1dHRvbnMiLCIkYm9keSIsIm9wdGlvbnMiLCJoaWRlU2Nyb2xsYmFyIiwidG91Y2giLCJidG5UcGwiLCJzbWFsbEJ0biIsImJlZm9yZVNob3ciLCJkYXRhIiwic2xpY2UiLCJib2R5U3R5bGVzIiwiYWZ0ZXJDbG9zZSIsImZhbmN5Ym94IiwiaGVhZGVyU2Nyb2xsIiwibWFpbiIsImludHJvVG9wIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwiY2hlY2tIZWFkZXJIZWlnaHQiLCJ2YWx1ZSIsIm91dGVySGVpZ2h0Iiwic2xpZGVycyIsIlN3aXBlciIsImFkdmFudGFnZXMiLCJteVN3aXBlciIsImRpcmVjdGlvbiIsInNsaWRlc1BlclZpZXciLCJzcGFjZUJldHdlZW4iLCJzcGVlZCIsIm5hdmlnYXRpb24iLCJuZXh0RWwiLCJwcmV2RWwiLCJwaG90b3MiLCJsb29wIiwiY2VudGVyZWRTbGlkZXMiLCJicmVha3BvaW50cyIsInBhZ2luYXRpb24iLCJlbCIsImNsaWNrYWJsZSIsInJldmlld3MiLCJzZXJ0aWZpY2F0ZXMiLCJudW1iZXIiLCIkbnVtYmVycyIsIiR0aGlzcyIsImJ0blVwIiwic2Nyb2xsIiwiaXMiLCJvcGFjaXR5IiwiZmFkZUluIiwic3RvcCIsImZhZGVPdXQiLCJhbmltYXRlIiwiYWNjb3JkaW9uIiwiJGFjY29yZGlvbnMiLCIkc2lkZSIsIiRtYWluIiwiZXZ0IiwicHJldmVudERlZmF1bHQiLCJzbGlkZVVwIiwiYmx1ciIsInNsaWRlRG93biIsImdvb2RRdWFudGl0eSIsImNvbnRhaW5lcnMiLCJjb250YWluZXIiLCJidG5JbmNyZWFzZSIsImJ0bkRlY3JlYXNlIiwiYnRuSW5jcmVhc2VIYW5kbGVyIiwibmV3VmFsdWUiLCJyZW1vdmVBdHRyaWJ1dGUiLCJidG5EZWNyZWFzZUhhbmRsZXIiLCJzZXRBdHRyaWJ1dGUiLCJhZGRFdmVudExpc3RlbmVyIiwiY29sb3JzU2VsZWN0IiwiY29sb3JzQmxvY2siLCJsaW5rcyIsInBpY3R1cmVCbG9jayIsInRleHRCbG9jayIsImxpbmsiLCJwaWN0dXJlIiwibmFtZSIsInRleHQiLCJmb290ZXJGb3JtIiwiJGZvb3RlckZvcm0iLCJpbnB1dHMiLCJ2YWwiLCJjYWxjU2xpZGVyIiwiYWxsb3dUb3VjaE1vdmUiLCJmYWRlRWZmZWN0IiwiY3Jvc3NGYWRlIiwiZWZmZWN0Iiwic3RlcHNMaW5rcyIsIkluZGV4ZXMiLCJGSVJTVF9TTElERSIsIlNFQ09ORF9TTElERSIsIlRISVJEX1NMSURFIiwiY2hhbmdlQWN0aXZlU3RlcCIsImluZGV4IiwiYWN0aXZlU3RlcCIsInJ1bm5pbmdNZXRlcnNJbnB1dCIsImJ0bk5leHQiLCJidG5QcmV2IiwiZG9udEtub3dMaW5rIiwiYnRuR29Ub0Jhc2tldCIsIndhbGxMZW5naHRPbmUiLCJ3YWxsTGVuZ2h0VHdvIiwid2FsbEhlaWdodE9uZSIsImJhckxlbmdodCIsInNlYW1zU3BhbiIsImNvbnN1bXB0aW9uU3BhbiIsInJlc3VsdEZpcnN0U2xpZGUiLCJyZXN1bHRTZWNvbmRTbGlkZSIsImNoZWNrSW5wdXRWYWwiLCJnZXRJbnB1dE1ldGVyc1ZhbHVlIiwiZ2V0SW5wdXRNZXRlcnNDb25zdW1wdGlvbiIsImNhbGNHb29kcyIsImdvVG9MYXN0U2xpZGUiLCJzbGlkZSIsInNsaWRlVG8iLCJnb1RvRmlyc3RTbGlkZSIsImNoZWNrU2Vjb25kU2xpZGUiLCJnb1RvU2Vjb25kU2xpZGUiLCJnZXRJbnB1dHNNZXRlcnNWYWx1ZSIsImdldElucHV0c01ldGVyc0NvbnN1bXB0aW9uIiwiY29uc3VtcHRpb24iLCJ0b0ZpeGVkIiwibWV0ZXJzU2Vjb25kU2xpZGVWYWx1ZSIsImxlbmdodE9uZSIsImxlbmdodFR3byIsIndhbGxIZWlnaHQiLCJiYXJIZWlnaHQiLCJmaXJzdFZhbHVlIiwic2Vjb25kVmFsdWUiLCJiYW5rMTBBbW91bnRTcGFuIiwiYmFuazVBbW91bnRTcGFuIiwiYmFuazA1QW1vdW50U3BhbiIsImJhbmswMzFBbW91bnRTcGFuIiwiYmFuazEwV2VpZ2h0U3BhbiIsImJhbms1V2VpZ2h0U3BhbiIsImJhbmswNVdlaWdodFNwYW4iLCJiYW5rMDMxV2VpZ2h0U3BhbiIsImFtb3VudEJhbmsxMCIsIk1hdGgiLCJjZWlsIiwiYW1vdW50QmFuazUiLCJhbW91bnRCYW5rMDUiLCJhbW91bnRCYW5rMDMxIiwid2VpZ2h0QmFuazEwIiwid2VpZ2h0QmFuazUiLCJ3ZWlnaHRCYW5rMDUiLCJ3ZWlnaHRCYW5rMDMxIiwiYW5rb3JzIiwicGFydG5hbWUiLCJsb2NhdGlvbiIsInBhdGhuYW1lIiwiY2hlY2tIYXNoIiwiaGFzaCIsIkFwcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQUFBLElBQU1BLGVBQWUsR0FBRyxTQUFsQkEsZUFBa0IsR0FBTTtFQUM1QixNQUFJLGNBQWNDLE1BQWQsSUFBd0IsQ0FBQ0MsUUFBUSxDQUFDQyxTQUFULENBQW1CQyxPQUFoRCxFQUF5RDtFQUN2REYsSUFBQUEsUUFBUSxDQUFDQyxTQUFULENBQW1CQyxPQUFuQixHQUE2QixVQUFVQyxRQUFWLEVBQW9CQyxPQUFwQixFQUE2QjtFQUMxREEsTUFBQUEsT0FBTyxHQUFHQSxPQUFPLElBQUlMLE1BQXJCOztFQUNBLFdBQUssSUFBSU0sQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBRyxLQUFLQyxNQUF6QixFQUFpQ0QsQ0FBQyxFQUFsQyxFQUFzQztFQUN0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
