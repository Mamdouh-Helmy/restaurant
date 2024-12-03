import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useLanguage } from "../context/LanguageContext";

const Dropdown = ({
  options,
  selectedValueAR,
  selectedValueEN,
  setSelectedValueAR,
  setSelectedValueEN,
  label,
}) => {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const currentOptions = language === "ar" ? options?.ar : options?.en;

  const handleSelect = (value, index) => {
    if (language == "ar") {
      setSelectedValueAR(value);
      setSelectedValueEN(options?.en[index]);
    } else if (language == "en") {
      setSelectedValueEN(value);
      setSelectedValueAR(options?.ar[index]);
    }
    setIsOpen(false);
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="p-2 text-[16px] cursor-pointer w-full bg-white text-center border-b-[#afafaf] border-transparent duration-[0.3s] hover:border-b-[black] hover:bg-[#e8e8e8]"
      >
        {selectedValueAR || selectedValueEN
          ? language == "ar"
            ? selectedValueAR
            : selectedValueEN
          : label}
      </button>

      {isOpen && (
        <motion.ul
          className="absolute top-[-310px] max-h-[300px] overflow-y-auto hide-scrollbar w-full mt-1 bg-white border rounded shadow-lg z-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {currentOptions.map((option, index) => (
            <motion.li
              key={index}
              onClick={() => handleSelect(option, index)}
              className="p-2 cursor-pointer text-[14px] hover:bg-gray-200 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
            >
              {option}
            </motion.li>
          ))}
        </motion.ul>
      )}
    </div>
  );
};

export default Dropdown;
