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
    var Swiper = window.Swiper; // Adv sertificates

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
    } // Reviews sertificates


    var reviews = document.querySelector(".js-reviews-slider");

    if (reviews) {
      var _mySwiper = new Swiper(".js-reviews-slider.swiper-container", {
        direction: "horizontal",
        slidesPerView: 1,
        spaceBetween: 20,
        speed: 400,
        loop: true,
        centeredSlides: true,
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
            spaceBetween: 120
          }
        },
        navigation: {
          nextEl: ".js-reviews-slider .swiper-button-next",
          prevEl: ".js-reviews-slider .swiper-button-prev"
        }
      });
    } // Slider sertificates


    var sertificates = document.querySelector(".js-sertificates-slider");

    if (sertificates) {
      var _mySwiper2 = new Swiper(".js-sertificates-slider.swiper-container", {
        direction: "horizontal",
        slidesPerView: 1,
        spaceBetween: 20,
        speed: 400,
        loop: true,
        centeredSlides: true,
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
            spaceBetween: 120
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
      }
    }]);

    return App;
  }();

  App.init();
  window.App = App;

}());

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsic3JjL2pzL25vZGUtbGlzdC1mb3ItZWFjaC5qcyIsInNyYy9qcy90ZWwuanMiLCJzcmMvanMvYW5pbWF0aW9uLmpzIiwic3JjL2pzL21lbnUtb3Blbi5qcyIsInNyYy9qcy9tb2RhbC5qcyIsInNyYy9qcy9oZWFkZXIuanMiLCJzcmMvanMvc2xpZGVycy5qcyIsInNyYy9qcy9udW1iZXIuanMiLCJzcmMvanMvYnRuLXVwLmpzIiwic3JjL2pzL2FjY29yZGlvbi5qcyIsInNyYy9qcy9nb29kLXF1YW50aXR5LmpzIiwic3JjL2pzL21haW4uanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3Qgbm9kZUxpc3RGb3JFYWNoID0gKCkgPT4ge1xuICBpZiAoJ05vZGVMaXN0JyBpbiB3aW5kb3cgJiYgIU5vZGVMaXN0LnByb3RvdHlwZS5mb3JFYWNoKSB7XG4gICAgTm9kZUxpc3QucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbiAoY2FsbGJhY2ssIHRoaXNBcmcpIHtcbiAgICB0aGlzQXJnID0gdGhpc0FyZyB8fCB3aW5kb3c7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG4gICAgY2FsbGJhY2suY2FsbCh0aGlzQXJnLCB0aGlzW2ldLCBpLCB0aGlzKTtcbiAgICB9XG4gICAgfTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgbm9kZUxpc3RGb3JFYWNoO1xuIiwiY29uc3QgdGVsID0gKCkgPT4ge1xuICAvLyBNYXNrIGZvciB0ZWxcbiAgY29uc3QgZm9ybUJsb2NrcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZmllbGRzZXRcIik7XG5cbiAgaWYgKGZvcm1CbG9ja3MubGVuZ3RoKSB7XG5cbiAgICBmb3JtQmxvY2tzLmZvckVhY2goZnVuY3Rpb24oZm9ybUJsb2NrKSB7XG4gICAgICBjb25zdCBpbnB1dCA9IGZvcm1CbG9jay5xdWVyeVNlbGVjdG9yKFwiaW5wdXRbbmFtZT10ZWxdXCIpO1xuXG4gICAgICBpZihpbnB1dCkge1xuICAgICAgICBjb25zdCBwaG9uZU1hc2sgPSBJTWFzayggaW5wdXQsIHtcbiAgICAgICAgICBtYXNrOiBcIit7N30gMDAwIDAwMC0wMC0wMFwiXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgfSk7XG5cbiAgfVxuXG59O1xuXG5leHBvcnQgZGVmYXVsdCB0ZWw7XG4iLCJjb25zdCBhbmltYXRpb24gPSAoKSA9PiB7XG4gIC8vd293XG4gIGNvbnN0IGFuaW1hdGlvbnMgPSBuZXcgd2luZG93LldPVygpLmluaXQoKTtcblxuICAvL2J0bnNcbiAgY29uc3QgYnRucyA9ICQoXCIuanMtcmlwcGxlXCIpO1xuXG4gIGlmIChidG5zKSB7XG4gICAgZnVuY3Rpb24gY2hlY2tUb3VjaERldmljZSgpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdUb3VjaEV2ZW50Jyk7XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9IGNhdGNoIChlKSB7XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxldCBpc1RvdWNoRGV2aWNlID0gY2hlY2tUb3VjaERldmljZSgpO1xuXG4gICAgaWYgKCFpc1RvdWNoRGV2aWNlKSB7XG5cbiAgICAgIGJ0bnMuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgbGV0ICRidXR0b24gPSAkKHRoaXMpO1xuICAgICAgICBsZXQgJHJpcHBsZVRlbXBsYXRlID0gJCgnPHNwYW4gLz4nLCB7XG4gICAgICAgICAgY2xhc3M6ICdidXR0b25fX3JpcHBsZScsXG4gICAgICAgIH0pO1xuICAgICAgICAkYnV0dG9uLmFwcGVuZCgkcmlwcGxlVGVtcGxhdGUpO1xuXG4gICAgICAgIGxldCAkcmlwcGxlID0gJGJ1dHRvbi5maW5kKCcuYnV0dG9uX19yaXBwbGUnKTtcblxuICAgICAgICAkYnV0dG9uLm9uKCdtb3VzZWVudGVyJywgJyonLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgbGV0IHBhcmVudE9mZnNldCA9ICRidXR0b24ub2Zmc2V0KCk7XG4gICAgICAgICAgbGV0IHJlbFggPSBlLnBhZ2VYIC0gcGFyZW50T2Zmc2V0LmxlZnQ7XG4gICAgICAgICAgbGV0IHJlbFkgPSBlLnBhZ2VZIC0gcGFyZW50T2Zmc2V0LnRvcDtcblxuICAgICAgICAgICRyaXBwbGUuY3NzKHtcbiAgICAgICAgICAgIHRvcDogcmVsWSxcbiAgICAgICAgICAgIGxlZnQ6IHJlbFgsXG4gICAgICAgICAgICB3aWR0aDogJzIyNSUnLFxuICAgICAgICAgICAgaGVpZ2h0OiAkYnV0dG9uLndpZHRoKCkgKiAyLjI1LFxuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICAkYnV0dG9uLm9uKCdtb3VzZW91dCcsICcqJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgIGxldCBwYXJlbnRPZmZzZXQgPSAkYnV0dG9uLm9mZnNldCgpO1xuICAgICAgICAgIGxldCByZWxYID0gZS5wYWdlWCAtIHBhcmVudE9mZnNldC5sZWZ0O1xuICAgICAgICAgIGxldCByZWxZID0gZS5wYWdlWSAtIHBhcmVudE9mZnNldC50b3A7XG4gICAgICAgICAgJHJpcHBsZS5jc3Moe1xuICAgICAgICAgICAgdG9wOiByZWxZLFxuICAgICAgICAgICAgbGVmdDogcmVsWCxcbiAgICAgICAgICAgIHdpZHRoOiAwLFxuICAgICAgICAgICAgaGVpZ2h0OiAwLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgICAgXG4gICAgfVxuICB9XG5cblxuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBhbmltYXRpb247XG4iLCJjb25zdCBtZW51T3BlbiA9ICgpID0+IHtcbiAgLy8g0J7RgtC60YDRi9GC0LjQtSDQvNC+0LEg0LzQtdC90Y5cbiAgY29uc3QgJGJ1dHRvbnNNZW51ID0gJChcIi5qcy1vcGVuLW1lbnVcIik7XG5cbiAgaWYgKCRidXR0b25zTWVudS5sZW5ndGgpIHtcbiAgICBjb25zdCAkbWVudSA9ICQoXCIubWVudVwiKTtcbiAgICBjb25zdCAkYnV0dG9uQ2xvc2UgPSAkKFwiLmpzLWJ0bi1jbG9zZVwiKTtcbiAgICBjb25zdCAkaGVhZGVyID0gJChcIi5oZWFkZXJcIik7XG5cbiAgICAkYnV0dG9uc01lbnUuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zdCAkYnRuID0gJCh0aGlzKTtcblxuICAgICAgY29uc3Qgc2Nyb2xsSGVhZGVyID0gKCkgPT4ge1xuICAgICAgICBpZiAoJG1lbnUuaGFzQ2xhc3MoXCJpcy1zaG93XCIpKSB7XG5cbiAgICAgICAgICBpZigkbWVudS5zY3JvbGxUb3AoKSA+IDEpIHtcbiAgICAgICAgICAgICRoZWFkZXIuYWRkQ2xhc3MoXCJzY3JvbGxcIik7XG5cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJGhlYWRlci5yZW1vdmVDbGFzcyhcInNjcm9sbFwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgICRidG4uY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vINC10YHQu9C4INC+0YLQutGA0YvRgtC+INC80LXQvdGOXG4gICAgICAgIGlmICgkbWVudS5oYXNDbGFzcyhcImlzLXNob3dcIikpIHtcblxuICAgICAgICAgIGNvbnN0IHBvcyA9IHBhcnNlSW50KCQoXCJib2R5XCIpLmF0dHIoXCJkYXRhLXNjcm9sbFwiKSwgMTApO1xuICAgICAgICAgICRtZW51LnJlbW92ZUNsYXNzKFwiaXMtc2hvd1wiKTtcbiAgICAgICAgICAkYnRuLnJlbW92ZUNsYXNzKFwiaXMtc2hvd1wiKTtcbiAgICAgICAgICAkaGVhZGVyLnJlbW92ZUNsYXNzKFwic2Nyb2xsXCIpO1xuXG4gICAgICAgICAgJChcImJvZHlcIikucmVtb3ZlQ2xhc3MoXCJpcy1tZW51LW9wZW5cIikucmVtb3ZlQXR0cihcImRhdGEtc2Nyb2xsXCIpO1xuICAgICAgICAgIHdpbmRvdy5zY3JvbGxUbygwLCBwb3MpO1xuXG4gICAgICAgICAgLy8g0LXRgdC70Lgg0LfQsNC60YDRi9GC0L4g0LzQtdC90Y5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICRtZW51LmFkZENsYXNzKFwiaXMtc2hvd1wiKTtcblxuICAgICAgICAgIGlmKCRtZW51LnNjcm9sbFRvcCgpID4gMSkge1xuICAgICAgICAgICAgJGhlYWRlci5hZGRDbGFzcyhcInNjcm9sbFwiKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICRidG4uYWRkQ2xhc3MoXCJpcy1zaG93XCIpO1xuXG4gICAgICAgICAgfSwgMTAwKTtcblxuICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY29uc3QgcGFnZVBvcyA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcbiAgICAgICAgICAgICQoXCJib2R5XCIpLmFkZENsYXNzKFwiaXMtbWVudS1vcGVuXCIpLmF0dHIoXCJkYXRhLXNjcm9sbFwiLCBwYWdlUG9zKTtcbiAgICAgICAgICB9LCA0NTApO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgJChcIi5tZW51XCIpLm9uKFwic2Nyb2xsXCIsIHNjcm9sbEhlYWRlcik7XG4gICAgfSk7XG5cbiAgICAkYnV0dG9uQ2xvc2UuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICAgY29uc3QgcG9zID0gcGFyc2VJbnQoJChcImJvZHlcIikuYXR0cihcImRhdGEtc2Nyb2xsXCIpLCAxMCk7XG4gICAgICAkbWVudS5yZW1vdmVDbGFzcyhcImlzLXNob3dcIik7XG4gICAgICAkYnV0dG9uc01lbnUuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnN0ICRidG4gPSAkKHRoaXMpO1xuICAgICAgICAkYnRuLnJlbW92ZUNsYXNzKFwiaXMtc2hvd1wiKTtcbiAgICAgIH0pO1xuXG4gICAgICAkKFwiYm9keVwiKS5yZW1vdmVDbGFzcyhcImlzLW1lbnUtb3BlblwiKS5yZW1vdmVBdHRyKFwiZGF0YS1zY3JvbGxcIik7XG4gICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgcG9zKTtcbiAgICB9KTtcblxuICB9XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IG1lbnVPcGVuO1xuIiwiY29uc3QgbW9kYWwgPSAoKSA9PiB7XG4gIGNvbnN0ICRidXR0b25zID0gJCgnW2pzLXBvcHVwLW9wZW5dJyk7XG5cbiAgaWYgKCRidXR0b25zLmxlbmd0aCkge1xuICAgIGNvbnN0ICRib2R5ID0gJCgnYm9keScpO1xuXG4gICAgJGJ1dHRvbnMuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgIGNvbnN0ICRidXR0b24gPSAkKHRoaXMpO1xuICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgICAgaGlkZVNjcm9sbGJhcjogdHJ1ZSxcbiAgICAgICAgdG91Y2g6IGZhbHNlLFxuICAgICAgICBidG5UcGwgOiB7XG4gICAgICAgICAgc21hbGxCdG4gOiAnJ1xuICAgICAgICB9LFxuICAgICAgICBiZWZvcmVTaG93OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAvLyAgQWRkIGFub3RoZXIgYmcgY29sb3JcbiAgICAgICAgICAkKCcuZmFuY3lib3gtYmcnKS5hZGRDbGFzcygkYnV0dG9uLmRhdGEoJ3NyYycpLnNsaWNlKDEpKTtcblxuICAgICAgICAgIGNvbnN0IGJvZHlTdHlsZXMgPSB7XG4gICAgICAgICAgICAnb3ZlcmZsb3cteSc6ICdoaWRkZW4nLFxuICAgICAgICAgICAgJ21hcmdpbic6ICcwIGF1dG8nXG4gICAgICAgICAgfTtcbiAgICAgICAgICAkYm9keS5jc3MoYm9keVN0eWxlcyk7XG5cbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICQoJGJ1dHRvbi5kYXRhKCdzcmMnKSkuYWRkQ2xhc3MoXCJzaG93XCIpO1xuICAgICAgICAgIH0sIDEwMCk7XG4gICAgICAgIH0sXG4gICAgICAgIGFmdGVyQ2xvc2U6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIC8vICBBZGQgYW5vdGhlciBiZyBjb2xvclxuICAgICAgICAgICQoJy5mYW5jeWJveC1iZycpLnJlbW92ZUNsYXNzKCRidXR0b24uZGF0YSgnc3JjJykuc2xpY2UoMSkpO1xuXG4gICAgICAgICAgY29uc3QgYm9keVN0eWxlcyA9IHtcbiAgICAgICAgICAgICdvdmVyZmxvdy15JzogJ3Zpc2libGUnLFxuICAgICAgICAgICAgJ3BhZGRpbmctcmlnaHQnOiAwLFxuICAgICAgICAgICAgJ21hcmdpbic6IDBcbiAgICAgICAgICB9O1xuICAgICAgICAgICRib2R5LmNzcyhib2R5U3R5bGVzKTtcblxuICAgICAgICAgICQoJGJ1dHRvbi5kYXRhKCdzcmMnKSkucmVtb3ZlQ2xhc3MoXCJzaG93XCIpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICAkYnV0dG9uLmZhbmN5Ym94KG9wdGlvbnMpO1xuICAgIH0pO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBtb2RhbDtcbiIsImNvbnN0IGhlYWRlclNjcm9sbCA9ICgpID0+IHtcbiAgY29uc3QgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJtYWluXCIpO1xuXG4gIGNvbnN0ICRoZWFkZXIgPSAkKFwiLmhlYWRlclwiKTtcblxuICBpZiAoJGhlYWRlcikge1xuXG4gICAgLy8gSGVhZGVyINC80LXQvdGP0LXRgiDRhtCy0LXRgtCwINC/0YDQuCDRgdC60YDQvtC70LvQtS4g0J7QvSDRg9C20LUgZml4ZWQg0LjQt9C90LDRh9Cw0LvRjNC90L5cbiAgICBjb25zdCBzY3JvbGxIZWFkZXIgPSAoKSA9PiB7XG4gICAgICBjb25zdCBpbnRyb1RvcCA9IG1haW4uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wO1xuXG4gICAgICBpZiAoaW50cm9Ub3AgPCAtMSkge1xuICAgICAgICAkaGVhZGVyLmFkZENsYXNzKFwic2Nyb2xsXCIpO1xuXG4gICAgICB9IGVsc2UgaWYgKCRoZWFkZXIuaGFzQ2xhc3MoXCJzY3JvbGxcIikgJiYgaW50cm9Ub3AgPiAtMSkge1xuICAgICAgICAkaGVhZGVyLnJlbW92ZUNsYXNzKFwic2Nyb2xsXCIpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICAkKHdpbmRvdykub24oXCJzY3JvbGxcIiwgc2Nyb2xsSGVhZGVyKTtcbiAgICAkKGRvY3VtZW50KS5vbihcInJlYWR5XCIsIHNjcm9sbEhlYWRlcik7XG5cblxuICAgIC8v0JTQvtCx0LDQstC70Y/QtdGCINC+0YLRgdGC0YPQvyDQvdCwINGB0YLRgNCw0L3QuNGG0LDRhSDQtNC70Y8g0YTQuNC60YHQuNGA0L7QstCw0L3QvdC+0LPQviDRhdC10LTQtdGA0LBcbiAgICBmdW5jdGlvbiBjaGVja0hlYWRlckhlaWdodCgpIHtcbiAgICAgIGNvbnN0IHZhbHVlID0gJGhlYWRlci5vdXRlckhlaWdodCgpO1xuICAgICAgY29uc3QgaGVpZ2h0ID0gJChcIi5qcy1oZWlnaHRcIik7XG5cbiAgICAgIGhlaWdodC5jc3MoXCJoZWlnaHRcIiwgdmFsdWUpO1xuICAgIH1cbiAgICBjaGVja0hlYWRlckhlaWdodCgpO1xuXG4gICAgJCh3aW5kb3cpLm9uKFwicmVzaXplXCIsIGNoZWNrSGVhZGVySGVpZ2h0KTtcbiAgfVxuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBoZWFkZXJTY3JvbGw7XG4iLCJjb25zdCBzbGlkZXJzID0gKCkgPT4ge1xuICBjb25zdCBTd2lwZXIgPSB3aW5kb3cuU3dpcGVyO1xuXG4gIC8vIEFkdiBzZXJ0aWZpY2F0ZXNcbiAgY29uc3QgYWR2YW50YWdlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuanMtYWR2YW50YWdlcy1zbGlkZXJcIik7XG5cbiAgaWYgKGFkdmFudGFnZXMpIHtcbiAgICBjb25zdCBteVN3aXBlciA9IG5ldyBTd2lwZXIoXCIuanMtYWR2YW50YWdlcy1zbGlkZXIuc3dpcGVyLWNvbnRhaW5lclwiLCB7XG4gICAgICBkaXJlY3Rpb246IFwiaG9yaXpvbnRhbFwiLFxuICAgICAgc2xpZGVzUGVyVmlldzogMSxcbiAgICAgIHNwYWNlQmV0d2VlbjogMjAsXG4gICAgICBzcGVlZDogNDAwLFxuICAgICAgbmF2aWdhdGlvbjoge1xuICAgICAgICBuZXh0RWw6IFwiLmpzLWFkdmFudGFnZXMtc2xpZGVyIC5zd2lwZXItYnV0dG9uLW5leHRcIixcbiAgICAgICAgcHJldkVsOiBcIi5qcy1hZHZhbnRhZ2VzLXNsaWRlciAuc3dpcGVyLWJ1dHRvbi1wcmV2XCIsXG4gICAgICB9LFxuICAgIH0pO1xuICB9XG5cblxuICAvLyBSZXZpZXdzIHNlcnRpZmljYXRlc1xuICBjb25zdCByZXZpZXdzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5qcy1yZXZpZXdzLXNsaWRlclwiKTtcblxuICBpZiAocmV2aWV3cykge1xuICAgIGNvbnN0IG15U3dpcGVyID0gbmV3IFN3aXBlcihcIi5qcy1yZXZpZXdzLXNsaWRlci5zd2lwZXItY29udGFpbmVyXCIsIHtcbiAgICAgIGRpcmVjdGlvbjogXCJob3Jpem9udGFsXCIsXG4gICAgICBzbGlkZXNQZXJWaWV3OiAxLFxuICAgICAgc3BhY2VCZXR3ZWVuOiAyMCxcbiAgICAgIHNwZWVkOiA0MDAsXG4gICAgICBsb29wOiB0cnVlLFxuICAgICAgY2VudGVyZWRTbGlkZXM6IHRydWUsXG4gICAgICBicmVha3BvaW50czoge1xuICAgICAgICA1MDA6IHtcbiAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAyLFxuICAgICAgICAgIHNwYWNlQmV0d2VlbjogMTUsXG4gICAgICAgIH0sXG4gICAgICAgIDU3NToge1xuICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDMsXG4gICAgICAgICAgc3BhY2VCZXR3ZWVuOiAxNSxcbiAgICAgICAgfSxcbiAgICAgICAgOTkxOiB7XG4gICAgICAgICAgc2xpZGVzUGVyVmlldzogMyxcbiAgICAgICAgICBzcGFjZUJldHdlZW46IDEyMCxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICBuYXZpZ2F0aW9uOiB7XG4gICAgICAgIG5leHRFbDogXCIuanMtcmV2aWV3cy1zbGlkZXIgLnN3aXBlci1idXR0b24tbmV4dFwiLFxuICAgICAgICBwcmV2RWw6IFwiLmpzLXJldmlld3Mtc2xpZGVyIC5zd2lwZXItYnV0dG9uLXByZXZcIixcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cblxuICAvLyBTbGlkZXIgc2VydGlmaWNhdGVzXG4gIGNvbnN0IHNlcnRpZmljYXRlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuanMtc2VydGlmaWNhdGVzLXNsaWRlclwiKTtcblxuICBpZiAoc2VydGlmaWNhdGVzKSB7XG4gICAgY29uc3QgbXlTd2lwZXIgPSBuZXcgU3dpcGVyKFwiLmpzLXNlcnRpZmljYXRlcy1zbGlkZXIuc3dpcGVyLWNvbnRhaW5lclwiLCB7XG4gICAgICBkaXJlY3Rpb246IFwiaG9yaXpvbnRhbFwiLFxuICAgICAgc2xpZGVzUGVyVmlldzogMSxcbiAgICAgIHNwYWNlQmV0d2VlbjogMjAsXG4gICAgICBzcGVlZDogNDAwLFxuICAgICAgbG9vcDogdHJ1ZSxcbiAgICAgIGNlbnRlcmVkU2xpZGVzOiB0cnVlLFxuICAgICAgYnJlYWtwb2ludHM6IHtcbiAgICAgICAgNTAwOiB7XG4gICAgICAgICAgc2xpZGVzUGVyVmlldzogMixcbiAgICAgICAgICBzcGFjZUJldHdlZW46IDE1LFxuICAgICAgICB9LFxuICAgICAgICA1NzU6IHtcbiAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAzLFxuICAgICAgICAgIHNwYWNlQmV0d2VlbjogMTUsXG4gICAgICAgIH0sXG4gICAgICAgIDk5MToge1xuICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDMsXG4gICAgICAgICAgc3BhY2VCZXR3ZWVuOiAxMjAsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgbmF2aWdhdGlvbjoge1xuICAgICAgICBuZXh0RWw6IFwiLmpzLXNlcnRpZmljYXRlcy1zbGlkZXIgLnN3aXBlci1idXR0b24tbmV4dFwiLFxuICAgICAgICBwcmV2RWw6IFwiLmpzLXNlcnRpZmljYXRlcy1zbGlkZXIgLnN3aXBlci1idXR0b24tcHJldlwiLFxuICAgICAgfSxcbiAgICB9KTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgc2xpZGVycztcbiIsImNvbnN0IG51bWJlciA9ICgpID0+IHtcbiAgLy/QoNCw0LfRgNC10YjQsNC10YIg0LLQstC+0LQg0YLQvtC70YzQutC+INGG0LjRhNGAINCyIGlucHV0XG4gIGNvbnN0ICRudW1iZXJzID0gJChcIi5qcy1udW1iZXJcIik7XG4gIGlmICghJG51bWJlcnMpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICAkbnVtYmVycy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgIGNvbnN0ICR0aGlzcyA9ICQodGhpcyk7XG5cbiAgICAkdGhpc3MubWFzaygnMCMnKTtcbiAgfSk7XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IG51bWJlcjtcbiIsImNvbnN0IGJ0blVwID0gKCkgPT4ge1xuXG4gICQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKSB7XG4gICAgaWYgKCQodGhpcykuc2Nyb2xsVG9wKCkgPiAyMDApIHtcbiAgICAgICAgaWYgKCQoJyN1cGJ1dHRvbicpLmlzKCc6aGlkZGVuJykpIHtcbiAgICAgICAgICAgICQoJyN1cGJ1dHRvbicpLmNzcyh7b3BhY2l0eSA6IDAuOX0pLmZhZGVJbignZmFzdCcpO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHsgJCgnI3VwYnV0dG9uJykuc3RvcCh0cnVlLCBmYWxzZSkuZmFkZU91dCgnZmFzdCcpOyB9XG4gIH0pO1xuXG4gICQoJyN1cGJ1dHRvbicpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgJCgnaHRtbCwgYm9keScpLnN0b3AoKS5hbmltYXRlKHtzY3JvbGxUb3AgOiAwfSwgMzAwKTtcbiAgfSk7XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGJ0blVwO1xuIiwiY29uc3QgYWNjb3JkaW9uID0gKCkgPT4ge1xuICBjb25zdCAkYWNjb3JkaW9ucyA9ICQoYC5hY2NvcmRpb25fX2l0ZW1gKTtcbiAgaWYgKCEkYWNjb3JkaW9ucykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gICRhY2NvcmRpb25zLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgY29uc3QgJHRoaXNzID0gJCh0aGlzKTtcbiAgICBjb25zdCAkc2lkZSA9ICR0aGlzcy5maW5kKGAuYWNjb3JkaW9uX19sYWJlbGApO1xuICAgIGNvbnN0ICRtYWluID0gJHRoaXNzLmZpbmQoYC5hY2NvcmRpb25fX2NvbnRlbnRgKTtcblxuICAgICRzaWRlLm9uKGBjbGlja2AsIChldnQpID0+IHtcbiAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICBpZiAoJHNpZGUuaGFzQ2xhc3MoYGlzLW9wZW5gKSkge1xuICAgICAgICAkbWFpbi5zbGlkZVVwKFwic2xvd1wiKTtcbiAgICAgICAgJHNpZGUucmVtb3ZlQ2xhc3MoYGlzLW9wZW5gKTtcbiAgICAgICAgJHNpZGUuYmx1cigpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJHNpZGUuYWRkQ2xhc3MoYGlzLW9wZW5gKTtcbiAgICAgICAgJG1haW4uc2xpZGVEb3duKFwic2xvd1wiKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGFjY29yZGlvbjtcbiIsImNvbnN0IGdvb2RRdWFudGl0eSA9ICgpID0+IHtcbiAgLy8g0KPQstC10LvQuNGH0LXQvdC40LUg0Lgg0YPQvNC10L3RjNGI0LXQvdC40LUg0YLQvtCy0LDRgNC+0LJcbiAgY29uc3QgY29udGFpbmVycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuanMtcXVhbnRpdHlcIik7XG4gIGlmIChjb250YWluZXJzLmxlbmd0aCA8IDApIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb250YWluZXJzLmZvckVhY2goKGNvbnRhaW5lcikgPT4ge1xuICAgIGNvbnN0IGlucHV0ID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCJpbnB1dFwiKTtcbiAgICBjb25zdCBidG5JbmNyZWFzZSA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiLmpzLWluY3JlYXNlXCIpO1xuICAgIGNvbnN0IGJ0bkRlY3JlYXNlID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCIuanMtZGVjcmVhc2VcIik7XG5cbiAgICBsZXQgdmFsdWU7XG5cbiAgICBjb25zdCBidG5JbmNyZWFzZUhhbmRsZXIgPSAoKSA9PiB7XG4gICAgICB2YWx1ZSA9IGlucHV0LnZhbHVlO1xuICAgICAgbGV0IG5ld1ZhbHVlID0gKyt2YWx1ZTtcblxuICAgICAgaWYgKG5ld1ZhbHVlID4gMSkge1xuICAgICAgICBidG5EZWNyZWFzZS5yZW1vdmVBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiKTtcbiAgICAgIH1cblxuICAgICAgaW5wdXQudmFsdWUgPSBuZXdWYWx1ZTtcbiAgICB9O1xuXG4gICAgY29uc3QgYnRuRGVjcmVhc2VIYW5kbGVyID0gKCkgPT4ge1xuICAgICAgdmFsdWUgPSBpbnB1dC52YWx1ZTtcbiAgICAgIGxldCBuZXdWYWx1ZSA9IC0tdmFsdWU7XG5cbiAgICAgIGlmIChuZXdWYWx1ZSA8PSAxKSB7XG4gICAgICAgIG5ld1ZhbHVlID0gMTtcbiAgICAgICAgaW5wdXQudmFsdWUgPSAxO1xuICAgICAgICBidG5EZWNyZWFzZS5zZXRBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiLCBcImRpc2FibGVkXCIpO1xuICAgICAgfVxuXG4gICAgICBpbnB1dC52YWx1ZSA9IG5ld1ZhbHVlO1xuICAgIH07XG5cbiAgICBidG5JbmNyZWFzZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYnRuSW5jcmVhc2VIYW5kbGVyKTtcbiAgICBidG5EZWNyZWFzZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYnRuRGVjcmVhc2VIYW5kbGVyKTtcbiAgICBpbnB1dC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGJ0bkluY3JlYXNlSGFuZGxlcigpO1xuICAgICAgYnRuRGVjcmVhc2VIYW5kbGVyKCk7XG4gICAgfSlcbiAgfSk7XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGdvb2RRdWFudGl0eTtcbiIsImltcG9ydCBub2RlTGlzdEZvckVhY2ggZnJvbSAnLi9ub2RlLWxpc3QtZm9yLWVhY2gnO1xuaW1wb3J0IHRlbCBmcm9tICcuL3RlbCc7XG5pbXBvcnQgYW5pbWF0aW9uIGZyb20gJy4vYW5pbWF0aW9uJztcbmltcG9ydCBtZW51T3BlbiBmcm9tICcuL21lbnUtb3Blbic7XG5pbXBvcnQgbW9kYWwgZnJvbSAnLi9tb2RhbCc7XG5pbXBvcnQgaGVhZGVyU2Nyb2xsIGZyb20gJy4vaGVhZGVyJztcbmltcG9ydCBzbGlkZXJzIGZyb20gJy4vc2xpZGVycyc7XG5pbXBvcnQgbnVtYmVyIGZyb20gJy4vbnVtYmVyJztcbmltcG9ydCBidG5VcCBmcm9tICcuL2J0bi11cCc7XG5pbXBvcnQgYWNjb3JkaW9uIGZyb20gJy4vYWNjb3JkaW9uJztcbmltcG9ydCBnb29kUXVhbnRpdHkgZnJvbSAnLi9nb29kLXF1YW50aXR5JztcblxuY2xhc3MgQXBwIHtcbiAgc3RhdGljIGluaXQoKSB7XG4gICAgbm9kZUxpc3RGb3JFYWNoKCk7XG4gICAgdGVsKCk7XG4gICAgYW5pbWF0aW9uKCk7XG4gICAgbWVudU9wZW4oKTtcbiAgICBoZWFkZXJTY3JvbGwoKTtcbiAgICBtb2RhbCgpO1xuICAgIHNsaWRlcnMoKTtcbiAgICBudW1iZXIoKTtcbiAgICBidG5VcCgpO1xuICAgIGFjY29yZGlvbigpO1xuICAgIGdvb2RRdWFudGl0eSgpO1xuICB9XG59XG5cblxuQXBwLmluaXQoKTtcbndpbmRvdy5BcHAgPSBBcHA7XG4iXSwibmFtZXMiOlsibm9kZUxpc3RGb3JFYWNoIiwid2luZG93IiwiTm9kZUxpc3QiLCJwcm90b3R5cGUiLCJmb3JFYWNoIiwiY2FsbGJhY2siLCJ0aGlzQXJnIiwiaSIsImxlbmd0aCIsImNhbGwiLCJ0ZWwiLCJmb3JtQmxvY2tzIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZm9ybUJsb2NrIiwiaW5wdXQiLCJxdWVyeVNlbGVjdG9yIiwicGhvbmVNYXNrIiwiSU1hc2siLCJtYXNrIiwiYW5pbWF0aW9uIiwiYW5pbWF0aW9ucyIsIldPVyIsImluaXQiLCJidG5zIiwiJCIsImNoZWNrVG91Y2hEZXZpY2UiLCJjcmVhdGVFdmVudCIsImUiLCJpc1RvdWNoRGV2aWNlIiwiZWFjaCIsIiRidXR0b24iLCIkcmlwcGxlVGVtcGxhdGUiLCJjbGFzcyIsImFwcGVuZCIsIiRyaXBwbGUiLCJmaW5kIiwib24iLCJwYXJlbnRPZmZzZXQiLCJvZmZzZXQiLCJyZWxYIiwicGFnZVgiLCJsZWZ0IiwicmVsWSIsInBhZ2VZIiwidG9wIiwiY3NzIiwid2lkdGgiLCJoZWlnaHQiLCJtZW51T3BlbiIsIiRidXR0b25zTWVudSIsIiRtZW51IiwiJGJ1dHRvbkNsb3NlIiwiJGhlYWRlciIsIiRidG4iLCJzY3JvbGxIZWFkZXIiLCJoYXNDbGFzcyIsInNjcm9sbFRvcCIsImFkZENsYXNzIiwicmVtb3ZlQ2xhc3MiLCJjbGljayIsInBvcyIsInBhcnNlSW50IiwiYXR0ciIsInJlbW92ZUF0dHIiLCJzY3JvbGxUbyIsInNldFRpbWVvdXQiLCJwYWdlUG9zIiwibW9kYWwiLCIkYnV0dG9ucyIsIiRib2R5Iiwib3B0aW9ucyIsImhpZGVTY3JvbGxiYXIiLCJ0b3VjaCIsImJ0blRwbCIsInNtYWxsQnRuIiwiYmVmb3JlU2hvdyIsImRhdGEiLCJzbGljZSIsImJvZHlTdHlsZXMiLCJhZnRlckNsb3NlIiwiZmFuY3lib3giLCJoZWFkZXJTY3JvbGwiLCJtYWluIiwiaW50cm9Ub3AiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJjaGVja0hlYWRlckhlaWdodCIsInZhbHVlIiwib3V0ZXJIZWlnaHQiLCJzbGlkZXJzIiwiU3dpcGVyIiwiYWR2YW50YWdlcyIsIm15U3dpcGVyIiwiZGlyZWN0aW9uIiwic2xpZGVzUGVyVmlldyIsInNwYWNlQmV0d2VlbiIsInNwZWVkIiwibmF2aWdhdGlvbiIsIm5leHRFbCIsInByZXZFbCIsInJldmlld3MiLCJsb29wIiwiY2VudGVyZWRTbGlkZXMiLCJicmVha3BvaW50cyIsInNlcnRpZmljYXRlcyIsIm51bWJlciIsIiRudW1iZXJzIiwiJHRoaXNzIiwiYnRuVXAiLCJzY3JvbGwiLCJpcyIsIm9wYWNpdHkiLCJmYWRlSW4iLCJzdG9wIiwiZmFkZU91dCIsImFuaW1hdGUiLCJhY2NvcmRpb24iLCIkYWNjb3JkaW9ucyIsIiRzaWRlIiwiJG1haW4iLCJldnQiLCJwcmV2ZW50RGVmYXVsdCIsInNsaWRlVXAiLCJibHVyIiwic2xpZGVEb3duIiwiZ29vZFF1YW50aXR5IiwiY29udGFpbmVycyIsImNvbnRhaW5lciIsImJ0bkluY3JlYXNlIiwiYnRuRGVjcmVhc2UiLCJidG5JbmNyZWFzZUhhbmRsZXIiLCJuZXdWYWx1ZSIsInJlbW92ZUF0dHJpYnV0ZSIsImJ0bkRlY3JlYXNlSGFuZGxlciIsInNldEF0dHJpYnV0ZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJBcHAiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFBQSxJQUFNQSxlQUFlLEdBQUcsU0FBbEJBLGVBQWtCLEdBQU07RUFDNUIsTUFBSSxjQUFjQyxNQUFkLElBQXdCLENBQUNDLFFBQVEsQ0FBQ0MsU0FBVCxDQUFtQkMsT0FBaEQsRUFBeUQ7RUFDdkRGLElBQUFBLFFBQVEsQ0FBQ0MsU0FBVCxDQUFtQkMsT0FBbkIsR0FBNkIsVUFBVUMsUUFBVixFQUFvQkMsT0FBcEIsRUFBNkI7RUFDMURBLE1BQUFBLE9BQU8sR0FBR0EsT0FBTyxJQUFJTCxNQUFyQjs7RUFDQSxXQUFLLElBQUlNLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUcsS0FBS0MsTUFBekIsRUFBaUNELENBQUMsRUFBbEMsRUFBc0M7RUFDdENGLFFBQUFBLFFBQVEsQ0FBQ0ksSUFBVCxDQUFjSCxPQUFkLEVBQXVCLEtBQUtDLENBQUwsQ0FBdkIsRUFBZ0NBLENBQWhDLEVBQW1DLElBQW5DO0VBQ0M7RUFDQSxLQUxEO0VBTUQ7RUFDRixDQVREOztFQ0FBLElBQU1HLEdBQUcsR0FBRyxTQUFOQSxHQUFNLEdBQU07RUFDaEI7RUFD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
