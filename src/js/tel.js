const tel = () => {
  // Mask for tel
  const formBlocks = document.querySelectorAll(".fieldset");

  if (formBlocks.length) {

    formBlocks.forEach(function(formBlock) {
      const input = formBlock.querySelector("input[name=tel]");

      if(input) {
        const phoneMask = IMask( input, {
          mask: "+{7} 000 000-00-00"
        });
      }

    });

  }

};

export default tel;
