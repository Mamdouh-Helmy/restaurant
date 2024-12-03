import { createBrowserRouter, RouterProvider } from "react-router-dom";
import styled from "styled-components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./Layout/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Cart from "./pages/Cart";
import Favorites from "./pages/Favorites";
import ForgotPassword from "./pages/ForgotPassword";
import UpdateProfile from "./pages/UpdateProfile";
import Profile from "./pages/Profile";
import Contact from "./pages/Contact";
import { useState, useEffect } from "react";
import SelectBranch from "./pages/SelectBranch";
import BranchDetails from "./pages/BranchDetails";
import Loading from "./components/Loading";
import WhatsApp from "./components/WhatsApp";

const CustomToastContainer = styled(ToastContainer)`
  .Toastify__toast {
    font-size: 12px;
    top: 20px;
    width: 90%;
    margin: 10px auto;
    left: 50%;
    transform: translateX(-50%);
  }
`;

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    const timer = setTimeout(() => setIsLoading(false), 2000);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timer);
    };
  }, []);
  const router = createBrowserRouter(
    isMobile
      ? [
          { path: "/restaurant", element: <Home /> },
          { path: "/login", element: <Login /> },
          { path: "/signup", element: <Signup /> },
          { path: "/forgotpassword", element: <ForgotPassword /> },
          { path: "/updateprofile", element: <UpdateProfile /> },
          { path: "/cart", element: <Cart /> },
          { path: "/favorites", element: <Favorites /> },
          { path: "/profile", element: <Profile /> },
          { path: "/contact", element: <Contact /> },
          { path: "/selectBranch", element: <SelectBranch /> },
          { path: "/branch/:branchName", element: <BranchDetails /> },
        ]
      : [
          {
            path: "/",
            element: <Layout />,
            children: [
              { path: "/restaurant", element: <Home /> },
              { path: "/login", element: <Login /> },
              { path: "/signup", element: <Signup /> },
              { path: "/forgotpassword", element: <ForgotPassword /> },
              { path: "/updateprofile", element: <UpdateProfile /> },
              { path: "/cart", element: <Cart /> },
              { path: "/favorites", element: <Favorites /> },
              { path: "/profile", element: <Profile /> },
              { path: "/contact", element: <Contact /> },
              { path: "/selectBranch", element: <SelectBranch /> },
              { path: "/branch/:branchName", element: <BranchDetails /> },
            ],
          },
        ]
  );

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {" "}
          <RouterProvider router={router} />{" "}
          <div className=" fixed left-0 z-[90000] top-[50%] transform translate-y-[-50%] bg-[#00b950] w-[40px] rounded-sm h-[70px] flex items-center justify-center">
            <WhatsApp color="#ffffff" />
          </div>
        </>
      )}
      <CustomToastContainer />
    </>
  );
}

export default App;
