import { useState } from "react";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";

export default function InputComments({
  label,
  type,
  htmlFor,
  w,
  text,
  value,
  check,
  refValue,
}) {
  const [phone, setPhone] = useState("");
  const [inputValue, setInputValue] = useState(value || "");

  const handleInputChange = (e) => {
    const input = e.target.value;

    const regex =
      /^[\u0621-\u064A\u0660-\u0669a-zA-Z0-9!?.,\s\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*$/;

    if (regex.test(input)) {
      setInputValue(input);
    }
  };

  return (
    <div>
      <div className="pb-1">
        <label
          htmlFor={htmlFor}
          className="text-[16px] flex items-center gap-1"
        >
          {label}
          <span className="text-[12px] text-[#9e9f9f]">{text}</span>
        </label>
      </div>
      {check !== "phono" ? (
        <input
          type={type}
          id={htmlFor}
          ref={refValue}
          value={type == "text" ? inputValue : value}
          onChange={(e) => {
            if (type === "text") {
              handleInputChange(e);
            }
          }}
          style={{ width: w }}
          className={`border-[#9e9f9f] border-[1px] py-[9.6px] px-6 text-[18px] rounded-sm outline-none duration-75 hover:border-[black] focus:border-[1.5px] focus:border-[#657a63] checked:border-[1.1px] checked:border-[#657a63] ${
            type == "button" &&
            "border-none text-[#ffffff] px-[6px] text-[18px] w-full flex-1 cursor-pointer"
          }`}
        />
      ) : (
        <PhoneInput
          country={"eg"}
          value={phone}
          inputProps={{
            ref: refValue,
          }}
          onChange={(phone) => setPhone(phone)}
          containerStyle={{
            width: w,
          }}
          inputStyle={{
            width: "100%",
            fontSize: "18px",
            padding: "10px",
            paddingLeft: "45px",
            border: "none",
            borderRadius: "4px",
          }}
          buttonStyle={{
            position: "absolute",
            left: "-10px",
            background: "transparent",
            border: "none",
            padding: "0",
            margin: "0",
            paddingLeft: "10px",
          }}
          dropdownStyle={{
            position: "absolute",
            top: "-220px",
            left: "12px",
            zIndex: 1000,
            backgroundColor: "#fff",
            border: "1px solid #ddd",
            borderRadius: "4px",
            scrollbarWidth: "none",
          }}
          className={`border-[#9e9f9f] bg-[#ffffff] py-1 border-[1px] text-[18px] rounded-sm outline-none duration-75 hover:border-[black] focus:border-[1.5px] focus:border-[#657a63] checked:border-[1.1px] checked:border-[#657a63]`}
        />
      )}
    </div>
  );
}
