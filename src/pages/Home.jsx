import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import BackButton from "../components/BackButton";
import { useState } from "react";
import { toast } from "react-toastify";
import Slider from "../components/Slider";
import Banner from "../components/Banner";
import SelectAddress from "../components/SelectAddress";
import UserAvatar from "../components/UserAvatar";

export default function Home() {
  const { currentUser, logout, deleteAccount } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handelLogout = async () => {
    setIsLoading(true);
    try {
      await logout();
      toast.success("تم الخروج الحساب بنجاح");
    } catch {
      toast.error("فشل تسجيل الخروج");
    } finally {
      setIsLoading(false);
    }
  };

  const handelDeleteAccount = async () => {
    setIsLoading(true);
    try {
      const result = await deleteAccount();
      if (result) {
        toast.success("تم حذف الحساب بنجاح");
      }
    } catch (error) {
      if (error.code === "auth/invalid-credential") {
        toast.error("كلمة السر خطأ");
      } else {
        toast.error("فشل حذف الحساب!");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="slider-container">
        <Slider />
      </div>
      <Banner/>
      <SelectAddress/>
      Home
      <hr />
      <UserAvatar currentUser={currentUser} />
      {currentUser && currentUser.email && (
        <div>
          <h1>{currentUser.email}</h1>
        </div>
      )}
      {currentUser && currentUser.displayName && (
        <div>
          <h2>{currentUser.displayName}</h2>
        </div>
      )}
      {currentUser && (
        <>
          <Link to="/updateprofile">Update Profile</Link>
          <button onClick={handelLogout} disabled={isLoading}>
            Log Out
          </button>
          <button onClick={handelDeleteAccount} disabled={isLoading}>
            {!isLoading ? "Delete account" : "Delete account..."}
          </button>
        </>
      )}
      {!currentUser && (
        <>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </>
      )}
      <BackButton />
    </>
  );
}
