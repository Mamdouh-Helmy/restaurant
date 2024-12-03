import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBagShopping,
  faBars,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Language from "./Language";

export default function Header() {
  return (
    <div className="header bg-[#ffffff] fixed w-[100%] z-[900] md:bg-transparent">
      <div className="links flex justify-between items-center gap-[16px] my-[12px] mx-[30px] md:justify-start md:gap-[20px] md:my-[14px]">
        <div className="contant">
          <Link to="/profile">
            <div
              className="link w-[20px] h-[20px] flex items-center justify-center rounded-full cursor-pointer text-[16px] text-[#585858] duration-[0.3s] 
                md:w-[40px] md:h-[40px] md:bg-[#ffffff] bg-transparent hover:shadow-lg"
            >
              <FontAwesomeIcon icon={faBars} />
            </div>
          </Link>
        </div>
        <div className="contant flex gap-[16px] items-center md:gap-[20px]">
          <div
            className="link w-[20px] h-[20px] flex items-center justify-center rounded-full cursor-pointer text-[16px] text-[#585858] duration-[0.3s] 
                md:w-[40px] md:h-[40px] md:bg-[#ffffff] bg-transparent hover:shadow-lg"
          >
            <Link to="/">
              <FontAwesomeIcon icon={faBagShopping} />
            </Link>
          </div>
          <div
            className="link w-[20px] h-[20px] flex items-center justify-center rounded-full cursor-pointer text-[16px] text-[#585858] duration-[0.3s] 
                md:w-[40px] md:h-[40px] md:bg-[#ffffff] bg-transparent hover:shadow-lg"
          >
            <Link to="/">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </Link>
          </div>
          <Language/>
        </div>
      </div>
    </div>
  );
}
