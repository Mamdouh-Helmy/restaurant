import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import LayoutBackGroundColor from "./LayoutBackGroundColor";
import { useState, useEffect } from "react";
import Dropdown from "./Dropdown";

export default function DeliveryTimeSelector({
  check,
  handelSheck,
  savedSelectedTime1,
}) {
  const { language } = useLanguage();
  const [selectedOption, setSelectedOption] = useState(
    localStorage.getItem("selectedOption") || "asap"
  );
  const [selectedDateAR, setSelectedDateAR] = useState(
    localStorage.getItem("DateAR") || ""
  );
  const [selectedDateEN, setSelectedDateEN] = useState(
    localStorage.getItem("DateEN") || ""
  );
  const [selectedHourAR, setSelectedHourAR] = useState(
    localStorage.getItem("HourAR") || ""
  );
  const [selectedHourEN, setSelectedHourEN] = useState(
    localStorage.getItem("HourEN") || ""
  );

  const savedOrderMethod = localStorage.getItem("orderMethod");
  const selectedDate = JSON.parse(localStorage.getItem("selectedDate"));
  const selectedHour = JSON.parse(localStorage.getItem("selectedHour"));

  const texts = {
    ar: {
      time: "من",
      text: "موعد التسليم",
      title1: "في اقرب وقت",
      title2: "توصيل لاحقا",
      title3: "استلام لاحقا",
      btn: "أغلاق",
      selectDay: "اختر اليوم",
      selectHour: "اختر الساعه",
    },
    en: {
      time: "to",
      text: "Arrival time",
      title1: "ASAP",
      title2: "Schedule for later",
      title3: "Schedule pickup for later",
      btn: "Close",
      selectDay: "Select a day",
      selectHour: "Select a hour",
    },
  };

  const currentTexts = texts[language];

  const selectedText =
    language === "ar"
      ? `${selectedDate?.ar} ${currentTexts.time} ${selectedHour?.ar}`
      : `${selectedDate?.en} ${currentTexts.time} ${selectedHour?.en}`;

  useEffect(() => {
    if (
      selectedOption === "later" &&
      selectedDateAR &&
      selectedDateEN &&
      selectedHourAR &&
      selectedHourEN
    ) {
      localStorage.setItem(
        "selectedDate",
        JSON.stringify({ ar: selectedDateAR, en: selectedDateEN })
      );
      localStorage.setItem(
        "selectedHour",
        JSON.stringify({ ar: selectedHourAR, en: selectedHourEN })
      );
    }
    localStorage.setItem("DateAR", selectedDateAR);
    localStorage.setItem("DateEN", selectedDateEN);
    localStorage.setItem("HourAR", selectedHourAR);
    localStorage.setItem("HourEN", selectedHourEN);
    localStorage.setItem("selectedOption", selectedOption);
  }, [
    selectedOption,
    selectedDateAR,
    selectedDateEN,
    selectedHourAR,
    selectedHourEN,
  ]);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const generateFutureDates = () => {
    const daysAR = [];
    const daysEN = [];
    const today = new Date();

    for (let i = 0; i < 10; i++) {
      const futureDate = new Date(today);
      futureDate.setDate(today.getDate() + i);

      const dayNameAR = futureDate.toLocaleDateString("ar-EG", {
        weekday: "long",
      });
      const formattedDateAR = futureDate.toLocaleDateString("ar-EG", {
        day: "numeric",
        month: "long",
      });

      const dayNameEN = futureDate.toLocaleDateString("en-US", {
        weekday: "long",
      });
      const formattedDateEN = futureDate.toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
      });

      daysAR.push(`${dayNameAR} ${formattedDateAR}`);
      daysEN.push(`${dayNameEN} ${formattedDateEN}`);
    }

    return [{ ar: daysAR, en: daysEN }];
  };

  const generateFutureHours = () => {
    const hoursAR = [];
    const hoursEN = [];
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinutes = now.getMinutes();

    const today = new Date();
    const dayOfWeek = today.getDay();

    const daysShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const dayName = daysShort[dayOfWeek];

    let daySelcted = selectedDateEN.toString().slice(0, 3);

    let startHour, startMinutes;

    if (dayName === daySelcted) {
      startHour = currentHour < 11 ? 11 : currentHour;
      startMinutes = currentHour < 11 ? 0 : currentMinutes;
    } else {
      startHour = 11;
      startMinutes = 0;
    }

    const endHour = 23;

    for (let i = startHour; i <= endHour; i++) {
      const hourStart = new Date();
      const hourEnd = new Date();

      hourStart.setHours(i, i === startHour ? startMinutes : 0, 0, 0);
      hourEnd.setHours(i + 1, 0, 0, 0);

      const formattedStartAR = hourStart.toLocaleTimeString("ar-EG", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
      const formattedEndAR = hourEnd.toLocaleTimeString("ar-EG", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });

      const [hourStartAR, minuteStartAR, periodStartAR] = formattedStartAR
        .replace(/[\u0660-\u0669]/g, (d) => d.charCodeAt(0) - 1632)
        .split(/:| /);

      const [hourEndAR, minuteEndAR, periodEndAR] = formattedEndAR
        .replace(/[\u0660-\u0669]/g, (d) => d.charCodeAt(0) - 1632)
        .split(/:| /);

      const formattedStartARCustom = `${minuteStartAR}:${hourStartAR} ${periodStartAR}`;
      const formattedEndARCustom = `${minuteEndAR}:${hourEndAR} ${periodEndAR}`;
      const formattedStartEN = hourStart.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
      const formattedEndEN = hourEnd.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });

      hoursAR.push(`${formattedStartARCustom} إلى ${formattedEndARCustom}`);
      hoursEN.push(`${formattedStartEN} to ${formattedEndEN}`);
    }

    return [{ ar: hoursAR, en: hoursEN }];
  };

  const futureHours = generateFutureHours();
  const futureDates = generateFutureDates();

  return (
    <>
      {check && (
        <>
          <LayoutBackGroundColor />
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5 }}
            className="fixed w-[100%] z-[50000] bottom-0 bg-[#f4f5f5] p-[20px] rounded-sm md:w-[43%]"
          >
            <div className="text-[18px] mb-4">{currentTexts.text}</div>
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div>
                    <FontAwesomeIcon
                      icon={faClock}
                      size="sm"
                      style={{ color: "#b5b6b6" }}
                    />
                  </div>
                  <div>
                    <span className="block text-[16px] mb-1">
                      {currentTexts.title1}
                    </span>
                    <span className="block text-[14px] text-[#cacaca]">
                      {language == "ar" && language !== null
                        ? savedSelectedTime1?.ar
                        : savedSelectedTime1?.en}
                    </span>
                  </div>
                </div>
                <div>
                  <input
                    type="radio"
                    name="deliveryTime"
                    id="asap"
                    value={
                      language == "ar" && language !== null
                        ? savedSelectedTime1?.ar
                        : savedSelectedTime1?.en
                    }
                    className="accent-[#657a63] scale-[1.5]"
                    checked={selectedOption === "asap"}
                    onChange={() => handleOptionChange("asap")}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div>
                    <FontAwesomeIcon
                      icon={faClock}
                      size="sm"
                      style={{ color: "#b5b6b6" }}
                    />
                  </div>
                  <div>
                    <span className="block text-[16px] mb-1">
                      {savedOrderMethod === "delivery"
                        ? currentTexts.title2
                        : currentTexts.title3}
                    </span>
                    <span className="block text-[12px] text-[#b5b6b6]">
                      {selectedDate && selectedText}
                    </span>
                  </div>
                </div>
                <div>
                  <input
                    type="radio"
                    name="deliveryTime"
                    id="later"
                    className="accent-[#657a63] scale-[1.5]"
                    checked={selectedOption === "later"}
                    onChange={() => handleOptionChange("later")}
                  />
                </div>
              </div>
              {selectedOption === "later" && (
                <div className="my-6">
                  <motion.div
                    className="mb-3 text-[18px]"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex items-center justify-between">
                      <div>{currentTexts.selectDay}</div>
                      <div>{currentTexts.selectHour}</div>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-center justify-between gap-5"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Dropdown
                      options={futureDates[0]}
                      setSelectedValueAR={setSelectedDateAR}
                      setSelectedValueEN={setSelectedDateEN}
                      selectedValueAR={selectedDateAR}
                      selectedValueEN={selectedDateEN}
                      label={currentTexts.selectDay}
                    />
                    <Dropdown
                      options={futureHours[0]}
                      setSelectedValueAR={setSelectedHourAR}
                      setSelectedValueEN={setSelectedHourEN}
                      selectedValueAR={selectedHourAR}
                      selectedValueEN={selectedHourEN}
                      label={currentTexts.selectHour}
                    />
                  </motion.div>
                </div>
              )}
            </div>
            <button
              className="block w-[100%] my-1 bg-[#657a63] text-[16px] py-[10px] border-none rounded-sm text-[#ffffff] duration-[0.3s] hover:bg-[#465545]"
              onClick={handelSheck}
            >
              {currentTexts.btn}
            </button>
          </motion.div>
        </>
      )}
    </>
  );
}
