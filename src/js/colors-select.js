const colorsSelect = () => {
  const colorsBlock = $(".colors-block");
  if (!colorsBlock) {
    return;
  }

  const links = colorsBlock.find(".colors-block__item");
  const pictureBlock = colorsBlock.find(".colors-block__info img");
  const textBlock = colorsBlock.find(".colors-block__info p");

  links.each(function () {
    const link = $(this);

    link.on("click", function(evt) {
      evt.preventDefault();
      links.each(function () {
        $(this).removeClass("active");
      });

      const picture = link.attr("data-img");
      const name = link.find("p").text();
      pictureBlock.attr("src", picture);
      textBlock.text(name);

      link.addClass("active");
    })
  });


};

export default colorsSelect;
