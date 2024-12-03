import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function InputSearch({ type, value, onChange, placeholder }) {
  return (
    <>
      <div className="bg-[#ffffff] ">
        <div className="container mx-auto px-4 flex gap-[8px] w-full items-center">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            size="xs"
            style={{ color: "#808080" }}
          />
          <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="border-none outline-none text-[14px] flex-1 py-[12px] text-[#808080] caret-[#808080]"
          />
        </div>
      </div>
    </>
  );
}
