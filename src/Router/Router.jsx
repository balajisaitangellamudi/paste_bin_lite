import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import CreatePaste from "../Components/CreatePaste";
import ViewPaste from "../Components/ViewPaste";
import NotFound from "../Error/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <CreatePaste />,
      },
      { path: "p/:id", element: <ViewPaste /> },
    ],
  },

  { path: "*", element: <NotFound /> },
]);

export default router;
