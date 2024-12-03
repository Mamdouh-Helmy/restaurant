import validateName from "./validateName";
import validateEmail from "./validateEmail";
import validatePassword from "./validatePassword";

const validateFields = (name, email, password, passwordConfirmation) => {
  let errors = {};

  if (name !== null) {
    if (name === "") {
      errors.name = "يرجى إدخال الاسم.";
    } else if (!validateName(name)) {
      errors.name = "الأسم حروف فقط ولا يقل عن ثلاثه أحرف ولا يزيد عن 15 حرف.";
    }
  }

  if (email !== null) {
    if (email === "") {
      errors.email = "يرجى إدخال بريد إلكتروني.";
    } else if (!validateEmail(email)) {
      errors.email = "يرجى إدخال بريد إلكتروني صالح.";
    }
  }

  if (password !== null) {
    if (password === "") {
      errors.password = "يرجى إدخال كلمة السر.";
    } else if (!validatePassword(password)) {
      errors.password = "يجب أن تكون كلمة المرور بين 8 و15 حرفًا، تشمل أحرف، أرقام، أو علامات.";
    }

    if (passwordConfirmation !== null) {
      if (passwordConfirmation === "") {
        errors.passwordConfirmation = "يرجى إدخال تأكيد كلمة السر.";
      } else if (password !== passwordConfirmation) {
        errors.passwordConfirmation = "كلمة المرور غير متطابقة.";
      }
    }
  }

  return errors;
};

export default validateFields;
