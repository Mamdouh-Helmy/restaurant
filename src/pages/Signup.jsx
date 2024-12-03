import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import validateFields from "../validation/validateFields";
import { useAuth } from "../context/AuthContext";
import InputField from "../components/InputField";
import GoogleSignInButton from "../components/GoogleSignInButton";
import BackButton from "../components/BackButton";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = nameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const passwordConfirmation = passwordConfirmationRef.current?.value;

    const errors = validateFields(name, email, password, passwordConfirmation);

    if (Object.keys(errors).length) {
      Object.values(errors).forEach((err) => {
        toast.error(err);
      });
      return;
    }

    setLoading(true);
    try {
      await signup(email, password, name);
      navigate("/");
      toast.success("تم تسجيل الحساب بنجاح!");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        toast.error(
          "البريد الإلكتروني مستخدم بالفعل. حاول بريدًا إلكترونيًا آخر أو قم بتسجيل الدخول."
        );
        Swal.fire("البريد الإلكتروني موجود بالفعل!", "يرجى تسجيل الدخول.", "error");
      } else if (error.message === "operation-cancelled") {
        toast.info("تم إلغاء عملية التسجيل.");
      } else if (error.message === "incorrect-verification-code") {
        toast.error("الرمز غير صحيح، يرجى المحاولة مجددًا.");
      } else {
        toast.error("حدث خطأ أثناء تسجيل الحساب.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <InputField label="الاسم" type="text" valueRef={nameRef} />
        <InputField label="البريد الإلكتروني" type="text" valueRef={emailRef} />

        <InputField
          label="كلمة المرور"
          type={showPassword ? "text" : "password"}
          valueRef={passwordRef}
          showPasswordToggle={handlePasswordToggle}
        />

        <InputField
          label="تأكيد كلمة المرور"
          type={showPassword ? "text" : "password"}
          valueRef={passwordConfirmationRef}
        />

        <button type="submit" disabled={loading}>
          {loading ? "جار تسجيل الدخول ..." : "تسجيل حساب جديد"}
        </button>
        <GoogleSignInButton />
      </form>
      <BackButton />
    </>
  );
};

export default Signup;
