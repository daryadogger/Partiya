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
        evt.preventDefault();
        var hash = $(this).attr('data-href');

        if ($(hash).length) {
          $('html, body').animate({
            scrollTop: $(hash).offset().top - 130
          }, 900, 'swing');
        }
      });
      $(this).on("focus", function (evt) {
        evt.preventDefault();
        var hash = $(this).attr('data-href');

        if ($(hash).length) {
          $('html, body').animate({
            scrollTop: $(hash).offset().top - 130
          }, 900, 'swing');
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsic3JjL2pzL25vZGUtbGlzdC1mb3ItZWFjaC5qcyIsInNyYy9qcy90ZWwuanMiLCJzcmMvanMvYW5pbWF0aW9uLmpzIiwic3JjL2pzL21lbnUtb3Blbi5qcyIsInNyYy9qcy9tb2RhbC5qcyIsInNyYy9qcy9oZWFkZXIuanMiLCJzcmMvanMvc2xpZGVycy5qcyIsInNyYy9qcy9udW1iZXIuanMiLCJzcmMvanMvYnRuLXVwLmpzIiwic3JjL2pzL2FjY29yZGlvbi5qcyIsInNyYy9qcy9nb29kLXF1YW50aXR5LmpzIiwic3JjL2pzL2NvbG9ycy1zZWxlY3QuanMiLCJzcmMvanMvZm9vdGVyLWZvcm0uanMiLCJzcmMvanMvY2FsY3VsYXRvci5qcyIsInNyYy9qcy9hbmtvcnMuanMiLCJzcmMvanMvbWFpbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBub2RlTGlzdEZvckVhY2ggPSAoKSA9PiB7XG4gIGlmICgnTm9kZUxpc3QnIGluIHdpbmRvdyAmJiAhTm9kZUxpc3QucHJvdG90eXBlLmZvckVhY2gpIHtcbiAgICBOb2RlTGlzdC5wcm90b3R5cGUuZm9yRWFjaCA9IGZ1bmN0aW9uIChjYWxsYmFjaywgdGhpc0FyZykge1xuICAgIHRoaXNBcmcgPSB0aGlzQXJnIHx8IHdpbmRvdztcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcbiAgICBjYWxsYmFjay5jYWxsKHRoaXNBcmcsIHRoaXNbaV0sIGksIHRoaXMpO1xuICAgIH1cbiAgICB9O1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBub2RlTGlzdEZvckVhY2g7XG4iLCJjb25zdCB0ZWwgPSAoKSA9PiB7XG4gIC8vIE1hc2sgZm9yIHRlbFxuICBjb25zdCBmb3JtQmxvY2tzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5maWVsZHNldFwiKTtcblxuICBpZiAoZm9ybUJsb2Nrcy5sZW5ndGgpIHtcblxuICAgIGZvcm1CbG9ja3MuZm9yRWFjaChmdW5jdGlvbihmb3JtQmxvY2spIHtcbiAgICAgIGNvbnN0IGlucHV0ID0gZm9ybUJsb2NrLnF1ZXJ5U2VsZWN0b3IoXCJpbnB1dFtuYW1lPXRlbF1cIik7XG5cbiAgICAgIGlmKGlucHV0KSB7XG4gICAgICAgIGNvbnN0IHBob25lTWFzayA9IElNYXNrKCBpbnB1dCwge1xuICAgICAgICAgIG1hc2s6IFwiK3s3fSAwMDAgMDAwLTAwLTAwXCJcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICB9KTtcblxuICB9XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IHRlbDtcbiIsImNvbnN0IGFuaW1hdGlvbiA9ICgpID0+IHtcbiAgLy93b3dcbiAgY29uc3QgYW5pbWF0aW9ucyA9IG5ldyB3aW5kb3cuV09XKCkuaW5pdCgpO1xuXG4gIC8vYnRuc1xuICBjb25zdCBidG5zID0gJChcIi5qcy1yaXBwbGVcIik7XG5cbiAgaWYgKGJ0bnMpIHtcbiAgICBmdW5jdGlvbiBjaGVja1RvdWNoRGV2aWNlKCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ1RvdWNoRXZlbnQnKTtcblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IGlzVG91Y2hEZXZpY2UgPSBjaGVja1RvdWNoRGV2aWNlKCk7XG5cbiAgICBpZiAoIWlzVG91Y2hEZXZpY2UpIHtcblxuICAgICAgYnRucy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICBsZXQgJGJ1dHRvbiA9ICQodGhpcyk7XG4gICAgICAgIGxldCAkcmlwcGxlVGVtcGxhdGUgPSAkKCc8c3BhbiAvPicsIHtcbiAgICAgICAgICBjbGFzczogJ2J1dHRvbl9fcmlwcGxlJyxcbiAgICAgICAgfSk7XG4gICAgICAgICRidXR0b24uYXBwZW5kKCRyaXBwbGVUZW1wbGF0ZSk7XG5cbiAgICAgICAgbGV0ICRyaXBwbGUgPSAkYnV0dG9uLmZpbmQoJy5idXR0b25fX3JpcHBsZScpO1xuXG4gICAgICAgICRidXR0b24ub24oJ21vdXNlZW50ZXInLCAnKicsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICBsZXQgcGFyZW50T2Zmc2V0ID0gJGJ1dHRvbi5vZmZzZXQoKTtcbiAgICAgICAgICBsZXQgcmVsWCA9IGUucGFnZVggLSBwYXJlbnRPZmZzZXQubGVmdDtcbiAgICAgICAgICBsZXQgcmVsWSA9IGUucGFnZVkgLSBwYXJlbnRPZmZzZXQudG9wO1xuXG4gICAgICAgICAgJHJpcHBsZS5jc3Moe1xuICAgICAgICAgICAgdG9wOiByZWxZLFxuICAgICAgICAgICAgbGVmdDogcmVsWCxcbiAgICAgICAgICAgIHdpZHRoOiAnMjI1JScsXG4gICAgICAgICAgICBoZWlnaHQ6ICRidXR0b24ud2lkdGgoKSAqIDIuMjUsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRidXR0b24ub24oJ21vdXNlb3V0JywgJyonLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgbGV0IHBhcmVudE9mZnNldCA9ICRidXR0b24ub2Zmc2V0KCk7XG4gICAgICAgICAgbGV0IHJlbFggPSBlLnBhZ2VYIC0gcGFyZW50T2Zmc2V0LmxlZnQ7XG4gICAgICAgICAgbGV0IHJlbFkgPSBlLnBhZ2VZIC0gcGFyZW50T2Zmc2V0LnRvcDtcbiAgICAgICAgICAkcmlwcGxlLmNzcyh7XG4gICAgICAgICAgICB0b3A6IHJlbFksXG4gICAgICAgICAgICBsZWZ0OiByZWxYLFxuICAgICAgICAgICAgd2lkdGg6IDAsXG4gICAgICAgICAgICBoZWlnaHQ6IDAsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICBcbiAgICB9XG4gIH1cblxuXG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGFuaW1hdGlvbjtcbiIsImNvbnN0IG1lbnVPcGVuID0gKCkgPT4ge1xuICAvLyDQntGC0LrRgNGL0YLQuNC1INC80L7QsSDQvNC10L3RjlxuICBjb25zdCAkYnV0dG9uc01lbnUgPSAkKFwiLmpzLW9wZW4tbWVudVwiKTtcblxuICBpZiAoJGJ1dHRvbnNNZW51Lmxlbmd0aCkge1xuICAgIGNvbnN0ICRtZW51ID0gJChcIi5tZW51XCIpO1xuICAgIGNvbnN0ICRidXR0b25DbG9zZSA9ICQoXCIuanMtYnRuLWNsb3NlXCIpO1xuICAgIGNvbnN0ICRoZWFkZXIgPSAkKFwiLmhlYWRlclwiKTtcblxuICAgICRidXR0b25zTWVudS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnN0ICRidG4gPSAkKHRoaXMpO1xuXG4gICAgICBjb25zdCBzY3JvbGxIZWFkZXIgPSAoKSA9PiB7XG4gICAgICAgIGlmICgkbWVudS5oYXNDbGFzcyhcImlzLXNob3dcIikpIHtcblxuICAgICAgICAgIGlmKCRtZW51LnNjcm9sbFRvcCgpID4gMSkge1xuICAgICAgICAgICAgJGhlYWRlci5hZGRDbGFzcyhcInNjcm9sbFwiKTtcblxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkaGVhZGVyLnJlbW92ZUNsYXNzKFwic2Nyb2xsXCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgJGJ0bi5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgLy8g0LXRgdC70Lgg0L7RgtC60YDRi9GC0L4g0LzQtdC90Y5cbiAgICAgICAgaWYgKCRtZW51Lmhhc0NsYXNzKFwiaXMtc2hvd1wiKSkge1xuXG4gICAgICAgICAgY29uc3QgcG9zID0gcGFyc2VJbnQoJChcImJvZHlcIikuYXR0cihcImRhdGEtc2Nyb2xsXCIpLCAxMCk7XG4gICAgICAgICAgJG1lbnUucmVtb3ZlQ2xhc3MoXCJpcy1zaG93XCIpO1xuICAgICAgICAgICRidG4ucmVtb3ZlQ2xhc3MoXCJpcy1zaG93XCIpO1xuICAgICAgICAgICRoZWFkZXIucmVtb3ZlQ2xhc3MoXCJzY3JvbGxcIik7XG5cbiAgICAgICAgICAkKFwiYm9keVwiKS5yZW1vdmVDbGFzcyhcImlzLW1lbnUtb3BlblwiKS5yZW1vdmVBdHRyKFwiZGF0YS1zY3JvbGxcIik7XG4gICAgICAgICAgd2luZG93LnNjcm9sbFRvKDAsIHBvcyk7XG5cbiAgICAgICAgICAvLyDQtdGB0LvQuCDQt9Cw0LrRgNGL0YLQviDQvNC10L3RjlxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgJG1lbnUuYWRkQ2xhc3MoXCJpcy1zaG93XCIpO1xuXG4gICAgICAgICAgaWYoJG1lbnUuc2Nyb2xsVG9wKCkgPiAxKSB7XG4gICAgICAgICAgICAkaGVhZGVyLmFkZENsYXNzKFwic2Nyb2xsXCIpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJGJ0bi5hZGRDbGFzcyhcImlzLXNob3dcIik7XG5cbiAgICAgICAgICB9LCAxMDApO1xuXG4gICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjb25zdCBwYWdlUG9zID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xuICAgICAgICAgICAgJChcImJvZHlcIikuYWRkQ2xhc3MoXCJpcy1tZW51LW9wZW5cIikuYXR0cihcImRhdGEtc2Nyb2xsXCIsIHBhZ2VQb3MpO1xuICAgICAgICAgIH0sIDQ1MCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICAkKFwiLm1lbnVcIikub24oXCJzY3JvbGxcIiwgc2Nyb2xsSGVhZGVyKTtcbiAgICB9KTtcblxuICAgICRidXR0b25DbG9zZS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zdCBwb3MgPSBwYXJzZUludCgkKFwiYm9keVwiKS5hdHRyKFwiZGF0YS1zY3JvbGxcIiksIDEwKTtcbiAgICAgICRtZW51LnJlbW92ZUNsYXNzKFwiaXMtc2hvd1wiKTtcbiAgICAgICRidXR0b25zTWVudS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc3QgJGJ0biA9ICQodGhpcyk7XG4gICAgICAgICRidG4ucmVtb3ZlQ2xhc3MoXCJpcy1zaG93XCIpO1xuICAgICAgfSk7XG5cbiAgICAgICQoXCJib2R5XCIpLnJlbW92ZUNsYXNzKFwiaXMtbWVudS1vcGVuXCIpLnJlbW92ZUF0dHIoXCJkYXRhLXNjcm9sbFwiKTtcbiAgICAgIHdpbmRvdy5zY3JvbGxUbygwLCBwb3MpO1xuICAgIH0pO1xuXG4gIH1cblxufTtcblxuZXhwb3J0IGRlZmF1bHQgbWVudU9wZW47XG4iLCJjb25zdCBtb2RhbCA9ICgpID0+IHtcbiAgY29uc3QgJGJ1dHRvbnMgPSAkKCdbanMtcG9wdXAtb3Blbl0nKTtcblxuICBpZiAoJGJ1dHRvbnMubGVuZ3RoKSB7XG4gICAgY29uc3QgJGJvZHkgPSAkKCdib2R5Jyk7XG5cbiAgICAkYnV0dG9ucy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgY29uc3QgJGJ1dHRvbiA9ICQodGhpcyk7XG4gICAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICBoaWRlU2Nyb2xsYmFyOiB0cnVlLFxuICAgICAgICB0b3VjaDogZmFsc2UsXG4gICAgICAgIGJ0blRwbCA6IHtcbiAgICAgICAgICBzbWFsbEJ0biA6ICcnXG4gICAgICAgIH0sXG4gICAgICAgIGJlZm9yZVNob3c6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIC8vICBBZGQgYW5vdGhlciBiZyBjb2xvclxuICAgICAgICAgICQoJy5mYW5jeWJveC1iZycpLmFkZENsYXNzKCRidXR0b24uZGF0YSgnc3JjJykuc2xpY2UoMSkpO1xuXG4gICAgICAgICAgY29uc3QgYm9keVN0eWxlcyA9IHtcbiAgICAgICAgICAgICdvdmVyZmxvdy15JzogJ2hpZGRlbicsXG4gICAgICAgICAgICAnbWFyZ2luJzogJzAgYXV0bydcbiAgICAgICAgICB9O1xuICAgICAgICAgICRib2R5LmNzcyhib2R5U3R5bGVzKTtcblxuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgJCgkYnV0dG9uLmRhdGEoJ3NyYycpKS5hZGRDbGFzcyhcInNob3dcIik7XG4gICAgICAgICAgfSwgMTAwKTtcbiAgICAgICAgfSxcbiAgICAgICAgYWZ0ZXJDbG9zZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgLy8gIEFkZCBhbm90aGVyIGJnIGNvbG9yXG4gICAgICAgICAgJCgnLmZhbmN5Ym94LWJnJykucmVtb3ZlQ2xhc3MoJGJ1dHRvbi5kYXRhKCdzcmMnKS5zbGljZSgxKSk7XG5cbiAgICAgICAgICBjb25zdCBib2R5U3R5bGVzID0ge1xuICAgICAgICAgICAgJ292ZXJmbG93LXknOiAndmlzaWJsZScsXG4gICAgICAgICAgICAncGFkZGluZy1yaWdodCc6IDAsXG4gICAgICAgICAgICAnbWFyZ2luJzogMFxuICAgICAgICAgIH07XG4gICAgICAgICAgJGJvZHkuY3NzKGJvZHlTdHlsZXMpO1xuXG4gICAgICAgICAgJCgkYnV0dG9uLmRhdGEoJ3NyYycpKS5yZW1vdmVDbGFzcyhcInNob3dcIik7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgICRidXR0b24uZmFuY3lib3gob3B0aW9ucyk7XG4gICAgfSk7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IG1vZGFsO1xuIiwiY29uc3QgaGVhZGVyU2Nyb2xsID0gKCkgPT4ge1xuICBjb25zdCBtYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIm1haW5cIik7XG5cbiAgY29uc3QgJGhlYWRlciA9ICQoXCIuaGVhZGVyXCIpO1xuXG4gIGlmICgkaGVhZGVyKSB7XG5cbiAgICAvLyBIZWFkZXIg0LzQtdC90Y/QtdGCINGG0LLQtdGC0LAg0L/RgNC4INGB0LrRgNC+0LvQu9C1LiDQntC9INGD0LbQtSBmaXhlZCDQuNC30L3QsNGH0LDQu9GM0L3QvlxuICAgIGNvbnN0IHNjcm9sbEhlYWRlciA9ICgpID0+IHtcbiAgICAgIGNvbnN0IGludHJvVG9wID0gbWFpbi5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3A7XG5cbiAgICAgIGlmIChpbnRyb1RvcCA8IC0xKSB7XG4gICAgICAgICRoZWFkZXIuYWRkQ2xhc3MoXCJzY3JvbGxcIik7XG5cbiAgICAgIH0gZWxzZSBpZiAoJGhlYWRlci5oYXNDbGFzcyhcInNjcm9sbFwiKSAmJiBpbnRyb1RvcCA+IC0xKSB7XG4gICAgICAgICRoZWFkZXIucmVtb3ZlQ2xhc3MoXCJzY3JvbGxcIik7XG4gICAgICB9XG4gICAgfTtcblxuICAgICQod2luZG93KS5vbihcInNjcm9sbFwiLCBzY3JvbGxIZWFkZXIpO1xuICAgICQoZG9jdW1lbnQpLm9uKFwicmVhZHlcIiwgc2Nyb2xsSGVhZGVyKTtcblxuXG4gICAgLy/QlNC+0LHQsNCy0LvRj9C10YIg0L7RgtGB0YLRg9C/INC90LAg0YHRgtGA0LDQvdC40YbQsNGFINC00LvRjyDRhNC40LrRgdC40YDQvtCy0LDQvdC90L7Qs9C+INGF0LXQtNC10YDQsFxuICAgIGZ1bmN0aW9uIGNoZWNrSGVhZGVySGVpZ2h0KCkge1xuICAgICAgY29uc3QgdmFsdWUgPSAkaGVhZGVyLm91dGVySGVpZ2h0KCk7XG4gICAgICBjb25zdCBtYWluID0gJChcIm1haW5cIik7XG5cbiAgICAgIG1haW4uY3NzKFwicGFkZGluZy10b3BcIiwgdmFsdWUpO1xuICAgIH1cbiAgICBjaGVja0hlYWRlckhlaWdodCgpO1xuXG4gICAgJCh3aW5kb3cpLm9uKFwicmVzaXplXCIsIGNoZWNrSGVhZGVySGVpZ2h0KTtcbiAgfVxuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBoZWFkZXJTY3JvbGw7XG4iLCJjb25zdCBzbGlkZXJzID0gKCkgPT4ge1xuICBjb25zdCBTd2lwZXIgPSB3aW5kb3cuU3dpcGVyO1xuXG4gIC8vIEFkdiBzbGlkZXJcbiAgY29uc3QgYWR2YW50YWdlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuanMtYWR2YW50YWdlcy1zbGlkZXJcIik7XG5cbiAgaWYgKGFkdmFudGFnZXMpIHtcbiAgICBjb25zdCBteVN3aXBlciA9IG5ldyBTd2lwZXIoXCIuanMtYWR2YW50YWdlcy1zbGlkZXIuc3dpcGVyLWNvbnRhaW5lclwiLCB7XG4gICAgICBkaXJlY3Rpb246IFwiaG9yaXpvbnRhbFwiLFxuICAgICAgc2xpZGVzUGVyVmlldzogMSxcbiAgICAgIHNwYWNlQmV0d2VlbjogMjAsXG4gICAgICBzcGVlZDogNDAwLFxuICAgICAgbmF2aWdhdGlvbjoge1xuICAgICAgICBuZXh0RWw6IFwiLmpzLWFkdmFudGFnZXMtc2xpZGVyIC5zd2lwZXItYnV0dG9uLW5leHRcIixcbiAgICAgICAgcHJldkVsOiBcIi5qcy1hZHZhbnRhZ2VzLXNsaWRlciAuc3dpcGVyLWJ1dHRvbi1wcmV2XCIsXG4gICAgICB9LFxuICAgIH0pO1xuICB9XG5cbiAgLy8gUGhvdG9zIHNsaWRlclxuICBjb25zdCBwaG90b3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmpzLXBob3Rvcy1zbGlkZXJcIik7XG5cbiAgaWYgKHBob3Rvcykge1xuICAgIGNvbnN0IG15U3dpcGVyID0gbmV3IFN3aXBlcihcIi5qcy1waG90b3Mtc2xpZGVyLnN3aXBlci1jb250YWluZXJcIiwge1xuICAgICAgZGlyZWN0aW9uOiBcImhvcml6b250YWxcIixcbiAgICAgIHNsaWRlc1BlclZpZXc6IDEsXG4gICAgICBzcGFjZUJldHdlZW46IDIwLFxuICAgICAgc3BlZWQ6IDQwMCxcbiAgICAgIGxvb3A6IHRydWUsXG4gICAgICBjZW50ZXJlZFNsaWRlczogZmFsc2UsXG4gICAgICBicmVha3BvaW50czoge1xuICAgICAgICA3Njc6IHtcbiAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAyLFxuICAgICAgICAgIHNwYWNlQmV0d2VlbjogMjAsXG4gICAgICAgICAgY2VudGVyZWRTbGlkZXM6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgbmF2aWdhdGlvbjoge1xuICAgICAgICBuZXh0RWw6IFwiLmpzLXBob3Rvcy1zbGlkZXIgLnN3aXBlci1idXR0b24tbmV4dFwiLFxuICAgICAgICBwcmV2RWw6IFwiLmpzLXBob3Rvcy1zbGlkZXIgLnN3aXBlci1idXR0b24tcHJldlwiLFxuICAgICAgfSxcbiAgICAgIHBhZ2luYXRpb246IHtcbiAgICAgICAgZWw6ICcuanMtcGhvdG9zLXNsaWRlciAuc3dpcGVyLXBhZ2luYXRpb24nLFxuICAgICAgICBjbGlja2FibGU6IHRydWUsXG4gICAgICB9LFxuICAgIH0pO1xuICB9XG5cblxuICAvLyBSZXZpZXdzIHNsaWRlclxuICBjb25zdCByZXZpZXdzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5qcy1yZXZpZXdzLXNsaWRlclwiKTtcblxuICBpZiAocmV2aWV3cykge1xuICAgIGNvbnN0IG15U3dpcGVyID0gbmV3IFN3aXBlcihcIi5qcy1yZXZpZXdzLXNsaWRlci5zd2lwZXItY29udGFpbmVyXCIsIHtcbiAgICAgIGRpcmVjdGlvbjogXCJob3Jpem9udGFsXCIsXG4gICAgICBzbGlkZXNQZXJWaWV3OiAxLFxuICAgICAgc3BhY2VCZXR3ZWVuOiAyMCxcbiAgICAgIHNwZWVkOiA0MDAsXG4gICAgICBsb29wOiB0cnVlLFxuICAgICAgY2VudGVyZWRTbGlkZXM6IHRydWUsXG4gICAgICBicmVha3BvaW50czoge1xuICAgICAgICA2ODA6IHtcbiAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAyLFxuICAgICAgICAgIHNwYWNlQmV0d2VlbjogMTUsXG4gICAgICAgICAgY2VudGVyZWRTbGlkZXM6IGZhbHNlLFxuICAgICAgICB9LFxuICAgICAgICA3Njc6IHtcbiAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAzLFxuICAgICAgICAgIHNwYWNlQmV0d2VlbjogMTUsXG4gICAgICAgICAgY2VudGVyZWRTbGlkZXM6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICAgIDk5MToge1xuICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDMsXG4gICAgICAgICAgc3BhY2VCZXR3ZWVuOiAxMjAsXG4gICAgICAgICAgY2VudGVyZWRTbGlkZXM6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgbmF2aWdhdGlvbjoge1xuICAgICAgICBuZXh0RWw6IFwiLmpzLXJldmlld3Mtc2xpZGVyIC5zd2lwZXItYnV0dG9uLW5leHRcIixcbiAgICAgICAgcHJldkVsOiBcIi5qcy1yZXZpZXdzLXNsaWRlciAuc3dpcGVyLWJ1dHRvbi1wcmV2XCIsXG4gICAgICB9LFxuICAgIH0pO1xuICB9XG5cbiAgLy8gU2VydGlmaWNhdGVzIHNsaWRlclxuICBjb25zdCBzZXJ0aWZpY2F0ZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmpzLXNlcnRpZmljYXRlcy1zbGlkZXJcIik7XG5cbiAgaWYgKHNlcnRpZmljYXRlcykge1xuICAgIGNvbnN0IG15U3dpcGVyID0gbmV3IFN3aXBlcihcIi5qcy1zZXJ0aWZpY2F0ZXMtc2xpZGVyLnN3aXBlci1jb250YWluZXJcIiwge1xuICAgICAgZGlyZWN0aW9uOiBcImhvcml6b250YWxcIixcbiAgICAgIHNsaWRlc1BlclZpZXc6IDEsXG4gICAgICBzcGFjZUJldHdlZW46IDIwLFxuICAgICAgc3BlZWQ6IDQwMCxcbiAgICAgIGxvb3A6IHRydWUsXG4gICAgICBjZW50ZXJlZFNsaWRlczogdHJ1ZSxcbiAgICAgIGJyZWFrcG9pbnRzOiB7XG4gICAgICAgIDUwMDoge1xuICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDIsXG4gICAgICAgICAgc3BhY2VCZXR3ZWVuOiAxNSxcbiAgICAgICAgICBjZW50ZXJlZFNsaWRlczogZmFsc2UsXG4gICAgICAgIH0sXG4gICAgICAgIDY4MDoge1xuICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDMsXG4gICAgICAgICAgc3BhY2VCZXR3ZWVuOiAxNSxcbiAgICAgICAgfSxcbiAgICAgICAgOTkxOiB7XG4gICAgICAgICAgc2xpZGVzUGVyVmlldzogMyxcbiAgICAgICAgICBzcGFjZUJldHdlZW46IDEyMCxcbiAgICAgICAgICBjZW50ZXJlZFNsaWRlczogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICBuYXZpZ2F0aW9uOiB7XG4gICAgICAgIG5leHRFbDogXCIuanMtc2VydGlmaWNhdGVzLXNsaWRlciAuc3dpcGVyLWJ1dHRvbi1uZXh0XCIsXG4gICAgICAgIHByZXZFbDogXCIuanMtc2VydGlmaWNhdGVzLXNsaWRlciAuc3dpcGVyLWJ1dHRvbi1wcmV2XCIsXG4gICAgICB9LFxuICAgIH0pO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBzbGlkZXJzO1xuIiwiY29uc3QgbnVtYmVyID0gKCkgPT4ge1xuICAvL9Cg0LDQt9GA0LXRiNCw0LXRgiDQstCy0L7QtCDRgtC+0LvRjNC60L4g0YbQuNGE0YAg0LIgaW5wdXRcbiAgY29uc3QgJG51bWJlcnMgPSAkKFwiLmpzLW51bWJlclwiKTtcbiAgaWYgKCEkbnVtYmVycykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gICRudW1iZXJzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgY29uc3QgJHRoaXNzID0gJCh0aGlzKTtcblxuICAgICR0aGlzcy5tYXNrKCcwIycpO1xuICB9KTtcblxufTtcblxuZXhwb3J0IGRlZmF1bHQgbnVtYmVyO1xuIiwiY29uc3QgYnRuVXAgPSAoKSA9PiB7XG5cbiAgJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbigpIHtcbiAgICBpZiAoJCh0aGlzKS5zY3JvbGxUb3AoKSA+IDIwMCkge1xuICAgICAgICBpZiAoJCgnI3VwYnV0dG9uJykuaXMoJzpoaWRkZW4nKSkge1xuICAgICAgICAgICAgJCgnI3VwYnV0dG9uJykuY3NzKHtvcGFjaXR5IDogMC45fSkuZmFkZUluKCdmYXN0Jyk7XG4gICAgICAgIH1cbiAgICB9IGVsc2UgeyAkKCcjdXBidXR0b24nKS5zdG9wKHRydWUsIGZhbHNlKS5mYWRlT3V0KCdmYXN0Jyk7IH1cbiAgfSk7XG5cbiAgJCgnI3VwYnV0dG9uJykuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAkKCdodG1sLCBib2R5Jykuc3RvcCgpLmFuaW1hdGUoe3Njcm9sbFRvcCA6IDB9LCAzMDApO1xuICB9KTtcblxufTtcblxuZXhwb3J0IGRlZmF1bHQgYnRuVXA7XG4iLCJjb25zdCBhY2NvcmRpb24gPSAoKSA9PiB7XG4gIGNvbnN0ICRhY2NvcmRpb25zID0gJChgLmFjY29yZGlvbl9faXRlbWApO1xuICBpZiAoISRhY2NvcmRpb25zKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgJGFjY29yZGlvbnMuZWFjaChmdW5jdGlvbigpIHtcbiAgICBjb25zdCAkdGhpc3MgPSAkKHRoaXMpO1xuICAgIGNvbnN0ICRzaWRlID0gJHRoaXNzLmZpbmQoYC5hY2NvcmRpb25fX2xhYmVsYCk7XG4gICAgY29uc3QgJG1haW4gPSAkdGhpc3MuZmluZChgLmFjY29yZGlvbl9fY29udGVudGApO1xuXG4gICAgJHNpZGUub24oYGNsaWNrYCwgKGV2dCkgPT4ge1xuICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgIGlmICgkc2lkZS5oYXNDbGFzcyhgaXMtb3BlbmApKSB7XG4gICAgICAgICRtYWluLnNsaWRlVXAoXCJzbG93XCIpO1xuICAgICAgICAkc2lkZS5yZW1vdmVDbGFzcyhgaXMtb3BlbmApO1xuICAgICAgICAkc2lkZS5ibHVyKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkc2lkZS5hZGRDbGFzcyhgaXMtb3BlbmApO1xuICAgICAgICAkbWFpbi5zbGlkZURvd24oXCJzbG93XCIpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcblxufTtcblxuZXhwb3J0IGRlZmF1bHQgYWNjb3JkaW9uO1xuIiwiY29uc3QgZ29vZFF1YW50aXR5ID0gKCkgPT4ge1xuICAvLyDQo9Cy0LXQu9C40YfQtdC90LjQtSDQuCDRg9C80LXQvdGM0YjQtdC90LjQtSDRgtC+0LLQsNGA0L7QslxuICBjb25zdCBjb250YWluZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5qcy1xdWFudGl0eVwiKTtcbiAgaWYgKGNvbnRhaW5lcnMubGVuZ3RoIDwgMCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnRhaW5lcnMuZm9yRWFjaCgoY29udGFpbmVyKSA9PiB7XG4gICAgY29uc3QgaW5wdXQgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcihcImlucHV0XCIpO1xuICAgIGNvbnN0IGJ0bkluY3JlYXNlID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCIuanMtaW5jcmVhc2VcIik7XG4gICAgY29uc3QgYnRuRGVjcmVhc2UgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcihcIi5qcy1kZWNyZWFzZVwiKTtcblxuICAgIGxldCB2YWx1ZTtcblxuICAgIGNvbnN0IGJ0bkluY3JlYXNlSGFuZGxlciA9ICgpID0+IHtcbiAgICAgIHZhbHVlID0gaW5wdXQudmFsdWU7XG4gICAgICBsZXQgbmV3VmFsdWUgPSArK3ZhbHVlO1xuXG4gICAgICBpZiAobmV3VmFsdWUgPiAxKSB7XG4gICAgICAgIGJ0bkRlY3JlYXNlLnJlbW92ZUF0dHJpYnV0ZShcImRpc2FibGVkXCIpO1xuICAgICAgfVxuXG4gICAgICBpbnB1dC52YWx1ZSA9IG5ld1ZhbHVlO1xuICAgIH07XG5cbiAgICBjb25zdCBidG5EZWNyZWFzZUhhbmRsZXIgPSAoKSA9PiB7XG4gICAgICB2YWx1ZSA9IGlucHV0LnZhbHVlO1xuICAgICAgbGV0IG5ld1ZhbHVlID0gLS12YWx1ZTtcblxuICAgICAgaWYgKG5ld1ZhbHVlIDw9IDEpIHtcbiAgICAgICAgbmV3VmFsdWUgPSAxO1xuICAgICAgICBpbnB1dC52YWx1ZSA9IDE7XG4gICAgICAgIGJ0bkRlY3JlYXNlLnNldEF0dHJpYnV0ZShcImRpc2FibGVkXCIsIFwiZGlzYWJsZWRcIik7XG4gICAgICB9XG5cbiAgICAgIGlucHV0LnZhbHVlID0gbmV3VmFsdWU7XG4gICAgfTtcblxuICAgIGJ0bkluY3JlYXNlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBidG5JbmNyZWFzZUhhbmRsZXIpO1xuICAgIGJ0bkRlY3JlYXNlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBidG5EZWNyZWFzZUhhbmRsZXIpO1xuICAgIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgYnRuSW5jcmVhc2VIYW5kbGVyKCk7XG4gICAgICBidG5EZWNyZWFzZUhhbmRsZXIoKTtcbiAgICB9KVxuICB9KTtcblxufTtcblxuZXhwb3J0IGRlZmF1bHQgZ29vZFF1YW50aXR5O1xuIiwiY29uc3QgY29sb3JzU2VsZWN0ID0gKCkgPT4ge1xuICBjb25zdCBjb2xvcnNCbG9jayA9ICQoXCIuY29sb3JzLWJsb2NrXCIpO1xuICBpZiAoIWNvbG9yc0Jsb2NrKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgbGlua3MgPSBjb2xvcnNCbG9jay5maW5kKFwiLmNvbG9ycy1ibG9ja19faXRlbVwiKTtcbiAgY29uc3QgcGljdHVyZUJsb2NrID0gY29sb3JzQmxvY2suZmluZChcIi5jb2xvcnMtYmxvY2tfX2luZm8gaW1nXCIpO1xuICBjb25zdCB0ZXh0QmxvY2sgPSBjb2xvcnNCbG9jay5maW5kKFwiLmNvbG9ycy1ibG9ja19faW5mbyBwXCIpO1xuXG4gIGxpbmtzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IGxpbmsgPSAkKHRoaXMpO1xuXG4gICAgbGluay5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKGV2dCkge1xuICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBsaW5rcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBwaWN0dXJlID0gbGluay5hdHRyKFwiZGF0YS1pbWdcIik7XG4gICAgICBjb25zdCBuYW1lID0gbGluay5maW5kKFwicFwiKS50ZXh0KCk7XG4gICAgICBwaWN0dXJlQmxvY2suYXR0cihcInNyY1wiLCBwaWN0dXJlKTtcbiAgICAgIHRleHRCbG9jay50ZXh0KG5hbWUpO1xuXG4gICAgICBsaW5rLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xuICAgIH0pXG4gIH0pO1xuXG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbG9yc1NlbGVjdDtcbiIsImNvbnN0IGZvb3RlckZvcm0gPSAoKSA9PiB7XG4gIGNvbnN0ICRmb290ZXJGb3JtID0gJChcIi5mb290ZXIgZm9ybVwiKTtcbiAgaWYgKCEkZm9vdGVyRm9ybSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IGlucHV0cyA9ICRmb290ZXJGb3JtLmZpbmQoXCJpbnB1dFwiKTtcblxuICBpbnB1dHMuZWFjaChmdW5jdGlvbigpIHtcbiAgICBjb25zdCBpbnB1dCA9ICQodGhpcyk7XG5cbiAgICBpbnB1dC5vbihcImNoYW5nZVwiLCBmdW5jdGlvbigpIHtcbiAgICAgIGlmIChpbnB1dC52YWwoKSAhPT0gYGApIHtcbiAgICAgICAgaW5wdXQuYWRkQ2xhc3MoXCJoYXMtdmFsdWVcIik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpbnB1dC5yZW1vdmVDbGFzcyhcImhhcy12YWx1ZVwiKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZvb3RlckZvcm07XG4iLCJjb25zdCBjYWxjU2xpZGVyID0gZnVuY3Rpb24gY2FsY1NsaWRlcigpIHtcbiAgY29uc3QgU3dpcGVyID0gd2luZG93LlN3aXBlcjtcbiAgY29uc3QgY29udGFpbmVyID0gJChcIi5qcy1jYWxjXCIpO1xuXG4gIGlmICghY29udGFpbmVyKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgbXlTd2lwZXIgPSBuZXcgU3dpcGVyKFwiLmpzLWNhbGMgLnN3aXBlci1jb250YWluZXJcIiwge1xuICAgIGRpcmVjdGlvbjogXCJob3Jpem9udGFsXCIsXG4gICAgc2xpZGVzUGVyVmlldzogMSxcbiAgICBzcGFjZUJldHdlZW46IDAsXG4gICAgYWxsb3dUb3VjaE1vdmU6IGZhbHNlLFxuICAgIHNwZWVkOiAzNTUsXG4gICAgbmF2aWdhdGlvbjoge1xuICAgICAgbmV4dEVsOiAnLmNhbGNfX2J0bi0tbmV4dCcsXG4gICAgICBwcmV2RWw6ICcuY2FsY19fYnRuLS1wcmV2J1xuICAgIH0sXG4gICAgZmFkZUVmZmVjdDoge1xuICAgICAgY3Jvc3NGYWRlOiB0cnVlLFxuICAgIH0sXG4gICAgZWZmZWN0OiBcImZhZGVcIixcbiAgfSk7XG5cbiAgY29uc3QgYnRucyA9IGNvbnRhaW5lci5maW5kKFwiLmNhbGNfX2J0blwiKTtcbiAgY29uc3Qgc3RlcHNMaW5rcyA9IGNvbnRhaW5lci5maW5kKFwiLmNhbGNfX3NpZGUgYVwiKTtcblxuICAvLyDQn9C10YDQtdC60LvRjtGH0LDQtdGCINGI0LDQs9C4LCDQtdGB0LvQuCDQvdCw0LbQuNC80LDRjtGCINC60L3QvtC/0LrQuCDQvdCw0LLQuNCz0LDRhtC40LhcbiAgYnRucy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgIGNvbnN0IGJ0biA9ICQodGhpcyk7XG5cbiAgICBidG4ub24oXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcbiAgICAgIHN0ZXBzTGlua3MuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc3QgbGluayA9ICQodGhpcyk7XG4gICAgICAgIGxpbmsucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XG4gICAgICB9KTtcblxuICAgICAgY29uc3Qgc2xpZGUgPSBjb250YWluZXIuZmluZChcIi5zd2lwZXItc2xpZGUtYWN0aXZlXCIpO1xuICAgICAgY29uc3QgaW5kZXggPSBzbGlkZS5hdHRyKFwiaW5kZXhcIik7XG4gICAgICBjb25zdCBhY3RpdmVTdGVwID0gJChzdGVwc0xpbmtzW2luZGV4XSk7XG4gICAgICBhY3RpdmVTdGVwLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xuICAgIH0pO1xuICB9KTtcblxuICAvLyDQn9C10YDQtdC60LvRjtGH0LDQtdGCINCw0LrRgtC40LLQvdGL0Lkg0YHQu9Cw0LnQtCwg0LXRgdC70Lgg0L3QsNC20LjQvNCw0Y7RgiDQv9C+INGB0LDQvNC40Lwg0YHRgdGL0LvQutCw0Lwg0YjQsNCz0L7QslxuICBzdGVwc0xpbmtzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgY29uc3QgbGluayA9ICQodGhpcyk7XG5cbiAgICBsaW5rLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGV2dCkge1xuICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgIHN0ZXBzTGlua3MuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XG4gICAgICB9KTtcblxuICAgICAgbGluay5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcbiAgICAgIGNvbnN0IGluZGV4ID0gbGluay5hdHRyKFwiaW5kZXhcIik7XG4gICAgICBteVN3aXBlci5zbGlkZVRvKGluZGV4LCA0MDAsIGZhbHNlKTtcbiAgICB9KTtcbiAgfSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjYWxjU2xpZGVyO1xuIiwiY29uc3QgYW5rb3JzID0gKCkgPT4ge1xuICBjb25zdCBsaW5rcyA9ICQoXCIuanMtYW5rb3JcIik7XG4gIGlmICghbGlua3MpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBwYXJ0bmFtZSA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZTtcblxuICAvL9Cf0YDQvtCy0LXRgNGP0LXQvCDQvdCwIGRvY3VtZW50LnJlYWR5INC90LDQu9C40YfQuNC1ICNoYXNodGFnINCyIHVybCwg0Lgg0LXRgdC70Lgg0LXRgdGC0YwsINGB0LrRgNC+0LvQu9C40Lwg0LTQviDQvdGD0LbQvdC+0Lkg0YHQtdC60YbQuNC4XG4gIGNvbnN0IGNoZWNrSGFzaCA9IGZ1bmN0aW9uKCkge1xuICAgIGlmICh3aW5kb3cubG9jYXRpb24uaGFzaCkge1xuICAgICAgY29uc3QgaGFzaCA9IHdpbmRvdy5sb2NhdGlvbi5oYXNoO1xuXG4gICAgICBpZiAoJChoYXNoKS5sZW5ndGgpIHtcbiAgICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XG4gICAgICAgICAgICAgIHNjcm9sbFRvcDogKCQoaGFzaCkub2Zmc2V0KCkudG9wIC0gNjApLFxuICAgICAgICAgIH0sIDkwMCwgJ3N3aW5nJyk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gICQoZG9jdW1lbnQpLnJlYWR5KGNoZWNrSGFzaCk7XG5cbiAgLy8g0J3QsCDQutC90L7Qv9C60Lgg0LLQtdGI0LDQtdC8INC+0LHRgNCw0LHQvtGC0YfQuNC60Lgg0YHQvtCx0YvRgtC40LlcbiAgbGlua3MuZWFjaChmdW5jdGlvbigpIHtcbiAgICAkKHRoaXMpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oZXZ0KSB7XG4gICAgICBldnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgY29uc3QgaGFzaCA9ICQodGhpcykuYXR0cignZGF0YS1ocmVmJyk7XG5cbiAgICAgIGlmICgkKGhhc2gpLmxlbmd0aCkge1xuICAgICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcbiAgICAgICAgICAgICAgc2Nyb2xsVG9wOiAoJChoYXNoKS5vZmZzZXQoKS50b3AgLSAxMzApLFxuICAgICAgICAgIH0sIDkwMCwgJ3N3aW5nJyk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAkKHRoaXMpLm9uKFwiZm9jdXNcIiwgZnVuY3Rpb24oZXZ0KSB7XG4gICAgICBldnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgY29uc3QgaGFzaCA9ICQodGhpcykuYXR0cignZGF0YS1ocmVmJyk7XG5cbiAgICAgIGlmICgkKGhhc2gpLmxlbmd0aCkge1xuICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XG4gICAgICAgICAgICBzY3JvbGxUb3A6ICgkKGhhc2gpLm9mZnNldCgpLnRvcCAtIDEzMCksXG4gICAgICAgIH0sIDkwMCwgJ3N3aW5nJyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBhbmtvcnM7XG4iLCJpbXBvcnQgbm9kZUxpc3RGb3JFYWNoIGZyb20gJy4vbm9kZS1saXN0LWZvci1lYWNoJztcbmltcG9ydCB0ZWwgZnJvbSAnLi90ZWwnO1xuaW1wb3J0IGFuaW1hdGlvbiBmcm9tICcuL2FuaW1hdGlvbic7XG5pbXBvcnQgbWVudU9wZW4gZnJvbSAnLi9tZW51LW9wZW4nO1xuaW1wb3J0IG1vZGFsIGZyb20gJy4vbW9kYWwnO1xuaW1wb3J0IGhlYWRlclNjcm9sbCBmcm9tICcuL2hlYWRlcic7XG5pbXBvcnQgc2xpZGVycyBmcm9tICcuL3NsaWRlcnMnO1xuaW1wb3J0IG51bWJlciBmcm9tICcuL251bWJlcic7XG5pbXBvcnQgYnRuVXAgZnJvbSAnLi9idG4tdXAnO1xuaW1wb3J0IGFjY29yZGlvbiBmcm9tICcuL2FjY29yZGlvbic7XG5pbXBvcnQgZ29vZFF1YW50aXR5IGZyb20gJy4vZ29vZC1xdWFudGl0eSc7XG5pbXBvcnQgY29sb3JzU2VsZWN0IGZyb20gJy4vY29sb3JzLXNlbGVjdCc7XG5pbXBvcnQgZm9vdGVyRm9ybSBmcm9tICcuL2Zvb3Rlci1mb3JtJztcbmltcG9ydCBjYWxjU2xpZGVyIGZyb20gJy4vY2FsY3VsYXRvcic7XG5pbXBvcnQgYW5rb3JzIGZyb20gJy4vYW5rb3JzJztcblxuY2xhc3MgQXBwIHtcbiAgc3RhdGljIGluaXQoKSB7XG4gICAgbm9kZUxpc3RGb3JFYWNoKCk7XG4gICAgdGVsKCk7XG4gICAgYW5pbWF0aW9uKCk7XG4gICAgbWVudU9wZW4oKTtcbiAgICBoZWFkZXJTY3JvbGwoKTtcbiAgICBtb2RhbCgpO1xuICAgIHNsaWRlcnMoKTtcbiAgICBudW1iZXIoKTtcbiAgICBidG5VcCgpO1xuICAgIGFjY29yZGlvbigpO1xuICAgIGdvb2RRdWFudGl0eSgpO1xuICAgIGNvbG9yc1NlbGVjdCgpO1xuICAgIGZvb3RlckZvcm0oKTtcbiAgICBjYWxjU2xpZGVyKCk7XG4gICAgYW5rb3JzKCk7XG4gIH1cbn1cblxuXG5BcHAuaW5pdCgpO1xud2luZG93LkFwcCA9IEFwcDtcbiJdLCJuYW1lcyI6WyJub2RlTGlzdEZvckVhY2giLCJ3aW5kb3ciLCJOb2RlTGlzdCIsInByb3RvdHlwZSIsImZvckVhY2giLCJjYWxsYmFjayIsInRoaXNBcmciLCJpIiwibGVuZ3RoIiwiY2FsbCIsInRlbCIsImZvcm1CbG9ja3MiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmb3JtQmxvY2siLCJpbnB1dCIsInF1ZXJ5U2VsZWN0b3IiLCJwaG9uZU1hc2siLCJJTWFzayIsIm1hc2siLCJhbmltYXRpb24iLCJhbmltYXRpb25zIiwiV09XIiwiaW5pdCIsImJ0bnMiLCIkIiwiY2hlY2tUb3VjaERldmljZSIsImNyZWF0ZUV2ZW50IiwiZSIsImlzVG91Y2hEZXZpY2UiLCJlYWNoIiwiJGJ1dHRvbiIsIiRyaXBwbGVUZW1wbGF0ZSIsImNsYXNzIiwiYXBwZW5kIiwiJHJpcHBsZSIsImZpbmQiLCJvbiIsInBhcmVudE9mZnNldCIsIm9mZnNldCIsInJlbFgiLCJwYWdlWCIsImxlZnQiLCJyZWxZIiwicGFnZVkiLCJ0b3AiLCJjc3MiLCJ3aWR0aCIsImhlaWdodCIsIm1lbnVPcGVuIiwiJGJ1dHRvbnNNZW51IiwiJG1lbnUiLCIkYnV0dG9uQ2xvc2UiLCIkaGVhZGVyIiwiJGJ0biIsInNjcm9sbEhlYWRlciIsImhhc0NsYXNzIiwic2Nyb2xsVG9wIiwiYWRkQ2xhc3MiLCJyZW1vdmVDbGFzcyIsImNsaWNrIiwicG9zIiwicGFyc2VJbnQiLCJhdHRyIiwicmVtb3ZlQXR0ciIsInNjcm9sbFRvIiwic2V0VGltZW91dCIsInBhZ2VQb3MiLCJtb2RhbCIsIiRidXR0b25zIiwiJGJvZHkiLCJvcHRpb25zIiwiaGlkZVNjcm9sbGJhciIsInRvdWNoIiwiYnRuVHBsIiwic21hbGxCdG4iLCJiZWZvcmVTaG93IiwiZGF0YSIsInNsaWNlIiwiYm9keVN0eWxlcyIsImFmdGVyQ2xvc2UiLCJmYW5jeWJveCIsImhlYWRlclNjcm9sbCIsIm1haW4iLCJpbnRyb1RvcCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsImNoZWNrSGVhZGVySGVpZ2h0IiwidmFsdWUiLCJvdXRlckhlaWdodCIsInNsaWRlcnMiLCJTd2lwZXIiLCJhZHZhbnRhZ2VzIiwibXlTd2lwZXIiLCJkaXJlY3Rpb24iLCJzbGlkZXNQZXJWaWV3Iiwic3BhY2VCZXR3ZWVuIiwic3BlZWQiLCJuYXZpZ2F0aW9uIiwibmV4dEVsIiwicHJldkVsIiwicGhvdG9zIiwibG9vcCIsImNlbnRlcmVkU2xpZGVzIiwiYnJlYWtwb2ludHMiLCJwYWdpbmF0aW9uIiwiZWwiLCJjbGlja2FibGUiLCJyZXZpZXdzIiwic2VydGlmaWNhdGVzIiwibnVtYmVyIiwiJG51bWJlcnMiLCIkdGhpc3MiLCJidG5VcCIsInNjcm9sbCIsImlzIiwib3BhY2l0eSIsImZhZGVJbiIsInN0b3AiLCJmYWRlT3V0IiwiYW5pbWF0ZSIsImFjY29yZGlvbiIsIiRhY2NvcmRpb25zIiwiJHNpZGUiLCIkbWFpbiIsImV2dCIsInByZXZlbnREZWZhdWx0Iiwic2xpZGVVcCIsImJsdXIiLCJzbGlkZURvd24iLCJnb29kUXVhbnRpdHkiLCJjb250YWluZXJzIiwiY29udGFpbmVyIiwiYnRuSW5jcmVhc2UiLCJidG5EZWNyZWFzZSIsImJ0bkluY3JlYXNlSGFuZGxlciIsIm5ld1ZhbHVlIiwicmVtb3ZlQXR0cmlidXRlIiwiYnRuRGVjcmVhc2VIYW5kbGVyIiwic2V0QXR0cmlidXRlIiwiYWRkRXZlbnRMaXN0ZW5lciIsImNvbG9yc1NlbGVjdCIsImNvbG9yc0Jsb2NrIiwibGlua3MiLCJwaWN0dXJlQmxvY2siLCJ0ZXh0QmxvY2siLCJsaW5rIiwicGljdHVyZSIsIm5hbWUiLCJ0ZXh0IiwiZm9vdGVyRm9ybSIsIiRmb290ZXJGb3JtIiwiaW5wdXRzIiwidmFsIiwiY2FsY1NsaWRlciIsImFsbG93VG91Y2hNb3ZlIiwiZmFkZUVmZmVjdCIsImNyb3NzRmFkZSIsImVmZmVjdCIsInN0ZXBzTGlua3MiLCJidG4iLCJzbGlkZSIsImluZGV4IiwiYWN0aXZlU3RlcCIsInNsaWRlVG8iLCJhbmtvcnMiLCJwYXJ0bmFtZSIsImxvY2F0aW9uIiwicGF0aG5hbWUiLCJjaGVja0hhc2giLCJoYXNoIiwicmVhZHkiLCJBcHAiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFBQSxJQUFNQSxlQUFlLEdBQUcs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
