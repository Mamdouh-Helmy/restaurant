import { useState } from "react";
import InputSearch from "../components/InputSearch";
import { useLanguage } from "../context/LanguageContext";
import ErrorText from "../components/ErrorText";
import { useNavigate } from "react-router-dom";
import HeaderTwoButton from "../components/HeaderTwoButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import PeoplesComments from "../components/PeoplesComments";
import WhatsApp from "../components/WhatsApp";
export default function Contact() {
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [check, setCheck] = useState(false);

  const texts = {
    ar: {
      title: "فرعنا",
      Opinion: "رأيك يهمنا",
      comments: "ملاحظات او تقييم",
      concat: "تواصل معنا",
      Location: [{ name: "السالمية", time: "30 دق" }],
    },
    en: {
      title: "Our branches",
      Opinion: "Your opinion matters",
      comments: "LEAVE FEEDBACK",
      concat: "Connect with us",
      Location: [{ name: "Al-Salmiyah", time: "30 min" }],
    },
  };

  const currentTexts = texts[language];

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

  const handelSheck = () => {
    setCheck((prevCheck) => !prevCheck);
  };

  return (
    <>
      <div className="bg-[#f4f5f5] h-[100vh]">
        <HeaderTwoButton />
        <div className="container mx-auto pt-[30px] px-2 pb-[10px]">
          <div className="text-[14px] text-[#5b5b5b] font-bold">
            {currentTexts.title}
          </div>
        </div>
        <hr />
        <div className="bg-[#ffffff]">
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
                      className={`container mx-auto px-4 py-1 cursor-pointer duration-[0.3s] border-b-[1px] border-b-[#d7d7d7] hover:bg-[#e7e7e7] 
                    `}
                      onClick={() => navigate(`restaurant/branch/${branch.name}`)}
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
        <hr />
        <div className="container mx-auto pt-[30px] px-2 pb-[10px]">
          <div className="text-[14px] text-[#5b5b5b] font-bold">
            {currentTexts.Opinion}
          </div>
        </div>
        <hr />
        <div className="bg-[#ffffff] p-3">
          <button
            className="text-center border-none outline-none m-auto cursor-pointer p-1 select-none flex items-center justify-center gap-2 duration-[0.3s] hover:bg-[#657a632d]"
            onClick={handelSheck}
          >
            <span className="block text-[#657a63] text-[14px]">
              {currentTexts.comments}
            </span>
            <FontAwesomeIcon
              icon={faThumbsUp}
              size="sm"
              style={{ color: "#657a63" }}
            />
          </button>
        </div>
        <hr />
        <div className="container mx-auto pt-[30px] px-2 pb-[10px]">
          <div className="text-[14px] text-[#5b5b5b] font-bold">
            {currentTexts.concat}
          </div>
        </div>
        <hr />
        <div className="bg-[#ffffff] px-3 py-4 flex items-center justify-center">
          <div className="bg-[#00b950] w-[45px] h-[45px] flex items-center justify-center rounded-md">
            <WhatsApp color="#ffffff" />
          </div>
        </div>
      </div>
      {check && <PeoplesComments check={check} handelSheck={handelSheck} />}
    </>
  );
}
