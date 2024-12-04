import lodingFood from "../assets/Bolt Food - Cooking.gif";
import { useLanguage } from "../context/LanguageContext";
import "../styles/main.css";
const Loading = () => {
  const { language } = useLanguage();
  const texts = {
    ar: {
      loading: "تحميل",
    },
    en: {
      loading: "Loading",
    },
  };

  const currentTexts = texts[language];

  return (
    <div className="relative w-full h-[100vh] bg-[#fdfefe]">
        <div className=" absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%] flex items-center flex-col">
          <div>
            <img src={lodingFood} alt="loding" />
          </div>
          <div className="loading-text">{currentTexts.loading}</div>
        </div>
    </div>
  );
};

export default Loading;
