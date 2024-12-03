import { useLanguage } from "../context/LanguageContext";
import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import InputSearch from "./InputSearch";
import ErrorText from "./ErrorText";

export default function Pickup() {
  const { language } = useLanguage();
  const navigate = useNavigate();

  const [openBranch, setOpenBranch] = useState(null);
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
        { name: "السالمية", time: "30 دق" },
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
        { name: "Al-Salmiyah", time: "30 min" },
      ],
      savedTitle: "Saved!",
      savedMessage: "has been saved successfully.",
      cancelledTitle: "Cancelled!",
      cancelledMessage: "The location was not saved.",
    },
  };

  const currentTexts = texts[language];

  const handleSelectDetail = (detail, time, index) => {
    setOpenBranch(openBranch === index ? null : index);

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
          const valueData = data.Location[index];
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
          const valueData = data.Location[index];
          localStorage.setItem(
            "selectedDetail",
            JSON.stringify({ ar: valueData.name, en: detail })
          );
          localStorage.setItem(
            "selectedTime1",
            JSON.stringify({ ar: valueData.time, en: time })
          );
        }
        localStorage.setItem("orderMethod", "pickup");
        Swal.fire(
          currentTexts.savedTitle || "Saved!",
          `${detail} ${
            currentTexts.savedMessage || "has been saved successfully."
          }`,
          "success"
        );
        setSelectedDetail(null);
        navigate("/restaurant");
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
    const parts = text.split(regex);

    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span
          key={index}
          className="bg-[#89a986] text-[#ffffff] p-1 rounded-sm tracking-widest focus:outline-none focus:scale-150 focus:shadow-lg transition-all duration-300"
        >
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const filteredLocations = currentTexts.Location.filter((branch) =>
    branch.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-[#ffffff] h-[100vh]">
      <InputSearch
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder={language === "ar" ? "أبحث..." : "Search..."}
      />
      <hr />
      <div className="py-[12px]">
        <ul className="list-none">
          {filteredLocations.length > 0 ? (
            filteredLocations.map((branch, index) => (
              <li key={index} className="py-[13px]">
                <div
                  className={`container mx-auto px-4 py-1 cursor-pointer duration-[0.3s] border-b-[1px] border-b-[#d7d7d7] hover:bg-[#e7e7e7]  ${
                    selectedDetail === branch.name
                      ? "bg-[#657a63] text-[#ffffff]"
                      : ""
                  }`}
                  onClick={() =>
                    handleSelectDetail(branch.name, branch.time, index)
                  }
                >
                  <button className="block text-[14px] font-medium py-2 border-none">
                    {highlightText(branch.name, searchQuery)}{" "}
                  </button>
                </div>
              </li>
            ))
          ) : (
            <ErrorText />
          )}
        </ul>
      </div>
    </div>
  );
}
