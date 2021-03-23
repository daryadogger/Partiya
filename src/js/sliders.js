const sliders = () => {
  const Swiper = window.Swiper;

  // Slider sertificates
  const sertificates = document.querySelector(".js-sertificates-slider");

  if (sertificates) {
    const mySwiper = new Swiper(".js-sertificates-slider.swiper-container", {
      direction: "horizontal",
      slidesPerView: 1,
      spaceBetween: 20,
      speed: 400,
      loop: true,
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
          spaceBetween: 20,
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
