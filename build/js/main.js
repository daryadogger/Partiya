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
    var Swiper = window.Swiper; // Reviews sertificates

    var reviews = document.querySelector(".js-reviews-slider");

    if (reviews) {
      var mySwiper = new Swiper(".js-reviews-slider.swiper-container", {
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
      var _mySwiper = new Swiper(".js-sertificates-slider.swiper-container", {
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsic3JjL2pzL25vZGUtbGlzdC1mb3ItZWFjaC5qcyIsInNyYy9qcy90ZWwuanMiLCJzcmMvanMvYW5pbWF0aW9uLmpzIiwic3JjL2pzL21lbnUtb3Blbi5qcyIsInNyYy9qcy9tb2RhbC5qcyIsInNyYy9qcy9oZWFkZXIuanMiLCJzcmMvanMvc2xpZGVycy5qcyIsInNyYy9qcy9udW1iZXIuanMiLCJzcmMvanMvYnRuLXVwLmpzIiwic3JjL2pzL2FjY29yZGlvbi5qcyIsInNyYy9qcy9nb29kLXF1YW50aXR5LmpzIiwic3JjL2pzL21haW4uanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3Qgbm9kZUxpc3RGb3JFYWNoID0gKCkgPT4ge1xuICBpZiAoJ05vZGVMaXN0JyBpbiB3aW5kb3cgJiYgIU5vZGVMaXN0LnByb3RvdHlwZS5mb3JFYWNoKSB7XG4gICAgTm9kZUxpc3QucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbiAoY2FsbGJhY2ssIHRoaXNBcmcpIHtcbiAgICB0aGlzQXJnID0gdGhpc0FyZyB8fCB3aW5kb3c7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG4gICAgY2FsbGJhY2suY2FsbCh0aGlzQXJnLCB0aGlzW2ldLCBpLCB0aGlzKTtcbiAgICB9XG4gICAgfTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgbm9kZUxpc3RGb3JFYWNoO1xuIiwiY29uc3QgdGVsID0gKCkgPT4ge1xuICAvLyBNYXNrIGZvciB0ZWxcbiAgY29uc3QgZm9ybUJsb2NrcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZmllbGRzZXRcIik7XG5cbiAgaWYgKGZvcm1CbG9ja3MubGVuZ3RoKSB7XG5cbiAgICBmb3JtQmxvY2tzLmZvckVhY2goZnVuY3Rpb24oZm9ybUJsb2NrKSB7XG4gICAgICBjb25zdCBpbnB1dCA9IGZvcm1CbG9jay5xdWVyeVNlbGVjdG9yKFwiaW5wdXRbbmFtZT10ZWxdXCIpO1xuXG4gICAgICBpZihpbnB1dCkge1xuICAgICAgICBjb25zdCBwaG9uZU1hc2sgPSBJTWFzayggaW5wdXQsIHtcbiAgICAgICAgICBtYXNrOiBcIit7N30gMDAwIDAwMC0wMC0wMFwiXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgfSk7XG5cbiAgfVxuXG59O1xuXG5leHBvcnQgZGVmYXVsdCB0ZWw7XG4iLCJjb25zdCBhbmltYXRpb24gPSAoKSA9PiB7XG4gIC8vd293XG4gIGNvbnN0IGFuaW1hdGlvbnMgPSBuZXcgd2luZG93LldPVygpLmluaXQoKTtcblxuICAvL2J0bnNcbiAgY29uc3QgYnRucyA9ICQoXCIuanMtcmlwcGxlXCIpO1xuXG4gIGlmIChidG5zKSB7XG4gICAgZnVuY3Rpb24gY2hlY2tUb3VjaERldmljZSgpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdUb3VjaEV2ZW50Jyk7XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9IGNhdGNoIChlKSB7XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxldCBpc1RvdWNoRGV2aWNlID0gY2hlY2tUb3VjaERldmljZSgpO1xuXG4gICAgaWYgKCFpc1RvdWNoRGV2aWNlKSB7XG5cbiAgICAgIGJ0bnMuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgbGV0ICRidXR0b24gPSAkKHRoaXMpO1xuICAgICAgICBsZXQgJHJpcHBsZVRlbXBsYXRlID0gJCgnPHNwYW4gLz4nLCB7XG4gICAgICAgICAgY2xhc3M6ICdidXR0b25fX3JpcHBsZScsXG4gICAgICAgIH0pO1xuICAgICAgICAkYnV0dG9uLmFwcGVuZCgkcmlwcGxlVGVtcGxhdGUpO1xuXG4gICAgICAgIGxldCAkcmlwcGxlID0gJGJ1dHRvbi5maW5kKCcuYnV0dG9uX19yaXBwbGUnKTtcblxuICAgICAgICAkYnV0dG9uLm9uKCdtb3VzZWVudGVyJywgJyonLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgbGV0IHBhcmVudE9mZnNldCA9ICRidXR0b24ub2Zmc2V0KCk7XG4gICAgICAgICAgbGV0IHJlbFggPSBlLnBhZ2VYIC0gcGFyZW50T2Zmc2V0LmxlZnQ7XG4gICAgICAgICAgbGV0IHJlbFkgPSBlLnBhZ2VZIC0gcGFyZW50T2Zmc2V0LnRvcDtcblxuICAgICAgICAgICRyaXBwbGUuY3NzKHtcbiAgICAgICAgICAgIHRvcDogcmVsWSxcbiAgICAgICAgICAgIGxlZnQ6IHJlbFgsXG4gICAgICAgICAgICB3aWR0aDogJzIyNSUnLFxuICAgICAgICAgICAgaGVpZ2h0OiAkYnV0dG9uLndpZHRoKCkgKiAyLjI1LFxuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICAkYnV0dG9uLm9uKCdtb3VzZW91dCcsICcqJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgIGxldCBwYXJlbnRPZmZzZXQgPSAkYnV0dG9uLm9mZnNldCgpO1xuICAgICAgICAgIGxldCByZWxYID0gZS5wYWdlWCAtIHBhcmVudE9mZnNldC5sZWZ0O1xuICAgICAgICAgIGxldCByZWxZID0gZS5wYWdlWSAtIHBhcmVudE9mZnNldC50b3A7XG4gICAgICAgICAgJHJpcHBsZS5jc3Moe1xuICAgICAgICAgICAgdG9wOiByZWxZLFxuICAgICAgICAgICAgbGVmdDogcmVsWCxcbiAgICAgICAgICAgIHdpZHRoOiAwLFxuICAgICAgICAgICAgaGVpZ2h0OiAwLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgICAgXG4gICAgfVxuICB9XG5cblxuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBhbmltYXRpb247XG4iLCJjb25zdCBtZW51T3BlbiA9ICgpID0+IHtcbiAgLy8g0J7RgtC60YDRi9GC0LjQtSDQvNC+0LEg0LzQtdC90Y5cbiAgY29uc3QgJGJ1dHRvbnNNZW51ID0gJChcIi5qcy1vcGVuLW1lbnVcIik7XG5cbiAgaWYgKCRidXR0b25zTWVudS5sZW5ndGgpIHtcbiAgICBjb25zdCAkbWVudSA9ICQoXCIubWVudVwiKTtcbiAgICBjb25zdCAkYnV0dG9uQ2xvc2UgPSAkKFwiLmpzLWJ0bi1jbG9zZVwiKTtcbiAgICBjb25zdCAkaGVhZGVyID0gJChcIi5oZWFkZXJcIik7XG5cbiAgICAkYnV0dG9uc01lbnUuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zdCAkYnRuID0gJCh0aGlzKTtcblxuICAgICAgY29uc3Qgc2Nyb2xsSGVhZGVyID0gKCkgPT4ge1xuICAgICAgICBpZiAoJG1lbnUuaGFzQ2xhc3MoXCJpcy1zaG93XCIpKSB7XG5cbiAgICAgICAgICBpZigkbWVudS5zY3JvbGxUb3AoKSA+IDEpIHtcbiAgICAgICAgICAgICRoZWFkZXIuYWRkQ2xhc3MoXCJzY3JvbGxcIik7XG5cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJGhlYWRlci5yZW1vdmVDbGFzcyhcInNjcm9sbFwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgICRidG4uY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vINC10YHQu9C4INC+0YLQutGA0YvRgtC+INC80LXQvdGOXG4gICAgICAgIGlmICgkbWVudS5oYXNDbGFzcyhcImlzLXNob3dcIikpIHtcblxuICAgICAgICAgIGNvbnN0IHBvcyA9IHBhcnNlSW50KCQoXCJib2R5XCIpLmF0dHIoXCJkYXRhLXNjcm9sbFwiKSwgMTApO1xuICAgICAgICAgICRtZW51LnJlbW92ZUNsYXNzKFwiaXMtc2hvd1wiKTtcbiAgICAgICAgICAkYnRuLnJlbW92ZUNsYXNzKFwiaXMtc2hvd1wiKTtcbiAgICAgICAgICAkaGVhZGVyLnJlbW92ZUNsYXNzKFwic2Nyb2xsXCIpO1xuXG4gICAgICAgICAgJChcImJvZHlcIikucmVtb3ZlQ2xhc3MoXCJpcy1tZW51LW9wZW5cIikucmVtb3ZlQXR0cihcImRhdGEtc2Nyb2xsXCIpO1xuICAgICAgICAgIHdpbmRvdy5zY3JvbGxUbygwLCBwb3MpO1xuXG4gICAgICAgICAgLy8g0LXRgdC70Lgg0LfQsNC60YDRi9GC0L4g0LzQtdC90Y5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICRtZW51LmFkZENsYXNzKFwiaXMtc2hvd1wiKTtcblxuICAgICAgICAgIGlmKCRtZW51LnNjcm9sbFRvcCgpID4gMSkge1xuICAgICAgICAgICAgJGhlYWRlci5hZGRDbGFzcyhcInNjcm9sbFwiKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICRidG4uYWRkQ2xhc3MoXCJpcy1zaG93XCIpO1xuXG4gICAgICAgICAgfSwgMTAwKTtcblxuICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY29uc3QgcGFnZVBvcyA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcbiAgICAgICAgICAgICQoXCJib2R5XCIpLmFkZENsYXNzKFwiaXMtbWVudS1vcGVuXCIpLmF0dHIoXCJkYXRhLXNjcm9sbFwiLCBwYWdlUG9zKTtcbiAgICAgICAgICB9LCA0NTApO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgJChcIi5tZW51XCIpLm9uKFwic2Nyb2xsXCIsIHNjcm9sbEhlYWRlcik7XG4gICAgfSk7XG5cbiAgICAkYnV0dG9uQ2xvc2UuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICAgY29uc3QgcG9zID0gcGFyc2VJbnQoJChcImJvZHlcIikuYXR0cihcImRhdGEtc2Nyb2xsXCIpLCAxMCk7XG4gICAgICAkbWVudS5yZW1vdmVDbGFzcyhcImlzLXNob3dcIik7XG4gICAgICAkYnV0dG9uc01lbnUuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnN0ICRidG4gPSAkKHRoaXMpO1xuICAgICAgICAkYnRuLnJlbW92ZUNsYXNzKFwiaXMtc2hvd1wiKTtcbiAgICAgIH0pO1xuXG4gICAgICAkKFwiYm9keVwiKS5yZW1vdmVDbGFzcyhcImlzLW1lbnUtb3BlblwiKS5yZW1vdmVBdHRyKFwiZGF0YS1zY3JvbGxcIik7XG4gICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgcG9zKTtcbiAgICB9KTtcblxuICB9XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IG1lbnVPcGVuO1xuIiwiY29uc3QgbW9kYWwgPSAoKSA9PiB7XG4gIGNvbnN0ICRidXR0b25zID0gJCgnW2pzLXBvcHVwLW9wZW5dJyk7XG5cbiAgaWYgKCRidXR0b25zLmxlbmd0aCkge1xuICAgIGNvbnN0ICRib2R5ID0gJCgnYm9keScpO1xuXG4gICAgJGJ1dHRvbnMuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgIGNvbnN0ICRidXR0b24gPSAkKHRoaXMpO1xuICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgICAgaGlkZVNjcm9sbGJhcjogdHJ1ZSxcbiAgICAgICAgdG91Y2g6IGZhbHNlLFxuICAgICAgICBidG5UcGwgOiB7XG4gICAgICAgICAgc21hbGxCdG4gOiAnJ1xuICAgICAgICB9LFxuICAgICAgICBiZWZvcmVTaG93OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAvLyAgQWRkIGFub3RoZXIgYmcgY29sb3JcbiAgICAgICAgICAkKCcuZmFuY3lib3gtYmcnKS5hZGRDbGFzcygkYnV0dG9uLmRhdGEoJ3NyYycpLnNsaWNlKDEpKTtcblxuICAgICAgICAgIGNvbnN0IGJvZHlTdHlsZXMgPSB7XG4gICAgICAgICAgICAnb3ZlcmZsb3cteSc6ICdoaWRkZW4nLFxuICAgICAgICAgICAgJ21hcmdpbic6ICcwIGF1dG8nXG4gICAgICAgICAgfTtcbiAgICAgICAgICAkYm9keS5jc3MoYm9keVN0eWxlcyk7XG5cbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICQoJGJ1dHRvbi5kYXRhKCdzcmMnKSkuYWRkQ2xhc3MoXCJzaG93XCIpO1xuICAgICAgICAgIH0sIDEwMCk7XG4gICAgICAgIH0sXG4gICAgICAgIGFmdGVyQ2xvc2U6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIC8vICBBZGQgYW5vdGhlciBiZyBjb2xvclxuICAgICAgICAgICQoJy5mYW5jeWJveC1iZycpLnJlbW92ZUNsYXNzKCRidXR0b24uZGF0YSgnc3JjJykuc2xpY2UoMSkpO1xuXG4gICAgICAgICAgY29uc3QgYm9keVN0eWxlcyA9IHtcbiAgICAgICAgICAgICdvdmVyZmxvdy15JzogJ3Zpc2libGUnLFxuICAgICAgICAgICAgJ3BhZGRpbmctcmlnaHQnOiAwLFxuICAgICAgICAgICAgJ21hcmdpbic6IDBcbiAgICAgICAgICB9O1xuICAgICAgICAgICRib2R5LmNzcyhib2R5U3R5bGVzKTtcblxuICAgICAgICAgICQoJGJ1dHRvbi5kYXRhKCdzcmMnKSkucmVtb3ZlQ2xhc3MoXCJzaG93XCIpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICAkYnV0dG9uLmZhbmN5Ym94KG9wdGlvbnMpO1xuICAgIH0pO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBtb2RhbDtcbiIsImNvbnN0IGhlYWRlclNjcm9sbCA9ICgpID0+IHtcbiAgY29uc3QgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJtYWluXCIpO1xuXG4gIGNvbnN0ICRoZWFkZXIgPSAkKFwiLmhlYWRlclwiKTtcblxuICBpZiAoJGhlYWRlcikge1xuXG4gICAgLy8gSGVhZGVyINC80LXQvdGP0LXRgiDRhtCy0LXRgtCwINC/0YDQuCDRgdC60YDQvtC70LvQtS4g0J7QvSDRg9C20LUgZml4ZWQg0LjQt9C90LDRh9Cw0LvRjNC90L5cbiAgICBjb25zdCBzY3JvbGxIZWFkZXIgPSAoKSA9PiB7XG4gICAgICBjb25zdCBpbnRyb1RvcCA9IG1haW4uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wO1xuXG4gICAgICBpZiAoaW50cm9Ub3AgPCAtMSkge1xuICAgICAgICAkaGVhZGVyLmFkZENsYXNzKFwic2Nyb2xsXCIpO1xuXG4gICAgICB9IGVsc2UgaWYgKCRoZWFkZXIuaGFzQ2xhc3MoXCJzY3JvbGxcIikgJiYgaW50cm9Ub3AgPiAtMSkge1xuICAgICAgICAkaGVhZGVyLnJlbW92ZUNsYXNzKFwic2Nyb2xsXCIpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICAkKHdpbmRvdykub24oXCJzY3JvbGxcIiwgc2Nyb2xsSGVhZGVyKTtcbiAgICAkKGRvY3VtZW50KS5vbihcInJlYWR5XCIsIHNjcm9sbEhlYWRlcik7XG5cblxuICAgIC8v0JTQvtCx0LDQstC70Y/QtdGCINC+0YLRgdGC0YPQvyDQvdCwINGB0YLRgNCw0L3QuNGG0LDRhSDQtNC70Y8g0YTQuNC60YHQuNGA0L7QstCw0L3QvdC+0LPQviDRhdC10LTQtdGA0LBcbiAgICBmdW5jdGlvbiBjaGVja0hlYWRlckhlaWdodCgpIHtcbiAgICAgIGNvbnN0IHZhbHVlID0gJGhlYWRlci5vdXRlckhlaWdodCgpO1xuICAgICAgY29uc3QgaGVpZ2h0ID0gJChcIi5qcy1oZWlnaHRcIik7XG5cbiAgICAgIGhlaWdodC5jc3MoXCJoZWlnaHRcIiwgdmFsdWUpO1xuICAgIH1cbiAgICBjaGVja0hlYWRlckhlaWdodCgpO1xuXG4gICAgJCh3aW5kb3cpLm9uKFwicmVzaXplXCIsIGNoZWNrSGVhZGVySGVpZ2h0KTtcbiAgfVxuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBoZWFkZXJTY3JvbGw7XG4iLCJjb25zdCBzbGlkZXJzID0gKCkgPT4ge1xuICBjb25zdCBTd2lwZXIgPSB3aW5kb3cuU3dpcGVyO1xuXG4gIC8vIFJldmlld3Mgc2VydGlmaWNhdGVzXG4gIGNvbnN0IHJldmlld3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmpzLXJldmlld3Mtc2xpZGVyXCIpO1xuXG4gIGlmIChyZXZpZXdzKSB7XG4gICAgY29uc3QgbXlTd2lwZXIgPSBuZXcgU3dpcGVyKFwiLmpzLXJldmlld3Mtc2xpZGVyLnN3aXBlci1jb250YWluZXJcIiwge1xuICAgICAgZGlyZWN0aW9uOiBcImhvcml6b250YWxcIixcbiAgICAgIHNsaWRlc1BlclZpZXc6IDEsXG4gICAgICBzcGFjZUJldHdlZW46IDIwLFxuICAgICAgc3BlZWQ6IDQwMCxcbiAgICAgIGxvb3A6IHRydWUsXG4gICAgICBjZW50ZXJlZFNsaWRlczogdHJ1ZSxcbiAgICAgIGJyZWFrcG9pbnRzOiB7XG4gICAgICAgIDUwMDoge1xuICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDIsXG4gICAgICAgICAgc3BhY2VCZXR3ZWVuOiAxNSxcbiAgICAgICAgfSxcbiAgICAgICAgNTc1OiB7XG4gICAgICAgICAgc2xpZGVzUGVyVmlldzogMyxcbiAgICAgICAgICBzcGFjZUJldHdlZW46IDE1LFxuICAgICAgICB9LFxuICAgICAgICA5OTE6IHtcbiAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAzLFxuICAgICAgICAgIHNwYWNlQmV0d2VlbjogMTIwLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIG5hdmlnYXRpb246IHtcbiAgICAgICAgbmV4dEVsOiBcIi5qcy1yZXZpZXdzLXNsaWRlciAuc3dpcGVyLWJ1dHRvbi1uZXh0XCIsXG4gICAgICAgIHByZXZFbDogXCIuanMtcmV2aWV3cy1zbGlkZXIgLnN3aXBlci1idXR0b24tcHJldlwiLFxuICAgICAgfSxcbiAgICB9KTtcbiAgfVxuXG4gIC8vIFNsaWRlciBzZXJ0aWZpY2F0ZXNcbiAgY29uc3Qgc2VydGlmaWNhdGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5qcy1zZXJ0aWZpY2F0ZXMtc2xpZGVyXCIpO1xuXG4gIGlmIChzZXJ0aWZpY2F0ZXMpIHtcbiAgICBjb25zdCBteVN3aXBlciA9IG5ldyBTd2lwZXIoXCIuanMtc2VydGlmaWNhdGVzLXNsaWRlci5zd2lwZXItY29udGFpbmVyXCIsIHtcbiAgICAgIGRpcmVjdGlvbjogXCJob3Jpem9udGFsXCIsXG4gICAgICBzbGlkZXNQZXJWaWV3OiAxLFxuICAgICAgc3BhY2VCZXR3ZWVuOiAyMCxcbiAgICAgIHNwZWVkOiA0MDAsXG4gICAgICBsb29wOiB0cnVlLFxuICAgICAgY2VudGVyZWRTbGlkZXM6IHRydWUsXG4gICAgICBicmVha3BvaW50czoge1xuICAgICAgICA1MDA6IHtcbiAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAyLFxuICAgICAgICAgIHNwYWNlQmV0d2VlbjogMTUsXG4gICAgICAgIH0sXG4gICAgICAgIDU3NToge1xuICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDMsXG4gICAgICAgICAgc3BhY2VCZXR3ZWVuOiAxNSxcbiAgICAgICAgfSxcbiAgICAgICAgOTkxOiB7XG4gICAgICAgICAgc2xpZGVzUGVyVmlldzogMyxcbiAgICAgICAgICBzcGFjZUJldHdlZW46IDEyMCxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICBuYXZpZ2F0aW9uOiB7XG4gICAgICAgIG5leHRFbDogXCIuanMtc2VydGlmaWNhdGVzLXNsaWRlciAuc3dpcGVyLWJ1dHRvbi1uZXh0XCIsXG4gICAgICAgIHByZXZFbDogXCIuanMtc2VydGlmaWNhdGVzLXNsaWRlciAuc3dpcGVyLWJ1dHRvbi1wcmV2XCIsXG4gICAgICB9LFxuICAgIH0pO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBzbGlkZXJzO1xuIiwiY29uc3QgbnVtYmVyID0gKCkgPT4ge1xuICAvL9Cg0LDQt9GA0LXRiNCw0LXRgiDQstCy0L7QtCDRgtC+0LvRjNC60L4g0YbQuNGE0YAg0LIgaW5wdXRcbiAgY29uc3QgJG51bWJlcnMgPSAkKFwiLmpzLW51bWJlclwiKTtcbiAgaWYgKCEkbnVtYmVycykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gICRudW1iZXJzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgY29uc3QgJHRoaXNzID0gJCh0aGlzKTtcblxuICAgICR0aGlzcy5tYXNrKCcwIycpO1xuICB9KTtcblxufTtcblxuZXhwb3J0IGRlZmF1bHQgbnVtYmVyO1xuIiwiY29uc3QgYnRuVXAgPSAoKSA9PiB7XG5cbiAgJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbigpIHtcbiAgICBpZiAoJCh0aGlzKS5zY3JvbGxUb3AoKSA+IDIwMCkge1xuICAgICAgICBpZiAoJCgnI3VwYnV0dG9uJykuaXMoJzpoaWRkZW4nKSkge1xuICAgICAgICAgICAgJCgnI3VwYnV0dG9uJykuY3NzKHtvcGFjaXR5IDogMC45fSkuZmFkZUluKCdmYXN0Jyk7XG4gICAgICAgIH1cbiAgICB9IGVsc2UgeyAkKCcjdXBidXR0b24nKS5zdG9wKHRydWUsIGZhbHNlKS5mYWRlT3V0KCdmYXN0Jyk7IH1cbiAgfSk7XG5cbiAgJCgnI3VwYnV0dG9uJykuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAkKCdodG1sLCBib2R5Jykuc3RvcCgpLmFuaW1hdGUoe3Njcm9sbFRvcCA6IDB9LCAzMDApO1xuICB9KTtcblxufTtcblxuZXhwb3J0IGRlZmF1bHQgYnRuVXA7XG4iLCJjb25zdCBhY2NvcmRpb24gPSAoKSA9PiB7XG4gIGNvbnN0ICRhY2NvcmRpb25zID0gJChgLmFjY29yZGlvbl9faXRlbWApO1xuICBpZiAoISRhY2NvcmRpb25zKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgJGFjY29yZGlvbnMuZWFjaChmdW5jdGlvbigpIHtcbiAgICBjb25zdCAkdGhpc3MgPSAkKHRoaXMpO1xuICAgIGNvbnN0ICRzaWRlID0gJHRoaXNzLmZpbmQoYC5hY2NvcmRpb25fX2xhYmVsYCk7XG4gICAgY29uc3QgJG1haW4gPSAkdGhpc3MuZmluZChgLmFjY29yZGlvbl9fY29udGVudGApO1xuXG4gICAgJHNpZGUub24oYGNsaWNrYCwgKGV2dCkgPT4ge1xuICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgIGlmICgkc2lkZS5oYXNDbGFzcyhgaXMtb3BlbmApKSB7XG4gICAgICAgICRtYWluLnNsaWRlVXAoXCJzbG93XCIpO1xuICAgICAgICAkc2lkZS5yZW1vdmVDbGFzcyhgaXMtb3BlbmApO1xuICAgICAgICAkc2lkZS5ibHVyKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkc2lkZS5hZGRDbGFzcyhgaXMtb3BlbmApO1xuICAgICAgICAkbWFpbi5zbGlkZURvd24oXCJzbG93XCIpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcblxufTtcblxuZXhwb3J0IGRlZmF1bHQgYWNjb3JkaW9uO1xuIiwiY29uc3QgZ29vZFF1YW50aXR5ID0gKCkgPT4ge1xuICAvLyDQo9Cy0LXQu9C40YfQtdC90LjQtSDQuCDRg9C80LXQvdGM0YjQtdC90LjQtSDRgtC+0LLQsNGA0L7QslxuICBjb25zdCBjb250YWluZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5qcy1xdWFudGl0eVwiKTtcbiAgaWYgKGNvbnRhaW5lcnMubGVuZ3RoIDwgMCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnRhaW5lcnMuZm9yRWFjaCgoY29udGFpbmVyKSA9PiB7XG4gICAgY29uc3QgaW5wdXQgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcihcImlucHV0XCIpO1xuICAgIGNvbnN0IGJ0bkluY3JlYXNlID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCIuanMtaW5jcmVhc2VcIik7XG4gICAgY29uc3QgYnRuRGVjcmVhc2UgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcihcIi5qcy1kZWNyZWFzZVwiKTtcblxuICAgIGxldCB2YWx1ZTtcblxuICAgIGNvbnN0IGJ0bkluY3JlYXNlSGFuZGxlciA9ICgpID0+IHtcbiAgICAgIHZhbHVlID0gaW5wdXQudmFsdWU7XG4gICAgICBsZXQgbmV3VmFsdWUgPSArK3ZhbHVlO1xuXG4gICAgICBpZiAobmV3VmFsdWUgPiAxKSB7XG4gICAgICAgIGJ0bkRlY3JlYXNlLnJlbW92ZUF0dHJpYnV0ZShcImRpc2FibGVkXCIpO1xuICAgICAgfVxuXG4gICAgICBpbnB1dC52YWx1ZSA9IG5ld1ZhbHVlO1xuICAgIH07XG5cbiAgICBjb25zdCBidG5EZWNyZWFzZUhhbmRsZXIgPSAoKSA9PiB7XG4gICAgICB2YWx1ZSA9IGlucHV0LnZhbHVlO1xuICAgICAgbGV0IG5ld1ZhbHVlID0gLS12YWx1ZTtcblxuICAgICAgaWYgKG5ld1ZhbHVlIDw9IDEpIHtcbiAgICAgICAgbmV3VmFsdWUgPSAxO1xuICAgICAgICBpbnB1dC52YWx1ZSA9IDE7XG4gICAgICAgIGJ0bkRlY3JlYXNlLnNldEF0dHJpYnV0ZShcImRpc2FibGVkXCIsIFwiZGlzYWJsZWRcIik7XG4gICAgICB9XG5cbiAgICAgIGlucHV0LnZhbHVlID0gbmV3VmFsdWU7XG4gICAgfTtcblxuICAgIGJ0bkluY3JlYXNlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBidG5JbmNyZWFzZUhhbmRsZXIpO1xuICAgIGJ0bkRlY3JlYXNlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBidG5EZWNyZWFzZUhhbmRsZXIpO1xuICAgIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgYnRuSW5jcmVhc2VIYW5kbGVyKCk7XG4gICAgICBidG5EZWNyZWFzZUhhbmRsZXIoKTtcbiAgICB9KVxuICB9KTtcblxufTtcblxuZXhwb3J0IGRlZmF1bHQgZ29vZFF1YW50aXR5O1xuIiwiaW1wb3J0IG5vZGVMaXN0Rm9yRWFjaCBmcm9tICcuL25vZGUtbGlzdC1mb3ItZWFjaCc7XG5pbXBvcnQgdGVsIGZyb20gJy4vdGVsJztcbmltcG9ydCBhbmltYXRpb24gZnJvbSAnLi9hbmltYXRpb24nO1xuaW1wb3J0IG1lbnVPcGVuIGZyb20gJy4vbWVudS1vcGVuJztcbmltcG9ydCBtb2RhbCBmcm9tICcuL21vZGFsJztcbmltcG9ydCBoZWFkZXJTY3JvbGwgZnJvbSAnLi9oZWFkZXInO1xuaW1wb3J0IHNsaWRlcnMgZnJvbSAnLi9zbGlkZXJzJztcbmltcG9ydCBudW1iZXIgZnJvbSAnLi9udW1iZXInO1xuaW1wb3J0IGJ0blVwIGZyb20gJy4vYnRuLXVwJztcbmltcG9ydCBhY2NvcmRpb24gZnJvbSAnLi9hY2NvcmRpb24nO1xuaW1wb3J0IGdvb2RRdWFudGl0eSBmcm9tICcuL2dvb2QtcXVhbnRpdHknO1xuXG5jbGFzcyBBcHAge1xuICBzdGF0aWMgaW5pdCgpIHtcbiAgICBub2RlTGlzdEZvckVhY2goKTtcbiAgICB0ZWwoKTtcbiAgICBhbmltYXRpb24oKTtcbiAgICBtZW51T3BlbigpO1xuICAgIGhlYWRlclNjcm9sbCgpO1xuICAgIG1vZGFsKCk7XG4gICAgc2xpZGVycygpO1xuICAgIG51bWJlcigpO1xuICAgIGJ0blVwKCk7XG4gICAgYWNjb3JkaW9uKCk7XG4gICAgZ29vZFF1YW50aXR5KCk7XG4gIH1cbn1cblxuXG5BcHAuaW5pdCgpO1xud2luZG93LkFwcCA9IEFwcDtcbiJdLCJuYW1lcyI6WyJub2RlTGlzdEZvckVhY2giLCJ3aW5kb3ciLCJOb2RlTGlzdCIsInByb3RvdHlwZSIsImZvckVhY2giLCJjYWxsYmFjayIsInRoaXNBcmciLCJpIiwibGVuZ3RoIiwiY2FsbCIsInRlbCIsImZvcm1CbG9ja3MiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmb3JtQmxvY2siLCJpbnB1dCIsInF1ZXJ5U2VsZWN0b3IiLCJwaG9uZU1hc2siLCJJTWFzayIsIm1hc2siLCJhbmltYXRpb24iLCJhbmltYXRpb25zIiwiV09XIiwiaW5pdCIsImJ0bnMiLCIkIiwiY2hlY2tUb3VjaERldmljZSIsImNyZWF0ZUV2ZW50IiwiZSIsImlzVG91Y2hEZXZpY2UiLCJlYWNoIiwiJGJ1dHRvbiIsIiRyaXBwbGVUZW1wbGF0ZSIsImNsYXNzIiwiYXBwZW5kIiwiJHJpcHBsZSIsImZpbmQiLCJvbiIsInBhcmVudE9mZnNldCIsIm9mZnNldCIsInJlbFgiLCJwYWdlWCIsImxlZnQiLCJyZWxZIiwicGFnZVkiLCJ0b3AiLCJjc3MiLCJ3aWR0aCIsImhlaWdodCIsIm1lbnVPcGVuIiwiJGJ1dHRvbnNNZW51IiwiJG1lbnUiLCIkYnV0dG9uQ2xvc2UiLCIkaGVhZGVyIiwiJGJ0biIsInNjcm9sbEhlYWRlciIsImhhc0NsYXNzIiwic2Nyb2xsVG9wIiwiYWRkQ2xhc3MiLCJyZW1vdmVDbGFzcyIsImNsaWNrIiwicG9zIiwicGFyc2VJbnQiLCJhdHRyIiwicmVtb3ZlQXR0ciIsInNjcm9sbFRvIiwic2V0VGltZW91dCIsInBhZ2VQb3MiLCJtb2RhbCIsIiRidXR0b25zIiwiJGJvZHkiLCJvcHRpb25zIiwiaGlkZVNjcm9sbGJhciIsInRvdWNoIiwiYnRuVHBsIiwic21hbGxCdG4iLCJiZWZvcmVTaG93IiwiZGF0YSIsInNsaWNlIiwiYm9keVN0eWxlcyIsImFmdGVyQ2xvc2UiLCJmYW5jeWJveCIsImhlYWRlclNjcm9sbCIsIm1haW4iLCJpbnRyb1RvcCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsImNoZWNrSGVhZGVySGVpZ2h0IiwidmFsdWUiLCJvdXRlckhlaWdodCIsInNsaWRlcnMiLCJTd2lwZXIiLCJyZXZpZXdzIiwibXlTd2lwZXIiLCJkaXJlY3Rpb24iLCJzbGlkZXNQZXJWaWV3Iiwic3BhY2VCZXR3ZWVuIiwic3BlZWQiLCJsb29wIiwiY2VudGVyZWRTbGlkZXMiLCJicmVha3BvaW50cyIsIm5hdmlnYXRpb24iLCJuZXh0RWwiLCJwcmV2RWwiLCJzZXJ0aWZpY2F0ZXMiLCJudW1iZXIiLCIkbnVtYmVycyIsIiR0aGlzcyIsImJ0blVwIiwic2Nyb2xsIiwiaXMiLCJvcGFjaXR5IiwiZmFkZUluIiwic3RvcCIsImZhZGVPdXQiLCJhbmltYXRlIiwiYWNjb3JkaW9uIiwiJGFjY29yZGlvbnMiLCIkc2lkZSIsIiRtYWluIiwiZXZ0IiwicHJldmVudERlZmF1bHQiLCJzbGlkZVVwIiwiYmx1ciIsInNsaWRlRG93biIsImdvb2RRdWFudGl0eSIsImNvbnRhaW5lcnMiLCJjb250YWluZXIiLCJidG5JbmNyZWFzZSIsImJ0bkRlY3JlYXNlIiwiYnRuSW5jcmVhc2VIYW5kbGVyIiwibmV3VmFsdWUiLCJyZW1vdmVBdHRyaWJ1dGUiLCJidG5EZWNyZWFzZUhhbmRsZXIiLCJzZXRBdHRyaWJ1dGUiLCJhZGRFdmVudExpc3RlbmVyIiwiQXBwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBQUEsSUFBTUEsZUFBZSxHQUFHLFNBQWxCQSxlQUFrQixHQUFNO0VBQzVCLE1BQUksY0FBY0MsTUFBZCxJQUF3QixD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
