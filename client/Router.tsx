import { createBrowserRouter } from "react-router-dom";
import { NotFound } from "./pages/NotFound";
import { Home } from "./pages/Home";
import { Cancellation } from "./pages/Cancellation";
import Payment from "./pages/Payment";
import { Confirmation } from "./pages/Confirmation";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <NotFound />,

    children: [
      {
        path: "/",
        element: <Home />,
        index: true,
      },
      {
        path: "/payment",
        element: <Payment />,
      },
      {
        path: "/confirmation",
        element: <Confirmation />,
      },
      {
        path: "/cancellation",
        element: <Cancellation />,
      },
    ],
  },
]);
