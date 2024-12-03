import { useRef, useState } from "react";
import BackButton from "../components/BackButton";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import validateFields from "../validation/validateFields";
import InputField from "../components/InputField";

export default function UpdateProfile() {
  const { currentUser, updateUserPassword } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const navigate = useNavigate();

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const password = passwordRef.current.value;
    const passwordConfirmation = passwordConfirmationRef.current?.value;

    const errors = validateFields(null, null, password, passwordConfirmation);

    if (Object.keys(errors).length) {
      Object.values(errors).forEach((err) => {
        toast.error(err);
      });
      return;
    }

    const promises = [];
    setLoading(true);

    if (password) {
      promises.push(updateUserPassword(password));
    }

    Promise.all(promises)
      .then(() => {
        navigate("/");
        toast.success("تم تعديل الحساب بنجاح!");
      })
      .catch(() => {
        toast.error("فشل في تعديل الحساب.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <h2>تعديل الملف الشخصي</h2>

      <form onSubmit={handleSubmit}>
        <InputField
        label="البريد الإلكتروني"
        type="text"
        disabled={true}
        defaultValue={currentUser && currentUser.email}
      />

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
          {loading ? "جارٍ تعديل الحساب..." : "تعديل"}
        </button>
      </form>
      <BackButton />
    </div>
  );
}
