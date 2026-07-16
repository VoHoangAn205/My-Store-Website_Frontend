import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router";
import { Toaster } from "sonner";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LoadingPageSkeleton from "../components/LoadingPageSkeleton";
import SideBar from "../components/SideBar";
import { getUserInfo, logout, refreshToken } from "../redux/userSlice";

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
