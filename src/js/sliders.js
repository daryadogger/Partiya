const sliders = () => {
  const Swiper = window.Swiper;

  // Adv sertificates
  const advantages = document.querySelector(".js-advantages-slider");

  if (advantages) {
    const mySwiper = new Swiper(".js-advantages-slider.swiper-container", {
      direction: "horizontal",
      slidesPerView: 1,
      spaceBetween: 20,
      speed: 400,
      navigation: {
        nextEl: ".js-advantages-slider .swiper-button-next",
        prevEl: ".js-advantages-slider .swiper-button-prev",
      },
    });
  }

  // Photos sertificates
  const photos = document.querySelector(".js-photos-slider");

  if (photos) {
    const mySwiper = new Swiper(".js-photos-slider.swiper-container", {
      direction: "horizontal",
      slidesPerView: 2,
      spaceBetween: 20,
      speed: 400,
      loop: true,
      centeredSlides: true,
      navigation: {
        nextEl: ".js-photos-slider .swiper-button-next",
        prevEl: ".js-photos-slider .swiper-button-prev",
      },
      pagination: {
        el: '.js-photos-slider .swiper-pagination',
        clickable: true,
      },
    });
  }


  // Reviews sertificates
  const reviews = document.querySelector(".js-reviews-slider");

  if (reviews) {
    const mySwiper = new Swiper(".js-reviews-slider.swiper-container", {
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
        },
        575: {
          slidesPerView: 3,
          spaceBetween: 15,
        },
        991: {
          slidesPerView: 3,
          spaceBetween: 120,
        },
      },
      navigation: {
        nextEl: ".js-reviews-slider .swiper-button-next",
        prevEl: ".js-reviews-slider .swiper-button-prev",
      },
    });
  }

  // Slider sertificates
  const sertificates = document.querySelector(".js-sertificates-slider");

  if (sertificates) {
    const mySwiper = new Swiper(".js-sertificates-slider.swiper-container", {
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
        },
        575: {
          slidesPerView: 3,
          spaceBetween: 15,
        },
        991: {
          slidesPerView: 3,
          spaceBetween: 120,
        },
      },
      navigation: {
        nextEl: ".js-sertificates-slider .swiper-button-next",
        prevEl: ".js-sertificates-slider .swiper-button-prev",
      },
    });
  }
};

export default sliders;
