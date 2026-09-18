import { createBrowserRouter, RouterProvider } from "react-router";
import RootLayout from "./layouts/RootLayout";
import CategoryPage from "./pages/CategoryPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";
import ProductDetailPage from "./pages/ProductDetailPage";
import RegisterPage from "./pages/RegisterPage";
import SearchPage from "./pages/SearchPage";
import AccountPage from "./pages/dashboard/AccountSettingPage";
import CartPage from "./pages/dashboard/CartPage";
import CreateProduct from "./pages/dashboard/CreateProduct";
import MyPurchases from "./pages/dashboard/MyPurchases";
import OrderManager from "./pages/dashboard/OrderManager";
import ProductManager from "./pages/dashboard/ProductManager";

export const router = createBrowserRouter([
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
        path: "detail/:id",
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
        path: "account",
        element: <AccountPage />,
      },
      {
        path: "createProduct",
        element: <CreateProduct />,
      },
      {
        path: "myPurchases",
        element: <MyPurchases />,
      },
      {
        path: "productManager",
        element: <ProductManager />,
      },
      {
        path: "cart",
        element: <CartPage />,
      },
      {
        path: "category/:id",
        element: <CategoryPage />,
      },
      {
        path: "orderManager",
        element: <OrderManager />,
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
