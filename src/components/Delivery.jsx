import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faCaretUp,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import ErrorText from "./ErrorText";

export default function Delivery() {
  const { language } = useLanguage();
  const navigate = useNavigate();

  const [openBranch, setOpenBranch] = useState(null);
  const [manualClose, setManualClose] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDetail, setSelectedDetail] = useState(null);

  const texts = {
    ar: {
      swal: [
        {
          name: "هل أنت متأكد؟",
          text1: `هل تريد حفظ `,
          text2: ` كموقع مختار؟`,
          confirmButtonText: "نعم، حفظ",
          cancelButtonText: "لا، إلغاء",
        },
      ],
      Location: [
        {
          name: "الأحمدي",
          details: [
            { name: "الأحمدي", time: "1 س" },
            { name: "شروق الأحمدي", time: "1 س" },
            { name: "العقليه", time: "1 س" },
            { name: "فهد الأحمدي", time: "1 س" },
            { name: "فحيحيل", time: "1 س" },
            { name: "جابر العلي", time: "1 س" },
            { name: "المهبوله", time: "1 س" },
            { name: "المنقف", time: "1 س" },
            { name: "ميناء عبدالله", time: "1 س" },
            { name: "ميناء الأحمدي", time: "1 س" },
            { name: "ميناء الشعيبه", time: "1 س 30 دق" },
            { name: "الرقه", time: "1 س" },
            { name: "الصباحيه", time: "1 س 30 دق" },
            { name: "ام الهيمان", time: "1 س" },
          ],
        },
        {
          name: "مبارك الكبير",
          details: [
            { name: "ابو فطيرة", time: "1 س" },
            { name: "أبو الحصانية", time: "1 س" },
            { name: "المطار", time: "1 س" },
            { name: "العدان", time: "1 س" },
            { name: "المسائل", time: "1 س" },
            { name: "المسيلة", time: "1 س" },
            { name: "مبارك الكبير", time: "1 س" },
            { name: "القصور", time: "1 س" },
            { name: "القرين", time: "1 س" },
            { name: "صباح السالم", time: "1 س" },
            { name: "صبحان الصناعية", time: "1 س" },
            { name: "جنوب وسطه", time: "1 س" },
            { name: "ابو فطيره الحرفيه", time: "1 س" },
            { name: "الوسط", time: "1 س" },
          ],
        },
        {
          name: "الفروانية",
          details: [
            { name: "عباسية", time: "0 دقيقة" },
            { name: "ضاحية عبد الله المبارك", time: "1 س 10 دق" },
            { name: "الشدادية", time: "0 دقيقة" },
            { name: "الرابية", time: "0 دقيقة" },
            { name: "الراي", time: "50 دق" },
            { name: "الرحاب", time: "0 دقيقة" },
            { name: "الأندلس", time: "35 دق" },
            { name: "عارضية", time: "40 دق" },
            { name: "العارضية ٤", time: "30 دق" },
            { name: "العارضية 1", time: "30 دق" },
            { name: "عارضية الحرفية", time: "30 دق" },
            { name: "عارضية الصناعية", time: "45 دق" },
            { name: "مخازن العارضية", time: "45 دق" },
            { name: "اشبيليا", time: "45 دق" },
            { name: "ضجيح", time: "45 دق" },
            { name: "الفروانية", time: "1 س" },
            { name: "الفردوس", time: "1 س" },
            { name: "جليب الشيوخ", time: "1 س" },
            { name: "خيطان", time: "1 س" },
            { name: "العمرية", time: "1 س" },
            { name: "الرقعي", time: "1 س" },
            { name: "صباح الناصر", time: "1 س" },
            { name: "مطار الشيخ سعد العبدالله", time: "45 دق" },
            { name: "غرب عبدالله المبارك الصباح", time: "45 دق" },
          ],
        },
        {
          name: "حولي",
          details: [
            { name: "البدع", time: "45 دق" },
            { name: "الشهداء", time: "1 س" },
            { name: "الصديق", time: "1 س" },
            { name: "انجفه", time: "45 دق" },
            { name: "بيان", time: "45 دق" },
            { name: "المنطقة الحرة", time: "45 دق" },
            { name: "حطين", time: "45 دق" },
            { name: "حولي", time: "45 دق" },
            { name: "الجابرية", time: "45 دق" },
            { name: "ميدان حولي", time: "45 دق" },
            { name: "منطقة الوزارات", time: "0 دقيقة" },
            { name: "مشرف", time: "1 س" },
            { name: "ضاحية مبارك العبد الله (غرب مشرف)", time: "1 س" },
            { name: "النقرة", time: "0 دقيقة" },
            { name: "الرميثية", time: "45 دق" },
            { name: "السلام", time: "1 س" },
            { name: "السالمية", time: "45 دق" },
            { name: "سلوى", time: "45 دق" },
            { name: "الشعب", time: "45 دق" },
            { name: "جنوب السرة", time: "1 س" },
            { name: "الزهراء", time: "45 دق" },
          ],
        },
        {
          name: "الجهراء",
          details: [
            { name: "الهجن", time: "1 س 30 دق" },
            { name: "المطلاع", time: "1 س 30 دق" },
            { name: "الصليبية الصناعية 1", time: "1 س" },
            { name: "الصليبية الصناعية 2", time: "1 س" },
            { name: "أمغرة", time: "30 دق" },
            { name: "صناعة أمغرة", time: "50 دق" },
            { name: "الجهراء", time: "1 س" },
            { name: "مخيمات الجهرا", time: "1 س 30 دق" },
            { name: "الجهرا الصناعيه", time: "1 س 30 دق" },
            { name: "كيد", time: "1 س 30 دق" },
            { name: "نعيم", time: "1 س" },
            { name: "النسيم", time: "1 س" },
            { name: "العيون", time: "1 س" },
            { name: "القصر", time: "1 س" },
            { name: "سعد العبدالله", time: "1 س" },
            { name: "الصليبية", time: "1 س 10 دق" },
            { name: "صليبيا", time: "1 س" },
            { name: "صليبية الصناعية", time: "1 س" },
            { name: "صليبيا الصناعيه", time: "1 س 30 دق" },
            { name: "تيماء", time: "1 س" },
            { name: "الواحة", time: "1 س" },
          ],
        },
        {
          name: "العاصمة",
          details: [
            { name: "ضاحية عبدالله السالم", time: "45 دق" },
            { name: "العديلية", time: "45 دق" },
            { name: "النهضة", time: "45 دق" },
            { name: "بنيد القار", time: "45 دق" },
            { name: "الدعية", time: "45 دق" },
            { name: "الدسمة", time: "45 دق" },
            { name: "دسمان", time: "45 دق" },
            { name: "الدوحة", time: "1 س" },
            { name: "الفيحاء", time: "45 دق" },
            { name: "غرناطه", time: "1 س" },
            { name: "جابر الأحمد", time: "1 س" },
            { name: "الخالدية", time: "45 دق" },
            { name: "مدينة الكويت", time: "45 دق" },
            { name: "المنصورية", time: "45 دق" },
            { name: "المرقاب", time: "45 دق" },
            { name: "القادسية", time: "45 دق" },
            { name: "القيروان", time: "1 س" },
            { name: "قبلة", time: "45 دق" },
            { name: "قرطبة", time: "0 دقيقة" },
            { name: "الروضة", time: "45 دق" },
            { name: "الصالحية", time: "45 دق" },
            { name: "الشامية", time: "45 دق" },
            { name: "شرق", time: "45 دق" },
            { name: "الشويخ", time: "1 س" },
            { name: "شويخ الصناعيه 1", time: "1 س" },
            { name: "شويخ الصناعيه 2", time: "1 س" },
            { name: "شويخ الصناعيه 3", time: "1 س" },
            { name: "شويخ الصحية", time: "1 س" },
            { name: "شويخ السكنية", time: "1 س" },
            { name: "الصليبيخات", time: "1 س" },
            { name: "السرة", time: "45 دق" },
            { name: "اليرموك", time: "45 دق" },
          ],
        },
      ],
      savedTitle: "تم الحفظ!",
      savedMessage: "تم حفظ الموقع بنجاح.",
      cancelledTitle: "تم الإلغاء!",
      cancelledMessage: "لم يتم حفظ الموقع.",
    },
    en: {
      swal: [
        {
          name: "Are you sure?",
          text1: `Do you want to save `,
          text2: ` as your selected location?`,
          confirmButtonText: "Yes, Save",
          cancelButtonText: "No, Cancel",
        },
      ],
      Location: [
        {
          name: "Ahmadi",
          details: [
            { name: "Ahmadi", time: "1 hr" },
            { name: "Shroog Ahmadi", time: "1 hr" },
            { name: "Al-Aqliya", time: "1 hr" },
            { name: "Fahd Ahmadi", time: "1 hr" },
            { name: "Fahaheel", time: "1 hr" },
            { name: "Jaber Al-Ali", time: "1 hr" },
            { name: "Mahboula", time: "1 hr" },
            { name: "Minaf", time: "1 hr" },
            { name: "Mina Abdullah", time: "1 hr" },
            { name: "Mina Ahmadi", time: "1 hr" },
            { name: "Mina Shuaiba", time: "1 hr 30 min" },
            { name: "Al-Riqaa", time: "1 hr" },
            { name: "Al-Sabahiyah", time: "1 hr 30 min" },
            { name: "Umm Al-Hayman", time: "1 hr" },
          ],
        },
        {
          name: "Mubarak Al-Kabeer",
          details: [
            { name: "Abu Fatira", time: "1 hr" },
            { name: "Abu Hasaniya", time: "1 hr" },
            { name: "Airport", time: "1 hr" },
            { name: "Al-Adan", time: "1 hr" },
            { name: "Al-Masa'il", time: "1 hr" },
            { name: "Al-Massila", time: "1 hr" },
            { name: "Mubarak Al-Kabir", time: "1 hr" },
            { name: "Al-Qusour", time: "1 hr" },
            { name: "Al-Qurayn", time: "1 hr" },
            { name: "Sabah Al-Salem", time: "1 hr" },
            { name: "Subhan Industrial", time: "1 hr" },
            { name: "South of Wusta", time: "1 hr" },
            { name: "Abu Fatira Industrial", time: "1 hr" },
            { name: "Al-Wasat", time: "1 hr" },
          ],
        },
        {
          name: "Farwaniya",
          details: [
            { name: "Abasiya", time: "0 min" },
            { name: "Dhahiya Abdullah Mubarak", time: "1 hr 10 min" },
            { name: "Shaddadiya", time: "0 min" },
            { name: "Al-Rabiya", time: "0 min" },
            { name: "Al-Rai", time: "50 min" },
            { name: "Al-Rihab", time: "0 min" },
            { name: "Al-Andalus", time: "35 min" },
            { name: "Ardiya", time: "40 min" },
            { name: "Ardiya 4", time: "30 min" },
            { name: "Ardiya 1", time: "30 min" },
            { name: "Ardiya Industrial", time: "30 min" },
            { name: "Ardiya Industrial Area", time: "45 min" },
            { name: "Ardiya Warehouses", time: "45 min" },
            { name: "Ashbiya", time: "45 min" },
            { name: "Dhejiha", time: "45 min" },
            { name: "Al-Farwaniya", time: "1 hr" },
            { name: "Al-Firdous", time: "1 hr" },
            { name: "Jleeb Al-Shuyoukh", time: "1 hr" },
            { name: "Khaitan", time: "1 hr" },
            { name: "Al-Omariya", time: "1 hr" },
            { name: "Al-Raqi", time: "1 hr" },
            { name: "Sabah Al-Nasser", time: "1 hr" },
            { name: "Sheikh Saad Abdullah Airport", time: "45 min" },
            { name: "West Abdullah Mubarak Sabah", time: "45 min" },
          ],
        },
        {
          name: "Hawalli",
          details: [
            { name: "Al-Bidaa", time: "45 min" },
            { name: "Al-Shuhada", time: "1 hr" },
            { name: "Al-Siddiq", time: "1 hr" },
            { name: "Anjafa", time: "45 min" },
            { name: "Bayan", time: "45 min" },
            { name: "Free Zone", time: "45 min" },
            { name: "Hatin", time: "45 min" },
            { name: "Hawalli", time: "45 min" },
            { name: "Al-Jabriya", time: "45 min" },
            { name: "Midan Hawalli", time: "45 min" },
            { name: "Ministry Area", time: "0 min" },
            { name: "Mashraf", time: "1 hr" },
            { name: "Mubarak Abdullah Suburb (West Mashraf)", time: "1 hr" },
            { name: "Al-Naqrah", time: "0 min" },
            { name: "Al-Rumaythiya", time: "45 min" },
            { name: "Al-Salam", time: "1 hr" },
            { name: "Salmiya", time: "45 min" },
            { name: "Salwa", time: "45 min" },
            { name: "Al-Shaab", time: "45 min" },
            { name: "South Sura", time: "1 hr" },
            { name: "Al-Zahra", time: "45 min" },
          ],
        },
        {
          name: "Jahra",
          details: [
            { name: "Al-Hujan", time: "1 hr 30 min" },
            { name: "Al-Mutlaa", time: "1 hr 30 min" },
            { name: "Al-Sulaibiya Industrial 1", time: "1 hr" },
            { name: "Al-Sulaibiya Industrial 2", time: "1 hr" },
            { name: "Umghara", time: "30 min" },
            { name: "Sina'at Umghara", time: "50 min" },
            { name: "Al-Jahra", time: "1 hr" },
            { name: "Jahra Camps", time: "1 hr 30 min" },
            { name: "Al-Jahra Industrial", time: "1 hr 30 min" },
            { name: "Kid", time: "1 hr 30 min" },
            { name: "Na'eem", time: "1 hr" },
            { name: "Al-Naseem", time: "1 hr" },
            { name: "Al-Uyun", time: "1 hr" },
            { name: "Al-Qasr", time: "1 hr" },
            { name: "Saad Al-Abdullah", time: "1 hr" },
            { name: "Al-Sulaibiya", time: "1 hr 10 min" },
            { name: "Sulaybiya", time: "1 hr" },
            { name: "Sulaibiya Industrial", time: "1 hr" },
            { name: "Sulaibiya Industrial", time: "1 hr 30 min" },
            { name: "Tima", time: "1 hr" },
            { name: "Al-Waha", time: "1 hr" },
          ],
        },
        {
          name: "Capital",
          details: [
            { name: "Abdullah Al-Salem Area", time: "45 min" },
            { name: "Al-Adiliya", time: "45 min" },
            { name: "Al-Nahda", time: "45 min" },
            { name: "Bneid Al-Qar", time: "45 min" },
            { name: "Al-Daiya", time: "45 min" },
            { name: "Al-Dasma", time: "45 min" },
            { name: "Dasman", time: "45 min" },
            { name: "Al-Douha", time: "1 hr" },
            { name: "Al-Faiha", time: "45 min" },
            { name: "Ghrana", time: "1 hr" },
            { name: "Jaber Al-Ahmad", time: "1 hr" },
            { name: "Al-Khalidiya", time: "45 min" },
            { name: "Kuwait City", time: "45 min" },
            { name: "Al-Mansouriya", time: "45 min" },
            { name: "Al-Murqab", time: "45 min" },
            { name: "Al-Qadisiyya", time: "45 min" },
            { name: "Al-Qayrawan", time: "1 hr" },
            { name: "Qibla", time: "45 min" },
            { name: "Qurtuba", time: "0 min" },
            { name: "Al-Rawda", time: "45 min" },
            { name: "Al-Salhiya", time: "45 min" },
            { name: "Al-Shamiya", time: "45 min" },
            { name: "Sharq", time: "45 min" },
            { name: "Al-Shuwaikh", time: "1 hr" },
            { name: "Shuwaikh Industrial 1", time: "1 hr" },
            { name: "Shuwaikh Industrial 2", time: "1 hr" },
            { name: "Shuwaikh Industrial 3", time: "1 hr" },
            { name: "Shuwaikh Health", time: "1 hr" },
            { name: "Shuwaikh Residential", time: "1 hr" },
            { name: "Al-Sulaibiya", time: "1 hr" },
            { name: "Al-Surra", time: "45 min" },
            { name: "Al-Yarmouk", time: "45 min" },
          ],
        },
      ],
      savedTitle: "Saved!",
      savedMessage: "has been saved successfully.",
      cancelledTitle: "Cancelled!",
      cancelledMessage: "The location was not saved.",
    },
  };

  const currentTexts = texts[language];

  const handleSelectDetail = (detail, time, index, idx) => {
    setSelectedDetail(detail);

    const swalTexts = currentTexts.swal[0];

    Swal.fire({
      title: swalTexts.name,
      text: `${swalTexts.text1} ${detail} ${swalTexts.text2}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: swalTexts.confirmButtonText,
      cancelButtonText: swalTexts.cancelButtonText,
    }).then((result) => {
      if (result.isConfirmed) {
        if (language == "ar") {
          const data = texts["en"];
          const valueData = data.Location[index].details[idx];
          localStorage.setItem(
            "selectedDetail",
            JSON.stringify({ ar: detail, en: valueData.name })
          );
          localStorage.setItem(
            "selectedTime1",
            JSON.stringify({ ar: time, en: valueData.time })
          );
        } else if (language == "en") {
          const data = texts["ar"];
          const valueData = data.Location[index].details[idx];
          localStorage.setItem(
            "selectedDetail",
            JSON.stringify({ ar: valueData.name, en: detail })
          );
          localStorage.setItem(
            "selectedTime1",
            JSON.stringify({ ar: valueData.time, en: time })
          );
        }
        localStorage.setItem("orderMethod", "delivery");
        Swal.fire(
          currentTexts.savedTitle || "Saved!",
          `${detail} ${
            currentTexts.savedMessage || "has been saved successfully."
          }`,
          "success"
        );
        setSelectedDetail(null);
        navigate("/");
      } else {
        Swal.fire(
          currentTexts.cancelledTitle || "Cancelled!",
          currentTexts.cancelledMessage || "The location was not saved.",
          "info"
        );
      }
    });
  };

  const highlightText = (text, query) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, "gi");
    return text.replace(
      regex,
      `<span class="bg-[#89a986] text-[#ffffff] p-1 rounded-sm tracking-widest focus:outline-none focus:scale-150 focus:shadow-lg transition-all duration-300">$1</span>`
    );
  };

  const filteredLocations = currentTexts.Location.map((branch) => {
    const filteredDetails =
      searchQuery === ""
        ? branch.details
        : branch.details.filter((detail) =>
            detail.name.toLowerCase().includes(searchQuery.toLowerCase())
          );

    const sortedDetails = filteredDetails.sort((a, b) => {
      const aMatch = a.name.toLowerCase().indexOf(searchQuery.toLowerCase());
      const bMatch = b.name.toLowerCase().indexOf(searchQuery.toLowerCase());
      return aMatch - bMatch;
    });

    return {
      ...branch,
      details: sortedDetails,
    };
  }).filter((branch) => branch.details.length > 0);

  const shouldOpenBranch = (index) => {
    return (
      openBranch === index ||
      (manualClose === index
        ? null
        : searchQuery !== "" && filteredLocations[index]?.details.length > 0)
    );
  };

  const toggleBranch = (index) => {
    if (searchQuery === "") {
      setOpenBranch(openBranch === index ? null : index);
    } else {
      setManualClose(manualClose === index ? null : index);
    }
  };

  return (
    <div className="bg-[#ffffff] min-h-[550px]">
      <div className="container mx-auto px-4 flex gap-[8px] items-center">
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          size="xs"
          style={{ color: "#808080" }}
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={language === "ar" ? "أبحث..." : "Search..."}
          className="border-none outline-none text-[14px] flex-1 py-[12px] text-[#808080] caret-[#808080]"
        />
      </div>
      <hr />
      <div className="py-[12px]">
        <ul className="list-none">
          {filteredLocations.length > 0 ? (
            filteredLocations.map((branch, index) => (
              <li key={index} className="py-[12px]">
                <div className="container mx-auto">
                  {(searchQuery === "" || branch.details.length > 0) && (
                    <button
                      className={`flex justify-between w-full text-[14px] py-[16px] px-6 font-medium relative border-none outline-none duration-[0.3s] before:duration-[0.3s] z-[2] before:absolute before:h-full before:w-full before:left-1/2 before:transform before:-translate-x-1/2 before:z-[-1] before:top-0 before:origin-center before:scale-x-0 ${
                        openBranch === index || shouldOpenBranch(index)
                          ? "before:bg-[#e3e3e3] before:scale-x-100"
                          : ""
                      }`}
                      onClick={() => toggleBranch(index)}
                    >
                      {branch.name}
                      <FontAwesomeIcon
                        icon={
                          openBranch === index || shouldOpenBranch(index)
                            ? faCaretUp
                            : faCaretDown
                        }
                        style={{ color: "#808080" }}
                      />
                    </button>
                  )}
                </div>
                <motion.div
                  initial={{
                    height: 0,
                    opacity: 0,
                    scale: 0.9,
                    translateY: -10,
                  }}
                  animate={
                    shouldOpenBranch(index)
                      ? { height: "auto", opacity: 1, scale: 1, translateY: 0 }
                      : { height: 0, opacity: 0, scale: 0.9, translateY: -10 }
                  }
                  transition={{
                    duration: 0.5,
                    ease: "easeInOut",
                    opacity: { duration: 0.3 },
                    height: { duration: 0.4 },
                  }}
                  className="overflow-hidden"
                >
                  <ul className="mt-[12px] text-[14px] text-[#808080]">
                    {branch.details.map((detail, idx) => (
                      <li key={idx} className="py-[12px] cursor-pointer">
                        <div
                          className={`container mx-auto px-8 py-3 duration-[0.3s] hover:bg-[#d4d4d4] ${
                            selectedDetail === detail.name &&
                            "bg-[#657a63] text-[#ffffff]"
                          }`}
                          onClick={() =>
                            handleSelectDetail(
                              detail.name,
                              detail.time,
                              index,
                              idx
                            )
                          }
                          dangerouslySetInnerHTML={{
                            __html: highlightText(detail.name, searchQuery),
                          }}
                        ></div>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </li>
            ))
          ) : (
            <ErrorText/>
          )}
        </ul>
      </div>
    </div>
  );
}
