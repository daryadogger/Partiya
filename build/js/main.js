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
        var height = $(".js-height");
        height.css("height", value);
      }

      checkHeaderHeight();
      $(window).on("resize", checkHeaderHeight);
    }
  };

  var sliders = function sliders() {
    var Swiper = window.Swiper; // Slider sertificates

    var sertificates = document.querySelector(".js-sertificates-slider");

    if (sertificates) {
      var mySwiper = new Swiper(".js-sertificates-slider.swiper-container", {
        direction: "horizontal",
        slidesPerView: 1,
        spaceBetween: 20,
        speed: 400,
        loop: true,
        breakpoints: {
          500: {
            slidesPerView: 2,
            spaceBetween: 15
          },
          575: {
            slidesPerView: 3,
            spaceBetween: 15
          },
          991: {
            slidesPerView: 3,
            spaceBetween: 20
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
      }
    }]);

    return App;
  }();

  App.init();
  window.App = App;

}());

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsic3JjL2pzL25vZGUtbGlzdC1mb3ItZWFjaC5qcyIsInNyYy9qcy90ZWwuanMiLCJzcmMvanMvYW5pbWF0aW9uLmpzIiwic3JjL2pzL21lbnUtb3Blbi5qcyIsInNyYy9qcy9tb2RhbC5qcyIsInNyYy9qcy9oZWFkZXIuanMiLCJzcmMvanMvc2xpZGVycy5qcyIsInNyYy9qcy9udW1iZXIuanMiLCJzcmMvanMvYnRuLXVwLmpzIiwic3JjL2pzL2FjY29yZGlvbi5qcyIsInNyYy9qcy9tYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IG5vZGVMaXN0Rm9yRWFjaCA9ICgpID0+IHtcbiAgaWYgKCdOb2RlTGlzdCcgaW4gd2luZG93ICYmICFOb2RlTGlzdC5wcm90b3R5cGUuZm9yRWFjaCkge1xuICAgIE5vZGVMaXN0LnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24gKGNhbGxiYWNrLCB0aGlzQXJnKSB7XG4gICAgdGhpc0FyZyA9IHRoaXNBcmcgfHwgd2luZG93O1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuICAgIGNhbGxiYWNrLmNhbGwodGhpc0FyZywgdGhpc1tpXSwgaSwgdGhpcyk7XG4gICAgfVxuICAgIH07XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IG5vZGVMaXN0Rm9yRWFjaDtcbiIsImNvbnN0IHRlbCA9ICgpID0+IHtcbiAgLy8gTWFzayBmb3IgdGVsXG4gIGNvbnN0IGZvcm1CbG9ja3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmZpZWxkc2V0XCIpO1xuXG4gIGlmIChmb3JtQmxvY2tzLmxlbmd0aCkge1xuXG4gICAgZm9ybUJsb2Nrcy5mb3JFYWNoKGZ1bmN0aW9uKGZvcm1CbG9jaykge1xuICAgICAgY29uc3QgaW5wdXQgPSBmb3JtQmxvY2sucXVlcnlTZWxlY3RvcihcImlucHV0W25hbWU9dGVsXVwiKTtcblxuICAgICAgaWYoaW5wdXQpIHtcbiAgICAgICAgY29uc3QgcGhvbmVNYXNrID0gSU1hc2soIGlucHV0LCB7XG4gICAgICAgICAgbWFzazogXCIrezd9IDAwMCAwMDAtMDAtMDBcIlxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgIH0pO1xuXG4gIH1cblxufTtcblxuZXhwb3J0IGRlZmF1bHQgdGVsO1xuIiwiY29uc3QgYW5pbWF0aW9uID0gKCkgPT4ge1xuICAvL3dvd1xuICBjb25zdCBhbmltYXRpb25zID0gbmV3IHdpbmRvdy5XT1coKS5pbml0KCk7XG5cbiAgLy9idG5zXG4gIGNvbnN0IGJ0bnMgPSAkKFwiLmpzLXJpcHBsZVwiKTtcblxuICBpZiAoYnRucykge1xuICAgIGZ1bmN0aW9uIGNoZWNrVG91Y2hEZXZpY2UoKSB7XG4gICAgICB0cnkge1xuICAgICAgICBkb2N1bWVudC5jcmVhdGVFdmVudCgnVG91Y2hFdmVudCcpO1xuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSBjYXRjaCAoZSkge1xuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgaXNUb3VjaERldmljZSA9IGNoZWNrVG91Y2hEZXZpY2UoKTtcblxuICAgIGlmICghaXNUb3VjaERldmljZSkge1xuXG4gICAgICBidG5zLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgIGxldCAkYnV0dG9uID0gJCh0aGlzKTtcbiAgICAgICAgbGV0ICRyaXBwbGVUZW1wbGF0ZSA9ICQoJzxzcGFuIC8+Jywge1xuICAgICAgICAgIGNsYXNzOiAnYnV0dG9uX19yaXBwbGUnLFxuICAgICAgICB9KTtcbiAgICAgICAgJGJ1dHRvbi5hcHBlbmQoJHJpcHBsZVRlbXBsYXRlKTtcblxuICAgICAgICBsZXQgJHJpcHBsZSA9ICRidXR0b24uZmluZCgnLmJ1dHRvbl9fcmlwcGxlJyk7XG5cbiAgICAgICAgJGJ1dHRvbi5vbignbW91c2VlbnRlcicsICcqJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgIGxldCBwYXJlbnRPZmZzZXQgPSAkYnV0dG9uLm9mZnNldCgpO1xuICAgICAgICAgIGxldCByZWxYID0gZS5wYWdlWCAtIHBhcmVudE9mZnNldC5sZWZ0O1xuICAgICAgICAgIGxldCByZWxZID0gZS5wYWdlWSAtIHBhcmVudE9mZnNldC50b3A7XG5cbiAgICAgICAgICAkcmlwcGxlLmNzcyh7XG4gICAgICAgICAgICB0b3A6IHJlbFksXG4gICAgICAgICAgICBsZWZ0OiByZWxYLFxuICAgICAgICAgICAgd2lkdGg6ICcyMjUlJyxcbiAgICAgICAgICAgIGhlaWdodDogJGJ1dHRvbi53aWR0aCgpICogMi4yNSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJGJ1dHRvbi5vbignbW91c2VvdXQnLCAnKicsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICBsZXQgcGFyZW50T2Zmc2V0ID0gJGJ1dHRvbi5vZmZzZXQoKTtcbiAgICAgICAgICBsZXQgcmVsWCA9IGUucGFnZVggLSBwYXJlbnRPZmZzZXQubGVmdDtcbiAgICAgICAgICBsZXQgcmVsWSA9IGUucGFnZVkgLSBwYXJlbnRPZmZzZXQudG9wO1xuICAgICAgICAgICRyaXBwbGUuY3NzKHtcbiAgICAgICAgICAgIHRvcDogcmVsWSxcbiAgICAgICAgICAgIGxlZnQ6IHJlbFgsXG4gICAgICAgICAgICB3aWR0aDogMCxcbiAgICAgICAgICAgIGhlaWdodDogMCxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIFxuICAgIH1cbiAgfVxuXG5cblxufTtcblxuZXhwb3J0IGRlZmF1bHQgYW5pbWF0aW9uO1xuIiwiY29uc3QgbWVudU9wZW4gPSAoKSA9PiB7XG4gIC8vINCe0YLQutGA0YvRgtC40LUg0LzQvtCxINC80LXQvdGOXG4gIGNvbnN0ICRidXR0b25zTWVudSA9ICQoXCIuanMtb3Blbi1tZW51XCIpO1xuXG4gIGlmICgkYnV0dG9uc01lbnUubGVuZ3RoKSB7XG4gICAgY29uc3QgJG1lbnUgPSAkKFwiLm1lbnVcIik7XG4gICAgY29uc3QgJGJ1dHRvbkNsb3NlID0gJChcIi5qcy1idG4tY2xvc2VcIik7XG4gICAgY29uc3QgJGhlYWRlciA9ICQoXCIuaGVhZGVyXCIpO1xuXG4gICAgJGJ1dHRvbnNNZW51LmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgY29uc3QgJGJ0biA9ICQodGhpcyk7XG5cbiAgICAgIGNvbnN0IHNjcm9sbEhlYWRlciA9ICgpID0+IHtcbiAgICAgICAgaWYgKCRtZW51Lmhhc0NsYXNzKFwiaXMtc2hvd1wiKSkge1xuXG4gICAgICAgICAgaWYoJG1lbnUuc2Nyb2xsVG9wKCkgPiAxKSB7XG4gICAgICAgICAgICAkaGVhZGVyLmFkZENsYXNzKFwic2Nyb2xsXCIpO1xuXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICRoZWFkZXIucmVtb3ZlQ2xhc3MoXCJzY3JvbGxcIik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICAkYnRuLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAvLyDQtdGB0LvQuCDQvtGC0LrRgNGL0YLQviDQvNC10L3RjlxuICAgICAgICBpZiAoJG1lbnUuaGFzQ2xhc3MoXCJpcy1zaG93XCIpKSB7XG5cbiAgICAgICAgICBjb25zdCBwb3MgPSBwYXJzZUludCgkKFwiYm9keVwiKS5hdHRyKFwiZGF0YS1zY3JvbGxcIiksIDEwKTtcbiAgICAgICAgICAkbWVudS5yZW1vdmVDbGFzcyhcImlzLXNob3dcIik7XG4gICAgICAgICAgJGJ0bi5yZW1vdmVDbGFzcyhcImlzLXNob3dcIik7XG4gICAgICAgICAgJGhlYWRlci5yZW1vdmVDbGFzcyhcInNjcm9sbFwiKTtcblxuICAgICAgICAgICQoXCJib2R5XCIpLnJlbW92ZUNsYXNzKFwiaXMtbWVudS1vcGVuXCIpLnJlbW92ZUF0dHIoXCJkYXRhLXNjcm9sbFwiKTtcbiAgICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgcG9zKTtcblxuICAgICAgICAgIC8vINC10YHQu9C4INC30LDQutGA0YvRgtC+INC80LXQvdGOXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAkbWVudS5hZGRDbGFzcyhcImlzLXNob3dcIik7XG5cbiAgICAgICAgICBpZigkbWVudS5zY3JvbGxUb3AoKSA+IDEpIHtcbiAgICAgICAgICAgICRoZWFkZXIuYWRkQ2xhc3MoXCJzY3JvbGxcIik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkYnRuLmFkZENsYXNzKFwiaXMtc2hvd1wiKTtcblxuICAgICAgICAgIH0sIDEwMCk7XG5cbiAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNvbnN0IHBhZ2VQb3MgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XG4gICAgICAgICAgICAkKFwiYm9keVwiKS5hZGRDbGFzcyhcImlzLW1lbnUtb3BlblwiKS5hdHRyKFwiZGF0YS1zY3JvbGxcIiwgcGFnZVBvcyk7XG4gICAgICAgICAgfSwgNDUwKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgICQoXCIubWVudVwiKS5vbihcInNjcm9sbFwiLCBzY3JvbGxIZWFkZXIpO1xuICAgIH0pO1xuXG4gICAgJGJ1dHRvbkNsb3NlLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnN0IHBvcyA9IHBhcnNlSW50KCQoXCJib2R5XCIpLmF0dHIoXCJkYXRhLXNjcm9sbFwiKSwgMTApO1xuICAgICAgJG1lbnUucmVtb3ZlQ2xhc3MoXCJpcy1zaG93XCIpO1xuICAgICAgJGJ1dHRvbnNNZW51LmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zdCAkYnRuID0gJCh0aGlzKTtcbiAgICAgICAgJGJ0bi5yZW1vdmVDbGFzcyhcImlzLXNob3dcIik7XG4gICAgICB9KTtcblxuICAgICAgJChcImJvZHlcIikucmVtb3ZlQ2xhc3MoXCJpcy1tZW51LW9wZW5cIikucmVtb3ZlQXR0cihcImRhdGEtc2Nyb2xsXCIpO1xuICAgICAgd2luZG93LnNjcm9sbFRvKDAsIHBvcyk7XG4gICAgfSk7XG5cbiAgfVxuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBtZW51T3BlbjtcbiIsImNvbnN0IG1vZGFsID0gKCkgPT4ge1xuICBjb25zdCAkYnV0dG9ucyA9ICQoJ1tqcy1wb3B1cC1vcGVuXScpO1xuXG4gIGlmICgkYnV0dG9ucy5sZW5ndGgpIHtcbiAgICBjb25zdCAkYm9keSA9ICQoJ2JvZHknKTtcblxuICAgICRidXR0b25zLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICBjb25zdCAkYnV0dG9uID0gJCh0aGlzKTtcbiAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgIGhpZGVTY3JvbGxiYXI6IHRydWUsXG4gICAgICAgIHRvdWNoOiBmYWxzZSxcbiAgICAgICAgYnRuVHBsIDoge1xuICAgICAgICAgIHNtYWxsQnRuIDogJydcbiAgICAgICAgfSxcbiAgICAgICAgYmVmb3JlU2hvdzogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgLy8gIEFkZCBhbm90aGVyIGJnIGNvbG9yXG4gICAgICAgICAgJCgnLmZhbmN5Ym94LWJnJykuYWRkQ2xhc3MoJGJ1dHRvbi5kYXRhKCdzcmMnKS5zbGljZSgxKSk7XG5cbiAgICAgICAgICBjb25zdCBib2R5U3R5bGVzID0ge1xuICAgICAgICAgICAgJ292ZXJmbG93LXknOiAnaGlkZGVuJyxcbiAgICAgICAgICAgICdtYXJnaW4nOiAnMCBhdXRvJ1xuICAgICAgICAgIH07XG4gICAgICAgICAgJGJvZHkuY3NzKGJvZHlTdHlsZXMpO1xuXG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAkKCRidXR0b24uZGF0YSgnc3JjJykpLmFkZENsYXNzKFwic2hvd1wiKTtcbiAgICAgICAgICB9LCAxMDApO1xuICAgICAgICB9LFxuICAgICAgICBhZnRlckNsb3NlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAvLyAgQWRkIGFub3RoZXIgYmcgY29sb3JcbiAgICAgICAgICAkKCcuZmFuY3lib3gtYmcnKS5yZW1vdmVDbGFzcygkYnV0dG9uLmRhdGEoJ3NyYycpLnNsaWNlKDEpKTtcblxuICAgICAgICAgIGNvbnN0IGJvZHlTdHlsZXMgPSB7XG4gICAgICAgICAgICAnb3ZlcmZsb3cteSc6ICd2aXNpYmxlJyxcbiAgICAgICAgICAgICdwYWRkaW5nLXJpZ2h0JzogMCxcbiAgICAgICAgICAgICdtYXJnaW4nOiAwXG4gICAgICAgICAgfTtcbiAgICAgICAgICAkYm9keS5jc3MoYm9keVN0eWxlcyk7XG5cbiAgICAgICAgICAkKCRidXR0b24uZGF0YSgnc3JjJykpLnJlbW92ZUNsYXNzKFwic2hvd1wiKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgJGJ1dHRvbi5mYW5jeWJveChvcHRpb25zKTtcbiAgICB9KTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgbW9kYWw7XG4iLCJjb25zdCBoZWFkZXJTY3JvbGwgPSAoKSA9PiB7XG4gIGNvbnN0IG1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwibWFpblwiKTtcblxuICBjb25zdCAkaGVhZGVyID0gJChcIi5oZWFkZXJcIik7XG5cbiAgaWYgKCRoZWFkZXIpIHtcblxuICAgIC8vIEhlYWRlciDQvNC10L3Rj9C10YIg0YbQstC10YLQsCDQv9GA0Lgg0YHQutGA0L7Qu9C70LUuINCe0L0g0YPQttC1IGZpeGVkINC40LfQvdCw0YfQsNC70YzQvdC+XG4gICAgY29uc3Qgc2Nyb2xsSGVhZGVyID0gKCkgPT4ge1xuICAgICAgY29uc3QgaW50cm9Ub3AgPSBtYWluLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcDtcblxuICAgICAgaWYgKGludHJvVG9wIDwgLTEpIHtcbiAgICAgICAgJGhlYWRlci5hZGRDbGFzcyhcInNjcm9sbFwiKTtcblxuICAgICAgfSBlbHNlIGlmICgkaGVhZGVyLmhhc0NsYXNzKFwic2Nyb2xsXCIpICYmIGludHJvVG9wID4gLTEpIHtcbiAgICAgICAgJGhlYWRlci5yZW1vdmVDbGFzcyhcInNjcm9sbFwiKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgJCh3aW5kb3cpLm9uKFwic2Nyb2xsXCIsIHNjcm9sbEhlYWRlcik7XG4gICAgJChkb2N1bWVudCkub24oXCJyZWFkeVwiLCBzY3JvbGxIZWFkZXIpO1xuXG5cbiAgICAvL9CU0L7QsdCw0LLQu9GP0LXRgiDQvtGC0YHRgtGD0L8g0L3QsCDRgdGC0YDQsNC90LjRhtCw0YUg0LTQu9GPINGE0LjQutGB0LjRgNC+0LLQsNC90L3QvtCz0L4g0YXQtdC00LXRgNCwXG4gICAgZnVuY3Rpb24gY2hlY2tIZWFkZXJIZWlnaHQoKSB7XG4gICAgICBjb25zdCB2YWx1ZSA9ICRoZWFkZXIub3V0ZXJIZWlnaHQoKTtcbiAgICAgIGNvbnN0IGhlaWdodCA9ICQoXCIuanMtaGVpZ2h0XCIpO1xuXG4gICAgICBoZWlnaHQuY3NzKFwiaGVpZ2h0XCIsIHZhbHVlKTtcbiAgICB9XG4gICAgY2hlY2tIZWFkZXJIZWlnaHQoKTtcblxuICAgICQod2luZG93KS5vbihcInJlc2l6ZVwiLCBjaGVja0hlYWRlckhlaWdodCk7XG4gIH1cblxufTtcblxuZXhwb3J0IGRlZmF1bHQgaGVhZGVyU2Nyb2xsO1xuIiwiY29uc3Qgc2xpZGVycyA9ICgpID0+IHtcbiAgY29uc3QgU3dpcGVyID0gd2luZG93LlN3aXBlcjtcblxuICAvLyBTbGlkZXIgc2VydGlmaWNhdGVzXG4gIGNvbnN0IHNlcnRpZmljYXRlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuanMtc2VydGlmaWNhdGVzLXNsaWRlclwiKTtcblxuICBpZiAoc2VydGlmaWNhdGVzKSB7XG4gICAgY29uc3QgbXlTd2lwZXIgPSBuZXcgU3dpcGVyKFwiLmpzLXNlcnRpZmljYXRlcy1zbGlkZXIuc3dpcGVyLWNvbnRhaW5lclwiLCB7XG4gICAgICBkaXJlY3Rpb246IFwiaG9yaXpvbnRhbFwiLFxuICAgICAgc2xpZGVzUGVyVmlldzogMSxcbiAgICAgIHNwYWNlQmV0d2VlbjogMjAsXG4gICAgICBzcGVlZDogNDAwLFxuICAgICAgbG9vcDogdHJ1ZSxcbiAgICAgIGJyZWFrcG9pbnRzOiB7XG4gICAgICAgIDUwMDoge1xuICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDIsXG4gICAgICAgICAgc3BhY2VCZXR3ZWVuOiAxNSxcbiAgICAgICAgfSxcbiAgICAgICAgNTc1OiB7XG4gICAgICAgICAgc2xpZGVzUGVyVmlldzogMyxcbiAgICAgICAgICBzcGFjZUJldHdlZW46IDE1LFxuICAgICAgICB9LFxuICAgICAgICA5OTE6IHtcbiAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAzLFxuICAgICAgICAgIHNwYWNlQmV0d2VlbjogMjAsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgbmF2aWdhdGlvbjoge1xuICAgICAgICBuZXh0RWw6IFwiLmpzLXNlcnRpZmljYXRlcy1zbGlkZXIgLnN3aXBlci1idXR0b24tbmV4dFwiLFxuICAgICAgICBwcmV2RWw6IFwiLmpzLXNlcnRpZmljYXRlcy1zbGlkZXIgLnN3aXBlci1idXR0b24tcHJldlwiLFxuICAgICAgfSxcbiAgICB9KTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgc2xpZGVycztcbiIsImNvbnN0IG51bWJlciA9ICgpID0+IHtcbiAgLy/QoNCw0LfRgNC10YjQsNC10YIg0LLQstC+0LQg0YLQvtC70YzQutC+INGG0LjRhNGAINCyIGlucHV0XG4gIGNvbnN0ICRudW1iZXJzID0gJChcIi5qcy1udW1iZXJcIik7XG4gIGlmICghJG51bWJlcnMpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICAkbnVtYmVycy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgIGNvbnN0ICR0aGlzcyA9ICQodGhpcyk7XG5cbiAgICAkdGhpc3MubWFzaygnMCMnKTtcbiAgfSk7XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IG51bWJlcjtcbiIsImNvbnN0IGJ0blVwID0gKCkgPT4ge1xuXG4gICQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKSB7XG4gICAgaWYgKCQodGhpcykuc2Nyb2xsVG9wKCkgPiAyMDApIHtcbiAgICAgICAgaWYgKCQoJyN1cGJ1dHRvbicpLmlzKCc6aGlkZGVuJykpIHtcbiAgICAgICAgICAgICQoJyN1cGJ1dHRvbicpLmNzcyh7b3BhY2l0eSA6IDAuOX0pLmZhZGVJbignZmFzdCcpO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHsgJCgnI3VwYnV0dG9uJykuc3RvcCh0cnVlLCBmYWxzZSkuZmFkZU91dCgnZmFzdCcpOyB9XG4gIH0pO1xuXG4gICQoJyN1cGJ1dHRvbicpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgJCgnaHRtbCwgYm9keScpLnN0b3AoKS5hbmltYXRlKHtzY3JvbGxUb3AgOiAwfSwgMzAwKTtcbiAgfSk7XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGJ0blVwO1xuIiwiY29uc3QgYWNjb3JkaW9uID0gKCkgPT4ge1xuICBjb25zdCAkYWNjb3JkaW9ucyA9ICQoYC5hY2NvcmRpb25fX2l0ZW1gKTtcbiAgaWYgKCEkYWNjb3JkaW9ucykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gICRhY2NvcmRpb25zLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgY29uc3QgJHRoaXNzID0gJCh0aGlzKTtcbiAgICBjb25zdCAkc2lkZSA9ICR0aGlzcy5maW5kKGAuYWNjb3JkaW9uX19sYWJlbGApO1xuICAgIGNvbnN0ICRtYWluID0gJHRoaXNzLmZpbmQoYC5hY2NvcmRpb25fX2NvbnRlbnRgKTtcblxuICAgICRzaWRlLm9uKGBjbGlja2AsIChldnQpID0+IHtcbiAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICBpZiAoJHNpZGUuaGFzQ2xhc3MoYGlzLW9wZW5gKSkge1xuICAgICAgICAkbWFpbi5zbGlkZVVwKFwic2xvd1wiKTtcbiAgICAgICAgJHNpZGUucmVtb3ZlQ2xhc3MoYGlzLW9wZW5gKTtcbiAgICAgICAgJHNpZGUuYmx1cigpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJHNpZGUuYWRkQ2xhc3MoYGlzLW9wZW5gKTtcbiAgICAgICAgJG1haW4uc2xpZGVEb3duKFwic2xvd1wiKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGFjY29yZGlvbjtcbiIsImltcG9ydCBub2RlTGlzdEZvckVhY2ggZnJvbSAnLi9ub2RlLWxpc3QtZm9yLWVhY2gnO1xuaW1wb3J0IHRlbCBmcm9tICcuL3RlbCc7XG5pbXBvcnQgYW5pbWF0aW9uIGZyb20gJy4vYW5pbWF0aW9uJztcbmltcG9ydCBtZW51T3BlbiBmcm9tICcuL21lbnUtb3Blbic7XG5pbXBvcnQgbW9kYWwgZnJvbSAnLi9tb2RhbCc7XG5pbXBvcnQgaGVhZGVyU2Nyb2xsIGZyb20gJy4vaGVhZGVyJztcbmltcG9ydCBzbGlkZXJzIGZyb20gJy4vc2xpZGVycyc7XG5pbXBvcnQgbnVtYmVyIGZyb20gJy4vbnVtYmVyJztcbmltcG9ydCBidG5VcCBmcm9tICcuL2J0bi11cCc7XG5pbXBvcnQgYWNjb3JkaW9uIGZyb20gJy4vYWNjb3JkaW9uJztcblxuY2xhc3MgQXBwIHtcbiAgc3RhdGljIGluaXQoKSB7XG4gICAgbm9kZUxpc3RGb3JFYWNoKCk7XG4gICAgdGVsKCk7XG4gICAgYW5pbWF0aW9uKCk7XG4gICAgbWVudU9wZW4oKTtcbiAgICBoZWFkZXJTY3JvbGwoKTtcbiAgICBtb2RhbCgpO1xuICAgIHNsaWRlcnMoKTtcbiAgICBudW1iZXIoKTtcbiAgICBidG5VcCgpO1xuICAgIGFjY29yZGlvbigpO1xuICB9XG59XG5cblxuQXBwLmluaXQoKTtcbndpbmRvdy5BcHAgPSBBcHA7XG4iXSwibmFtZXMiOlsibm9kZUxpc3RGb3JFYWNoIiwid2luZG93IiwiTm9kZUxpc3QiLCJwcm90b3R5cGUiLCJmb3JFYWNoIiwiY2FsbGJhY2siLCJ0aGlzQXJnIiwiaSIsImxlbmd0aCIsImNhbGwiLCJ0ZWwiLCJmb3JtQmxvY2tzIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZm9ybUJsb2NrIiwiaW5wdXQiLCJxdWVyeVNlbGVjdG9yIiwicGhvbmVNYXNrIiwiSU1hc2siLCJtYXNrIiwiYW5pbWF0aW9uIiwiYW5pbWF0aW9ucyIsIldPVyIsImluaXQiLCJidG5zIiwiJCIsImNoZWNrVG91Y2hEZXZpY2UiLCJjcmVhdGVFdmVudCIsImUiLCJpc1RvdWNoRGV2aWNlIiwiZWFjaCIsIiRidXR0b24iLCIkcmlwcGxlVGVtcGxhdGUiLCJjbGFzcyIsImFwcGVuZCIsIiRyaXBwbGUiLCJmaW5kIiwib24iLCJwYXJlbnRPZmZzZXQiLCJvZmZzZXQiLCJyZWxYIiwicGFnZVgiLCJsZWZ0IiwicmVsWSIsInBhZ2VZIiwidG9wIiwiY3NzIiwid2lkdGgiLCJoZWlnaHQiLCJtZW51T3BlbiIsIiRidXR0b25zTWVudSIsIiRtZW51IiwiJGJ1dHRvbkNsb3NlIiwiJGhlYWRlciIsIiRidG4iLCJzY3JvbGxIZWFkZXIiLCJoYXNDbGFzcyIsInNjcm9sbFRvcCIsImFkZENsYXNzIiwicmVtb3ZlQ2xhc3MiLCJjbGljayIsInBvcyIsInBhcnNlSW50IiwiYXR0ciIsInJlbW92ZUF0dHIiLCJzY3JvbGxUbyIsInNldFRpbWVvdXQiLCJwYWdlUG9zIiwibW9kYWwiLCIkYnV0dG9ucyIsIiRib2R5Iiwib3B0aW9ucyIsImhpZGVTY3JvbGxiYXIiLCJ0b3VjaCIsImJ0blRwbCIsInNtYWxsQnRuIiwiYmVmb3JlU2hvdyIsImRhdGEiLCJzbGljZSIsImJvZHlTdHlsZXMiLCJhZnRlckNsb3NlIiwiZmFuY3lib3giLCJoZWFkZXJTY3JvbGwiLCJtYWluIiwiaW50cm9Ub3AiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJjaGVja0hlYWRlckhlaWdodCIsInZhbHVlIiwib3V0ZXJIZWlnaHQiLCJzbGlkZXJzIiwiU3dpcGVyIiwic2VydGlmaWNhdGVzIiwibXlTd2lwZXIiLCJkaXJlY3Rpb24iLCJzbGlkZXNQZXJWaWV3Iiwic3BhY2VCZXR3ZWVuIiwic3BlZWQiLCJsb29wIiwiYnJlYWtwb2ludHMiLCJuYXZpZ2F0aW9uIiwibmV4dEVsIiwicHJldkVsIiwibnVtYmVyIiwiJG51bWJlcnMiLCIkdGhpc3MiLCJidG5VcCIsInNjcm9sbCIsImlzIiwib3BhY2l0eSIsImZhZGVJbiIsInN0b3AiLCJmYWRlT3V0IiwiYW5pbWF0ZSIsImFjY29yZGlvbiIsIiRhY2NvcmRpb25zIiwiJHNpZGUiLCIkbWFpbiIsImV2dCIsInByZXZlbnREZWZhdWx0Iiwic2xpZGVVcCIsImJsdXIiLCJzbGlkZURvd24iLCJBcHAiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFBQSxJQUFNQSxlQUFlLEdBQUcsU0FBbEJBLGVBQWtCLEdBQU07RUFDNUIsTUFBSSxjQUFjQyxNQUFkLElBQXdCLENBQUNDLFFBQVEsQ0FBQ0MsU0FBVCxDQUFtQkMsT0FBaEQsRUFBeUQ7RUFDdkRGLElBQUFBLFFBQVEsQ0FBQ0MsU0FBVCxDQUFtQkMsT0FBbkIsR0FBNkIsVUFBVUMsUUFBVixFQUFvQkMsT0FBcEIsRUFBNkI7RUFDMURBLE1BQUFBLE9BQU8sR0FBR0EsT0FBTyxJQUFJTCxNQUFyQjs7RUFDQSxXQUFLLElBQUlNLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUcsS0FBS0MsTUFBekIsRUFBaUNELENBQUMsRUFBbEMsRUFBc0M7RUFDdENGLFFBQUFBLFFBQVEsQ0FBQ0ksSUFBVCxDQUFjSCxPQUFkLEVBQXVCLEtBQUtDLENBQUwsQ0FBdkIsRUFBZ0NBLENBQWhDLEVBQW1DLElBQW5DO0VBQ0M7RUFDQSxLQUxEO0VBTUQ7RUFDRixDQVREOztFQ0FBLElBQU1HLEdBQUcsR0FBRyxTQUFOQSxHQUFNLEdBQU07RUFDaEI7RUFDQSxNQUFNQyxVQUFVLEdBQUdDLFFBQVEsQ0FBQ0MsZ0JBQVQsQ0FBMEIsV0FBMUIsQ0FBbkI7O0VBRUEsTUFBSUYsVUFBVSxDQUFDSCxNQUFmLEVBQXVCO0VBRXJCRyxJQUFBQSxVQUFVLENBQUNQLE9BQVgsQ0FBbUIsVUFBU1UsU0FBVCxFQUFvQjtFQUNyQyxVQUFNQyxLQUFLLEdBQUdELFNBQVMsQ0FBQ0UsYUFBVixDQUF3QixpQkFBeEIsQ0FBZDs7RUFFQSxV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
