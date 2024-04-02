import { createBrowserRouter } from "react-router-dom";
import { NotFound } from "./pages/NotFound";
import Home from "./pages/Home";
import { Cancellation } from "./pages/Cancellation";
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
