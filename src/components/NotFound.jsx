import { Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Utensils, Chef, Bowl } from "./CookingShapes";
import { useLanguage } from "../context/LanguageContext";

export default function NotFound() {
  const { language } = useLanguage();
  const navigate = useNavigate();

  const texts = {
    ar: {
      text: "عذراً، الطبق غير موجود!",
      title: "يبدو أن الصفحة التي تبحث عنها قد تم إزالتها من قائمتنا",
      btn: "العودة للصفحة الرئيسية",
    },
    en: {
      text: "Sorry, the dish is not available!",
      title:
        "It appears that the page you are looking for has been removed from our list.",
      btn: "Back to Home Page",
    },
  };

  const currentTexts = texts[language];

  const goHome = () => {
    navigate("/restaurant/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#657a63] to-[#4a5a48] flex items-center justify-center p-4">
      <div className="text-center">
        <div className="flex justify-center gap-6 md:gap-12 mb-12">
          <Utensils />
          <Chef />
          <Bowl />
        </div>

        <h1 className="text-6xl font-bold text-white mb-4 animate-fade-in">
          404!
        </h1>

        <div className="space-y-4 mb-8">
          <h2 className="text-2xl font-semibold text-[#e0e7df] animate-slide-up">
            {currentTexts.text}
          </h2>
          <p className="text-[#c8d3c6] max-w-md mx-auto animate-slide-up [animation-delay:200ms]">
            {currentTexts.title}
          </p>
        </div>

        <div
          onClick={goHome}
          className="animate-fade-in bg-[#ffffff] w-fit m-auto py-2 px-2 duration-[0.3s] cursor-pointer text-[#4e5f4c] flex items-center gap-1 rounded-sm [animation-delay:400ms] hover:scale-105"
        >
          <Home className="w-5 h-5 inline-block mr-2" />
          {currentTexts.btn}
        </div>
      </div>
    </div>
  );
}
