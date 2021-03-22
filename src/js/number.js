const number = () => {
  //Разрешает ввод только цифр в input
  const $numbers = $(".js-number");
  if (!$numbers) {
    return;
  }

  $numbers.each(function() {
    const $thiss = $(this);

    $thiss.mask('0#');
  });

};

export default number;
