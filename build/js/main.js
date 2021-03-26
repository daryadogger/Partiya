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
    } // Photos sertificates


    var photos = document.querySelector(".js-photos-slider");

    if (photos) {
      var _mySwiper = new Swiper(".js-photos-slider.swiper-container", {
        direction: "horizontal",
        slidesPerView: 2,
        spaceBetween: 20,
        speed: 400,
        loop: true,
        centeredSlides: true,
        navigation: {
          nextEl: ".js-photos-slider .swiper-button-next",
          prevEl: ".js-photos-slider .swiper-button-prev"
        },
        pagination: {
          el: '.js-photos-slider .swiper-pagination',
          clickable: true
        }
      });
    } // Reviews sertificates


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
      }
    }]);

    return App;
  }();

  App.init();
  window.App = App;

}());

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsic3JjL2pzL25vZGUtbGlzdC1mb3ItZWFjaC5qcyIsInNyYy9qcy90ZWwuanMiLCJzcmMvanMvYW5pbWF0aW9uLmpzIiwic3JjL2pzL21lbnUtb3Blbi5qcyIsInNyYy9qcy9tb2RhbC5qcyIsInNyYy9qcy9oZWFkZXIuanMiLCJzcmMvanMvc2xpZGVycy5qcyIsInNyYy9qcy9udW1iZXIuanMiLCJzcmMvanMvYnRuLXVwLmpzIiwic3JjL2pzL2FjY29yZGlvbi5qcyIsInNyYy9qcy9nb29kLXF1YW50aXR5LmpzIiwic3JjL2pzL2NvbG9ycy1zZWxlY3QuanMiLCJzcmMvanMvbWFpbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBub2RlTGlzdEZvckVhY2ggPSAoKSA9PiB7XG4gIGlmICgnTm9kZUxpc3QnIGluIHdpbmRvdyAmJiAhTm9kZUxpc3QucHJvdG90eXBlLmZvckVhY2gpIHtcbiAgICBOb2RlTGlzdC5wcm90b3R5cGUuZm9yRWFjaCA9IGZ1bmN0aW9uIChjYWxsYmFjaywgdGhpc0FyZykge1xuICAgIHRoaXNBcmcgPSB0aGlzQXJnIHx8IHdpbmRvdztcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcbiAgICBjYWxsYmFjay5jYWxsKHRoaXNBcmcsIHRoaXNbaV0sIGksIHRoaXMpO1xuICAgIH1cbiAgICB9O1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBub2RlTGlzdEZvckVhY2g7XG4iLCJjb25zdCB0ZWwgPSAoKSA9PiB7XG4gIC8vIE1hc2sgZm9yIHRlbFxuICBjb25zdCBmb3JtQmxvY2tzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5maWVsZHNldFwiKTtcblxuICBpZiAoZm9ybUJsb2Nrcy5sZW5ndGgpIHtcblxuICAgIGZvcm1CbG9ja3MuZm9yRWFjaChmdW5jdGlvbihmb3JtQmxvY2spIHtcbiAgICAgIGNvbnN0IGlucHV0ID0gZm9ybUJsb2NrLnF1ZXJ5U2VsZWN0b3IoXCJpbnB1dFtuYW1lPXRlbF1cIik7XG5cbiAgICAgIGlmKGlucHV0KSB7XG4gICAgICAgIGNvbnN0IHBob25lTWFzayA9IElNYXNrKCBpbnB1dCwge1xuICAgICAgICAgIG1hc2s6IFwiK3s3fSAwMDAgMDAwLTAwLTAwXCJcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICB9KTtcblxuICB9XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IHRlbDtcbiIsImNvbnN0IGFuaW1hdGlvbiA9ICgpID0+IHtcbiAgLy93b3dcbiAgY29uc3QgYW5pbWF0aW9ucyA9IG5ldyB3aW5kb3cuV09XKCkuaW5pdCgpO1xuXG4gIC8vYnRuc1xuICBjb25zdCBidG5zID0gJChcIi5qcy1yaXBwbGVcIik7XG5cbiAgaWYgKGJ0bnMpIHtcbiAgICBmdW5jdGlvbiBjaGVja1RvdWNoRGV2aWNlKCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ1RvdWNoRXZlbnQnKTtcblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IGlzVG91Y2hEZXZpY2UgPSBjaGVja1RvdWNoRGV2aWNlKCk7XG5cbiAgICBpZiAoIWlzVG91Y2hEZXZpY2UpIHtcblxuICAgICAgYnRucy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICBsZXQgJGJ1dHRvbiA9ICQodGhpcyk7XG4gICAgICAgIGxldCAkcmlwcGxlVGVtcGxhdGUgPSAkKCc8c3BhbiAvPicsIHtcbiAgICAgICAgICBjbGFzczogJ2J1dHRvbl9fcmlwcGxlJyxcbiAgICAgICAgfSk7XG4gICAgICAgICRidXR0b24uYXBwZW5kKCRyaXBwbGVUZW1wbGF0ZSk7XG5cbiAgICAgICAgbGV0ICRyaXBwbGUgPSAkYnV0dG9uLmZpbmQoJy5idXR0b25fX3JpcHBsZScpO1xuXG4gICAgICAgICRidXR0b24ub24oJ21vdXNlZW50ZXInLCAnKicsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICBsZXQgcGFyZW50T2Zmc2V0ID0gJGJ1dHRvbi5vZmZzZXQoKTtcbiAgICAgICAgICBsZXQgcmVsWCA9IGUucGFnZVggLSBwYXJlbnRPZmZzZXQubGVmdDtcbiAgICAgICAgICBsZXQgcmVsWSA9IGUucGFnZVkgLSBwYXJlbnRPZmZzZXQudG9wO1xuXG4gICAgICAgICAgJHJpcHBsZS5jc3Moe1xuICAgICAgICAgICAgdG9wOiByZWxZLFxuICAgICAgICAgICAgbGVmdDogcmVsWCxcbiAgICAgICAgICAgIHdpZHRoOiAnMjI1JScsXG4gICAgICAgICAgICBoZWlnaHQ6ICRidXR0b24ud2lkdGgoKSAqIDIuMjUsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRidXR0b24ub24oJ21vdXNlb3V0JywgJyonLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgbGV0IHBhcmVudE9mZnNldCA9ICRidXR0b24ub2Zmc2V0KCk7XG4gICAgICAgICAgbGV0IHJlbFggPSBlLnBhZ2VYIC0gcGFyZW50T2Zmc2V0LmxlZnQ7XG4gICAgICAgICAgbGV0IHJlbFkgPSBlLnBhZ2VZIC0gcGFyZW50T2Zmc2V0LnRvcDtcbiAgICAgICAgICAkcmlwcGxlLmNzcyh7XG4gICAgICAgICAgICB0b3A6IHJlbFksXG4gICAgICAgICAgICBsZWZ0OiByZWxYLFxuICAgICAgICAgICAgd2lkdGg6IDAsXG4gICAgICAgICAgICBoZWlnaHQ6IDAsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICBcbiAgICB9XG4gIH1cblxuXG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGFuaW1hdGlvbjtcbiIsImNvbnN0IG1lbnVPcGVuID0gKCkgPT4ge1xuICAvLyDQntGC0LrRgNGL0YLQuNC1INC80L7QsSDQvNC10L3RjlxuICBjb25zdCAkYnV0dG9uc01lbnUgPSAkKFwiLmpzLW9wZW4tbWVudVwiKTtcblxuICBpZiAoJGJ1dHRvbnNNZW51Lmxlbmd0aCkge1xuICAgIGNvbnN0ICRtZW51ID0gJChcIi5tZW51XCIpO1xuICAgIGNvbnN0ICRidXR0b25DbG9zZSA9ICQoXCIuanMtYnRuLWNsb3NlXCIpO1xuICAgIGNvbnN0ICRoZWFkZXIgPSAkKFwiLmhlYWRlclwiKTtcblxuICAgICRidXR0b25zTWVudS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnN0ICRidG4gPSAkKHRoaXMpO1xuXG4gICAgICBjb25zdCBzY3JvbGxIZWFkZXIgPSAoKSA9PiB7XG4gICAgICAgIGlmICgkbWVudS5oYXNDbGFzcyhcImlzLXNob3dcIikpIHtcblxuICAgICAgICAgIGlmKCRtZW51LnNjcm9sbFRvcCgpID4gMSkge1xuICAgICAgICAgICAgJGhlYWRlci5hZGRDbGFzcyhcInNjcm9sbFwiKTtcblxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkaGVhZGVyLnJlbW92ZUNsYXNzKFwic2Nyb2xsXCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgJGJ0bi5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgLy8g0LXRgdC70Lgg0L7RgtC60YDRi9GC0L4g0LzQtdC90Y5cbiAgICAgICAgaWYgKCRtZW51Lmhhc0NsYXNzKFwiaXMtc2hvd1wiKSkge1xuXG4gICAgICAgICAgY29uc3QgcG9zID0gcGFyc2VJbnQoJChcImJvZHlcIikuYXR0cihcImRhdGEtc2Nyb2xsXCIpLCAxMCk7XG4gICAgICAgICAgJG1lbnUucmVtb3ZlQ2xhc3MoXCJpcy1zaG93XCIpO1xuICAgICAgICAgICRidG4ucmVtb3ZlQ2xhc3MoXCJpcy1zaG93XCIpO1xuICAgICAgICAgICRoZWFkZXIucmVtb3ZlQ2xhc3MoXCJzY3JvbGxcIik7XG5cbiAgICAgICAgICAkKFwiYm9keVwiKS5yZW1vdmVDbGFzcyhcImlzLW1lbnUtb3BlblwiKS5yZW1vdmVBdHRyKFwiZGF0YS1zY3JvbGxcIik7XG4gICAgICAgICAgd2luZG93LnNjcm9sbFRvKDAsIHBvcyk7XG5cbiAgICAgICAgICAvLyDQtdGB0LvQuCDQt9Cw0LrRgNGL0YLQviDQvNC10L3RjlxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgJG1lbnUuYWRkQ2xhc3MoXCJpcy1zaG93XCIpO1xuXG4gICAgICAgICAgaWYoJG1lbnUuc2Nyb2xsVG9wKCkgPiAxKSB7XG4gICAgICAgICAgICAkaGVhZGVyLmFkZENsYXNzKFwic2Nyb2xsXCIpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJGJ0bi5hZGRDbGFzcyhcImlzLXNob3dcIik7XG5cbiAgICAgICAgICB9LCAxMDApO1xuXG4gICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjb25zdCBwYWdlUG9zID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xuICAgICAgICAgICAgJChcImJvZHlcIikuYWRkQ2xhc3MoXCJpcy1tZW51LW9wZW5cIikuYXR0cihcImRhdGEtc2Nyb2xsXCIsIHBhZ2VQb3MpO1xuICAgICAgICAgIH0sIDQ1MCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICAkKFwiLm1lbnVcIikub24oXCJzY3JvbGxcIiwgc2Nyb2xsSGVhZGVyKTtcbiAgICB9KTtcblxuICAgICRidXR0b25DbG9zZS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zdCBwb3MgPSBwYXJzZUludCgkKFwiYm9keVwiKS5hdHRyKFwiZGF0YS1zY3JvbGxcIiksIDEwKTtcbiAgICAgICRtZW51LnJlbW92ZUNsYXNzKFwiaXMtc2hvd1wiKTtcbiAgICAgICRidXR0b25zTWVudS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc3QgJGJ0biA9ICQodGhpcyk7XG4gICAgICAgICRidG4ucmVtb3ZlQ2xhc3MoXCJpcy1zaG93XCIpO1xuICAgICAgfSk7XG5cbiAgICAgICQoXCJib2R5XCIpLnJlbW92ZUNsYXNzKFwiaXMtbWVudS1vcGVuXCIpLnJlbW92ZUF0dHIoXCJkYXRhLXNjcm9sbFwiKTtcbiAgICAgIHdpbmRvdy5zY3JvbGxUbygwLCBwb3MpO1xuICAgIH0pO1xuXG4gIH1cblxufTtcblxuZXhwb3J0IGRlZmF1bHQgbWVudU9wZW47XG4iLCJjb25zdCBtb2RhbCA9ICgpID0+IHtcbiAgY29uc3QgJGJ1dHRvbnMgPSAkKCdbanMtcG9wdXAtb3Blbl0nKTtcblxuICBpZiAoJGJ1dHRvbnMubGVuZ3RoKSB7XG4gICAgY29uc3QgJGJvZHkgPSAkKCdib2R5Jyk7XG5cbiAgICAkYnV0dG9ucy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgY29uc3QgJGJ1dHRvbiA9ICQodGhpcyk7XG4gICAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICBoaWRlU2Nyb2xsYmFyOiB0cnVlLFxuICAgICAgICB0b3VjaDogZmFsc2UsXG4gICAgICAgIGJ0blRwbCA6IHtcbiAgICAgICAgICBzbWFsbEJ0biA6ICcnXG4gICAgICAgIH0sXG4gICAgICAgIGJlZm9yZVNob3c6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIC8vICBBZGQgYW5vdGhlciBiZyBjb2xvclxuICAgICAgICAgICQoJy5mYW5jeWJveC1iZycpLmFkZENsYXNzKCRidXR0b24uZGF0YSgnc3JjJykuc2xpY2UoMSkpO1xuXG4gICAgICAgICAgY29uc3QgYm9keVN0eWxlcyA9IHtcbiAgICAgICAgICAgICdvdmVyZmxvdy15JzogJ2hpZGRlbicsXG4gICAgICAgICAgICAnbWFyZ2luJzogJzAgYXV0bydcbiAgICAgICAgICB9O1xuICAgICAgICAgICRib2R5LmNzcyhib2R5U3R5bGVzKTtcblxuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgJCgkYnV0dG9uLmRhdGEoJ3NyYycpKS5hZGRDbGFzcyhcInNob3dcIik7XG4gICAgICAgICAgfSwgMTAwKTtcbiAgICAgICAgfSxcbiAgICAgICAgYWZ0ZXJDbG9zZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgLy8gIEFkZCBhbm90aGVyIGJnIGNvbG9yXG4gICAgICAgICAgJCgnLmZhbmN5Ym94LWJnJykucmVtb3ZlQ2xhc3MoJGJ1dHRvbi5kYXRhKCdzcmMnKS5zbGljZSgxKSk7XG5cbiAgICAgICAgICBjb25zdCBib2R5U3R5bGVzID0ge1xuICAgICAgICAgICAgJ292ZXJmbG93LXknOiAndmlzaWJsZScsXG4gICAgICAgICAgICAncGFkZGluZy1yaWdodCc6IDAsXG4gICAgICAgICAgICAnbWFyZ2luJzogMFxuICAgICAgICAgIH07XG4gICAgICAgICAgJGJvZHkuY3NzKGJvZHlTdHlsZXMpO1xuXG4gICAgICAgICAgJCgkYnV0dG9uLmRhdGEoJ3NyYycpKS5yZW1vdmVDbGFzcyhcInNob3dcIik7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgICRidXR0b24uZmFuY3lib3gob3B0aW9ucyk7XG4gICAgfSk7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IG1vZGFsO1xuIiwiY29uc3QgaGVhZGVyU2Nyb2xsID0gKCkgPT4ge1xuICBjb25zdCBtYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIm1haW5cIik7XG5cbiAgY29uc3QgJGhlYWRlciA9ICQoXCIuaGVhZGVyXCIpO1xuXG4gIGlmICgkaGVhZGVyKSB7XG5cbiAgICAvLyBIZWFkZXIg0LzQtdC90Y/QtdGCINGG0LLQtdGC0LAg0L/RgNC4INGB0LrRgNC+0LvQu9C1LiDQntC9INGD0LbQtSBmaXhlZCDQuNC30L3QsNGH0LDQu9GM0L3QvlxuICAgIGNvbnN0IHNjcm9sbEhlYWRlciA9ICgpID0+IHtcbiAgICAgIGNvbnN0IGludHJvVG9wID0gbWFpbi5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3A7XG5cbiAgICAgIGlmIChpbnRyb1RvcCA8IC0xKSB7XG4gICAgICAgICRoZWFkZXIuYWRkQ2xhc3MoXCJzY3JvbGxcIik7XG5cbiAgICAgIH0gZWxzZSBpZiAoJGhlYWRlci5oYXNDbGFzcyhcInNjcm9sbFwiKSAmJiBpbnRyb1RvcCA+IC0xKSB7XG4gICAgICAgICRoZWFkZXIucmVtb3ZlQ2xhc3MoXCJzY3JvbGxcIik7XG4gICAgICB9XG4gICAgfTtcblxuICAgICQod2luZG93KS5vbihcInNjcm9sbFwiLCBzY3JvbGxIZWFkZXIpO1xuICAgICQoZG9jdW1lbnQpLm9uKFwicmVhZHlcIiwgc2Nyb2xsSGVhZGVyKTtcblxuXG4gICAgLy/QlNC+0LHQsNCy0LvRj9C10YIg0L7RgtGB0YLRg9C/INC90LAg0YHRgtGA0LDQvdC40YbQsNGFINC00LvRjyDRhNC40LrRgdC40YDQvtCy0LDQvdC90L7Qs9C+INGF0LXQtNC10YDQsFxuICAgIGZ1bmN0aW9uIGNoZWNrSGVhZGVySGVpZ2h0KCkge1xuICAgICAgY29uc3QgdmFsdWUgPSAkaGVhZGVyLm91dGVySGVpZ2h0KCk7XG4gICAgICBjb25zdCBtYWluID0gJChcIm1haW5cIik7XG5cbiAgICAgIG1haW4uY3NzKFwicGFkZGluZy10b3BcIiwgdmFsdWUpO1xuICAgIH1cbiAgICBjaGVja0hlYWRlckhlaWdodCgpO1xuXG4gICAgJCh3aW5kb3cpLm9uKFwicmVzaXplXCIsIGNoZWNrSGVhZGVySGVpZ2h0KTtcbiAgfVxuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBoZWFkZXJTY3JvbGw7XG4iLCJjb25zdCBzbGlkZXJzID0gKCkgPT4ge1xuICBjb25zdCBTd2lwZXIgPSB3aW5kb3cuU3dpcGVyO1xuXG4gIC8vIEFkdiBzZXJ0aWZpY2F0ZXNcbiAgY29uc3QgYWR2YW50YWdlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuanMtYWR2YW50YWdlcy1zbGlkZXJcIik7XG5cbiAgaWYgKGFkdmFudGFnZXMpIHtcbiAgICBjb25zdCBteVN3aXBlciA9IG5ldyBTd2lwZXIoXCIuanMtYWR2YW50YWdlcy1zbGlkZXIuc3dpcGVyLWNvbnRhaW5lclwiLCB7XG4gICAgICBkaXJlY3Rpb246IFwiaG9yaXpvbnRhbFwiLFxuICAgICAgc2xpZGVzUGVyVmlldzogMSxcbiAgICAgIHNwYWNlQmV0d2VlbjogMjAsXG4gICAgICBzcGVlZDogNDAwLFxuICAgICAgbmF2aWdhdGlvbjoge1xuICAgICAgICBuZXh0RWw6IFwiLmpzLWFkdmFudGFnZXMtc2xpZGVyIC5zd2lwZXItYnV0dG9uLW5leHRcIixcbiAgICAgICAgcHJldkVsOiBcIi5qcy1hZHZhbnRhZ2VzLXNsaWRlciAuc3dpcGVyLWJ1dHRvbi1wcmV2XCIsXG4gICAgICB9LFxuICAgIH0pO1xuICB9XG5cbiAgLy8gUGhvdG9zIHNlcnRpZmljYXRlc1xuICBjb25zdCBwaG90b3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmpzLXBob3Rvcy1zbGlkZXJcIik7XG5cbiAgaWYgKHBob3Rvcykge1xuICAgIGNvbnN0IG15U3dpcGVyID0gbmV3IFN3aXBlcihcIi5qcy1waG90b3Mtc2xpZGVyLnN3aXBlci1jb250YWluZXJcIiwge1xuICAgICAgZGlyZWN0aW9uOiBcImhvcml6b250YWxcIixcbiAgICAgIHNsaWRlc1BlclZpZXc6IDIsXG4gICAgICBzcGFjZUJldHdlZW46IDIwLFxuICAgICAgc3BlZWQ6IDQwMCxcbiAgICAgIGxvb3A6IHRydWUsXG4gICAgICBjZW50ZXJlZFNsaWRlczogdHJ1ZSxcbiAgICAgIG5hdmlnYXRpb246IHtcbiAgICAgICAgbmV4dEVsOiBcIi5qcy1waG90b3Mtc2xpZGVyIC5zd2lwZXItYnV0dG9uLW5leHRcIixcbiAgICAgICAgcHJldkVsOiBcIi5qcy1waG90b3Mtc2xpZGVyIC5zd2lwZXItYnV0dG9uLXByZXZcIixcbiAgICAgIH0sXG4gICAgICBwYWdpbmF0aW9uOiB7XG4gICAgICAgIGVsOiAnLmpzLXBob3Rvcy1zbGlkZXIgLnN3aXBlci1wYWdpbmF0aW9uJyxcbiAgICAgICAgY2xpY2thYmxlOiB0cnVlLFxuICAgICAgfSxcbiAgICB9KTtcbiAgfVxuXG5cbiAgLy8gUmV2aWV3cyBzZXJ0aWZpY2F0ZXNcbiAgY29uc3QgcmV2aWV3cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuanMtcmV2aWV3cy1zbGlkZXJcIik7XG5cbiAgaWYgKHJldmlld3MpIHtcbiAgICBjb25zdCBteVN3aXBlciA9IG5ldyBTd2lwZXIoXCIuanMtcmV2aWV3cy1zbGlkZXIuc3dpcGVyLWNvbnRhaW5lclwiLCB7XG4gICAgICBkaXJlY3Rpb246IFwiaG9yaXpvbnRhbFwiLFxuICAgICAgc2xpZGVzUGVyVmlldzogMSxcbiAgICAgIHNwYWNlQmV0d2VlbjogMjAsXG4gICAgICBzcGVlZDogNDAwLFxuICAgICAgbG9vcDogdHJ1ZSxcbiAgICAgIGNlbnRlcmVkU2xpZGVzOiB0cnVlLFxuICAgICAgYnJlYWtwb2ludHM6IHtcbiAgICAgICAgNTAwOiB7XG4gICAgICAgICAgc2xpZGVzUGVyVmlldzogMixcbiAgICAgICAgICBzcGFjZUJldHdlZW46IDE1LFxuICAgICAgICB9LFxuICAgICAgICA1NzU6IHtcbiAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAzLFxuICAgICAgICAgIHNwYWNlQmV0d2VlbjogMTUsXG4gICAgICAgIH0sXG4gICAgICAgIDk5MToge1xuICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDMsXG4gICAgICAgICAgc3BhY2VCZXR3ZWVuOiAxMjAsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgbmF2aWdhdGlvbjoge1xuICAgICAgICBuZXh0RWw6IFwiLmpzLXJldmlld3Mtc2xpZGVyIC5zd2lwZXItYnV0dG9uLW5leHRcIixcbiAgICAgICAgcHJldkVsOiBcIi5qcy1yZXZpZXdzLXNsaWRlciAuc3dpcGVyLWJ1dHRvbi1wcmV2XCIsXG4gICAgICB9LFxuICAgIH0pO1xuICB9XG5cbiAgLy8gU2xpZGVyIHNlcnRpZmljYXRlc1xuICBjb25zdCBzZXJ0aWZpY2F0ZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmpzLXNlcnRpZmljYXRlcy1zbGlkZXJcIik7XG5cbiAgaWYgKHNlcnRpZmljYXRlcykge1xuICAgIGNvbnN0IG15U3dpcGVyID0gbmV3IFN3aXBlcihcIi5qcy1zZXJ0aWZpY2F0ZXMtc2xpZGVyLnN3aXBlci1jb250YWluZXJcIiwge1xuICAgICAgZGlyZWN0aW9uOiBcImhvcml6b250YWxcIixcbiAgICAgIHNsaWRlc1BlclZpZXc6IDEsXG4gICAgICBzcGFjZUJldHdlZW46IDIwLFxuICAgICAgc3BlZWQ6IDQwMCxcbiAgICAgIGxvb3A6IHRydWUsXG4gICAgICBjZW50ZXJlZFNsaWRlczogdHJ1ZSxcbiAgICAgIGJyZWFrcG9pbnRzOiB7XG4gICAgICAgIDUwMDoge1xuICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDIsXG4gICAgICAgICAgc3BhY2VCZXR3ZWVuOiAxNSxcbiAgICAgICAgfSxcbiAgICAgICAgNTc1OiB7XG4gICAgICAgICAgc2xpZGVzUGVyVmlldzogMyxcbiAgICAgICAgICBzcGFjZUJldHdlZW46IDE1LFxuICAgICAgICB9LFxuICAgICAgICA5OTE6IHtcbiAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAzLFxuICAgICAgICAgIHNwYWNlQmV0d2VlbjogMTIwLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIG5hdmlnYXRpb246IHtcbiAgICAgICAgbmV4dEVsOiBcIi5qcy1zZXJ0aWZpY2F0ZXMtc2xpZGVyIC5zd2lwZXItYnV0dG9uLW5leHRcIixcbiAgICAgICAgcHJldkVsOiBcIi5qcy1zZXJ0aWZpY2F0ZXMtc2xpZGVyIC5zd2lwZXItYnV0dG9uLXByZXZcIixcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IHNsaWRlcnM7XG4iLCJjb25zdCBudW1iZXIgPSAoKSA9PiB7XG4gIC8v0KDQsNC30YDQtdGI0LDQtdGCINCy0LLQvtC0INGC0L7Qu9GM0LrQviDRhtC40YTRgCDQsiBpbnB1dFxuICBjb25zdCAkbnVtYmVycyA9ICQoXCIuanMtbnVtYmVyXCIpO1xuICBpZiAoISRudW1iZXJzKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgJG51bWJlcnMuZWFjaChmdW5jdGlvbigpIHtcbiAgICBjb25zdCAkdGhpc3MgPSAkKHRoaXMpO1xuXG4gICAgJHRoaXNzLm1hc2soJzAjJyk7XG4gIH0pO1xuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBudW1iZXI7XG4iLCJjb25zdCBidG5VcCA9ICgpID0+IHtcblxuICAkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKCkge1xuICAgIGlmICgkKHRoaXMpLnNjcm9sbFRvcCgpID4gMjAwKSB7XG4gICAgICAgIGlmICgkKCcjdXBidXR0b24nKS5pcygnOmhpZGRlbicpKSB7XG4gICAgICAgICAgICAkKCcjdXBidXR0b24nKS5jc3Moe29wYWNpdHkgOiAwLjl9KS5mYWRlSW4oJ2Zhc3QnKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7ICQoJyN1cGJ1dHRvbicpLnN0b3AodHJ1ZSwgZmFsc2UpLmZhZGVPdXQoJ2Zhc3QnKTsgfVxuICB9KTtcblxuICAkKCcjdXBidXR0b24nKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICQoJ2h0bWwsIGJvZHknKS5zdG9wKCkuYW5pbWF0ZSh7c2Nyb2xsVG9wIDogMH0sIDMwMCk7XG4gIH0pO1xuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBidG5VcDtcbiIsImNvbnN0IGFjY29yZGlvbiA9ICgpID0+IHtcbiAgY29uc3QgJGFjY29yZGlvbnMgPSAkKGAuYWNjb3JkaW9uX19pdGVtYCk7XG4gIGlmICghJGFjY29yZGlvbnMpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICAkYWNjb3JkaW9ucy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgIGNvbnN0ICR0aGlzcyA9ICQodGhpcyk7XG4gICAgY29uc3QgJHNpZGUgPSAkdGhpc3MuZmluZChgLmFjY29yZGlvbl9fbGFiZWxgKTtcbiAgICBjb25zdCAkbWFpbiA9ICR0aGlzcy5maW5kKGAuYWNjb3JkaW9uX19jb250ZW50YCk7XG5cbiAgICAkc2lkZS5vbihgY2xpY2tgLCAoZXZ0KSA9PiB7XG4gICAgICBldnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgaWYgKCRzaWRlLmhhc0NsYXNzKGBpcy1vcGVuYCkpIHtcbiAgICAgICAgJG1haW4uc2xpZGVVcChcInNsb3dcIik7XG4gICAgICAgICRzaWRlLnJlbW92ZUNsYXNzKGBpcy1vcGVuYCk7XG4gICAgICAgICRzaWRlLmJsdXIoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICRzaWRlLmFkZENsYXNzKGBpcy1vcGVuYCk7XG4gICAgICAgICRtYWluLnNsaWRlRG93bihcInNsb3dcIik7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBhY2NvcmRpb247XG4iLCJjb25zdCBnb29kUXVhbnRpdHkgPSAoKSA9PiB7XG4gIC8vINCj0LLQtdC70LjRh9C10L3QuNC1INC4INGD0LzQtdC90YzRiNC10L3QuNC1INGC0L7QstCw0YDQvtCyXG4gIGNvbnN0IGNvbnRhaW5lcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmpzLXF1YW50aXR5XCIpO1xuICBpZiAoY29udGFpbmVycy5sZW5ndGggPCAwKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29udGFpbmVycy5mb3JFYWNoKChjb250YWluZXIpID0+IHtcbiAgICBjb25zdCBpbnB1dCA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiaW5wdXRcIik7XG4gICAgY29uc3QgYnRuSW5jcmVhc2UgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcihcIi5qcy1pbmNyZWFzZVwiKTtcbiAgICBjb25zdCBidG5EZWNyZWFzZSA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiLmpzLWRlY3JlYXNlXCIpO1xuXG4gICAgbGV0IHZhbHVlO1xuXG4gICAgY29uc3QgYnRuSW5jcmVhc2VIYW5kbGVyID0gKCkgPT4ge1xuICAgICAgdmFsdWUgPSBpbnB1dC52YWx1ZTtcbiAgICAgIGxldCBuZXdWYWx1ZSA9ICsrdmFsdWU7XG5cbiAgICAgIGlmIChuZXdWYWx1ZSA+IDEpIHtcbiAgICAgICAgYnRuRGVjcmVhc2UucmVtb3ZlQXR0cmlidXRlKFwiZGlzYWJsZWRcIik7XG4gICAgICB9XG5cbiAgICAgIGlucHV0LnZhbHVlID0gbmV3VmFsdWU7XG4gICAgfTtcblxuICAgIGNvbnN0IGJ0bkRlY3JlYXNlSGFuZGxlciA9ICgpID0+IHtcbiAgICAgIHZhbHVlID0gaW5wdXQudmFsdWU7XG4gICAgICBsZXQgbmV3VmFsdWUgPSAtLXZhbHVlO1xuXG4gICAgICBpZiAobmV3VmFsdWUgPD0gMSkge1xuICAgICAgICBuZXdWYWx1ZSA9IDE7XG4gICAgICAgIGlucHV0LnZhbHVlID0gMTtcbiAgICAgICAgYnRuRGVjcmVhc2Uuc2V0QXR0cmlidXRlKFwiZGlzYWJsZWRcIiwgXCJkaXNhYmxlZFwiKTtcbiAgICAgIH1cblxuICAgICAgaW5wdXQudmFsdWUgPSBuZXdWYWx1ZTtcbiAgICB9O1xuXG4gICAgYnRuSW5jcmVhc2UuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGJ0bkluY3JlYXNlSGFuZGxlcik7XG4gICAgYnRuRGVjcmVhc2UuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGJ0bkRlY3JlYXNlSGFuZGxlcik7XG4gICAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBidG5JbmNyZWFzZUhhbmRsZXIoKTtcbiAgICAgIGJ0bkRlY3JlYXNlSGFuZGxlcigpO1xuICAgIH0pXG4gIH0pO1xuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBnb29kUXVhbnRpdHk7XG4iLCJjb25zdCBjb2xvcnNTZWxlY3QgPSAoKSA9PiB7XG4gIGNvbnN0IGNvbG9yc0Jsb2NrID0gJChcIi5jb2xvcnMtYmxvY2tcIik7XG4gIGlmICghY29sb3JzQmxvY2spIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBsaW5rcyA9IGNvbG9yc0Jsb2NrLmZpbmQoXCIuY29sb3JzLWJsb2NrX19pdGVtXCIpO1xuICBjb25zdCBwaWN0dXJlQmxvY2sgPSBjb2xvcnNCbG9jay5maW5kKFwiLmNvbG9ycy1ibG9ja19faW5mbyBpbWdcIik7XG4gIGNvbnN0IHRleHRCbG9jayA9IGNvbG9yc0Jsb2NrLmZpbmQoXCIuY29sb3JzLWJsb2NrX19pbmZvIHBcIik7XG5cbiAgbGlua3MuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgbGluayA9ICQodGhpcyk7XG5cbiAgICBsaW5rLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oZXZ0KSB7XG4gICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGxpbmtzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IHBpY3R1cmUgPSBsaW5rLmF0dHIoXCJkYXRhLWltZ1wiKTtcbiAgICAgIGNvbnN0IG5hbWUgPSBsaW5rLmZpbmQoXCJwXCIpLnRleHQoKTtcbiAgICAgIHBpY3R1cmVCbG9jay5hdHRyKFwic3JjXCIsIHBpY3R1cmUpO1xuICAgICAgdGV4dEJsb2NrLnRleHQobmFtZSk7XG5cbiAgICAgIGxpbmsuYWRkQ2xhc3MoXCJhY3RpdmVcIik7XG4gICAgfSlcbiAgfSk7XG5cblxufTtcblxuZXhwb3J0IGRlZmF1bHQgY29sb3JzU2VsZWN0O1xuIiwiaW1wb3J0IG5vZGVMaXN0Rm9yRWFjaCBmcm9tICcuL25vZGUtbGlzdC1mb3ItZWFjaCc7XG5pbXBvcnQgdGVsIGZyb20gJy4vdGVsJztcbmltcG9ydCBhbmltYXRpb24gZnJvbSAnLi9hbmltYXRpb24nO1xuaW1wb3J0IG1lbnVPcGVuIGZyb20gJy4vbWVudS1vcGVuJztcbmltcG9ydCBtb2RhbCBmcm9tICcuL21vZGFsJztcbmltcG9ydCBoZWFkZXJTY3JvbGwgZnJvbSAnLi9oZWFkZXInO1xuaW1wb3J0IHNsaWRlcnMgZnJvbSAnLi9zbGlkZXJzJztcbmltcG9ydCBudW1iZXIgZnJvbSAnLi9udW1iZXInO1xuaW1wb3J0IGJ0blVwIGZyb20gJy4vYnRuLXVwJztcbmltcG9ydCBhY2NvcmRpb24gZnJvbSAnLi9hY2NvcmRpb24nO1xuaW1wb3J0IGdvb2RRdWFudGl0eSBmcm9tICcuL2dvb2QtcXVhbnRpdHknO1xuaW1wb3J0IGNvbG9yc1NlbGVjdCBmcm9tICcuL2NvbG9ycy1zZWxlY3QnO1xuXG5jbGFzcyBBcHAge1xuICBzdGF0aWMgaW5pdCgpIHtcbiAgICBub2RlTGlzdEZvckVhY2goKTtcbiAgICB0ZWwoKTtcbiAgICBhbmltYXRpb24oKTtcbiAgICBtZW51T3BlbigpO1xuICAgIGhlYWRlclNjcm9sbCgpO1xuICAgIG1vZGFsKCk7XG4gICAgc2xpZGVycygpO1xuICAgIG51bWJlcigpO1xuICAgIGJ0blVwKCk7XG4gICAgYWNjb3JkaW9uKCk7XG4gICAgZ29vZFF1YW50aXR5KCk7XG4gICAgY29sb3JzU2VsZWN0KCk7XG4gIH1cbn1cblxuXG5BcHAuaW5pdCgpO1xud2luZG93LkFwcCA9IEFwcDtcbiJdLCJuYW1lcyI6WyJub2RlTGlzdEZvckVhY2giLCJ3aW5kb3ciLCJOb2RlTGlzdCIsInByb3RvdHlwZSIsImZvckVhY2giLCJjYWxsYmFjayIsInRoaXNBcmciLCJpIiwibGVuZ3RoIiwiY2FsbCIsInRlbCIsImZvcm1CbG9ja3MiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmb3JtQmxvY2siLCJpbnB1dCIsInF1ZXJ5U2VsZWN0b3IiLCJwaG9uZU1hc2siLCJJTWFzayIsIm1hc2siLCJhbmltYXRpb24iLCJhbmltYXRpb25zIiwiV09XIiwiaW5pdCIsImJ0bnMiLCIkIiwiY2hlY2tUb3VjaERldmljZSIsImNyZWF0ZUV2ZW50IiwiZSIsImlzVG91Y2hEZXZpY2UiLCJlYWNoIiwiJGJ1dHRvbiIsIiRyaXBwbGVUZW1wbGF0ZSIsImNsYXNzIiwiYXBwZW5kIiwiJHJpcHBsZSIsImZpbmQiLCJvbiIsInBhcmVudE9mZnNldCIsIm9mZnNldCIsInJlbFgiLCJwYWdlWCIsImxlZnQiLCJyZWxZIiwicGFnZVkiLCJ0b3AiLCJjc3MiLCJ3aWR0aCIsImhlaWdodCIsIm1lbnVPcGVuIiwiJGJ1dHRvbnNNZW51IiwiJG1lbnUiLCIkYnV0dG9uQ2xvc2UiLCIkaGVhZGVyIiwiJGJ0biIsInNjcm9sbEhlYWRlciIsImhhc0NsYXNzIiwic2Nyb2xsVG9wIiwiYWRkQ2xhc3MiLCJyZW1vdmVDbGFzcyIsImNsaWNrIiwicG9zIiwicGFyc2VJbnQiLCJhdHRyIiwicmVtb3ZlQXR0ciIsInNjcm9sbFRvIiwic2V0VGltZW91dCIsInBhZ2VQb3MiLCJtb2RhbCIsIiRidXR0b25zIiwiJGJvZHkiLCJvcHRpb25zIiwiaGlkZVNjcm9sbGJhciIsInRvdWNoIiwiYnRuVHBsIiwic21hbGxCdG4iLCJiZWZvcmVTaG93IiwiZGF0YSIsInNsaWNlIiwiYm9keVN0eWxlcyIsImFmdGVyQ2xvc2UiLCJmYW5jeWJveCIsImhlYWRlclNjcm9sbCIsIm1haW4iLCJpbnRyb1RvcCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsImNoZWNrSGVhZGVySGVpZ2h0IiwidmFsdWUiLCJvdXRlckhlaWdodCIsInNsaWRlcnMiLCJTd2lwZXIiLCJhZHZhbnRhZ2VzIiwibXlTd2lwZXIiLCJkaXJlY3Rpb24iLCJzbGlkZXNQZXJWaWV3Iiwic3BhY2VCZXR3ZWVuIiwic3BlZWQiLCJuYXZpZ2F0aW9uIiwibmV4dEVsIiwicHJldkVsIiwicGhvdG9zIiwibG9vcCIsImNlbnRlcmVkU2xpZGVzIiwicGFnaW5hdGlvbiIsImVsIiwiY2xpY2thYmxlIiwicmV2aWV3cyIsImJyZWFrcG9pbnRzIiwic2VydGlmaWNhdGVzIiwibnVtYmVyIiwiJG51bWJlcnMiLCIkdGhpc3MiLCJidG5VcCIsInNjcm9sbCIsImlzIiwib3BhY2l0eSIsImZhZGVJbiIsInN0b3AiLCJmYWRlT3V0IiwiYW5pbWF0ZSIsImFjY29yZGlvbiIsIiRhY2NvcmRpb25zIiwiJHNpZGUiLCIkbWFpbiIsImV2dCIsInByZXZlbnREZWZhdWx0Iiwic2xpZGVVcCIsImJsdXIiLCJzbGlkZURvd24iLCJnb29kUXVhbnRpdHkiLCJjb250YWluZXJzIiwiY29udGFpbmVyIiwiYnRuSW5jcmVhc2UiLCJidG5EZWNyZWFzZSIsImJ0bkluY3JlYXNlSGFuZGxlciIsIm5ld1ZhbHVlIiwicmVtb3ZlQXR0cmlidXRlIiwiYnRuRGVjcmVhc2VIYW5kbGVyIiwic2V0QXR0cmlidXRlIiwiYWRkRXZlbnRMaXN0ZW5lciIsImNvbG9yc1NlbGVjdCIsImNvbG9yc0Jsb2NrIiwibGlua3MiLCJwaWN0dXJlQmxvY2siLCJ0ZXh0QmxvY2siLCJsaW5rIiwicGljdHVyZSIsIm5hbWUiLCJ0ZXh0IiwiQXBwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBQUEsSUFBTUEsZUFBZSxHQUFHLFNBQWxCQSxlQUFrQixHQUFNO0VBQzVCLE1BQUksY0FBY0MsTUFBZCxJQUF3QixDQUFDQyxRQUFRLENBQUNDLFNBQVQsQ0FBbUJDLE9BQWhELEVBQXlEO0VBQ3ZERixJQUFBQSxRQUFRLENBQUNDLFNBQVQsQ0FBbUJDLE9BQW5CLEdBQTZCLFVBQVVDLFFBQVYsRUFBb0JDLE9BQXBCLEVBQTZCO0VBQzFEQSxNQUFBQSxPQUFPLEdBQUdBLE9BQU8sSUFBSUwsTUFBckI7O0VBQ0EsV0FBSyxJQUFJTSxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHLEtBQUtDLE1BQXpCLEVBQWlDRCxDQUFDLEVBQWxDLEVBQXNDO0VBQ3RDRixRQUFBQSxRQUFRLENBQUNJLElBQVQsQ0FBY0gsT0FBZCxFQUF1QixLQUFLQyxDQUFMLENBQXZCLEVBQWdDQSxDQUFoQyxFQUFtQyxJQUFuQztFQUNDO0VBQ0EsS0FMRDtFQU1EO0VBQ0YsQ0FURDs7RUNBQSxJQUFNRyxHQUFHLEdBQUcsU0FBTkEsR0FBTSxHQUFNO0VBQ2hCO0VBQ0EsTUFBTUMsVUFBVSxHQUFHQyxRQUFRLENBQUNDLGdCQUFULENBQTBCLFdBQTFCLENBQW5COztFQUVBLE1BQUlGLFVBQVUsQ0FBQ0gsTUFBZixFQUF1QjtFQUVyQkcsSUFBQUEsVUFBVSxDQUFDUCxPQUFYLENBQW1CLFVBQVNVLFNBQVQsRUFBb0I7RUFDckMsVUFBTUMsS0FBSyxHQUFHRCxTQUFTLENBQUNFLGFB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
