import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

const BackButton = () => {
  const navigate = useNavigate();
  const language = useLanguage()

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="container mx-auto px-4 py-[8px]">
      <button onClick={handleBack} className="border-none outline-none">
        <span className="text-[#212121]"><FontAwesomeIcon icon={language.language == 'ar' ? faArrowRight: faArrowLeft} size="xs" /></span>
      </button>
    </div>
  );
};

export default BackButton;
