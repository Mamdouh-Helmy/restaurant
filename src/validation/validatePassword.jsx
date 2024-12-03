const validatePassword = (password) => {
    const passwordRegex = /^(?=.{8,15}$)([A-Za-z0-9@#-_]*)$/;
    return passwordRegex.test(password);
  };
  
  export default validatePassword;
  