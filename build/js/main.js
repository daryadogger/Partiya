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
      }
    }]);

    return App;
  }();

  App.init();
  window.App = App;

}());

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsic3JjL2pzL25vZGUtbGlzdC1mb3ItZWFjaC5qcyIsInNyYy9qcy90ZWwuanMiLCJzcmMvanMvYW5pbWF0aW9uLmpzIiwic3JjL2pzL21lbnUtb3Blbi5qcyIsInNyYy9qcy9tb2RhbC5qcyIsInNyYy9qcy9oZWFkZXIuanMiLCJzcmMvanMvc2xpZGVycy5qcyIsInNyYy9qcy9udW1iZXIuanMiLCJzcmMvanMvYnRuLXVwLmpzIiwic3JjL2pzL2FjY29yZGlvbi5qcyIsInNyYy9qcy9nb29kLXF1YW50aXR5LmpzIiwic3JjL2pzL2NvbG9ycy1zZWxlY3QuanMiLCJzcmMvanMvZm9vdGVyLWZvcm0uanMiLCJzcmMvanMvY2FsY3VsYXRvci5qcyIsInNyYy9qcy9tYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IG5vZGVMaXN0Rm9yRWFjaCA9ICgpID0+IHtcbiAgaWYgKCdOb2RlTGlzdCcgaW4gd2luZG93ICYmICFOb2RlTGlzdC5wcm90b3R5cGUuZm9yRWFjaCkge1xuICAgIE5vZGVMaXN0LnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24gKGNhbGxiYWNrLCB0aGlzQXJnKSB7XG4gICAgdGhpc0FyZyA9IHRoaXNBcmcgfHwgd2luZG93O1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuICAgIGNhbGxiYWNrLmNhbGwodGhpc0FyZywgdGhpc1tpXSwgaSwgdGhpcyk7XG4gICAgfVxuICAgIH07XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IG5vZGVMaXN0Rm9yRWFjaDtcbiIsImNvbnN0IHRlbCA9ICgpID0+IHtcbiAgLy8gTWFzayBmb3IgdGVsXG4gIGNvbnN0IGZvcm1CbG9ja3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmZpZWxkc2V0XCIpO1xuXG4gIGlmIChmb3JtQmxvY2tzLmxlbmd0aCkge1xuXG4gICAgZm9ybUJsb2Nrcy5mb3JFYWNoKGZ1bmN0aW9uKGZvcm1CbG9jaykge1xuICAgICAgY29uc3QgaW5wdXQgPSBmb3JtQmxvY2sucXVlcnlTZWxlY3RvcihcImlucHV0W25hbWU9dGVsXVwiKTtcblxuICAgICAgaWYoaW5wdXQpIHtcbiAgICAgICAgY29uc3QgcGhvbmVNYXNrID0gSU1hc2soIGlucHV0LCB7XG4gICAgICAgICAgbWFzazogXCIrezd9IDAwMCAwMDAtMDAtMDBcIlxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgIH0pO1xuXG4gIH1cblxufTtcblxuZXhwb3J0IGRlZmF1bHQgdGVsO1xuIiwiY29uc3QgYW5pbWF0aW9uID0gKCkgPT4ge1xuICAvL3dvd1xuICBjb25zdCBhbmltYXRpb25zID0gbmV3IHdpbmRvdy5XT1coKS5pbml0KCk7XG5cbiAgLy9idG5zXG4gIGNvbnN0IGJ0bnMgPSAkKFwiLmpzLXJpcHBsZVwiKTtcblxuICBpZiAoYnRucykge1xuICAgIGZ1bmN0aW9uIGNoZWNrVG91Y2hEZXZpY2UoKSB7XG4gICAgICB0cnkge1xuICAgICAgICBkb2N1bWVudC5jcmVhdGVFdmVudCgnVG91Y2hFdmVudCcpO1xuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSBjYXRjaCAoZSkge1xuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgaXNUb3VjaERldmljZSA9IGNoZWNrVG91Y2hEZXZpY2UoKTtcblxuICAgIGlmICghaXNUb3VjaERldmljZSkge1xuXG4gICAgICBidG5zLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgIGxldCAkYnV0dG9uID0gJCh0aGlzKTtcbiAgICAgICAgbGV0ICRyaXBwbGVUZW1wbGF0ZSA9ICQoJzxzcGFuIC8+Jywge1xuICAgICAgICAgIGNsYXNzOiAnYnV0dG9uX19yaXBwbGUnLFxuICAgICAgICB9KTtcbiAgICAgICAgJGJ1dHRvbi5hcHBlbmQoJHJpcHBsZVRlbXBsYXRlKTtcblxuICAgICAgICBsZXQgJHJpcHBsZSA9ICRidXR0b24uZmluZCgnLmJ1dHRvbl9fcmlwcGxlJyk7XG5cbiAgICAgICAgJGJ1dHRvbi5vbignbW91c2VlbnRlcicsICcqJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgIGxldCBwYXJlbnRPZmZzZXQgPSAkYnV0dG9uLm9mZnNldCgpO1xuICAgICAgICAgIGxldCByZWxYID0gZS5wYWdlWCAtIHBhcmVudE9mZnNldC5sZWZ0O1xuICAgICAgICAgIGxldCByZWxZID0gZS5wYWdlWSAtIHBhcmVudE9mZnNldC50b3A7XG5cbiAgICAgICAgICAkcmlwcGxlLmNzcyh7XG4gICAgICAgICAgICB0b3A6IHJlbFksXG4gICAgICAgICAgICBsZWZ0OiByZWxYLFxuICAgICAgICAgICAgd2lkdGg6ICcyMjUlJyxcbiAgICAgICAgICAgIGhlaWdodDogJGJ1dHRvbi53aWR0aCgpICogMi4yNSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJGJ1dHRvbi5vbignbW91c2VvdXQnLCAnKicsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICBsZXQgcGFyZW50T2Zmc2V0ID0gJGJ1dHRvbi5vZmZzZXQoKTtcbiAgICAgICAgICBsZXQgcmVsWCA9IGUucGFnZVggLSBwYXJlbnRPZmZzZXQubGVmdDtcbiAgICAgICAgICBsZXQgcmVsWSA9IGUucGFnZVkgLSBwYXJlbnRPZmZzZXQudG9wO1xuICAgICAgICAgICRyaXBwbGUuY3NzKHtcbiAgICAgICAgICAgIHRvcDogcmVsWSxcbiAgICAgICAgICAgIGxlZnQ6IHJlbFgsXG4gICAgICAgICAgICB3aWR0aDogMCxcbiAgICAgICAgICAgIGhlaWdodDogMCxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIFxuICAgIH1cbiAgfVxuXG5cblxufTtcblxuZXhwb3J0IGRlZmF1bHQgYW5pbWF0aW9uO1xuIiwiY29uc3QgbWVudU9wZW4gPSAoKSA9PiB7XG4gIC8vINCe0YLQutGA0YvRgtC40LUg0LzQvtCxINC80LXQvdGOXG4gIGNvbnN0ICRidXR0b25zTWVudSA9ICQoXCIuanMtb3Blbi1tZW51XCIpO1xuXG4gIGlmICgkYnV0dG9uc01lbnUubGVuZ3RoKSB7XG4gICAgY29uc3QgJG1lbnUgPSAkKFwiLm1lbnVcIik7XG4gICAgY29uc3QgJGJ1dHRvbkNsb3NlID0gJChcIi5qcy1idG4tY2xvc2VcIik7XG4gICAgY29uc3QgJGhlYWRlciA9ICQoXCIuaGVhZGVyXCIpO1xuXG4gICAgJGJ1dHRvbnNNZW51LmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgY29uc3QgJGJ0biA9ICQodGhpcyk7XG5cbiAgICAgIGNvbnN0IHNjcm9sbEhlYWRlciA9ICgpID0+IHtcbiAgICAgICAgaWYgKCRtZW51Lmhhc0NsYXNzKFwiaXMtc2hvd1wiKSkge1xuXG4gICAgICAgICAgaWYoJG1lbnUuc2Nyb2xsVG9wKCkgPiAxKSB7XG4gICAgICAgICAgICAkaGVhZGVyLmFkZENsYXNzKFwic2Nyb2xsXCIpO1xuXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICRoZWFkZXIucmVtb3ZlQ2xhc3MoXCJzY3JvbGxcIik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICAkYnRuLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAvLyDQtdGB0LvQuCDQvtGC0LrRgNGL0YLQviDQvNC10L3RjlxuICAgICAgICBpZiAoJG1lbnUuaGFzQ2xhc3MoXCJpcy1zaG93XCIpKSB7XG5cbiAgICAgICAgICBjb25zdCBwb3MgPSBwYXJzZUludCgkKFwiYm9keVwiKS5hdHRyKFwiZGF0YS1zY3JvbGxcIiksIDEwKTtcbiAgICAgICAgICAkbWVudS5yZW1vdmVDbGFzcyhcImlzLXNob3dcIik7XG4gICAgICAgICAgJGJ0bi5yZW1vdmVDbGFzcyhcImlzLXNob3dcIik7XG4gICAgICAgICAgJGhlYWRlci5yZW1vdmVDbGFzcyhcInNjcm9sbFwiKTtcblxuICAgICAgICAgICQoXCJib2R5XCIpLnJlbW92ZUNsYXNzKFwiaXMtbWVudS1vcGVuXCIpLnJlbW92ZUF0dHIoXCJkYXRhLXNjcm9sbFwiKTtcbiAgICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgcG9zKTtcblxuICAgICAgICAgIC8vINC10YHQu9C4INC30LDQutGA0YvRgtC+INC80LXQvdGOXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAkbWVudS5hZGRDbGFzcyhcImlzLXNob3dcIik7XG5cbiAgICAgICAgICBpZigkbWVudS5zY3JvbGxUb3AoKSA+IDEpIHtcbiAgICAgICAgICAgICRoZWFkZXIuYWRkQ2xhc3MoXCJzY3JvbGxcIik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkYnRuLmFkZENsYXNzKFwiaXMtc2hvd1wiKTtcblxuICAgICAgICAgIH0sIDEwMCk7XG5cbiAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNvbnN0IHBhZ2VQb3MgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XG4gICAgICAgICAgICAkKFwiYm9keVwiKS5hZGRDbGFzcyhcImlzLW1lbnUtb3BlblwiKS5hdHRyKFwiZGF0YS1zY3JvbGxcIiwgcGFnZVBvcyk7XG4gICAgICAgICAgfSwgNDUwKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgICQoXCIubWVudVwiKS5vbihcInNjcm9sbFwiLCBzY3JvbGxIZWFkZXIpO1xuICAgIH0pO1xuXG4gICAgJGJ1dHRvbkNsb3NlLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnN0IHBvcyA9IHBhcnNlSW50KCQoXCJib2R5XCIpLmF0dHIoXCJkYXRhLXNjcm9sbFwiKSwgMTApO1xuICAgICAgJG1lbnUucmVtb3ZlQ2xhc3MoXCJpcy1zaG93XCIpO1xuICAgICAgJGJ1dHRvbnNNZW51LmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zdCAkYnRuID0gJCh0aGlzKTtcbiAgICAgICAgJGJ0bi5yZW1vdmVDbGFzcyhcImlzLXNob3dcIik7XG4gICAgICB9KTtcblxuICAgICAgJChcImJvZHlcIikucmVtb3ZlQ2xhc3MoXCJpcy1tZW51LW9wZW5cIikucmVtb3ZlQXR0cihcImRhdGEtc2Nyb2xsXCIpO1xuICAgICAgd2luZG93LnNjcm9sbFRvKDAsIHBvcyk7XG4gICAgfSk7XG5cbiAgfVxuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBtZW51T3BlbjtcbiIsImNvbnN0IG1vZGFsID0gKCkgPT4ge1xuICBjb25zdCAkYnV0dG9ucyA9ICQoJ1tqcy1wb3B1cC1vcGVuXScpO1xuXG4gIGlmICgkYnV0dG9ucy5sZW5ndGgpIHtcbiAgICBjb25zdCAkYm9keSA9ICQoJ2JvZHknKTtcblxuICAgICRidXR0b25zLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICBjb25zdCAkYnV0dG9uID0gJCh0aGlzKTtcbiAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgIGhpZGVTY3JvbGxiYXI6IHRydWUsXG4gICAgICAgIHRvdWNoOiBmYWxzZSxcbiAgICAgICAgYnRuVHBsIDoge1xuICAgICAgICAgIHNtYWxsQnRuIDogJydcbiAgICAgICAgfSxcbiAgICAgICAgYmVmb3JlU2hvdzogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgLy8gIEFkZCBhbm90aGVyIGJnIGNvbG9yXG4gICAgICAgICAgJCgnLmZhbmN5Ym94LWJnJykuYWRkQ2xhc3MoJGJ1dHRvbi5kYXRhKCdzcmMnKS5zbGljZSgxKSk7XG5cbiAgICAgICAgICBjb25zdCBib2R5U3R5bGVzID0ge1xuICAgICAgICAgICAgJ292ZXJmbG93LXknOiAnaGlkZGVuJyxcbiAgICAgICAgICAgICdtYXJnaW4nOiAnMCBhdXRvJ1xuICAgICAgICAgIH07XG4gICAgICAgICAgJGJvZHkuY3NzKGJvZHlTdHlsZXMpO1xuXG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAkKCRidXR0b24uZGF0YSgnc3JjJykpLmFkZENsYXNzKFwic2hvd1wiKTtcbiAgICAgICAgICB9LCAxMDApO1xuICAgICAgICB9LFxuICAgICAgICBhZnRlckNsb3NlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAvLyAgQWRkIGFub3RoZXIgYmcgY29sb3JcbiAgICAgICAgICAkKCcuZmFuY3lib3gtYmcnKS5yZW1vdmVDbGFzcygkYnV0dG9uLmRhdGEoJ3NyYycpLnNsaWNlKDEpKTtcblxuICAgICAgICAgIGNvbnN0IGJvZHlTdHlsZXMgPSB7XG4gICAgICAgICAgICAnb3ZlcmZsb3cteSc6ICd2aXNpYmxlJyxcbiAgICAgICAgICAgICdwYWRkaW5nLXJpZ2h0JzogMCxcbiAgICAgICAgICAgICdtYXJnaW4nOiAwXG4gICAgICAgICAgfTtcbiAgICAgICAgICAkYm9keS5jc3MoYm9keVN0eWxlcyk7XG5cbiAgICAgICAgICAkKCRidXR0b24uZGF0YSgnc3JjJykpLnJlbW92ZUNsYXNzKFwic2hvd1wiKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgJGJ1dHRvbi5mYW5jeWJveChvcHRpb25zKTtcbiAgICB9KTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgbW9kYWw7XG4iLCJjb25zdCBoZWFkZXJTY3JvbGwgPSAoKSA9PiB7XG4gIGNvbnN0IG1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwibWFpblwiKTtcblxuICBjb25zdCAkaGVhZGVyID0gJChcIi5oZWFkZXJcIik7XG5cbiAgaWYgKCRoZWFkZXIpIHtcblxuICAgIC8vIEhlYWRlciDQvNC10L3Rj9C10YIg0YbQstC10YLQsCDQv9GA0Lgg0YHQutGA0L7Qu9C70LUuINCe0L0g0YPQttC1IGZpeGVkINC40LfQvdCw0YfQsNC70YzQvdC+XG4gICAgY29uc3Qgc2Nyb2xsSGVhZGVyID0gKCkgPT4ge1xuICAgICAgY29uc3QgaW50cm9Ub3AgPSBtYWluLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcDtcblxuICAgICAgaWYgKGludHJvVG9wIDwgLTEpIHtcbiAgICAgICAgJGhlYWRlci5hZGRDbGFzcyhcInNjcm9sbFwiKTtcblxuICAgICAgfSBlbHNlIGlmICgkaGVhZGVyLmhhc0NsYXNzKFwic2Nyb2xsXCIpICYmIGludHJvVG9wID4gLTEpIHtcbiAgICAgICAgJGhlYWRlci5yZW1vdmVDbGFzcyhcInNjcm9sbFwiKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgJCh3aW5kb3cpLm9uKFwic2Nyb2xsXCIsIHNjcm9sbEhlYWRlcik7XG4gICAgJChkb2N1bWVudCkub24oXCJyZWFkeVwiLCBzY3JvbGxIZWFkZXIpO1xuXG5cbiAgICAvL9CU0L7QsdCw0LLQu9GP0LXRgiDQvtGC0YHRgtGD0L8g0L3QsCDRgdGC0YDQsNC90LjRhtCw0YUg0LTQu9GPINGE0LjQutGB0LjRgNC+0LLQsNC90L3QvtCz0L4g0YXQtdC00LXRgNCwXG4gICAgZnVuY3Rpb24gY2hlY2tIZWFkZXJIZWlnaHQoKSB7XG4gICAgICBjb25zdCB2YWx1ZSA9ICRoZWFkZXIub3V0ZXJIZWlnaHQoKTtcbiAgICAgIGNvbnN0IG1haW4gPSAkKFwibWFpblwiKTtcblxuICAgICAgbWFpbi5jc3MoXCJwYWRkaW5nLXRvcFwiLCB2YWx1ZSk7XG4gICAgfVxuICAgIGNoZWNrSGVhZGVySGVpZ2h0KCk7XG5cbiAgICAkKHdpbmRvdykub24oXCJyZXNpemVcIiwgY2hlY2tIZWFkZXJIZWlnaHQpO1xuICB9XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGhlYWRlclNjcm9sbDtcbiIsImNvbnN0IHNsaWRlcnMgPSAoKSA9PiB7XG4gIGNvbnN0IFN3aXBlciA9IHdpbmRvdy5Td2lwZXI7XG5cbiAgLy8gQWR2IHNsaWRlclxuICBjb25zdCBhZHZhbnRhZ2VzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5qcy1hZHZhbnRhZ2VzLXNsaWRlclwiKTtcblxuICBpZiAoYWR2YW50YWdlcykge1xuICAgIGNvbnN0IG15U3dpcGVyID0gbmV3IFN3aXBlcihcIi5qcy1hZHZhbnRhZ2VzLXNsaWRlci5zd2lwZXItY29udGFpbmVyXCIsIHtcbiAgICAgIGRpcmVjdGlvbjogXCJob3Jpem9udGFsXCIsXG4gICAgICBzbGlkZXNQZXJWaWV3OiAxLFxuICAgICAgc3BhY2VCZXR3ZWVuOiAyMCxcbiAgICAgIHNwZWVkOiA0MDAsXG4gICAgICBuYXZpZ2F0aW9uOiB7XG4gICAgICAgIG5leHRFbDogXCIuanMtYWR2YW50YWdlcy1zbGlkZXIgLnN3aXBlci1idXR0b24tbmV4dFwiLFxuICAgICAgICBwcmV2RWw6IFwiLmpzLWFkdmFudGFnZXMtc2xpZGVyIC5zd2lwZXItYnV0dG9uLXByZXZcIixcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cblxuICAvLyBQaG90b3Mgc2xpZGVyXG4gIGNvbnN0IHBob3RvcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuanMtcGhvdG9zLXNsaWRlclwiKTtcblxuICBpZiAocGhvdG9zKSB7XG4gICAgY29uc3QgbXlTd2lwZXIgPSBuZXcgU3dpcGVyKFwiLmpzLXBob3Rvcy1zbGlkZXIuc3dpcGVyLWNvbnRhaW5lclwiLCB7XG4gICAgICBkaXJlY3Rpb246IFwiaG9yaXpvbnRhbFwiLFxuICAgICAgc2xpZGVzUGVyVmlldzogMSxcbiAgICAgIHNwYWNlQmV0d2VlbjogMjAsXG4gICAgICBzcGVlZDogNDAwLFxuICAgICAgbG9vcDogdHJ1ZSxcbiAgICAgIGNlbnRlcmVkU2xpZGVzOiBmYWxzZSxcbiAgICAgIGJyZWFrcG9pbnRzOiB7XG4gICAgICAgIDc2Nzoge1xuICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDIsXG4gICAgICAgICAgc3BhY2VCZXR3ZWVuOiAyMCxcbiAgICAgICAgICBjZW50ZXJlZFNsaWRlczogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICBuYXZpZ2F0aW9uOiB7XG4gICAgICAgIG5leHRFbDogXCIuanMtcGhvdG9zLXNsaWRlciAuc3dpcGVyLWJ1dHRvbi1uZXh0XCIsXG4gICAgICAgIHByZXZFbDogXCIuanMtcGhvdG9zLXNsaWRlciAuc3dpcGVyLWJ1dHRvbi1wcmV2XCIsXG4gICAgICB9LFxuICAgICAgcGFnaW5hdGlvbjoge1xuICAgICAgICBlbDogJy5qcy1waG90b3Mtc2xpZGVyIC5zd2lwZXItcGFnaW5hdGlvbicsXG4gICAgICAgIGNsaWNrYWJsZTogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cblxuXG4gIC8vIFJldmlld3Mgc2xpZGVyXG4gIGNvbnN0IHJldmlld3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmpzLXJldmlld3Mtc2xpZGVyXCIpO1xuXG4gIGlmIChyZXZpZXdzKSB7XG4gICAgY29uc3QgbXlTd2lwZXIgPSBuZXcgU3dpcGVyKFwiLmpzLXJldmlld3Mtc2xpZGVyLnN3aXBlci1jb250YWluZXJcIiwge1xuICAgICAgZGlyZWN0aW9uOiBcImhvcml6b250YWxcIixcbiAgICAgIHNsaWRlc1BlclZpZXc6IDEsXG4gICAgICBzcGFjZUJldHdlZW46IDIwLFxuICAgICAgc3BlZWQ6IDQwMCxcbiAgICAgIGxvb3A6IHRydWUsXG4gICAgICBjZW50ZXJlZFNsaWRlczogdHJ1ZSxcbiAgICAgIGJyZWFrcG9pbnRzOiB7XG4gICAgICAgIDY4MDoge1xuICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDIsXG4gICAgICAgICAgc3BhY2VCZXR3ZWVuOiAxNSxcbiAgICAgICAgICBjZW50ZXJlZFNsaWRlczogZmFsc2UsXG4gICAgICAgIH0sXG4gICAgICAgIDc2Nzoge1xuICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDMsXG4gICAgICAgICAgc3BhY2VCZXR3ZWVuOiAxNSxcbiAgICAgICAgICBjZW50ZXJlZFNsaWRlczogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgICAgOTkxOiB7XG4gICAgICAgICAgc2xpZGVzUGVyVmlldzogMyxcbiAgICAgICAgICBzcGFjZUJldHdlZW46IDEyMCxcbiAgICAgICAgICBjZW50ZXJlZFNsaWRlczogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICBuYXZpZ2F0aW9uOiB7XG4gICAgICAgIG5leHRFbDogXCIuanMtcmV2aWV3cy1zbGlkZXIgLnN3aXBlci1idXR0b24tbmV4dFwiLFxuICAgICAgICBwcmV2RWw6IFwiLmpzLXJldmlld3Mtc2xpZGVyIC5zd2lwZXItYnV0dG9uLXByZXZcIixcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cblxuICAvLyBTZXJ0aWZpY2F0ZXMgc2xpZGVyXG4gIGNvbnN0IHNlcnRpZmljYXRlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuanMtc2VydGlmaWNhdGVzLXNsaWRlclwiKTtcblxuICBpZiAoc2VydGlmaWNhdGVzKSB7XG4gICAgY29uc3QgbXlTd2lwZXIgPSBuZXcgU3dpcGVyKFwiLmpzLXNlcnRpZmljYXRlcy1zbGlkZXIuc3dpcGVyLWNvbnRhaW5lclwiLCB7XG4gICAgICBkaXJlY3Rpb246IFwiaG9yaXpvbnRhbFwiLFxuICAgICAgc2xpZGVzUGVyVmlldzogMSxcbiAgICAgIHNwYWNlQmV0d2VlbjogMjAsXG4gICAgICBzcGVlZDogNDAwLFxuICAgICAgbG9vcDogdHJ1ZSxcbiAgICAgIGNlbnRlcmVkU2xpZGVzOiB0cnVlLFxuICAgICAgYnJlYWtwb2ludHM6IHtcbiAgICAgICAgNTAwOiB7XG4gICAgICAgICAgc2xpZGVzUGVyVmlldzogMixcbiAgICAgICAgICBzcGFjZUJldHdlZW46IDE1LFxuICAgICAgICAgIGNlbnRlcmVkU2xpZGVzOiBmYWxzZSxcbiAgICAgICAgfSxcbiAgICAgICAgNjgwOiB7XG4gICAgICAgICAgc2xpZGVzUGVyVmlldzogMyxcbiAgICAgICAgICBzcGFjZUJldHdlZW46IDE1LFxuICAgICAgICB9LFxuICAgICAgICA5OTE6IHtcbiAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAzLFxuICAgICAgICAgIHNwYWNlQmV0d2VlbjogMTIwLFxuICAgICAgICAgIGNlbnRlcmVkU2xpZGVzOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIG5hdmlnYXRpb246IHtcbiAgICAgICAgbmV4dEVsOiBcIi5qcy1zZXJ0aWZpY2F0ZXMtc2xpZGVyIC5zd2lwZXItYnV0dG9uLW5leHRcIixcbiAgICAgICAgcHJldkVsOiBcIi5qcy1zZXJ0aWZpY2F0ZXMtc2xpZGVyIC5zd2lwZXItYnV0dG9uLXByZXZcIixcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IHNsaWRlcnM7XG4iLCJjb25zdCBudW1iZXIgPSAoKSA9PiB7XG4gIC8v0KDQsNC30YDQtdGI0LDQtdGCINCy0LLQvtC0INGC0L7Qu9GM0LrQviDRhtC40YTRgCDQsiBpbnB1dFxuICBjb25zdCAkbnVtYmVycyA9ICQoXCIuanMtbnVtYmVyXCIpO1xuICBpZiAoISRudW1iZXJzKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgJG51bWJlcnMuZWFjaChmdW5jdGlvbigpIHtcbiAgICBjb25zdCAkdGhpc3MgPSAkKHRoaXMpO1xuXG4gICAgJHRoaXNzLm1hc2soJzAjJyk7XG4gIH0pO1xuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBudW1iZXI7XG4iLCJjb25zdCBidG5VcCA9ICgpID0+IHtcblxuICAkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKCkge1xuICAgIGlmICgkKHRoaXMpLnNjcm9sbFRvcCgpID4gMjAwKSB7XG4gICAgICAgIGlmICgkKCcjdXBidXR0b24nKS5pcygnOmhpZGRlbicpKSB7XG4gICAgICAgICAgICAkKCcjdXBidXR0b24nKS5jc3Moe29wYWNpdHkgOiAwLjl9KS5mYWRlSW4oJ2Zhc3QnKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7ICQoJyN1cGJ1dHRvbicpLnN0b3AodHJ1ZSwgZmFsc2UpLmZhZGVPdXQoJ2Zhc3QnKTsgfVxuICB9KTtcblxuICAkKCcjdXBidXR0b24nKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICQoJ2h0bWwsIGJvZHknKS5zdG9wKCkuYW5pbWF0ZSh7c2Nyb2xsVG9wIDogMH0sIDMwMCk7XG4gIH0pO1xuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBidG5VcDtcbiIsImNvbnN0IGFjY29yZGlvbiA9ICgpID0+IHtcbiAgY29uc3QgJGFjY29yZGlvbnMgPSAkKGAuYWNjb3JkaW9uX19pdGVtYCk7XG4gIGlmICghJGFjY29yZGlvbnMpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICAkYWNjb3JkaW9ucy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgIGNvbnN0ICR0aGlzcyA9ICQodGhpcyk7XG4gICAgY29uc3QgJHNpZGUgPSAkdGhpc3MuZmluZChgLmFjY29yZGlvbl9fbGFiZWxgKTtcbiAgICBjb25zdCAkbWFpbiA9ICR0aGlzcy5maW5kKGAuYWNjb3JkaW9uX19jb250ZW50YCk7XG5cbiAgICAkc2lkZS5vbihgY2xpY2tgLCAoZXZ0KSA9PiB7XG4gICAgICBldnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgaWYgKCRzaWRlLmhhc0NsYXNzKGBpcy1vcGVuYCkpIHtcbiAgICAgICAgJG1haW4uc2xpZGVVcChcInNsb3dcIik7XG4gICAgICAgICRzaWRlLnJlbW92ZUNsYXNzKGBpcy1vcGVuYCk7XG4gICAgICAgICRzaWRlLmJsdXIoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICRzaWRlLmFkZENsYXNzKGBpcy1vcGVuYCk7XG4gICAgICAgICRtYWluLnNsaWRlRG93bihcInNsb3dcIik7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBhY2NvcmRpb247XG4iLCJjb25zdCBnb29kUXVhbnRpdHkgPSAoKSA9PiB7XG4gIC8vINCj0LLQtdC70LjRh9C10L3QuNC1INC4INGD0LzQtdC90YzRiNC10L3QuNC1INGC0L7QstCw0YDQvtCyXG4gIGNvbnN0IGNvbnRhaW5lcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmpzLXF1YW50aXR5XCIpO1xuICBpZiAoY29udGFpbmVycy5sZW5ndGggPCAwKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29udGFpbmVycy5mb3JFYWNoKChjb250YWluZXIpID0+IHtcbiAgICBjb25zdCBpbnB1dCA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiaW5wdXRcIik7XG4gICAgY29uc3QgYnRuSW5jcmVhc2UgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcihcIi5qcy1pbmNyZWFzZVwiKTtcbiAgICBjb25zdCBidG5EZWNyZWFzZSA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiLmpzLWRlY3JlYXNlXCIpO1xuXG4gICAgbGV0IHZhbHVlO1xuXG4gICAgY29uc3QgYnRuSW5jcmVhc2VIYW5kbGVyID0gKCkgPT4ge1xuICAgICAgdmFsdWUgPSBpbnB1dC52YWx1ZTtcbiAgICAgIGxldCBuZXdWYWx1ZSA9ICsrdmFsdWU7XG5cbiAgICAgIGlmIChuZXdWYWx1ZSA+IDEpIHtcbiAgICAgICAgYnRuRGVjcmVhc2UucmVtb3ZlQXR0cmlidXRlKFwiZGlzYWJsZWRcIik7XG4gICAgICB9XG5cbiAgICAgIGlucHV0LnZhbHVlID0gbmV3VmFsdWU7XG4gICAgfTtcblxuICAgIGNvbnN0IGJ0bkRlY3JlYXNlSGFuZGxlciA9ICgpID0+IHtcbiAgICAgIHZhbHVlID0gaW5wdXQudmFsdWU7XG4gICAgICBsZXQgbmV3VmFsdWUgPSAtLXZhbHVlO1xuXG4gICAgICBpZiAobmV3VmFsdWUgPD0gMSkge1xuICAgICAgICBuZXdWYWx1ZSA9IDE7XG4gICAgICAgIGlucHV0LnZhbHVlID0gMTtcbiAgICAgICAgYnRuRGVjcmVhc2Uuc2V0QXR0cmlidXRlKFwiZGlzYWJsZWRcIiwgXCJkaXNhYmxlZFwiKTtcbiAgICAgIH1cblxuICAgICAgaW5wdXQudmFsdWUgPSBuZXdWYWx1ZTtcbiAgICB9O1xuXG4gICAgYnRuSW5jcmVhc2UuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGJ0bkluY3JlYXNlSGFuZGxlcik7XG4gICAgYnRuRGVjcmVhc2UuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGJ0bkRlY3JlYXNlSGFuZGxlcik7XG4gICAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBidG5JbmNyZWFzZUhhbmRsZXIoKTtcbiAgICAgIGJ0bkRlY3JlYXNlSGFuZGxlcigpO1xuICAgIH0pXG4gIH0pO1xuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBnb29kUXVhbnRpdHk7XG4iLCJjb25zdCBjb2xvcnNTZWxlY3QgPSAoKSA9PiB7XG4gIGNvbnN0IGNvbG9yc0Jsb2NrID0gJChcIi5jb2xvcnMtYmxvY2tcIik7XG4gIGlmICghY29sb3JzQmxvY2spIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBsaW5rcyA9IGNvbG9yc0Jsb2NrLmZpbmQoXCIuY29sb3JzLWJsb2NrX19pdGVtXCIpO1xuICBjb25zdCBwaWN0dXJlQmxvY2sgPSBjb2xvcnNCbG9jay5maW5kKFwiLmNvbG9ycy1ibG9ja19faW5mbyBpbWdcIik7XG4gIGNvbnN0IHRleHRCbG9jayA9IGNvbG9yc0Jsb2NrLmZpbmQoXCIuY29sb3JzLWJsb2NrX19pbmZvIHBcIik7XG5cbiAgbGlua3MuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgbGluayA9ICQodGhpcyk7XG5cbiAgICBsaW5rLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oZXZ0KSB7XG4gICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGxpbmtzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IHBpY3R1cmUgPSBsaW5rLmF0dHIoXCJkYXRhLWltZ1wiKTtcbiAgICAgIGNvbnN0IG5hbWUgPSBsaW5rLmZpbmQoXCJwXCIpLnRleHQoKTtcbiAgICAgIHBpY3R1cmVCbG9jay5hdHRyKFwic3JjXCIsIHBpY3R1cmUpO1xuICAgICAgdGV4dEJsb2NrLnRleHQobmFtZSk7XG5cbiAgICAgIGxpbmsuYWRkQ2xhc3MoXCJhY3RpdmVcIik7XG4gICAgfSlcbiAgfSk7XG5cblxufTtcblxuZXhwb3J0IGRlZmF1bHQgY29sb3JzU2VsZWN0O1xuIiwiY29uc3QgZm9vdGVyRm9ybSA9ICgpID0+IHtcbiAgY29uc3QgJGZvb3RlckZvcm0gPSAkKFwiLmZvb3RlciBmb3JtXCIpO1xuICBpZiAoISRmb290ZXJGb3JtKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgaW5wdXRzID0gJGZvb3RlckZvcm0uZmluZChcImlucHV0XCIpO1xuXG4gIGlucHV0cy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgIGNvbnN0IGlucHV0ID0gJCh0aGlzKTtcblxuICAgIGlucHV0Lm9uKFwiY2hhbmdlXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKGlucHV0LnZhbCgpICE9PSBgYCkge1xuICAgICAgICBpbnB1dC5hZGRDbGFzcyhcImhhcy12YWx1ZVwiKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlucHV0LnJlbW92ZUNsYXNzKFwiaGFzLXZhbHVlXCIpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcblxufTtcblxuZXhwb3J0IGRlZmF1bHQgZm9vdGVyRm9ybTtcbiIsImNvbnN0IGNhbGNTbGlkZXIgPSBmdW5jdGlvbiBjYWxjU2xpZGVyKCkge1xuICBjb25zdCBTd2lwZXIgPSB3aW5kb3cuU3dpcGVyO1xuICBjb25zdCBjb250YWluZXIgPSAkKFwiLmpzLWNhbGNcIik7XG5cbiAgaWYgKCFjb250YWluZXIpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBteVN3aXBlciA9IG5ldyBTd2lwZXIoXCIuanMtY2FsYyAuc3dpcGVyLWNvbnRhaW5lclwiLCB7XG4gICAgZGlyZWN0aW9uOiBcImhvcml6b250YWxcIixcbiAgICBzbGlkZXNQZXJWaWV3OiAxLFxuICAgIHNwYWNlQmV0d2VlbjogMCxcbiAgICBhbGxvd1RvdWNoTW92ZTogZmFsc2UsXG4gICAgc3BlZWQ6IDM1NSxcbiAgICBuYXZpZ2F0aW9uOiB7XG4gICAgICBuZXh0RWw6ICcuY2FsY19fYnRuLS1uZXh0JyxcbiAgICAgIHByZXZFbDogJy5jYWxjX19idG4tLXByZXYnXG4gICAgfSxcbiAgICBmYWRlRWZmZWN0OiB7XG4gICAgICBjcm9zc0ZhZGU6IHRydWUsXG4gICAgfSxcbiAgICBlZmZlY3Q6IFwiZmFkZVwiLFxuICB9KTtcblxuICBjb25zdCBidG5zID0gY29udGFpbmVyLmZpbmQoXCIuY2FsY19fYnRuXCIpO1xuICBjb25zdCBzdGVwc0xpbmtzID0gY29udGFpbmVyLmZpbmQoXCIuY2FsY19fc2lkZSBhXCIpO1xuXG4gIC8vINCf0LXRgNC10LrQu9GO0YfQsNC10YIg0YjQsNCz0LgsINC10YHQu9C4INC90LDQttC40LzQsNGO0YIg0LrQvdC+0L/QutC4INC90LDQstC40LPQsNGG0LjQuFxuICBidG5zLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgY29uc3QgYnRuID0gJCh0aGlzKTtcblxuICAgIGJ0bi5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgc3RlcHNMaW5rcy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zdCBsaW5rID0gJCh0aGlzKTtcbiAgICAgICAgbGluay5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBzbGlkZSA9IGNvbnRhaW5lci5maW5kKFwiLnN3aXBlci1zbGlkZS1hY3RpdmVcIik7XG4gICAgICBjb25zdCBpbmRleCA9IHNsaWRlLmF0dHIoXCJpbmRleFwiKTtcbiAgICAgIGNvbnN0IGFjdGl2ZVN0ZXAgPSAkKHN0ZXBzTGlua3NbaW5kZXhdKTtcbiAgICAgIGFjdGl2ZVN0ZXAuYWRkQ2xhc3MoXCJhY3RpdmVcIik7XG4gICAgfSk7XG4gIH0pO1xuXG4gIC8vINCf0LXRgNC10LrQu9GO0YfQsNC10YIg0LDQutGC0LjQstC90YvQuSDRgdC70LDQudC0LCDQtdGB0LvQuCDQvdCw0LbQuNC80LDRjtGCINC/0L4g0YHQsNC80LjQvCDRgdGB0YvQu9C60LDQvCDRiNCw0LPQvtCyXG4gIHN0ZXBzTGlua3MuZWFjaChmdW5jdGlvbigpIHtcbiAgICBjb25zdCBsaW5rID0gJCh0aGlzKTtcblxuICAgIGxpbmsub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICBldnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgc3RlcHNMaW5rcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcbiAgICAgIH0pO1xuXG4gICAgICBsaW5rLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xuICAgICAgY29uc3QgaW5kZXggPSBsaW5rLmF0dHIoXCJpbmRleFwiKTtcbiAgICAgIG15U3dpcGVyLnNsaWRlVG8oaW5kZXgsIDQwMCwgZmFsc2UpO1xuICAgIH0pO1xuICB9KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNhbGNTbGlkZXI7XG4iLCJpbXBvcnQgbm9kZUxpc3RGb3JFYWNoIGZyb20gJy4vbm9kZS1saXN0LWZvci1lYWNoJztcbmltcG9ydCB0ZWwgZnJvbSAnLi90ZWwnO1xuaW1wb3J0IGFuaW1hdGlvbiBmcm9tICcuL2FuaW1hdGlvbic7XG5pbXBvcnQgbWVudU9wZW4gZnJvbSAnLi9tZW51LW9wZW4nO1xuaW1wb3J0IG1vZGFsIGZyb20gJy4vbW9kYWwnO1xuaW1wb3J0IGhlYWRlclNjcm9sbCBmcm9tICcuL2hlYWRlcic7XG5pbXBvcnQgc2xpZGVycyBmcm9tICcuL3NsaWRlcnMnO1xuaW1wb3J0IG51bWJlciBmcm9tICcuL251bWJlcic7XG5pbXBvcnQgYnRuVXAgZnJvbSAnLi9idG4tdXAnO1xuaW1wb3J0IGFjY29yZGlvbiBmcm9tICcuL2FjY29yZGlvbic7XG5pbXBvcnQgZ29vZFF1YW50aXR5IGZyb20gJy4vZ29vZC1xdWFudGl0eSc7XG5pbXBvcnQgY29sb3JzU2VsZWN0IGZyb20gJy4vY29sb3JzLXNlbGVjdCc7XG5pbXBvcnQgZm9vdGVyRm9ybSBmcm9tICcuL2Zvb3Rlci1mb3JtJztcbmltcG9ydCBjYWxjU2xpZGVyIGZyb20gJy4vY2FsY3VsYXRvcic7XG5cbmNsYXNzIEFwcCB7XG4gIHN0YXRpYyBpbml0KCkge1xuICAgIG5vZGVMaXN0Rm9yRWFjaCgpO1xuICAgIHRlbCgpO1xuICAgIGFuaW1hdGlvbigpO1xuICAgIG1lbnVPcGVuKCk7XG4gICAgaGVhZGVyU2Nyb2xsKCk7XG4gICAgbW9kYWwoKTtcbiAgICBzbGlkZXJzKCk7XG4gICAgbnVtYmVyKCk7XG4gICAgYnRuVXAoKTtcbiAgICBhY2NvcmRpb24oKTtcbiAgICBnb29kUXVhbnRpdHkoKTtcbiAgICBjb2xvcnNTZWxlY3QoKTtcbiAgICBmb290ZXJGb3JtKCk7XG4gICAgY2FsY1NsaWRlcigpO1xuICB9XG59XG5cblxuQXBwLmluaXQoKTtcbndpbmRvdy5BcHAgPSBBcHA7XG4iXSwibmFtZXMiOlsibm9kZUxpc3RGb3JFYWNoIiwid2luZG93IiwiTm9kZUxpc3QiLCJwcm90b3R5cGUiLCJmb3JFYWNoIiwiY2FsbGJhY2siLCJ0aGlzQXJnIiwiaSIsImxlbmd0aCIsImNhbGwiLCJ0ZWwiLCJmb3JtQmxvY2tzIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZm9ybUJsb2NrIiwiaW5wdXQiLCJxdWVyeVNlbGVjdG9yIiwicGhvbmVNYXNrIiwiSU1hc2siLCJtYXNrIiwiYW5pbWF0aW9uIiwiYW5pbWF0aW9ucyIsIldPVyIsImluaXQiLCJidG5zIiwiJCIsImNoZWNrVG91Y2hEZXZpY2UiLCJjcmVhdGVFdmVudCIsImUiLCJpc1RvdWNoRGV2aWNlIiwiZWFjaCIsIiRidXR0b24iLCIkcmlwcGxlVGVtcGxhdGUiLCJjbGFzcyIsImFwcGVuZCIsIiRyaXBwbGUiLCJmaW5kIiwib24iLCJwYXJlbnRPZmZzZXQiLCJvZmZzZXQiLCJyZWxYIiwicGFnZVgiLCJsZWZ0IiwicmVsWSIsInBhZ2VZIiwidG9wIiwiY3NzIiwid2lkdGgiLCJoZWlnaHQiLCJtZW51T3BlbiIsIiRidXR0b25zTWVudSIsIiRtZW51IiwiJGJ1dHRvbkNsb3NlIiwiJGhlYWRlciIsIiRidG4iLCJzY3JvbGxIZWFkZXIiLCJoYXNDbGFzcyIsInNjcm9sbFRvcCIsImFkZENsYXNzIiwicmVtb3ZlQ2xhc3MiLCJjbGljayIsInBvcyIsInBhcnNlSW50IiwiYXR0ciIsInJlbW92ZUF0dHIiLCJzY3JvbGxUbyIsInNldFRpbWVvdXQiLCJwYWdlUG9zIiwibW9kYWwiLCIkYnV0dG9ucyIsIiRib2R5Iiwib3B0aW9ucyIsImhpZGVTY3JvbGxiYXIiLCJ0b3VjaCIsImJ0blRwbCIsInNtYWxsQnRuIiwiYmVmb3JlU2hvdyIsImRhdGEiLCJzbGljZSIsImJvZHlTdHlsZXMiLCJhZnRlckNsb3NlIiwiZmFuY3lib3giLCJoZWFkZXJTY3JvbGwiLCJtYWluIiwiaW50cm9Ub3AiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJjaGVja0hlYWRlckhlaWdodCIsInZhbHVlIiwib3V0ZXJIZWlnaHQiLCJzbGlkZXJzIiwiU3dpcGVyIiwiYWR2YW50YWdlcyIsIm15U3dpcGVyIiwiZGlyZWN0aW9uIiwic2xpZGVzUGVyVmlldyIsInNwYWNlQmV0d2VlbiIsInNwZWVkIiwibmF2aWdhdGlvbiIsIm5leHRFbCIsInByZXZFbCIsInBob3RvcyIsImxvb3AiLCJjZW50ZXJlZFNsaWRlcyIsImJyZWFrcG9pbnRzIiwicGFnaW5hdGlvbiIsImVsIiwiY2xpY2thYmxlIiwicmV2aWV3cyIsInNlcnRpZmljYXRlcyIsIm51bWJlciIsIiRudW1iZXJzIiwiJHRoaXNzIiwiYnRuVXAiLCJzY3JvbGwiLCJpcyIsIm9wYWNpdHkiLCJmYWRlSW4iLCJzdG9wIiwiZmFkZU91dCIsImFuaW1hdGUiLCJhY2NvcmRpb24iLCIkYWNjb3JkaW9ucyIsIiRzaWRlIiwiJG1haW4iLCJldnQiLCJwcmV2ZW50RGVmYXVsdCIsInNsaWRlVXAiLCJibHVyIiwic2xpZGVEb3duIiwiZ29vZFF1YW50aXR5IiwiY29udGFpbmVycyIsImNvbnRhaW5lciIsImJ0bkluY3JlYXNlIiwiYnRuRGVjcmVhc2UiLCJidG5JbmNyZWFzZUhhbmRsZXIiLCJuZXdWYWx1ZSIsInJlbW92ZUF0dHJpYnV0ZSIsImJ0bkRlY3JlYXNlSGFuZGxlciIsInNldEF0dHJpYnV0ZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJjb2xvcnNTZWxlY3QiLCJjb2xvcnNCbG9jayIsImxpbmtzIiwicGljdHVyZUJsb2NrIiwidGV4dEJsb2NrIiwibGluayIsInBpY3R1cmUiLCJuYW1lIiwidGV4dCIsImZvb3RlckZvcm0iLCIkZm9vdGVyRm9ybSIsImlucHV0cyIsInZhbCIsImNhbGNTbGlkZXIiLCJhbGxvd1RvdWNoTW92ZSIsImZhZGVFZmZlY3QiLCJjcm9zc0ZhZGUiLCJlZmZlY3QiLCJzdGVwc0xpbmtzIiwiYnRuIiwic2xpZGUiLCJpbmRleCIsImFjdGl2ZVN0ZXAiLCJzbGlkZVRvIiwiQXBwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBQUEsSUFBTUEsZUFBZSxHQUFHLFNBQWxCQSxlQUFrQixHQUFNO0VBQzVCLE1BQUksY0FBY0MsTUFBZCxJQUF3QixDQUFDQyxRQUFRLENBQUNDLFNBQVQsQ0FBbUJDLE9BQWhELEVBQXlEO0VBQ3ZERixJQUFBQSxRQUFRLENBQUNDLFNBQVQsQ0FBbUJDLE9BQW5CLEdBQTZCLFVBQVVDLFFBQVYsRUFBb0JDLE9BQXBCLEVBQTZCO0VBQzFEQSxNQUFBQSxPQUFPLEdBQUdBLE9BQU8sSUFBSUwsTUFBckI7O0VBQ0EsV0FBSyxJQUFJTSxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHLEtBQUtDLE1BQXpCLEVBQWlDRCxDQUFDLEVBQWxDLEVBQXNDO0VBQ3RDRixRQUFBQSxRQUFRLENBQUNJLElBQVQsQ0FBY0gsT0FBZCxFQUF1QixLQUFLQyxDQUFMLENBQXZCLEVBQWdDQSxDQUFoQyxFQUFtQyxJQUFuQztFQUNDO0VBQ0EsS0FMRDtFQU1EO0VBQ0YsQ0FURDs7RUNBQSxJQUFNRyxHQUFHLEdBQUcsU0FBTkEsR0FBTSxHQUFNO0VBQ2hCO0VBQ0EsTUFBTUMsVUFBVSxHQUFHQyxRQUFRLENBQUNDLGdCQUFULENBQTBCLFdBQTFCLENBQW5COztFQUVBLE1BQUlGLFVBQVUsQ0FBQ0gsTUFBZixFQUF1QjtFQUVyQkcsSUFBQUEsVUFBVSxDQUFDUCxP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
