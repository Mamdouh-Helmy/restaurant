import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HeaderTwoButton from "../components/HeaderTwoButton";
import Loading from "../components/Loading";
import { useLanguage } from "../context/LanguageContext";
import {
  faLocationDot,
  faPhone,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import WorkingHours from "../components/WorkingHours";
import Map from "../components/Map";

export default function BranchDetails() {
  const { language } = useLanguage();

  const texts = {
    ar: {
      title: "التفاصيل",
      Location: "السالمية",
      description: "مطعم اوزي كيتشن ببوفيه، يقدم أطعمة متنوعة ومميزة.",
      textRating: "تقييم",
      rating: "3.3 من 5 ",
      textPhone: "أتصل",
      phone: "965 6565 7272+",
      workingHours: "مفتوح حتى 11 مساءً",
      textAddress: "العنوان",
      address: "1 شارع حمد المبارك، السالمية، الكويت",
    },
    en: {
      title: "Details",
      Location: "Al-Salmiyah",
      description:
        "Ozzy Kitchen is a buffet restaurant offering a variety of unique and delicious dishes.",
      textRating: "Rating",
      rating: "3.3 out of 5",
      textPhone: "Call",
      phone: "965 6565 7272+",
      workingHours: "Open until 11 PM",
      textAddress: "Address",
      address: "1 Hamad Mubarak Street, Salmiya, Kuwait",
    },
  };

  const currentTexts = texts[language];

  return (
    <div className="bg-[#f5f5f5]">
      {currentTexts ? <HeaderTwoButton /> : <HeaderTwoButton bg="#f5f5f5" />}
      {currentTexts ? (
        <div className="">
          <h1 className="text-[14px] text-[#5b5b5b] py-2 pt-6 px-3 font-bold">
            {currentTexts.title}
          </h1>
          <div className="bg-[#ffffff] p-3">
            <p className="text-[14px] text-[#657a63]">
              {currentTexts.description}
            </p>
            <div className="flex items-center justify-between py-2 px-2">
              <div className="text-[15px]">{currentTexts.textPhone}</div>
              <div className="flex items-center gap-1">
                <a href={`tel:${"+96565657272"}`} className="flex items-center gap-1">
                  <div className="text-[15px]">{currentTexts.phone}</div>
                  <FontAwesomeIcon
                    icon={faPhone}
                    size="2xs"
                    style={{ color: "#758874" }}
                  />
                </a>
              </div>
            </div>
            <div className="flex items-center justify-between py-2 px-2">
              <div className="text-[15px]">{currentTexts.textRating}</div>
              <div className="flex items-center gap-1">
                <div className="text-[15px]">{currentTexts.rating}</div>
                <div className="text-[15px] text-[#5b5b5b] flex items-center gap-[2px]">
                  <FontAwesomeIcon
                    icon={faStar}
                    size="2xs"
                    style={{ color: "#5b5b5b" }}
                  />
                  <FontAwesomeIcon
                    icon={faStar}
                    size="2xs"
                    style={{ color: "#5b5b5b" }}
                  />
                  <FontAwesomeIcon
                    icon={faStar}
                    size="2xs"
                    style={{ color: "#fcce47" }}
                  />
                  <FontAwesomeIcon
                    icon={faStar}
                    size="2xs"
                    style={{ color: "#fcce47" }}
                  />
                  <FontAwesomeIcon
                    icon={faStar}
                    size="2xs"
                    style={{ color: "#fcce47" }}
                  />
                </div>
              </div>
            </div>
          </div>
          <h1 className="text-[14px] text-[#5b5b5b] py-2 pt-6 px-3 font-bold">
            {currentTexts.textAddress}
          </h1>
          <div className="bg-[#ffffff] p-3">
            <div className="flex items-center gap-4">
              <div>
                <FontAwesomeIcon
                  icon={faLocationDot}
                  size="sm"
                  style={{ color: "#697d67" }}
                />
              </div>
              <div>
                <div className="text-[16px]">{currentTexts.Location}</div>
                <div>
                  <p className="text-[14px]">{currentTexts.address}</p>
                </div>
              </div>
            </div>
          </div>
          <Map />
          <WorkingHours />
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}
