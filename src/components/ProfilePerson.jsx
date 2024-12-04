import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { toast } from "react-toastify";
import { useLanguage } from "../context/LanguageContext";

export default function ProfilePerson() {
  const { currentUser, logout, deleteAccount } = useAuth();
  const { language } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);

  const texts = {
    ar: {
      title: "الحساب",
      btn1: "تسجيل الخروج",
      btn2: "تعديل",
    },
    en: {
      title: "Profile",
      btn1: "sign out",
      btn2: "edit",
    },
  };

  const currentTexts = texts[language];

  const handelLogout = async () => {
    setIsLoading(true);
    try {
      await logout();
      toast.success("تم الخروج الحساب بنجاح");
    } catch {
      toast.error("فشل تسجيل الخروج");
    } finally {
      setIsLoading(false);
    }
  };

  const handelDeleteAccount = async () => {
    setIsLoading(true);
    try {
      const result = await deleteAccount();
      if (result) {
        toast.success("تم حذف الحساب بنجاح");
      }
    } catch (error) {
      if (error.code === "auth/invalid-credential") {
        toast.error("كلمة السر خطأ");
      } else {
        toast.error("فشل حذف الحساب!");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="container mx-auto px-4 py-[15px] flex items-center justify-between text-[18px] text-[#66666b] font-bold">
        {currentTexts.title}
        <button
          className="block cursor-pointer text-[14px] text-[#657a63] border-none outline-none"
          onClick={handelLogout}
          disabled={isLoading}
        >
          {currentTexts.btn1}
        </button>
      </div>
      <div className="container mx-auto px-6 py-[15px] flex items-center gap-3">
        <div>
          {currentUser.photoURL && (
            <img
              src={currentUser.photoURL}
              className="rounded-full h-[60px] w-[60px]"
            />
          )}
        </div>
        <div>
          {currentUser && (
            <div>
              <div className="text-[16px] pb-1 text-[#66666b] font-semibold">
                {currentUser.displayName}
              </div>
              <div className="text-[14px] pb-1 text-[#808080]">
                {currentUser.email}
              </div>
              <div className="text-[14px] text-[#808080]">
                {currentUser.phoneNumber}
              </div>
              <Link to="/restaurant/updateprofile">
                <div className="text-[16px] cursor-pointer text-[#657a63]">
                  {currentTexts.btn2}
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
