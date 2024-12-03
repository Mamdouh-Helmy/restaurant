const validateName = (name) => {
  const nameRegex = /^[\u0621-\u064A\u0660-\u0669a-zA-Z]{3,}( [\u0621-\u064A\u0660-\u0669a-zA-Z]*){0,12}$/; 

  const isLengthValid = name.length <= 15;

  return nameRegex.test(name) && isLengthValid;
};

export default validateName;
