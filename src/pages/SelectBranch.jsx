import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCar, faPerson } from "@fortawesome/free-solid-svg-icons";
import Delivery from "../components/Delivery";
import Pickup from "../components/Pickup";
import { useLocation } from "react-router-dom";
import BackButton from "../components/BackButton";
import Language from "../components/Language";

export default function SelectBranch() {
  const { language } = useLanguage();
  const { state } = useLocation();
  const { method } = state || {};

  const [selectedMethod, setSelectedMethod] = useState();

  const texts = {
    ar: {
      title1: "الطريقه",
      btn1: "توصيل",
      btn2: "أستلام",
      title2: "العنوان",
    },
    en: {
      title1: "Method",
      btn1: "Delivery",
      btn2: "Pickup",
      title2: "Location",
    },
  };

  const currentTexts = texts[language];

  const finalMethod = selectedMethod || method;

  const handleButtonClick = (method) => {
    setSelectedMethod(method);
  };

  return (
    <div className="bg-[#f4f5f5] h-[100vh]">
      <div className="flex items-center justify-between bg-[#ffffff]">
        <BackButton />
        <div className="slider-container px-4">
          <Language />
        </div>
      </div>
      <div className="container mx-auto px-2 pt-[30px] pb-[10px]">
        <div className="text-[14px] text-[#5b5b5b] font-bold">
          {currentTexts.title1}
        </div>
      </div>
      <hr />
      <div className="bg-[#ffffff]">
        <div className="container mx-auto flex px-4 py-[25px] gap-[30px] text-[14px]">
          <button
            className={`flex flex-col items-center gap-[6px] rounded-sm py-[8px] px-[20px] ${
              finalMethod === "delivery"
                ? "text-[#89a986] border-[#89a986] border-[2px]"
                : "text-[#808080] border-spacing-[1px] border-[#808080] border-solid"
            }`}
            onClick={() => handleButtonClick("delivery")}
          >
            <FontAwesomeIcon
              icon={faCar}
              style={{
                color: finalMethod === "delivery" ? "#89a986" : "#808080",
              }}
            />
            {currentTexts.btn1}
          </button>
          <button
            className={`flex flex-col items-center gap-[6px] rounded-sm py-[8px] px-[20px] ${
              finalMethod === "pickup"
                ? "text-[#89a986] border-[#89a986] border-[2px]"
                : "text-[#808080] border-spacing-[1px] border-[#808080] border-solid"
            }`}
            onClick={() => handleButtonClick("pickup")}
          >
            <FontAwesomeIcon
              icon={faPerson}
              style={{
                color: finalMethod === "pickup" ? "#89a986" : "#808080",
              }}
            />
            {currentTexts.btn2}
          </button>
        </div>
      </div>
      <hr />
      <div className="container mx-auto pt-[30px] px-2 pb-[10px]">
        <div className="text-[14px] text-[#5b5b5b] font-bold">
          {currentTexts.title2}
        </div>
      </div>
      <hr />
      {finalMethod === "delivery" && <Delivery />}
      {finalMethod === "pickup" && <Pickup />}
      <hr />
    </div>
  );
}
