import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useLanguage } from "../context/LanguageContext";
import { MdDelete } from "react-icons/md";

export default function DeleteAccount() {
  const { deleteAccount } = useAuth();
  const { language } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);

  const texts = {
    ar: {
      text: "حذف الحساب",
    },
    en: {
      text: "Delete account",
    },
  };

  const currentTexts = texts[language];

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
    <button className="w-full border-none outline-none" onClick={handelDeleteAccount} disabled={isLoading}>
      <div className="text cursor-pointer duration-[0.3s] hover:bg-[#e3e3e3]">
        <div className="container text-[14px] select-none mx-auto flex items-center gap-[20px] px-4 py-[15px] text-[#ff0000] font-bold">
          <div className="text-[20px]">
            <MdDelete />
          </div>{" "}
          {currentTexts.text}
        </div>
      </div>
    </button>
  );
}
