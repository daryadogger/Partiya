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
      }

      checkHeaderHeight();
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
    var stepsLinks = container.find(".calc__side a"); // Переключает шаги, если нажимают кнопки навигации

    btns.each(function () {
      var btn = $(this);
      btn.on("click", function () {
        stepsLinks.each(function () {
          var link = $(this);
          link.removeClass("active");
        });
        var slide = container.find(".swiper-slide-active");
        var index = slide.attr("index");
        var activeStep = $(stepsLinks[index]);
        activeStep.addClass("active");
      });
    }); // Переключает активный слайд, если нажимают по самим ссылкам шагов

    stepsLinks.each(function () {
      var link = $(this);
      link.on("click", function (evt) {
        evt.preventDefault();
        stepsLinks.each(function () {
          $(this).removeClass("active");
        });
        link.addClass("active");
        var index = link.attr("index");
        mySwiper.slideTo(index, 400, false);
      });
    });
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsic3JjL2pzL25vZGUtbGlzdC1mb3ItZWFjaC5qcyIsInNyYy9qcy90ZWwuanMiLCJzcmMvanMvYW5pbWF0aW9uLmpzIiwic3JjL2pzL21lbnUtb3Blbi5qcyIsInNyYy9qcy9tb2RhbC5qcyIsInNyYy9qcy9oZWFkZXIuanMiLCJzcmMvanMvc2xpZGVycy5qcyIsInNyYy9qcy9udW1iZXIuanMiLCJzcmMvanMvYnRuLXVwLmpzIiwic3JjL2pzL2FjY29yZGlvbi5qcyIsInNyYy9qcy9nb29kLXF1YW50aXR5LmpzIiwic3JjL2pzL2NvbG9ycy1zZWxlY3QuanMiLCJzcmMvanMvZm9vdGVyLWZvcm0uanMiLCJzcmMvanMvY2FsY3VsYXRvci5qcyIsInNyYy9qcy9hbmtvcnMuanMiLCJzcmMvanMvbWFpbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBub2RlTGlzdEZvckVhY2ggPSAoKSA9PiB7XG4gIGlmICgnTm9kZUxpc3QnIGluIHdpbmRvdyAmJiAhTm9kZUxpc3QucHJvdG90eXBlLmZvckVhY2gpIHtcbiAgICBOb2RlTGlzdC5wcm90b3R5cGUuZm9yRWFjaCA9IGZ1bmN0aW9uIChjYWxsYmFjaywgdGhpc0FyZykge1xuICAgIHRoaXNBcmcgPSB0aGlzQXJnIHx8IHdpbmRvdztcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcbiAgICBjYWxsYmFjay5jYWxsKHRoaXNBcmcsIHRoaXNbaV0sIGksIHRoaXMpO1xuICAgIH1cbiAgICB9O1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBub2RlTGlzdEZvckVhY2g7XG4iLCJjb25zdCB0ZWwgPSAoKSA9PiB7XG4gIC8vIE1hc2sgZm9yIHRlbFxuICBjb25zdCBmb3JtQmxvY2tzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5maWVsZHNldFwiKTtcblxuICBpZiAoZm9ybUJsb2Nrcy5sZW5ndGgpIHtcblxuICAgIGZvcm1CbG9ja3MuZm9yRWFjaChmdW5jdGlvbihmb3JtQmxvY2spIHtcbiAgICAgIGNvbnN0IGlucHV0ID0gZm9ybUJsb2NrLnF1ZXJ5U2VsZWN0b3IoXCJpbnB1dFtuYW1lPXRlbF1cIik7XG5cbiAgICAgIGlmKGlucHV0KSB7XG4gICAgICAgIGNvbnN0IHBob25lTWFzayA9IElNYXNrKCBpbnB1dCwge1xuICAgICAgICAgIG1hc2s6IFwiK3s3fSAwMDAgMDAwLTAwLTAwXCJcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICB9KTtcblxuICB9XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IHRlbDtcbiIsImNvbnN0IGFuaW1hdGlvbiA9ICgpID0+IHtcbiAgLy93b3dcbiAgY29uc3QgYW5pbWF0aW9ucyA9IG5ldyB3aW5kb3cuV09XKCkuaW5pdCgpO1xuXG4gIC8vYnRuc1xuICBjb25zdCBidG5zID0gJChcIi5qcy1yaXBwbGVcIik7XG5cbiAgaWYgKGJ0bnMpIHtcbiAgICBmdW5jdGlvbiBjaGVja1RvdWNoRGV2aWNlKCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ1RvdWNoRXZlbnQnKTtcblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IGlzVG91Y2hEZXZpY2UgPSBjaGVja1RvdWNoRGV2aWNlKCk7XG5cbiAgICBpZiAoIWlzVG91Y2hEZXZpY2UpIHtcblxuICAgICAgYnRucy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICBsZXQgJGJ1dHRvbiA9ICQodGhpcyk7XG4gICAgICAgIGxldCAkcmlwcGxlVGVtcGxhdGUgPSAkKCc8c3BhbiAvPicsIHtcbiAgICAgICAgICBjbGFzczogJ2J1dHRvbl9fcmlwcGxlJyxcbiAgICAgICAgfSk7XG4gICAgICAgICRidXR0b24uYXBwZW5kKCRyaXBwbGVUZW1wbGF0ZSk7XG5cbiAgICAgICAgbGV0ICRyaXBwbGUgPSAkYnV0dG9uLmZpbmQoJy5idXR0b25fX3JpcHBsZScpO1xuXG4gICAgICAgICRidXR0b24ub24oJ21vdXNlZW50ZXInLCAnKicsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICBsZXQgcGFyZW50T2Zmc2V0ID0gJGJ1dHRvbi5vZmZzZXQoKTtcbiAgICAgICAgICBsZXQgcmVsWCA9IGUucGFnZVggLSBwYXJlbnRPZmZzZXQubGVmdDtcbiAgICAgICAgICBsZXQgcmVsWSA9IGUucGFnZVkgLSBwYXJlbnRPZmZzZXQudG9wO1xuXG4gICAgICAgICAgJHJpcHBsZS5jc3Moe1xuICAgICAgICAgICAgdG9wOiByZWxZLFxuICAgICAgICAgICAgbGVmdDogcmVsWCxcbiAgICAgICAgICAgIHdpZHRoOiAnMjI1JScsXG4gICAgICAgICAgICBoZWlnaHQ6ICRidXR0b24ud2lkdGgoKSAqIDIuMjUsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRidXR0b24ub24oJ21vdXNlb3V0JywgJyonLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgbGV0IHBhcmVudE9mZnNldCA9ICRidXR0b24ub2Zmc2V0KCk7XG4gICAgICAgICAgbGV0IHJlbFggPSBlLnBhZ2VYIC0gcGFyZW50T2Zmc2V0LmxlZnQ7XG4gICAgICAgICAgbGV0IHJlbFkgPSBlLnBhZ2VZIC0gcGFyZW50T2Zmc2V0LnRvcDtcbiAgICAgICAgICAkcmlwcGxlLmNzcyh7XG4gICAgICAgICAgICB0b3A6IHJlbFksXG4gICAgICAgICAgICBsZWZ0OiByZWxYLFxuICAgICAgICAgICAgd2lkdGg6IDAsXG4gICAgICAgICAgICBoZWlnaHQ6IDAsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICBcbiAgICB9XG4gIH1cblxuXG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGFuaW1hdGlvbjtcbiIsImNvbnN0IG1lbnVPcGVuID0gKCkgPT4ge1xuICAvLyDQntGC0LrRgNGL0YLQuNC1INC80L7QsSDQvNC10L3RjlxuICBjb25zdCAkYnV0dG9uc01lbnUgPSAkKFwiLmpzLW9wZW4tbWVudVwiKTtcblxuICBpZiAoJGJ1dHRvbnNNZW51Lmxlbmd0aCkge1xuICAgIGNvbnN0ICRtZW51ID0gJChcIi5tZW51XCIpO1xuICAgIGNvbnN0ICRidXR0b25DbG9zZSA9ICQoXCIuanMtYnRuLWNsb3NlXCIpO1xuICAgIGNvbnN0ICRoZWFkZXIgPSAkKFwiLmhlYWRlclwiKTtcblxuICAgICRidXR0b25zTWVudS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnN0ICRidG4gPSAkKHRoaXMpO1xuXG4gICAgICBjb25zdCBzY3JvbGxIZWFkZXIgPSAoKSA9PiB7XG4gICAgICAgIGlmICgkbWVudS5oYXNDbGFzcyhcImlzLXNob3dcIikpIHtcblxuICAgICAgICAgIGlmKCRtZW51LnNjcm9sbFRvcCgpID4gMSkge1xuICAgICAgICAgICAgJGhlYWRlci5hZGRDbGFzcyhcInNjcm9sbFwiKTtcblxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkaGVhZGVyLnJlbW92ZUNsYXNzKFwic2Nyb2xsXCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgJGJ0bi5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgLy8g0LXRgdC70Lgg0L7RgtC60YDRi9GC0L4g0LzQtdC90Y5cbiAgICAgICAgaWYgKCRtZW51Lmhhc0NsYXNzKFwiaXMtc2hvd1wiKSkge1xuXG4gICAgICAgICAgY29uc3QgcG9zID0gcGFyc2VJbnQoJChcImJvZHlcIikuYXR0cihcImRhdGEtc2Nyb2xsXCIpLCAxMCk7XG4gICAgICAgICAgJG1lbnUucmVtb3ZlQ2xhc3MoXCJpcy1zaG93XCIpO1xuICAgICAgICAgICRidG4ucmVtb3ZlQ2xhc3MoXCJpcy1zaG93XCIpO1xuICAgICAgICAgICRoZWFkZXIucmVtb3ZlQ2xhc3MoXCJzY3JvbGxcIik7XG5cbiAgICAgICAgICAkKFwiYm9keVwiKS5yZW1vdmVDbGFzcyhcImlzLW1lbnUtb3BlblwiKS5yZW1vdmVBdHRyKFwiZGF0YS1zY3JvbGxcIik7XG4gICAgICAgICAgd2luZG93LnNjcm9sbFRvKDAsIHBvcyk7XG5cbiAgICAgICAgICAvLyDQtdGB0LvQuCDQt9Cw0LrRgNGL0YLQviDQvNC10L3RjlxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgJG1lbnUuYWRkQ2xhc3MoXCJpcy1zaG93XCIpO1xuXG4gICAgICAgICAgaWYoJG1lbnUuc2Nyb2xsVG9wKCkgPiAxKSB7XG4gICAgICAgICAgICAkaGVhZGVyLmFkZENsYXNzKFwic2Nyb2xsXCIpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJGJ0bi5hZGRDbGFzcyhcImlzLXNob3dcIik7XG5cbiAgICAgICAgICB9LCAxMDApO1xuXG4gICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjb25zdCBwYWdlUG9zID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xuICAgICAgICAgICAgJChcImJvZHlcIikuYWRkQ2xhc3MoXCJpcy1tZW51LW9wZW5cIikuYXR0cihcImRhdGEtc2Nyb2xsXCIsIHBhZ2VQb3MpO1xuICAgICAgICAgIH0sIDQ1MCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICAkKFwiLm1lbnVcIikub24oXCJzY3JvbGxcIiwgc2Nyb2xsSGVhZGVyKTtcbiAgICB9KTtcblxuICAgICRidXR0b25DbG9zZS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zdCBwb3MgPSBwYXJzZUludCgkKFwiYm9keVwiKS5hdHRyKFwiZGF0YS1zY3JvbGxcIiksIDEwKTtcbiAgICAgICRtZW51LnJlbW92ZUNsYXNzKFwiaXMtc2hvd1wiKTtcbiAgICAgICRidXR0b25zTWVudS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc3QgJGJ0biA9ICQodGhpcyk7XG4gICAgICAgICRidG4ucmVtb3ZlQ2xhc3MoXCJpcy1zaG93XCIpO1xuICAgICAgfSk7XG5cbiAgICAgICQoXCJib2R5XCIpLnJlbW92ZUNsYXNzKFwiaXMtbWVudS1vcGVuXCIpLnJlbW92ZUF0dHIoXCJkYXRhLXNjcm9sbFwiKTtcbiAgICAgIHdpbmRvdy5zY3JvbGxUbygwLCBwb3MpO1xuICAgIH0pO1xuXG4gIH1cblxufTtcblxuZXhwb3J0IGRlZmF1bHQgbWVudU9wZW47XG4iLCJjb25zdCBtb2RhbCA9ICgpID0+IHtcbiAgY29uc3QgJGJ1dHRvbnMgPSAkKCdbanMtcG9wdXAtb3Blbl0nKTtcblxuICBpZiAoJGJ1dHRvbnMubGVuZ3RoKSB7XG4gICAgY29uc3QgJGJvZHkgPSAkKCdib2R5Jyk7XG5cbiAgICAkYnV0dG9ucy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgY29uc3QgJGJ1dHRvbiA9ICQodGhpcyk7XG4gICAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICBoaWRlU2Nyb2xsYmFyOiB0cnVlLFxuICAgICAgICB0b3VjaDogZmFsc2UsXG4gICAgICAgIGJ0blRwbCA6IHtcbiAgICAgICAgICBzbWFsbEJ0biA6ICcnXG4gICAgICAgIH0sXG4gICAgICAgIGJlZm9yZVNob3c6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIC8vICBBZGQgYW5vdGhlciBiZyBjb2xvclxuICAgICAgICAgICQoJy5mYW5jeWJveC1iZycpLmFkZENsYXNzKCRidXR0b24uZGF0YSgnc3JjJykuc2xpY2UoMSkpO1xuXG4gICAgICAgICAgY29uc3QgYm9keVN0eWxlcyA9IHtcbiAgICAgICAgICAgICdvdmVyZmxvdy15JzogJ2hpZGRlbicsXG4gICAgICAgICAgICAnbWFyZ2luJzogJzAgYXV0bydcbiAgICAgICAgICB9O1xuICAgICAgICAgICRib2R5LmNzcyhib2R5U3R5bGVzKTtcblxuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgJCgkYnV0dG9uLmRhdGEoJ3NyYycpKS5hZGRDbGFzcyhcInNob3dcIik7XG4gICAgICAgICAgfSwgMTAwKTtcbiAgICAgICAgfSxcbiAgICAgICAgYWZ0ZXJDbG9zZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgLy8gIEFkZCBhbm90aGVyIGJnIGNvbG9yXG4gICAgICAgICAgJCgnLmZhbmN5Ym94LWJnJykucmVtb3ZlQ2xhc3MoJGJ1dHRvbi5kYXRhKCdzcmMnKS5zbGljZSgxKSk7XG5cbiAgICAgICAgICBjb25zdCBib2R5U3R5bGVzID0ge1xuICAgICAgICAgICAgJ292ZXJmbG93LXknOiAndmlzaWJsZScsXG4gICAgICAgICAgICAncGFkZGluZy1yaWdodCc6IDAsXG4gICAgICAgICAgICAnbWFyZ2luJzogMFxuICAgICAgICAgIH07XG4gICAgICAgICAgJGJvZHkuY3NzKGJvZHlTdHlsZXMpO1xuXG4gICAgICAgICAgJCgkYnV0dG9uLmRhdGEoJ3NyYycpKS5yZW1vdmVDbGFzcyhcInNob3dcIik7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgICRidXR0b24uZmFuY3lib3gob3B0aW9ucyk7XG4gICAgfSk7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IG1vZGFsO1xuIiwiY29uc3QgaGVhZGVyU2Nyb2xsID0gKCkgPT4ge1xuICBjb25zdCBtYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIm1haW5cIik7XG5cbiAgY29uc3QgJGhlYWRlciA9ICQoXCIuaGVhZGVyXCIpO1xuXG4gIGlmICgkaGVhZGVyKSB7XG5cbiAgICAvLyBIZWFkZXIg0LzQtdC90Y/QtdGCINGG0LLQtdGC0LAg0L/RgNC4INGB0LrRgNC+0LvQu9C1LiDQntC9INGD0LbQtSBmaXhlZCDQuNC30L3QsNGH0LDQu9GM0L3QvlxuICAgIGNvbnN0IHNjcm9sbEhlYWRlciA9ICgpID0+IHtcbiAgICAgIGNvbnN0IGludHJvVG9wID0gbWFpbi5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3A7XG5cbiAgICAgIGlmIChpbnRyb1RvcCA8IC0xKSB7XG4gICAgICAgICRoZWFkZXIuYWRkQ2xhc3MoXCJzY3JvbGxcIik7XG5cbiAgICAgIH0gZWxzZSBpZiAoJGhlYWRlci5oYXNDbGFzcyhcInNjcm9sbFwiKSAmJiBpbnRyb1RvcCA+IC0xKSB7XG4gICAgICAgICRoZWFkZXIucmVtb3ZlQ2xhc3MoXCJzY3JvbGxcIik7XG4gICAgICB9XG4gICAgfTtcblxuICAgICQod2luZG93KS5vbihcInNjcm9sbFwiLCBzY3JvbGxIZWFkZXIpO1xuICAgICQoZG9jdW1lbnQpLm9uKFwicmVhZHlcIiwgc2Nyb2xsSGVhZGVyKTtcblxuXG4gICAgLy/QlNC+0LHQsNCy0LvRj9C10YIg0L7RgtGB0YLRg9C/INC90LAg0YHRgtGA0LDQvdC40YbQsNGFINC00LvRjyDRhNC40LrRgdC40YDQvtCy0LDQvdC90L7Qs9C+INGF0LXQtNC10YDQsFxuICAgIGZ1bmN0aW9uIGNoZWNrSGVhZGVySGVpZ2h0KCkge1xuICAgICAgY29uc3QgdmFsdWUgPSAkaGVhZGVyLm91dGVySGVpZ2h0KCk7XG4gICAgICBjb25zdCBtYWluID0gJChcIm1haW5cIik7XG5cbiAgICAgIG1haW4uY3NzKFwicGFkZGluZy10b3BcIiwgdmFsdWUpO1xuICAgIH1cbiAgICBjaGVja0hlYWRlckhlaWdodCgpO1xuXG4gICAgJCh3aW5kb3cpLm9uKFwicmVzaXplXCIsIGNoZWNrSGVhZGVySGVpZ2h0KTtcbiAgfVxuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBoZWFkZXJTY3JvbGw7XG4iLCJjb25zdCBzbGlkZXJzID0gKCkgPT4ge1xuICBjb25zdCBTd2lwZXIgPSB3aW5kb3cuU3dpcGVyO1xuXG4gIC8vIEFkdiBzbGlkZXJcbiAgY29uc3QgYWR2YW50YWdlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuanMtYWR2YW50YWdlcy1zbGlkZXJcIik7XG5cbiAgaWYgKGFkdmFudGFnZXMpIHtcbiAgICBjb25zdCBteVN3aXBlciA9IG5ldyBTd2lwZXIoXCIuanMtYWR2YW50YWdlcy1zbGlkZXIuc3dpcGVyLWNvbnRhaW5lclwiLCB7XG4gICAgICBkaXJlY3Rpb246IFwiaG9yaXpvbnRhbFwiLFxuICAgICAgc2xpZGVzUGVyVmlldzogMSxcbiAgICAgIHNwYWNlQmV0d2VlbjogMjAsXG4gICAgICBzcGVlZDogNDAwLFxuICAgICAgbmF2aWdhdGlvbjoge1xuICAgICAgICBuZXh0RWw6IFwiLmpzLWFkdmFudGFnZXMtc2xpZGVyIC5zd2lwZXItYnV0dG9uLW5leHRcIixcbiAgICAgICAgcHJldkVsOiBcIi5qcy1hZHZhbnRhZ2VzLXNsaWRlciAuc3dpcGVyLWJ1dHRvbi1wcmV2XCIsXG4gICAgICB9LFxuICAgIH0pO1xuICB9XG5cbiAgLy8gUGhvdG9zIHNsaWRlclxuICBjb25zdCBwaG90b3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmpzLXBob3Rvcy1zbGlkZXJcIik7XG5cbiAgaWYgKHBob3Rvcykge1xuICAgIGNvbnN0IG15U3dpcGVyID0gbmV3IFN3aXBlcihcIi5qcy1waG90b3Mtc2xpZGVyLnN3aXBlci1jb250YWluZXJcIiwge1xuICAgICAgZGlyZWN0aW9uOiBcImhvcml6b250YWxcIixcbiAgICAgIHNsaWRlc1BlclZpZXc6IDEsXG4gICAgICBzcGFjZUJldHdlZW46IDIwLFxuICAgICAgc3BlZWQ6IDQwMCxcbiAgICAgIGxvb3A6IHRydWUsXG4gICAgICBjZW50ZXJlZFNsaWRlczogZmFsc2UsXG4gICAgICBicmVha3BvaW50czoge1xuICAgICAgICA3Njc6IHtcbiAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAyLFxuICAgICAgICAgIHNwYWNlQmV0d2VlbjogMjAsXG4gICAgICAgICAgY2VudGVyZWRTbGlkZXM6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgbmF2aWdhdGlvbjoge1xuICAgICAgICBuZXh0RWw6IFwiLmpzLXBob3Rvcy1zbGlkZXIgLnN3aXBlci1idXR0b24tbmV4dFwiLFxuICAgICAgICBwcmV2RWw6IFwiLmpzLXBob3Rvcy1zbGlkZXIgLnN3aXBlci1idXR0b24tcHJldlwiLFxuICAgICAgfSxcbiAgICAgIHBhZ2luYXRpb246IHtcbiAgICAgICAgZWw6ICcuanMtcGhvdG9zLXNsaWRlciAuc3dpcGVyLXBhZ2luYXRpb24nLFxuICAgICAgICBjbGlja2FibGU6IHRydWUsXG4gICAgICB9LFxuICAgIH0pO1xuICB9XG5cblxuICAvLyBSZXZpZXdzIHNsaWRlclxuICBjb25zdCByZXZpZXdzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5qcy1yZXZpZXdzLXNsaWRlclwiKTtcblxuICBpZiAocmV2aWV3cykge1xuICAgIGNvbnN0IG15U3dpcGVyID0gbmV3IFN3aXBlcihcIi5qcy1yZXZpZXdzLXNsaWRlci5zd2lwZXItY29udGFpbmVyXCIsIHtcbiAgICAgIGRpcmVjdGlvbjogXCJob3Jpem9udGFsXCIsXG4gICAgICBzbGlkZXNQZXJWaWV3OiAxLFxuICAgICAgc3BhY2VCZXR3ZWVuOiAyMCxcbiAgICAgIHNwZWVkOiA0MDAsXG4gICAgICBsb29wOiB0cnVlLFxuICAgICAgY2VudGVyZWRTbGlkZXM6IHRydWUsXG4gICAgICBicmVha3BvaW50czoge1xuICAgICAgICA2ODA6IHtcbiAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAyLFxuICAgICAgICAgIHNwYWNlQmV0d2VlbjogMTUsXG4gICAgICAgICAgY2VudGVyZWRTbGlkZXM6IGZhbHNlLFxuICAgICAgICB9LFxuICAgICAgICA3Njc6IHtcbiAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAzLFxuICAgICAgICAgIHNwYWNlQmV0d2VlbjogMTUsXG4gICAgICAgICAgY2VudGVyZWRTbGlkZXM6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICAgIDk5MToge1xuICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDMsXG4gICAgICAgICAgc3BhY2VCZXR3ZWVuOiAxMjAsXG4gICAgICAgICAgY2VudGVyZWRTbGlkZXM6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgbmF2aWdhdGlvbjoge1xuICAgICAgICBuZXh0RWw6IFwiLmpzLXJldmlld3Mtc2xpZGVyIC5zd2lwZXItYnV0dG9uLW5leHRcIixcbiAgICAgICAgcHJldkVsOiBcIi5qcy1yZXZpZXdzLXNsaWRlciAuc3dpcGVyLWJ1dHRvbi1wcmV2XCIsXG4gICAgICB9LFxuICAgIH0pO1xuICB9XG5cbiAgLy8gU2VydGlmaWNhdGVzIHNsaWRlclxuICBjb25zdCBzZXJ0aWZpY2F0ZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmpzLXNlcnRpZmljYXRlcy1zbGlkZXJcIik7XG5cbiAgaWYgKHNlcnRpZmljYXRlcykge1xuICAgIGNvbnN0IG15U3dpcGVyID0gbmV3IFN3aXBlcihcIi5qcy1zZXJ0aWZpY2F0ZXMtc2xpZGVyLnN3aXBlci1jb250YWluZXJcIiwge1xuICAgICAgZGlyZWN0aW9uOiBcImhvcml6b250YWxcIixcbiAgICAgIHNsaWRlc1BlclZpZXc6IDEsXG4gICAgICBzcGFjZUJldHdlZW46IDIwLFxuICAgICAgc3BlZWQ6IDQwMCxcbiAgICAgIGxvb3A6IHRydWUsXG4gICAgICBjZW50ZXJlZFNsaWRlczogdHJ1ZSxcbiAgICAgIGJyZWFrcG9pbnRzOiB7XG4gICAgICAgIDUwMDoge1xuICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDIsXG4gICAgICAgICAgc3BhY2VCZXR3ZWVuOiAxNSxcbiAgICAgICAgICBjZW50ZXJlZFNsaWRlczogZmFsc2UsXG4gICAgICAgIH0sXG4gICAgICAgIDY4MDoge1xuICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDMsXG4gICAgICAgICAgc3BhY2VCZXR3ZWVuOiAxNSxcbiAgICAgICAgfSxcbiAgICAgICAgOTkxOiB7XG4gICAgICAgICAgc2xpZGVzUGVyVmlldzogMyxcbiAgICAgICAgICBzcGFjZUJldHdlZW46IDEyMCxcbiAgICAgICAgICBjZW50ZXJlZFNsaWRlczogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICBuYXZpZ2F0aW9uOiB7XG4gICAgICAgIG5leHRFbDogXCIuanMtc2VydGlmaWNhdGVzLXNsaWRlciAuc3dpcGVyLWJ1dHRvbi1uZXh0XCIsXG4gICAgICAgIHByZXZFbDogXCIuanMtc2VydGlmaWNhdGVzLXNsaWRlciAuc3dpcGVyLWJ1dHRvbi1wcmV2XCIsXG4gICAgICB9LFxuICAgIH0pO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBzbGlkZXJzO1xuIiwiY29uc3QgbnVtYmVyID0gKCkgPT4ge1xuICAvL9Cg0LDQt9GA0LXRiNCw0LXRgiDQstCy0L7QtCDRgtC+0LvRjNC60L4g0YbQuNGE0YAg0LIgaW5wdXRcbiAgY29uc3QgJG51bWJlcnMgPSAkKFwiLmpzLW51bWJlclwiKTtcbiAgaWYgKCEkbnVtYmVycykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gICRudW1iZXJzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgY29uc3QgJHRoaXNzID0gJCh0aGlzKTtcblxuICAgICR0aGlzcy5tYXNrKCcwIycpO1xuICB9KTtcblxufTtcblxuZXhwb3J0IGRlZmF1bHQgbnVtYmVyO1xuIiwiY29uc3QgYnRuVXAgPSAoKSA9PiB7XG5cbiAgJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbigpIHtcbiAgICBpZiAoJCh0aGlzKS5zY3JvbGxUb3AoKSA+IDIwMCkge1xuICAgICAgICBpZiAoJCgnI3VwYnV0dG9uJykuaXMoJzpoaWRkZW4nKSkge1xuICAgICAgICAgICAgJCgnI3VwYnV0dG9uJykuY3NzKHtvcGFjaXR5IDogMC45fSkuZmFkZUluKCdmYXN0Jyk7XG4gICAgICAgIH1cbiAgICB9IGVsc2UgeyAkKCcjdXBidXR0b24nKS5zdG9wKHRydWUsIGZhbHNlKS5mYWRlT3V0KCdmYXN0Jyk7IH1cbiAgfSk7XG5cbiAgJCgnI3VwYnV0dG9uJykuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAkKCdodG1sLCBib2R5Jykuc3RvcCgpLmFuaW1hdGUoe3Njcm9sbFRvcCA6IDB9LCAzMDApO1xuICB9KTtcblxufTtcblxuZXhwb3J0IGRlZmF1bHQgYnRuVXA7XG4iLCJjb25zdCBhY2NvcmRpb24gPSAoKSA9PiB7XG4gIGNvbnN0ICRhY2NvcmRpb25zID0gJChgLmFjY29yZGlvbl9faXRlbWApO1xuICBpZiAoISRhY2NvcmRpb25zKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgJGFjY29yZGlvbnMuZWFjaChmdW5jdGlvbigpIHtcbiAgICBjb25zdCAkdGhpc3MgPSAkKHRoaXMpO1xuICAgIGNvbnN0ICRzaWRlID0gJHRoaXNzLmZpbmQoYC5hY2NvcmRpb25fX2xhYmVsYCk7XG4gICAgY29uc3QgJG1haW4gPSAkdGhpc3MuZmluZChgLmFjY29yZGlvbl9fY29udGVudGApO1xuXG4gICAgJHNpZGUub24oYGNsaWNrYCwgKGV2dCkgPT4ge1xuICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgIGlmICgkc2lkZS5oYXNDbGFzcyhgaXMtb3BlbmApKSB7XG4gICAgICAgICRtYWluLnNsaWRlVXAoXCJzbG93XCIpO1xuICAgICAgICAkc2lkZS5yZW1vdmVDbGFzcyhgaXMtb3BlbmApO1xuICAgICAgICAkc2lkZS5ibHVyKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkc2lkZS5hZGRDbGFzcyhgaXMtb3BlbmApO1xuICAgICAgICAkbWFpbi5zbGlkZURvd24oXCJzbG93XCIpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcblxufTtcblxuZXhwb3J0IGRlZmF1bHQgYWNjb3JkaW9uO1xuIiwiY29uc3QgZ29vZFF1YW50aXR5ID0gKCkgPT4ge1xuICAvLyDQo9Cy0LXQu9C40YfQtdC90LjQtSDQuCDRg9C80LXQvdGM0YjQtdC90LjQtSDRgtC+0LLQsNGA0L7QslxuICBjb25zdCBjb250YWluZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5qcy1xdWFudGl0eVwiKTtcbiAgaWYgKGNvbnRhaW5lcnMubGVuZ3RoIDwgMCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnRhaW5lcnMuZm9yRWFjaCgoY29udGFpbmVyKSA9PiB7XG4gICAgY29uc3QgaW5wdXQgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcihcImlucHV0XCIpO1xuICAgIGNvbnN0IGJ0bkluY3JlYXNlID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCIuanMtaW5jcmVhc2VcIik7XG4gICAgY29uc3QgYnRuRGVjcmVhc2UgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcihcIi5qcy1kZWNyZWFzZVwiKTtcblxuICAgIGxldCB2YWx1ZTtcblxuICAgIGNvbnN0IGJ0bkluY3JlYXNlSGFuZGxlciA9ICgpID0+IHtcbiAgICAgIHZhbHVlID0gaW5wdXQudmFsdWU7XG4gICAgICBsZXQgbmV3VmFsdWUgPSArK3ZhbHVlO1xuXG4gICAgICBpZiAobmV3VmFsdWUgPiAxKSB7XG4gICAgICAgIGJ0bkRlY3JlYXNlLnJlbW92ZUF0dHJpYnV0ZShcImRpc2FibGVkXCIpO1xuICAgICAgfVxuXG4gICAgICBpbnB1dC52YWx1ZSA9IG5ld1ZhbHVlO1xuICAgIH07XG5cbiAgICBjb25zdCBidG5EZWNyZWFzZUhhbmRsZXIgPSAoKSA9PiB7XG4gICAgICB2YWx1ZSA9IGlucHV0LnZhbHVlO1xuICAgICAgbGV0IG5ld1ZhbHVlID0gLS12YWx1ZTtcblxuICAgICAgaWYgKG5ld1ZhbHVlIDw9IDEpIHtcbiAgICAgICAgbmV3VmFsdWUgPSAxO1xuICAgICAgICBpbnB1dC52YWx1ZSA9IDE7XG4gICAgICAgIGJ0bkRlY3JlYXNlLnNldEF0dHJpYnV0ZShcImRpc2FibGVkXCIsIFwiZGlzYWJsZWRcIik7XG4gICAgICB9XG5cbiAgICAgIGlucHV0LnZhbHVlID0gbmV3VmFsdWU7XG4gICAgfTtcblxuICAgIGJ0bkluY3JlYXNlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBidG5JbmNyZWFzZUhhbmRsZXIpO1xuICAgIGJ0bkRlY3JlYXNlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBidG5EZWNyZWFzZUhhbmRsZXIpO1xuICAgIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgYnRuSW5jcmVhc2VIYW5kbGVyKCk7XG4gICAgICBidG5EZWNyZWFzZUhhbmRsZXIoKTtcbiAgICB9KVxuICB9KTtcblxufTtcblxuZXhwb3J0IGRlZmF1bHQgZ29vZFF1YW50aXR5O1xuIiwiY29uc3QgY29sb3JzU2VsZWN0ID0gKCkgPT4ge1xuICBjb25zdCBjb2xvcnNCbG9jayA9ICQoXCIuY29sb3JzLWJsb2NrXCIpO1xuICBpZiAoIWNvbG9yc0Jsb2NrKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgbGlua3MgPSBjb2xvcnNCbG9jay5maW5kKFwiLmNvbG9ycy1ibG9ja19faXRlbVwiKTtcbiAgY29uc3QgcGljdHVyZUJsb2NrID0gY29sb3JzQmxvY2suZmluZChcIi5jb2xvcnMtYmxvY2tfX2luZm8gaW1nXCIpO1xuICBjb25zdCB0ZXh0QmxvY2sgPSBjb2xvcnNCbG9jay5maW5kKFwiLmNvbG9ycy1ibG9ja19faW5mbyBwXCIpO1xuXG4gIGxpbmtzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IGxpbmsgPSAkKHRoaXMpO1xuXG4gICAgbGluay5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKGV2dCkge1xuICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBsaW5rcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBwaWN0dXJlID0gbGluay5hdHRyKFwiZGF0YS1pbWdcIik7XG4gICAgICBjb25zdCBuYW1lID0gbGluay5maW5kKFwicFwiKS50ZXh0KCk7XG4gICAgICBwaWN0dXJlQmxvY2suYXR0cihcInNyY1wiLCBwaWN0dXJlKTtcbiAgICAgIHRleHRCbG9jay50ZXh0KG5hbWUpO1xuXG4gICAgICBsaW5rLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xuICAgIH0pXG4gIH0pO1xuXG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbG9yc1NlbGVjdDtcbiIsImNvbnN0IGZvb3RlckZvcm0gPSAoKSA9PiB7XG4gIGNvbnN0ICRmb290ZXJGb3JtID0gJChcIi5mb290ZXIgZm9ybVwiKTtcbiAgaWYgKCEkZm9vdGVyRm9ybSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IGlucHV0cyA9ICRmb290ZXJGb3JtLmZpbmQoXCJpbnB1dFwiKTtcblxuICBpbnB1dHMuZWFjaChmdW5jdGlvbigpIHtcbiAgICBjb25zdCBpbnB1dCA9ICQodGhpcyk7XG5cbiAgICBpbnB1dC5vbihcImNoYW5nZVwiLCBmdW5jdGlvbigpIHtcbiAgICAgIGlmIChpbnB1dC52YWwoKSAhPT0gYGApIHtcbiAgICAgICAgaW5wdXQuYWRkQ2xhc3MoXCJoYXMtdmFsdWVcIik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpbnB1dC5yZW1vdmVDbGFzcyhcImhhcy12YWx1ZVwiKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZvb3RlckZvcm07XG4iLCJjb25zdCBjYWxjU2xpZGVyID0gZnVuY3Rpb24gY2FsY1NsaWRlcigpIHtcbiAgY29uc3QgU3dpcGVyID0gd2luZG93LlN3aXBlcjtcbiAgY29uc3QgY29udGFpbmVyID0gJChcIi5qcy1jYWxjXCIpO1xuXG4gIGlmICghY29udGFpbmVyKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgbXlTd2lwZXIgPSBuZXcgU3dpcGVyKFwiLmpzLWNhbGMgLnN3aXBlci1jb250YWluZXJcIiwge1xuICAgIGRpcmVjdGlvbjogXCJob3Jpem9udGFsXCIsXG4gICAgc2xpZGVzUGVyVmlldzogMSxcbiAgICBzcGFjZUJldHdlZW46IDAsXG4gICAgYWxsb3dUb3VjaE1vdmU6IGZhbHNlLFxuICAgIHNwZWVkOiAzNTUsXG4gICAgbmF2aWdhdGlvbjoge1xuICAgICAgbmV4dEVsOiAnLmNhbGNfX2J0bi0tbmV4dCcsXG4gICAgICBwcmV2RWw6ICcuY2FsY19fYnRuLS1wcmV2J1xuICAgIH0sXG4gICAgZmFkZUVmZmVjdDoge1xuICAgICAgY3Jvc3NGYWRlOiB0cnVlLFxuICAgIH0sXG4gICAgZWZmZWN0OiBcImZhZGVcIixcbiAgfSk7XG5cbiAgY29uc3QgYnRucyA9IGNvbnRhaW5lci5maW5kKFwiLmNhbGNfX2J0blwiKTtcbiAgY29uc3Qgc3RlcHNMaW5rcyA9IGNvbnRhaW5lci5maW5kKFwiLmNhbGNfX3NpZGUgYVwiKTtcblxuICAvLyDQn9C10YDQtdC60LvRjtGH0LDQtdGCINGI0LDQs9C4LCDQtdGB0LvQuCDQvdCw0LbQuNC80LDRjtGCINC60L3QvtC/0LrQuCDQvdCw0LLQuNCz0LDRhtC40LhcbiAgYnRucy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgIGNvbnN0IGJ0biA9ICQodGhpcyk7XG5cbiAgICBidG4ub24oXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcbiAgICAgIHN0ZXBzTGlua3MuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc3QgbGluayA9ICQodGhpcyk7XG4gICAgICAgIGxpbmsucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XG4gICAgICB9KTtcblxuICAgICAgY29uc3Qgc2xpZGUgPSBjb250YWluZXIuZmluZChcIi5zd2lwZXItc2xpZGUtYWN0aXZlXCIpO1xuICAgICAgY29uc3QgaW5kZXggPSBzbGlkZS5hdHRyKFwiaW5kZXhcIik7XG4gICAgICBjb25zdCBhY3RpdmVTdGVwID0gJChzdGVwc0xpbmtzW2luZGV4XSk7XG4gICAgICBhY3RpdmVTdGVwLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xuICAgIH0pO1xuICB9KTtcblxuICAvLyDQn9C10YDQtdC60LvRjtGH0LDQtdGCINCw0LrRgtC40LLQvdGL0Lkg0YHQu9Cw0LnQtCwg0LXRgdC70Lgg0L3QsNC20LjQvNCw0Y7RgiDQv9C+INGB0LDQvNC40Lwg0YHRgdGL0LvQutCw0Lwg0YjQsNCz0L7QslxuICBzdGVwc0xpbmtzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgY29uc3QgbGluayA9ICQodGhpcyk7XG5cbiAgICBsaW5rLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGV2dCkge1xuICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgIHN0ZXBzTGlua3MuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XG4gICAgICB9KTtcblxuICAgICAgbGluay5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcbiAgICAgIGNvbnN0IGluZGV4ID0gbGluay5hdHRyKFwiaW5kZXhcIik7XG4gICAgICBteVN3aXBlci5zbGlkZVRvKGluZGV4LCA0MDAsIGZhbHNlKTtcbiAgICB9KTtcbiAgfSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjYWxjU2xpZGVyO1xuIiwiY29uc3QgYW5rb3JzID0gKCkgPT4ge1xuICBjb25zdCBsaW5rcyA9ICQoXCIuanMtYW5rb3JcIik7XG4gIGlmICghbGlua3MpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBwYXJ0bmFtZSA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZTtcblxuICAvL9Cf0YDQvtCy0LXRgNGP0LXQvCDQvdCwIGRvY3VtZW50LnJlYWR5INC90LDQu9C40YfQuNC1ICNoYXNodGFnINCyIHVybCwg0Lgg0LXRgdC70Lgg0LXRgdGC0YwsINGB0LrRgNC+0LvQu9C40Lwg0LTQviDQvdGD0LbQvdC+0Lkg0YHQtdC60YbQuNC4XG4gIGNvbnN0IGNoZWNrSGFzaCA9IGZ1bmN0aW9uKCkge1xuICAgIGlmICh3aW5kb3cubG9jYXRpb24uaGFzaCkge1xuICAgICAgY29uc3QgaGFzaCA9IHdpbmRvdy5sb2NhdGlvbi5oYXNoO1xuXG4gICAgICBpZiAoJChoYXNoKS5sZW5ndGgpIHtcbiAgICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XG4gICAgICAgICAgICAgIHNjcm9sbFRvcDogKCQoaGFzaCkub2Zmc2V0KCkudG9wIC0gNjApLFxuICAgICAgICAgIH0sIDkwMCwgJ3N3aW5nJyk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gICQoZG9jdW1lbnQpLnJlYWR5KGNoZWNrSGFzaCk7XG5cbiAgLy8g0J3QsCDQutC90L7Qv9C60Lgg0LLQtdGI0LDQtdC8INC+0LHRgNCw0LHQvtGC0YfQuNC60Lgg0YHQvtCx0YvRgtC40LlcbiAgbGlua3MuZWFjaChmdW5jdGlvbigpIHtcbiAgICAkKHRoaXMpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oZXZ0KSB7XG4gICAgICAvLyDQndGD0LbQvdC+LCDRh9GC0L7QsdGLINC80LXQvdGOINC30LDQutGA0YvQstCw0LvQvtGB0Ywg0Lgg0YHRgtGA0LDQvdC40YbQsCDRgdC60YDQvtC70LvQuNC70LDRgdGMINC00L4g0YHQtdC60YbQuNC4XG4gICAgICBpZiAoJChcIi5tZW51XCIpLmhhc0NsYXNzKFwiaXMtc2hvd1wiKSkge1xuXG4gICAgICAgICQoXCIubWVudVwiKS5yZW1vdmVDbGFzcyhcImlzLXNob3dcIik7XG4gICAgICAgICQoJ2JvZHknKS5yZW1vdmVDbGFzcygnaXMtbWVudS1vcGVuJykucmVtb3ZlQXR0cignZGF0YS1zY3JvbGwnKTtcbiAgICAgICAgY2hlY2tIYXNoKCk7XG5cbiAgICAgIC8vINCe0LHRi9GH0L3Ri9C5INGB0LrRgNC40L/RgiDRgdC60YDQvtC70LvQsCDQtNC+INC90LXQvtCx0YXQvtC00LjQvNC+0Lkg0YHQtdC60YbQuNC4INCyIGRhdGEg0LDRgtGA0LjQsdGD0YLQtSDQsdC10Lcg0L/QtdGA0LXQt9Cw0LPRgNGD0LfQutC4INGB0YLRgNCw0L3QuNGG0YtcbiAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgdmFyIGhhc2ggPSAkKHRoaXMpLmF0dHIoJ2RhdGEtaHJlZicpO1xuXG4gICAgICAgIGlmICgkKGhhc2gpLmxlbmd0aCkge1xuICAgICAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xuICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogKCQoaGFzaCkub2Zmc2V0KCkudG9wIC0gMTMwKSxcbiAgICAgICAgICAgIH0sIDkwMCwgJ3N3aW5nJyk7XG4gICAgICAgIH1cblxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgJCh0aGlzKS5vbihcImZvY3VzXCIsIGZ1bmN0aW9uKGV2dCkge1xuICAgICAgLy8g0J3Rg9C20L3Qviwg0YfRgtC+0LHRiyDQvNC10L3RjiDQt9Cw0LrRgNGL0LLQsNC70L7RgdGMINC4INGB0YLRgNCw0L3QuNGG0LAg0YHQutGA0L7Qu9C70LjQu9Cw0YHRjCDQtNC+INGB0LXQutGG0LjQuFxuICAgICAgaWYgKCQoXCIubWVudVwiKS5oYXNDbGFzcyhcImlzLXNob3dcIikpIHtcblxuICAgICAgICAkKFwiLm1lbnVcIikucmVtb3ZlQ2xhc3MoXCJpcy1zaG93XCIpO1xuICAgICAgICAkKFwiLmpzLW9wZW4tbWVudVwiKS5yZW1vdmVDbGFzcyhcImlzLXNob3dcIik7XG4gICAgICAgICQoJ2JvZHknKS5yZW1vdmVDbGFzcygnaXMtbWVudS1vcGVuJykucmVtb3ZlQXR0cignZGF0YS1zY3JvbGwnKTtcbiAgICAgICAgY2hlY2tIYXNoKCk7XG5cbiAgICAgIC8vINCe0LHRi9GH0L3Ri9C5INGB0LrRgNC40L/RgiDRgdC60YDQvtC70LvQsCDQtNC+INC90LXQvtCx0YXQvtC00LjQvNC+0Lkg0YHQtdC60YbQuNC4INCyIGRhdGEg0LDRgtGA0LjQsdGD0YLQtSDQsdC10Lcg0L/QtdGA0LXQt9Cw0LPRgNGD0LfQutC4INGB0YLRgNCw0L3QuNGG0YtcbiAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgdmFyIGhhc2ggPSAkKHRoaXMpLmF0dHIoJ2RhdGEtaHJlZicpO1xuXG4gICAgICAgIGlmICgkKGhhc2gpLmxlbmd0aCkge1xuICAgICAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xuICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogKCQoaGFzaCkub2Zmc2V0KCkudG9wIC0gMTMwKSxcbiAgICAgICAgICAgIH0sIDkwMCwgJ3N3aW5nJyk7XG4gICAgICAgIH1cblxuICAgICAgfVxuICAgIH0pO1xuICB9KTtcblxufTtcblxuZXhwb3J0IGRlZmF1bHQgYW5rb3JzO1xuIiwiaW1wb3J0IG5vZGVMaXN0Rm9yRWFjaCBmcm9tICcuL25vZGUtbGlzdC1mb3ItZWFjaCc7XG5pbXBvcnQgdGVsIGZyb20gJy4vdGVsJztcbmltcG9ydCBhbmltYXRpb24gZnJvbSAnLi9hbmltYXRpb24nO1xuaW1wb3J0IG1lbnVPcGVuIGZyb20gJy4vbWVudS1vcGVuJztcbmltcG9ydCBtb2RhbCBmcm9tICcuL21vZGFsJztcbmltcG9ydCBoZWFkZXJTY3JvbGwgZnJvbSAnLi9oZWFkZXInO1xuaW1wb3J0IHNsaWRlcnMgZnJvbSAnLi9zbGlkZXJzJztcbmltcG9ydCBudW1iZXIgZnJvbSAnLi9udW1iZXInO1xuaW1wb3J0IGJ0blVwIGZyb20gJy4vYnRuLXVwJztcbmltcG9ydCBhY2NvcmRpb24gZnJvbSAnLi9hY2NvcmRpb24nO1xuaW1wb3J0IGdvb2RRdWFudGl0eSBmcm9tICcuL2dvb2QtcXVhbnRpdHknO1xuaW1wb3J0IGNvbG9yc1NlbGVjdCBmcm9tICcuL2NvbG9ycy1zZWxlY3QnO1xuaW1wb3J0IGZvb3RlckZvcm0gZnJvbSAnLi9mb290ZXItZm9ybSc7XG5pbXBvcnQgY2FsY1NsaWRlciBmcm9tICcuL2NhbGN1bGF0b3InO1xuaW1wb3J0IGFua29ycyBmcm9tICcuL2Fua29ycyc7XG5cbmNsYXNzIEFwcCB7XG4gIHN0YXRpYyBpbml0KCkge1xuICAgIG5vZGVMaXN0Rm9yRWFjaCgpO1xuICAgIHRlbCgpO1xuICAgIGFuaW1hdGlvbigpO1xuICAgIG1lbnVPcGVuKCk7XG4gICAgaGVhZGVyU2Nyb2xsKCk7XG4gICAgbW9kYWwoKTtcbiAgICBzbGlkZXJzKCk7XG4gICAgbnVtYmVyKCk7XG4gICAgYnRuVXAoKTtcbiAgICBhY2NvcmRpb24oKTtcbiAgICBnb29kUXVhbnRpdHkoKTtcbiAgICBjb2xvcnNTZWxlY3QoKTtcbiAgICBmb290ZXJGb3JtKCk7XG4gICAgY2FsY1NsaWRlcigpO1xuICAgIGFua29ycygpO1xuICB9XG59XG5cblxuQXBwLmluaXQoKTtcbndpbmRvdy5BcHAgPSBBcHA7XG4iXSwibmFtZXMiOlsibm9kZUxpc3RGb3JFYWNoIiwid2luZG93IiwiTm9kZUxpc3QiLCJwcm90b3R5cGUiLCJmb3JFYWNoIiwiY2FsbGJhY2siLCJ0aGlzQXJnIiwiaSIsImxlbmd0aCIsImNhbGwiLCJ0ZWwiLCJmb3JtQmxvY2tzIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZm9ybUJsb2NrIiwiaW5wdXQiLCJxdWVyeVNlbGVjdG9yIiwicGhvbmVNYXNrIiwiSU1hc2siLCJtYXNrIiwiYW5pbWF0aW9uIiwiYW5pbWF0aW9ucyIsIldPVyIsImluaXQiLCJidG5zIiwiJCIsImNoZWNrVG91Y2hEZXZpY2UiLCJjcmVhdGVFdmVudCIsImUiLCJpc1RvdWNoRGV2aWNlIiwiZWFjaCIsIiRidXR0b24iLCIkcmlwcGxlVGVtcGxhdGUiLCJjbGFzcyIsImFwcGVuZCIsIiRyaXBwbGUiLCJmaW5kIiwib24iLCJwYXJlbnRPZmZzZXQiLCJvZmZzZXQiLCJyZWxYIiwicGFnZVgiLCJsZWZ0IiwicmVsWSIsInBhZ2VZIiwidG9wIiwiY3NzIiwid2lkdGgiLCJoZWlnaHQiLCJtZW51T3BlbiIsIiRidXR0b25zTWVudSIsIiRtZW51IiwiJGJ1dHRvbkNsb3NlIiwiJGhlYWRlciIsIiRidG4iLCJzY3JvbGxIZWFkZXIiLCJoYXNDbGFzcyIsInNjcm9sbFRvcCIsImFkZENsYXNzIiwicmVtb3ZlQ2xhc3MiLCJjbGljayIsInBvcyIsInBhcnNlSW50IiwiYXR0ciIsInJlbW92ZUF0dHIiLCJzY3JvbGxUbyIsInNldFRpbWVvdXQiLCJwYWdlUG9zIiwibW9kYWwiLCIkYnV0dG9ucyIsIiRib2R5Iiwib3B0aW9ucyIsImhpZGVTY3JvbGxiYXIiLCJ0b3VjaCIsImJ0blRwbCIsInNtYWxsQnRuIiwiYmVmb3JlU2hvdyIsImRhdGEiLCJzbGljZSIsImJvZHlTdHlsZXMiLCJhZnRlckNsb3NlIiwiZmFuY3lib3giLCJoZWFkZXJTY3JvbGwiLCJtYWluIiwiaW50cm9Ub3AiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJjaGVja0hlYWRlckhlaWdodCIsInZhbHVlIiwib3V0ZXJIZWlnaHQiLCJzbGlkZXJzIiwiU3dpcGVyIiwiYWR2YW50YWdlcyIsIm15U3dpcGVyIiwiZGlyZWN0aW9uIiwic2xpZGVzUGVyVmlldyIsInNwYWNlQmV0d2VlbiIsInNwZWVkIiwibmF2aWdhdGlvbiIsIm5leHRFbCIsInByZXZFbCIsInBob3RvcyIsImxvb3AiLCJjZW50ZXJlZFNsaWRlcyIsImJyZWFrcG9pbnRzIiwicGFnaW5hdGlvbiIsImVsIiwiY2xpY2thYmxlIiwicmV2aWV3cyIsInNlcnRpZmljYXRlcyIsIm51bWJlciIsIiRudW1iZXJzIiwiJHRoaXNzIiwiYnRuVXAiLCJzY3JvbGwiLCJpcyIsIm9wYWNpdHkiLCJmYWRlSW4iLCJzdG9wIiwiZmFkZU91dCIsImFuaW1hdGUiLCJhY2NvcmRpb24iLCIkYWNjb3JkaW9ucyIsIiRzaWRlIiwiJG1haW4iLCJldnQiLCJwcmV2ZW50RGVmYXVsdCIsInNsaWRlVXAiLCJibHVyIiwic2xpZGVEb3duIiwiZ29vZFF1YW50aXR5IiwiY29udGFpbmVycyIsImNvbnRhaW5lciIsImJ0bkluY3JlYXNlIiwiYnRuRGVjcmVhc2UiLCJidG5JbmNyZWFzZUhhbmRsZXIiLCJuZXdWYWx1ZSIsInJlbW92ZUF0dHJpYnV0ZSIsImJ0bkRlY3JlYXNlSGFuZGxlciIsInNldEF0dHJpYnV0ZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJjb2xvcnNTZWxlY3QiLCJjb2xvcnNCbG9jayIsImxpbmtzIiwicGljdHVyZUJsb2NrIiwidGV4dEJsb2NrIiwibGluayIsInBpY3R1cmUiLCJuYW1lIiwidGV4dCIsImZvb3RlckZvcm0iLCIkZm9vdGVyRm9ybSIsImlucHV0cyIsInZhbCIsImNhbGNTbGlkZXIiLCJhbGxvd1RvdWNoTW92ZSIsImZhZGVFZmZlY3QiLCJjcm9zc0ZhZGUiLCJlZmZlY3QiLCJzdGVwc0xpbmtzIiwiYnRuIiwic2xpZGUiLCJpbmRleCIsImFjdGl2ZVN0ZXAiLCJzbGlkZVRvIiwiYW5rb3JzIiwicGFydG5hbWUiLCJsb2NhdGlvbiIsInBhdGhuYW1lIiwiY2hlY2tIYXNoIiwiaGFzaCIsInJlYWR5IiwiQXBwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBQUEsSUFBTUEsZUFBZSxHQUFHLFNBQWxCQSxlQUFrQixHQUFNO0VBQzVCLE1BQUksY0FBY0MsTUFBZCxJQUF3QixDQUFDQyxRQUFRLENBQUNDLFNBQVQsQ0FBbUJDLE9BQWhELEVBQXlEO0VBQ3ZERixJQUFBQSxRQUFRLENBQUNDLFNBQVQsQ0FBbUJDLE9BQW5CLEdBQTZCLFVBQVVDLFFBQVYsRUFBb0JDLE9BQXBCLEVBQTZCO0VBQzFEQSxNQUFBQSxPQUFPLEdBQUdBLE9BQU8sSUFBSUwsTUFBckI7O0VBQ0EsV0FBSyxJQUFJTSxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHLEtBQUtDLE1BQXpCLEVBQWlDRCxDQUFDLEVBQWxDLEVBQXNDO0VBQ3RDRixRQUFBQSxRQUFRLENBQUNJLElBQVQsQ0FBY0gsT0FBZCxFQUF1QixLQUFLQyxDQUFMLENBQXZCLEVBQWdDQSxDQUFoQyxFQUFtQyxJQUFuQztFQUNDO0VBQ0EsS0FMRDtFQU1EO0VBQ0YsQ0FURDs7RUNBQSxJQUFNRyxHQUFHLEdBQUcsU0FBTkEsR0FBTSxHQUFNO0VBQ2hCO0VBQ0EsTUFBTUMsVUFBVSxHQUFHQyxRQUFRLENBQUNDLGdCQUFULENBQTBCLFdBQTFCLENBQW5COztFQUVBLE1BQUlGLFVBQVUsQ0FBQ0gsTUFBZixFQUF1QjtFQUVyQkcsSUFBQUEsVUFBVSxDQUFDUCxPQUFYLENBQW1CLFVBQVNVLFNBQVQsRUFBb0I7RUFDckMsVUFBTUMsS0FBSyxHQUFHRCxTQUFTLENBQUNFLGFBQVYsQ0FBd0IsaUJBQXhCLENBQWQ7O0VBRUEsVUFBR0QsS0FBSCxFQUFV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
