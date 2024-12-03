import { Link, useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import { useAuth } from "../context/AuthContext";
import { useRef, useState } from "react";
import GoogleSignInButton from "../components/GoogleSignInButton";
import validateFields from "../validation/validateFields";
import { toast } from "react-toastify";
import InputField from "../components/InputField";

export default function Login() {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    const errors = validateFields(null, email, password, null);

    if (Object.keys(errors).length) {
      Object.values(errors).forEach((err) => {
        toast.error(err);
      });
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      navigate("/");
      toast.success("تم تسجيل الحساب بنجاح!");
    } catch {
      toast.error("البريد الإلكتروني أو كلمة السر غير صحيحة.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2>تسجيل الدخول</h2>
      <form onSubmit={handleSubmit}>
        <InputField label="البريد الإلكتروني" type="text" valueRef={emailRef} />

        <InputField
          label="كلمة المرور"
          type={showPassword ? "text" : "password"}
          valueRef={passwordRef}
          showPasswordToggle={handlePasswordToggle}
        />

        <button type="submit" disabled={loading}>
          {loading ? "جار تسجيل الدخول ..." : "تسجيل الدخول"}
        </button>
        <GoogleSignInButton />
        <Link to="/forgotpassword">استعادة كلمة السر</Link>
        <Link to="/signup">تسجيل حساب جديد</Link>
      </form>
      <BackButton />
    </>
  );
}
