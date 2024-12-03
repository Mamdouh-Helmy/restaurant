import { createContext, useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import emailjs from "emailjs-com";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  fetchSignInMethodsForEmail,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
  signOut,
  deleteUser,
  signInWithEmailAndPassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
  reauthenticateWithPopup,
  sendPasswordResetEmail,
  updatePassword,
} from "firebase/auth";
import auth from "../../firebase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      return await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("فشل تسجيل الدخول باستخدام Google:", error);
      throw error;
    }
  };

  const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const sendVerificationEmail = async (userEmail, code, toName, fromName) => {
    try {
      const response = await emailjs.send(
        "service_bfckup6",
        "template_agharks",
        {
          to_email: userEmail,
          to_name: toName,
          from_name: fromName,
          verification_code: code,
        },
        "XSGMpQgkU3M0Ih4WL"
      );

      console.log("تم إرسال البريد الإلكتروني بنجاح:", response);
    } catch (error) {
      console.error("فشل إرسال البريد الإلكتروني:", error);
    }
  };

  const signup = async (email, password, displayName) => {
    const verificationCode = generateVerificationCode();
    sessionStorage.setItem('sd' , verificationCode);

    try {
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);
      if (signInMethods.length > 0) {
        Swal.fire("البريد الإلكتروني موجود بالفعل!", "يرجى تسجيل الدخول.", "error");
        throw new Error("auth/email-already-in-use");
      }

      await sendVerificationEmail(email, verificationCode, displayName);

      const { value: userCode, isDismissed } = await Swal.fire({
        title: "تحقق من بريدك الإلكتروني",
        text: "تم إرسال رمز تحقق إلى بريدك الإلكتروني. أدخل الرمز هنا للتأكيد:",
        input: "number",
        inputPlaceholder: "أدخل رمز التحقق",
        showCancelButton: true,
        confirmButtonText: "تأكيد",
        cancelButtonText: "إلغاء",
        inputAttributes: {
          autocapitalize: "off",
        },
        customClass: {
          popup: "swal-popup",
          title: "swal-title",
          content: "swal-content",
          input: "swal-input",
          confirmButton: "swal-confirm-button",
          cancelButton: "swal-cancel-button",
        },
      });

      if (isDismissed) {
        Swal.fire("تم الإلغاء", "لم يتم إتمام عملية التسجيل", "info");
        throw new Error("operation-cancelled");
      }

      if (userCode !== verificationCode) {
        Swal.fire("الرمز غير صحيح", "يرجى التأكد من الرمز والمحاولة مجددًا", "error");
        throw new Error("incorrect-verification-code");
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: displayName });

      Swal.fire("تم تسجيل الحساب بنجاح!", "تم تأكيد البريد الإلكتروني", "success");
    } catch (error) {
      console.error("فشل تسجيل الحساب:", error);
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("فشل تسجيل الدخول:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      return await signOut(auth);
    } catch (error) {
      console.error("فشل تسجيل الخروج:", error);
      throw error;
    }
  };

  const deleteAccount = async () => {
    if (currentUser) {
      try {
        if (currentUser.providerData[0].providerId === "google.com") {
          const provider = new GoogleAuthProvider();
          await reauthenticateWithPopup(currentUser, provider);
        } else if (currentUser.providerData[0].providerId === "password") {
          const { value: password } = await Swal.fire({
            title: "تأكيد حذف الحساب",
            text: "يرجى إدخال كلمة المرور لإعادة المصادقة:",
            input: "password",
            inputLabel: "كلمة المرور",
            inputPlaceholder: "أدخل كلمة المرور",
            showCancelButton: true,
            confirmButtonText: "تأكيد",
            cancelButtonText: "إلغاء",
            inputAttributes: {
              autocapitalize: "off",
            },
            customClass: {
              popup: "swal-popup",
              title: "swal-title",
              content: "swal-content",
              input: "swal-input",
              confirmButton: "swal-confirm-button",
              cancelButton: "swal-cancel-button",
            },
          });

          if (!password) {
            return;
          }

          const credential = EmailAuthProvider.credential(
            currentUser.email,
            password
          );
          await reauthenticateWithCredential(currentUser, credential);
        }

        await deleteUser(currentUser);
        return true;
      } catch (error) {
        console.error("فشل حذف الحساب:", error);
        throw error;
      }
    }
  };

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const updateUserPassword = (password) => {
    return updatePassword(auth.currentUser, password);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        signup,
        loginWithGoogle,
        logout,
        deleteAccount,
        login,
        resetPassword,
        updateUserPassword,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
