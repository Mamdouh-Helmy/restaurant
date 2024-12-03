import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLanguage } from "../context/LanguageContext";
import { useNavigate } from "react-router-dom";
import { faClock, faTruck } from "@fortawesome/free-solid-svg-icons";
import DeliveryTimeSelector from "./DeliveryTimeSelector";
import { useState } from "react";

export default function SelectAddress() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [check, setCheck] = useState(false);

  const savedOrderMethod = localStorage.getItem("orderMethod");
  const savedSelectedDetail = JSON.parse(
    localStorage.getItem("selectedDetail")
  );
  const selectedOption = localStorage.getItem("selectedOption");
  const savedSelectedTime1 = JSON.parse(localStorage.getItem("selectedTime1"));
  const selectedDate = JSON.parse(localStorage.getItem("selectedDate"));
  const selectedHour = JSON.parse(localStorage.getItem("selectedHour"));

  const texts = {
    ar: {
      text: "من",
      btn1: "توصيل",
      btn2: "أستلام",
      title1: "توصيل إلى",
      title12: "استلام من",
      title1Text1: "تغير",
      title1Text2: "أختر منطقه",
      title2: "أقرب وصول",
      title22: "أقرب استلام",
      title2Text1: "تغير",
    },
    en: {
      text: "to",
      btn1: "Delivery",
      btn2: "Pickup",
      title1: "Deliver to",
      title12: "Pick up from",
      title1Text1: "Edit",
      title1Text2: "Choose location",
      title2: "Earliest arrival",
      title22: "Earliest pickup",
      title2Text1: "Edit",
    },
  };

  const currentTexts = texts[language];

  const handelNavgatie = (method) => {
    navigate("/selectBranch", { state: { method } });
  };

  const handelSheck = () => {
    setCheck((prevCheck) => !prevCheck);
  };
  const selectedText =
    language === "ar"
      ? `${selectedDate?.ar} ${currentTexts.text} ${selectedHour?.ar}`
      : `${selectedDate?.en} ${currentTexts.text} ${selectedHour?.en}`;

  return (
    <>
      <div className="container mx-auto px-2 py-[25px]">
        <div className="flex items-center justify-evenly">
          <button
            className={`text-[#666666] rounded-sm py-[6px] px-[16px] text-[14px] outline-none border-spacing-[1px] font-bold border-[#666666] border-solid duration-[0.3s] relative z-[3] hover:text-[#ffffff] before:absolute before:duration-[0.3s] before:w-[0] before:top-0 before:left-0 before:h-[100%] before:z-[-1] before:bg-[#657a63] hover:before:w-[100%] ${
              savedOrderMethod === "delivery" && savedSelectedDetail !== null
                ? " bg-[#657a63] text-[#ffffff] border-none cursor-not-allowed"
                : ""
            }`}
            onClick={() => handelNavgatie("delivery")}
            disabled={
              savedOrderMethod === "delivery" && savedSelectedDetail !== null
            }
          >
            {currentTexts.btn1}
          </button>
          <button
            className={`text-[#666666] rounded-sm py-[6px] px-[16px] text-[14px] outline-none border-spacing-[1px] font-bold border-[#666666] border-solid duration-[0.3s] relative z-[3] hover:text-[#ffffff] before:absolute before:duration-[0.3s] before:w-[0] before:top-0 before:left-0 before:h-[100%] before:z-[-1] before:bg-[#657a63] hover:before:w-[100%]${
              savedOrderMethod === "pickup" && savedSelectedDetail !== null
                ? " bg-[#657a63] text-[#ffffff] border-none cursor-not-allowed"
                : ""
            }`}
            onClick={() => handelNavgatie("pickup")}
            disabled={
              savedOrderMethod === "pickup" && savedSelectedDetail !== null
            }
          >
            {currentTexts.btn2}
          </button>
        </div>
      </div>
      <hr />
      <div className="container mx-auto px-2 py-[25px]">
        <div className="flex items-center justify-between">
          <div className="text-[14px] flex items-center gap-[22px]">
            <FontAwesomeIcon
              icon={faTruck}
              size="xs"
              style={{ color: "#adadad" }}
            />
            {savedOrderMethod === "delivery"
              ? currentTexts.title1
              : currentTexts.title12}
          </div>
          <div className="flex items-center gap-[22px]">
            <div className="text-[15px]">
              {savedSelectedDetail
                ? language === "ar"
                  ? savedSelectedDetail.ar
                  : savedSelectedDetail.en
                : currentTexts.title1Text2}
            </div>
            <div
              className="cursor-pointer text-[#6b7f69] text-[14px] duration-[0.3s] hover:underline"
              onClick={() => handelNavgatie(savedOrderMethod || "delivery")}
            >
              {currentTexts.title1Text1}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between mt-[14px]">
          <div className="text-[14px] flex items-center gap-[22px]">
            <FontAwesomeIcon
              icon={faClock}
              size="xs"
              style={{ color: "#adadad" }}
            />
            {savedOrderMethod === "delivery"
              ? currentTexts.title2
              : currentTexts.title22}
          </div>
          <div className="flex items-center gap-[22px]">
            <div className="text-[12px] md:text-[15px]">
              {savedSelectedDetail && (
                <span>
                  {selectedOption === "later" && selectedDate && selectedDate
                    ? selectedText 
                    : language === "ar"
                    ? savedSelectedTime1?.ar || savedSelectedTime1?.en
                    : savedSelectedTime1?.en || savedSelectedTime1?.ar}
                </span>
              )}
            </div>
            <div
              className="cursor-pointer text-[#6b7f69] text-[14px] duration-[0.3s] hover:underline"
              onClick={handelSheck}
            >
              {savedSelectedDetail && currentTexts.title1Text1}
            </div>
          </div>
        </div>
      </div>
      <hr />
      {check && (
        <DeliveryTimeSelector
          check={check}
          handelSheck={handelSheck}
          savedSelectedTime1={savedSelectedTime1}
        />
      )}
    </>
  );
}
