import ImageErrorText from "../assets/error-message.png";
import { useLanguage } from "../context/LanguageContext";
export default function ErrorText() {
  const { language } = useLanguage();

  const texts = {
    ar: {
      error: "الاسم غير صحيح",
    },
    en: {
        error: "The name is incorrect.",
    },
  };

  const currentTexts = texts[language];
  return (
    <div className="w-fit text-[#c9c9c9] text-[18px] px-4 p-2 rounded-sm m-auto mt-3 flex items-center flex-col gap-1">
      <img src={ImageErrorText} alt="Image Error Text" />
      {currentTexts.error}{" "}
    </div>
  );
}
