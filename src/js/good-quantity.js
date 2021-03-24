const goodQuantity = () => {
  // Увеличение и уменьшение товаров
  const containers = document.querySelectorAll(".js-quantity");
  if (containers.length < 0) {
    return;
  }

  containers.forEach((container) => {
    const input = container.querySelector("input");
    const btnIncrease = container.querySelector(".js-increase");
    const btnDecrease = container.querySelector(".js-decrease");

    let value;

    const btnIncreaseHandler = () => {
      value = input.value;
      let newValue = ++value;

      if (newValue > 1) {
        btnDecrease.removeAttribute("disabled");
      }

      input.value = newValue;
    };

    const btnDecreaseHandler = () => {
      value = input.value;
      let newValue = --value;

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
    })
  });

};

export default goodQuantity;
