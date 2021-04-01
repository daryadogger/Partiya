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
      var slide = container.find(".swiper-slide-active"); // const index = slide.attr("index");

      var activeStep = $(stepsLinks[index]);
      activeStep.addClass("active");
    } // Переключает активный слайд, если нажимают по самим ссылкам шагов


    stepsLinks.each(function () {
      var link = $(this);
      link.on("click", function (evt) {
        evt.preventDefault();
      });
    }); // Проверяет value инпута погонных метров и делает кнопку disabled

    var runningMetersInput = container.find(".js-running-meters");
    var btnNext = container.find(".js-btn-next");
    var btnPrev = container.find(".js-btn-prev");
    var dontKnowLink = container.find(".js-dont-know");
    var btnGoToBasket = container.find(".js-go-to-basket");
    var wallLenghtOne = container.find(".js-length-wall-1");
    var wallLenghtTwo = container.find(".js-length-wall-2");
    var wallHeightOne = container.find(".js-height-wall-1");
    var barLenght = container.find(".js-height-bar");

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
    }); // Кнопка далее переводит с первого слайда на последний

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
    wallLenghtOne.on("input", checkSecondSlide);
    wallLenghtTwo.on("input", checkSecondSlide);
    wallHeightOne.on("input", checkSecondSlide);
    barLenght.on("input", checkSecondSlide);
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsic3JjL2pzL25vZGUtbGlzdC1mb3ItZWFjaC5qcyIsInNyYy9qcy90ZWwuanMiLCJzcmMvanMvYW5pbWF0aW9uLmpzIiwic3JjL2pzL21lbnUtb3Blbi5qcyIsInNyYy9qcy9tb2RhbC5qcyIsInNyYy9qcy9oZWFkZXIuanMiLCJzcmMvanMvc2xpZGVycy5qcyIsInNyYy9qcy9udW1iZXIuanMiLCJzcmMvanMvYnRuLXVwLmpzIiwic3JjL2pzL2FjY29yZGlvbi5qcyIsInNyYy9qcy9nb29kLXF1YW50aXR5LmpzIiwic3JjL2pzL2NvbG9ycy1zZWxlY3QuanMiLCJzcmMvanMvZm9vdGVyLWZvcm0uanMiLCJzcmMvanMvY2FsY3VsYXRvci5qcyIsInNyYy9qcy9hbmtvcnMuanMiLCJzcmMvanMvbWFpbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBub2RlTGlzdEZvckVhY2ggPSAoKSA9PiB7XG4gIGlmICgnTm9kZUxpc3QnIGluIHdpbmRvdyAmJiAhTm9kZUxpc3QucHJvdG90eXBlLmZvckVhY2gpIHtcbiAgICBOb2RlTGlzdC5wcm90b3R5cGUuZm9yRWFjaCA9IGZ1bmN0aW9uIChjYWxsYmFjaywgdGhpc0FyZykge1xuICAgIHRoaXNBcmcgPSB0aGlzQXJnIHx8IHdpbmRvdztcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcbiAgICBjYWxsYmFjay5jYWxsKHRoaXNBcmcsIHRoaXNbaV0sIGksIHRoaXMpO1xuICAgIH1cbiAgICB9O1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBub2RlTGlzdEZvckVhY2g7XG4iLCJjb25zdCB0ZWwgPSAoKSA9PiB7XG4gIC8vIE1hc2sgZm9yIHRlbFxuICBjb25zdCBmb3JtQmxvY2tzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5maWVsZHNldFwiKTtcblxuICBpZiAoZm9ybUJsb2Nrcy5sZW5ndGgpIHtcblxuICAgIGZvcm1CbG9ja3MuZm9yRWFjaChmdW5jdGlvbihmb3JtQmxvY2spIHtcbiAgICAgIGNvbnN0IGlucHV0ID0gZm9ybUJsb2NrLnF1ZXJ5U2VsZWN0b3IoXCJpbnB1dFtuYW1lPXRlbF1cIik7XG5cbiAgICAgIGlmKGlucHV0KSB7XG4gICAgICAgIGNvbnN0IHBob25lTWFzayA9IElNYXNrKCBpbnB1dCwge1xuICAgICAgICAgIG1hc2s6IFwiK3s3fSAwMDAgMDAwLTAwLTAwXCJcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICB9KTtcblxuICB9XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IHRlbDtcbiIsImNvbnN0IGFuaW1hdGlvbiA9ICgpID0+IHtcbiAgLy93b3dcbiAgY29uc3QgYW5pbWF0aW9ucyA9IG5ldyB3aW5kb3cuV09XKCkuaW5pdCgpO1xuXG4gIC8vYnRuc1xuICBjb25zdCBidG5zID0gJChcIi5qcy1yaXBwbGVcIik7XG5cbiAgaWYgKGJ0bnMpIHtcbiAgICBmdW5jdGlvbiBjaGVja1RvdWNoRGV2aWNlKCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ1RvdWNoRXZlbnQnKTtcblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IGlzVG91Y2hEZXZpY2UgPSBjaGVja1RvdWNoRGV2aWNlKCk7XG5cbiAgICBpZiAoIWlzVG91Y2hEZXZpY2UpIHtcblxuICAgICAgYnRucy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICBsZXQgJGJ1dHRvbiA9ICQodGhpcyk7XG4gICAgICAgIGxldCAkcmlwcGxlVGVtcGxhdGUgPSAkKCc8c3BhbiAvPicsIHtcbiAgICAgICAgICBjbGFzczogJ2J1dHRvbl9fcmlwcGxlJyxcbiAgICAgICAgfSk7XG4gICAgICAgICRidXR0b24uYXBwZW5kKCRyaXBwbGVUZW1wbGF0ZSk7XG5cbiAgICAgICAgbGV0ICRyaXBwbGUgPSAkYnV0dG9uLmZpbmQoJy5idXR0b25fX3JpcHBsZScpO1xuXG4gICAgICAgICRidXR0b24ub24oJ21vdXNlZW50ZXInLCAnKicsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICBsZXQgcGFyZW50T2Zmc2V0ID0gJGJ1dHRvbi5vZmZzZXQoKTtcbiAgICAgICAgICBsZXQgcmVsWCA9IGUucGFnZVggLSBwYXJlbnRPZmZzZXQubGVmdDtcbiAgICAgICAgICBsZXQgcmVsWSA9IGUucGFnZVkgLSBwYXJlbnRPZmZzZXQudG9wO1xuXG4gICAgICAgICAgJHJpcHBsZS5jc3Moe1xuICAgICAgICAgICAgdG9wOiByZWxZLFxuICAgICAgICAgICAgbGVmdDogcmVsWCxcbiAgICAgICAgICAgIHdpZHRoOiAnMjI1JScsXG4gICAgICAgICAgICBoZWlnaHQ6ICRidXR0b24ud2lkdGgoKSAqIDIuMjUsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRidXR0b24ub24oJ21vdXNlb3V0JywgJyonLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgbGV0IHBhcmVudE9mZnNldCA9ICRidXR0b24ub2Zmc2V0KCk7XG4gICAgICAgICAgbGV0IHJlbFggPSBlLnBhZ2VYIC0gcGFyZW50T2Zmc2V0LmxlZnQ7XG4gICAgICAgICAgbGV0IHJlbFkgPSBlLnBhZ2VZIC0gcGFyZW50T2Zmc2V0LnRvcDtcbiAgICAgICAgICAkcmlwcGxlLmNzcyh7XG4gICAgICAgICAgICB0b3A6IHJlbFksXG4gICAgICAgICAgICBsZWZ0OiByZWxYLFxuICAgICAgICAgICAgd2lkdGg6IDAsXG4gICAgICAgICAgICBoZWlnaHQ6IDAsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICB9XG4gIH1cblxuICBjb25zdCBwcm9tbyA9ICQoXCIucHJvbW9cIik7XG5cbiAgaWYgKHByb21vKSB7XG4gICAgY29uc3QgcHJvbW9JbWdMZyA9IHByb21vLmZpbmQoXCIucHJvbW9fX2dvb2QtLWxnXCIpO1xuICAgIGNvbnN0IHByb21vSW1nU20gPSBwcm9tby5maW5kKFwiLnByb21vX19nb29kLS1zbVwiKTtcblxuICAgICQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIHByb21vSW1nTGcuYWRkQ2xhc3MoXCJzaG93XCIpO1xuICAgICAgICBwcm9tb0ltZ1NtLmFkZENsYXNzKFwic2hvd1wiKTtcbiAgICAgIH0sIDMwMCk7XG4gICAgfSk7XG4gIH1cblxufTtcblxuZXhwb3J0IGRlZmF1bHQgYW5pbWF0aW9uO1xuIiwiY29uc3QgbWVudU9wZW4gPSAoKSA9PiB7XG4gIC8vINCe0YLQutGA0YvRgtC40LUg0LzQvtCxINC80LXQvdGOXG4gIGNvbnN0ICRidXR0b25zTWVudSA9ICQoXCIuanMtb3Blbi1tZW51XCIpO1xuXG4gIGlmICgkYnV0dG9uc01lbnUubGVuZ3RoKSB7XG4gICAgY29uc3QgJG1lbnUgPSAkKFwiLm1lbnVcIik7XG4gICAgY29uc3QgJGJ1dHRvbkNsb3NlID0gJChcIi5qcy1idG4tY2xvc2VcIik7XG4gICAgY29uc3QgJGhlYWRlciA9ICQoXCIuaGVhZGVyXCIpO1xuXG4gICAgJGJ1dHRvbnNNZW51LmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgY29uc3QgJGJ0biA9ICQodGhpcyk7XG5cbiAgICAgIGNvbnN0IHNjcm9sbEhlYWRlciA9ICgpID0+IHtcbiAgICAgICAgaWYgKCRtZW51Lmhhc0NsYXNzKFwiaXMtc2hvd1wiKSkge1xuXG4gICAgICAgICAgaWYoJG1lbnUuc2Nyb2xsVG9wKCkgPiAxKSB7XG4gICAgICAgICAgICAkaGVhZGVyLmFkZENsYXNzKFwic2Nyb2xsXCIpO1xuXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICRoZWFkZXIucmVtb3ZlQ2xhc3MoXCJzY3JvbGxcIik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICAkYnRuLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAvLyDQtdGB0LvQuCDQvtGC0LrRgNGL0YLQviDQvNC10L3RjlxuICAgICAgICBpZiAoJG1lbnUuaGFzQ2xhc3MoXCJpcy1zaG93XCIpKSB7XG5cbiAgICAgICAgICBjb25zdCBwb3MgPSBwYXJzZUludCgkKFwiYm9keVwiKS5hdHRyKFwiZGF0YS1zY3JvbGxcIiksIDEwKTtcbiAgICAgICAgICAkbWVudS5yZW1vdmVDbGFzcyhcImlzLXNob3dcIik7XG4gICAgICAgICAgJGJ0bi5yZW1vdmVDbGFzcyhcImlzLXNob3dcIik7XG4gICAgICAgICAgJGhlYWRlci5yZW1vdmVDbGFzcyhcInNjcm9sbFwiKTtcblxuICAgICAgICAgICQoXCJib2R5XCIpLnJlbW92ZUNsYXNzKFwiaXMtbWVudS1vcGVuXCIpLnJlbW92ZUF0dHIoXCJkYXRhLXNjcm9sbFwiKTtcbiAgICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgcG9zKTtcblxuICAgICAgICAgIC8vINC10YHQu9C4INC30LDQutGA0YvRgtC+INC80LXQvdGOXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAkbWVudS5hZGRDbGFzcyhcImlzLXNob3dcIik7XG5cbiAgICAgICAgICBpZigkbWVudS5zY3JvbGxUb3AoKSA+IDEpIHtcbiAgICAgICAgICAgICRoZWFkZXIuYWRkQ2xhc3MoXCJzY3JvbGxcIik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkYnRuLmFkZENsYXNzKFwiaXMtc2hvd1wiKTtcblxuICAgICAgICAgIH0sIDEwMCk7XG5cbiAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNvbnN0IHBhZ2VQb3MgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XG4gICAgICAgICAgICAkKFwiYm9keVwiKS5hZGRDbGFzcyhcImlzLW1lbnUtb3BlblwiKS5hdHRyKFwiZGF0YS1zY3JvbGxcIiwgcGFnZVBvcyk7XG4gICAgICAgICAgfSwgNDUwKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgICQoXCIubWVudVwiKS5vbihcInNjcm9sbFwiLCBzY3JvbGxIZWFkZXIpO1xuICAgIH0pO1xuXG4gICAgJGJ1dHRvbkNsb3NlLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnN0IHBvcyA9IHBhcnNlSW50KCQoXCJib2R5XCIpLmF0dHIoXCJkYXRhLXNjcm9sbFwiKSwgMTApO1xuICAgICAgJG1lbnUucmVtb3ZlQ2xhc3MoXCJpcy1zaG93XCIpO1xuICAgICAgJGJ1dHRvbnNNZW51LmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zdCAkYnRuID0gJCh0aGlzKTtcbiAgICAgICAgJGJ0bi5yZW1vdmVDbGFzcyhcImlzLXNob3dcIik7XG4gICAgICB9KTtcblxuICAgICAgJChcImJvZHlcIikucmVtb3ZlQ2xhc3MoXCJpcy1tZW51LW9wZW5cIikucmVtb3ZlQXR0cihcImRhdGEtc2Nyb2xsXCIpO1xuICAgICAgd2luZG93LnNjcm9sbFRvKDAsIHBvcyk7XG4gICAgfSk7XG5cbiAgfVxuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBtZW51T3BlbjtcbiIsImNvbnN0IG1vZGFsID0gKCkgPT4ge1xuICBjb25zdCAkYnV0dG9ucyA9ICQoJ1tqcy1wb3B1cC1vcGVuXScpO1xuXG4gIGlmICgkYnV0dG9ucy5sZW5ndGgpIHtcbiAgICBjb25zdCAkYm9keSA9ICQoJ2JvZHknKTtcblxuICAgICRidXR0b25zLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICBjb25zdCAkYnV0dG9uID0gJCh0aGlzKTtcbiAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgIGhpZGVTY3JvbGxiYXI6IHRydWUsXG4gICAgICAgIHRvdWNoOiBmYWxzZSxcbiAgICAgICAgYnRuVHBsIDoge1xuICAgICAgICAgIHNtYWxsQnRuIDogJydcbiAgICAgICAgfSxcbiAgICAgICAgYmVmb3JlU2hvdzogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgLy8gIEFkZCBhbm90aGVyIGJnIGNvbG9yXG4gICAgICAgICAgJCgnLmZhbmN5Ym94LWJnJykuYWRkQ2xhc3MoJGJ1dHRvbi5kYXRhKCdzcmMnKS5zbGljZSgxKSk7XG5cbiAgICAgICAgICBjb25zdCBib2R5U3R5bGVzID0ge1xuICAgICAgICAgICAgJ292ZXJmbG93LXknOiAnaGlkZGVuJyxcbiAgICAgICAgICAgICdtYXJnaW4nOiAnMCBhdXRvJ1xuICAgICAgICAgIH07XG4gICAgICAgICAgJGJvZHkuY3NzKGJvZHlTdHlsZXMpO1xuXG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAkKCRidXR0b24uZGF0YSgnc3JjJykpLmFkZENsYXNzKFwic2hvd1wiKTtcbiAgICAgICAgICB9LCAxMDApO1xuICAgICAgICB9LFxuICAgICAgICBhZnRlckNsb3NlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAvLyAgQWRkIGFub3RoZXIgYmcgY29sb3JcbiAgICAgICAgICAkKCcuZmFuY3lib3gtYmcnKS5yZW1vdmVDbGFzcygkYnV0dG9uLmRhdGEoJ3NyYycpLnNsaWNlKDEpKTtcblxuICAgICAgICAgIGNvbnN0IGJvZHlTdHlsZXMgPSB7XG4gICAgICAgICAgICAnb3ZlcmZsb3cteSc6ICd2aXNpYmxlJyxcbiAgICAgICAgICAgICdwYWRkaW5nLXJpZ2h0JzogMCxcbiAgICAgICAgICAgICdtYXJnaW4nOiAwXG4gICAgICAgICAgfTtcbiAgICAgICAgICAkYm9keS5jc3MoYm9keVN0eWxlcyk7XG5cbiAgICAgICAgICAkKCRidXR0b24uZGF0YSgnc3JjJykpLnJlbW92ZUNsYXNzKFwic2hvd1wiKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgJGJ1dHRvbi5mYW5jeWJveChvcHRpb25zKTtcbiAgICB9KTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgbW9kYWw7XG4iLCJjb25zdCBoZWFkZXJTY3JvbGwgPSAoKSA9PiB7XG4gIGNvbnN0IG1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwibWFpblwiKTtcblxuICBjb25zdCAkaGVhZGVyID0gJChcIi5oZWFkZXJcIik7XG5cbiAgaWYgKCRoZWFkZXIpIHtcblxuICAgIC8vIEhlYWRlciDQvNC10L3Rj9C10YIg0YbQstC10YLQsCDQv9GA0Lgg0YHQutGA0L7Qu9C70LUuINCe0L0g0YPQttC1IGZpeGVkINC40LfQvdCw0YfQsNC70YzQvdC+XG4gICAgY29uc3Qgc2Nyb2xsSGVhZGVyID0gKCkgPT4ge1xuICAgICAgY29uc3QgaW50cm9Ub3AgPSBtYWluLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcDtcblxuICAgICAgaWYgKGludHJvVG9wIDwgLTEpIHtcbiAgICAgICAgJGhlYWRlci5hZGRDbGFzcyhcInNjcm9sbFwiKTtcblxuICAgICAgfSBlbHNlIGlmICgkaGVhZGVyLmhhc0NsYXNzKFwic2Nyb2xsXCIpICYmIGludHJvVG9wID4gLTEpIHtcbiAgICAgICAgJGhlYWRlci5yZW1vdmVDbGFzcyhcInNjcm9sbFwiKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgJCh3aW5kb3cpLm9uKFwic2Nyb2xsXCIsIHNjcm9sbEhlYWRlcik7XG4gICAgJChkb2N1bWVudCkub24oXCJyZWFkeVwiLCBzY3JvbGxIZWFkZXIpO1xuXG5cbiAgICAvL9CU0L7QsdCw0LLQu9GP0LXRgiDQvtGC0YHRgtGD0L8g0L3QsCDRgdGC0YDQsNC90LjRhtCw0YUg0LTQu9GPINGE0LjQutGB0LjRgNC+0LLQsNC90L3QvtCz0L4g0YXQtdC00LXRgNCwXG4gICAgZnVuY3Rpb24gY2hlY2tIZWFkZXJIZWlnaHQoKSB7XG4gICAgICBjb25zdCB2YWx1ZSA9ICRoZWFkZXIub3V0ZXJIZWlnaHQoKTtcbiAgICAgIGNvbnN0IG1haW4gPSAkKFwibWFpblwiKTtcblxuICAgICAgbWFpbi5jc3MoXCJwYWRkaW5nLXRvcFwiLCB2YWx1ZSk7XG4gICAgfVxuICAgIC8vIGNoZWNrSGVhZGVySGVpZ2h0KCk7XG5cbiAgICAkKHdpbmRvdykub24oXCJyZXNpemVcIiwgY2hlY2tIZWFkZXJIZWlnaHQpO1xuICB9XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGhlYWRlclNjcm9sbDtcbiIsImNvbnN0IHNsaWRlcnMgPSAoKSA9PiB7XG4gIGNvbnN0IFN3aXBlciA9IHdpbmRvdy5Td2lwZXI7XG5cbiAgLy8gQWR2IHNsaWRlclxuICBjb25zdCBhZHZhbnRhZ2VzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5qcy1hZHZhbnRhZ2VzLXNsaWRlclwiKTtcblxuICBpZiAoYWR2YW50YWdlcykge1xuICAgIGNvbnN0IG15U3dpcGVyID0gbmV3IFN3aXBlcihcIi5qcy1hZHZhbnRhZ2VzLXNsaWRlci5zd2lwZXItY29udGFpbmVyXCIsIHtcbiAgICAgIGRpcmVjdGlvbjogXCJob3Jpem9udGFsXCIsXG4gICAgICBzbGlkZXNQZXJWaWV3OiAxLFxuICAgICAgc3BhY2VCZXR3ZWVuOiAyMCxcbiAgICAgIHNwZWVkOiA0MDAsXG4gICAgICBuYXZpZ2F0aW9uOiB7XG4gICAgICAgIG5leHRFbDogXCIuanMtYWR2YW50YWdlcy1zbGlkZXIgLnN3aXBlci1idXR0b24tbmV4dFwiLFxuICAgICAgICBwcmV2RWw6IFwiLmpzLWFkdmFudGFnZXMtc2xpZGVyIC5zd2lwZXItYnV0dG9uLXByZXZcIixcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cblxuICAvLyBQaG90b3Mgc2xpZGVyXG4gIGNvbnN0IHBob3RvcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuanMtcGhvdG9zLXNsaWRlclwiKTtcblxuICBpZiAocGhvdG9zKSB7XG4gICAgY29uc3QgbXlTd2lwZXIgPSBuZXcgU3dpcGVyKFwiLmpzLXBob3Rvcy1zbGlkZXIuc3dpcGVyLWNvbnRhaW5lclwiLCB7XG4gICAgICBkaXJlY3Rpb246IFwiaG9yaXpvbnRhbFwiLFxuICAgICAgc2xpZGVzUGVyVmlldzogMSxcbiAgICAgIHNwYWNlQmV0d2VlbjogMjAsXG4gICAgICBzcGVlZDogNDAwLFxuICAgICAgbG9vcDogdHJ1ZSxcbiAgICAgIGNlbnRlcmVkU2xpZGVzOiBmYWxzZSxcbiAgICAgIGJyZWFrcG9pbnRzOiB7XG4gICAgICAgIDc2Nzoge1xuICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDIsXG4gICAgICAgICAgc3BhY2VCZXR3ZWVuOiAyMCxcbiAgICAgICAgICBjZW50ZXJlZFNsaWRlczogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICBuYXZpZ2F0aW9uOiB7XG4gICAgICAgIG5leHRFbDogXCIuanMtcGhvdG9zLXNsaWRlciAuc3dpcGVyLWJ1dHRvbi1uZXh0XCIsXG4gICAgICAgIHByZXZFbDogXCIuanMtcGhvdG9zLXNsaWRlciAuc3dpcGVyLWJ1dHRvbi1wcmV2XCIsXG4gICAgICB9LFxuICAgICAgcGFnaW5hdGlvbjoge1xuICAgICAgICBlbDogJy5qcy1waG90b3Mtc2xpZGVyIC5zd2lwZXItcGFnaW5hdGlvbicsXG4gICAgICAgIGNsaWNrYWJsZTogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cblxuXG4gIC8vIFJldmlld3Mgc2xpZGVyXG4gIGNvbnN0IHJldmlld3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmpzLXJldmlld3Mtc2xpZGVyXCIpO1xuXG4gIGlmIChyZXZpZXdzKSB7XG4gICAgY29uc3QgbXlTd2lwZXIgPSBuZXcgU3dpcGVyKFwiLmpzLXJldmlld3Mtc2xpZGVyLnN3aXBlci1jb250YWluZXJcIiwge1xuICAgICAgZGlyZWN0aW9uOiBcImhvcml6b250YWxcIixcbiAgICAgIHNsaWRlc1BlclZpZXc6IDEsXG4gICAgICBzcGFjZUJldHdlZW46IDIwLFxuICAgICAgc3BlZWQ6IDQwMCxcbiAgICAgIGxvb3A6IHRydWUsXG4gICAgICBjZW50ZXJlZFNsaWRlczogdHJ1ZSxcbiAgICAgIGJyZWFrcG9pbnRzOiB7XG4gICAgICAgIDY4MDoge1xuICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDIsXG4gICAgICAgICAgc3BhY2VCZXR3ZWVuOiAxNSxcbiAgICAgICAgICBjZW50ZXJlZFNsaWRlczogZmFsc2UsXG4gICAgICAgIH0sXG4gICAgICAgIDc2Nzoge1xuICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDMsXG4gICAgICAgICAgc3BhY2VCZXR3ZWVuOiAxNSxcbiAgICAgICAgICBjZW50ZXJlZFNsaWRlczogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgICAgOTkxOiB7XG4gICAgICAgICAgc2xpZGVzUGVyVmlldzogMyxcbiAgICAgICAgICBzcGFjZUJldHdlZW46IDEyMCxcbiAgICAgICAgICBjZW50ZXJlZFNsaWRlczogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICBuYXZpZ2F0aW9uOiB7XG4gICAgICAgIG5leHRFbDogXCIuanMtcmV2aWV3cy1zbGlkZXIgLnN3aXBlci1idXR0b24tbmV4dFwiLFxuICAgICAgICBwcmV2RWw6IFwiLmpzLXJldmlld3Mtc2xpZGVyIC5zd2lwZXItYnV0dG9uLXByZXZcIixcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cblxuICAvLyBTZXJ0aWZpY2F0ZXMgc2xpZGVyXG4gIGNvbnN0IHNlcnRpZmljYXRlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuanMtc2VydGlmaWNhdGVzLXNsaWRlclwiKTtcblxuICBpZiAoc2VydGlmaWNhdGVzKSB7XG4gICAgY29uc3QgbXlTd2lwZXIgPSBuZXcgU3dpcGVyKFwiLmpzLXNlcnRpZmljYXRlcy1zbGlkZXIuc3dpcGVyLWNvbnRhaW5lclwiLCB7XG4gICAgICBkaXJlY3Rpb246IFwiaG9yaXpvbnRhbFwiLFxuICAgICAgc2xpZGVzUGVyVmlldzogMSxcbiAgICAgIHNwYWNlQmV0d2VlbjogMjAsXG4gICAgICBzcGVlZDogNDAwLFxuICAgICAgbG9vcDogdHJ1ZSxcbiAgICAgIGNlbnRlcmVkU2xpZGVzOiB0cnVlLFxuICAgICAgYnJlYWtwb2ludHM6IHtcbiAgICAgICAgNTAwOiB7XG4gICAgICAgICAgc2xpZGVzUGVyVmlldzogMixcbiAgICAgICAgICBzcGFjZUJldHdlZW46IDE1LFxuICAgICAgICAgIGNlbnRlcmVkU2xpZGVzOiBmYWxzZSxcbiAgICAgICAgfSxcbiAgICAgICAgNjgwOiB7XG4gICAgICAgICAgc2xpZGVzUGVyVmlldzogMyxcbiAgICAgICAgICBzcGFjZUJldHdlZW46IDE1LFxuICAgICAgICB9LFxuICAgICAgICA5OTE6IHtcbiAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAzLFxuICAgICAgICAgIHNwYWNlQmV0d2VlbjogMTIwLFxuICAgICAgICAgIGNlbnRlcmVkU2xpZGVzOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIG5hdmlnYXRpb246IHtcbiAgICAgICAgbmV4dEVsOiBcIi5qcy1zZXJ0aWZpY2F0ZXMtc2xpZGVyIC5zd2lwZXItYnV0dG9uLW5leHRcIixcbiAgICAgICAgcHJldkVsOiBcIi5qcy1zZXJ0aWZpY2F0ZXMtc2xpZGVyIC5zd2lwZXItYnV0dG9uLXByZXZcIixcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IHNsaWRlcnM7XG4iLCJjb25zdCBudW1iZXIgPSAoKSA9PiB7XG4gIC8v0KDQsNC30YDQtdGI0LDQtdGCINCy0LLQvtC0INGC0L7Qu9GM0LrQviDRhtC40YTRgCDQsiBpbnB1dFxuICBjb25zdCAkbnVtYmVycyA9ICQoXCIuanMtbnVtYmVyXCIpO1xuICBpZiAoISRudW1iZXJzKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgJG51bWJlcnMuZWFjaChmdW5jdGlvbigpIHtcbiAgICBjb25zdCAkdGhpc3MgPSAkKHRoaXMpO1xuXG4gICAgJHRoaXNzLm1hc2soJzAjJyk7XG4gIH0pO1xuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBudW1iZXI7XG4iLCJjb25zdCBidG5VcCA9ICgpID0+IHtcblxuICAkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKCkge1xuICAgIGlmICgkKHRoaXMpLnNjcm9sbFRvcCgpID4gMjAwKSB7XG4gICAgICAgIGlmICgkKCcjdXBidXR0b24nKS5pcygnOmhpZGRlbicpKSB7XG4gICAgICAgICAgICAkKCcjdXBidXR0b24nKS5jc3Moe29wYWNpdHkgOiAwLjl9KS5mYWRlSW4oJ2Zhc3QnKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7ICQoJyN1cGJ1dHRvbicpLnN0b3AodHJ1ZSwgZmFsc2UpLmZhZGVPdXQoJ2Zhc3QnKTsgfVxuICB9KTtcblxuICAkKCcjdXBidXR0b24nKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICQoJ2h0bWwsIGJvZHknKS5zdG9wKCkuYW5pbWF0ZSh7c2Nyb2xsVG9wIDogMH0sIDMwMCk7XG4gIH0pO1xuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBidG5VcDtcbiIsImNvbnN0IGFjY29yZGlvbiA9ICgpID0+IHtcbiAgY29uc3QgJGFjY29yZGlvbnMgPSAkKGAuYWNjb3JkaW9uX19pdGVtYCk7XG4gIGlmICghJGFjY29yZGlvbnMpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICAkYWNjb3JkaW9ucy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgIGNvbnN0ICR0aGlzcyA9ICQodGhpcyk7XG4gICAgY29uc3QgJHNpZGUgPSAkdGhpc3MuZmluZChgLmFjY29yZGlvbl9fbGFiZWxgKTtcbiAgICBjb25zdCAkbWFpbiA9ICR0aGlzcy5maW5kKGAuYWNjb3JkaW9uX19jb250ZW50YCk7XG5cbiAgICAkc2lkZS5vbihgY2xpY2tgLCAoZXZ0KSA9PiB7XG4gICAgICBldnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgaWYgKCRzaWRlLmhhc0NsYXNzKGBpcy1vcGVuYCkpIHtcbiAgICAgICAgJG1haW4uc2xpZGVVcChcInNsb3dcIik7XG4gICAgICAgICRzaWRlLnJlbW92ZUNsYXNzKGBpcy1vcGVuYCk7XG4gICAgICAgICRzaWRlLmJsdXIoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICRzaWRlLmFkZENsYXNzKGBpcy1vcGVuYCk7XG4gICAgICAgICRtYWluLnNsaWRlRG93bihcInNsb3dcIik7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBhY2NvcmRpb247XG4iLCJjb25zdCBnb29kUXVhbnRpdHkgPSAoKSA9PiB7XG4gIC8vINCj0LLQtdC70LjRh9C10L3QuNC1INC4INGD0LzQtdC90YzRiNC10L3QuNC1INGC0L7QstCw0YDQvtCyXG4gIGNvbnN0IGNvbnRhaW5lcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmpzLXF1YW50aXR5XCIpO1xuICBpZiAoY29udGFpbmVycy5sZW5ndGggPCAwKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29udGFpbmVycy5mb3JFYWNoKChjb250YWluZXIpID0+IHtcbiAgICBjb25zdCBpbnB1dCA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiaW5wdXRcIik7XG4gICAgY29uc3QgYnRuSW5jcmVhc2UgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcihcIi5qcy1pbmNyZWFzZVwiKTtcbiAgICBjb25zdCBidG5EZWNyZWFzZSA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiLmpzLWRlY3JlYXNlXCIpO1xuXG4gICAgbGV0IHZhbHVlO1xuXG4gICAgY29uc3QgYnRuSW5jcmVhc2VIYW5kbGVyID0gKCkgPT4ge1xuICAgICAgdmFsdWUgPSBpbnB1dC52YWx1ZTtcbiAgICAgIGxldCBuZXdWYWx1ZSA9ICsrdmFsdWU7XG5cbiAgICAgIGlmIChuZXdWYWx1ZSA+IDEpIHtcbiAgICAgICAgYnRuRGVjcmVhc2UucmVtb3ZlQXR0cmlidXRlKFwiZGlzYWJsZWRcIik7XG4gICAgICB9XG5cbiAgICAgIGlucHV0LnZhbHVlID0gbmV3VmFsdWU7XG4gICAgfTtcblxuICAgIGNvbnN0IGJ0bkRlY3JlYXNlSGFuZGxlciA9ICgpID0+IHtcbiAgICAgIHZhbHVlID0gaW5wdXQudmFsdWU7XG4gICAgICBsZXQgbmV3VmFsdWUgPSAtLXZhbHVlO1xuXG4gICAgICBpZiAobmV3VmFsdWUgPD0gMSkge1xuICAgICAgICBuZXdWYWx1ZSA9IDE7XG4gICAgICAgIGlucHV0LnZhbHVlID0gMTtcbiAgICAgICAgYnRuRGVjcmVhc2Uuc2V0QXR0cmlidXRlKFwiZGlzYWJsZWRcIiwgXCJkaXNhYmxlZFwiKTtcbiAgICAgIH1cblxuICAgICAgaW5wdXQudmFsdWUgPSBuZXdWYWx1ZTtcbiAgICB9O1xuXG4gICAgYnRuSW5jcmVhc2UuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGJ0bkluY3JlYXNlSGFuZGxlcik7XG4gICAgYnRuRGVjcmVhc2UuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGJ0bkRlY3JlYXNlSGFuZGxlcik7XG4gICAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBidG5JbmNyZWFzZUhhbmRsZXIoKTtcbiAgICAgIGJ0bkRlY3JlYXNlSGFuZGxlcigpO1xuICAgIH0pXG4gIH0pO1xuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBnb29kUXVhbnRpdHk7XG4iLCJjb25zdCBjb2xvcnNTZWxlY3QgPSAoKSA9PiB7XG4gIGNvbnN0IGNvbG9yc0Jsb2NrID0gJChcIi5jb2xvcnMtYmxvY2tcIik7XG4gIGlmICghY29sb3JzQmxvY2spIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBsaW5rcyA9IGNvbG9yc0Jsb2NrLmZpbmQoXCIuY29sb3JzLWJsb2NrX19pdGVtXCIpO1xuICBjb25zdCBwaWN0dXJlQmxvY2sgPSBjb2xvcnNCbG9jay5maW5kKFwiLmNvbG9ycy1ibG9ja19faW5mbyBpbWdcIik7XG4gIGNvbnN0IHRleHRCbG9jayA9IGNvbG9yc0Jsb2NrLmZpbmQoXCIuY29sb3JzLWJsb2NrX19pbmZvIHBcIik7XG5cbiAgbGlua3MuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgbGluayA9ICQodGhpcyk7XG5cbiAgICBsaW5rLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oZXZ0KSB7XG4gICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGxpbmtzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IHBpY3R1cmUgPSBsaW5rLmF0dHIoXCJkYXRhLWltZ1wiKTtcbiAgICAgIGNvbnN0IG5hbWUgPSBsaW5rLmZpbmQoXCJwXCIpLnRleHQoKTtcbiAgICAgIHBpY3R1cmVCbG9jay5hdHRyKFwic3JjXCIsIHBpY3R1cmUpO1xuICAgICAgdGV4dEJsb2NrLnRleHQobmFtZSk7XG5cbiAgICAgIGxpbmsuYWRkQ2xhc3MoXCJhY3RpdmVcIik7XG4gICAgfSlcbiAgfSk7XG5cblxufTtcblxuZXhwb3J0IGRlZmF1bHQgY29sb3JzU2VsZWN0O1xuIiwiY29uc3QgZm9vdGVyRm9ybSA9ICgpID0+IHtcbiAgY29uc3QgJGZvb3RlckZvcm0gPSAkKFwiLmZvb3RlciBmb3JtXCIpO1xuICBpZiAoISRmb290ZXJGb3JtKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgaW5wdXRzID0gJGZvb3RlckZvcm0uZmluZChcImlucHV0XCIpO1xuXG4gIGlucHV0cy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgIGNvbnN0IGlucHV0ID0gJCh0aGlzKTtcblxuICAgIGlucHV0Lm9uKFwiY2hhbmdlXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKGlucHV0LnZhbCgpICE9PSBgYCkge1xuICAgICAgICBpbnB1dC5hZGRDbGFzcyhcImhhcy12YWx1ZVwiKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlucHV0LnJlbW92ZUNsYXNzKFwiaGFzLXZhbHVlXCIpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcblxufTtcblxuZXhwb3J0IGRlZmF1bHQgZm9vdGVyRm9ybTtcbiIsImNvbnN0IGNhbGNTbGlkZXIgPSBmdW5jdGlvbiBjYWxjU2xpZGVyKCkge1xuICBjb25zdCBTd2lwZXIgPSB3aW5kb3cuU3dpcGVyO1xuICBjb25zdCBjb250YWluZXIgPSAkKFwiLmpzLWNhbGNcIik7XG5cbiAgaWYgKCFjb250YWluZXIpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBteVN3aXBlciA9IG5ldyBTd2lwZXIoXCIuanMtY2FsYyAuc3dpcGVyLWNvbnRhaW5lclwiLCB7XG4gICAgZGlyZWN0aW9uOiBcImhvcml6b250YWxcIixcbiAgICBzbGlkZXNQZXJWaWV3OiAxLFxuICAgIHNwYWNlQmV0d2VlbjogMCxcbiAgICBhbGxvd1RvdWNoTW92ZTogZmFsc2UsXG4gICAgc3BlZWQ6IDM1NSxcbiAgICBuYXZpZ2F0aW9uOiB7XG4gICAgICBuZXh0RWw6ICcuY2FsY19fYnRuLS1uZXh0JyxcbiAgICAgIHByZXZFbDogJy5jYWxjX19idG4tLXByZXYnXG4gICAgfSxcbiAgICBmYWRlRWZmZWN0OiB7XG4gICAgICBjcm9zc0ZhZGU6IHRydWUsXG4gICAgfSxcbiAgICBlZmZlY3Q6IFwiZmFkZVwiLFxuICB9KTtcblxuICBjb25zdCBidG5zID0gY29udGFpbmVyLmZpbmQoXCIuY2FsY19fYnRuXCIpO1xuICBjb25zdCBzdGVwc0xpbmtzID0gY29udGFpbmVyLmZpbmQoXCIuY2FsY19fc2lkZSBhXCIpO1xuXG4gIGNvbnN0IEluZGV4ZXMgPSB7XG4gICAgRklSU1RfU0xJREU6IGAwYCxcbiAgICBTRUNPTkRfU0xJREU6IGAxYCxcbiAgICBUSElSRF9TTElERTogYDJgXG4gIH1cblxuICAvLyDQn9C10YDQtdC60LvRjtGH0LDQtdGCINGI0LDQs9C4LCDQtdGB0LvQuCDQvdCw0LbQuNC80LDRjtGCINC60L3QvtC/0LrQuCDQvdCw0LLQuNCz0LDRhtC40LhcbiAgZnVuY3Rpb24gY2hhbmdlQWN0aXZlU3RlcChpbmRleCkge1xuICAgIHN0ZXBzTGlua3MuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgIGNvbnN0IGxpbmsgPSAkKHRoaXMpO1xuICAgICAgbGluay5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcbiAgICB9KTtcblxuICAgIGNvbnN0IHNsaWRlID0gY29udGFpbmVyLmZpbmQoXCIuc3dpcGVyLXNsaWRlLWFjdGl2ZVwiKTtcbiAgICAvLyBjb25zdCBpbmRleCA9IHNsaWRlLmF0dHIoXCJpbmRleFwiKTtcbiAgICBjb25zdCBhY3RpdmVTdGVwID0gJChzdGVwc0xpbmtzW2luZGV4XSk7XG4gICAgYWN0aXZlU3RlcC5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcbiAgfVxuXG4gIC8vINCf0LXRgNC10LrQu9GO0YfQsNC10YIg0LDQutGC0LjQstC90YvQuSDRgdC70LDQudC0LCDQtdGB0LvQuCDQvdCw0LbQuNC80LDRjtGCINC/0L4g0YHQsNC80LjQvCDRgdGB0YvQu9C60LDQvCDRiNCw0LPQvtCyXG4gIHN0ZXBzTGlua3MuZWFjaChmdW5jdGlvbigpIHtcbiAgICBjb25zdCBsaW5rID0gJCh0aGlzKTtcblxuICAgIGxpbmsub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgLy8g0J/RgNC+0LLQtdGA0Y/QtdGCIHZhbHVlINC40L3Qv9GD0YLQsCDQv9C+0LPQvtC90L3Ri9GFINC80LXRgtGA0L7QsiDQuCDQtNC10LvQsNC10YIg0LrQvdC+0L/QutGDIGRpc2FibGVkXG4gIGNvbnN0IHJ1bm5pbmdNZXRlcnNJbnB1dCA9IGNvbnRhaW5lci5maW5kKFwiLmpzLXJ1bm5pbmctbWV0ZXJzXCIpO1xuICBjb25zdCBidG5OZXh0ID0gY29udGFpbmVyLmZpbmQoXCIuanMtYnRuLW5leHRcIik7XG4gIGNvbnN0IGJ0blByZXYgPSBjb250YWluZXIuZmluZChcIi5qcy1idG4tcHJldlwiKTtcbiAgY29uc3QgZG9udEtub3dMaW5rID0gY29udGFpbmVyLmZpbmQoXCIuanMtZG9udC1rbm93XCIpO1xuICBjb25zdCBidG5Hb1RvQmFza2V0ID0gY29udGFpbmVyLmZpbmQoXCIuanMtZ28tdG8tYmFza2V0XCIpO1xuICBjb25zdCB3YWxsTGVuZ2h0T25lID0gY29udGFpbmVyLmZpbmQoXCIuanMtbGVuZ3RoLXdhbGwtMVwiKTtcbiAgY29uc3Qgd2FsbExlbmdodFR3byA9IGNvbnRhaW5lci5maW5kKFwiLmpzLWxlbmd0aC13YWxsLTJcIik7XG4gIGNvbnN0IHdhbGxIZWlnaHRPbmUgPSBjb250YWluZXIuZmluZChcIi5qcy1oZWlnaHQtd2FsbC0xXCIpO1xuICBjb25zdCBiYXJMZW5naHQgPSBjb250YWluZXIuZmluZChcIi5qcy1oZWlnaHQtYmFyXCIpO1xuXG4gIGZ1bmN0aW9uIGNoZWNrSW5wdXRWYWwoaW5wdXQpIHtcbiAgICBpZiAoaW5wdXQudmFsKCkgIT09IGBgKSB7XG4gICAgICBidG5OZXh0LnJlbW92ZUF0dHIoXCJkaXNhYmxlZFwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYnRuTmV4dC5hdHRyKFwiZGlzYWJsZWRcIiwgdHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgY2hlY2tJbnB1dFZhbChydW5uaW5nTWV0ZXJzSW5wdXQpO1xuICBydW5uaW5nTWV0ZXJzSW5wdXQub24oXCJpbnB1dFwiLCBmdW5jdGlvbigpIHtcbiAgICBjaGVja0lucHV0VmFsKHJ1bm5pbmdNZXRlcnNJbnB1dCk7XG4gIH0pO1xuXG4gIC8vINCa0L3QvtC/0LrQsCDQtNCw0LvQtdC1INC/0LXRgNC10LLQvtC00LjRgiDRgSDQv9C10YDQstC+0LPQviDRgdC70LDQudC00LAg0L3QsCDQv9C+0YHQu9C10LTQvdC40LlcbiAgZnVuY3Rpb24gZ29Ub0xhc3RTbGlkZSgpIHtcbiAgICBjb25zdCBzbGlkZSA9IGNvbnRhaW5lci5maW5kKFwiLnN3aXBlci1zbGlkZS1hY3RpdmVcIik7XG5cbiAgICBpZiAoc2xpZGUuYXR0cihcImluZGV4XCIpID09PSBJbmRleGVzLkZJUlNUX1NMSURFIHx8IHNsaWRlLmF0dHIoXCJpbmRleFwiKSA9PT0gSW5kZXhlcy5TRUNPTkRfU0xJREUpIHtcbiAgICAgIG15U3dpcGVyLnNsaWRlVG8oSW5kZXhlcy5USElSRF9TTElERSwgNDAwLCBmYWxzZSk7XG4gICAgfVxuICAgIGNoYW5nZUFjdGl2ZVN0ZXAoSW5kZXhlcy5USElSRF9TTElERSk7XG4gICAgYnRuTmV4dC5hZGRDbGFzcygnaGlkZScpO1xuICAgIGJ0bkdvVG9CYXNrZXQuYWRkQ2xhc3MoJ3Nob3cnKTtcbiAgfVxuICBidG5OZXh0Lm9uKFwiY2xpY2tcIiwgZ29Ub0xhc3RTbGlkZSk7XG5cbiAgLy8g0JrQvdC+0L/QutCwINC90LDQt9Cw0LQg0LLRgdC10LPQtNCwINC/0LXRgNC10LLQvtC00LjRgiDQvdCwIDEg0YHQu9Cw0LnQtFxuICBmdW5jdGlvbiBnb1RvRmlyc3RTbGlkZSgpIHtcbiAgICAkKFwiLmpzLWNhbGMgaW5wdXRcIikuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICQodGhpcykudmFsKGBgKTtcbiAgICB9KTtcbiAgICBjaGVja1NlY29uZFNsaWRlKCk7XG4gICAgY2hlY2tJbnB1dFZhbChydW5uaW5nTWV0ZXJzSW5wdXQpO1xuXG4gICAgbXlTd2lwZXIuc2xpZGVUbyhJbmRleGVzLkZJUlNUX1NMSURFLCA0MDAsIGZhbHNlKTtcbiAgICBjaGFuZ2VBY3RpdmVTdGVwKEluZGV4ZXMuRklSU1RfU0xJREUpO1xuXG4gICAgaWYgKGJ0bk5leHQuaGFzQ2xhc3MoJ2hpZGUnKSkge1xuICAgICAgYnRuTmV4dC5yZW1vdmVDbGFzcygnaGlkZScpO1xuICAgICAgYnRuR29Ub0Jhc2tldC5yZW1vdmVDbGFzcygnc2hvdycpO1xuICAgIH1cbiAgfVxuICBidG5QcmV2Lm9uKFwiY2xpY2tcIiwgZ29Ub0ZpcnN0U2xpZGUpO1xuXG4gIC8vINCh0YHRi9C70LrQsCBcItGPINC90LUg0LfQvdCw0Y4g0LzQtdGC0YDQsNC2XCIg0L/QtdGA0LXQstC+0LTQuNGCINC90LAgMiDRgdC70LDQudC0XG4gIGZ1bmN0aW9uIGdvVG9TZWNvbmRTbGlkZSgpIHtcbiAgICBydW5uaW5nTWV0ZXJzSW5wdXQudmFsKGBgKTtcbiAgICBjaGVja0lucHV0VmFsKHJ1bm5pbmdNZXRlcnNJbnB1dCk7XG4gICAgbXlTd2lwZXIuc2xpZGVUbyhJbmRleGVzLlNFQ09ORF9TTElERSwgNDAwLCBmYWxzZSk7XG4gICAgY2hhbmdlQWN0aXZlU3RlcChJbmRleGVzLlNFQ09ORF9TTElERSk7XG4gIH1cbiAgZG9udEtub3dMaW5rLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oZXZ0KSB7XG4gICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZ29Ub1NlY29uZFNsaWRlKCk7XG4gIH0pO1xuXG4gIC8vINCf0YDQvtCy0LXRgNGP0LXQvCDQt9Cw0L/QvtC70L3QtdC90L3QvtGB0YLRjCDQv9C+0LvQtdC5INC90LAgMiDRgdC70LDQudC00LVcbiAgZnVuY3Rpb24gY2hlY2tTZWNvbmRTbGlkZSgpIHtcbiAgICBpZiAod2FsbExlbmdodE9uZS52YWwoKSAhPT0gYGAgJiYgd2FsbExlbmdodFR3by52YWwoKSAhPT0gYGAgJiYgd2FsbEhlaWdodE9uZS52YWwoKSAhPT0gYGAgJiYgYmFyTGVuZ2h0LnZhbCgpICE9PSBgYCkge1xuICAgICAgYnRuTmV4dC5yZW1vdmVBdHRyKFwiZGlzYWJsZWRcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJ0bk5leHQuYXR0cihcImRpc2FibGVkXCIsIHRydWUpO1xuICAgIH1cbiAgfVxuICBjaGVja1NlY29uZFNsaWRlKCk7XG5cbiAgd2FsbExlbmdodE9uZS5vbihcImlucHV0XCIsIGNoZWNrU2Vjb25kU2xpZGUpO1xuICB3YWxsTGVuZ2h0VHdvLm9uKFwiaW5wdXRcIiwgY2hlY2tTZWNvbmRTbGlkZSk7XG4gIHdhbGxIZWlnaHRPbmUub24oXCJpbnB1dFwiLCBjaGVja1NlY29uZFNsaWRlKTtcbiAgYmFyTGVuZ2h0Lm9uKFwiaW5wdXRcIiwgY2hlY2tTZWNvbmRTbGlkZSk7XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNhbGNTbGlkZXI7XG4iLCJjb25zdCBhbmtvcnMgPSAoKSA9PiB7XG4gIGNvbnN0IGxpbmtzID0gJChcIi5qcy1hbmtvclwiKTtcbiAgaWYgKCFsaW5rcykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IHBhcnRuYW1lID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lO1xuXG4gIC8v0J/RgNC+0LLQtdGA0Y/QtdC8INC90LAgZG9jdW1lbnQucmVhZHkg0L3QsNC70LjRh9C40LUgI2hhc2h0YWcg0LIgdXJsLCDQuCDQtdGB0LvQuCDQtdGB0YLRjCwg0YHQutGA0L7Qu9C70LjQvCDQtNC+INC90YPQttC90L7QuSDRgdC10LrRhtC40LhcbiAgY29uc3QgY2hlY2tIYXNoID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKHdpbmRvdy5sb2NhdGlvbi5oYXNoKSB7XG4gICAgICBjb25zdCBoYXNoID0gd2luZG93LmxvY2F0aW9uLmhhc2g7XG5cbiAgICAgIGlmICgkKGhhc2gpLmxlbmd0aCkge1xuICAgICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcbiAgICAgICAgICAgICAgc2Nyb2xsVG9wOiAoJChoYXNoKS5vZmZzZXQoKS50b3AgLSA2MCksXG4gICAgICAgICAgfSwgOTAwLCAnc3dpbmcnKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgJChkb2N1bWVudCkucmVhZHkoY2hlY2tIYXNoKTtcblxuICAvLyDQndCwINC60L3QvtC/0LrQuCDQstC10YjQsNC10Lwg0L7QsdGA0LDQsdC+0YLRh9C40LrQuCDRgdC+0LHRi9GC0LjQuVxuICBsaW5rcy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICQodGhpcykub24oXCJjbGlja1wiLCBmdW5jdGlvbihldnQpIHtcbiAgICAgIC8vINCd0YPQttC90L4sINGH0YLQvtCx0Ysg0LzQtdC90Y4g0LfQsNC60YDRi9Cy0LDQu9C+0YHRjCDQuCDRgdGC0YDQsNC90LjRhtCwINGB0LrRgNC+0LvQu9C40LvQsNGB0Ywg0LTQviDRgdC10LrRhtC40LhcbiAgICAgIGlmICgkKFwiLm1lbnVcIikuaGFzQ2xhc3MoXCJpcy1zaG93XCIpKSB7XG5cbiAgICAgICAgJChcIi5tZW51XCIpLnJlbW92ZUNsYXNzKFwiaXMtc2hvd1wiKTtcbiAgICAgICAgJCgnYm9keScpLnJlbW92ZUNsYXNzKCdpcy1tZW51LW9wZW4nKS5yZW1vdmVBdHRyKCdkYXRhLXNjcm9sbCcpO1xuICAgICAgICBjaGVja0hhc2goKTtcblxuICAgICAgLy8g0J7QsdGL0YfQvdGL0Lkg0YHQutGA0LjQv9GCINGB0LrRgNC+0LvQu9CwINC00L4g0L3QtdC+0LHRhdC+0LTQuNC80L7QuSDRgdC10LrRhtC40Lgg0LIgZGF0YSDQsNGC0YDQuNCx0YPRgtC1INCx0LXQtyDQv9C10YDQtdC30LDQs9GA0YPQt9C60Lgg0YHRgtGA0LDQvdC40YbRi1xuICAgICAgfSBlbHNlIHtcblxuICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICB2YXIgaGFzaCA9ICQodGhpcykuYXR0cignZGF0YS1ocmVmJyk7XG5cbiAgICAgICAgaWYgKCQoaGFzaCkubGVuZ3RoKSB7XG4gICAgICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XG4gICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiAoJChoYXNoKS5vZmZzZXQoKS50b3AgLSAxMzApLFxuICAgICAgICAgICAgfSwgOTAwLCAnc3dpbmcnKTtcbiAgICAgICAgfVxuXG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAkKHRoaXMpLm9uKFwiZm9jdXNcIiwgZnVuY3Rpb24oZXZ0KSB7XG4gICAgICAvLyDQndGD0LbQvdC+LCDRh9GC0L7QsdGLINC80LXQvdGOINC30LDQutGA0YvQstCw0LvQvtGB0Ywg0Lgg0YHRgtGA0LDQvdC40YbQsCDRgdC60YDQvtC70LvQuNC70LDRgdGMINC00L4g0YHQtdC60YbQuNC4XG4gICAgICBpZiAoJChcIi5tZW51XCIpLmhhc0NsYXNzKFwiaXMtc2hvd1wiKSkge1xuXG4gICAgICAgICQoXCIubWVudVwiKS5yZW1vdmVDbGFzcyhcImlzLXNob3dcIik7XG4gICAgICAgICQoXCIuanMtb3Blbi1tZW51XCIpLnJlbW92ZUNsYXNzKFwiaXMtc2hvd1wiKTtcbiAgICAgICAgJCgnYm9keScpLnJlbW92ZUNsYXNzKCdpcy1tZW51LW9wZW4nKS5yZW1vdmVBdHRyKCdkYXRhLXNjcm9sbCcpO1xuICAgICAgICBjaGVja0hhc2goKTtcblxuICAgICAgLy8g0J7QsdGL0YfQvdGL0Lkg0YHQutGA0LjQv9GCINGB0LrRgNC+0LvQu9CwINC00L4g0L3QtdC+0LHRhdC+0LTQuNC80L7QuSDRgdC10LrRhtC40Lgg0LIgZGF0YSDQsNGC0YDQuNCx0YPRgtC1INCx0LXQtyDQv9C10YDQtdC30LDQs9GA0YPQt9C60Lgg0YHRgtGA0LDQvdC40YbRi1xuICAgICAgfSBlbHNlIHtcblxuICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICB2YXIgaGFzaCA9ICQodGhpcykuYXR0cignZGF0YS1ocmVmJyk7XG5cbiAgICAgICAgaWYgKCQoaGFzaCkubGVuZ3RoKSB7XG4gICAgICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XG4gICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiAoJChoYXNoKS5vZmZzZXQoKS50b3AgLSAxMzApLFxuICAgICAgICAgICAgfSwgOTAwLCAnc3dpbmcnKTtcbiAgICAgICAgfVxuXG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBhbmtvcnM7XG4iLCJpbXBvcnQgbm9kZUxpc3RGb3JFYWNoIGZyb20gJy4vbm9kZS1saXN0LWZvci1lYWNoJztcbmltcG9ydCB0ZWwgZnJvbSAnLi90ZWwnO1xuaW1wb3J0IGFuaW1hdGlvbiBmcm9tICcuL2FuaW1hdGlvbic7XG5pbXBvcnQgbWVudU9wZW4gZnJvbSAnLi9tZW51LW9wZW4nO1xuaW1wb3J0IG1vZGFsIGZyb20gJy4vbW9kYWwnO1xuaW1wb3J0IGhlYWRlclNjcm9sbCBmcm9tICcuL2hlYWRlcic7XG5pbXBvcnQgc2xpZGVycyBmcm9tICcuL3NsaWRlcnMnO1xuaW1wb3J0IG51bWJlciBmcm9tICcuL251bWJlcic7XG5pbXBvcnQgYnRuVXAgZnJvbSAnLi9idG4tdXAnO1xuaW1wb3J0IGFjY29yZGlvbiBmcm9tICcuL2FjY29yZGlvbic7XG5pbXBvcnQgZ29vZFF1YW50aXR5IGZyb20gJy4vZ29vZC1xdWFudGl0eSc7XG5pbXBvcnQgY29sb3JzU2VsZWN0IGZyb20gJy4vY29sb3JzLXNlbGVjdCc7XG5pbXBvcnQgZm9vdGVyRm9ybSBmcm9tICcuL2Zvb3Rlci1mb3JtJztcbmltcG9ydCBjYWxjU2xpZGVyIGZyb20gJy4vY2FsY3VsYXRvcic7XG5pbXBvcnQgYW5rb3JzIGZyb20gJy4vYW5rb3JzJztcblxuY2xhc3MgQXBwIHtcbiAgc3RhdGljIGluaXQoKSB7XG4gICAgbm9kZUxpc3RGb3JFYWNoKCk7XG4gICAgdGVsKCk7XG4gICAgYW5pbWF0aW9uKCk7XG4gICAgbWVudU9wZW4oKTtcbiAgICBoZWFkZXJTY3JvbGwoKTtcbiAgICBtb2RhbCgpO1xuICAgIHNsaWRlcnMoKTtcbiAgICBudW1iZXIoKTtcbiAgICBidG5VcCgpO1xuICAgIGFjY29yZGlvbigpO1xuICAgIGdvb2RRdWFudGl0eSgpO1xuICAgIGNvbG9yc1NlbGVjdCgpO1xuICAgIGZvb3RlckZvcm0oKTtcbiAgICBjYWxjU2xpZGVyKCk7XG4gICAgYW5rb3JzKCk7XG4gIH1cbn1cblxuXG5BcHAuaW5pdCgpO1xud2luZG93LkFwcCA9IEFwcDtcbiJdLCJuYW1lcyI6WyJub2RlTGlzdEZvckVhY2giLCJ3aW5kb3ciLCJOb2RlTGlzdCIsInByb3RvdHlwZSIsImZvckVhY2giLCJjYWxsYmFjayIsInRoaXNBcmciLCJpIiwibGVuZ3RoIiwiY2FsbCIsInRlbCIsImZvcm1CbG9ja3MiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmb3JtQmxvY2siLCJpbnB1dCIsInF1ZXJ5U2VsZWN0b3IiLCJwaG9uZU1hc2siLCJJTWFzayIsIm1hc2siLCJhbmltYXRpb24iLCJhbmltYXRpb25zIiwiV09XIiwiaW5pdCIsImJ0bnMiLCIkIiwiY2hlY2tUb3VjaERldmljZSIsImNyZWF0ZUV2ZW50IiwiZSIsImlzVG91Y2hEZXZpY2UiLCJlYWNoIiwiJGJ1dHRvbiIsIiRyaXBwbGVUZW1wbGF0ZSIsImNsYXNzIiwiYXBwZW5kIiwiJHJpcHBsZSIsImZpbmQiLCJvbiIsInBhcmVudE9mZnNldCIsIm9mZnNldCIsInJlbFgiLCJwYWdlWCIsImxlZnQiLCJyZWxZIiwicGFnZVkiLCJ0b3AiLCJjc3MiLCJ3aWR0aCIsImhlaWdodCIsInByb21vIiwicHJvbW9JbWdMZyIsInByb21vSW1nU20iLCJyZWFkeSIsInNldFRpbWVvdXQiLCJhZGRDbGFzcyIsIm1lbnVPcGVuIiwiJGJ1dHRvbnNNZW51IiwiJG1lbnUiLCIkYnV0dG9uQ2xvc2UiLCIkaGVhZGVyIiwiJGJ0biIsInNjcm9sbEhlYWRlciIsImhhc0NsYXNzIiwic2Nyb2xsVG9wIiwicmVtb3ZlQ2xhc3MiLCJjbGljayIsInBvcyIsInBhcnNlSW50IiwiYXR0ciIsInJlbW92ZUF0dHIiLCJzY3JvbGxUbyIsInBhZ2VQb3MiLCJtb2RhbCIsIiRidXR0b25zIiwiJGJvZHkiLCJvcHRpb25zIiwiaGlkZVNjcm9sbGJhciIsInRvdWNoIiwiYnRuVHBsIiwic21hbGxCdG4iLCJiZWZvcmVTaG93IiwiZGF0YSIsInNsaWNlIiwiYm9keVN0eWxlcyIsImFmdGVyQ2xvc2UiLCJmYW5jeWJveCIsImhlYWRlclNjcm9sbCIsIm1haW4iLCJpbnRyb1RvcCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsImNoZWNrSGVhZGVySGVpZ2h0IiwidmFsdWUiLCJvdXRlckhlaWdodCIsInNsaWRlcnMiLCJTd2lwZXIiLCJhZHZhbnRhZ2VzIiwibXlTd2lwZXIiLCJkaXJlY3Rpb24iLCJzbGlkZXNQZXJWaWV3Iiwic3BhY2VCZXR3ZWVuIiwic3BlZWQiLCJuYXZpZ2F0aW9uIiwibmV4dEVsIiwicHJldkVsIiwicGhvdG9zIiwibG9vcCIsImNlbnRlcmVkU2xpZGVzIiwiYnJlYWtwb2ludHMiLCJwYWdpbmF0aW9uIiwiZWwiLCJjbGlja2FibGUiLCJyZXZpZXdzIiwic2VydGlmaWNhdGVzIiwibnVtYmVyIiwiJG51bWJlcnMiLCIkdGhpc3MiLCJidG5VcCIsInNjcm9sbCIsImlzIiwib3BhY2l0eSIsImZhZGVJbiIsInN0b3AiLCJmYWRlT3V0IiwiYW5pbWF0ZSIsImFjY29yZGlvbiIsIiRhY2NvcmRpb25zIiwiJHNpZGUiLCIkbWFpbiIsImV2dCIsInByZXZlbnREZWZhdWx0Iiwic2xpZGVVcCIsImJsdXIiLCJzbGlkZURvd24iLCJnb29kUXVhbnRpdHkiLCJjb250YWluZXJzIiwiY29udGFpbmVyIiwiYnRuSW5jcmVhc2UiLCJidG5EZWNyZWFzZSIsImJ0bkluY3JlYXNlSGFuZGxlciIsIm5ld1ZhbHVlIiwicmVtb3ZlQXR0cmlidXRlIiwiYnRuRGVjcmVhc2VIYW5kbGVyIiwic2V0QXR0cmlidXRlIiwiYWRkRXZlbnRMaXN0ZW5lciIsImNvbG9yc1NlbGVjdCIsImNvbG9yc0Jsb2NrIiwibGlua3MiLCJwaWN0dXJlQmxvY2siLCJ0ZXh0QmxvY2siLCJsaW5rIiwicGljdHVyZSIsIm5hbWUiLCJ0ZXh0IiwiZm9vdGVyRm9ybSIsIiRmb290ZXJGb3JtIiwiaW5wdXRzIiwidmFsIiwiY2FsY1NsaWRlciIsImFsbG93VG91Y2hNb3ZlIiwiZmFkZUVmZmVjdCIsImNyb3NzRmFkZSIsImVmZmVjdCIsInN0ZXBzTGlua3MiLCJJbmRleGVzIiwiRklSU1RfU0xJREUiLCJTRUNPTkRfU0xJREUiLCJUSElSRF9TTElERSIsImNoYW5nZUFjdGl2ZVN0ZXAiLCJpbmRleCIsInNsaWRlIiwiYWN0aXZlU3RlcCIsInJ1bm5pbmdNZXRlcnNJbnB1dCIsImJ0bk5leHQiLCJidG5QcmV2IiwiZG9udEtub3dMaW5rIiwiYnRuR29Ub0Jhc2tldCIsIndhbGxMZW5naHRPbmUiLCJ3YWxsTGVuZ2h0VHdvIiwid2FsbEhlaWdodE9uZSIsImJhckxlbmdodCIsImNoZWNrSW5wdXRWYWwiLCJnb1RvTGFzdFNsaWRlIiwic2xpZGVUbyIsImdvVG9GaXJzdFNsaWRlIiwiY2hlY2tTZWNvbmRTbGlkZSIsImdvVG9TZWNvbmRTbGlkZSIsImFua29ycyIsInBhcnRuYW1lIiwi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
