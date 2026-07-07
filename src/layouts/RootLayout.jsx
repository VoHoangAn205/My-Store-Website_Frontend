import { Outlet } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SideBar from "../components/SideBar";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  getUserInfo,
  logout,
  refreshToken,
  silentTokenSave,
} from "../redux/userSlice";
import { privateApi } from "../services/axiosInstance";
import LoadingSkeleton from "../components/LoadingSkeleton";

export default function RootLayout() {
  const dispatch = useDispatch();
  const [isBootstrapping, setIsBootstrapping] = useState(true);

  useEffect(() => {
    dispatch(refreshToken())
      .then((data) => {
        console.log("Session sync complete", data.payload);
        dispatch(getUserInfo(data.payload.data.accessToken));
      })
      .catch((err) => {
        dispatch(logout());
      })
      .finally(() => {
        setIsBootstrapping(false);
      });
  }, [dispatch]);

  if (isBootstrapping) {
    return <LoadingSkeleton />;
  }
  return (
    <>
      <div className="min-h-screen bg-brand-light flex flex-col">
        <Header />
        <div className="flex grow relative">
          <SideBar />

          <main className="grow max-w-7xl w-full mx-auto px-4 py-4">
            <Outlet />
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
