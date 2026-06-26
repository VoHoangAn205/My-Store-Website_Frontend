import { Outlet } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SideBar from "../components/SideBar";

export default function RootLayout() {
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
