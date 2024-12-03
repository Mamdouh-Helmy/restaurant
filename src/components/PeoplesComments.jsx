import { useLanguage } from "../context/LanguageContext";
import InputComments from "./InputComments";
import LayoutBackGroundColor from "./LayoutBackGroundColor";
import { motion } from "framer-motion";
import { PaperPlaneTop } from "../../utils/icons.util";
import FaceIcons from "./FaceIcons";
import { useRef, useState } from "react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import emailjs from "emailjs-com";

export default function PeoplesComments({ check, handelSheck }) {
  const { language } = useLanguage();
  const [rating, setRating] = useState();
  const name = useRef();
  const phono = useRef();
  const commente = useRef();
  const ratingSessionStorage = sessionStorage.getItem("rating");

  const texts = {
    ar: {
      text: "تقييم",
      name: "الاسم",
      phone: "رقم الهاتف",
      op: "(اختياري)",
      commente: "اترك لنا تعليق",
      send: "إرسال",
      errorText: "لا يوجد تعليقات",
      errorTitile: "الرجاء إدخال تعليق",
      btn: "تمام",
      successText: "😍😍 شكرا علي تعليقك",
      successTitle: "💬✨ !تعليقك مهم بالنسبة لنا",
    },
    en: {
      text: "Leave feedback",
      name: "Name",
      phone: "Phone",
      op: "(Optional)",
      commente: "Leave us a comment",
      send: "send",
      errorText: "No comment",
      errorTitile: "Please enter a comment",
      btn: "OK",
      successText: "😍😍 Thank you for your comment",
      successTitle: "💬✨ Your comment is important to us!",
    },
  };
  const currentTexts = texts[language];

  const handleSubmit = async () => {
    if (commente.current.value === "") {
      Swal.fire({
        title: currentTexts.errorText || "Error!",
        text: currentTexts.errorTitile || "Error",
        icon: "error",
        confirmButtonText: currentTexts.btn,
      });
      toast.error(currentTexts.errorTitile);
    } else {
      try {
        await emailjs.send(
          "service_ml4uepg",
          "template_10pusfr",
          {
            to_name: name.current.value,
            to_phono: phono.current.value,
            commente: commente.current.value,
            rating: rating || ratingSessionStorage,
          },
          "XSGMpQgkU3M0Ih4WL"
        );
        Swal.fire({
          title: currentTexts.successText || "Error!",
          text: currentTexts.successTitle || "Error",
          icon: "success",
          confirmButtonText: currentTexts.btn,
        });
        toast.success(currentTexts.successTitle);
      } catch (error) {
        toast.error(error);
      }
    }
  };

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
            className="fixed w-[100%] z-[1000] bottom-0 bg-[#f4f5f5] rounded-sm md:w-[43%]"
          >
            <div className="relative w-full h-full p-[20px]">
              <div
                className="absolute lef-0 top-1 text-[#565656] text-[30px] cursor-pointer duration-[0.3s] hover:text-[#e76e6e]"
                onClick={handelSheck}
              >
                x
              </div>
              <div className="pt-6">{currentTexts.text}</div>
              <motion.div
                initial={{ opacity: 0, x: 500 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="py-6">
                  <FaceIcons Rating={setRating} />
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <InputComments
                    label={currentTexts.name}
                    text={currentTexts.op}
                    type={"text"}
                    w="100%"
                    refValue={name}
                  />
                  <InputComments
                    label={currentTexts.phone}
                    text={currentTexts.op}
                    check="phono"
                    w="100%"
                    refValue={phono}
                  />
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-full py-4">
                  <InputComments
                    label={currentTexts.commente}
                    w="100%"
                    type={"text"}
                    refValue={commente}
                  />
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center bg-[#657a63] py-[2px] justify-center rounded-sm cursor-pointer mt-1 duration-[0.3s] hover:bg-[#465545]"
                onClick={handleSubmit}
              >
                <InputComments
                  w="100%"
                  type={"button"}
                  value={currentTexts.send}
                  cursor="pointer"
                  bg="#657a63"
                  border="none"
                />
                <PaperPlaneTop />
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </>
  );
}
