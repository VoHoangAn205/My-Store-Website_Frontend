import { Outlet } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function RootLayout() {
  return (
    <>
      <Header />
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-3 lg:px-8 py-8  lg:py-16 flex flex-col items-center justify-center ">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
