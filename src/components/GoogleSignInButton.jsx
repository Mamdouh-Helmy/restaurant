import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { Google } from "../../utils/icons.util";
import { useLanguage } from "../context/LanguageContext";

const GoogleSignInButton = () => {
  const { loginWithGoogle } = useAuth();
  const [loading, setLoading] = useState(false);
  const { language } = useLanguage();

  const texts = {
    ar: {
      loggingIn: "جار تسجيل الدخول...",
      google: "جوجل",
    },
    en: {
      loggingIn: "Logging in...",
      google: "Google",
    },
  };

  const currentTexts = texts[language];

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await loginWithGoogle();
      toast.success("تم تسجيل الدخول بنجاح.");
    } catch {
      toast.error("فشل تسجيل الدخول باستخدام Google.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoogleSignIn}
      disabled={loading}
      className="border-none outline-none flex items-center gap-[20px] w-full  login-email cursor-pointer duration-[0.3s] hover:bg-[#e3e3e3]"
    >
      <div>
        <div className="container select-none mx-auto px-4 py-[15px] flex items-center gap-[20px] text-[18px] text-[#66666b] font-bold">
          <Google />
          {loading ? currentTexts.loggingIn : currentTexts.google}
        </div>
      </div>
    </button>
  );
};

export default GoogleSignInButton;
