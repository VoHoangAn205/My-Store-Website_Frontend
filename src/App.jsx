import { createBrowserRouter, RouterProvider } from "react-router";
import RootLayout from "./layouts/rootLayout";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import ProductDetailPage from "./pages/ProductDetailPage";
import SearchPage from "./pages/SearchPage";
import UserProfileDashboard from "./pages/UserProfileDashboard";
import CreateProduct from "./pages/dashboard/CreateProduct";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "search",
        element: <SearchPage />,
      },
      {
        path: "detail",
        element: <ProductDetailPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "profile",
        element: <UserProfileDashboard />,
      },
      {
        path: "createProduct",
        element: <CreateProduct />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
