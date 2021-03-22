const sliders = () => {
  const Swiper = window.Swiper;

  // Slider partners
  const partners = document.querySelector(".js-partners-slider");

  if (partners) {
    const mySwiper = new Swiper(".js-partners-slider .swiper-container", {
      direction: "horizontal",
      slidesPerView: 1,
      spaceBetween: 15,
      navigation: {
        nextEl: ".js-partners-slider .swiper-button-next",
        prevEl: ".js-partners-slider .swiper-button-prev",
      },
      breakpoints: {
        450: {
          slidesPerView: 2,
          spaceBetween: 15,
        },
        650: {
          slidesPerView: 3,
          spaceBetween: 15,
        },
        850: {
          slidesPerView: 4,
          spaceBetween: 10,
        },
        1120: {
          slidesPerView: 5,
          spaceBetween: 40,
        },
      },
    });
  }
};

export default sliders;
