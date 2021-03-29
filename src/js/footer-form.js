const footerForm = () => {
  const $footerForm = $(".footer form");
  if (!$footerForm) {
    return;
  }

  const inputs = $footerForm.find("input");

  inputs.each(function() {
    const input = $(this);

    input.on("change", function() {
      if (input.val() !== ``) {
        input.addClass("has-value");
      } else {
        input.removeClass("has-value");
      }
    });
  });

};

export default footerForm;
