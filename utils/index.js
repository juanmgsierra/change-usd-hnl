const numbValidation = (e) => {
  var charCode = e.which;
  var sizeEntry = e.target.value.length;
  if (charCode >= 32 && (charCode < 46 || charCode > 57)) {
    e.preventDefault();
  }
  if (sizeEntry > 6) {
    e.preventDefault();
  }
};

export default numbValidation;
