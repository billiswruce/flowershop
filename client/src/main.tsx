import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "../Router.tsx";
import CartProvider from "./context/CartContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <CartProvider>
    {/* <OrderProvider> */}
    <RouterProvider router={router} />
    {/* </OrderProvider> */}
  </CartProvider>
);
