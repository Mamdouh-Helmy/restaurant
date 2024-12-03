import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image1 from "../../public/Icon/icon-1.png";
import { Info } from "../../utils/icons.util";
import {
  faCreditCard,
  faMoneyBill,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

export default function Banner() {
  const { language } = useLanguage();
  const navigate = useNavigate();

  const handelNavgatie = () => {
    navigate("/restaurant/contact");
  };

  const texts = {
    ar: {
      title: "مطبخ أوزي",
      text : "الحد ألأدني : 5 دك",
    },
    en: {
      title: "OZZY Kitchen",
      text: "Min. order: 5 KD",
    },
  };

  const currentTexts = texts[language];

  return (
    <div
      className="cursor-pointer duration-[0.3s] hover:bg-[#dfdfdf]"
      onClick={handelNavgatie}
    >
      <div className="flex items-center justify-between container mx-auto px-2 md:px-4 py-[12px]">
        <div className="information items-center flex gap-[12px]">
          <div className="image">
            <img src={Image1} alt="Image 1" className="w-[40px] md:w-[50px]" />
          </div>
          <div className="text">
            <h4 className="text-[14px] md:text-[18px] font-[100]">
              {currentTexts.title}
            </h4>
            <div className="icon flex items-center gap-[10px]">
              <div>
                <FontAwesomeIcon
                  icon={faCreditCard}
                  size="xs"
                  style={{ color: "#37ad49" }}
                />
              </div>
              <div className="icon-creadit relative">
                <FontAwesomeIcon
                  icon={faMoneyBill}
                  size="xs"
                  style={{ color: "#dfdfdf" }}
                />
                <div className="absolute top-[-6px] right-[-2px]">
                  <FontAwesomeIcon
                    icon={faXmark}
                    size="2xs"
                    style={{ color: "#e03333" }}
                  />
                </div>
              </div>
              <div className="text-[14px] text-[#999999]">{currentTexts.text}</div>
            </div>
          </div>
        </div>
        <div className="info">
          <Info />
        </div>
      </div>
      <hr />
    </div>
  );
}
