import { useLanguage } from "../context/LanguageContext";

export default function Language() {
  const { toggleLanguage, language } = useLanguage();

  return (
    <div
      className="link w-[20px] h-[20px] flex items-center justify-center rounded-full cursor-pointer text-[16px] text-[#585858] duration-[0.3s] 
                md:w-[40px] md:h-[40px] md:bg-[#ffffff] bg-transparent hover:shadow-lg"
      onClick={toggleLanguage}
    >
      <button className="border-none outline-none select-none">
        {language === "en" ? "EN" : "ع"}
      </button>
    </div>
  );
}
