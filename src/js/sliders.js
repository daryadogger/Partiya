const sliders = () => {
  const Swiper = window.Swiper;

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
