import { Outlet } from "react-router";
import Header from "../components/Header";

export default function RootLayout(params) {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
