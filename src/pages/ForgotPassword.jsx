import { Link, useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import { useAuth } from "../context/AuthContext";
import { useRef, useState } from "react";
import InputField from "../components/InputField";
import { toast } from "react-toastify";
import validateFields from "../validation/validateFields";

export default function ForgotPassword() {
  const { resetPassword } = useAuth();
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;

    const errors = validateFields(null, email , null , null);

    if (Object.keys(errors).length) {
      Object.values(errors).forEach((err) => {
        toast.error(err);
      });
      return;
    }

    setLoading(true);
    try {
      await resetPassword(email);
      toast.success("تم إرسال الي البريد الإلكتروني!");
      navigate('/login')
    } catch {
      toast.error("البريد الإلكتروني غير صحيح.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>أستعاده كلمه السر</h2>
      <form onSubmit={handleSubmit}>
      <InputField
        label="البريد الإلكتروني"
        type="text"
        valueRef={emailRef}
      />
        <button type="submit" disabled={loading}>
          {loading ? "جارٍ الارسال الي بريدك الالكتروني..." : "أعاده كلمه السر"}
        </button>
        <Link to="/login">تسجيل الدخول</Link>
      </form>
      <BackButton />
    </div>
  );
}
