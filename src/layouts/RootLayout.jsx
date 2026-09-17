import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router";
import { Toaster } from "sonner";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LoadingPageSkeleton from "../components/LoadingPageSkeleton";
import SideBar from "../components/SideBar";
import {
  clearLocalAuthState,
  getUserInfo,
  refreshToken,
} from "../redux/userSlice";

export default function RootLayout() {
  const dispatch = useDispatch();
  const [isBootstrapping, setIsBootstrapping] = useState(true);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (!isLoggedIn) {
      setIsBootstrapping(false);
      return;
    }

    const firstRefresh = async () => {
      try {
        const res = await dispatch(refreshToken()).unwrap();
        dispatch(getUserInfo(res.data.accessToken));
      } catch (err) {
        localStorage.removeItem("isLoggedIn");
        dispatch(clearLocalAuthState());
      } finally {
        setIsBootstrapping(false);
      }
    };
    firstRefresh();
  }, [dispatch]);

  if (isBootstrapping) {
    return <LoadingPageSkeleton />;
  }
  return (
    <>
      <div className="min-h-screen bg-brand-light flex flex-col">
        <Toaster position="top-right" richColors closeButton />
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
