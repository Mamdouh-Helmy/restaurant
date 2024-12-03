import { useLanguage } from "../context/LanguageContext";

export default function WorkingHours() {
  const { language } = useLanguage();

  const texts = {
    ar: {
      workingHoursTitle: "ساعات العمل",
      workingHours: [
        { day: "الاثنين", time: "11:59 م - 11:30 ص" },
        { day: "الثلاثاء", time: "11:59 م - 11:30 ص" },
        { day: "الأربعاء", time: "11:59 م - 11:30 ص" },
        { day: "الخميس", time: "11:59 م - 11:30 ص" },
        { day: "الجمعة", time: "11:59 م - 11:30 ص" },
        { day: "السبت", time: "11:59 م - 11:30 ص" },
        { day: "الأحد", time: "11:59 م - 11:30 ص" },
      ],
    },
    en: {
      workingHoursTitle: "Working hours",
      workingHours: [
        { day: "Monday", time: "11:59 PM - 11:30 AM" },
        { day: "Tuesday", time: "11:59 PM - 11:30 AM" },
        { day: "Wednesday", time: "11:59 PM - 11:30 AM" },
        { day: "Thursday", time: "11:59 PM - 11:30 AM" },
        { day: "Friday", time: "11:59 PM - 11:30 AM" },
        { day: "Saturday", time: "11:59 PM - 11:30 AM" },
        { day: "Sunday", time: "11:59 PM - 11:30 AM" },
      ],
    },
  };

  const currentTexts = texts[language];
  return (
    <div>
      <h3 className="text-[#5b5b5b] text-[16px] px-3 py-3 pb-2">
        {currentTexts.workingHoursTitle}
      </h3>
      <div className="bg-[#ffffff] w-full">
        <div className="py-3">
          {currentTexts.workingHours.map((item, index) => (
            <ul key={index}>
              <div className="flex items-center justify-between px-4">
                <li className="text-[16px] py-2">{item.day}</li>
                <li className="text-[16px] py-2">{item.time}</li>
              </div>
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}
