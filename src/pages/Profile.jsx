import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BackButton from "../components/BackButton";
import { faCartShopping, faBook } from "@fortawesome/free-solid-svg-icons";
import { Email } from "../../utils/icons.util";
import GoogleSignInButton from "../components/GoogleSignInButton";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import Language from "../components/Language";
import ProfilePerson from "../components/ProfilePerson";
import DeleteAccount from "../components/DeleteAccount";

export default function Profile() {
  const { currentUser } = useAuth();
  const { language } = useLanguage();

  const texts = {
    ar: {
      title: "الملف الشخصي",
      list: "القائمة",
      cart: "سلة مشترياتى",
      orders: "طلبياتي",
      loginWith: "تسجيل الدخول بواسطة",
      email: "ايميل",
    },
    en: {
      title: "Profile",
      list: "List",
      cart: "My Cart",
      orders: "My Orders",
      loginWith: "Login with",
      email: "Email",
    },
  };

  const currentTexts = texts[language];

  return (
    <div className="profile">
      <div className="flex items-center justify-between">
        <BackButton />
        <div className="slider-container px-4">
          <Language />
        </div>
      </div>
      <hr />
      {currentUser && (
        <div className="acounet">
          <ProfilePerson />
        </div>
      )}
      <div className="list">
        <div className="container mx-auto px-4 py-[15px] text-[18px] text-[#66666b] font-bold">
          {currentTexts.list}
        </div>
      </div>
      <hr />
      <div className="text cursor-pointer duration-[0.3s] hover:bg-[#d4d4d4]">
        <div className="container text-[16px] select-none mx-auto flex items-center gap-[20px] px-4 py-[15px] text-[#66666b] font-bold">
          <FontAwesomeIcon icon={faCartShopping} /> {currentTexts.cart}
        </div>
      </div>
      <hr />
      <div className="text cursor-pointer duration-[0.3s] hover:bg-[#d4d4d4]">
        <div className="container text-[16px] select-none mx-auto flex items-center gap-[20px] px-4 py-[15px] text-[#66666b] font-bold">
          <FontAwesomeIcon icon={faBook} /> {currentTexts.list}
        </div>
      </div>
      <hr />
      <div className="text cursor-pointer duration-[0.3s] hover:bg-[#d4d4d4]">
        <div className="container text-[16px] select-none mx-auto flex items-center gap-[20px] px-4 py-[15px] text-[#66666b] font-bold">
          <FontAwesomeIcon icon={faCartShopping} /> {currentTexts.orders}
        </div>
      </div>
      <hr />
      {currentUser && <DeleteAccount />}
      <hr />
      {!currentUser && (
        <>
          <div className="login-user">
            <div className="container mx-auto px-4 pt-[40px] pb-[12px] text-[18px] text-[#66666b] font-bold">
              {currentTexts.loginWith}
            </div>
          </div>
          <hr />
          <div className="login-email cursor-pointer duration-[0.3s] hover:bg-[#d4d4d4]">
            <div className="container select-none mx-auto px-4 py-[15px] flex items-center gap-[20px] text-[18px] text-[#66666b] font-bold">
              <Email /> {currentTexts.email}
            </div>
          </div>
          <hr />
          <GoogleSignInButton />
          <hr />
        </>
      )}
    </div>
  );
}
